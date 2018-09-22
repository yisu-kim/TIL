// 136. Single Number
// https://leetcode.com/problems/single-number/


// O(n) complexity
class Solution {

    public int singleNumber(int[] nums) {
        
        HashMap<Integer, Integer> numbers = new HashMap<Integer, Integer>();
        for (int n : nums) {
            if (!numbers.containsKey(n))
                numbers.put(n, numbers.getOrDefault(n, 0) + 1);
            else
                numbers.remove(n);
        }
        return numbers.keySet().iterator().next();
    }
}