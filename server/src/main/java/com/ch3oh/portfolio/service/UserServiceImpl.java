package com.ch3oh.portfolio.service;

import org.apache.commons.lang3.EnumUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.exception.user.EmailExistsException;
import com.ch3oh.portfolio.exception.user.UserNotFoundException;
import com.ch3oh.portfolio.persistence.RoleTypeEnum;
import com.ch3oh.portfolio.persistence.User;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.repository.UserRoleDao;
import com.ch3oh.portfolio.util.PasswordUtil;
import com.ch3oh.portfolio.util.ValidatorUtil;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserServiceImpl {

    @Autowired
    private UserDao userDao;
    @Autowired
    private UserRoleDao userRoleDao;

    @Transactional(readOnly = true)
    public User getUser(String id) {
        User user = userDao.findOne(Integer.valueOf(id));

        if (user == null) {
            throw new GeneralRestNotFoundException();
        }

        return user;
    }

    @Transactional(readOnly = true)
    public Iterable<User> getUsers(String role, Integer managerId) {
        if (!StringUtils.isBlank(role)) {
            return getUsersByRole(role);
        }

        if (managerId != null) {
            return getUsersByManagerId(managerId);
        }

        return userDao.findAll();
    }

    @Transactional(readOnly = true)
    private Iterable<User> getUsersByRole(String role) {
        if (!EnumUtils.isValidEnum(RoleTypeEnum.class, role)) {
            throw new RestBadRequestException("Request param role does not exist (must be one of: SUPER_ADMIN, PORTFOLIO_MANAGER, PROJECT_MANAGER, RESOURCE_MANAGER or RESOURCE)");
        }

        List<Integer> userIdsWithRole = new ArrayList<>();
        userRoleDao.findAllByRole(role).forEach(userRole -> userIdsWithRole.add(userRole.getUserId()));

        return userDao.findAll(userIdsWithRole);
    }

    @Transactional(readOnly = true)
    private Iterable<User> getUsersByManagerId(Integer managerId) {
        return userDao.findAllByManagerId(managerId);
    }

    @Transactional
    public User createUser(User user) {
        if (user.hasManagerId()) {
            validateManager(user.getManagerId());
        }

        if (!user.hasFirstName()) {
            throw new RestBadRequestException("First name is missing");
        }

        if (!user.hasLastName()) {
            throw new RestBadRequestException("Last name is missing");
        }

        if (!user.hasAddress()) {
            throw new RestBadRequestException("Address is missing");
        }

        if (!user.hasEmail()) {
            throw new RestBadRequestException("Email is missing");
        }

        if (!user.hasPassword()) {
            throw new RestBadRequestException("Password is missing");
        }

        if (!user.hasLocation()) {
            throw new RestBadRequestException("Location is missing");
        }

        if (!user.hasStatus()) {
            throw new RestBadRequestException("Status is missing");
        }

        validateFirstName(user.getFirstName());
        validateLastName(user.getLastName());
        validateAddress(user.getAddress());
        validateEmail(user.getEmail());
        validatePassword(user.getPassword());
        user.setPassword(PasswordUtil.hashPassword(user.getPassword()));
        validateLocation(user.getLocation());
        validateStatus(user.getStatus());
        validateUser(user);

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
            validateManager(toUpdate.getManagerId());
            user.setManagerId(toUpdate.getManagerId());
        }

        if (toUpdate.hasFirstName()) {
            validateFirstName(toUpdate.getFirstName());
            user.setFirstName(toUpdate.getFirstName());
        }

        if (toUpdate.hasLastName()) {
            validateLastName(toUpdate.getLastName());
            user.setLastName(toUpdate.getLastName());
        }

        if (toUpdate.hasAddress()) {
            validateAddress(toUpdate.getAddress());
            user.setAddress(toUpdate.getAddress());
        }

        if (toUpdate.hasEmail()) {
            validateEmail(toUpdate.getEmail());
            user.setEmail(toUpdate.getEmail());
        }

        if (toUpdate.hasPassword()) {
            validatePassword(toUpdate.getPassword());
            user.setPassword(PasswordUtil.hashPassword(toUpdate.getPassword()));
        }

        if (toUpdate.hasLocation()) {
            validateLocation(toUpdate.getLocation());
            user.setLocation(toUpdate.getLocation());
        }

        if (toUpdate.hasStatus()) {
            validateStatus(toUpdate.getStatus());
            user.setStatus((toUpdate.getStatus()));
        }

        if (toUpdate.hasEnabled()) {
            user.setEnabled(toUpdate.isEnabled());
        }

        return userDao.save(user);
    }

    @Transactional
    public void deleteUser(String id) {
        if (!userDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        userDao.delete(Integer.valueOf(id));
    }

    private void validateUser(User user) {
        User existingUser = userDao.findByEmail(user.getEmail());
        if (existingUser != null && existingUser.getId() != user.getId()) {
            throw new EmailExistsException();
        }
    }

    private void validateManager(Integer managerId) {
        if (!userDao.exists(managerId)) {
            throw new UserNotFoundException();
        }

        if (userRoleDao.findByUserIdAndRole(managerId, RoleTypeEnum.RESOURCE_MANAGER.toString()) == null) {
            throw new RestBadRequestException("User is not a resource manager");
        }
    }

    private void validateFirstName(String firstName) {
        if (StringUtils.isBlank(firstName)) {
            throw new RestBadRequestException("First name is blank");
        }
    }

    private void validateLastName(String lastName) {
        if (StringUtils.isBlank(lastName)) {
            throw new RestBadRequestException("Last name is blank");
        }
    }

    private void validateAddress(String address) {
        if (StringUtils.isBlank(address)) {
            throw new RestBadRequestException("Address is blank");
        }
    }

    private void validateEmail(String email) {
        if (StringUtils.isBlank(email)) {
            throw new RestBadRequestException("Email is blank");
        }

        if (!ValidatorUtil.isValidEmail(email)) {
            throw new RestBadRequestException("Invalid email address");
        }
    }

    private void validatePassword(String password) {
        if (StringUtils.isBlank(password)) {
            throw new RestBadRequestException("Password is blank");
        }
    }

    private void validateLocation(String location) {
        if (StringUtils.isBlank(location)) {
            throw new RestBadRequestException("Location is blank");
        }
    }

    private void validateStatus(String status) {
        if (StringUtils.isBlank(status)) {
            throw new RestBadRequestException("Status is blank");
        }
    }
}
