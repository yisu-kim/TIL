# [Two Sum](https://leetcode.com/problems/two-sum/)

## Solution

### My solution

각 원소 x에 대해 target - x인 값이 있는지 찾기 위해 i번째 원소를 나머지 배열 n-i개의 원소와 비교하는 작업을 n번 반복한다.

* O(n^2) time complexity
* O(1) space complexity

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int[] answer = new int[2];
        for (int i = 0; i < nums.length; i++) {
            for (int j = nums.length - 1; j > i; j--) {
                if (nums[i] + nums[j] == target) {
                    answer[0] = i;
                    answer[1] = j;
                    return answer;
                }
            }
        }
        return answer;
    }
}
```

### Leetcode solution

#### Approach 2: Two-pass Hash Table

해시 테이블을 사용하여 각 원소의 인덱스를 매핑한다.

이제 배열을 돌면서 target - x의 값이 해시 테이블에 있는지 확인한다. 이때, 문제의 조건에 따라 같은 원소를 사용하지 않기 위해 인덱스가 일치하지 않는지 확인한다.

두 조건을 모두 만족하면 합이 target이 되는 각 원소의 인덱스를 반환한다.

* O(n) time complexity:
    n개의 요소가 있는 배열을 2번 순회한다.
* O(n) space complexity:
    n개의 요소를 저장하는 해시 테이블을 만들었다.

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        map.put(nums[i], i);
    }
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement) && map.get(complement) != i) {
            return new int[] { i, map.get(complement) };
        }
    }
    throw new IllegalArgumentException("No two sum solution");
}
```

#### Approach 3: One-pass Hash Table

문제의 조건을 살펴보면 합해서 target이 되는 원소 한 쌍이 반드시 존재한다. 따라서 해시 테이블을 만들면서 동시에 target - x가 테이블에 존재하는지 살핌으로써 배열을 1번만 돌아도 결과를 반환할 수 있다.

존재하지 않으면 해당 x값과 인덱스를 저장하고, 있으면 바로 각 원소의 인덱스를 반환한다.

* O(n) time complexity:
    n개의 요소가 있는 배열을 1번 순회한다.
* O(n) space complexity:
    n개의 요소를 저장하는 해시 테이블을 만들었다.

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    throw new IllegalArgumentException("No two sum solution");
}
```