package com.ch3oh.portfolio.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
    public static SimpleDateFormat DATE_FORMATTER = new SimpleDateFormat("MM-dd-yyyy");

    public static String dateToString(Date date) {
        return DATE_FORMATTER.format(date);
    }

    public static Date stringToDate(String dateStr) throws ParseException {
        DATE_FORMATTER.setLenient(false);
        return DATE_FORMATTER.parse(dateStr);
    }
}
