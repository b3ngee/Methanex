package com.ch3oh.portfolio.service;

import org.apache.commons.lang3.EnumUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.exception.user.UserNotFoundException;
import com.ch3oh.portfolio.persistence.Project;
import com.ch3oh.portfolio.persistence.ProjectStatusEnum;
import com.ch3oh.portfolio.persistence.RagStatusEnum;
import com.ch3oh.portfolio.persistence.RoleTypeEnum;
import com.ch3oh.portfolio.repository.PortfolioDao;
import com.ch3oh.portfolio.repository.ProjectDao;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.repository.UserRoleDao;
import com.ch3oh.portfolio.util.DateUtil;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Date;

@Component
public class ProjectServiceImpl {

    @Autowired
    private ProjectDao projectDao;
    @Autowired
    private PortfolioDao portfolioDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserRoleDao userRoleDao;

    @Transactional(readOnly = true)
    public Project getProject(String id) {
        Project project = projectDao.findOne(Integer.valueOf(id));

        if (project == null) {
            throw new GeneralRestNotFoundException();
        }

        return project;
    }

    @Transactional(readOnly = true)
    public Iterable<Project> getProjects(Integer managerId, Integer portfolioId) {
        if (managerId != null) {
            return projectDao.findAllByManagerId(managerId);
        }

        if (portfolioId != null) {
            return projectDao.findAllByPortfolioId(portfolioId);
        }

        return projectDao.findAll();
    }

    @Transactional
    public Project createProject(Project project) {
        if (!project.hasPortfolioId()) {
            throw new RestBadRequestException("Portfolio ID is missing");
        }

        if (!project.hasName()) {
            throw new RestBadRequestException("Project name is missing");
        }

        if (!project.hasProjectStatus()) {
            throw new RestBadRequestException("Project status is missing");
        }

        if (!project.hasRagStatus()) {
            throw new RestBadRequestException("RAG status is missing");
        }

        if (!project.hasBudget()) {
            throw new RestBadRequestException("Budget is missing");
        }

        if (!project.hasSpentToDate()) {
            throw new RestBadRequestException("Spent to date is missing");
        }

        if (!project.hasEstimateToComplete()) {
            throw new RestBadRequestException("Estimate to complete is missing");
        }

        if (!project.hasManagerId()) {
            throw new RestBadRequestException("Project manager ID is missing");
        }

        if (!project.hasStartDate()) {
            throw new RestBadRequestException("Start date is missing");
        }

        if (!project.hasEndDate()) {
            throw new RestBadRequestException("End date is missing");
        }

        validatePortfolioId(project.getPortfolioId());
        validateName(project.getName());
        validateStatus(project.getProjectStatus());
        validateRagStatus(project.getRagStatus());
        validateBudget(project.getBudget());
        validateSpentToDate(project.getSpentToDate());
        validateEstimateToComplete(project.getEstimateToComplete());
        validateManagerId(project.getManagerId());
        validateStartAndEndDate(project.getStartDate(), project.getEndDate());

        return projectDao.save(project);
    }

    @Transactional
    public Project updateProject(String id, Project toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        Project project = projectDao.findOne(Integer.valueOf(id));

        if (project == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasPortfolioId()) {
            validatePortfolioId(toUpdate.getPortfolioId());
            project.setPortfolioId(toUpdate.getPortfolioId());
        }

        if (toUpdate.hasName()) {
            validateName(toUpdate.getName());
            project.setName(toUpdate.getName());
        }

        if (toUpdate.hasProjectStatus()) {
            validateStatus(toUpdate.getProjectStatus());
            project.setProjectStatus(toUpdate.getProjectStatus());
        }

        if (toUpdate.hasRagStatus()) {
            validateRagStatus(toUpdate.getRagStatus());
            project.setRagStatus(toUpdate.getRagStatus());
        }

        if (toUpdate.hasBudget()) {
            validateBudget(toUpdate.getBudget());
            project.setBudget(toUpdate.getBudget());
        }

        if (toUpdate.hasSpentToDate()) {
            validateSpentToDate(toUpdate.getSpentToDate());
            project.setSpentToDate(toUpdate.getSpentToDate());
        }

        if (toUpdate.hasEstimateToComplete()) {
            validateEstimateToComplete(toUpdate.getEstimateToComplete());
            project.setEstimateToComplete(toUpdate.getEstimateToComplete());
        }

        if (toUpdate.hasManagerId()) {
            validateManagerId(toUpdate.getManagerId());
            project.setManagerId(toUpdate.getManagerId());
        }

        if (toUpdate.hasStartDate()) {
            project.setStartDate(toUpdate.getStartDate());
        }

        if (toUpdate.hasEndDate()) {
            project.setEndDate(toUpdate.getEndDate());
        }

        validateStartAndEndDate(project.getStartDate(), project.getEndDate());

        if (toUpdate.hasComplete()) {
            project.setComplete(toUpdate.getComplete());
        }

        if (toUpdate.hasGanttChart()) {
            project.setGanttChart(toUpdate.getGanttChart());
        }

        return projectDao.save(project);
    }

