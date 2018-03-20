package com.ch3oh.portfolio.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonIgnoreProperties({"cause", "stackTrace", "localizedMessage"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public abstract class BaseRestException extends RuntimeException {
    private final String errorCode;

    public BaseRestException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
