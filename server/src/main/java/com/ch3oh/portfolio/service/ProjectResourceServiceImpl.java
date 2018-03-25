package com.ch3oh.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.exception.user.UserNotFoundException;
import com.ch3oh.portfolio.persistence.ProjectResource;
import com.ch3oh.portfolio.persistence.RoleTypeEnum;
import com.ch3oh.portfolio.repository.ProjectDao;
import com.ch3oh.portfolio.repository.ProjectResourceDao;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.repository.UserRoleDao;

@Component
public class ProjectResourceServiceImpl {

    @Autowired
    private ProjectResourceDao projectResourceDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserRoleDao userRoleDao;
    @Autowired
    private ProjectDao projectDao;

    @Transactional(readOnly = true)
    public ProjectResource getProjectResource(String id) {
        ProjectResource projectResource = projectResourceDao.findOne(Integer.valueOf(id));

        if (projectResource == null) {
            throw new GeneralRestNotFoundException();
        }

        return projectResource;
    }

    @Transactional(readOnly = true)
    public Iterable<ProjectResource> getProjectResources(Integer projectId, Integer resourceId) {
        if (projectId != null) {
            return projectResourceDao.findAllByProjectId(projectId);
        }

        if (resourceId != null) {
            return projectResourceDao.findAllByResourceId(resourceId);
        }

        return projectResourceDao.findAll();
    }

    @Transactional
    public ProjectResource createProjectResource(ProjectResource projectResource) {
        if (!projectResource.hasProjectId()) {
            throw new RestBadRequestException("Project ID is missing");
        }

        if (!projectResource.hasResourceId()) {
            throw new RestBadRequestException("Resource ID is missing");
        }

        if (!projectResource.hasAssignedHours()) {
            throw new RestBadRequestException("Assigned hours is missing");
        }

        validateProjectId(projectResource.getProjectId());
        validateResourceId(projectResource.getResourceId());
        validateAssignedHours(projectResource.getAssignedHours());
        validateProjectResource(projectResource);

        return projectResourceDao.save(projectResource);
    }

    @Transactional
    public ProjectResource updateProjectResource(String id, ProjectResource toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        ProjectResource projectResource = projectResourceDao.findOne(Integer.valueOf(id));

        if (projectResource == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasProjectId()) {
            validateProjectId(toUpdate.getProjectId());
            projectResource.setProjectId(toUpdate.getProjectId());
        }

        if (toUpdate.hasResourceId()) {
            validateResourceId(toUpdate.getResourceId());
            projectResource.setResourceId(toUpdate.getResourceId());
        }

        if (toUpdate.hasAssignedHours()) {
            validateAssignedHours(toUpdate.getAssignedHours());
            projectResource.setAssignedHours(toUpdate.getAssignedHours());
        }

        if (toUpdate.hasApproved()) {
            projectResource.setApproved((toUpdate.getApproved()));
        }

        validateProjectResource(projectResource);

        return projectResourceDao.save(projectResource);
    }

    @Transactional
    public void deleteProjectResource(String id) {
        if (!projectResourceDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        projectResourceDao.delete(Integer.valueOf(id));
    }

    private void validateProjectResource(ProjectResource projectResource) {
        ProjectResource existingPortfolio = projectResourceDao.findByProjectIdAndResourceId(projectResource.getProjectId(), projectResource.getResourceId());

        if (existingPortfolio != null && existingPortfolio.getId() != projectResource.getId()) {
            throw new RestBadRequestException("Resource already assigned to project");
        }
    }

    private void validateProjectId(Integer projectId) {
        if (!projectDao.exists(projectId)) {
            throw new RestBadRequestException("Project ID does not exist");
        }
    }

    private void validateResourceId(Integer resourceId) {
        if (!userDao.exists(resourceId)) {
            throw new UserNotFoundException();
        }

        if (userRoleDao.findByUserIdAndRole(resourceId, RoleTypeEnum.RESOURCE.toString()) == null) {
            throw new RestBadRequestException("User is not a resource");
        }
    }

    private void validateAssignedHours(Integer assignedHours) {
        if (assignedHours <= 0) {
            throw new RestBadRequestException("Assigned hours must be greater than 0");
        }
    }
}
