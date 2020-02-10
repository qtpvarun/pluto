package com.btgrp.protrack.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A UserExtention.
 */
@Entity
@Table(name = "user_extention")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserExtention implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "login", nullable = false, unique = true)
    private String login;

    @Column(name = "profile_pic")
    private String profilePic;

    @Column(name = "jhi_group")
    private String group;

    @Column(name = "json_other_details")
    private String jsonOtherDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public UserExtention login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public UserExtention profilePic(String profilePic) {
        this.profilePic = profilePic;
        return this;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }

    public String getGroup() {
        return group;
    }

    public UserExtention group(String group) {
        this.group = group;
        return this;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getJsonOtherDetails() {
        return jsonOtherDetails;
    }

    public UserExtention jsonOtherDetails(String jsonOtherDetails) {
        this.jsonOtherDetails = jsonOtherDetails;
        return this;
    }

    public void setJsonOtherDetails(String jsonOtherDetails) {
        this.jsonOtherDetails = jsonOtherDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserExtention)) {
            return false;
        }
        return id != null && id.equals(((UserExtention) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserExtention{" +
            "id=" + getId() +
            ", login='" + getLogin() + "'" +
            ", profilePic='" + getProfilePic() + "'" +
            ", group='" + getGroup() + "'" +
            ", jsonOtherDetails='" + getJsonOtherDetails() + "'" +
            "}";
    }
}
