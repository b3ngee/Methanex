package com.ch3oh.portfolio.service;

import org.apache.commons.lang3.EnumUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.exception.user.UserNotFoundException;
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

        validateUser(userRole.getUserId());
        validateRole(userRole.getRole());
        validateUserRole(userRole);

        return userRoleDao.save(userRole);
    }

    @Transactional
    public UserRole updateUserRole(String id, UserRole toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        UserRole userRole = userRoleDao.findOne(Integer.valueOf(id));

        if (userRole == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasUserId()) {
            validateUser(toUpdate.getUserId());
            userRole.setUserId(toUpdate.getUserId());
        }

        if (toUpdate.hasRole()) {
            validateRole(toUpdate.getRole());
            userRole.setRole(toUpdate.getRole());
        }

        validateUserRole(userRole);

        return userRoleDao.save(userRole);
    }

    @Transactional
    public void deleteUserRole(String id) {
        if (!userRoleDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        userRoleDao.delete(Integer.valueOf(id));
    }

    private void validateUserRole(UserRole userRole) {
        try {
            UserRole existingUserRole = userRoleDao.findByUserIdAndRole(userRole.getUserId(), userRole.getRole());

            if (existingUserRole != null && existingUserRole.getId() != userRole.getId()) {
                throw new RestBadRequestException("User already has the specified role");
            }
        } catch (Exception e) {
            throw new RestBadRequestException("User already has the specified role");
        }
    }

    private void validateUser(Integer userId) {
        if (!userDao.exists(userId)) {
            throw new UserNotFoundException();
        }
    }

    private void validateRole(String role) {
        if (StringUtils.isBlank(role)) {
            throw new RestBadRequestException("Role type is blank");
        }

        if (!EnumUtils.isValidEnum(RoleTypeEnum.class, role)) {
            throw new RestBadRequestException("Role type does not exist (must be one of: SUPER_ADMIN, PORTFOLIO_MANAGER, PROJECT_MANAGER, RESOURCE_MANAGER or RESOURCE)");
        }
    }
}
