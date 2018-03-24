package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.ProjectResource;

public interface ProjectResourceDao extends CrudRepository<ProjectResource, Integer> {

    /**
     * Finds ProjectResource associated with projectId and resourceId
     *
     * @param projectId
     * @param resourceId
     * @return A ProjectResource
     * If no ProjectResource is found, return null.
     */
    @Query("SELECT p FROM ProjectResource p WHERE p.projectId = ?1 AND p.resourceId = ?2")
    ProjectResource findByProjectIdAndResourceId(@Param("projectId") Integer projectId, @Param("resourceId") Integer resourceId);

    /**
     * Finds ProjectResources associated with projectId
     *
     * @param projectId
     * @return A list of ProjectResource
     * If no ProjectResources are found, return empty list.
     */
    @Query("SELECT p FROM ProjectResource p WHERE p.projectId = ?1")
    Iterable<ProjectResource> findAllByProjectId(@Param("projectId") Integer projectId);

    /**
     * Finds ProjectResources associated with resourceId
     *
     * @param resourceId
     * @return A list of ProjectResource
     * If no ProjectResources are found, return empty list.
     */
    @Query("SELECT p FROM ProjectResource p WHERE p.resourceId = ?1")
    Iterable<ProjectResource> findAllByResourceId(@Param("resourceId") Integer resourceId);
}
