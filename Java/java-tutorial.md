# Java Tutorial



[TOC]

## 01 Hello World!

```java
public class HelloWorld {
    public static void main(String args[]) {
        System.out.println("Hello World!")
    }
}
```



## 02 자바 시작하기

### variable

```java
// right variable name
int a;
String first_name;

// wrong variable name
int 1st;
int a#;
int class;

// assignment
a = 1;
first_name = "Hong";
```



## 03 자료형

### Number

- integer

  | data type | bit  | range                                      |
  | --------- | ---- | ------------------------------------------ |
  | int       | 32   | -2147483648 ~ 2147483647                   |
  | long      | 64   | -9223372036854775808 ~ 9223372036854775807 |

  

  ```java
  int age = 10;
  long countOfStar = 8764827384923849L;
  ```

  

- real number

  ```java
  float pi = 3.14F;
  double morePi = 3.14159265358979323846;
  
  double d1 = 123.4;
  double d2 = 1.234e2;
  ```

  



- octal , hexadecimal

  ```java
  int octal = 023;	// 19
  int hex = 0xC;		// 12
  ```



- arithmetic operation 

  +, -, *, /, %, ++, --

  ```java
  int i = 0;
  System.out.println(i++);	// 0
  System.out.println(i);		// 1
  
  int j = 0;
  System.out.println(++j);	// 1
  System.out.println(j);		// 1
  ```

  

### boolean

```java
boolean isSuccess = true;
boolean isTest = false;

boolean a = 1 > 2;				// false
boolean b = 3 % 2 == 1;			// true
boolean c = "3".equals("2");	// false
```



### char

```java
char c1 = 'a';
char c2 = 97;		// a
char c3 = '\u0061';	// a
```



### String

```java
String s = "Happy Java";

// equals()
String a = "hello";
String b = new String("hello");
String c = "hello";
System.out.println(a.equals(c));	// true
System.out.println(a.equals(b));	// true

// indexOf()
System.out.println(s.indexOf("Java"));	// 6

// replaceAll()
System.out.println(s.replaceAll("Java", "World"));	// Hello World

// substring()
System.out.println(s.substring(0, 4));	// Hell

// toUpperCase()
System.out.println(s.toUpperCase());	// HELLO JAVA
```



### StringBuffer

String 자료형보다 무거워 메모리 사용량이 많고 속도가 느리다.

따라서, 문자열 추가 또는 변경 작업이 많은 경우에 사용하는 것이 유리하다.

```java
/*
String
+ 연산이 있을 때마다 새로운 객체 생성
*/
String temp = "";
temp += "hello";
temp += " ";
temp += "jump to java";
System.out.println(temp);	// hello jump to java

/*
StringBuffer
객체가 단 한번만 생성
*/
StringBuffer sb = new StringBuffer();

// append()
sb.append("hello");
sb.append(" ");
sb.append("jump to java");
System.out.println(sb.toString());	// hello jump to java

// insert()
StringBuffer sb2 = new StringButter();
sb.append("jump to java");
sb.insert(0, "hello ");
System.out.println(sb.toString());	// hello jump to java

// substring()
System.out.println(sb.substring(0, 4));	// hell
```



### Array

같은 자료형의 집합

```java
String[] weeks = new String[];	// error

String[] weeks2 = new String[7];
// assignment
weeks[0] = "월";

String[] weeks3 = {"월", "화", "수", "목", "금", "토", "일"};
// access
System.out.println(weeks3[3]);	// 목

// ArrayOutOfBoundException
System.out.println(weeks3[7]);	// 배열 길이 넘어감
```



### List

자료형의 개수가 가변할 때 사용한다.

List 인터페이스를 구현한 자료형에는 ArrayList, LinkedList 등이 있다.

- ArrayList

```java
ArrayList<String> pitches = new ArrayList<String>();
// add()
pitches.add("138");
pitches.add(1, "133");

// get()
System.out.println(pitches.get(1));	// 133

// size()
System.out.println(pitches.size());	// 2

// contains()
System.out.println(pitches.contains("142"));	// false

// remove()
System.out.println(pitches.remove("133"));	// true
System.out.println(pitches.remove(0));		// 138
```



### Generics

