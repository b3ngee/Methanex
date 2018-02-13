package com.ch3oh.portfolio.exception.user;

import com.ch3oh.portfolio.exception.RestBadRequestException;

public class ManagerDoesNotExistException extends RestBadRequestException {
    public ManagerDoesNotExistException() {
        super("Manager does not exist");
    }
}
