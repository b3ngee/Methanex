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

import com.ch3oh.portfolio.persistence.SkillType;
import com.ch3oh.portfolio.service.SkillTypeServiceImpl;

@RestController
@RequestMapping(path = "/skill-types")
public class SkillTypeController {

    @Autowired
    private SkillTypeServiceImpl skillTypeService;

    @GetMapping(value = "/{id}")
    @ResponseBody
    public SkillType getSkillType(@PathVariable("id") String id) {
        return skillTypeService.getSkillType(id);
    }

    @GetMapping
    @ResponseBody
    public Iterable<SkillType> getSkillTypes(@RequestParam(value = "skillCategoryId", required = false) Integer skillCategoryId) {
        if (skillCategoryId != null) {
            return skillTypeService.getSkillTypesByCategoryId(skillCategoryId);
        }

        return skillTypeService.getSkillTypes();
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public SkillType createSkillType(@RequestBody SkillType skillType) {
        return skillTypeService.createSkillType(skillType);
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public SkillType updateSkillType(@PathVariable("id") String id, @RequestBody SkillType toUpdate) {
        return skillTypeService.updateSkillType(id, toUpdate);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteSkillType(@PathVariable("id") String id) {
        skillTypeService.deleteSkillType(id);
    }
}
