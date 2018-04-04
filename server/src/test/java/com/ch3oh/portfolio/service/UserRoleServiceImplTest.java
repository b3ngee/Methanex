package com.ch3oh.portfolio.service;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.exception.user.UserNotFoundException;
import com.ch3oh.portfolio.persistence.RoleTypeEnum;
import com.ch3oh.portfolio.persistence.UserRole;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.repository.UserRoleDao;

@RunWith(MockitoJUnitRunner.class)
public class UserRoleServiceImplTest {
    private static UserRole UR0;
    private static final Integer UR0_ID = 0;
    private static final Integer UR0_USER_ID = 0;
    private static final String UR0_ROLE = RoleTypeEnum.SUPER_ADMIN.toString();

    private static final Integer EXISTENT_USER_ID = 2;

    private static final Integer NON_EXISTENT_USERROLE_ID = 1;
    private static final Integer NON_EXISTENT_USER_ID = 1;

    private static final String INVALID_ROLE = "INVALID_ROLE";

    @Mock
    private UserRoleDao userRoleDao;
    @Mock
    private UserDao userDao;

    @InjectMocks
    private UserRoleServiceImpl userRoleService;

    @Before
    public void before() {
        UR0 = new UserRole();
        UR0.setId(UR0_ID);
        UR0.setUserId(UR0_USER_ID);
        UR0.setRole(UR0_ROLE);
        Mockito.when(userRoleDao.findOne(UR0_ID)).thenReturn(UR0);
        Mockito.when(userRoleDao.save(UR0)).thenReturn(UR0);
        Mockito.when(userRoleDao.exists(UR0_ID)).thenReturn(true);

        Mockito.when(userDao.exists(UR0_USER_ID)).thenReturn(true);
        Mockito.when(userDao.exists(EXISTENT_USER_ID)).thenReturn(true);

        Mockito.when(userRoleDao.exists(NON_EXISTENT_USERROLE_ID)).thenReturn(false);
        Mockito.when(userRoleDao.exists(NON_EXISTENT_USER_ID)).thenReturn(false);
    }

    @Test
    public void testGetClassification() {
        UserRole ur = userRoleService.getUserRole(UR0_ID.toString());
        assertEquals(UR0_ID, ur.getId());
        assertEquals(UR0_USER_ID, ur.getUserId());
        assertEquals(UR0_ROLE, ur.getRole());
    }

    @Test (expected = GeneralRestNotFoundException.class)
    public void testGetClassification_notFound() {
        userRoleService.getUserRole(NON_EXISTENT_USERROLE_ID.toString());
    }

    @Test
    public void testCreateClassification() {
        UserRole ur = userRoleService.createUserRole(UR0);
        assertEquals(UR0_ID, ur.getId());
        assertEquals(UR0_USER_ID, ur.getUserId());
        assertEquals(UR0_ROLE, ur.getRole());
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateClassification_missingUserId() {
        UR0.setUserId(null);
        userRoleService.createUserRole(UR0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateClassification_missingRole() {
        UR0.setRole(null);
        userRoleService.createUserRole(UR0);
    }

    @Test (expected = UserNotFoundException.class)
    public void testCreateClassification_nonExistentUserId() {
        UR0.setUserId(NON_EXISTENT_USER_ID);
        userRoleService.createUserRole(UR0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateClassification_invalidRole() {
        UR0.setRole(INVALID_ROLE);
        userRoleService.createUserRole(UR0);
    }

    @Test
    public void testUpdateUserRole() {
        final String updatedRole = RoleTypeEnum.RESOURCE.toString();

        UserRole updatedUserSkill = new UserRole();
        updatedUserSkill.setUserId(EXISTENT_USER_ID);
        updatedUserSkill.setRole(updatedRole);

        UserRole ur = userRoleService.updateUserRole(UR0_ID.toString(), updatedUserSkill);

        assertEquals(UR0_ID, ur.getId());
        assertEquals(EXISTENT_USER_ID, ur.getUserId());
        assertEquals(updatedRole, ur.getRole());
    }

    @Test (expected = UserNotFoundException.class)
    public void testUpdateClassification_nonExistentUserId() {
        UR0.setUserId(NON_EXISTENT_USER_ID);
        userRoleService.updateUserRole(UR0_ID.toString(), UR0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testUpdateUserRole_invalidRole() {
        UR0.setRole(INVALID_ROLE);
        userRoleService.updateUserRole(UR0_ID.toString(), UR0);
    }

    @Test
    public void testDeleteClassification() {
        userRoleService.deleteUserRole(UR0_ID.toString());
    }

    @Test (expected = GeneralRestNotFoundException.class)
    public void testDeleteClassification_notFound() {
        userRoleService.deleteUserRole(NON_EXISTENT_USERROLE_ID.toString());
    }
}