    @Transactional
    public void deleteProject(String id) {
        if (!projectDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        projectDao.delete(Integer.valueOf(id));
    }

    private void validatePortfolioId(Integer portfolioId) {
        if (!portfolioDao.exists(portfolioId)) {
            throw new RestBadRequestException("Portfolio ID does not exist");
        }
    }

    private void validateName(String name) {
        if (StringUtils.isBlank(name)) {
            throw new RestBadRequestException("Project name is blank");
        }
    }

    private void validateStatus(String projectStatus) {
        if (StringUtils.isBlank(projectStatus)) {
            throw new RestBadRequestException("Project status is blank");
        }

        if (!EnumUtils.isValidEnum(ProjectStatusEnum.class, projectStatus)) {
            throw new RestBadRequestException("Project status does not exist (must be one of: PIPELINE, PRE_APPROVAL, SEEKING_FUNDING, ON_HOLD, UNDERWAY or STOPPED)");
        }
    }

    private void validateRagStatus(String ragStatus) {
        if (StringUtils.isBlank(ragStatus)) {
            throw new RestBadRequestException("RAG status is blank");
        }

        if (!EnumUtils.isValidEnum(RagStatusEnum.class, ragStatus)) {
            throw new RestBadRequestException("Rag status does not exist (must be one of: RED, GREEN or AMBER)");
        }
    }

    private void validateBudget(BigDecimal budget) {
        if (budget.compareTo(BigDecimal.ZERO) < 0) {
            throw new RestBadRequestException("Budget must be greater than 0");
        }
    }

    private void validateSpentToDate(BigDecimal spentToDate) {
        if (spentToDate.compareTo(BigDecimal.ZERO) < 0) {
            throw new RestBadRequestException("Spent to date must be greater than 0");
        }
    }

    private void validateEstimateToComplete(BigDecimal estimateToComplete) {
        if (estimateToComplete.compareTo(BigDecimal.ZERO) < 0) {
            throw new RestBadRequestException("Estimate to complete must be greater than 0");
        }
    }

    private void validateManagerId(Integer managerId) {
        if (!userDao.exists(managerId)) {
            throw new UserNotFoundException();
        }

        if (userRoleDao.findByUserIdAndRole(managerId, RoleTypeEnum.PROJECT_MANAGER.toString()) == null) {
            throw new RestBadRequestException("User is not a project manager");
        }
    }

    private void validateStartAndEndDate(String startDateStr, String endDateStr) {
        Date startDate;
        Date endDate;

        try {
            startDate = DateUtil.stringToDate(startDateStr);
        } catch (ParseException e) {
            throw new RestBadRequestException("Start date not parseable. Ensure date is valid and correctly formatted (MM-dd-yyyy)");
        }

        try {
            endDate = DateUtil.stringToDate(endDateStr);
        } catch (ParseException e) {
            throw new RestBadRequestException("End date not parseable. Ensure date is valid and correctly formatted (MM-dd-yyyy)");
        }

        if (startDate.after(endDate)) {
            throw new RestBadRequestException("Start date must not be after end date");
        }
    }
}
