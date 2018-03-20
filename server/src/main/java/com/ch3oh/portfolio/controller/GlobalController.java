package com.ch3oh.portfolio.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ch3oh.portfolio.exception.BaseRestException;
import com.ch3oh.portfolio.exception.GeneralRestNotFoundException;
import com.ch3oh.portfolio.exception.RestExceptionHttpConverter;
import com.ch3oh.portfolio.exception.RestInternalServerErrorException;
import com.ch3oh.portfolio.exception.RestMethodNotSupportException;

@ControllerAdvice
public class GlobalController {
    private static final Logger LOG = LoggerFactory.getLogger(GlobalController.class);

    @ExceptionHandler(value = { BaseRestException.class })
    private ResponseEntity<BaseRestException> handleRestException(BaseRestException e) {
        LOG.debug(e.getMessage(), e);
        return RestExceptionHttpConverter.exceptionToHttpResult(e);
    }

    @ExceptionHandler(value = { EmptyResultDataAccessException.class })
    private ResponseEntity<BaseRestException> handleEmptyResultDataAccessException(EmptyResultDataAccessException e) {
        LOG.debug(e.getMessage(), e);
        return new ResponseEntity<BaseRestException>(new GeneralRestNotFoundException(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = { HttpRequestMethodNotSupportedException.class })
    private ResponseEntity<RestMethodNotSupportException> handleRestRequestMethodNotSupportedException(Exception e) {
        LOG.debug(e.getMessage(), e);
        return new ResponseEntity<RestMethodNotSupportException>(new RestMethodNotSupportException(), HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(value = { Exception.class })
    private ResponseEntity<RestInternalServerErrorException> handleException(Exception e) {
        LOG.debug(e.getMessage(), e);
        return new ResponseEntity<RestInternalServerErrorException>(new RestInternalServerErrorException(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
