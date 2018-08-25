// Date and Time
// https://www.hackerrank.com/challenges/java-date-and-time/problem

import java.util.Scanner;
import java.util.Calendar;
import java.util.Locale;

public class DateAndTime {

	public static String getDay(String d, String m, String y) {
        int day = Integer.parseInt(d);
        int month = Integer.parseInt(m);
        int year = Integer.parseInt(y);

        Calendar cal = Calendar.getInstance();
        cal.set(year, month - 1, day);  // month: 0 ~ 11
         
        String dayLongName = cal.getDisplayName(Calendar.DAY_OF_WEEK, Calendar.LONG, Locale.getDefault());

        return dayLongName.toUpperCase();
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String month = in.next();
        String day = in.next();
        String year = in.next();
        in.close();
        System.out.println(getDay(day, month, year));
    }
}