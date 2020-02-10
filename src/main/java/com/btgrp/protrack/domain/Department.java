package com.btgrp.protrack.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Department.
 */
@Entity
@Table(name = "department")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Department implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "active_flag")
    private Boolean activeFlag;

    @OneToMany(mappedBy = "department")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProjectType> projectTypes = new HashSet<>();

    @OneToMany(mappedBy = "parentProject")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Project> projects = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "department_team",
               joinColumns = @JoinColumn(name = "department_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "team_id", referencedColumnName = "id"))
    private Set<User> teams = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "department_metrices",
               joinColumns = @JoinColumn(name = "department_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "metrices_id", referencedColumnName = "id"))
    private Set<Metrices> metrices = new HashSet<>();

    @OneToMany(mappedBy = "department")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Calender> calenders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Department name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Department description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isActiveFlag() {
        return activeFlag;
    }

    public Department activeFlag(Boolean activeFlag) {
        this.activeFlag = activeFlag;
        return this;
    }

    public void setActiveFlag(Boolean activeFlag) {
        this.activeFlag = activeFlag;
    }

    public Set<ProjectType> getProjectTypes() {
        return projectTypes;
    }

    public Department projectTypes(Set<ProjectType> projectTypes) {
        this.projectTypes = projectTypes;
        return this;
    }

    public Department addProjectTypes(ProjectType projectType) {
        this.projectTypes.add(projectType);
        projectType.setDepartment(this);
        return this;
    }

    public Department removeProjectTypes(ProjectType projectType) {
        this.projectTypes.remove(projectType);
        projectType.setDepartment(null);
        return this;
    }

    public void setProjectTypes(Set<ProjectType> projectTypes) {
        this.projectTypes = projectTypes;
    }

    public Set<Project> getProjects() {
        return projects;
    }

    public Department projects(Set<Project> projects) {
        this.projects = projects;
        return this;
    }

    public Department addProjects(Project project) {
        this.projects.add(project);
        project.setParentProject(this);
        return this;
    }

    public Department removeProjects(Project project) {
        this.projects.remove(project);
        project.setParentProject(null);
        return this;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Set<User> getTeams() {
        return teams;
    }

    public Department teams(Set<User> users) {
        this.teams = users;
        return this;
    }

    public Department addTeam(User user) {
        this.teams.add(user);
        return this;
    }

    public Department removeTeam(User user) {
        this.teams.remove(user);
        return this;
    }

    public void setTeams(Set<User> users) {
        this.teams = users;
    }

    public Set<Metrices> getMetrices() {
        return metrices;
    }

    public Department metrices(Set<Metrices> metrices) {
        this.metrices = metrices;
        return this;
    }

    public Department addMetrices(Metrices metrices) {
        this.metrices.add(metrices);
        metrices.getDepartments().add(this);
        return this;
    }

    public Department removeMetrices(Metrices metrices) {
        this.metrices.remove(metrices);
        metrices.getDepartments().remove(this);
        return this;
    }

    public void setMetrices(Set<Metrices> metrices) {
        this.metrices = metrices;
    }

    public Set<Calender> getCalenders() {
        return calenders;
    }

    public Department calenders(Set<Calender> calenders) {
        this.calenders = calenders;
        return this;
    }

    public Department addCalenders(Calender calender) {
        this.calenders.add(calender);
        calender.setDepartment(this);
        return this;
    }

    public Department removeCalenders(Calender calender) {
        this.calenders.remove(calender);
        calender.setDepartment(null);
        return this;
    }

    public void setCalenders(Set<Calender> calenders) {
        this.calenders = calenders;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Department)) {
            return false;
        }
        return id != null && id.equals(((Department) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Department{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", activeFlag='" + isActiveFlag() + "'" +
            "}";
    }
}
