/**
 * Count Primes
 * https://leetcode.com/problems/count-primes/
 */

/**
 * code by https://leetcode.com/problems/count-primes/discuss/57593/12-ms-Java-solution-modified-from-the-hint-method-beats-99.95
 */

class Solution {
    public int countPrimes(int n) {
        if (n <= 2) {
            return 0;
        }
        int count = n / 2;
        boolean[] sieve = new boolean[n];
        for (int i = 3; i * i < n; i += 2) {
            if (sieve[i]) {
                continue;
            }
            for (int j = i * i; j < n; j += 2 * i) {
                if (!sieve[j]) {
                    count--;
                    sieve[j] = true;
                }
            }
        }
        return count;
    }
}