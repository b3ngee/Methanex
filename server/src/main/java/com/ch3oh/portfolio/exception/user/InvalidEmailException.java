package com.ch3oh.portfolio.exception.user;

import com.ch3oh.portfolio.exception.RestBadRequestException;

public class InvalidEmailException extends RestBadRequestException {
    public InvalidEmailException() {
        super("Invalid email");
    }
}
