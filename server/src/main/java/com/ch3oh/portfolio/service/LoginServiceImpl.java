package com.ch3oh.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.dto.LoginDTO;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.persistence.User;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.repository.UserRoleDao;
import com.ch3oh.portfolio.util.PasswordUtil;
import com.ch3oh.portfolio.util.ValidatorUtil;

import java.util.ArrayList;
import java.util.List;

@Component
public class LoginServiceImpl {

    @Autowired
    private UserDao userDao;
    @Autowired
    private UserRoleDao userRoleDao;

    @Transactional(readOnly = true)
    public LoginDTO login(LoginDTO login) {
        if (!login.hasEmail()) {
            throw new RestBadRequestException("Email is missing");
        }

        if (!login.hasPassword()) {
            throw new RestBadRequestException("Password is missing");
        }

        if (!ValidatorUtil.isValidEmail(login.getEmail())) {
            throw new RestBadRequestException("Email is invalid");
        }

        User user = userDao.findByEmail(login.getEmail());

        if (user == null) {
            throw new RestBadRequestException("Email does not exist");
        }

        login.setUser(user);

        if (!PasswordUtil.checkPassword(login.getPassword(), user.getPassword())) {
            throw new RestBadRequestException("Incorrect password");
        }

        List<String> roles = new ArrayList<>();
        userRoleDao.findByUserId(user.getId()).forEach(userRole -> roles.add(userRole.getRole()));
        login.setRoles(roles);

        return login;
    }
}
