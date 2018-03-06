package com.ch3oh.portfolio.persistence;

import javax.persistence.*;

@Entity
@Table(name="SKILL_CATEGORY")
public class SkillCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean hasName() {
        return this.name !=  null;
    }
}
