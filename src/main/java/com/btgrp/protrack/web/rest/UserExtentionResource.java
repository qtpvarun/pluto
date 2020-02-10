package com.btgrp.protrack.web.rest;

import com.btgrp.protrack.domain.UserExtention;
import com.btgrp.protrack.service.UserExtentionService;
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
 * REST controller for managing {@link com.btgrp.protrack.domain.UserExtention}.
 */
@RestController
@RequestMapping("/api")
public class UserExtentionResource {

    private final Logger log = LoggerFactory.getLogger(UserExtentionResource.class);

    private static final String ENTITY_NAME = "userExtention";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserExtentionService userExtentionService;

    public UserExtentionResource(UserExtentionService userExtentionService) {
        this.userExtentionService = userExtentionService;
    }

    /**
     * {@code POST  /user-extentions} : Create a new userExtention.
     *
     * @param userExtention the userExtention to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userExtention, or with status {@code 400 (Bad Request)} if the userExtention has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-extentions")
    public ResponseEntity<UserExtention> createUserExtention(@Valid @RequestBody UserExtention userExtention) throws URISyntaxException {
        log.debug("REST request to save UserExtention : {}", userExtention);
        if (userExtention.getId() != null) {
            throw new BadRequestAlertException("A new userExtention cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserExtention result = userExtentionService.save(userExtention);
        return ResponseEntity.created(new URI("/api/user-extentions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-extentions} : Updates an existing userExtention.
     *
     * @param userExtention the userExtention to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userExtention,
     * or with status {@code 400 (Bad Request)} if the userExtention is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userExtention couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-extentions")
    public ResponseEntity<UserExtention> updateUserExtention(@Valid @RequestBody UserExtention userExtention) throws URISyntaxException {
        log.debug("REST request to update UserExtention : {}", userExtention);
        if (userExtention.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserExtention result = userExtentionService.save(userExtention);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userExtention.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-extentions} : get all the userExtentions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userExtentions in body.
     */
    @GetMapping("/user-extentions")
    public List<UserExtention> getAllUserExtentions() {
        log.debug("REST request to get all UserExtentions");
        return userExtentionService.findAll();
    }

    /**
     * {@code GET  /user-extentions/:id} : get the "id" userExtention.
     *
     * @param id the id of the userExtention to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userExtention, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-extentions/{id}")
    public ResponseEntity<UserExtention> getUserExtention(@PathVariable Long id) {
        log.debug("REST request to get UserExtention : {}", id);
        Optional<UserExtention> userExtention = userExtentionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userExtention);
    }

    /**
     * {@code DELETE  /user-extentions/:id} : delete the "id" userExtention.
     *
     * @param id the id of the userExtention to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-extentions/{id}")
    public ResponseEntity<Void> deleteUserExtention(@PathVariable Long id) {
        log.debug("REST request to delete UserExtention : {}", id);
        userExtentionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
