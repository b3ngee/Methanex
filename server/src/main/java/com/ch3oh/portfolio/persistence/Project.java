package com.ch3oh.portfolio.persistence;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "PROJECT")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "PORTFOLIO_ID", nullable = false)
    private Integer portfolioId;

    @Column(nullable = false)
    private String name;

    @Column(name = "PROJECT_STATUS", nullable = false)
    private String projectStatus;

    @Column(name = "RAG_STATUS", nullable = false)
    private String ragStatus;

    @Column(nullable = false)
    private BigDecimal budget;

    @Column(name = "SPENT_TO_DATE", nullable = false)
    private BigDecimal spentToDate;

    @Column(name = "ESTIMATE_TO_COMPLETE", nullable = false)
    private BigDecimal estimateToComplete;

    @Column(name = "MANAGER_ID", nullable = false)
    private Integer managerId;

    @Column(nullable = false)
    private Boolean complete;

    @Column(name = "START_DATE", nullable = false)
    public String startDate;

    @Column(name = "END_DATE", nullable = false)
    public String endDate;

    @Column(name = "GANTT_CHART")
    private byte[] ganttChart;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPortfolioId() {
        return portfolioId;
    }

    public void setPortfolioId(Integer portfolioId) {
        this.portfolioId = portfolioId;
    }

    public boolean hasPortfolioId() {
        return this.portfolioId != null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean hasName() {
        return this.name != null;
    }

    public String getProjectStatus() {
        return projectStatus;
    }

    public void setProjectStatus(String projectStatus) {
        this.projectStatus = projectStatus;
    }

    public boolean hasProjectStatus() {
        return this.projectStatus != null;
    }

    public String getRagStatus() {
        return ragStatus;
    }

    public void setRagStatus(String ragStatus) {
        this.ragStatus = ragStatus;
    }

    public boolean hasRagStatus() {
        return this.ragStatus != null;
    }

    public BigDecimal getBudget() {
        return budget;
    }

    public void setBudget(BigDecimal budget) {
        this.budget = budget;
    }

    public boolean hasBudget() {
        return this.budget != null;
    }

    public BigDecimal getSpentToDate() {
        return spentToDate;
    }

    public void setSpentToDate(BigDecimal spentToDate) {
        this.spentToDate = spentToDate;
    }

    public boolean hasSpentToDate() {
        return this.spentToDate != null;
    }

    public BigDecimal getEstimateToComplete() {
        return estimateToComplete;
    }

    public void setEstimateToComplete(BigDecimal estimateToComplete) {
        this.estimateToComplete = estimateToComplete;
    }

    public boolean hasEstimateToComplete() {
        return this.estimateToComplete != null;
    }

    public Integer getManagerId() {
        return managerId;
    }

    public void setManagerId(Integer managerId) {
        this.managerId = managerId;
    }

    public boolean hasManagerId() {
        return this.managerId != null;
    }

    public Boolean getComplete() {
        return complete;
    }

    public void setComplete(Boolean complete) {
        this.complete = complete;
    }

    public boolean hasComplete() {
        return this.complete != null;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public boolean hasStartDate() {
        return this.startDate != null;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public boolean hasEndDate() {
        return this.endDate != null;
    }

    public byte[] getGanttChart() {
        return ganttChart;
    }

    public void setGanttChart(byte[] ganttChart) {
        this.ganttChart = ganttChart;
    }

    public boolean hasGanttChart() {
        return this.ganttChart != null;
    }
}
