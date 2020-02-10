package com.btgrp.protrack.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Calender.
 */
@Entity
@Table(name = "calender")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Calender implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "json_ui_details")
    private String jsonUIDetails;

    @OneToOne
    @JoinColumn(unique = true)
    private TaskHistory taskHistory;

    @ManyToOne
    @JsonIgnoreProperties("calenders")
    private Task task;

    @ManyToOne
    @JsonIgnoreProperties("calenders")
    private Project project;

    @ManyToOne
    @JsonIgnoreProperties("calenders")
    private Department department;

    @ManyToOne
    @JsonIgnoreProperties("calenders")
    private User assignedTo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Calender title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Calender startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Calender endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public String getJsonUIDetails() {
        return jsonUIDetails;
    }

    public Calender jsonUIDetails(String jsonUIDetails) {
        this.jsonUIDetails = jsonUIDetails;
        return this;
    }

    public void setJsonUIDetails(String jsonUIDetails) {
        this.jsonUIDetails = jsonUIDetails;
    }

    public TaskHistory getTaskHistory() {
        return taskHistory;
    }

    public Calender taskHistory(TaskHistory taskHistory) {
        this.taskHistory = taskHistory;
        return this;
    }

    public void setTaskHistory(TaskHistory taskHistory) {
        this.taskHistory = taskHistory;
    }

    public Task getTask() {
        return task;
    }

    public Calender task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public Project getProject() {
        return project;
    }

    public Calender project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Department getDepartment() {
        return department;
    }

    public Calender department(Department department) {
        this.department = department;
        return this;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public Calender assignedTo(User user) {
        this.assignedTo = user;
        return this;
    }

    public void setAssignedTo(User user) {
        this.assignedTo = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Calender)) {
            return false;
        }
        return id != null && id.equals(((Calender) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Calender{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", jsonUIDetails='" + getJsonUIDetails() + "'" +
            "}";
    }
}
