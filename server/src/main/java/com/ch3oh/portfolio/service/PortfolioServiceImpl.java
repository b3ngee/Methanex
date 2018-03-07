package com.ch3oh.portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.ch3oh.portfolio.exception.GeneralRestBadRequestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestBadRequestException;
import com.ch3oh.portfolio.exception.user.UserNotFoundException;
import com.ch3oh.portfolio.persistence.Portfolio;
import com.ch3oh.portfolio.persistence.RoleTypeEnum;
import com.ch3oh.portfolio.repository.ClassificationDao;
import com.ch3oh.portfolio.repository.PortfolioDao;
import com.ch3oh.portfolio.repository.UserDao;
import com.ch3oh.portfolio.repository.UserRoleDao;

@Component
public class PortfolioServiceImpl {

    @Autowired
    private PortfolioDao portfolioDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserRoleDao userRoleDao;
    @Autowired
    private ClassificationDao classificationDao;

    @Transactional(readOnly = true)
    public Portfolio getPortfolio(String id) {
        Portfolio portfolio = portfolioDao.findOne(Integer.valueOf(id));

        if (portfolio == null) {
            throw new GeneralRestNotFoundException();
        }

        return portfolio;
    }

    @Transactional(readOnly = true)
    public Iterable<Portfolio> getPortfolios() {
        return portfolioDao.findAll();
    }

    @Transactional
    public Portfolio createPortfolio(Portfolio portfolio) {
        if (portfolio.hasManagerId()) {
            validateManager(portfolio.getManagerId());
        }

        if (!portfolio.hasClassificationId()) {
            throw new RestBadRequestException("Classification is missing");
        }

        validateClassification(portfolio.getClassificationId());
        validatePortfolio(portfolio);

        return portfolioDao.save(portfolio);
    }

    @Transactional
    public Portfolio updatePortfolio(String id, Portfolio toUpdate) {
        if (toUpdate == null) {
            throw new GeneralRestBadRequestException();
        }

        Portfolio portfolio = portfolioDao.findOne(Integer.valueOf(id));

        if (portfolio == null) {
            throw new GeneralRestNotFoundException();
        }

        if (toUpdate.hasManagerId()) {
            validateManager(toUpdate.getManagerId());
            portfolio.setManagerId(toUpdate.getManagerId());
        }

        if (toUpdate.hasClassificationId()) {
            validateClassification(toUpdate.getClassificationId());
            portfolio.setClassificationId(toUpdate.getClassificationId());
        }

        validatePortfolio(portfolio);

        return portfolioDao.save(portfolio);
    }

    @Transactional
    public void deletePortfolio(String id) {
        if (!portfolioDao.exists(Integer.valueOf(id))) {
            throw new GeneralRestNotFoundException();
        }

        portfolioDao.delete(Integer.valueOf(id));
    }

    private void validatePortfolio(Portfolio portfolio) {
        Portfolio existingPortfolio = portfolioDao.findByClassificationId(portfolio.getClassificationId());

        if (existingPortfolio != null && existingPortfolio.getId() != portfolio.getId()) {
            throw new RestBadRequestException("Classification already exists");
        }
    }

    private void validateManager(Integer userId) {
        if (!userDao.exists(userId)) {
            throw new UserNotFoundException();
        }

        if (userRoleDao.findByUserIdAndRole(userId, RoleTypeEnum.PORTFOLIO_MANAGER.toString()) == null) {
            throw new RestBadRequestException("User is not a portfolio manager");
        }
    }

    private void validateClassification(Integer classificationId) {
        if (!classificationDao.exists(classificationId)) {
            throw new RestBadRequestException("Classification does not exist");
        }
    }
}