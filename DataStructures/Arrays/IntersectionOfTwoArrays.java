// 350. Intersection of Two Arrays II
// https://leetcode.com/problems/intersection-of-two-arrays-ii

// O(n) complexity
class Solution {
    public HashMap<Integer, Integer> getFrequency(int[] nums) {
        HashMap<Integer, Integer> frequency = new HashMap<Integer, Integer>();
        for (int n : nums) {
            frequency.put(n, frequency.getOrDefault(n, 0) + 1);
        }
        return frequency;
    }
    
    public int[] checkIntersection(HashMap<Integer, Integer> freq, int[] nums) {
        List<Integer> answerList = new ArrayList<Integer>();
        for (int n : nums) {
            if (freq.getOrDefault(n, 0) > 0) {
                answerList.add(n);
                freq.put(n, freq.get(n) - 1);
            }
        }
        int[] answer = new int[answerList.size()];
        for (int i = 0; i < answer.length; i++) {
            answer[i] = answerList.get(i);
        }
        return answer;
    }
    public int[] intersect(int[] nums1, int[] nums2) {
        HashMap<Integer, Integer> nums1Freq = getFrequency(nums1);
        int[] answer = checkIntersection(nums1Freq, nums2);
        return answer;
    }
}