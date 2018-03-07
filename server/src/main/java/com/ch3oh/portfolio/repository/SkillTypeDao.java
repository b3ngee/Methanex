package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.SkillType;

public interface SkillTypeDao extends CrudRepository<SkillType, Integer> {

    /**
     * Finds SkillType that matches specified skillCategoryId and skillTypeName
     *
     * @param skillCategoryId
     * @param skillTypeName
     * @return A SkillType
     * If no SkillType is found, return null.
     */
    @Query("SELECT s FROM SkillType s WHERE s.skillCategoryId = ?1 AND s.name = ?2")
    SkillType findBySkillCategoryIdAndSkillTypeName(@Param("skillCategoryId") Integer skillCategoryId, @Param("name") String skillTypeName);
}
