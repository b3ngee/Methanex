package com.ch3oh.portfolio.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.persistence.Classification;
import com.ch3oh.portfolio.repository.ClassificationDao;

@Component
public class ClassificationServiceImpl {

    @Autowired
    private ClassificationDao classificationDao;

    @Transactional(readOnly = true)
    public Classification getClassification(String id) {
        Classification classification = classificationDao.findOne(Integer.valueOf(id));

        if (classification == null) {
            throw new GeneralRestNotFoundException();
        }

        return classification;
    }

    @Transactional(readOnly = true)
    public Iterable<Classification> getClassifications() {
        return classificationDao.findAll();
    }

    @Transactional
    public Classification createClassification(Classification classification) {
        if (!classification.hasName()) {
            throw new RestBadRequestException("Classification name is missing");
        }

        validateClassification(classification);

        return classificationDao.save(classification);
    }

    @Transactional
    public Classification updateClassification(String id, Classification toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        Classification classification = classificationDao.findOne(Integer.valueOf(id));

        if (classification == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasName()) {
            String classificationName = toUpdate.getName();
            validateClassificationName(classificationName);
            classification.setName(classificationName);
        }

        validateClassification(classification);

        return classificationDao.save(classification);
    }

    @Transactional
    public void deleteClassification(String id) {
        if (!classificationDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        classificationDao.delete(Integer.valueOf(id));
    }

    private void validateClassification(Classification classification) {
        try {
            Classification existingClassification = classificationDao.findByClassificationByName(classification.getName());

            if (existingClassification != null && existingClassification.getId() != classification.getId()) {
                throw new RestBadRequestException("Classification name already exists");
            }
        } catch (Exception e) { // TODO: Work around for handling SQLConstraintException
            throw new RestBadRequestException("Classification name already exists");
        }
    }

    private void validateClassificationName(String name) {
        if (StringUtils.isBlank(name)) {
            throw new RestBadRequestException("Classification name is blank");
        }
    }
}
