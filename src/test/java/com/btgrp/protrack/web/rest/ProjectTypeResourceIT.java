package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.ProjectType;
import com.btgrp.protrack.repository.ProjectTypeRepository;
import com.btgrp.protrack.service.ProjectTypeService;
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
 * Integration tests for the {@link ProjectTypeResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class ProjectTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ProjectTypeRepository projectTypeRepository;

    @Autowired
    private ProjectTypeService projectTypeService;

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

    private MockMvc restProjectTypeMockMvc;

    private ProjectType projectType;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProjectTypeResource projectTypeResource = new ProjectTypeResource(projectTypeService);
        this.restProjectTypeMockMvc = MockMvcBuilders.standaloneSetup(projectTypeResource)
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
    public static ProjectType createEntity(EntityManager em) {
        ProjectType projectType = new ProjectType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return projectType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProjectType createUpdatedEntity(EntityManager em) {
        ProjectType projectType = new ProjectType()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return projectType;
    }

    @BeforeEach
    public void initTest() {
        projectType = createEntity(em);
    }

    @Test
    @Transactional
    public void createProjectType() throws Exception {
        int databaseSizeBeforeCreate = projectTypeRepository.findAll().size();

        // Create the ProjectType
        restProjectTypeMockMvc.perform(post("/api/project-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectType)))
            .andExpect(status().isCreated());

        // Validate the ProjectType in the database
        List<ProjectType> projectTypeList = projectTypeRepository.findAll();
        assertThat(projectTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ProjectType testProjectType = projectTypeList.get(projectTypeList.size() - 1);
        assertThat(testProjectType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProjectType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createProjectTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = projectTypeRepository.findAll().size();

        // Create the ProjectType with an existing ID
        projectType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProjectTypeMockMvc.perform(post("/api/project-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectType)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectType in the database
        List<ProjectType> projectTypeList = projectTypeRepository.findAll();
        assertThat(projectTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = projectTypeRepository.findAll().size();
        // set the field null
        projectType.setName(null);

        // Create the ProjectType, which fails.

        restProjectTypeMockMvc.perform(post("/api/project-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectType)))
            .andExpect(status().isBadRequest());

        List<ProjectType> projectTypeList = projectTypeRepository.findAll();
        assertThat(projectTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProjectTypes() throws Exception {
        // Initialize the database
        projectTypeRepository.saveAndFlush(projectType);

        // Get all the projectTypeList
        restProjectTypeMockMvc.perform(get("/api/project-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(projectType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getProjectType() throws Exception {
        // Initialize the database
        projectTypeRepository.saveAndFlush(projectType);

        // Get the projectType
        restProjectTypeMockMvc.perform(get("/api/project-types/{id}", projectType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(projectType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProjectType() throws Exception {
        // Get the projectType
        restProjectTypeMockMvc.perform(get("/api/project-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProjectType() throws Exception {
        // Initialize the database
        projectTypeService.save(projectType);

        int databaseSizeBeforeUpdate = projectTypeRepository.findAll().size();

        // Update the projectType
        ProjectType updatedProjectType = projectTypeRepository.findById(projectType.getId()).get();
        // Disconnect from session so that the updates on updatedProjectType are not directly saved in db
        em.detach(updatedProjectType);
        updatedProjectType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restProjectTypeMockMvc.perform(put("/api/project-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProjectType)))
            .andExpect(status().isOk());

        // Validate the ProjectType in the database
        List<ProjectType> projectTypeList = projectTypeRepository.findAll();
        assertThat(projectTypeList).hasSize(databaseSizeBeforeUpdate);
        ProjectType testProjectType = projectTypeList.get(projectTypeList.size() - 1);
        assertThat(testProjectType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProjectType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingProjectType() throws Exception {
        int databaseSizeBeforeUpdate = projectTypeRepository.findAll().size();

        // Create the ProjectType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProjectTypeMockMvc.perform(put("/api/project-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(projectType)))
            .andExpect(status().isBadRequest());

        // Validate the ProjectType in the database
        List<ProjectType> projectTypeList = projectTypeRepository.findAll();
        assertThat(projectTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProjectType() throws Exception {
        // Initialize the database
        projectTypeService.save(projectType);

        int databaseSizeBeforeDelete = projectTypeRepository.findAll().size();

        // Delete the projectType
        restProjectTypeMockMvc.perform(delete("/api/project-types/{id}", projectType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProjectType> projectTypeList = projectTypeRepository.findAll();
        assertThat(projectTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProjectType.class);
        ProjectType projectType1 = new ProjectType();
        projectType1.setId(1L);
        ProjectType projectType2 = new ProjectType();
        projectType2.setId(projectType1.getId());
        assertThat(projectType1).isEqualTo(projectType2);
        projectType2.setId(2L);
        assertThat(projectType1).isNotEqualTo(projectType2);
        projectType1.setId(null);
        assertThat(projectType1).isNotEqualTo(projectType2);
    }
}
