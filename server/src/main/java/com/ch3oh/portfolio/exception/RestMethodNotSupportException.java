package com.ch3oh.portfolio.exception;

public class RestMethodNotSupportException extends BaseRestException {
    public RestMethodNotSupportException() {
        super("METHOD_NOT_SUPPORTED", "Method not supported");
    }
}
