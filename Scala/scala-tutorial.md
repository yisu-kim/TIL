# Scala
���̺긮�� �Լ��� ���α׷��� ���

- ��ü����
- �Լ��� ���
- ���� Ÿ��
- JVM
- Java �ڵ� ���� ���� (������ ������ ��)
- ���� ó�� �� ����ȭ ó��



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
1. JDK 1.8 ��ġ 
    http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
2. Eclipse Oxygen ��ġ
    https://www.eclipse.org/downloads/packages/release/Oxygen/3A
3. Scala ��ġ 
    https://www.scala-lang.org/download/
4. Scala IDE ��ġ
    http://scala-ide.org/download/current.html
    �� ����Ʈ���� Ecplipse 4.7 (Oxygen) Update site installation�� �ּҸ� �����Ѵ�.
    ��Ŭ������ ���� �޴��� Help - Install New Software�� Ŭ���Ѵ�.
    Work with �׸� ������ �ּҸ� �Է��Ѵ�.
    http://download.scala-ide.org/sdk/lithium/e47/scala212/stable/site
    Select All�� �����Ͽ� ��ġ�� �Ϸ��Ѵ�.



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
> ������ Ÿ�԰� �ʱ�ȭ �� ���� ����

```scala
var �Ǵ� val ���� : ������ Ÿ�� = �ʱ�ȭ ��
```

e.g.

```scala
var myVar : String = "Hello World!"
val myVar1 : Int
var myVar2 = "Scala"
val myVar3 = 30
```



## Class vs. Object
- Class�� ��üȭ�� �Ŀ� ������ ��ü�� ����� �� �ִ�.
- Object�� �ٷ� �ش� ��ü�� ����� �� �ִ�.

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
  ����� ���ǰ� ���Ե� Ŭ���� �Ǵ� ��ü ���ο����� ���� ����
- Protected Members
  ����� ���ǵ� Ŭ������ ���� Ŭ���������� ���� ����
- Pulbic Members
  ��� ���� ����. ���� �� �⺻��.




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
      
    var r = add(1)(2)
    println(r)

    var r2 = add(1)_
    var r3 = r2(2)
    println(r3)
  }

  def checkvalue(a: Any): Any = a match {
    case 1 => println("1")
    case "One" => println("One")
    case "Two" => println("Two")
    case _ => println("Nothing")
  }
  
  def add(a: Int)(b: Int) = {
    a + b
  }
}
```



## Companion

```scala
// Companion Class
// static �ƴ�. ��üȭ �ʿ�
class Test1 {
  def testMethod() { println("companion class") }
}

// Companion Object
// static. ��üȭ ���ʿ�
object Test1 {
  def main(args: Array[String]) {
    testMethod()
    new Test1().testMethod()
  }
  def testMethod() { println("companion object") }
}
```


## Lambda Expression

anonymous function�̶�� �Ѵ�.

```scala
// general function
func(a: Int, b: Int): Int = {
    return a + b
}
// anonymous function
(a: Int, b: Int) => a + b
```

e.g.

```scala
object Test {
  def main(args: Array[String]) {
    func1(20, multiply)

    var t = (x: Int) => x + 1
    var t2 = (x: Int, y: Int) => x * y
    var t3 = (_: Int) + (_: Int)  // _(underscore): wildcard
    println(t(1))
    println(t2(1, 2))
    println(t3(1, 2))
  }
  def func1(a: Int, f: Int => AnyVal): Unit = {
    println(f(a))
  }
  def multiply(a: Int): Int = {
    a * 2
  }
}
```



## Constructor

```scala
class Employee(name: String, age: Int) { // primary constructors
  var nm = name
  var ag = age
  var id = 0
  def getEmpInfo() {
    println("name: " + nm + ", age: " + ag)
  }
  def this(name: String, age: Int, id: Int) {
    this(name, age)
    this.id = id
  }
}

object Test {
  def main(args: Array[String]) {
    var e = new Employee("Tom", 20)
    e.getEmpInfo()
  }
}
```



## Overloading

�Լ��� �̸��� ������ �Ķ������ Ÿ�԰� ������ �ٸ��� �����Ѵ�.

```scala
class Calc {
  def add(a: Int, b: Int): Int = {
    return a + b
  }
  def add(a: Int, b: Int, c: Int): Int = {
    return a + b + c
  }
}

object Test {
  def main(args: Array[String]) {
    var o = new Calc()
    o.add(1, 2)
    o.add(1, 2, 3)
  }
}
```



## Inheritance

Scala������ ������ ���� ������ ����� �����ϴ�.

- Single
- Multilevel
- Hierarchical
- Multiple
- Hybrid

```scala
class Student {
  var name: String = "Hong Gil Dong"
}

class HighStudent extends Student {  // extends keyword
  var location: String = "Seoul"
  println("name = " + name)  // Parent class variable
  println("location = " + location)
}

object Test {
  def main(args: Array[String]) {
    new HighStudent()
  }
}
```



## Overriding

�θ� Ŭ������ �Լ��� �������Ѵ�.

```scala
class Animal {
  def breath() { println("Animal is breathing") }
}

class Cat extends Animal {
  // override keyword
  override def breath() { println("Cat is breathing") }
}

object Test {
  def main(args: Array[String]) {
    var c = new Cat()
    c.breath()  // Cat is breathing
  }
}
```

