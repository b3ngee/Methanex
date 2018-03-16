package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.Project;

public interface ProjectDao extends CrudRepository<Project, Integer> {

    /**
     * Finds Projects that match portfolioId
     *
     * @param portfolioId
     * @return A list of Projects
     * If no Projects are found, return an empty list.
     */
    @Query("SELECT p FROM Project p WHERE p.portfolioId = ?1")
    Iterable<Project> findAllByPortfolioId(@Param("portfolioId") Integer portfolioId);

    /**
     * Finds Projects that match managerId
     *
     * @param managerId
     * @return A list of Projects
     * If no Projects are found, return an empty list.
     */
    @Query("SELECT p FROM Project p WHERE p.managerId = ?1")
    Iterable<Project> findAllByManagerId(@Param("managerId") Integer managerId);

}
