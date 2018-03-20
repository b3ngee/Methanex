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
import com.ch3oh.portfolio.persistence.SkillType;
import com.ch3oh.portfolio.repository.SkillCategoryDao;
import com.ch3oh.portfolio.repository.SkillTypeDao;

@RunWith(MockitoJUnitRunner.class)
public class SkillTypeServiceImplTest {
    private static SkillType ST0;
    private static Integer ST0_ID = 0;
    private static Integer ST0_SC_ID = 0;
    private static String ST0_NAME = "ST0_NAME";

    private static Integer EXISTENT_SC_ID = 2;

    private static Integer NON_EXISTENT_ST_ID = 1;
    private static Integer NON_EXISTENT_SC_ID = 1;

    @Mock
    private SkillTypeDao skillTypeDao;

    @Mock
    private SkillCategoryDao skillCategoryDao;

    @InjectMocks
    private SkillTypeServiceImpl skillCategoryService;

    @Before
    public void before() {
        ST0 = new SkillType();
        ST0.setId(ST0_ID);
        ST0.setSkillCategoryId(ST0_SC_ID);
        ST0.setName(ST0_NAME);
        Mockito.when(skillTypeDao.findOne(ST0_ID)).thenReturn(ST0);
        Mockito.when(skillTypeDao.save(ST0)).thenReturn(ST0);
        Mockito.when(skillTypeDao.exists(ST0_ID)).thenReturn(true);

        Mockito.when(skillCategoryDao.exists(ST0_SC_ID)).thenReturn(true);
        Mockito.when(skillCategoryDao.exists(EXISTENT_SC_ID)).thenReturn(true);

        Mockito.when(skillTypeDao.findOne(NON_EXISTENT_ST_ID)).thenReturn(null);
        Mockito.when(skillTypeDao.exists(NON_EXISTENT_ST_ID)).thenReturn(false);

        Mockito.when(skillTypeDao.exists(NON_EXISTENT_SC_ID)).thenReturn(false);
    }

    @Test
    public void testGetSkillType() {
        SkillType c = skillCategoryService.getSkillType(ST0_ID.toString());
        assertEquals(ST0_ID, c.getId());
        assertEquals(ST0_SC_ID, c.getSkillCategoryId());
        assertEquals(ST0_NAME, c.getName());
    }

    @Test (expected = GeneralRestNotFoundException.class)
    public void testGetSkillType_notFound() {
        skillCategoryService.getSkillType(NON_EXISTENT_ST_ID.toString());
    }

    @Test
    public void testCreateSkillType() {
        SkillType c = skillCategoryService.createSkillType(ST0);
        assertEquals(ST0_ID, c.getId());
        assertEquals(ST0_SC_ID, c.getSkillCategoryId());
        assertEquals(ST0_NAME, c.getName());
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateSkillType_missingName() {
        ST0.setName(null);
        skillCategoryService.createSkillType(ST0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateSkillType_blankName() {
        ST0.setName(" ");
        skillCategoryService.createSkillType(ST0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateSkillType_missingSkillCategoryId() {
        ST0.setSkillCategoryId(null);
        skillCategoryService.createSkillType(ST0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateSkillType_nonExistentSkillCategoryId() {
        ST0.setSkillCategoryId(NON_EXISTENT_SC_ID);
        skillCategoryService.createSkillType(ST0);
    }

    @Test
    public void testUpdateSkillType() {
        final String UPDATED_SST0_NAME = "UPDATED_SST0_NAME";
        SkillType updatedC0 = new SkillType();
        updatedC0.setName(UPDATED_SST0_NAME);
        updatedC0.setSkillCategoryId(EXISTENT_SC_ID);

        SkillType c = skillCategoryService.updateSkillType(ST0_ID.toString(), updatedC0);

        assertEquals(ST0_ID, c.getId());
        assertEquals(EXISTENT_SC_ID, c.getSkillCategoryId());
        assertEquals(UPDATED_SST0_NAME, c.getName());
    }

    @Test (expected = RestBadRequestException.class)
    public void testUpdateSkillType_blankName() {
        ST0.setName("");
        skillCategoryService.updateSkillType(ST0_ID.toString(), ST0);
    }

    @Test (expected = RestBadRequestException.class)
    public void testUpdateSkillType_nonExistentSkillCategoryId() {
        ST0.setSkillCategoryId(NON_EXISTENT_SC_ID);
        skillCategoryService.updateSkillType(ST0_ID.toString(), ST0);
    }

    @Test
    public void testDeleteSkillType() {
        skillCategoryService.deleteSkillType(ST0_ID.toString());
    }

    @Test (expected = GeneralRestNotFoundException.class)
    public void testDeleteSkillType_notFound() {
        skillCategoryService.deleteSkillType(NON_EXISTENT_ST_ID.toString());
    }
}
