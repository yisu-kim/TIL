# Scala
하이브리드 함수형 프로그래밍 언어

- 객체지향
- 함수형 언어
- 정적 타입
- JVM
- Java 코드 실행 가능 (동일한 컴파일 모델)
- 동시 처리 및 동기화 처리



## Java vs. Scala
- All types are objects
- Type inference
- Nested Functions
- Functions are objects
- Domain specific language (DSL) support
- Traits
- Closures
- Concurrency support inspired by Erlang



## Installation
1. JDK 1.8 설치 
  http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
2. Eclipse Oxygen 설치
  https://www.eclipse.org/downloads/packages/release/Oxygen/3A
3. Scala 설치 
  https://www.scala-lang.org/download/
4. Scala IDE 설치
  http://scala-ide.org/download/current.html
  위 사이트에서 Ecplipse 4.7 (Oxygen) Update site installation의 주소를 복사한다.
  이클립스를 열어 메뉴의 Help - Install New Software를 클릭한다.
  Work with 항목에 복사한 주소를 입력한다.
  http://download.scala-ide.org/sdk/lithium/e47/scala212/stable/site
  Select All을 선택하여 설치를 완료한다.



## Mode

- Interactive mode
```scala
scala> 3+4
res0: Int = 7
scala> res0 + 5
res1: Int = 12

scala> var test1 = 1
test1: Int = 1
scala> val test2 = 2
test2: Int = 2
scala> test1 = test1 + 11
test1: Int = 12
scala> test1 += 10

scala> ()

// quit
scala> :q
```
- Script mode
```scala
// create ScalaHelloWorld.scala
object ScalaHelloWorld {
  def main(args: Array[String]) {
    println("Hello world Scala")
  }
}
```


# compile

```shell
scalac ScalaHelloWorld.scala
# result files
ScalaHelloWorld$.class
ScalaHelloWorld.class
ScalaHelloWorld.scala
```



# execute
```shell
scala ScalaHelloWorld
# out
Hello world Scala
```



## Core Component
- Object
  States & behaviors
- Class
  Template & blueprint
- Methods
  Behavior
- Fields
  Unique set of instance variables
- Clouse
  Function
- Traits
  Encapsulates method & field definitions



## Identifiers
- Alphanumeric Identifiers
- Operator Identifiers
- Mixed Identifiers
- Literal Identifiers



## Comment
- /**/
- //



## Data type
- Byte, Short, Int, Long, Flost, Double
- Char, String
- Boolean
- Unit, Null, Nothing
- Any, AnyRef



## Variable
- var (mutable)
- val (immutable)
> 데이터 타입과 초기화 값 생략 가능

```scala
var 또는 val 변수 : 데이터 타입 = 초기화 값
```

e.g.

```scala
var myVar : String = "Hello World!"
val myVar1 : Int
var myVar2 = "Scala"
val myVar3 = 30
```



## Class vs. Object
- Class는 객체화한 후에 생성된 객체를 사용할 수 있다.
- Object는 바로 해당 객체를 사용할 수 있다.

```scala
// TestClass.scala
class TestClass {
  def add(a: Int, b: Int): Int = {
    var c: Int = 0
    c = a + b
    return c
  }
}

// TestObject.scala
object TestObject {
  def main(args: Array[String]) {
    // objectification
    var o = new TestClass()
    val c: Int = o.add(1, 2)
    println(c)
  }
}
```


## Access Modifiers

- Private Members
  멤버의 정의가 포함된 클래스 또는 객체 내부에서만 접근 가능
- Protected Members
  멤버가 정의된 클래스의 하위 클래스에서만 접근 가능
- Pulbic Members
  모두 접근 가능. 생략 시 기본값.




## Hello World
```scala
object HelloWorld {
  def main(args: Array[String]) {
    println("Hello World")
  }
}
```


## If else

```scala
object Test {
  def main(args: Array[String]) {
    var num: Int = 10
    if (num % 2 ==0) {
      println("Even")
    } else {
      println("Odd")
    }

    var num2: Int = 50
    if (num2 >= 0 && num2 < 50) {
      println("F")
    } else if (num2 >= 50 && num2 < 60) {
      println("D")
    }
    
    var r = check(-1)
    println(r)
  }
  def check(a: Int) = if (a >= 0) 1 else -1
}
```


## Loop

- while

```scala
object Test {
  def main(args: Array[String]) {
    var i = 10
    while (i < 30) {
      println("Value of i: " + i)  // 1 2 3 ... 29
      i = i + 1
    }    
    do {
      println(i)  // 1 2 3 ... 299 300
      i = i + 1
    } while (i < 300)
  }
}
```

- for

```scala
object Test {
  def main(args: Array[String]) {
    for (a <- 1 to 10) {
      println(a)  // 1 2 3 4 5 6 7 8 9 10
    }
    for (a <- 1 to 10 by 2) {
      println(a)  // 1 3 5 7 9
    }
    for (a1 <- 1 to 10 if a1 % 2 == 0) {
      println(a1)  // 2 4 6 8 10
    }
    var list = List(1, 2, 3, 4, 5, 6)
    for (i <- list) {
      println(i)  // 1 2 3 4 5 6
    }
  }
}
```

- infinite loop

```scala
object Test {
  var a = 10

  while (true) {
    println("Value of a: " + a)
  }
}
```



## Function

```scala
object Test {
  def main(args: Array[String]) {
    var r = test()  // test
    println(r)  // ()
      
    var r2 = test2()  // test
    println(r2)  // 100
  }
  def test() { println("test") }
  def test2() = {
    var a = 100
    a
  }
}
```



## Match - Case

```scala
object Test {
  def main(args: Array[String]) {
    var a = 10
    a match {
      case 10 => println("10")
      case 20 => println("20")
      case _ => println("Nothing")
    }
    checkvalue("One")
  }

  def checkvalue(a: Any): Any = a match {
    case 1 => println("1")
    case "One" => println("One")
    case "Two" => println("Two")
    case _ => println("Nothing")
  }
}
```



## Companion

```scala
// Companion Class
// static 아님. 객체화 필요
class Test1 {
  def testMethod() { println("companion class") }
}

// Companion Object
// static. 객체화 불필요
object Test1 {
  def main(args: Array[String]) {
    testMethod()
    new Test1().testMethod()
  }
  def testMethod() { println("companion object") }
}
```