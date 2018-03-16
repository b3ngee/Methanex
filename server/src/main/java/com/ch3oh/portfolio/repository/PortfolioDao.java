package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.Portfolio;

public interface PortfolioDao extends CrudRepository<Portfolio, Integer> {

    /**
     * Finds Portfolio associated with classificationId
     *
     * @param classificationId
     * @return A List of Portfolios
     * If no portfolios are found, return empty list.
     */
    @Query("SELECT p FROM Portfolio p WHERE p.classificationId = ?1")
    Iterable<Portfolio> findAllByClassificationId(@Param("classificationId") Integer classificationId);

    /**
     * Finds Portfolio associated with managerId
     *
     * @param managerId
     * @return A List of Portfolios
     * If no portfolios are found, return empty list.
     */
    @Query("SELECT p FROM Portfolio p WHERE p.managerId = ?1")
    Iterable<Portfolio> findAllByManagerId(@Param("managerId") Integer managerId);

}
