package com.ch3oh.portfolio.exception.role;

import com.ch3oh.portfolio.exception.RestBadRequestException;

public class InvalidRoleTypeException extends RestBadRequestException {
    public InvalidRoleTypeException() {
        super("Invalid role type");
    }
}
