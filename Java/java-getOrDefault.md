# getOrDefault

```java
HashMap<String, Integer> frequencies = new HashMap<String, Integer>();

for (String word : text) {
    if (!frequencies.containsKey(word)) {
        frequencies.put(word, 0);
    }
    frequencies.put(word, frequencies.get(word) + 1);
}
```

위의 방식을 getOrDefault()를 사용하여 한 줄로 표현할 수 있다.

```java
HashMap<String, Integer> frequencies = new HashMap<String, Integer>();

for (String word : text) {
    freq.put(word, frequencies.getOrDefault(value, 0) + 1);
}
```

## Ref

[Oracle - getOrDefault](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html#getOrDefault-java.lang.Object-V-)