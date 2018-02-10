package com.ch3oh.portfolio.exception;

public class RestNotFoundException extends BaseRestException {
    public RestNotFoundException(String message) {
        super("NOT_FOUND", message);
    }
}
