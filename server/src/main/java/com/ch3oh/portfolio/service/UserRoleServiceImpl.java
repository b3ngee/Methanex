package com.ch3oh.portfolio.service;

import org.apache.commons.lang3.EnumUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.exception.RestNotFoundException;
import com.ch3oh.portfolio.persistence.RoleTypeEnum;
import com.ch3oh.portfolio.persistence.UserRole;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.repository.UserRoleDao;

@Component
public class UserRoleServiceImpl {

    @Autowired
    private UserRoleDao userRoleDao;
    @Autowired
    private UserDao userDao;

    @Transactional(readOnly = true)
    public UserRole getUserRole(String id) {
        UserRole userRole = userRoleDao.findOne(Integer.valueOf(id));

        if (userRole == null) {
            throw new GeneralRestNotFoundException();
        }

        return userRole;
    }

    @Transactional(readOnly = true)
    public Iterable<UserRole> getUserRoles() {
        return userRoleDao.findAll();
    }

    @Transactional
    public UserRole createUserRole(UserRole userRole) {
        if (!userRole.hasUserId()) {
            throw new RestBadRequestException("User ID is missing");
        }

        if (!userRole.hasRole()) {
            throw new RestBadRequestException("User role is missing");
        }

        if (!userDao.exists(userRole.getUserId())) {
            throw new RestNotFoundException("User not found");
        }

        if (!EnumUtils.isValidEnum(RoleTypeEnum.class, userRole.getRole())) {
            throw new RestBadRequestException("Role type does not exist");
        }

        if (userRoleDao.findByUserIdAndRole(userRole.getUserId(), userRole.getRole()) != null) {
            throw new RestBadRequestException("User already has the specified role");
        }

        return userRoleDao.save(userRole);
    }

    public UserRole updateUserRole(String id, UserRole toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        UserRole userRole = userRoleDao.findOne(Integer.valueOf(id));

        if (userRole == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasUserId()) {
            if (!userDao.exists(toUpdate.getUserId())) {
                throw new RestBadRequestException("User not found");
            }

            userRole.setUserId(toUpdate.getUserId());
        }

        if (toUpdate.hasRole()) {
            if (!EnumUtils.isValidEnum(RoleTypeEnum.class, toUpdate.getRole())) {
                throw new RestBadRequestException("Role type does not exist");
            }

            userRole.setRole(toUpdate.getRole());
        }

        return userRoleDao.save(userRole);
    }

    @Transactional
    public void deleteUserRole(String id) {
        if (!userRoleDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        userRoleDao.delete(Integer.valueOf(id));
    }
}
