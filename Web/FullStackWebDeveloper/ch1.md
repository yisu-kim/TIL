# Ch 1 웹 프로그래밍 기초

## 1 Web 개발의 이해 - FE/BE

### 1.1 웹 프로그래밍을 위한 프로그램 언어들

#### 저급 언어

기계 중심의 언어

컴퓨터의 전기신호인 켜졌다(on)와 꺼졌다(off) 2가지 상태 값으로 동작한다. 숫자로 표현하면 켜졌다는 1, 꺼졌다는 0을 뜻한다.

0과 1로 표현되는 2진수로 작성하는 프로그래밍 언어를 **기계어(Machine Language)**라 한다.

사람이 이해하기 쉽도록 숫자와 1:1로 대응되는 기호를 사용하는 프로그래밍 언어를 **어셈블리어(Assembly Language)**라 한다.

이렇게 작성한 어셈블리어를 기계가 알아들을 수 있는 원래 숫자로 바꿔주는 도구를 **어셈블러(Assembler)**라 한다.

기계어와 어셈블리어는 프로그래밍과 유지보수가 어렵기 때문에 현재는 다음에 소개할 고급 언어를 주로 사용한다.

#### 고급 언어

사람 중심의 언어

사람이 이해하기 쉬운 문법을 사용하는 다양한 프로그래밍 언어가 존재한다.

* FORTRAN: 최초의 고급 언어. 과학 계산용. 공대에서 사용.
* COBOL: 역사가 오래된 언어. 일반 업무용. 은행에서 사용.
* PROLOG: 논리형 프로그래밍 언어.
* C: 1972년 미국 벨 연구소의 데니스 리치가 개발한 고급 언어. 시스템 프로그래밍에 적합.
* Erlang: 스웨덴의 에릭슨이 개발한 함수형 병행성 언어. 통신 인프라 구현에 적합.
* Lisp: FORTRAN 다음으로 오래된 역사의 함수형 언어.
* Swift: 2014년 WWDC에서 공개한 모던 프로그래밍 언어.
* Kotlin: 2011년 JetBrains에서 개발한 모던 프로그래밍 언어. JVM 기반으로 JAVA와 상호 운영이 100& 지원됨.
* Clojure: 리치 히키가 개발한 Lisp 언어의 방언으로 범용 함수형 언어.
* Python: 입문자에게 적합한 언어. 데이터 과학, 웹사이트 개발, 머신 러닝에 적합.
* JAVA: 1995년 Sun Microsystems에서 개발한 객체지향 프로그래밍 언어.

고급 언어도 마찬가지로 작성한 코드를 번역해주는 도구가 필요하다. 이를 **컴파일러(Compiler)**라 한다.

#### 인기 있는 프로그래밍 언어

* Github Octovers 2017

![github](./Images/github_popular_languages.png)

* TIOBE Index

![tiobe](./Images/tiobe_popular_languages.png)

![tiobe_graph](./Images/tiobe_popular_languages_graph.png)

#### 웹 관련 인기 언어

* Python: 프로그래밍 입문자가 배우기 쉬운 언어로 웹사이트 개발에서 많이 사용된다.
* PHP: 웹의 80% 이상이 PHP로 만들어졌다고 할 정도로 많이 사용되는 언어이다.
* JavaScript: 처음에는 브라우저에서 동작하는 언어였지만 현재는 서버에서도 작성되며 영역을 넓혀가고 있다. 프론트엔드 개발자라면 반드시 익혀야 한다.
* JAVA: 엔터프라이즈 소프트웨어 환경 즉, 큰 규모의 소프트웨어 개발에 주로 사용되는 언어이다. JAVA를 지원하는 수많은 커뮤니티가 존재한다.
* Ruby: 빠르게 개발하고자 할 때 사용되는 언어로 단순하고 세련된 웹 어플리케이션을 만들 수 있다.

#### 참고 링크

* [Github Octovers 2017](https://octoverse.github.com/)
* [TIOBE Index - The Software Quality Company](https://www.tiobe.com/tiobe-index/)
* [프로그램 언어의 종류]((https://opentutorials.org/course/2471/13907))