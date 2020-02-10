package com.btgrp.protrack.service.impl;

import com.btgrp.protrack.service.CalenderService;
import com.btgrp.protrack.domain.Calender;
import com.btgrp.protrack.repository.CalenderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Calender}.
 */
@Service
@Transactional
public class CalenderServiceImpl implements CalenderService {

    private final Logger log = LoggerFactory.getLogger(CalenderServiceImpl.class);

    private final CalenderRepository calenderRepository;

    public CalenderServiceImpl(CalenderRepository calenderRepository) {
        this.calenderRepository = calenderRepository;
    }

    /**
     * Save a calender.
     *
     * @param calender the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Calender save(Calender calender) {
        log.debug("Request to save Calender : {}", calender);
        return calenderRepository.save(calender);
    }

    /**
     * Get all the calenders.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<Calender> findAll() {
        log.debug("Request to get all Calenders");
        return calenderRepository.findAll();
    }


    /**
     * Get one calender by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Calender> findOne(Long id) {
        log.debug("Request to get Calender : {}", id);
        return calenderRepository.findById(id);
    }

    /**
     * Delete the calender by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Calender : {}", id);
        calenderRepository.deleteById(id);
    }
}
