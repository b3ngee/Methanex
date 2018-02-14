package com.ch3oh.portfolio.util;

import org.apache.commons.lang3.StringUtils;

import java.util.regex.Pattern;

public class ValidatorUtil {
    private static final Pattern emailValidationPattern = Pattern.compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");

    public static boolean isValidEmail(String email) {
        return !StringUtils.isBlank(email) && emailValidationPattern.matcher(email).matches();
    }
}
