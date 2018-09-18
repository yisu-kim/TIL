// 344. Reverse String
// https://leetcode.com/problems/reverse-string/

// O(n) complexity
class Solution {
    public String reverseString(String s) {
        char[] result = s.toCharArray();
        char temp;
        for (int i = 0, j = s.length() - 1; i < j; i++, j--) {
            temp = result[i];
            result[i] = result[j];
            result[j] = temp;
        }
        String answer = new String(result);
        return answer;
    }
}