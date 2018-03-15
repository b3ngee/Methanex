package com.ch3oh.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ch3oh.portfolio.persistence.ProjectResource;
import com.ch3oh.portfolio.service.ProjectResourceServiceImpl;

@RestController
@RequestMapping(path = "/project-resources")
public class ProjectResourceController {

    @Autowired
    private ProjectResourceServiceImpl projectResourceService;

    @GetMapping(value = "/{id}")
    @ResponseBody
    public ProjectResource getProjectResource(@PathVariable("id") String id) {
        return projectResourceService.getProjectResource(id);
    }

    @GetMapping
    @ResponseBody
    public Iterable<ProjectResource> getProjectResources() {
        return projectResourceService.getProjectResources();
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public ProjectResource createProjectResources(@RequestBody ProjectResource projectResource) {
        return projectResourceService.createProjectResource(projectResource);
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public ProjectResource updateProjectResource(@PathVariable("id") String id, @RequestBody ProjectResource toUpdate) {
        return projectResourceService.updateProjectResource(id, toUpdate);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteProjectResource(@PathVariable("id") String id) {
        projectResourceService.deleteProjectResource(id);
    }
}
