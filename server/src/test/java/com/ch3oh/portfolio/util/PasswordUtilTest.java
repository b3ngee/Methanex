package com.ch3oh.portfolio.util;

import org.junit.Assert;
import org.junit.Test;

public class PasswordUtilTest {

    @Test
    public void testCheckPassword_validPassword() {
        String password = "asdf";
        String hashedPassword = PasswordUtil.hashPassword(password);

        Assert.assertTrue(PasswordUtil.checkPassword(password, hashedPassword));
    }

    @Test
    public void testCheckPassword_invalidPassword() {
        String password = "asdf";
        String hashedPassword = PasswordUtil.hashPassword(password);

        Assert.assertFalse(PasswordUtil.checkPassword("incorrect password", hashedPassword));
    }

    @Test
    public void testCheckPassword_caseSensitive() {
        String password = "asdf";
        String hashedPassword = PasswordUtil.hashPassword(password);

        Assert.assertFalse(PasswordUtil.checkPassword("ASDF", hashedPassword));
    }
}
