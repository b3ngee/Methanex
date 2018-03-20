package com.ch3oh.portfolio.util;

import org.junit.Assert;
import org.junit.Test;

import java.text.ParseException;

public class ValidatorUtilTest {

    @Test
    public void testIsValidEmail_validEmail() throws ParseException {
        String validEmail = "admin@methanex.com";
        Assert.assertTrue(ValidatorUtil.isValidEmail(validEmail));
    }

    @Test
    public void testIsValidEmail_invalidEmail() {
        String validEmail = "admin@@methanex.com";
        Assert.assertFalse(ValidatorUtil.isValidEmail(validEmail));
    }
}
