# Web 1 - HTML & Internet

## 기본 문법 - 태그

HTML에서 태그는 옷에 붙어있는 태그와 같이 감싸고 있는 내용을 설명하는 역할을 한다.

열리는 태그(<>)와 닫히는 태그(</>)로 구분하기도 한다. 또한 중첩해서 사용할 수 있다.

```html
Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.
```

## 혁명적인 변화

쉽다고 해서 중요하지 않은 것이 아니다.

![difficulty-importance](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7602.jpeg)

* [W3C(The World Wide Web Consortium)](https://www.w3.org/)

    웹은 W3C에 소속된 여러 기업과 기관들이 논의하여 만들어진다. 필요한 기능을 어떤 태그로 표현할 것인가를 의논한다.

## 통계에 기반한 학습

[이 웹페이지](https://www.advancedwebranking.com/html/)에서는 전 세계에 있는 웹 페이지에서 사용된 HTML 태그의 빈도수를 계산하여 분석한 결과를 볼 수 있다.

25개의 태그를 사용하는 웹 페이지의 수가 가장 많다.

![number of used tags](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7623.png)

사용된 25개의 태그는 다음과 같다.

![25 tags](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7624.png)

이러한 통계를 기반으로 학습해보자.

## 줄바꿈

* `<br>`

    새로운 줄을 표현할 때 사용한다. 감싸야할 컨텐츠가 없기 때문에 태그를 닫지 않는다.

    ```html
    <h1>HTML</h1>
    Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications. Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.<br><br>HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets. 
    ```

* `<p>`

    줄바꿈과 달리 문단의 단락이라는 정보를 표현한다.

    단락 간의 간격이 고정되어 있다는 단점이 있지만 이를 `CSS`로 극복할 수 있다.

    ```html
    <h1>HTML</h1>
    <p>Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.</p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets. </p>
    ```

## HTML이 중요한 이유

1. 의미있는 HTML 태그 사용
    * 지식인의 코드

        제목이라는 정보값을 표현한다.

    ```html
    <h3>coding</h3>
    ```

    * 일반인의 코드

        시각적으로는 위의 코드와 같지만 제목이라는 의미는 표현되지 않는다.

    ```html
    <strong><span style="font-size:22px;">coding</span></strong>
    ```

2. 접근성

    예시: 시각장애인 스크린리더

## 최후의 문법 속성과 img

* 속성

    `<img>`의 `src` 속성을 사용하여 웹 페이지에서 이미지를 표현할 수 있다.

    ```html
    <h1>HTML</h1>
    <p>Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
    <img src="https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7648.png">
    </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets. </p>
    ```

    인터넷에 있는 이미지뿐만 아니라 내 컴퓨터에 있는 이미지도 표시할 수 있다.

    또한 `width` 속성을 사용하면 이미지의 크기를 조정할 수 있다.

    ```html
    <h1>HTML</h1>
    <p>Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
    <img src="coding.jpg" width="100%">
    </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets. </p>
    ```

## 부모 자식과 목록

* `<li>`

    목차(list)를 표현할 때 사용한다.

    서로 다른 목차 간 경계를 표현하려면 `<ul>` 태그 또는 `<ol>` 태그를 사용하면 된다. 각각 unordered list와 ordered list의 약자이다.

    `<ul>`은 `<li>`의 parent 태그이고, `<li>`는 `<ul>`의 child 태그로 서로 밀접한 관계를 맺고 있다.

    ```html
    <ol>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>
    <ul>
        <li>egoing</li>
        <li>k8805</li>
        <li>sorialgi</li>
    </ul>

    <h1>HTML</h1>
    <p>Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
    <img src="https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7648.png" width="100%">
    </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets. </p>
    ```

## 문서의 구조와 슈퍼스타들

* `<title>`

    제목을 지정할 때 사용한다.

    ```html
    <title>WEB1 - html</title>

    <ol>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>

    <h1>HTML</h1>
    <p>Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
    <img src="https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7648.png" width="100%">
    </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
    </p>
    ```

* `<meta>`

    메타 정보를 표시할 때 사용한다. 예를 들어 `charset` 속성을 통해 character set 정보를 지정할 수 있다.

    ```html
    <title>WEB1 - html</title>
    <meta charset="utf-8">

    <ol>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>

    <h1>HTML</h1>
    <p>Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
    <img src="https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7648.png" width="100%">
    </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
    </p>
    ```

* `<head>`와 `<body>`

    본문을 설명할 때는 `<head>`를 사용하고 본문은 `<body>`를 사용한다.

    ```html
    <head>
        <title>WEB1 - html</title>
        <meta charset="utf-8">
    </head>
    <body>
        <ol>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ol>

        <h1>HTML</h1>
        <p>Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
        <img src="https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7648.png" width="100%">
        </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
        </p>
    </body>
    ```

* `<html>`과 `<!doctype html>`

    `<html>` 태그로 `<head>` 태그와 `<body>` 태그를 감싼다.

    `<!doctype>` 태그는 문서의 타입에 대해 표시할 때 사용한다.

    ```html
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - html</title>
        <meta charset="utf-8">
    </head>
    <body>
        <ol>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ol>

        <h1>HTML</h1>
        <p>Hypertext Markup Language (HTML) is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
        <img src="https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7648.png" width="100%">
        </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
        </p>
    </body>
    </html>
    ```

## HTML 태그의 제왕

* `<a>`

    a는 anchor의 약자로 링크를 표현할 때 사용한다.

    속성인 `href`를 통해 주소를 지정할 수 있다.

    추가적으로 `target="_blank"`를 이용하면 클릭 시 새 창에서 페이지가 열린다. `title`을 통해 툴팁을 보여줄 수 있다.

    ```html
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - html</title>
        <meta charset="utf-8">
    </head>
    <body>
        <ol>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ol>

        <h1>HTML</h1>
        <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 specification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
        <img src="https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7648.png" width="100%">
        </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
        </p>
    </body>
    </html>
    ```

## 웹사이트 완성

페이지와 페이지를 엮는 링크를 통해 결합되어 있는 웹 페이지들의 그룹을 웹 사이트라 한다.

아래 구조와 같은 웹 사이트를 만들어 보자.
> Web
> 1. HTML
> 2. CSS
> 3. JavaScript

* Web

    ```html
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - Welcome</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="index.html">WEB</a></h1>
        <ol>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">CSS</a></li>
            <li><a href="3.html">JavaScript</a></li>
        </ol>
        <h2>WEB</h2>
        <p>The World Wide Web (abbreviated WWW or the Web) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the Internet.[1] English scientist Tim Berners-Lee invented the World Wide Web in 1989. He wrote the first web browser computer program in 1990 while employed at CERN in Switzerland.[2][3] The Web browser was released outside of CERN in 1991, first to other research institutions starting in January 1991 and to the general public on the Internet in August 1991.
        </p>
    </body>
    </html>
    ```

* HTML

    ```html
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - html</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="index.html">WEB</a></h1>
        <ol>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">CSS</a></li>
            <li><a href="3.html">JavaScript</a></li>
        </ol>

        <h2>HTML</h2>
        <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 specification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
        <img src="coding.jpg" width="100%">
        </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
        </p>
    </body>
    </html>
    ```

* CSS

    ```html
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - CSS</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="index.html">WEB</a></h1>
        <ol>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">CSS</a></li>
            <li><a href="3.html">JavaScript</a></li>
        </ol>
        <h2>CSS</h2>
        <p>
            Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language. Although most often used to set the visual style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.
        </p>
    </body>
    </html>
    ```

* JavaScript

    ```html
    <!doctype html>
    <html>
    <head>
        <title>WEB1 - JavaScript</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1><a href="index.html">WEB</a></h1>
        <ol>
            <li><a href="1.html">HTML</a></li>
            <li><a href="2.html">CSS</a></li>
            <li><a href="3.html">JavaScript</a></li>
        </ol>
        <h2>JavaScript</h2>
        <p>
            JavaScript (/ˈdʒɑːvəˌskrɪpt/[6]), often abbreviated as JS, is a high-level, dynamic, weakly typed, prototype-based, multi-paradigm, and interpreted programming language. Alongside HTML and CSS, JavaScript is one of the three core technologies of World Wide Web content production. It is used to make webpages interactive and provide online programs, including video games. The majority of websites employ it, and all modern web browsers support it without the need for plug-ins by means of a built-in JavaScript engine. Each of the many JavaScript engines represent a different implementation of JavaScript, all based on the ECMAScript specification, with some engines not supporting the spec fully, and with many engines supporting additional features beyond ECMA.
        </p>
    </body>
    </html>
    ```

## 원시웹

웹은 인터넷의 부분집합이다.

![web < internet](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7724.png)

1960년 분산된 형태의 통신 시스템 즉, 인터넷이 탄생한다.

그로부터 30년 후 1990년 스위스 유럽 입자물리 연구소(CERN)에서 최초의 웹브라우저 World Wide Web이 만들어지고 이 이름을 따온 웹(서버)이 탄생한다.

[최초의 웹 페이지](http://info.cern.ch)

## 인터넷을 여는 열쇠 : 서버와 클라이언트

웹의 작동 과정을 살펴보자.

![web](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7752.jpeg)

1. 웹 브라우저는 웹 서버에 index.html 파일의 코드를 요청한다.
2. 웹 서버는 이에 응답하여 index.html 파일을 찾아 이를 전송한다.
3. 웹 브라우저는 이 코드를 읽어 화면에 출력한다.

이처럼 요청하는 컴퓨터를 클라이언트(Client)라 하고 응답하는 컴퓨터를 서버(Server)라 한다.

## 웹호스팅 (github pages)

인터넷에 연결된 하나의 컴퓨터를 호스트라고 한다. 이러한 컴퓨터(웹 서버)를 빌려주는 웹 호스팅 업체들이 있다.

* Bitballon
* Neocities
* Azure Blob
* Google Cloud Storage
* Amazon S3

이 중 [gihub](https://github.com)의 pages 기능을 이용해보자.

![github pages](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7777.jpeg)

1. github에 저장소(repository)를 만든다.

    ![create repository](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7820.jpeg)
2. 지금까지 작성한 코드를 모두 업로드한다.

    ![upload files](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7769.jpeg)
3. Setting의 GitHub Pages 항목에서 master branch를 선택 후 Save 한다.

    ![set github pages source](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7775.jpeg)
4. 표시된 주소를 통해 웹 페이지를 확인한다.

    ![check web pages](https://s3-ap-northeast-2.amazonaws.com/opentutorials-user-file/module/3135/7776.png)

## Ref

[생활코딩 Web1 - HTML & Internet](https://opentutorials.org/course/3084)
