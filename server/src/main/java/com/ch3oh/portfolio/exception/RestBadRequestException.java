package com.ch3oh.portfolio.exception;

public class RestBadRequestException extends BaseRestException {
    public RestBadRequestException(String message) {
        super("BAD_REQUEST", message);
    }
}
