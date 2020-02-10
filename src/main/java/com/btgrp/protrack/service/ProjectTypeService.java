package com.btgrp.protrack.service;

import com.btgrp.protrack.domain.ProjectType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link ProjectType}.
 */
public interface ProjectTypeService {

    /**
     * Save a projectType.
     *
     * @param projectType the entity to save.
     * @return the persisted entity.
     */
    ProjectType save(ProjectType projectType);

    /**
     * Get all the projectTypes.
     *
     * @return the list of entities.
     */
    List<ProjectType> findAll();


    /**
     * Get the "id" projectType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProjectType> findOne(Long id);

    /**
     * Delete the "id" projectType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
