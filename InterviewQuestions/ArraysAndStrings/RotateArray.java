// 189. Rotate Array
// https://leetcode.com/problems/rotate-array/

// O(n) time complexity, O(n) space complexity
class Solution {
    public void rotate(int[] nums, int k) {
        k = k % nums.length;
        int[] rotated = new int[nums.length];
        System.arraycopy(nums, nums.length - k, rotated, 0, k);
        System.arraycopy(nums, 0, rotated, k, nums.length - k);
        System.arraycopy(rotated, 0, nums, 0, rotated.length);
    }
}