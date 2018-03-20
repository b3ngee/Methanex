package com.ch3oh.portfolio.exception;

public class RestInternalServerErrorException extends BaseRestException{
    public RestInternalServerErrorException() {
        super("INTERNAL_SERVER_ERROR", "Internal server error");
    }
}
