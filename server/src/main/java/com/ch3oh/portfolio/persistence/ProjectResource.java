package com.ch3oh.portfolio.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PROJECT_RESOURCE")
public class ProjectResource {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "PROJECT_ID", nullable = false)
    private Integer projectId;

    @Column(name = "RESOURCE_ID", nullable = false)
    private Integer resourceId;

    @Column(name = "ASSIGNED_HOURS", nullable = false)
    private Integer assignedHours;

    @Column(nullable = false)
    private String status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setProjectId(Integer projectId) {
        this.projectId = projectId;
    }

    public boolean hasProjectId() {
        return this.projectId != null;
    }

    public Integer getResourceId() {
        return resourceId;
    }

    public void setResourceId(Integer resourceId) {
        this.resourceId = resourceId;
    }

    public boolean hasResourceId() {
        return this.resourceId != null;
    }

    public Integer getAssignedHours() {
        return assignedHours;
    }

    public void setAssignedHours(Integer assignedHours) {
        this.assignedHours = assignedHours;
    }

    public boolean hasAssignedHours() {
        return this.assignedHours != null;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String approved) {
        this.status = approved;
    }

    public boolean hasStatus() {
        return this.status != null;
    }
}
