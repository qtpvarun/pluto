package com.btgrp.protrack.repository;
import com.btgrp.protrack.domain.Project;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Project entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("select project from Project project where project.programManager.login = ?#{principal.username}")
    List<Project> findByProgramManagerIsCurrentUser();

    @Query("select project from Project project where project.projectCoordinator.login = ?#{principal.username}")
    List<Project> findByProjectCoordinatorIsCurrentUser();

    @Query("select project from Project project where project.prpjectLead.login = ?#{principal.username}")
    List<Project> findByPrpjectLeadIsCurrentUser();

    @Query("select project from Project project where project.superviser.login = ?#{principal.username}")
    List<Project> findBySuperviserIsCurrentUser();

    @Query("select project from Project project where project.prpjectManager.login = ?#{principal.username}")
    List<Project> findByPrpjectManagerIsCurrentUser();

    @Query("select project from Project project where project.prpjectEngineer.login = ?#{principal.username}")
    List<Project> findByPrpjectEngineerIsCurrentUser();

    @Query("select project from Project project where project.technician.login = ?#{principal.username}")
    List<Project> findByTechnicianIsCurrentUser();

    @Query("select project from Project project where project.engineerOfRecord.login = ?#{principal.username}")
    List<Project> findByEngineerOfRecordIsCurrentUser();

    @Query("select project from Project project where project.trafficSpecialist.login = ?#{principal.username}")
    List<Project> findByTrafficSpecialistIsCurrentUser();

    @Query("select project from Project project where project.prpjectStaff.login = ?#{principal.username}")
    List<Project> findByPrpjectStaffIsCurrentUser();

    @Query("select project from Project project where project.qualitySpecialist.login = ?#{principal.username}")
    List<Project> findByQualitySpecialistIsCurrentUser();

}
