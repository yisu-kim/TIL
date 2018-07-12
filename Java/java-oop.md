Java OOP

## Class

- 클래스(class): 과자틀
- 객체(object): 과자틀에서 만들어낸 과자들
- 객체 변수(instance variable): 클래스에 선언된 변수. 인스턴스 변수, 멤버 변수, 속성이라고도 한다. 도트연산자(.)를 이용하여 접근할 수 있다.
  - 객체 변수의 값은 독립적으로 유지된다.
- 메소드(method): 클래스 내에 구현된 함수. 마찬가지로 도트연산자(.)로 접근한다.
  - `this`: 객체 자신을 참조하는 키워드. 메소드 내에서 사용한다.

```java
// class declaration
public class Animal {
    // instance variable declaration
    String name;  // value=null
    
    // method implementation
    public void setName(String name) {
        this.name = name;
    }
    
    public static void main(String[] args) {
        // create instance
        Animal cat = new Animal();
        Animal dog = new Animal();
        // call Mathod
        cat.setName("boby");
        dog.setName("happy");
        // access instance variable
        System.out.println(cat.name);  // boby
        System.out.println(dog.name);  // happy
    }
}
```



## Method

자바는 클래스를 떠나 존재하는 것이 있을 수 없으므로 클래스 내의 함수를 메소드라고 부른다.

본 문서에서는 메소드 내에 선언되는 변수의 효력 범위를 중심으로 살펴본다.



로컬 변수의 경우 primitive type을 넘겨 받고, 객체 변수의 경우 reference type을 전달 받는다. 이를 통해 변수의 효력 범위를 알 수 있다.

메소드 내에서 사용되는 로컬 변수는 메소드 내에서만 쓰여지는 변수이고 외부에는 영향을 미치지 않는다.

메소드에 객체 변수가 전달될 경우에는 메소드 수행 이후에도 객체의 변경된 속성값이 적용된다. 아래 코드의 경우 `myTest.vartest(myTest)`라고 전달하지 않아도 `this` 키워드를 통해 접근할 수 있으므로 파라미터 입력이 생략되었다.

- 로컬 변수(local variable)

```java
class Test {
    public void vartest(int a) {
        // local variable
        a++;
    }
    
    public static void main(String[] args) {
        int a = 1;
        Test myTest = new Test();
        myTest.vartest(a);
        System.out.println(a);  // 1
    }
}
```

- 객체 변수(instance variable)

```java
class Test {
    // instance variable
    int a;
    
    public void vartest() {
        this.a++;
    }
    
    public static void main(String[] args) {
        Test myTest = new Test();
        myTest.a = 1;
        myTest.vartest();
        System.out.println(myTest.a);  // 2
    }
    
}
```



## Inheritance

상속 관계는 다른 표현으로 'IS-A' 관계라고도 한다. 아래 예시와 같이 Dog 클래스가 Animal 클래스를 상속받은 것을 "Dog is a Animal"이라고 표현할 수 있다.

클래스 상속을 위해서 `extends`라는 키워드를 사용한다. 클래스 간에 상속관계가 이루어지면 자식 클래스는 부모 클래스의 모든 것(객체 변수, 메소드 등)을 물려받는다. 이렇게 코드를 공유함으로써 부모 클래스의 변화가 모든 자식 클래스에 영향을 미친다.

자바에서는 클래스의 다중 상속은 지원하지 않는다.

```java
public class Animal {
    String name;
    
    public void setName(String name) {
        this.name = name;
    }
}
```

```java
public class Dog extends Animal {
    // add sleep method
    public void sleep() {
        System.out.println(this.name + " zzz")
    }
}
```

자식 객체는 자기 클래스의 자료형뿐만 아니라 부모 클래스의 자료형에 담을 수 있다. 반대의 경우는 성립하지 않는다.

```java
Dog dog = new Dog();
Animal dog = new Dog();
```



### 메소드 오버라이딩 (Method overriding)

부모 클래스의 메소드를 자식 클래스가 동일한 형태(같은 이름, 같은 매개변수 형태)로 재정의하는 것을 의미한다. 즉, 기능을 덮어쓴다.

```java
public class HouseDog extends Dog {
    @overriding
    public void sleep() {
        System.out.println(this.name + " zzz in house")
    }
}
```

```java
// Main class
public static void main(String[] args) {
    Dog dog = new Dog();
    dog.setName("happy");
    dog.sleep();  // happy zzz
    
    HouseDog houseDog = new HouseDog();
    houseDog.setName("poppy");
    houseDog.sleep();  // poppy zzz in house
}
```



### 메소드 오버로딩 (Method overloading)

입력 받는 매개변수 형태는 달라도 동일한 이름을 가진 메소드를 생성하는 것을 의미한다. 다양한 유형의 호출을 용이하게 한다.

```java
// HouseDog class
public class HouseDog extends Dog {
    ...
	public void sleep(int hour) {
    	System.out.println(this.name + " zzz in house for " + hour + " hours");
	}
}
```

```java
// Main class
public static void main(String[] args) {
    ...
    houseDog.sleep();  // poppy zzz in house
    houseDog.sleep(3);  // poppy zzz in house for 3 hours
}
```



## Constructor

생성자는 `new`라는 키워드로 객체가 생성될 때 호출된다. 이를 통해 객체 생성 시 매개변수를 지정할 수 있다.

