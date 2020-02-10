package com.btgrp.protrack.service.impl;

import com.btgrp.protrack.service.ProjectTypeService;
import com.btgrp.protrack.domain.ProjectType;
import com.btgrp.protrack.repository.ProjectTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ProjectType}.
 */
@Service
@Transactional
public class ProjectTypeServiceImpl implements ProjectTypeService {

    private final Logger log = LoggerFactory.getLogger(ProjectTypeServiceImpl.class);

    private final ProjectTypeRepository projectTypeRepository;

    public ProjectTypeServiceImpl(ProjectTypeRepository projectTypeRepository) {
        this.projectTypeRepository = projectTypeRepository;
    }

    /**
     * Save a projectType.
     *
     * @param projectType the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProjectType save(ProjectType projectType) {
        log.debug("Request to save ProjectType : {}", projectType);
        return projectTypeRepository.save(projectType);
    }

    /**
     * Get all the projectTypes.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProjectType> findAll() {
        log.debug("Request to get all ProjectTypes");
        return projectTypeRepository.findAll();
    }


    /**
     * Get one projectType by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProjectType> findOne(Long id) {
        log.debug("Request to get ProjectType : {}", id);
        return projectTypeRepository.findById(id);
    }

    /**
     * Delete the projectType by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProjectType : {}", id);
        projectTypeRepository.deleteById(id);
    }
}
