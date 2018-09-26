# Ch 1 웹 프로그래밍 기초

## 1 Web 개발의 이해 - FE/BE

### 1.1 웹 프로그래밍을 위한 프로그램 언어들

#### 1.1.1 저급 언어

기계 중심의 언어

컴퓨터의 전기신호인 켜졌다(on)와 꺼졌다(off) 2가지 상태 값으로 동작한다. 숫자로 표현하면 켜졌다는 1, 꺼졌다는 0을 뜻한다.

0과 1로 표현되는 2진수로 작성하는 프로그래밍 언어를 **기계어(Machine Language)**라 한다.

사람이 이해하기 쉽도록 숫자와 1:1로 대응되는 기호를 사용하는 프로그래밍 언어를 **어셈블리어(Assembly Language)**라 한다.

이렇게 작성한 어셈블리어를 기계가 알아들을 수 있는 원래 숫자로 바꿔주는 도구를 **어셈블러(Assembler)**라 한다.

기계어와 어셈블리어는 프로그래밍과 유지보수가 어렵기 때문에 현재는 다음에 소개할 고급 언어를 주로 사용한다.

#### 1.1.2 고급 언어

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

#### 1.1.3 인기 있는 프로그래밍 언어

* Github Octovers 2017

![github](Images/github_popular_languages.PNG)

* TIOBE Index

![tiobe](Images/tiobe_popular_languages.PNG)

![tiobe_graph](Images/tiobe_popular_languages_graph.PNG)

#### 1.1.4 웹 관련 인기 언어

* Python: 프로그래밍 입문자가 배우기 쉬운 언어로 웹사이트 개발에서 많이 사용된다.
* PHP: 웹의 80% 이상이 PHP로 만들어졌다고 할 정도로 많이 사용되는 언어이다.
* JavaScript: 처음에는 브라우저에서 동작하는 언어였지만 현재는 서버에서도 작성되며 영역을 넓혀가고 있다. 프론트엔드 개발자라면 반드시 익혀야 한다.
* JAVA: 엔터프라이즈 소프트웨어 환경 즉, 큰 규모의 소프트웨어 개발에 주로 사용되는 언어이다. JAVA를 지원하는 수많은 커뮤니티가 존재한다.
* Ruby: 빠르게 개발하고자 할 때 사용되는 언어로 단순하고 세련된 웹 어플리케이션을 만들 수 있다.

#### 1.1.5 참고 링크

