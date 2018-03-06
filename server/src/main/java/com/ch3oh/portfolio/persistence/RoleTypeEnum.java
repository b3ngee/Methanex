package com.ch3oh.portfolio.persistence;

public enum RoleTypeEnum {
    SUPER_ADMIN(10),
    PORTFOLIO_MANAGER(8),
    PROJECT_MANAGER(6),
    RESOURCE_MANAGER(4),
    RESOURCE(2);

    private int value;

    RoleTypeEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
