package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.UserSkill;

public interface UserSkillDao extends CrudRepository<UserSkill, Integer> {

    /**
     * Finds UserSkill associated with this user and skill type.
     *
     * @param userId
     * @param skillTypeId
     * @return A UserSkill
     * If no user skill is found, return null.
     */
    @Query("SELECT u FROM UserSkill u WHERE u.userId = ?1 AND u.skillTypeId = ?2")
    UserSkill findByUserIdAndSkillTypeId(@Param("userId") Integer userId, @Param("skillTypeId") Integer skillTypeId);

    /**
     * Finds UserSkills associated with this user
     *
     * @param userId
     * @return A List of UserSkills
     * If no user skill is found, return an empty list.
     */
    @Query("SELECT u FROM UserSkill u WHERE u.userId = ?1")
    Iterable<UserSkill> findAllByUserId(@Param("userId") Integer userId);
}
