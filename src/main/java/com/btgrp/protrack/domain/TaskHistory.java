package com.btgrp.protrack.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import com.btgrp.protrack.domain.enumeration.EventType;

/**
 * A TaskHistory.
 */
@Entity
@Table(name = "task_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TaskHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_date")
    private Instant eventDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type")
    private EventType eventType;

    @Column(name = "event_topic")
    private String eventTopic;

    @Column(name = "event_detail")
    private String eventDetail;

    @Column(name = "is_redline")
    private Boolean isRedline;

    @Column(name = "is_idle_task")
    private Boolean isIdleTask;

    @Column(name = "json_ui_details")
    private String jsonUIDetails;

    @OneToOne(mappedBy = "taskHistory")
    @JsonIgnore
    private Calender calender;

    @ManyToOne
    @JsonIgnoreProperties("taskHistories")
    private Task parentTask;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getEventDate() {
        return eventDate;
    }

    public TaskHistory eventDate(Instant eventDate) {
        this.eventDate = eventDate;
        return this;
    }

    public void setEventDate(Instant eventDate) {
        this.eventDate = eventDate;
    }

    public EventType getEventType() {
        return eventType;
    }

    public TaskHistory eventType(EventType eventType) {
        this.eventType = eventType;
        return this;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public String getEventTopic() {
        return eventTopic;
    }

    public TaskHistory eventTopic(String eventTopic) {
        this.eventTopic = eventTopic;
        return this;
    }

    public void setEventTopic(String eventTopic) {
        this.eventTopic = eventTopic;
    }

    public String getEventDetail() {
        return eventDetail;
    }

    public TaskHistory eventDetail(String eventDetail) {
        this.eventDetail = eventDetail;
        return this;
    }

    public void setEventDetail(String eventDetail) {
        this.eventDetail = eventDetail;
    }

    public Boolean isIsRedline() {
        return isRedline;
    }

    public TaskHistory isRedline(Boolean isRedline) {
        this.isRedline = isRedline;
        return this;
    }

    public void setIsRedline(Boolean isRedline) {
        this.isRedline = isRedline;
    }

    public Boolean isIsIdleTask() {
        return isIdleTask;
    }

    public TaskHistory isIdleTask(Boolean isIdleTask) {
        this.isIdleTask = isIdleTask;
        return this;
    }

    public void setIsIdleTask(Boolean isIdleTask) {
        this.isIdleTask = isIdleTask;
    }

    public String getJsonUIDetails() {
        return jsonUIDetails;
    }

    public TaskHistory jsonUIDetails(String jsonUIDetails) {
        this.jsonUIDetails = jsonUIDetails;
        return this;
    }

    public void setJsonUIDetails(String jsonUIDetails) {
        this.jsonUIDetails = jsonUIDetails;
    }

    public Calender getCalender() {
        return calender;
    }

    public TaskHistory calender(Calender calender) {
        this.calender = calender;
        return this;
    }

    public void setCalender(Calender calender) {
        this.calender = calender;
    }

    public Task getParentTask() {
        return parentTask;
    }

    public TaskHistory parentTask(Task task) {
        this.parentTask = task;
        return this;
    }

    public void setParentTask(Task task) {
        this.parentTask = task;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TaskHistory)) {
            return false;
        }
        return id != null && id.equals(((TaskHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TaskHistory{" +
            "id=" + getId() +
            ", eventDate='" + getEventDate() + "'" +
            ", eventType='" + getEventType() + "'" +
            ", eventTopic='" + getEventTopic() + "'" +
            ", eventDetail='" + getEventDetail() + "'" +
            ", isRedline='" + isIsRedline() + "'" +
            ", isIdleTask='" + isIsIdleTask() + "'" +
            ", jsonUIDetails='" + getJsonUIDetails() + "'" +
            "}";
    }
}
