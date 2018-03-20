package com.ch3oh.portfolio.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USER_SKILL")
public class UserSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "USER_ID", nullable = false)
    private Integer userId;

    @Column(name = "SKILL_TYPE_ID", nullable = false)
    private Integer skillTypeId;

    @Column(nullable = false)
    private Integer competency;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public boolean hasUserId() {
        return this.userId != null;
    }

    public Integer getSkillTypeId() {
        return skillTypeId;
    }

    public void setSkillTypeId(Integer skillTypeId) {
        this.skillTypeId = skillTypeId;
    }

    public boolean hasSkillTypeId() {
        return this.skillTypeId != null;
    }

    public Integer getCompetency() {
        return competency;
    }

    public void setCompetency(Integer competency) {
        this.competency = competency;
    }

    public boolean hasCompetency() {
        return this.competency != null;
    }
}
