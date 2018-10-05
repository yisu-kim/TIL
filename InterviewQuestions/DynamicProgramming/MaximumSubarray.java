/**
 * Maximum Subarray
 * https://leetcode.com/problems/maximum-subarray/
 */

/**
 * O(n) time complexity
 * O(1) space complexity
 * 
 * kadane's algorithm with modification
 */

class Solution {
    public int maxSubArray(int[] nums) {
        int maxEndingHere = 0;
        int maxSoFar = nums[0];
        for (int i = 0; i < nums.length; i++) {
            if (maxEndingHere > 0) {
                maxEndingHere += nums[i];
            } else {
                maxEndingHere = nums[i];
            }
            if (maxSoFar < maxEndingHere) {
                maxSoFar = maxEndingHere;
            }
        }
        return maxSoFar;
    }
}