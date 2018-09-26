// Maximum Depth of Binary Tree
// https://leetcode.com/problems/maximum-depth-of-binary-tree/

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

// O(E) = O(V) complexity
// E: edge, V: node, E = V - 1
class Solution {
    // Recursive solution
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }

    // DFS solution with stack
    public int maxDepthDFS(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int maxDepth = 0;
        Stack<TreeNode> nodeStack = new Stack<TreeNode>();
        Stack<Integer> depthStack = new Stack<Integer>();
        nodeStack.push(root);
        depthStack.push(1);
        while (!nodeStack.isEmpty()) {
            TreeNode node = nodeStack.pop();
            int tempDepth = depthStack.pop();
            maxDepth = Math.max(tempDepth, maxDepth);
            if (node.right != null) {
                nodeStack.push(node.right);
                depthStack.push(tempDepth+1);
            }
            if (node.left != null) {
                nodeStack.push(node.left);
                depthStack.push(tempDepth+1);
            }
        }
        return maxDepth;
    }
}