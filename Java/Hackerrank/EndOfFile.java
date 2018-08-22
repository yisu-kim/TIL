
// End-of-file
// https://www.hackerrank.com/challenges/java-end-of-file/problem

import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class EndOfFile {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int num = 0;
        while (sc.hasNext()) {
            num += 1;
            String s = sc.nextLine();
            System.out.printf("%d %s%n", num, s);
        }
        sc.close();
    }
}