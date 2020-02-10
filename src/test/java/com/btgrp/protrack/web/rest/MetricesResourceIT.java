package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.Metrices;
import com.btgrp.protrack.repository.MetricesRepository;
import com.btgrp.protrack.service.MetricesService;
import com.btgrp.protrack.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.btgrp.protrack.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MetricesResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class MetricesResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_SUM = 1;
    private static final Integer UPDATED_SUM = 2;
    private static final Integer SMALLER_SUM = 1 - 1;

    private static final Integer DEFAULT_COUNT = 1;
    private static final Integer UPDATED_COUNT = 2;
    private static final Integer SMALLER_COUNT = 1 - 1;

    private static final Integer DEFAULT_AVERAGE = 1;
    private static final Integer UPDATED_AVERAGE = 2;
    private static final Integer SMALLER_AVERAGE = 1 - 1;

    @Autowired
    private MetricesRepository metricesRepository;

    @Autowired
    private MetricesService metricesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restMetricesMockMvc;

    private Metrices metrices;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MetricesResource metricesResource = new MetricesResource(metricesService);
        this.restMetricesMockMvc = MockMvcBuilders.standaloneSetup(metricesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Metrices createEntity(EntityManager em) {
        Metrices metrices = new Metrices()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .sum(DEFAULT_SUM)
            .count(DEFAULT_COUNT)
            .average(DEFAULT_AVERAGE);
        return metrices;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Metrices createUpdatedEntity(EntityManager em) {
        Metrices metrices = new Metrices()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .sum(UPDATED_SUM)
            .count(UPDATED_COUNT)
            .average(UPDATED_AVERAGE);
        return metrices;
    }

    @BeforeEach
    public void initTest() {
        metrices = createEntity(em);
    }

    @Test
    @Transactional
    public void createMetrices() throws Exception {
        int databaseSizeBeforeCreate = metricesRepository.findAll().size();

        // Create the Metrices
        restMetricesMockMvc.perform(post("/api/metrices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metrices)))
            .andExpect(status().isCreated());

        // Validate the Metrices in the database
        List<Metrices> metricesList = metricesRepository.findAll();
        assertThat(metricesList).hasSize(databaseSizeBeforeCreate + 1);
        Metrices testMetrices = metricesList.get(metricesList.size() - 1);
        assertThat(testMetrices.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMetrices.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testMetrices.getSum()).isEqualTo(DEFAULT_SUM);
        assertThat(testMetrices.getCount()).isEqualTo(DEFAULT_COUNT);
        assertThat(testMetrices.getAverage()).isEqualTo(DEFAULT_AVERAGE);
    }

    @Test
    @Transactional
    public void createMetricesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = metricesRepository.findAll().size();

        // Create the Metrices with an existing ID
        metrices.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMetricesMockMvc.perform(post("/api/metrices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metrices)))
            .andExpect(status().isBadRequest());

        // Validate the Metrices in the database
        List<Metrices> metricesList = metricesRepository.findAll();
        assertThat(metricesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = metricesRepository.findAll().size();
        // set the field null
        metrices.setName(null);

        // Create the Metrices, which fails.

        restMetricesMockMvc.perform(post("/api/metrices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metrices)))
            .andExpect(status().isBadRequest());

        List<Metrices> metricesList = metricesRepository.findAll();
        assertThat(metricesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMetrices() throws Exception {
        // Initialize the database
        metricesRepository.saveAndFlush(metrices);

        // Get all the metricesList
        restMetricesMockMvc.perform(get("/api/metrices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(metrices.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].sum").value(hasItem(DEFAULT_SUM)))
            .andExpect(jsonPath("$.[*].count").value(hasItem(DEFAULT_COUNT)))
            .andExpect(jsonPath("$.[*].average").value(hasItem(DEFAULT_AVERAGE)));
    }
    
    @Test
    @Transactional
    public void getMetrices() throws Exception {
        // Initialize the database
        metricesRepository.saveAndFlush(metrices);

        // Get the metrices
        restMetricesMockMvc.perform(get("/api/metrices/{id}", metrices.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(metrices.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.sum").value(DEFAULT_SUM))
            .andExpect(jsonPath("$.count").value(DEFAULT_COUNT))
            .andExpect(jsonPath("$.average").value(DEFAULT_AVERAGE));
    }

    @Test
    @Transactional
    public void getNonExistingMetrices() throws Exception {
        // Get the metrices
        restMetricesMockMvc.perform(get("/api/metrices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMetrices() throws Exception {
        // Initialize the database
        metricesService.save(metrices);

        int databaseSizeBeforeUpdate = metricesRepository.findAll().size();

        // Update the metrices
        Metrices updatedMetrices = metricesRepository.findById(metrices.getId()).get();
        // Disconnect from session so that the updates on updatedMetrices are not directly saved in db
        em.detach(updatedMetrices);
        updatedMetrices
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .sum(UPDATED_SUM)
            .count(UPDATED_COUNT)
            .average(UPDATED_AVERAGE);

        restMetricesMockMvc.perform(put("/api/metrices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMetrices)))
            .andExpect(status().isOk());

        // Validate the Metrices in the database
        List<Metrices> metricesList = metricesRepository.findAll();
        assertThat(metricesList).hasSize(databaseSizeBeforeUpdate);
        Metrices testMetrices = metricesList.get(metricesList.size() - 1);
        assertThat(testMetrices.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMetrices.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testMetrices.getSum()).isEqualTo(UPDATED_SUM);
        assertThat(testMetrices.getCount()).isEqualTo(UPDATED_COUNT);
        assertThat(testMetrices.getAverage()).isEqualTo(UPDATED_AVERAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingMetrices() throws Exception {
        int databaseSizeBeforeUpdate = metricesRepository.findAll().size();

        // Create the Metrices

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMetricesMockMvc.perform(put("/api/metrices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(metrices)))
            .andExpect(status().isBadRequest());

        // Validate the Metrices in the database
        List<Metrices> metricesList = metricesRepository.findAll();
        assertThat(metricesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMetrices() throws Exception {
        // Initialize the database
        metricesService.save(metrices);

        int databaseSizeBeforeDelete = metricesRepository.findAll().size();

        // Delete the metrices
        restMetricesMockMvc.perform(delete("/api/metrices/{id}", metrices.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Metrices> metricesList = metricesRepository.findAll();
        assertThat(metricesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Metrices.class);
        Metrices metrices1 = new Metrices();
        metrices1.setId(1L);
        Metrices metrices2 = new Metrices();
        metrices2.setId(metrices1.getId());
        assertThat(metrices1).isEqualTo(metrices2);
        metrices2.setId(2L);
        assertThat(metrices1).isNotEqualTo(metrices2);
        metrices1.setId(null);
        assertThat(metrices1).isNotEqualTo(metrices2);
    }
}
