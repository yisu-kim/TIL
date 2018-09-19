// 387. First Unique Character in a String
// https://leetcode.com/problems/first-unique-character-in-a-string/

// O(n) complexity
class Solution {
    public int firstUniqChar(String s) {
        char[] arr = s.toCharArray();
        HashMap<Character, Integer> charFreq = new HashMap<Character, Integer>();
        for (char c : arr) {
            charFreq.put(c, charFreq.getOrDefault(c, 0) + 1);
        }
        for (int i = 0; i < arr.length; i++) {
            if (charFreq.get(arr[i]) < 2) {
                return i;
            }
        }
        return -1;
    }
}