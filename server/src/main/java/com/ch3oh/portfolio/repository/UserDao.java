package com.ch3oh.portfolio.repository;

import org.springframework.data.repository.CrudRepository;

import com.ch3oh.portfolio.persistence.User;

public interface UserDao extends CrudRepository<User, Integer> {
}