* [Github Octovers 2017](https://octoverse.github.com/)
* [TIOBE Index - The Software Quality Company](https://www.tiobe.com/tiobe-index/)
* [프로그램 언어의 종류](https://opentutorials.org/course/2471/13907)

### 1.2 웹의 동작 (HTTP 프로토콜 이해)

#### 1.2.1 인터넷(네트웍 통신)의 이해

인터넷 != WWW(World Wide Web)

WWW는 인터넷을 기반으로 한 대표적인 서비스 중 하나이다. 그 외의 서비스들을 살펴보면 다음과 같다.

| 이름 | 프로토콜 | 포트 | 기능 |
|---|---|---|---|
| WWW | HTTP | 80 | 웹 서비스 |
| Email | SMTP/POP3/IMAP | 25/110/114 | 이메일 서비스 |
| FTP | FTP | 21 | 파일 전송 서비스 |
| DNS | DNS | 23 | 도메인 네임 서비스 |
| NEWS | NNTP | 119 | 인터넷 뉴스 서비스 |

인터넷은 TCP/IP 기반의 네트워크가 전세계적으로 확대되어 하나로 연결된 네트워크들의 네트워크 즉, 네트워크의 결합체이다.

#### 1.2.2 HTTP(Hypertext Transfer Protocol)

Tim Berners-Lee와 그가 속한 팀이 HTML, 웹 브라우저 및 관련 기술, 그리고 HTTP를 발명하였다.

이는 서버와 클라이언트가 데이터를 주고 받기 위해 정한 규약(protocol)이다. HTTP는 텍스트, 이미지, 오디오, 동영상 등 어떠한 종류의 데이터도 전송할 수 있도록 설계되어 있다.

현재 HTTP/2 버전까지 등장하였다. 본 교육 과정에서는 가장 많이 사용되는 HTTP v1.1을 다룬다.

#### 1.2.3 HTTP 작동방식

* 네트워크 통신 방법
  * 유상태(stateful) 방식: 서버와 클라이언트 간에 접속이 계속 유지된다. 따라서 채팅이나 온라인 게임 등에 적합하다. 단, 서버가 동시에 접속을 유지할 수 있는 수가 정해져 있어 클라이언트 수가 많아지면 서버의 수도 많아져야 한다.
  * 무상태(stateless) 방식: 서버와 클라이언트 간에 필요한 경우에만 연결하는 방식으로 요청을 보내고 응답을 받으면 연결을 끊는다. 따라서 하나의 서버가 굉장히 많은 요청, 응답 처리가 가능하다.

HTTP는 서버/클라이언트 모델을 따르며 또한 무상태 프로토콜이다.

* 장점
  * 불특정 다수를 대상으로 하는 서비스에 적합하다.
  * 무상태 방식이므로 클라이언트와 서버 간의 최대 연결 수보다 훨씬 많은 요청과 응답을 처리할 수 있다.
* 단점
  * 연결이 끊기므로 클라이언트의 이전 상황을 알 수 없다.
  * 이러한 무상태 특징 때문에 정보를 유지하기 위해 Cookie와 같은 기술을 사용한다.

#### 1.2.4 URL(Uniform Resource Locator)

인터넷 상의 자원(이미지 등)의 위치를 나타낸다.
특정 웹 서버의 특정 파일에 접근하기 위한 경로 혹은 주소이다.

다음과 같이 크게 세 부분으로 나누어진다.

1. 프로토콜 종류
2. 자원이 있는 서버의 IP 주소 혹은 도메인 이름과 포트 번호
3. 자원의 위치와 이름

```txt
http://www.sunnyvale.co.kr/docs/index.html

접근 프로토콜://IP 주소 또는 도메인 이름과 포트 번호/문서 경로/문서 이름
```

물리적인 하나의 컴퓨터에는 여러 개의 서버가 동작할 수 있다. 각 서버들은 포트 번호로 구분된다. 따라서 물리적인 컴퓨터를 찾은 후에 특정 서버를 찾기 위해서는 포트 값이 필요하다.

IP를 집 주소라고 가정하면 포트 번호는 방이라고 볼 수 있다. 각 서버는 하나의 방(포트)을 차지한다.

기본 개념을 익혔다면 이제 웹의 동작 과정을 다음 그림을 통해 살펴본다.

![web_process](https://cphinf.pstatic.net/mooc/20180119_25/1516354290022wUY3x_PNG/http_-_.PNG)

1. connect: 클라이언트가 원하는 서버에 접속한다.
2. request: 클라이언트가 서버에 요청한다.
3. response: 서버는 클라이언트가 요청할 때에만 응답한다.
4. close: 응답이 끝나면 서버와 클라이언트 간의 연결이 끊긴다.

클라이언트가 서버에 요청하는 데이터 포맷이 정해져있다. 요청 메시지는 헤더, 빈 줄, 바디라는 세 부분으로 나뉜다.

```txt
GET /servlet/query?a=10&b=90 HTTP/1.1
Host: www.sk.com
User-agent: mozilla/4.0
Accept-language: kr
```

* 헤더
  * 요청 메서드: GET, PUT, POST, PUSH 등이 있다.
  * 요청 URI: 요청하는 자원의 위치를 명시한다.
  * HTTP 프로토콜 버전: 웹 브라우저가 사용하는 프로토콜 버전을 명시한다.
  두 번째 줄부터는 헤더 정보가 표시된다. 헤더 명과 헤더 값이 콜론(:)으로 구분되어 표시되고 각 줄은 line feed(\n)와 carriage return(\r)로 구분된다.

* 빈 줄

  헤더와 바디를 구분한다.

* 바디

  GET 메서드는 요청시 필요한 자원 등을 URI에 붙이기 때문에 바디가 존재하지 않지만, POST나 PUT 메서드의 경우는 바디가 존재한다.

요청 메서드의 종류를 살펴 보면 다음과 같다.

* GET: 정보를 요청하기 위해서 사용한다. (SELECT)
* POST: 정보를 밀어넣기 위해서 사용한다. (INSERT)
* PUT: 정보를 업데이트하기 위해서 사용한다. (UPDATE)
* DELETE: 정보를 삭제하기 위해서 사용한다. (DELETE)
* HEAD: (HTTP)헤더 정보만 요청한다. 해당 자원이 존재하는지 혹은 서버에 문제가 없는지를 확인하기 위해서 사용한다.
* OPTION: 웹 서버가 지원하는 메서드의 종류를 요청한다.
* TRACE: 클라이언트의 요청을 그대로 반환한다. echo 서비스로 서버 상태를 확인하기 위해서 사용한다.

서버가 클라이언트에 응답하는 데이터 포맷 또한 정해져 있다. 마찬가지로 헤더, 빈 줄, 바디 세 부분으로 나뉜다.

```txt
HTTP/1.1 200 OK
Date : Thu,03 jul 2003 12:00:15 GMT
Server : Apache/1.3.0 (Unix)
Last-Modified : Sun, 5 May 2003 09:23:24 GMT
Content-Length : 6821
Content-Type : text/html

<html>
...
</html>
```

* 헤더
  * HTTP 프로토콜 버전
  * 응답 코드
  * 응답 메시지
  두 번째 줄부터는 날짜, 웹 서버 이름과 버전, 마지막 수정 날짜, 콘텐츠 길이, 콘텐츠 타입 등이 표시된다.

* 빈 줄

  헤더와 바디를 구분한다.

* 바디

  실제 응답 리소스 데이터가 나타난다.

#### 1.2.5 참고 링크

* [An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
* [HTTP - Hypertext Transfer Protocol Overview](https://www.w3.org/Protocols/)
* [HTTP - 위키백과, 우리 모두의 백과사전](https://ko.wikipedia.org/wiki/HTTP)
* [URL - Wikipedia](https://en.wikipedia.org/wiki/URL)
* [Uniform Resource Identifier - Wikipedia](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)