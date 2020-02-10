package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.Metrices;
import com.btgrp.protrack.service.MetricesService;
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
 * REST controller for managing {@link com.btgrp.protrack.domain.Metrices}.
 */
@RestController
@RequestMapping("/api")
public class MetricesResource {

    private final Logger log = LoggerFactory.getLogger(MetricesResource.class);

    private static final String ENTITY_NAME = "metrices";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MetricesService metricesService;

    public MetricesResource(MetricesService metricesService) {
        this.metricesService = metricesService;
    }

    /**
     * {@code POST  /metrices} : Create a new metrices.
     *
     * @param metrices the metrices to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new metrices, or with status {@code 400 (Bad Request)} if the metrices has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/metrices")
    public ResponseEntity<Metrices> createMetrices(@Valid @RequestBody Metrices metrices) throws URISyntaxException {
        log.debug("REST request to save Metrices : {}", metrices);
        if (metrices.getId() != null) {
            throw new BadRequestAlertException("A new metrices cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Metrices result = metricesService.save(metrices);
        return ResponseEntity.created(new URI("/api/metrices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /metrices} : Updates an existing metrices.
     *
     * @param metrices the metrices to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated metrices,
     * or with status {@code 400 (Bad Request)} if the metrices is not valid,
     * or with status {@code 500 (Internal Server Error)} if the metrices couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/metrices")
    public ResponseEntity<Metrices> updateMetrices(@Valid @RequestBody Metrices metrices) throws URISyntaxException {
        log.debug("REST request to update Metrices : {}", metrices);
        if (metrices.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Metrices result = metricesService.save(metrices);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, metrices.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /metrices} : get all the metrices.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of metrices in body.
     */
    @GetMapping("/metrices")
    public List<Metrices> getAllMetrices() {
        log.debug("REST request to get all Metrices");
        return metricesService.findAll();
    }

    /**
     * {@code GET  /metrices/:id} : get the "id" metrices.
     *
     * @param id the id of the metrices to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the metrices, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/metrices/{id}")
    public ResponseEntity<Metrices> getMetrices(@PathVariable Long id) {
        log.debug("REST request to get Metrices : {}", id);
        Optional<Metrices> metrices = metricesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(metrices);
    }

    /**
     * {@code DELETE  /metrices/:id} : delete the "id" metrices.
     *
     * @param id the id of the metrices to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/metrices/{id}")
    public ResponseEntity<Void> deleteMetrices(@PathVariable Long id) {
        log.debug("REST request to delete Metrices : {}", id);
        metricesService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
