package com.btgrp.protrack.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Metrices.
 */
@Entity
@Table(name = "metrices")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Metrices implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "sum")
    private Integer sum;

    @Column(name = "count")
    private Integer count;

    @Column(name = "average")
    private Integer average;

    @ManyToMany(mappedBy = "metrices")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Department> departments = new HashSet<>();

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

    public Metrices name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Metrices description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getSum() {
        return sum;
    }

    public Metrices sum(Integer sum) {
        this.sum = sum;
        return this;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    public Integer getCount() {
        return count;
    }

    public Metrices count(Integer count) {
        this.count = count;
        return this;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getAverage() {
        return average;
    }

    public Metrices average(Integer average) {
        this.average = average;
        return this;
    }

    public void setAverage(Integer average) {
        this.average = average;
    }

    public Set<Department> getDepartments() {
        return departments;
    }

    public Metrices departments(Set<Department> departments) {
        this.departments = departments;
        return this;
    }

    public Metrices addDepartments(Department department) {
        this.departments.add(department);
        department.getMetrices().add(this);
        return this;
    }

    public Metrices removeDepartments(Department department) {
        this.departments.remove(department);
        department.getMetrices().remove(this);
        return this;
    }

    public void setDepartments(Set<Department> departments) {
        this.departments = departments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Metrices)) {
            return false;
        }
        return id != null && id.equals(((Metrices) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Metrices{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", sum=" + getSum() +
            ", count=" + getCount() +
            ", average=" + getAverage() +
            "}";
    }
}
