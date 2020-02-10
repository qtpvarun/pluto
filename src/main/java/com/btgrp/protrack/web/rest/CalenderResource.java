package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.Calender;
import com.btgrp.protrack.service.CalenderService;
import com.btgrp.protrack.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.btgrp.protrack.domain.Calender}.
 */
@RestController
@RequestMapping("/api")
public class CalenderResource {

    private final Logger log = LoggerFactory.getLogger(CalenderResource.class);

    private static final String ENTITY_NAME = "calender";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CalenderService calenderService;

    public CalenderResource(CalenderService calenderService) {
        this.calenderService = calenderService;
    }

    /**
     * {@code POST  /calenders} : Create a new calender.
     *
     * @param calender the calender to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new calender, or with status {@code 400 (Bad Request)} if the calender has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/calenders")
    public ResponseEntity<Calender> createCalender(@Valid @RequestBody Calender calender) throws URISyntaxException {
        log.debug("REST request to save Calender : {}", calender);
        if (calender.getId() != null) {
            throw new BadRequestAlertException("A new calender cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Calender result = calenderService.save(calender);
        return ResponseEntity.created(new URI("/api/calenders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /calenders} : Updates an existing calender.
     *
     * @param calender the calender to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated calender,
     * or with status {@code 400 (Bad Request)} if the calender is not valid,
     * or with status {@code 500 (Internal Server Error)} if the calender couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/calenders")
    public ResponseEntity<Calender> updateCalender(@Valid @RequestBody Calender calender) throws URISyntaxException {
        log.debug("REST request to update Calender : {}", calender);
        if (calender.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Calender result = calenderService.save(calender);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, calender.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /calenders} : get all the calenders.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of calenders in body.
     */
    @GetMapping("/calenders")
    public List<Calender> getAllCalenders() {
        log.debug("REST request to get all Calenders");
        return calenderService.findAll();
    }

    /**
     * {@code GET  /calenders/:id} : get the "id" calender.
     *
     * @param id the id of the calender to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the calender, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/calenders/{id}")
    public ResponseEntity<Calender> getCalender(@PathVariable Long id) {
        log.debug("REST request to get Calender : {}", id);
        Optional<Calender> calender = calenderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(calender);
    }

    /**
     * {@code DELETE  /calenders/:id} : delete the "id" calender.
     *
     * @param id the id of the calender to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/calenders/{id}")
    public ResponseEntity<Void> deleteCalender(@PathVariable Long id) {
        log.debug("REST request to delete Calender : {}", id);
        calenderService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
