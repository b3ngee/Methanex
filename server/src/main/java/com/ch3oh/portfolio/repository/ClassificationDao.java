package com.ch3oh.portfolio.repository;

import org.springframework.data.repository.CrudRepository;

import com.ch3oh.portfolio.persistence.Classification;

public interface ClassificationDao extends CrudRepository<Classification, Integer> {
}
