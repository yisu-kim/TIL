
// Stdin and Stdout II
// https://www.hackerrank.com/challenges/java-stdin-stdout/problem

import java.util.Scanner;

public class StdinAndStdout2 {

    public static void main(String[] args) {
        // method 1
        // int i = scan.nextInt();
        // double d = scan.nextDouble();
        // scan.nextLine();
        // String s = scan.nextLine();

        // method 2
        Scanner scan = new Scanner(System.in);
        int i = Integer.parseInt(scan.nextLine());
        double d = Double.parseDouble(scan.nextLine());
        String s = scan.nextLine();

        System.out.println("String: " + s);
        System.out.println("Double: " + d);
        System.out.println("Int: " + i);

        scan.close();
    }
}