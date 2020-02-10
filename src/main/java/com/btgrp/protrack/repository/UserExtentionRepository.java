package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.UserExtention;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UserExtention entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserExtentionRepository extends JpaRepository<UserExtention, Long> {

}
