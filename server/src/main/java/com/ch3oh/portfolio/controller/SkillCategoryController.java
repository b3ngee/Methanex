package com.ch3oh.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ch3oh.portfolio.persistence.SkillCategory;
import com.ch3oh.portfolio.service.SkillCategoryServiceImpl;

@RestController
@RequestMapping(path = "/skillcategories")
public class SkillCategoryController {

    @Autowired
    private SkillCategoryServiceImpl skillCategoryService;

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    @ResponseBody
    public SkillCategory getSkillCategory(@PathVariable("id") String id) {
        return skillCategoryService.getSkillCategory(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Iterable<SkillCategory> getSkillCategories() {
        return skillCategoryService.getSkillCategories();
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public SkillCategory createSkillCategory(@RequestBody SkillCategory skillCategory) {
        return skillCategoryService.createSkillCategory(skillCategory);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public SkillCategory updateSkillCategory(@PathVariable("id") String id, @RequestBody SkillCategory toUpdate) {
        return skillCategoryService.updateSkillCategory(id, toUpdate);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    public void deleteSkillCategory(@PathVariable("id") String id) {
        skillCategoryService.deleteSkillCategory(id);
    }
}