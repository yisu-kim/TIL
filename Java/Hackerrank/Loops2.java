
// Loops II
// https://www.hackerrank.com/challenges/java-loops/problem

import java.util.*;
import java.io.*;

public class Loops2 {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int t = in.nextInt();
        for (int i = 0; i < t; i++) {
            int a = in.nextInt();
            int b = in.nextInt();
            int n = in.nextInt();

            int s = a;
            int p = 1;
            for (int j = 0; j < n; j++) {
                s += p * b;
                p *= 2;
                System.out.printf("%d ", s);
            }
            System.out.println();
        }
        in.close();
    }
}