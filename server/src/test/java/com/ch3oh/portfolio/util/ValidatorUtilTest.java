package com.ch3oh.portfolio.util;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import java.text.ParseException;

public class ValidatorUtilTest {

    @Test
    public void testIsValidEmail_validEmail() throws ParseException {
        String validEmail = "admin@methanex.com";
        assertTrue(ValidatorUtil.isValidEmail(validEmail));
    }

    @Test
    public void testIsValidEmail_invalidEmail() {
        String validEmail = "admin@@methanex.com";
        assertFalse(ValidatorUtil.isValidEmail(validEmail));
    }
}
