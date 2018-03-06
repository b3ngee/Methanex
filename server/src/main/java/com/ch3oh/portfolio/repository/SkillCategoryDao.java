package com.ch3oh.portfolio.repository;

import org.springframework.data.repository.CrudRepository;

import com.ch3oh.portfolio.persistence.SkillCategory;

public interface SkillCategoryDao extends CrudRepository<SkillCategory, Integer> {
}
