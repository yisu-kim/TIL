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

- for each문에서 String 사용하기

  >문자열에 [toCharArray()](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#toCharArray--) 함수를 적용하여 문자 배열로 변환한다.
  >
  >이 문자 배열을 for each문으로 순회한다.

  ```java
  /**
   * Converts this string to a new character array.
   *
   * @return  a newly allocated character array whose length is the length
   *          of this string and whose contents are initialized to contain
   *          the character sequence represented by this string.
   */
  public char[] toCharArray() {
      // Cannot use Arrays.copyOf because of class initialization order issues
      char result[] = new char[value.length];
      System.arraycopy(value, 0, result, 0, value.length);
      return result;
  }
  ```

  ```java
  for (char ch: "문자열".toCharArray()) {
      System.out.println(ch);
  }
  ```




## 06 입출력

### 콘솔 입출력

- **InputStream** - byte

  Stream 형태의 데이터를 콘솔에서 입력받을 때 사용한다.

  Stream이란 이어져 있는 데이터의 형태를 의미한다. 예를 들어, 파일 데이터, HTTP 응답 데이터, 키보드 입력 등이 있다.

  `InputStream`의 `read()` 메소드는 1 byte만 입력받는다. 저장되는 값을 0-255 사이의 정수값으로 아스키 코드값이다.

  ```java
  import java.io.InputStream;
  // 1 byte
  public class StreamTest {
      public static void main(String[] args) throws Exception {
          InputStream in = System.in;
          
          int a;
          a = in.read();  // a
          
          System.out.println(a);  // 97
      }
  }
  ```

- **InputStreamReader** - character

  바이트 대신 문자로 입력 스트림을 읽을 때 사용한다. 객체를 생성할 때 `InputStream`의 객체가 필요하다.

  ```java
  import java.io.InputStream;
  import java.io.InputStreamReader;
  // 3 byte
  public class StreamTest {
      public static void main(String[] args) throws Exception {
          InputStream in = System.in;
          InputStreamReader reader = new InputStreamReader(in);
          
          byte[] a = new byte[3];
          in.read(a);  // abc
          
          for (byte b: a) {
              System.out.println(b);  // 97 98 99
          }
          
          char[] a1 = new char[3];
          reader.read(a1);  // abc
          
          for (String b1: a1) {
      		System.out.println(b1);  // abc
  		}
      }
  }
  ```

- **BufferedReader** - String

  고정된 길이가 아니라 사용자가 엔터키를 누를 때까지 입력을 받으려할 때 사용한다. 객체 생성시 생성자의 입력값으로 `InputStreamReader` 객체를 받아야 한다.

  ```java
  import java.io.BufferedReader;
  import java.io.InputStream;
  import java.io.InputStreamReader;
  
  public class StreamTest {
      public static void main(String[] args) throws Exception {
          InputStream in = System.in;
          InputStreamReader reader = new InputStreamReader(in);
          BufferedReader br = new BufferedReader(reader);
          
          String a = br.readLine();  // HelloWorld
          System.out.println(a);  // HelloWorld
      }
  }
  ```


> J2SE 5.0 부터 `java.util.Scanner`라는 내장클래스가 새로 추가되었다. 이 클래스를 이용하면 콘솔입력을 쉽게 처리할 수 있다.

- Scanner

  생성자의 입력으로 콘솔입력인 `InputStream`이 필요하다. 객체 선언 후 `next()` 메소드로 단어 하나(Token)를 읽어들인다. 그 밖에 라인을 입력받는 `nextLine()` 메소드, 정수를 입력받는 `nextInt()` 메소드 등이 있다.

  ```java
  import java.util.Scanner;
  
  public class ScannerTest {
      public static void main(String[] args) {
      	Scanner sc = new Scanner(System.in);
          system.out.println(sc.next());
  	}
  }
  ```


콘솔 출력의 경우 `System.out.println()`을 주로 사용한다. 이는 `PrintStream` 클래스에 속하는 객체로 문자열을 출력하거나 디버깅 시 주로 사용된다.



### 파일 입출력

모니터 화면뿐만 아니라 파일로도 결과값을 출력할 수 있다.

- **FileOutputStream** - byte

  `OutputStream` 클래스를 상속받는 클래스로 바이트 단위로 데이터를 처리한다.

  이 클래스의 객체를 생성하면 파일이 생성된다. 이때 생성자의 입력으로 파일명을 전달해야 한다.

  `write()` 메소드를 사용하여 파일에 내용을 쓸 수 있다. 문자열을 쓸 경우 byte 배열로 바꿔줘야 하므로 `getBytes()` 메소드를 사용한다.

  사용한 파일 객체를 닫으려면 `close()` 메소드를 사용한다.

  ```java
  import java.io.FileOutputStream;
  import java.io.IOException;
  
  public class FileWrite {
      public static void main(String[] args) throws IOException {
      	FileOutputStream output = new FileOutputStream("c:/out.txt");
          for (int i = 1; i < 11; i++) {
              String data = i + "번째 줄입니다.\r\n";
              output.write(data.getBytes());
          }
          output.close();
      }
  }
  ```

  윈도우의 경우 `\r\n`을 사용하여 줄바꿈이 가능하다. 유닉스인 경우에는 `\n`만 사용하면 된다.

- **FileWriter** - String

  byte배열 대신 문자열을 직접 쓸 때 사용한다.

  ```java
  import java.io.FileWriter;
  import java.io.IOException;
  
  public class FileWrite {
      public static void main(String[] args) throws IOException {
          FileWriter fw = new FileWriter("c:/out.txt");
          for (int i = 1; i < 11; i++) {
              String data = i + "번째 줄입니다.\r\n";
              fw.write(data);
          }
          fw.close();
      }
  }
  ```

- **PrintWriter** - println()

  문자열을 쓸 때 줄바꿈을 위해 `\r\n`을 사용하는 대신 `println()` 메소드를 사용할 수 있다.

  ```java
  import java.io.PrintWriter;
  import java.io.IOException;
  
  public class FileWrite {
      public static void main(String[] args) throws IOException {
          PrintWriter pw = new PrintWriter("c:/out.txt");
          for (int i = 1; i < 11; i++) {
              String data = i + "번째 줄입니다.";
              pw.println(data);
          }
          pw.close();
      }
  }
  ```


기존에 존재하는 파일에 내용을 추가하려면 파일을 추가모드로 열어야 한다.

- **FileWriter**

  ```java
  new FileWriter(file_name, append_mode);
  ```

  ```java
  import java.io.FileWriter;
  import java.io.IOException;
  
  public class FileWrite {
      public static void main(String[] args) throws IOException {
          FileWriter fw = new FileWriter("c:/out.txt", true);
          for (int i = 11; i < 21; i++) {
              String data = i + "번째 줄입니다.\r\n";
              fw.write(data);
          }
          fw.close();
      }
  }
  ```

- **PrintWriter**

  생성자의 입력으로 추가모드로 설정한 `FileWriter`의 객체를 사용해야 한다.

  ```java
  import java.io.FileWriter;
  import java.io.IOException;
  import java.io.PrintWriter;
  
  public class FileWrite {
      public static void main(String[] args) throws IOException {
          FileWriter fw = new FileWriter("c:/out.txt", true);
          PrintWriter pw = new PrintWriter(fw);
          for (int i = 11; i < 21; i++) {
              String data = i + "번째 줄입니다.";
              pw.println(data);
          }
          pw.close();
      }
  }
  ```


마찬가지로 사용자 입력이 아닌 파일로도 입력값을 받을 수 있다.

- **FileInputStream** - byte

  해당 클래스를 이용하면 byte 단위로 파일을 읽을 수 있다. 이 경우 파일 내용의 크기를 정확히 모르면 사용하기에 불편하다.

  ```java
  import java.io.FileInputStream;
  import java.io.IOException;
  
  public class FileRead {
      public static void main(String[] args) throws IOException {
          byte[] b = new byte[1024];
          FileInputStream input = new FileInputStream("c:/in.txt");
          input.read(b);
          System.out.println(new String(b));
          input.close();
      }
  }
  ```

- **FileReader**, **BuffredReader** - line

  파일을 라인 단위로 받을 때 사용한다.

  `readLine()` 메소드는 파일에 끝에 도달하여 더이상 읽을 라인이 없을 경우 null을 리턴한다. 이를 이용하여 루프의 종료조건으로 사용한다.

  ```java
  import java.io.BufferedReader;
  import java.io.FileReader;
  import java.io.IOException;
  
  public class FileRead {
      public static void main(String[] args) throws IOException {
          FileReader fr = new FileReader("c:/in.txt");
          BufferedReader br = new BufferedReader(fr);
          while (true) {
              String line = br.readLine();
              if (line == null) break;
              System.out.println(line);
          }
          fr.close();
          br.close();
      }
  }
  ```




## Ref.

- [점프 투 자바](https://wikidocs.net/book/31)
