package com.ch3oh.portfolio.util;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class PasswordUtilTest {

    @Test
    public void testCheckPassword_validPassword() {
        String password = "asdf";
        String hashedPassword = PasswordUtil.hashPassword(password);

        assertTrue(PasswordUtil.checkPassword(password, hashedPassword));
    }

    @Test
    public void testCheckPassword_invalidPassword() {
        String password = "asdf";
        String hashedPassword = PasswordUtil.hashPassword(password);

        assertFalse(PasswordUtil.checkPassword("incorrect password", hashedPassword));
    }

    @Test
    public void testCheckPassword_caseSensitive() {
        String password = "asdf";
        String hashedPassword = PasswordUtil.hashPassword(password);

        assertFalse(PasswordUtil.checkPassword("ASDF", hashedPassword));
    }
}
