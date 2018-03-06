package com.ch3oh.portfolio.persistence;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="SKILL_TYPE")
public class SkillType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "SKILL_CATEGORY_ID", nullable = false)
    private Integer skillCategoryId;

    @Column(nullable = false)
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSkillCategoryId() {
        return skillCategoryId;
    }

    public void setSkillCategoryId(Integer skillCategoryId) {
        this.skillCategoryId = skillCategoryId;
    }

    public boolean hasSkillCategoryId() {
        return this.skillCategoryId != null;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean hasName() {
        return this.name != null;
    }
}