객체의 데이터 타입을 명시한다. 따라서 타입 체크와 형변환(casting)이 필요 없다는 장점이 있다.

기본 자료형인 <Integer>, <String> 말고도 <Animal> 등 사용자 정의 자료형도 사용할 수 있다.

```java
ArrayList<String> aList = new ArrayList<String>();
aList.add("hello");
aList.add("java");

String hello = aList.get(0);
String java = aList.get(1);
```



### Map

대응 관계를 쉽게 표현할 수 있게 해주는 인터페이스이다. Associative array, Hash라고도 불린다. dictionary 개념을 생각해 보면 쉽다.

List나 Array처럼 순차적으로 값을 구하지 않고 key를 통해 value를 얻는다.

Map 인터페이스를 구현한 자료형에는 HashMap, LinkedHashMap, TreeMap 등이 있다.

```java
HashMap<String, String> map = new HashMap<String, String>();
// put()
map.put("people", "사람");
map.put("baseball", "야구");

// get()
System.out.println(map.get("people"));	// 사람

// containsKey()
System.out.println(map.containsKey("people"));	// true

// remove()
System.out.println(map.remove("people"));	// 사람

// size()
System.out.println(map.size());		// 1
```



## 04 제어문

### if

```java
if (expression1) {
    <statement1>;
    <statement2>;
} else if (expression2) {
  	<statement3>;
    <statement4>;
} else {
    <statement5>;
    <statement6>;
}

// and(&&), or(||), not(!)
int money = 2000;
boolean hasCard = true;

if (money>=3000 || hasCard) {
    System.out.println("택시를 타고 가라");
} else {
    Sytem.out.println("걸어가라");
}

ArrayList<String> pocket = new ArrayList<String>();
pocket.add("handphone");
pocket.add("money");

// List 자료형의 메소드 contains()
if (pocket.contains("money")) {
    System.out.println("택시를 타고 가라");
} else if (hasCard) {
    System.out.println("택시를 타고 가라");
} else {
    System.out.println("걸어가라");
}
```



### switch/case

입력값이 정형화되어 있는 경우 if문보다 가독성이 좋다.

```java
switch (variable) {
    case value1:
        statement1;
        break;
    case value2:
        statement2;
        break;
    default:
        statement3;
        break;
}
```



### while

```java
while (expression) {
    <statement1>;
    <statement2>;
    <statement3>;
}

// eg.
int treeHit = 0;
while (treeHit < 10) {
    treeHit++;
    SYstem.out.println("나무를 " + treeHit + "번 찍었습니다.");
    if (treeHit == 10) {
        System.out.println("나무 넘어갑니다.");
    }
}

// Loop
while (true) {
    <statement1>;
    <statement2>;
}

// break
int coffe = 10;
int money = 300;

while (money > 0) {
    System.out.println("돈을 받았으니 커피를 줍니다.");
    coffee--;
    System.out.println("남은 커피의 양은 " + coffe + "입니다.");
    if (coffee == 0) {
        System.out.println("커피가 다 떨어졌습니다. 판매를 중지합니다.");
        break;
    }
}

// continue
int a = 0;
while (a < 10) {
    a++;
    if (a % 2 == 0) {
        continue;
    }
    System.out.println(a);
}
```



### for

```java
for (initialization; termination; increment) {
    statement;
}

// continue
int[] marks = {90, 25, 67, 45, 80};
for (int i = 0; i<marks.length; i++) {
    if (marks[i] < 60) {
        continue;
    }
    System.out.println((i+1) + "번 학생 축하합니다. 합격입니다.");
}

// 9*9
for (int i=2; i<10; i++) {
    for (int j=1; j<10; j++) {
        System.out.print(i*j + " ");
    }
    System.out.println("");
}
```



### for each

for 문과 달리 반복회수와 증가값이 고정되어 있다.

```java
for (type var: iterate) {
    body-of-loop
}

// eg.
ArrayList<String> numbers = new ArrayList<String>();
numbers.add("one");
numbers.add("two");
numbers.add("three");

// for
for (int i=0; i<numbers.size(); i++) {
    System.out.println(numbers.get(i));
}

// for each
for (String number: numbers) {
    System.out.println(number);
}
```





## Ref.

- [점프 투 자바](https://wikidocs.net/book/31)
