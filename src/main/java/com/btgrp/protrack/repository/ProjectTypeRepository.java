package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.ProjectType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProjectType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectTypeRepository extends JpaRepository<ProjectType, Long> {

}
