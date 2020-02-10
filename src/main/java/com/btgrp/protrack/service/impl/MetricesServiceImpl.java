package com.btgrp.protrack.service.impl;

import com.btgrp.protrack.service.MetricesService;
import com.btgrp.protrack.domain.Metrices;
import com.btgrp.protrack.repository.MetricesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Metrices}.
 */
@Service
@Transactional
public class MetricesServiceImpl implements MetricesService {

    private final Logger log = LoggerFactory.getLogger(MetricesServiceImpl.class);

    private final MetricesRepository metricesRepository;

    public MetricesServiceImpl(MetricesRepository metricesRepository) {
        this.metricesRepository = metricesRepository;
    }

    /**
     * Save a metrices.
     *
     * @param metrices the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Metrices save(Metrices metrices) {
        log.debug("Request to save Metrices : {}", metrices);
        return metricesRepository.save(metrices);
    }

    /**
     * Get all the metrices.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Metrices> findAll() {
        log.debug("Request to get all Metrices");
        return metricesRepository.findAll();
    }


    /**
     * Get one metrices by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Metrices> findOne(Long id) {
        log.debug("Request to get Metrices : {}", id);
        return metricesRepository.findById(id);
    }

    /**
     * Delete the metrices by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Metrices : {}", id);
        metricesRepository.deleteById(id);
    }
}
