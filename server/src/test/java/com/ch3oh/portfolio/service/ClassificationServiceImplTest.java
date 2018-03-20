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
import com.ch3oh.portfolio.persistence.Classification;
import com.ch3oh.portfolio.repository.ClassificationDao;

@RunWith(MockitoJUnitRunner.class)
public class ClassificationServiceImplTest {
    private static Classification C0;
    private static Integer C0_ID = 0;
    private static String C0_NAME = "C0_NAME";

    private static Integer NON_EXISTENT_ID = 1;

    @Mock
    private ClassificationDao classificationDao;

    @InjectMocks
    private ClassificationServiceImpl classificationService;

    @Before
    public void before() {
        C0 = new Classification();
        C0.setId(C0_ID);
        C0.setName(C0_NAME);
        Mockito.when(classificationDao.findOne(C0_ID)).thenReturn(C0);
        Mockito.when(classificationDao.save(C0)).thenReturn(C0);
        Mockito.when(classificationDao.exists(C0_ID)).thenReturn(true);

        Mockito.when(classificationDao.findOne(NON_EXISTENT_ID)).thenReturn(null);
        Mockito.when(classificationDao.exists(NON_EXISTENT_ID)).thenReturn(false);
    }

    @Test
    public void testGetClassification() {
        Classification c = classificationService.getClassification(C0_ID.toString());
        assertEquals(C0_ID, c.getId());
        assertEquals(C0_NAME, c.getName());
    }

    @Test (expected = GeneralRestNotFoundException.class)
    public void testGetClassification_notFound() {
        classificationService.getClassification(NON_EXISTENT_ID.toString());
    }

    @Test
    public void testCreateClassification() {
        Classification c = classificationService.createClassification(C0);
        assertEquals(C0_ID, c.getId());
        assertEquals(C0_NAME, c.getName());
    }

    @Test (expected = RestBadRequestException.class)
    public void testCreateClassification_missingName() {
        C0.setName(null);
        classificationService.createClassification(C0);
    }

    @Test
    public void testUpdateClassification() {
        final String UPDATED_C0_NAME = "UPDATED_C0_NAME";
        Classification updatedC0 = new Classification();
        updatedC0.setName(UPDATED_C0_NAME);

        Classification c = classificationService.updateClassification(C0_ID.toString(), updatedC0);

        assertEquals(C0_ID, c.getId());
        assertEquals(UPDATED_C0_NAME, c.getName());
    }

    @Test (expected = RestBadRequestException.class)
    public void testUpdateClassification_blankName() {
        C0.setName("");
        classificationService.updateClassification(C0_ID.toString(), C0);
    }

    @Test
    public void testDeleteClassification() {
        classificationService.deleteClassification(C0_ID.toString());
    }

    @Test (expected = GeneralRestNotFoundException.class)
    public void testDeleteClassification_notFound() {
        classificationService.deleteClassification(NON_EXISTENT_ID.toString());
    }
}


