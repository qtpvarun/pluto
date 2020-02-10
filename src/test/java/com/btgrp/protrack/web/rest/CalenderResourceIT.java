package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.Calender;
import com.btgrp.protrack.repository.CalenderRepository;
import com.btgrp.protrack.service.CalenderService;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.btgrp.protrack.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CalenderResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class CalenderResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_START_DATE = Instant.ofEpochMilli(-1L);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);
    private static final Instant SMALLER_END_DATE = Instant.ofEpochMilli(-1L);

    private static final String DEFAULT_JSON_UI_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_JSON_UI_DETAILS = "BBBBBBBBBB";

    @Autowired
    private CalenderRepository calenderRepository;

    @Autowired
    private CalenderService calenderService;

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

    private MockMvc restCalenderMockMvc;

    private Calender calender;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CalenderResource calenderResource = new CalenderResource(calenderService);
        this.restCalenderMockMvc = MockMvcBuilders.standaloneSetup(calenderResource)
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
    public static Calender createEntity(EntityManager em) {
        Calender calender = new Calender()
            .title(DEFAULT_TITLE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .jsonUIDetails(DEFAULT_JSON_UI_DETAILS);
        return calender;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Calender createUpdatedEntity(EntityManager em) {
        Calender calender = new Calender()
            .title(UPDATED_TITLE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .jsonUIDetails(UPDATED_JSON_UI_DETAILS);
        return calender;
    }

    @BeforeEach
    public void initTest() {
        calender = createEntity(em);
    }

    @Test
    @Transactional
    public void createCalender() throws Exception {
        int databaseSizeBeforeCreate = calenderRepository.findAll().size();

        // Create the Calender
        restCalenderMockMvc.perform(post("/api/calenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calender)))
            .andExpect(status().isCreated());

        // Validate the Calender in the database
        List<Calender> calenderList = calenderRepository.findAll();
        assertThat(calenderList).hasSize(databaseSizeBeforeCreate + 1);
        Calender testCalender = calenderList.get(calenderList.size() - 1);
        assertThat(testCalender.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCalender.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testCalender.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testCalender.getJsonUIDetails()).isEqualTo(DEFAULT_JSON_UI_DETAILS);
    }

    @Test
    @Transactional
    public void createCalenderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = calenderRepository.findAll().size();

        // Create the Calender with an existing ID
        calender.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCalenderMockMvc.perform(post("/api/calenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calender)))
            .andExpect(status().isBadRequest());

        // Validate the Calender in the database
        List<Calender> calenderList = calenderRepository.findAll();
        assertThat(calenderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = calenderRepository.findAll().size();
        // set the field null
        calender.setTitle(null);

        // Create the Calender, which fails.

        restCalenderMockMvc.perform(post("/api/calenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calender)))
            .andExpect(status().isBadRequest());

        List<Calender> calenderList = calenderRepository.findAll();
        assertThat(calenderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCalenders() throws Exception {
        // Initialize the database
        calenderRepository.saveAndFlush(calender);

        // Get all the calenderList
        restCalenderMockMvc.perform(get("/api/calenders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(calender.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].jsonUIDetails").value(hasItem(DEFAULT_JSON_UI_DETAILS.toString())));
    }
    
    @Test
    @Transactional
    public void getCalender() throws Exception {
        // Initialize the database
        calenderRepository.saveAndFlush(calender);

        // Get the calender
        restCalenderMockMvc.perform(get("/api/calenders/{id}", calender.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(calender.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.jsonUIDetails").value(DEFAULT_JSON_UI_DETAILS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCalender() throws Exception {
        // Get the calender
        restCalenderMockMvc.perform(get("/api/calenders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCalender() throws Exception {
        // Initialize the database
        calenderService.save(calender);

        int databaseSizeBeforeUpdate = calenderRepository.findAll().size();

        // Update the calender
        Calender updatedCalender = calenderRepository.findById(calender.getId()).get();
        // Disconnect from session so that the updates on updatedCalender are not directly saved in db
        em.detach(updatedCalender);
        updatedCalender
            .title(UPDATED_TITLE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .jsonUIDetails(UPDATED_JSON_UI_DETAILS);

        restCalenderMockMvc.perform(put("/api/calenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCalender)))
            .andExpect(status().isOk());

        // Validate the Calender in the database
        List<Calender> calenderList = calenderRepository.findAll();
        assertThat(calenderList).hasSize(databaseSizeBeforeUpdate);
        Calender testCalender = calenderList.get(calenderList.size() - 1);
        assertThat(testCalender.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCalender.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testCalender.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testCalender.getJsonUIDetails()).isEqualTo(UPDATED_JSON_UI_DETAILS);
    }

    @Test
    @Transactional
    public void updateNonExistingCalender() throws Exception {
        int databaseSizeBeforeUpdate = calenderRepository.findAll().size();

        // Create the Calender

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCalenderMockMvc.perform(put("/api/calenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(calender)))
            .andExpect(status().isBadRequest());

        // Validate the Calender in the database
        List<Calender> calenderList = calenderRepository.findAll();
        assertThat(calenderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCalender() throws Exception {
        // Initialize the database
        calenderService.save(calender);

        int databaseSizeBeforeDelete = calenderRepository.findAll().size();

        // Delete the calender
        restCalenderMockMvc.perform(delete("/api/calenders/{id}", calender.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Calender> calenderList = calenderRepository.findAll();
        assertThat(calenderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Calender.class);
        Calender calender1 = new Calender();
        calender1.setId(1L);
        Calender calender2 = new Calender();
        calender2.setId(calender1.getId());
        assertThat(calender1).isEqualTo(calender2);
        calender2.setId(2L);
        assertThat(calender1).isNotEqualTo(calender2);
        calender1.setId(null);
        assertThat(calender1).isNotEqualTo(calender2);
    }
}
