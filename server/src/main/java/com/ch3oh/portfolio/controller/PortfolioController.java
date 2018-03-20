package com.ch3oh.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ch3oh.portfolio.persistence.Portfolio;
import com.ch3oh.portfolio.service.PortfolioServiceImpl;

@RestController
@RequestMapping(path = "/portfolios")
public class PortfolioController {

    @Autowired
    private PortfolioServiceImpl portfolioService;

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Portfolio getPortfolio(@PathVariable("id") String id) {
        return portfolioService.getPortfolio(id);
    }

    @GetMapping
    @ResponseBody
    public Iterable<Portfolio> getPortfolios(@RequestParam(value = "managerId", required = false) Integer managerId, @RequestParam(value = "classificationId", required = false) Integer classificationId) {
        return portfolioService.getPortfolios(managerId, classificationId);
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public Portfolio createPortfolio(@RequestBody Portfolio portfolio) {
        return portfolioService.createPortfolio(portfolio);
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public Portfolio updatePortfolio(@PathVariable("id") String id, @RequestBody Portfolio toUpdate) {
        return portfolioService.updatePortfolio(id, toUpdate);
    }

    @DeleteMapping(value = "/{id}")
    public void deletePortfolio(@PathVariable("id") String id) {
        portfolioService.deletePortfolio(id);
    }
}
