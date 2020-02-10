package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.ProTrackApp;
import com.btgrp.protrack.domain.UserExtention;
import com.btgrp.protrack.repository.UserExtentionRepository;
import com.btgrp.protrack.service.UserExtentionService;
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
 * Integration tests for the {@link UserExtentionResource} REST controller.
 */
@SpringBootTest(classes = ProTrackApp.class)
public class UserExtentionResourceIT {

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_PROFILE_PIC = "AAAAAAAAAA";
    private static final String UPDATED_PROFILE_PIC = "BBBBBBBBBB";

    private static final String DEFAULT_GROUP = "AAAAAAAAAA";
    private static final String UPDATED_GROUP = "BBBBBBBBBB";

    private static final String DEFAULT_JSON_OTHER_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_JSON_OTHER_DETAILS = "BBBBBBBBBB";

    @Autowired
    private UserExtentionRepository userExtentionRepository;

    @Autowired
    private UserExtentionService userExtentionService;

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

    private MockMvc restUserExtentionMockMvc;

    private UserExtention userExtention;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserExtentionResource userExtentionResource = new UserExtentionResource(userExtentionService);
        this.restUserExtentionMockMvc = MockMvcBuilders.standaloneSetup(userExtentionResource)
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
    public static UserExtention createEntity(EntityManager em) {
        UserExtention userExtention = new UserExtention()
            .login(DEFAULT_LOGIN)
            .profilePic(DEFAULT_PROFILE_PIC)
            .group(DEFAULT_GROUP)
            .jsonOtherDetails(DEFAULT_JSON_OTHER_DETAILS);
        return userExtention;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserExtention createUpdatedEntity(EntityManager em) {
        UserExtention userExtention = new UserExtention()
            .login(UPDATED_LOGIN)
            .profilePic(UPDATED_PROFILE_PIC)
            .group(UPDATED_GROUP)
            .jsonOtherDetails(UPDATED_JSON_OTHER_DETAILS);
        return userExtention;
    }

    @BeforeEach
    public void initTest() {
        userExtention = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserExtention() throws Exception {
        int databaseSizeBeforeCreate = userExtentionRepository.findAll().size();

        // Create the UserExtention
        restUserExtentionMockMvc.perform(post("/api/user-extentions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtention)))
            .andExpect(status().isCreated());

        // Validate the UserExtention in the database
        List<UserExtention> userExtentionList = userExtentionRepository.findAll();
        assertThat(userExtentionList).hasSize(databaseSizeBeforeCreate + 1);
        UserExtention testUserExtention = userExtentionList.get(userExtentionList.size() - 1);
        assertThat(testUserExtention.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testUserExtention.getProfilePic()).isEqualTo(DEFAULT_PROFILE_PIC);
        assertThat(testUserExtention.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testUserExtention.getJsonOtherDetails()).isEqualTo(DEFAULT_JSON_OTHER_DETAILS);
    }

    @Test
    @Transactional
    public void createUserExtentionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userExtentionRepository.findAll().size();

        // Create the UserExtention with an existing ID
        userExtention.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserExtentionMockMvc.perform(post("/api/user-extentions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtention)))
            .andExpect(status().isBadRequest());

        // Validate the UserExtention in the database
        List<UserExtention> userExtentionList = userExtentionRepository.findAll();
        assertThat(userExtentionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLoginIsRequired() throws Exception {
        int databaseSizeBeforeTest = userExtentionRepository.findAll().size();
        // set the field null
        userExtention.setLogin(null);

        // Create the UserExtention, which fails.

        restUserExtentionMockMvc.perform(post("/api/user-extentions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtention)))
            .andExpect(status().isBadRequest());

        List<UserExtention> userExtentionList = userExtentionRepository.findAll();
        assertThat(userExtentionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserExtentions() throws Exception {
        // Initialize the database
        userExtentionRepository.saveAndFlush(userExtention);

        // Get all the userExtentionList
        restUserExtentionMockMvc.perform(get("/api/user-extentions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userExtention.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].profilePic").value(hasItem(DEFAULT_PROFILE_PIC.toString())))
            .andExpect(jsonPath("$.[*].group").value(hasItem(DEFAULT_GROUP.toString())))
            .andExpect(jsonPath("$.[*].jsonOtherDetails").value(hasItem(DEFAULT_JSON_OTHER_DETAILS.toString())));
    }
    
    @Test
    @Transactional
    public void getUserExtention() throws Exception {
        // Initialize the database
        userExtentionRepository.saveAndFlush(userExtention);

        // Get the userExtention
        restUserExtentionMockMvc.perform(get("/api/user-extentions/{id}", userExtention.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userExtention.getId().intValue()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()))
            .andExpect(jsonPath("$.profilePic").value(DEFAULT_PROFILE_PIC.toString()))
            .andExpect(jsonPath("$.group").value(DEFAULT_GROUP.toString()))
            .andExpect(jsonPath("$.jsonOtherDetails").value(DEFAULT_JSON_OTHER_DETAILS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserExtention() throws Exception {
        // Get the userExtention
        restUserExtentionMockMvc.perform(get("/api/user-extentions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserExtention() throws Exception {
        // Initialize the database
        userExtentionService.save(userExtention);

        int databaseSizeBeforeUpdate = userExtentionRepository.findAll().size();

        // Update the userExtention
        UserExtention updatedUserExtention = userExtentionRepository.findById(userExtention.getId()).get();
        // Disconnect from session so that the updates on updatedUserExtention are not directly saved in db
        em.detach(updatedUserExtention);
        updatedUserExtention
            .login(UPDATED_LOGIN)
            .profilePic(UPDATED_PROFILE_PIC)
            .group(UPDATED_GROUP)
            .jsonOtherDetails(UPDATED_JSON_OTHER_DETAILS);

        restUserExtentionMockMvc.perform(put("/api/user-extentions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserExtention)))
            .andExpect(status().isOk());

        // Validate the UserExtention in the database
        List<UserExtention> userExtentionList = userExtentionRepository.findAll();
        assertThat(userExtentionList).hasSize(databaseSizeBeforeUpdate);
        UserExtention testUserExtention = userExtentionList.get(userExtentionList.size() - 1);
        assertThat(testUserExtention.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testUserExtention.getProfilePic()).isEqualTo(UPDATED_PROFILE_PIC);
        assertThat(testUserExtention.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testUserExtention.getJsonOtherDetails()).isEqualTo(UPDATED_JSON_OTHER_DETAILS);
    }

    @Test
    @Transactional
    public void updateNonExistingUserExtention() throws Exception {
        int databaseSizeBeforeUpdate = userExtentionRepository.findAll().size();

        // Create the UserExtention

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserExtentionMockMvc.perform(put("/api/user-extentions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtention)))
            .andExpect(status().isBadRequest());

        // Validate the UserExtention in the database
        List<UserExtention> userExtentionList = userExtentionRepository.findAll();
        assertThat(userExtentionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserExtention() throws Exception {
        // Initialize the database
        userExtentionService.save(userExtention);

        int databaseSizeBeforeDelete = userExtentionRepository.findAll().size();

        // Delete the userExtention
        restUserExtentionMockMvc.perform(delete("/api/user-extentions/{id}", userExtention.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserExtention> userExtentionList = userExtentionRepository.findAll();
        assertThat(userExtentionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserExtention.class);
        UserExtention userExtention1 = new UserExtention();
        userExtention1.setId(1L);
        UserExtention userExtention2 = new UserExtention();
        userExtention2.setId(userExtention1.getId());
        assertThat(userExtention1).isEqualTo(userExtention2);
        userExtention2.setId(2L);
        assertThat(userExtention1).isNotEqualTo(userExtention2);
        userExtention1.setId(null);
        assertThat(userExtention1).isNotEqualTo(userExtention2);
    }
}
