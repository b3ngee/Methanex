package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.Classification;

public interface ClassificationDao extends CrudRepository<Classification, Integer> {

    /**
     * Finds Classification that matches specified classificationName
     *
     * @param classificationName
     * @return A Classification
     * If no Classification is found, return null.
     */
    @Query("SELECT c FROM Classification c WHERE c.name = ?1")
    Classification findByClassificationByName(@Param("name") String classificationName);
}
