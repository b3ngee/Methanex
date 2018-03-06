package com.ch3oh.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ch3oh.portfolio.persistence.UserRole;
import com.ch3oh.portfolio.service.UserRoleServiceImpl;

@RestController
@RequestMapping(path = "/user-roles")
public class UserRoleController {

    @Autowired
    private UserRoleServiceImpl userRoleService;

    @GetMapping(value = "/{id}")
    @ResponseBody
    public UserRole getUserRole(@PathVariable("id") String id) {
        return userRoleService.getUserRole(id);
    }

    @GetMapping
    @ResponseBody
    public Iterable<UserRole> getUserRoles() {
        return userRoleService.getUserRoles();
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserRole createUserRole(@RequestBody UserRole userRole) {
        return userRoleService.createUserRole(userRole);
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public UserRole updateUserRole(@PathVariable("id") String id, @RequestBody UserRole toUpdate) {
        return userRoleService.updateUserRole(id, toUpdate);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUserRole(@PathVariable("id") String id) {
        userRoleService.deleteUserRole(id);
    }
}
