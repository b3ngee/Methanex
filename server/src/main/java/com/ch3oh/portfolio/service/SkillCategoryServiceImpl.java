package com.ch3oh.portfolio.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.persistence.SkillCategory;
import com.ch3oh.portfolio.repository.SkillCategoryDao;

@Component
public class SkillCategoryServiceImpl {

    @Autowired
    private SkillCategoryDao skillCategoryDao;

    @Transactional(readOnly = true)
    public SkillCategory getSkillCategory(String id) {
        SkillCategory skillCategory = skillCategoryDao.findOne(Integer.valueOf(id));

        if (skillCategory == null) {
            throw new GeneralRestNotFoundException();
        }

        return skillCategory;
    }

    @Transactional(readOnly = true)
    public Iterable<SkillCategory> getSkillCategories() {
        return skillCategoryDao.findAll();
    }

    @Transactional
    public SkillCategory createSkillCategory(SkillCategory skillCategory) {
        if (!skillCategory.hasName()) {
            throw new RestBadRequestException("Skill category name is missing");
        }

        validateSkillCategoryName(skillCategory.getName());

        return skillCategoryDao.save(skillCategory);
    }

    @Transactional
    public SkillCategory updateSkillCategory(String id, SkillCategory toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        SkillCategory skillCategory = skillCategoryDao.findOne(Integer.valueOf(id));

        if (skillCategory == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasName()) {
            String skillCategoryName = toUpdate.getName();
            validateSkillCategoryName(skillCategoryName);
            skillCategory.setName(skillCategoryName);
        }

        return skillCategoryDao.save(skillCategory);
    }

    @Transactional
    public void deleteSkillCategory(String id) {
        if (!skillCategoryDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        skillCategoryDao.delete(Integer.valueOf(id));
    }

    private void validateSkillCategoryName(String name) {
        if (StringUtils.isBlank(name)) {
            throw new RestBadRequestException("Skill category name is blank");
        }

        if (skillCategoryDao.findBySkillCategoryName(name) != null) {
            throw new RestBadRequestException("Skill category name already exists");
        }
    }
}
