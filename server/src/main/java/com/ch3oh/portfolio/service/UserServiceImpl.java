package com.ch3oh.portfolio.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.exception.user.InvalidEmailException;
import com.ch3oh.portfolio.exception.user.ManagerDoesNotExistException;
import com.ch3oh.portfolio.persistence.User;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.util.PasswordUtil;
import com.ch3oh.portfolio.util.ValidatorUtil;

@Component
public class UserServiceImpl {

    @Autowired
    private UserDao userDao;

    @Transactional(readOnly = true)
    public User getUser(String id) {
        User user = userDao.findOne(Integer.valueOf(id));

        if (user == null) {
            throw new GeneralRestNotFoundException();
        }

        return user;
    }

    @Transactional(readOnly = true)
    public Iterable<User> getUsers() {
        return userDao.findAll();
    }

    @Transactional
    public User createUser(User user) {
        if (user.hasManagerId() && !userDao.exists(user.getManagerId())) {
            // TODO: Also need to check if managerId has manager role once we implement USER_ROLE table
            throw new ManagerDoesNotExistException();
        }

        if (!user.hasFirstName() || StringUtils.isBlank(user.getFirstName())) {
            throw new RestBadRequestException("First name is missing");
        }

        if (!user.hasLastName() || StringUtils.isBlank(user.getLastName())) {
            throw new RestBadRequestException("Last name is missing");
        }

        if (!user.hasAddress() || StringUtils.isBlank(user.getAddress())) {
            throw new RestBadRequestException("Address is missing");
        }

        if (!user.hasEmail()) {
            throw new RestBadRequestException("Email is missing");
        }

        if (!ValidatorUtil.isValidEmail(user.getEmail())) {
            throw new InvalidEmailException();
        }

        if (!user.hasPassword() || StringUtils.isBlank(user.getPassword())) {
            throw new RestBadRequestException("Password is missing");
        }

        if (!user.hasLocation() || StringUtils.isBlank(user.getLocation())) {
            throw new RestBadRequestException("Location is missing");
        }

        if (!user.hasStatus() || StringUtils.isBlank(user.getStatus())) {
            throw new RestBadRequestException("Status is missing");
        }

        user.setPassword(PasswordUtil.hashPassword(user.getPassword()));

        return userDao.save(user);
    }

    @Transactional
    public User updateUser(String id, User toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        User user = userDao.findOne(Integer.valueOf(id));

        if (user == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasManagerId()) {
            if (!userDao.exists(toUpdate.getManagerId())) { // TODO: Or user is not a manager
                throw new ManagerDoesNotExistException();
            }
            user.setManagerId(toUpdate.getManagerId());
        }

        if (toUpdate.hasFirstName()) {
            if (StringUtils.isBlank(toUpdate.getFirstName())) {
                throw new RestBadRequestException("Invalid first name");
            }
            user.setFirstName(toUpdate.getFirstName());
        }

        if (toUpdate.hasLastName()) {
            if (StringUtils.isBlank(toUpdate.getLastName())) {
                throw new RestBadRequestException("Invalid last name");
            }
            user.setLastName(toUpdate.getLastName());
        }

        if (toUpdate.hasAddress()) {
            if (StringUtils.isBlank(toUpdate.getAddress())) {
                throw new RestBadRequestException("Invalid address");
            }
            user.setAddress(toUpdate.getAddress());
        }

        if (toUpdate.hasEmail()) {
            String email = toUpdate.getEmail();

            if (StringUtils.isBlank(email)) {
                throw new RestBadRequestException("Email is missing");
            }

            if (!ValidatorUtil.isValidEmail(email)) {
                throw new RestBadRequestException("Invalid email address");
            }

            user.setEmail(email);
        }

        if (toUpdate.hasPassword()) {
            if (StringUtils.isBlank(toUpdate.getPassword())) {
                throw new RestBadRequestException("Invalid address");
            }
            user.setPassword(PasswordUtil.hashPassword(toUpdate.getPassword()));
        }

        if (toUpdate.hasLocation()) {
            if (StringUtils.isBlank(toUpdate.getLocation())) {
                throw new RestBadRequestException("Invalid location");
            }
            user.setLocation(toUpdate.getLocation());
        }

        if (toUpdate.hasStatus()) {
            if (StringUtils.isBlank(toUpdate.getStatus())) {
                throw new RestBadRequestException("Invalid status");
            }
            user.setStatus((toUpdate.getStatus()));
        }

        return userDao.save(user);
    }

    @Transactional
    public void deleteUser(String id) {
        userDao.delete(Integer.valueOf(id));
    }
}
