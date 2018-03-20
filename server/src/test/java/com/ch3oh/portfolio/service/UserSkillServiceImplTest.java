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
import com.ch3oh.portfolio.persistence.UserSkill;
import com.ch3oh.portfolio.repository.SkillTypeDao;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.repository.UserSkillDao;

@RunWith(MockitoJUnitRunner.class)
public class UserSkillServiceImplTest {
    private static UserSkill US0;
    private static Integer US0_ID = 0;
    private static Integer US0_USER_ID = 0;
    private static Integer US0_SKILLTYPE_ID = 0;
    private static Integer US0_COMPETENCY = 5;

    private static Integer EXISTENT_USER_ID = 2;
    private static Integer EXISTENT_SKILLTYPE_ID = 2;

    private static Integer NON_EXISTENT_USERSKILL_ID = 1;
    private static Integer NON_EXISTENT_USER_ID = 1;
    private static Integer NON_EXISTENT_SKILLTYPE_ID = 1;

    private static Integer VALID_COMPETENCY = 1;
    private static Integer INVALID_COMPETENCY = 6;

    @Mock
    private UserSkillDao userSkillDao;
    @Mock
    private UserDao userDao;
    @Mock
    private SkillTypeDao skillTypeDao;

    @InjectMocks
    private UserSkillServiceImpl userSkillService;

    @Before
    public void before() {
        US0 = new UserSkill();
        US0.setId(US0_ID);
        US0.setUserId(US0_USER_ID);
        US0.setSkillTypeId(US0_SKILLTYPE_ID);
        US0.setCompetency(US0_COMPETENCY);
        Mockito.when(userSkillDao.findOne(US0_ID)).thenReturn(US0);
        Mockito.when(userSkillDao.save(US0)).thenReturn(US0);
        Mockito.when(userSkillDao.exists(US0_ID)).thenReturn(true);

        Mockito.when(userDao.exists(US0_USER_ID)).thenReturn(true);
        Mockito.when(skillTypeDao.exists(US0_SKILLTYPE_ID)).thenReturn(true);

        Mockito.when(userDao.exists(EXISTENT_USER_ID)).thenReturn(true);
        Mockito.when(skillTypeDao.exists(EXISTENT_SKILLTYPE_ID)).thenReturn(true);

        Mockito.when(userDao.exists(NON_EXISTENT_USER_ID)).thenReturn(false);
        Mockito.when(userSkillDao.exists(NON_EXISTENT_USERSKILL_ID)).thenReturn(false);
        Mockito.when(skillTypeDao.exists(NON_EXISTENT_SKILLTYPE_ID)).thenReturn(false);
    }

    @Test
    public void testGetSkillCategory() {
        UserSkill us = userSkillService.getUserSkill(US0_ID.toString());
        assertEquals(US0_ID, us.getId());
        assertEquals(US0_USER_ID, us.getUserId());
        assertEquals(US0_SKILLTYPE_ID, us.getSkillTypeId());
        assertEquals(US0_COMPETENCY, us.getCompetency());
    }

    @Test(expected = GeneralRestNotFoundException.class)
    public void testGetSkillCategory_notFound() {
        userSkillService.getUserSkill(NON_EXISTENT_USERSKILL_ID.toString());
    }

    @Test
    public void testCreateUserSkill() {
        UserSkill us = userSkillService.createUserSkill(US0);
        assertEquals(US0_ID, us.getId());
        assertEquals(US0_USER_ID, us.getUserId());
        assertEquals(US0_SKILLTYPE_ID, us.getSkillTypeId());
        assertEquals(US0_COMPETENCY, us.getCompetency());
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateUserSkill_missingUserId() {
        US0.setUserId(null);
        userSkillService.createUserSkill(US0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateUserSkill_missingSkillTypeId() {
        US0.setSkillTypeId(null);
        userSkillService.createUserSkill(US0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateUserSkill_missingCompetency() {
        US0.setCompetency(null);
        userSkillService.createUserSkill(US0);
    }

    @Test (expected = UserNotFoundException.class)
    public void testCreateUserSkill_nonExistentUserId() {
        US0.setUserId(NON_EXISTENT_USER_ID);
        userSkillService.createUserSkill(US0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateUserSkill_nonExistentSkillTypeId() {
        US0.setSkillTypeId(NON_EXISTENT_SKILLTYPE_ID);
        userSkillService.createUserSkill(US0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateUserSkill_invalidCompetency() {
        US0.setCompetency(INVALID_COMPETENCY);
        userSkillService.createUserSkill(US0);
    }

    @Test
    public void testUpdateUserSkill() {
        UserSkill updatedUserSkill = new UserSkill();
        updatedUserSkill.setUserId(EXISTENT_USER_ID);
        updatedUserSkill.setSkillTypeId(EXISTENT_SKILLTYPE_ID);
        updatedUserSkill.setCompetency(VALID_COMPETENCY);

        UserSkill us = userSkillService.updateUserSkill(US0_ID.toString(), updatedUserSkill);
        assertEquals(US0_ID, us.getId());
        assertEquals(EXISTENT_USER_ID, us.getUserId());
        assertEquals(EXISTENT_SKILLTYPE_ID, us.getSkillTypeId());
        assertEquals(VALID_COMPETENCY, us.getCompetency());
    }

    @Test (expected = UserNotFoundException.class)
    public void testUpdateSkillCategory_nonExistentUserId() {
        US0.setUserId(NON_EXISTENT_USER_ID);
        userSkillService.updateUserSkill(US0_ID.toString(), US0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testUpdateSkillCategory_nonExistentSkillTypeId() {
        US0.setSkillTypeId(NON_EXISTENT_SKILLTYPE_ID);
        userSkillService.updateUserSkill(US0_ID.toString(), US0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testUpdateSkillCategory_invalidCompetency() {
        US0.setCompetency(INVALID_COMPETENCY);
        userSkillService.updateUserSkill(US0_ID.toString(), US0);
    }

    @Test
    public void testDeleteSkillCategory() {
        userSkillService.deleteUserSkill(US0_ID.toString());
    }

    @Test(expected = GeneralRestNotFoundException.class)
    public void testDeleteSkillCategory_notFound() {
        userSkillService.deleteUserSkill(NON_EXISTENT_USERSKILL_ID.toString());
    }
}
