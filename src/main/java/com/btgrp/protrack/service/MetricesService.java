package com.btgrp.protrack.service;

import com.btgrp.protrack.domain.Metrices;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Metrices}.
 */
public interface MetricesService {

    /**
     * Save a metrices.
     *
     * @param metrices the entity to save.
     * @return the persisted entity.
     */
    Metrices save(Metrices metrices);

    /**
     * Get all the metrices.
     *
     * @return the list of entities.
     */
    List<Metrices> findAll();


    /**
     * Get the "id" metrices.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Metrices> findOne(Long id);

    /**
     * Delete the "id" metrices.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
