package com.ch3oh.portfolio.persistence;

public enum RoleType {
    ADMIN(50),
    PORTFOLIO_MANAGER(40),
    PROJECT_MANAGER(30),
    RESOURCE_MANAGER(20),
    RESOURCE(10);

    private int value;

    RoleType(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
