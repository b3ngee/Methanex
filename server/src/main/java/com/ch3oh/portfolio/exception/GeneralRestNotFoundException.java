package com.ch3oh.portfolio.exception;

public class GeneralRestNotFoundException extends RestNotFoundException {
    public GeneralRestNotFoundException() {
        super("Resource not found");
    }
}
