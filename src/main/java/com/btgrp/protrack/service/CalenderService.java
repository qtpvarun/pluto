package com.btgrp.protrack.service;

import com.btgrp.protrack.domain.Calender;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Calender}.
 */
public interface CalenderService {

    /**
     * Save a calender.
     *
     * @param calender the entity to save.
     * @return the persisted entity.
     */
    Calender save(Calender calender);

    /**
     * Get all the calenders.
     *
     * @return the list of entities.
     */
    List<Calender> findAll();


    /**
     * Get the "id" calender.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Calender> findOne(Long id);

    /**
     * Delete the "id" calender.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
