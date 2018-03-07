package com.ch3oh.portfolio.exception.user;

import com.ch3oh.portfolio.exception.RestNotFoundException;

public class UserNotFoundException extends RestNotFoundException {
    public UserNotFoundException() {
        super("User not found");
    }
}
