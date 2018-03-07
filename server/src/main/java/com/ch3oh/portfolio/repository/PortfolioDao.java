package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.Portfolio;

public interface PortfolioDao extends CrudRepository<Portfolio, Integer> {

    /**
     * Finds Portfolio associated with classification
     *
     * @param classificationId
     * @return A Portfolio
     * If no portfolio is found, return null.
     */
    @Query("SELECT p FROM Portfolio p WHERE p.classificationId = ?1")
    Portfolio findByClassificationId(@Param("classificationId") Integer classificationId);
}
