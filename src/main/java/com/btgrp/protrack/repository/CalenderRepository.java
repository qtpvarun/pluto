package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.Calender;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Calender entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CalenderRepository extends JpaRepository<Calender, Long> {

    @Query("select calender from Calender calender where calender.assignedTo.login = ?#{principal.username}")
    List<Calender> findByAssignedToIsCurrentUser();

}
