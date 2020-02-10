package com.btgrp.protrack.service;

import com.btgrp.protrack.domain.TaskHistory;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link TaskHistory}.
 */
public interface TaskHistoryService {

    /**
     * Save a taskHistory.
     *
     * @param taskHistory the entity to save.
     * @return the persisted entity.
     */
    TaskHistory save(TaskHistory taskHistory);

    /**
     * Get all the taskHistories.
     *
     * @return the list of entities.
     */
    List<TaskHistory> findAll();
    /**
     * Get all the TaskHistoryDTO where Calender is {@code null}.
     *
     * @return the list of entities.
     */
    List<TaskHistory> findAllWhereCalenderIsNull();


    /**
     * Get the "id" taskHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TaskHistory> findOne(Long id);

    /**
     * Delete the "id" taskHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
