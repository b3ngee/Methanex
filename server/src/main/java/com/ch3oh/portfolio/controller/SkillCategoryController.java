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

import com.ch3oh.portfolio.persistence.SkillCategory;
import com.ch3oh.portfolio.service.SkillCategoryServiceImpl;

@RestController
@RequestMapping(path = "/skill-categories")
public class SkillCategoryController {

    @Autowired
    private SkillCategoryServiceImpl skillCategoryService;

    @GetMapping(value = "/{id}")
    @ResponseBody
    public SkillCategory getSkillCategory(@PathVariable("id") String id) {
        return skillCategoryService.getSkillCategory(id);
    }

    @GetMapping
    @ResponseBody
    public Iterable<SkillCategory> getSkillCategories() {
        return skillCategoryService.getSkillCategories();
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public SkillCategory createSkillCategory(@RequestBody SkillCategory skillCategory) {
        return skillCategoryService.createSkillCategory(skillCategory);
    }

    @PutMapping(value = "/{id}")
    public SkillCategory updateSkillCategory(@PathVariable("id") String id, @RequestBody SkillCategory toUpdate) {
        return skillCategoryService.updateSkillCategory(id, toUpdate);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteSkillCategory(@PathVariable("id") String id) {
        skillCategoryService.deleteSkillCategory(id);
    }
}