package com.ch3oh.portfolio.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ch3oh.portfolio.persistence.User;
import com.ch3oh.portfolio.service.UserServiceImpl;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @GetMapping(value = "/{id}")
    @ResponseBody
    public User getUser(@PathVariable("id") String id) {
        return userService.getUser(id);
    }

    @GetMapping
    @ResponseBody
    public Iterable<User> getUsers(@RequestParam(value = "role", required = false) String role, @RequestParam(value = "managerId", required = false) Integer managerId) {
        return userService.getUsers(role, managerId);
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public User updateUser(@PathVariable("id") String id, @RequestBody User toUpdate) {
        return userService.updateUser(id, toUpdate);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUser(@PathVariable("id") String id) {
        userService.deleteUser(id);
    }
}

