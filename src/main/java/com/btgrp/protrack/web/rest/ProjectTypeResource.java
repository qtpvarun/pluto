package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.ProjectType;
import com.btgrp.protrack.service.ProjectTypeService;
import com.btgrp.protrack.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.btgrp.protrack.domain.ProjectType}.
 */
@RestController
@RequestMapping("/api")
public class ProjectTypeResource {

    private final Logger log = LoggerFactory.getLogger(ProjectTypeResource.class);

    private static final String ENTITY_NAME = "projectType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProjectTypeService projectTypeService;

    public ProjectTypeResource(ProjectTypeService projectTypeService) {
        this.projectTypeService = projectTypeService;
    }

    /**
     * {@code POST  /project-types} : Create a new projectType.
     *
     * @param projectType the projectType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projectType, or with status {@code 400 (Bad Request)} if the projectType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/project-types")
    public ResponseEntity<ProjectType> createProjectType(@Valid @RequestBody ProjectType projectType) throws URISyntaxException {
        log.debug("REST request to save ProjectType : {}", projectType);
        if (projectType.getId() != null) {
            throw new BadRequestAlertException("A new projectType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProjectType result = projectTypeService.save(projectType);
        return ResponseEntity.created(new URI("/api/project-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /project-types} : Updates an existing projectType.
     *
     * @param projectType the projectType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectType,
     * or with status {@code 400 (Bad Request)} if the projectType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projectType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/project-types")
    public ResponseEntity<ProjectType> updateProjectType(@Valid @RequestBody ProjectType projectType) throws URISyntaxException {
        log.debug("REST request to update ProjectType : {}", projectType);
        if (projectType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProjectType result = projectTypeService.save(projectType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /project-types} : get all the projectTypes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projectTypes in body.
     */
    @GetMapping("/project-types")
    public List<ProjectType> getAllProjectTypes() {
        log.debug("REST request to get all ProjectTypes");
        return projectTypeService.findAll();
    }

    /**
     * {@code GET  /project-types/:id} : get the "id" projectType.
     *
     * @param id the id of the projectType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projectType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/project-types/{id}")
    public ResponseEntity<ProjectType> getProjectType(@PathVariable Long id) {
        log.debug("REST request to get ProjectType : {}", id);
        Optional<ProjectType> projectType = projectTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(projectType);
    }

    /**
     * {@code DELETE  /project-types/:id} : delete the "id" projectType.
     *
     * @param id the id of the projectType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/project-types/{id}")
    public ResponseEntity<Void> deleteProjectType(@PathVariable Long id) {
        log.debug("REST request to delete ProjectType : {}", id);
        projectTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
