// Validate Binary Search Tree
// https://leetcode.com/problems/validate-binary-search-tree/

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

// O(|V|) = O(|E|) complexity
class Solution {
    public boolean isValidBST(TreeNode root) {
        long minValue = (long) Integer.MIN_VALUE - 1;
        long maxValue = (long) Integer.MAX_VALUE + 1;
        return isValidBST(minValue, root, maxValue);
    }
    
    public boolean isValidBST(long minValue, TreeNode root, long maxValue) {
        if (root == null) {
            return true;
        }
        if (root.val <= minValue || root.val >= maxValue) {
            return false;
        }
        return isValidBST(minValue, root.left, root.val) && isValidBST(root.val, root.right, maxValue);
    }
}