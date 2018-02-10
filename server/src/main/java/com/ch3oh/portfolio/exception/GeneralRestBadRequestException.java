package com.ch3oh.portfolio.exception;

public class GeneralRestBadRequestException extends RestBadRequestException {
    public GeneralRestBadRequestException() {
        super("Bad request");
    }
}
