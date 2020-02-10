package com.btgrp.protrack.service;

import com.btgrp.protrack.domain.SubTask;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link SubTask}.
 */
public interface SubTaskService {

    /**
     * Save a subTask.
     *
     * @param subTask the entity to save.
     * @return the persisted entity.
     */
    SubTask save(SubTask subTask);

    /**
     * Get all the subTasks.
     *
     * @return the list of entities.
     */
    List<SubTask> findAll();


    /**
     * Get the "id" subTask.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SubTask> findOne(Long id);

    /**
     * Delete the "id" subTask.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
