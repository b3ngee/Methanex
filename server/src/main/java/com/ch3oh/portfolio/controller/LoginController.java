package com.ch3oh.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ch3oh.portfolio.dto.LoginDTO;
import com.ch3oh.portfolio.service.LoginServiceImpl;

@RestController
@RequestMapping(path = "/login")
public class LoginController {

    @Autowired
    private LoginServiceImpl loginService;

    @PostMapping
    @ResponseBody
    public LoginDTO login(@RequestBody LoginDTO login) {
        return loginService.login(login);
    }
}
