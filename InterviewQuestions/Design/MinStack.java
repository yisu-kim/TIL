/**
 * Min Stack
 * https://leetcode.com/problems/min-stack/
 */

/**
 * O(1) time complexity
 * O(n) time complexity
 */

class MinStack {

    private Stack<Integer> min;
    private Stack<Integer> stack;
    
    /** initialize your data structure here. */
    public MinStack() {
        stack = new Stack<Integer>();
        min = new Stack<Integer>();
    }
    
    public void push(int x) {
        stack.push(x);
        if (min.isEmpty()) {
            min.push(x);
        } else if (min.peek() >= x) {
            min.push(x);
        }
    }
    
    public void pop() {
        int popped = stack.pop();
        if (popped == min.peek()) {
            min.pop();
        }
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return min.peek();
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */