
// Minimum Swaps 2
// https://www.hackerrank.com/challenges/minimum-swaps-2/problem

import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class MinimumSwaps2 {

    /*
     * O(n) algorithm
     * 
     * http://snoopybox.co.kr/1789
     */
    static int minimumSwaps(int[] arr) {
        int swaps = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] >= i + 1)
                continue;
            int j = arr[i] - 1;
            // System.out.printf("%d, %d%n", j, i);

            int tmp = arr[j];
            arr[j] = arr[i];
            arr[i] = tmp;

            swaps++;
            i--;
        }
        return swaps;
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int n = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        int[] arr = new int[n];

        String[] arrItems = scanner.nextLine().split(" ");
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for (int i = 0; i < n; i++) {
            int arrItem = Integer.parseInt(arrItems[i]);
            arr[i] = arrItem;
        }

        int res = minimumSwaps(arr);

        bufferedWriter.write(String.valueOf(res));
        bufferedWriter.newLine();

        bufferedWriter.close();

        scanner.close();
    }
}
