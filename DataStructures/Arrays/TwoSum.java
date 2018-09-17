// Two Sum
// https://leetcode.com/problems/two-sum/

// O(n^2) complexity
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] answer = new int[2];
        for (int i = 0; i < nums.length; i++) {
            for (int j = nums.length - 1; j > i; j--) {
                if (nums[i] + nums[j] == target) {
                    answer[0] = i;
                    answer[1] = j;
                    return answer;  // return new int[] { i, j };
                }
            }
        }
        return answer;  // throw new IllegalArgumentException("No two sum solution");
    }
}