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

// O(|V|) time complexity
// O(|V|) space complexity
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

    // In-order traversal solution with stack
    // code by https://leetcode.com/problems/validate-binary-search-tree/discuss/32112/Learn-one-iterative-inorder-traversal-apply-it-to-multiple-tree-questions-(Java-Solution)
    public boolean isValidBSTInOrderSearch(TreeNode root) {
        if (root == null) {
            return true;
        }
        Stack<TreeNode> stack = new Stack<TreeNode>();
        TreeNode pre = null;
        while (root != null || !stack.isEmpty()) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            if (pre != null && root.val <= pre.val) {
                return false;
            }
            pre = root;
            root = root.right;
        }
        return true;
    }
}