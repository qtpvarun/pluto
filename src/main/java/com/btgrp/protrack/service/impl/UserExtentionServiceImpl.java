package com.btgrp.protrack.service.impl;

import com.btgrp.protrack.service.UserExtentionService;
import com.btgrp.protrack.domain.UserExtention;
import com.btgrp.protrack.repository.UserExtentionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link UserExtention}.
 */
@Service
@Transactional
public class UserExtentionServiceImpl implements UserExtentionService {

    private final Logger log = LoggerFactory.getLogger(UserExtentionServiceImpl.class);

    private final UserExtentionRepository userExtentionRepository;

    public UserExtentionServiceImpl(UserExtentionRepository userExtentionRepository) {
        this.userExtentionRepository = userExtentionRepository;
    }

    /**
     * Save a userExtention.
     *
     * @param userExtention the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserExtention save(UserExtention userExtention) {
        log.debug("Request to save UserExtention : {}", userExtention);
        return userExtentionRepository.save(userExtention);
    }

    /**
     * Get all the userExtentions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserExtention> findAll() {
        log.debug("Request to get all UserExtentions");
        return userExtentionRepository.findAll();
    }


    /**
     * Get one userExtention by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserExtention> findOne(Long id) {
        log.debug("Request to get UserExtention : {}", id);
        return userExtentionRepository.findById(id);
    }

    /**
     * Delete the userExtention by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserExtention : {}", id);
        userExtentionRepository.deleteById(id);
    }
}
