package com.ch3oh.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.exception.user.UserNotFoundException;
import com.ch3oh.portfolio.persistence.UserSkill;
import com.ch3oh.portfolio.repository.SkillTypeDao;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.repository.UserSkillDao;

@Component
public class UserSkillServiceImpl {

    @Autowired
    private UserSkillDao userSkillDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private SkillTypeDao skillTypeDao;

    @Transactional(readOnly = true)
    public UserSkill getUserSkill(String id) {
        UserSkill userSkill = userSkillDao.findOne(Integer.valueOf(id));

        if (userSkill == null) {
            throw new GeneralRestNotFoundException();
        }

        return userSkill;
    }

    @Transactional(readOnly = true)
    public Iterable<UserSkill> getUserSkills() {
        return userSkillDao.findAll();
    }

    @Transactional
    public UserSkill createUserSkill(UserSkill userSkill) {
        if (!userSkill.hasUserId()) {
            throw new RestBadRequestException("User ID is missing");
        }

        if (!userSkill.hasSkillTypeId()) {
            throw new RestBadRequestException("Skill type ID is missing");
        }

        if (!userSkill.hasCompetency()) {
            throw new RestBadRequestException("Competency is missing");
        }

        validateUser(userSkill.getUserId());
        validateSkillType(userSkill.getSkillTypeId());
        validateCompetency(userSkill.getCompetency());

        validateUserSkillDoesNotExist(userSkill);

        return userSkillDao.save(userSkill);
    }

    @Transactional
    public UserSkill updateUserSkill(String id, UserSkill toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        UserSkill userSkill = userSkillDao.findOne(Integer.valueOf(id));

        if (userSkill == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasUserId()) {
            validateUser(toUpdate.getUserId());
            userSkill.setUserId(toUpdate.getUserId());
        }

        if (toUpdate.hasSkillTypeId()) {
            validateSkillType(toUpdate.getSkillTypeId());
            userSkill.setSkillTypeId(toUpdate.getSkillTypeId());
        }

        if (toUpdate.hasCompetency()) {
            validateCompetency(toUpdate.getCompetency());
            userSkill.setCompetency(toUpdate.getCompetency());
        }

        validateUserSkillDoesNotExist(userSkill);

        return userSkillDao.save(userSkill);
    }

    @Transactional
    public void deleteUserSkill(String id) {
        if (!userSkillDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        userSkillDao.delete(Integer.valueOf(id));
    }

    private void validateUserSkillDoesNotExist(UserSkill userSkill) {
        UserSkill existingUserSkill = userSkillDao.findByUserIdAndSkillTypeId(userSkill.getUserId(), userSkill.getSkillTypeId());

        if (existingUserSkill != null && existingUserSkill.getId() != userSkill.getId()) {
            throw new RestBadRequestException("User already has skill type");
        }
    }

    private void validateUser(Integer userId) {
        if (!userDao.exists(userId)) {
            throw new UserNotFoundException();
        }
    }

    private void validateSkillType(Integer skillTypeId) {
        if (!skillTypeDao.exists(skillTypeId)) {
            throw new RestBadRequestException("Skill type not found");
        }
    }

    private void validateCompetency(Integer competency) {
        if (competency < 0 || competency > 5) {
            throw new RestBadRequestException("Invalid competency level (must be between 0 and 5)");
        }
    }
}
