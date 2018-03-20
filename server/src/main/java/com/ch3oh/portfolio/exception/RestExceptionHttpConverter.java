package com.ch3oh.portfolio.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class RestExceptionHttpConverter {
    public static ResponseEntity<BaseRestException> exceptionToHttpResult(BaseRestException e) {
        HttpStatus returnStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        if (e instanceof RestBadRequestException) {
            returnStatus = HttpStatus.BAD_REQUEST;
        } else if (e instanceof RestNotFoundException) {
            returnStatus = HttpStatus.NOT_FOUND;
        }

        return new ResponseEntity<>(e, returnStatus);
    }
}