기본적으로 매개변수가 없고 내용이 없는 default 생성자가 자동으로 생성된다 . 사용자는 다음과 같은 규칙에 따라 생성자를 만들 수 있다.

- 생성자 메소드명과 클래스명이 동일하다.
- 생성자는 리턴타입을 정의하지 않는다.

메소드 오버로딩과 마찬가지로 생성자 오버로딩을 통해 매개변수가 다른 여러 생성자를 만들 수 있다.

```java
// HouseDog class
public class HouseDog extends Dog {
    public HouseDog(String name) {
        this.setName(name);
    }
    
    public HouseDog(int type) {
        if (type == 1) {
            this.setName("yorkshire");
        } else if (type == 2) {
            this.setName("bulldog");
        }
    }
    ...
}
```

```java
// Main class
public static void main(String[] args) {
    HouseDog happy = new HouseDog("happy");
    HouseDog yorkshire = new HouseDog(1);
    System.out.println(happy.name);  // happy
    System.out.println(yorkshire.name);  // yorkshire
}
```



## Interface

'CAN-DO' 관계로 볼 수 있다. 인터페이스는 규칙을 표현하는 것으로 인터페이스의 메소드는 정의만 있고 내용이 없다. 인터페이스 메소드의 구체적인 내용은 인터페이스를 implements한 클래스에서 반드시 구현해야 한다.

컴퓨터의 USB 포트의 규격을 알고 있으면 그에 맞는 하드디스크, 메모리스틱 등을 구현할 수 있듯이 인터페이스는 클래스 간의 연결을 느슨히 해서 독립적으로 존재할 수 있도록 돕는다.

상속과 달리 한 클래스가 여러 인터페이스를 구현하는 것이 가능하다.

```java
// Predator interface
public interface Predator {
    public String getFood();
}
```

```java
// Tiger class
public class Tiger extends Animal implements Predator {
    public String getFood() {
        return "apple";
    }
}

// Lion class
public class Lion extends Animal implements Predator {
    public String getFood() {
        return "banana";
    }
}
```

```java
// ZooKeeper class
public class ZooKeeper {
    public void feed(Predator predator) {
        System.out.println("feed " + predator.getFood());
    }
}
```

```java
// Main class
public static void main(String[] args) {
    ZooKeeper zooKeeper = new ZooKeeper();
    Tiger tiger = new Tiger();
    Lion lion = new Lion();
    zooKeeper.feed(tiger);  // feed apple
    zooKeeper.feed(lion);  // feed banana
}
```



## Polymorphism

하나의 객체가 여러 개의 자료형 타입을 가질 수 있는 것을 다형성(Polymorphism)이라 부른다.

아래 예제의 tiger, lion 객체는 각각 Tiger, Lion 클래스의 객체이면서 상속 받은 Animal 클래스의 객체이기도 하다. 또한 lion은 Barkable, Predator 인터페이스의 객체이고 tiger는 BarkablePredator 인터페이스의 객체이면서 Barkable, Predator 인터페이스의 객체이기도 하다.

```java
// Barkable interface
public interface Barkable {
    public void bark();
}
```

```java
// BarkablePredator interface
public interface BarkablePredator extends Barkable, Predator {
}
```

```java
// Tiger class
public class Tiger extends Animal implements Predator, Barkable {
    ...
    public void bark() {
        System.out.println("어흥");
    }
}

// Lion class
public class Lion extends Animal implements BarkablePredator {
    ...
    public void bark() {
        Systme.out.println("으르렁");
    }
}
```

```java
// Bouncer class
public class Bouncer {
    public void barkAnimal(Barkable barkable) {
        barkable.bark();
    }
}
```

```java
// Main class
public static void main(String[] args) {
    Tiger tiger = new Tiger();
    Lion lion = new Lion();
    
    Bouncer bouncer = new Bouncer();
    bouncer.barkAnimal(tiger);  // 어흥
    bouncer.barkAnimal(lion);  // 으르렁
}
```



## Abstract Class

인터페이스의 역할을 하면서 동시에 구현체를 가진다.

`abstract` 키워드를 표기하여 추상클래스로 정의할 수 있다. 클래스뿐 아니라 클래스 내의 메소드 앞에도 표기해야 한다. 단, `abstract` 키워드를 붙이지 않은 일반 메소드도 추가할 수 있다.

인터페이스 메소드와 마찬가지로 추상클래스의 추상메소드의 구체적인 내용이 반드시 상속 받은 클래스에서 구현되어야 한다. 추상클래스의 일반 메소드는 상속받은 클래스에서 사용할 수 있다.

```java
// Predator abstract class
public abstract class Predator extends Animal {
    public abstract String getFood();
    
    public boolean isPredator() {
        return true;
    }
}
```

```java
// Tiger class
public class Tiger extends Predator implements Barkable {
    ...
}

// Lion class
public class Lion extends Predator implements Barkable {
    ...
}
```

```java
// Main class
public static void main(String[] args) {
    Tiger tiger = new Tiger();
    if (tiger.isPredator()) {
        System.out.println("feed " + tiger.getFood());  // feed apple
    }
}
```



## Ref.

- [점프 투 자바 - 객체지향](https://wikidocs.net/218)
- [상속 vs 인터페이스](http://ryulib.tistory.com/76)