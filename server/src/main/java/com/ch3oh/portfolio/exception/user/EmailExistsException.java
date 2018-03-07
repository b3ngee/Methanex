package com.ch3oh.portfolio.exception.user;

import com.ch3oh.portfolio.exception.RestBadRequestException;

public class EmailExistsException extends RestBadRequestException {
    public EmailExistsException() {
        super("Email already exists");
    }
}
