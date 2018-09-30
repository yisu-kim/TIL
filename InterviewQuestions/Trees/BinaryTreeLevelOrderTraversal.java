// Binary TRee Level Order Traversal
// https://leetcode.com/problems/binary-tree-level-order-traversal/

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

/**
 * O(|V|) time complexity
 * O(|V|) space complexity
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> answer = new ArrayList<List<Integer>>();
        if (root == null) {
            return answer;
        }
        Queue<TreeNode> nodeQueue = new LinkedList<TreeNode>();
        nodeQueue.offer(root);
        while (!nodeQueue.isEmpty()) {
            List<Integer> sameLevelNode = new ArrayList<Integer>();
            int size = nodeQueue.size();
            while (size-- > 0) {
                TreeNode node = nodeQueue.poll();
                sameLevelNode.add(node.val);
                if (node.left != null) {
                    nodeQueue.offer(node.left);
                }
                if (node.right != null) {
                    nodeQueue.offer(node.right);
                }
            }
            answer.add(sameLevelNode);
        }
        return answer;
    }
}