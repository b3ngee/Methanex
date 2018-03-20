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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ch3oh.portfolio.persistence.Classification;
import com.ch3oh.portfolio.service.ClassificationServiceImpl;

@RestController
@RequestMapping(path = "/classifications")
public class ClassificationController {

    @Autowired
    private ClassificationServiceImpl classificationService;

    @GetMapping(value = "/{id}")
    @ResponseBody
    public Classification getClassification(@PathVariable("id") String id) {
        return classificationService.getClassification(id);
    }

    @GetMapping
    @ResponseBody
    public Iterable<Classification> getClassifications() {
        return classificationService.getClassifications();
    }

    @PostMapping
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public Classification createClassification(@RequestBody Classification classification) {
        return classificationService.createClassification(classification);
    }

    @PutMapping(value = "/{id}")
    public Classification updateClassification(@PathVariable("id") String id, @RequestBody Classification toUpdate) {
        return classificationService.updateClassification(id, toUpdate);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteClassification(@PathVariable("id") String id) {
        classificationService.deleteClassification(id);
    }
}
