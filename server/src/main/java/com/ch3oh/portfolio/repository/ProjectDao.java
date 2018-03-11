package com.ch3oh.portfolio.repository;

import org.springframework.data.repository.CrudRepository;

import com.ch3oh.portfolio.persistence.Project;

public interface ProjectDao extends CrudRepository<Project, Integer> {
}
