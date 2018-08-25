# Locale

`java.util.Locale` 클래스는 특정한 지리적, 정치적, 문화적 지역을 나타낸다. 해당 클래스를 통해 각 국가의 정보를 얻을 수 있는데 이는 국제 표준화 기구인 ISO 표준을 따른다.

특히 [ISO 639](https://ko.wikipedia.org/wiki/ISO_639)는 언어 코드를 부여하는 국제 표준이고,  [ISO 3166 alpha-2](https://ko.wikipedia.org/wiki/ISO_3166-1_alpha-2)는 국가 코드를 부여하는 국제 표준이다.



어떤 국가들은 Field를 통해 built-in Locale이 제공된다.

```java
import java.util.Locale;

Locale kor = Locale.KOREA;
```



제공되지 않는 국가의 경우에는 생성자를 이용해 직접 생성해야 한다.

Locale 객체를 생성하기 위해서는 언어와 국가가 필요하다. 예를 들어, 인도 Locale 객체를 생성하려면 영어의 ISO 코드인 `en`과 인도의 ISO 코드인 `IN`를 이용한다.

```java
// Locale(String language, String country)
Locale INDIA = new Locale("en", "IN");
```



인도의 Locale 객체를 통해 통화 표기법을 알아보자.

```java
NumberFormat indiaFormat = NumberFormat.getCurrencyInstance(INDIA);

String india = indiaFormat.format(12324.134);

System.out.println("India: " + india);  // India: Rs.12,324.13
```





## Ref.

[Java 8 - Locale](https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html)

[Java 8 - NumberFormat](https://docs.oracle.com/javase/8/docs/api/java/text/NumberFormat.html)