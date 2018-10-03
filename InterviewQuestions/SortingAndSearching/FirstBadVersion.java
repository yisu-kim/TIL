/**
 * First Bad Version
 * https://leetcode.com/problems/first-bad-version/
 */ 

/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */

/**
 * O(log n) time complexity
 * O(1) space complexity
 */

public class Solution extends VersionControl {
    public int binarySearch(int[] versions) {
        while (versions[0] <= versions[1]) {
            int mid = versions[0] + (versions[1] - versions[0]) / 2;
            if (isBadVersion(mid)) {
                versions[1] = mid - 1;
            } else {
                versions[0] = mid + 1;
            }
        }
        return versions[0];
    }

    public int firstBadVersion(int n) {
        return binarySearch(new int[] {1, n});
    }
}