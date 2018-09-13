
// Sherlock and Anagrams
// https://www.hackerrank.com/challenges/sherlock-and-anagrams/problem

import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

/*
 * O(n^2) complexity
 */

public class SherlockAndAnagrams {

    static String sortedSubString(String s, int start, int end) {
        String sub = s.substring(start, end);
        char[] arr = sub.toCharArray();
        Arrays.sort(arr);
        String sorted = String.valueOf(arr);
        return sorted;
    }

    static int getSubStringFreq(String s, HashMap<String, Integer> freq) {
        if (!freq.containsKey(s)) {
            freq.put(s, 0);
            return 0;
        }
        freq.put(s, freq.get(s) + 1);
        return freq.get(s);
    }

    static int sherlockAndAnagrams(String s) {
        int count = 0;
        int n = s.length();
        HashMap<String, Integer> frequencies = new HashMap<String, Integer>();
        for (int i = 1; i < n; i++) {
            int subCount = 0;
            for (int j = 0; j < n - i + 1; j++) {
                String sorted = sortedSubString(s, j, j + i);
                subCount += getSubStringFreq(sorted, frequencies);
            }
            count += subCount;
        }
        return count;
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int q = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for (int qItr = 0; qItr < q; qItr++) {
            String s = scanner.nextLine();

            int result = sherlockAndAnagrams(s);

            bufferedWriter.write(String.valueOf(result));
            bufferedWriter.newLine();
        }

        bufferedWriter.close();

        scanner.close();
    }
}