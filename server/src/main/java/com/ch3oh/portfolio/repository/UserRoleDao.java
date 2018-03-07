package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.UserRole;

public interface UserRoleDao extends CrudRepository<UserRole, Integer> {

    /**
     * Finds all UserRoles associated with this user.
     *
     * @param userId
     * @return A list of user roles associated with the user
     * If no user is found or no roles are associated, this method returns an empty list.
     */
    @Query("SELECT u FROM UserRole u WHERE u.userId = ?1")
    Iterable<UserRole> findAllByUserId(@Param("userId") Integer userId);

    /**
     * Finds UserRole associated with this user and role type.
     *
     * @param userId
     * @return A UserRole
     * If no user is found or no roles are associated, this method returns null.
     */
    @Query("SELECT u FROM UserRole u WHERE u.userId = ?1 AND u.role = ?2")
    UserRole findByUserIdAndRole(@Param("userId") Integer userId, @Param("role") String role);
}
