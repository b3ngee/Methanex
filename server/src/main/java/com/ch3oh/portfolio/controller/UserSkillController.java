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

import com.ch3oh.portfolio.persistence.UserSkill;
import com.ch3oh.portfolio.service.UserSkillServiceImpl;

@RestController
@RequestMapping(path = "/user-skills")
public class UserSkillController {

    @Autowired
    private UserSkillServiceImpl userSkillService;

    @GetMapping(value = "/{id}")
    @ResponseBody
    public UserSkill getUserSkill(@PathVariable("id") String id) {
        return userSkillService.getUserSkill(id);
    }

    @GetMapping
    @ResponseBody
    public Iterable<UserSkill> getUserSkills(@RequestParam(value = "userId", required = false) Integer userId) {
        if (userId != null) {
            return userSkillService.getUserSkillsById(userId);
        }

        return userSkillService.getUserSkills();
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserSkill createUserSkill(@RequestBody UserSkill user) {
        return userSkillService.createUserSkill(user);
    }

    @PutMapping(value = "/{id}")
    @ResponseBody
    public UserSkill updateUserSkill(@PathVariable("id") String id, @RequestBody UserSkill toUpdate) {
        return userSkillService.updateUserSkill(id, toUpdate);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUserSkill(@PathVariable("id") String id) {
        userSkillService.deleteUserSkill(id);
    }
}
