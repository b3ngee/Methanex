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
import com.ch3oh.portfolio.persistence.SkillCategory;
import com.ch3oh.portfolio.repository.SkillCategoryDao;

@RunWith(MockitoJUnitRunner.class)
public class SkillCategoryServiceImplTest {
    private static SkillCategory SC0;
    private static Integer SC0_ID = 0;
    private static String SC0_NAME = "SC0_NAME";

    private static Integer NON_EXISTENT_ID = 1;

    @Mock
    private SkillCategoryDao skillCategoryDao;

    @InjectMocks
    private SkillCategoryServiceImpl skillCategoryService;

    @Before
    public void before() {
        SC0 = new SkillCategory();
        SC0.setId(SC0_ID);
        SC0.setName(SC0_NAME);
        Mockito.when(skillCategoryDao.findOne(SC0_ID)).thenReturn(SC0);
        Mockito.when(skillCategoryDao.save(SC0)).thenReturn(SC0);
        Mockito.when(skillCategoryDao.exists(SC0_ID)).thenReturn(true);

        Mockito.when(skillCategoryDao.findOne(NON_EXISTENT_ID)).thenReturn(null);
        Mockito.when(skillCategoryDao.exists(NON_EXISTENT_ID)).thenReturn(false);
    }

    @Test
    public void testGetSkillCategory() {
        SkillCategory c = skillCategoryService.getSkillCategory(SC0_ID.toString());
        assertEquals(SC0_ID, c.getId());
        assertEquals(SC0_NAME, c.getName());
    }

    @Test (expected = GeneralRestNotFoundException.class)
    public void testGetSkillCategory_notFound() {
        skillCategoryService.getSkillCategory(NON_EXISTENT_ID.toString());
    }

    @Test
    public void testCreateSkillCategory() {
        SkillCategory c = skillCategoryService.createSkillCategory(SC0);
        assertEquals(SC0_ID, c.getId());
        assertEquals(SC0_NAME, c.getName());
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateSkillCategory_missingName() {
        SC0.setName(null);
        skillCategoryService.createSkillCategory(SC0);
    }

    @Test
    public void testUpdateSkillCategory() {
        final String UPDATED_SC0_NAME = "UPDATED_SSC0_NAME";
        SkillCategory updatedC0 = new SkillCategory();
        updatedC0.setName(UPDATED_SC0_NAME);

        SkillCategory c = skillCategoryService.updateSkillCategory(SC0_ID.toString(), updatedC0);

        assertEquals(SC0_ID, c.getId());
        assertEquals(UPDATED_SC0_NAME, c.getName());
    }

    @Test (expected = RestBadRequestException.class)
    public void testUpdateSkillCategory_blankName() {
        SC0.setName("");
        skillCategoryService.updateSkillCategory(SC0_ID.toString(), SC0);
    }

    @Test
    public void testDeleteSkillCategory() {
        skillCategoryService.deleteSkillCategory(SC0_ID.toString());
    }

    @Test (expected = GeneralRestNotFoundException.class)
    public void testDeleteSkillCategory_notFound() {
        skillCategoryService.deleteSkillCategory(NON_EXISTENT_ID.toString());
    }
}
