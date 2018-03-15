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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ch3oh.portfolio.persistence.Project;
import com.ch3oh.portfolio.service.ProjectServiceImpl;

@RestController
@RequestMapping(path = "/projects")
public class ProjectController {

    @Autowired
    private ProjectServiceImpl projectService;

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Project getProject(@PathVariable("id") String id) {
        return projectService.getProject(id);
    }

    @GetMapping
    @ResponseBody
    public Iterable<Project> getProjects(@RequestParam(value = "portfolioId", required = false) Integer portfolioId) {
        if (portfolioId != null) {
            return projectService.getProjectsByPortfolioId(portfolioId);
        }

        return projectService.getProjects();
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public Project updateProject(@PathVariable("id") String id, @RequestBody Project toUpdate) {
        return projectService.updateProject(id, toUpdate);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteProject(@PathVariable("id") String id) {
        projectService.deleteProject(id);
    }

}
