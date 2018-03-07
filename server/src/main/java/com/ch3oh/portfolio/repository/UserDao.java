package com.ch3oh.portfolio.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ch3oh.portfolio.persistence.User;

public interface UserDao extends CrudRepository<User, Integer> {

    /**
     * Finds User that matches specified email
     *
     * @param email
     * @return A User
     * If no User is found, return null.
     */
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    User findByEmail(@Param("name") String email);
}
