
// Two Strings
// https://www.hackerrank.com/challenges/two-strings/problem

import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;

public class TwoStrings {

    /*
     * O(n) complexity
     */
    static HashMap<Character, Integer> getCharacterFrequency(String word) {
        HashMap<Character, Integer> frequencies = new HashMap<Character, Integer>();
        for (char ch : word.toCharArray()) {
            if (!frequencies.containsKey(ch)) {
                frequencies.put(ch, 0);
            }
            frequencies.put(ch, frequencies.get(ch) + 1);
        }
        return frequencies;
    }

    static boolean hasEnoughCharacters(HashMap<Character, Integer> s1Freq, HashMap<Character, Integer> s2Freq) {
        for (Map.Entry<Character, Integer> entry : s2Freq.entrySet()) {
            char ch = entry.getKey();
            if (s1Freq.containsKey(ch)) {
                return true;
            }
        }
        return false;
    }

    static String twoStrings(String s1, String s2) {
        HashMap<Character, Integer> s1Freq = getCharacterFrequency(s1);
        HashMap<Character, Integer> s2Freq = getCharacterFrequency(s2);

        if (hasEnoughCharacters(s1Freq, s2Freq))
            return "YES";
        else
            return "NO";
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int q = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for (int qItr = 0; qItr < q; qItr++) {
            String s1 = scanner.nextLine();

            String s2 = scanner.nextLine();

            String result = twoStrings(s1, s2);

            bufferedWriter.write(result);
            bufferedWriter.newLine();
        }

        bufferedWriter.close();

        scanner.close();
    }
}
