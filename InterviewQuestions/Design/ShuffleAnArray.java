/**
 * Shuffle an Array
 * https://leetcode.com/problems/shuffle-an-array/
 */

/**
 * O(n) time complexity
 * O(n) space complexity
 */
class Solution {

    private int[] original;
    private int[] array;
    
    private void swap(int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    public Solution(int[] nums) {
        array = nums;
        original = nums.clone();
    }
    
    /** Resets the array to its original configuration and return it. */
    public int[] reset() {
        array = original.clone();
        return original;
    }
    
    /** Returns a random shuffling of the array. */
    public int[] shuffle() {
        Random rand = new Random();
        for (int i = 0; i < array.length; i++) {
            swap(i, rand.nextInt(array.length));
        }
        return array;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(nums);
 * int[] param_1 = obj.reset();
 * int[] param_2 = obj.shuffle();
 */