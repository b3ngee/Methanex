package com.ch3oh.portfolio.service;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.persistence.SkillType;
import com.ch3oh.portfolio.repository.SkillCategoryDao;
import com.ch3oh.portfolio.repository.SkillTypeDao;

@Component
public class SkillTypeServiceImpl {

    @Autowired
    private SkillTypeDao skillTypeDao;
    @Autowired
    private SkillCategoryDao skillCategoryDao;

    @Transactional(readOnly = true)
    public SkillType getSkillType(String id) {
        SkillType skillType = skillTypeDao.findOne(Integer.valueOf(id));

        if (skillType == null) {
            throw new GeneralRestNotFoundException();
        }

        return skillType;
    }

    @Transactional(readOnly = true)
    public Iterable<SkillType> getSkillTypes() {
        return skillTypeDao.findAll();
    }

    @Transactional
    public SkillType createSkillType(SkillType skillType) {
        if (!skillType.hasName()) {
            throw new RestBadRequestException("Skill name is missing");
        }

        if (!skillType.hasSkillCategoryId()) {
            throw new RestBadRequestException("Skill category is missing");
        }

        validateSkillTypeName(skillType.getName());
        validateSkillCategory(skillType.getSkillCategoryId());
        validateSkillType(skillType);

        return skillTypeDao.save(skillType);
    }

    @Transactional
    public SkillType updateSkillType(String id, SkillType toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        SkillType skillType = skillTypeDao.findOne(Integer.valueOf(id));

        if (skillType == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasSkillCategoryId()) {
            validateSkillCategory(toUpdate.getSkillCategoryId());
            skillType.setSkillCategoryId(toUpdate.getSkillCategoryId());
        }

        if (toUpdate.hasName()) {
            validateSkillTypeName(toUpdate.getName());
            skillType.setName(toUpdate.getName());
        }

        validateSkillType(skillType);

        return skillTypeDao.save(skillType);
    }

    @Transactional
    public void deleteSkillType(String id) {
        if (!skillTypeDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        skillTypeDao.delete(Integer.valueOf(id));
    }

    @Transactional
    private void validateSkillType(SkillType skillType) {
        try {
            SkillType existingSkillType = skillTypeDao.findBySkillCategoryIdAndSkillTypeName(skillType.getSkillCategoryId(), skillType.getName());

            if (existingSkillType != null && existingSkillType.getId() != skillType.getId()) {
                throw new RestBadRequestException("Skill type already exists under this category");
            }
        } catch (Exception e) {
            throw new RestBadRequestException("Skill type already exists under this category");
        }
    }

    private void validateSkillCategory(Integer skillCategoryId) {
        if (!skillCategoryDao.exists(skillCategoryId)) {
            throw new RestBadRequestException("Skill category not found");
        }
    }

    private void validateSkillTypeName(String name) {
        if (StringUtils.isBlank(name)) {
            throw new RestBadRequestException("Skill type name is blank");
        }
    }
}
