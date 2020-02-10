package com.btgrp.protrack.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.btgrp.protrack.domain.enumeration.SiteType;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "billing_company")
    private String billingCompany;

    @Column(name = "career_name")
    private String careerName;

    @Column(name = "site_number")
    private Integer siteNumber;

    @Column(name = "site_name")
    private String siteName;

    @Column(name = "site_company")
    private String siteCompany;

    @Column(name = "site_latitude")
    private Double siteLatitude;

    @Column(name = "site_longitude")
    private Double siteLongitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "site_type")
    private SiteType siteType;

    @Column(name = "is_site_360")
    private Boolean isSite360;

    @Column(name = "internal_due")
    private Instant internalDue;

    @Column(name = "p_o_number")
    private String pONumber;

    @OneToMany(mappedBy = "parentProject")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private ProjectType projectType;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User programManager;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User projectCoordinator;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User prpjectLead;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User superviser;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User prpjectManager;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User prpjectEngineer;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User technician;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User engineerOfRecord;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User trafficSpecialist;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User prpjectStaff;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private User qualitySpecialist;

    @ManyToOne
    @JsonIgnoreProperties("projects")
    private Department parentProject;

    @OneToMany(mappedBy = "project")
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

    public Project name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Project description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBillingCompany() {
        return billingCompany;
    }

    public Project billingCompany(String billingCompany) {
        this.billingCompany = billingCompany;
        return this;
    }

    public void setBillingCompany(String billingCompany) {
        this.billingCompany = billingCompany;
    }

    public String getCareerName() {
        return careerName;
    }

    public Project careerName(String careerName) {
        this.careerName = careerName;
        return this;
    }

    public void setCareerName(String careerName) {
        this.careerName = careerName;
    }

    public Integer getSiteNumber() {
        return siteNumber;
    }

    public Project siteNumber(Integer siteNumber) {
        this.siteNumber = siteNumber;
        return this;
    }

    public void setSiteNumber(Integer siteNumber) {
        this.siteNumber = siteNumber;
    }

    public String getSiteName() {
        return siteName;
    }

    public Project siteName(String siteName) {
        this.siteName = siteName;
        return this;
    }

    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }

    public String getSiteCompany() {
        return siteCompany;
    }

    public Project siteCompany(String siteCompany) {
        this.siteCompany = siteCompany;
        return this;
    }

    public void setSiteCompany(String siteCompany) {
        this.siteCompany = siteCompany;
    }

    public Double getSiteLatitude() {
        return siteLatitude;
    }

    public Project siteLatitude(Double siteLatitude) {
        this.siteLatitude = siteLatitude;
        return this;
    }

    public void setSiteLatitude(Double siteLatitude) {
        this.siteLatitude = siteLatitude;
    }

    public Double getSiteLongitude() {
        return siteLongitude;
    }

    public Project siteLongitude(Double siteLongitude) {
        this.siteLongitude = siteLongitude;
        return this;
    }

    public void setSiteLongitude(Double siteLongitude) {
        this.siteLongitude = siteLongitude;
    }

    public SiteType getSiteType() {
        return siteType;
    }

    public Project siteType(SiteType siteType) {
        this.siteType = siteType;
        return this;
    }

    public void setSiteType(SiteType siteType) {
        this.siteType = siteType;
    }

    public Boolean isIsSite360() {
        return isSite360;
    }

    public Project isSite360(Boolean isSite360) {
        this.isSite360 = isSite360;
        return this;
    }

    public void setIsSite360(Boolean isSite360) {
        this.isSite360 = isSite360;
    }

    public Instant getInternalDue() {
        return internalDue;
    }

    public Project internalDue(Instant internalDue) {
        this.internalDue = internalDue;
        return this;
    }

    public void setInternalDue(Instant internalDue) {
        this.internalDue = internalDue;
    }

    public String getpONumber() {
        return pONumber;
    }

    public Project pONumber(String pONumber) {
        this.pONumber = pONumber;
        return this;
    }

    public void setpONumber(String pONumber) {
        this.pONumber = pONumber;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Project tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Project addTasks(Task task) {
        this.tasks.add(task);
        task.setParentProject(this);
        return this;
    }

    public Project removeTasks(Task task) {
        this.tasks.remove(task);
        task.setParentProject(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public ProjectType getProjectType() {
        return projectType;
    }

    public Project projectType(ProjectType projectType) {
        this.projectType = projectType;
        return this;
    }

    public void setProjectType(ProjectType projectType) {
        this.projectType = projectType;
    }

    public User getProgramManager() {
        return programManager;
    }

    public Project programManager(User user) {
        this.programManager = user;
        return this;
    }

    public void setProgramManager(User user) {
        this.programManager = user;
    }

    public User getProjectCoordinator() {
        return projectCoordinator;
    }

    public Project projectCoordinator(User user) {
        this.projectCoordinator = user;
        return this;
    }

    public void setProjectCoordinator(User user) {
        this.projectCoordinator = user;
    }

    public User getPrpjectLead() {
        return prpjectLead;
    }

    public Project prpjectLead(User user) {
        this.prpjectLead = user;
        return this;
    }

    public void setPrpjectLead(User user) {
        this.prpjectLead = user;
    }

    public User getSuperviser() {
        return superviser;
    }

    public Project superviser(User user) {
        this.superviser = user;
        return this;
    }

    public void setSuperviser(User user) {
        this.superviser = user;
    }

    public User getPrpjectManager() {
        return prpjectManager;
    }

    public Project prpjectManager(User user) {
        this.prpjectManager = user;
        return this;
    }

    public void setPrpjectManager(User user) {
        this.prpjectManager = user;
    }

    public User getPrpjectEngineer() {
        return prpjectEngineer;
    }

    public Project prpjectEngineer(User user) {
        this.prpjectEngineer = user;
        return this;
    }

    public void setPrpjectEngineer(User user) {
        this.prpjectEngineer = user;
    }

    public User getTechnician() {
        return technician;
    }

    public Project technician(User user) {
        this.technician = user;
        return this;
    }

    public void setTechnician(User user) {
        this.technician = user;
    }

    public User getEngineerOfRecord() {
        return engineerOfRecord;
    }

    public Project engineerOfRecord(User user) {
        this.engineerOfRecord = user;
        return this;
    }

    public void setEngineerOfRecord(User user) {
        this.engineerOfRecord = user;
    }

    public User getTrafficSpecialist() {
        return trafficSpecialist;
    }

    public Project trafficSpecialist(User user) {
        this.trafficSpecialist = user;
        return this;
    }

    public void setTrafficSpecialist(User user) {
        this.trafficSpecialist = user;
    }

    public User getPrpjectStaff() {
        return prpjectStaff;
    }

    public Project prpjectStaff(User user) {
        this.prpjectStaff = user;
        return this;
    }

    public void setPrpjectStaff(User user) {
        this.prpjectStaff = user;
    }

    public User getQualitySpecialist() {
        return qualitySpecialist;
    }

    public Project qualitySpecialist(User user) {
        this.qualitySpecialist = user;
        return this;
    }

    public void setQualitySpecialist(User user) {
        this.qualitySpecialist = user;
    }

    public Department getParentProject() {
        return parentProject;
    }

    public Project parentProject(Department department) {
        this.parentProject = department;
        return this;
    }

    public void setParentProject(Department department) {
        this.parentProject = department;
    }

    public Set<Calender> getCalenders() {
        return calenders;
    }

    public Project calenders(Set<Calender> calenders) {
        this.calenders = calenders;
        return this;
    }

    public Project addCalenders(Calender calender) {
        this.calenders.add(calender);
        calender.setProject(this);
        return this;
    }

    public Project removeCalenders(Calender calender) {
        this.calenders.remove(calender);
        calender.setProject(null);
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
        if (!(o instanceof Project)) {
            return false;
        }
        return id != null && id.equals(((Project) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", billingCompany='" + getBillingCompany() + "'" +
            ", careerName='" + getCareerName() + "'" +
            ", siteNumber=" + getSiteNumber() +
            ", siteName='" + getSiteName() + "'" +
            ", siteCompany='" + getSiteCompany() + "'" +
            ", siteLatitude=" + getSiteLatitude() +
            ", siteLongitude=" + getSiteLongitude() +
            ", siteType='" + getSiteType() + "'" +
            ", isSite360='" + isIsSite360() + "'" +
            ", internalDue='" + getInternalDue() + "'" +
            ", pONumber='" + getpONumber() + "'" +
            "}";
    }
}
