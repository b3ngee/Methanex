package com.ch3oh.portfolio.util;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

public class DateUtilTest {

    @Test
    public void testStringToDate_validDate() throws ParseException {
        String validDateStr = "2018-01-01";

        Date date = DateUtil.stringToDate(validDateStr);
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        assertEquals(2018, localDate.getYear());
        assertEquals(1, localDate.getMonthValue());
        assertEquals(1, localDate.getDayOfMonth());
    }

    @Test (expected = ParseException.class)
    public void testStringToDate_invalidDate() throws ParseException {
        String invalidDateStr = "2018-31-31";
        DateUtil.stringToDate(invalidDateStr);
    }

    @Test (expected = ParseException.class)
    public void testStringToDate_invalidFormat() throws ParseException {
        String invalidDateStr = "01-01-2018";
        DateUtil.stringToDate(invalidDateStr);
    }
}
