// String to Integer
// https://leetcode.com/problems/string-to-integer-atoi/

import java.util.regex.Pattern;
import java.util.regex.Matcher;

class Solution {
    public int myAtoi(String str) {
        String[] strArray = str.trim().split("\\+\\-0-9");
        String s = "";
        int result = 0;
        try {
            s = strArray[0];
        } catch (Exception e) {}
        if (s.isEmpty()) {
            return result;
        }
        int sign = 1;
        if (s.charAt(0) == '-') {
            sign = -1;
            s = s.substring(1, s.length());
        } else if (s.charAt(0) == '+') {
            sign = 1;
            s = s.substring(1, s.length());
        }
        String[] splited = s.split("[^0-9]");
        try {
            s = splited[0];
        } catch (ArrayIndexOutOfBoundsException e) {}
        String regex = "\\d+";
        if (s.matches(regex)) {
            Pattern p = Pattern.compile(regex);
            Matcher m = p.matcher(s);
            m.find();
            try {
                    result = Integer.parseInt(m.group());
                } catch (NumberFormatException e) {
                    if (sign == -1) {
                        result = Integer.MIN_VALUE;
                    } else {
                        result = Integer.MAX_VALUE;
                    }
                }
        }
        return sign * result;
    }
}