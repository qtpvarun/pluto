package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.Metrices;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Metrices entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetricesRepository extends JpaRepository<Metrices, Long> {

}
