package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.SkillCategory;

public interface SkillCategoryDao extends CrudRepository<SkillCategory, Integer> {

    /**
     * Finds SkillCategory that matches specified skillCategoryName
     *
     * @param skillCategoryName
     * @return A SkillCategory
     * If no SkillCategory is found, return null.
     */
    @Query("SELECT s FROM SkillCategory s WHERE s.name = ?1")
    SkillCategory findBySkillCategoryName(@Param("name") String skillCategoryName);
}
