package com.btgrp.protrack.service;

import com.btgrp.protrack.domain.UserExtention;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link UserExtention}.
 */
public interface UserExtentionService {

    /**
     * Save a userExtention.
     *
     * @param userExtention the entity to save.
     * @return the persisted entity.
     */
    UserExtention save(UserExtention userExtention);

    /**
     * Get all the userExtentions.
     *
     * @return the list of entities.
     */
    List<UserExtention> findAll();


    /**
     * Get the "id" userExtention.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserExtention> findOne(Long id);

    /**
     * Delete the "id" userExtention.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
