# SQL Tutorial



[TOC]

## 01 데이터베이스와 SQL

### 데이터베이스

여러 응용 프로그램을 통해서 엑세스 가능한 공유된 형태의 통합된 데이터의 집합

#### 특징

- 데이터의 독립성
- 데이터의 무결성
- 데이터의 보안성
- 데이터의 일관성
- 데이터의 중복 최소화

#### 구조 종류

- 파일 시스템
- 데이터베이스 관리 시스템(Database Management System)
  - 계층형 데이터베이스 시스템
  - 망형 데이터베이스 시스템
  - 관계형 데이터베이스 시스템(RDBMS)
  - 키-밸류 스토어(KVS)

#### 데이터베이스 제품

- Oracle, DB2, PostgreSQL, MySQL, SQLite, ...

#### 데이터베이스 서버

- 클라이언트/서버 모델: 사용자 조작에 따라 요청을 전달하는 '클라이언트'와 해당 요청을 받아 처리하는 '서버'로 구성되는 모델
- MySQL
  - client(mysql): `mysql -u root -p` 명령어를 사용하여 사용자 인증 후 접속
  - client UI(mysql workbench)
  - server(mysqld) = RDBMS



### SQL 명령

- **DML**(Data Manipulation Language): 데이터를 조작하는 명령어. 데이터를 추가, 삭제, 갱신하는 등 데이터를 조작할 때 사용.
- **DDL**(Data Definition Language): 데이터를 정의하는 명령어. 데이터베이스 객체를 만들거나 삭제할 때 사용.
- **DCL**(Data Control Language): 데이터를 제어하는 명령어. 트랜잭션 제어, 데이터 접근권한 제어할 때 사용.






## 02 테이블에서 데이터 검색


> 예약어와 객체명은 대소문자를 구별하지 않는다. 하지만 많은 데이터베이스 제품들은 데이터의 대소문자를 구별한다.
>
> 본 문서에서는 예약어는 대문자로, 데이터베이스 객체명은 소문자로 표기한다.

### SELECT

데이터베이스의 데이터를 읽어온다. '질의'나 '쿼리(Query)'라고도 불린다.


```sql
SELECT *
FROM table_name;
```


-   `SELECT`: DML(Data Manipulation Language)에 속하는 명령어
-   `*(asterisk)`: '모든 열'을 의미하는 메타문자
-   `FROM`: 처리 대상 테이블을 지정하는 키워드
-   `table_name`: 데이터베이스 객체인 테이블명
-   `;(semicolon)`: 명령문의 마지막에 붙인다.



### WHERE


```sql
SELECT column1_name, column2_name
FROM table_name
WHERE conditional_statement;
```


* `column_name`: SELECT 구를 통해 읽어오길 원하는 열을 지정할 수 있다. comma(,)를 사용해 여러 열을 지정할 수 있다.
* `WHERE`: WHERE 구를 통해 조건에 맞는 행을 지정할 수 있다.
* `conditional_statement`: 조건식은 '열과 연산자, 상수로 구성된 식'이다. 참 또는 거짓의 진리값을 반환한다.




### DESC


테이블 구조를 참조한다.


```sql
DESC table_name;
```


테이블은 다음과 같은 구조를 갖는다.


| Field  | Type   | Null     | Key  | Default | Extra |
| ------ | ------ | -------- | ---- | ------- | ----- |
| 필드명 | 자료형 | 제약사항 | 키   | 기본값  |       |




### 자료형

대표적인 자료형은 다음과 같다. 이 외에도 다양한 자료형이 존재한다.

수치형의 경우 그대로 표기하지만 문자형, 날짜형, 시간형의 경우 single quotes(' ')로 둘러싸 표기한다.


* **INTEGER**: 수치형의 하나로 정수값을 저장할 수 있다.
* **CHAR**: 문자형의 하나로 '고정 길이 문자열'을 저장할 수 있다. 열의 최대 길이를 지정해야 한다. 문자열의 길이가 최대 길이보다 작을 경우 공백문자로 나머지 길이를 채운다.
* **VARCHAR**: 문자형의 하나로 '가변 길이 문자열'을 저장할 수 있다. 마찬가지로 열의 최대 길이를 지정해야 한다.
* **DATE**: 날짜값(연월일)을 저장할 수 있다. 날짜형의 연-월-일은 hyphen(-)으로 구분한다.
* **TIME**: 시간(시분초)을 저장할 수 있다. 시간형의 시:분:초는 colon(:)으로 구분한다.



### NULL

값이 없는 데이터

검색 시 `=` 연산자 대신 `IS NULL` 을 사용한다.



### 연산자

- `=`: 값이 같은 경우 참

- `<>`: 값이 서로 다른 경우 참
- `>`: 좌변의 값이 우변의 값보다 클 경우 참 (ant. `<`)
- `>=`: 좌변의 값이 우변의 값보다 같거나 클 경우 참 (ant. `<=`)



### 조건 조합

- `AND`: 모든 조건을 만족하면 참
- `OR`: 어느 쪽이든 하나의 조건만 만족하면 참
- `NOT`: 오른쪽에 지정된 조건식의 반대값 반환



### LIKE

문자열의 일부분을 비교하는 패턴 매칭(부분 검색)

```sql
SELECT *
FROM table_name
WHERE column_name LIKE 'pattern'
```

- `LIKE`: LIKE 술어의 왼쪽에는 매칭 대상을 지정하고 오른쪽에는 비교할 패턴을 문자열로 지정한다.
- `pattern`: 패턴을 정의할 때 다음과 같은 메타문자를 사용할 수 있다.
  - `%(percent)`: 임의의 문자열. 사용 위치에 따라 전방 일치, 중간 일치, 후방 일치로 검색이 가능하다.
  - `_(underscore)`: 임의의 문자 하나



## 03 정렬과 연산

### ORDER BY

```sql
SELECT *
FROM table_name
WHERE conditional_statement
ORDER BY column1_name, column2_name;
```

- `ORDER BY`: ORDER BY 구를 사용하면 검색결과의 행 순서를 정렬할 수 있다.
- `column_name`: 정렬 기준으로 삼을 열을 지정한다.
  - 정렬방법의 기본값은 `ASC(ascendant)`로 오름차순이다. 반대로 `DESC(descendant)`를 사용하면 내림차순으로 정렬한다.
  - comma(,)로 열을 구분하면 복수의 열을 지정하여 정렬할 수 있다. 값이 같을 경우 다음으로 지정한 열을 기준으로 정렬한다.

NULL 값을 가지는 행은 가장 먼저 표시되거나 가장 나중에 표시된다. 이는 표준 SQL에 규정되어 있지 않아 데이터베이스 제품마다 다르다. MySQL의 경우 NULL을 가장 작은 값으로 취급한다.



### LIMIT

표준 SQL이 아닌 MySQL과 PostgreSQL에서 사용할 수 있는 방언이다.

```sql
SELECT *
FROM table_name
WHERE conditional_statement
ORDER BY column_name
LIMIT number_of_rows
OFFSET location;
```

- `LIMIT`: LIMIT구를 통해 검색 결과에서 반환할 행수를 제한할 수 있다.
- `OFFSET`: 반환을 시작할 위치를 지정한다. OFFSET은 생략 가능하며 기본값은 0이다.

다른 표현 방법도 있다. `LIMIT 3 OFFSET 3 = LIMIT 3,3`



### 수치 연산

```sql
SELECT expression
FROM table_name
WHERE expression
ORDER BY expression;
```

- `expression`
  - 열 뿐만 아니라 연산자와 상수를 이용하여 식을 기술할 수 있다.
  - 이때, 일반적으로 내부적인 처리 순서는 WHERE -> SELECT -> ORDER BY 순서이다.

NULL 값과 상수를 연산할 경우 NULL 값이 0으로 처리되지 않기 때문에 계산 결과는 NULL이 된다.



### ROUND()

반올림하는 함수

```sql
ROUND(number, decimal_places)
```

- `decimal_places`: 반올림할 자릿수. 기본값을 0으로 소수점 첫째 자리를 기준으로 반올림 한다. 음수를 사용하여 정수부의 반올림할 자릿수도 지정할 수 있다.



### 별칭

```sql
SELECT column_name AS alias
FROM table_name;
```

- `AS`: 식에 별칭을 붙일 수 있다. 가급적 중복되지 않는 별칭을 사용하도록 한다. 키워드인 `AS`는 생략할 수 있다.
- `alias`: 별칭을 지정할 때 ASCII 문자인 영어, 숫자 등을 제외하고 한글로 지정할 경우 double quotes(" ")로 둘러싸야 한다.



### 문자열 결합

2개의 열 데이터를 모아 1개의 열로 처리하고 싶은 경우 자주 사용한다.

| 연산자/함수 | 데이터베이스            |
| ----------- | ----------------------- |
| +           | SQL Server              |
| \|\|        | Oracle, DB2, PostgreSQL |
| CONCAT()    | MySQL                   |



### SUBSTRING() / SUBSTR()

문자열의 일부분을 계산해서 반환해주는 함수

```sql
SUBSTRING(string, start_pos, number_of_chars)
```

- `start_pos`: 추출하고 싶은 시작 위치
- `number_of_chars`: 시작위치부터 추출해낼 문자 개수



### TRIM()

문자열 앞 뒤로 여분의 스페이스를 제거하는 함수. 고정길이 문자열형에 대해 많이 사용한다.

```sql
TRIM(string)
```



### CURRENT_TIMESTAMP

시스템 날짜와 시간을 확인하는 함수

```sql
SELECT CURRENT_TIMESTAMP;
```



### 날짜 연산

```sql
SELECT CURRENT_DATE + INTERVAL number DAY/MONTH/YEAR
```

- `INTERVAL `: 기간형 상수를 서술하기 위한 키워드. `+` 또는 `-`를 사용하여 기간형 수치데이터를 더하거나 뺄 수 있다.

날짜시간형 데이터 간에도 뺄셈을 통해 두 날짜 사이에 발생하는 시간차를 계산할 수 있다. MySQL의 경우 `DATEDIFF()` 함수를, Oracle의 경우 `-` 를 사용하면 된다.



### CASE

```sql
CASE WHEN conditional_statement1 THEN expression1
	[WHEN conditional_statement2 THEN expression2]
	[ELSE expression3]
END AS alias
```

- `WHEN ~ THEN`: WHERE 절의 조건식이 참일 경우 THEN 절에 기술한 식이 처리된다.
- `ELSE`: 그 어떤 조건식도 만족하지 못한 경우 ELSE 절에 기술한 식이 채택된다. ELSE는 생략 가능하며 그 경우 ELSE NULL로 간주된다.
- `AS`: CASE 문에도 별칭을 붙일 수 있다.

SELECT, WHERE, ORDER BY 등 어디에서나 사용할 수 있다.



## 04 데이터의 추가, 삭제, 갱신

### INSERT

```sql
INSERT INTO table_name(column1, column2, ...)
VALUES(value1, value2, ...);
```

- `INSERT INTO`: INSERT 명령을 사용하면 테이블에 행 단위로 데이터를 추가할 수 있다.
- `column`: 값을 저장할 열을 지정할 수 있다.
- `VALUES`: VALUES 구에서 테이블 구조에 맞춰 추가할 데이터를 기술한다.
- `value`: 해당 열의 데이터 타입에 맞춘다. 특정 열에만 데이터를 추가할 경우 해당 열과 데이터 간의 위치가 동일해야 한다.



### DELETE

```sql
DELETE FROM table_name
WHERE conditional_statement;
```

- `DELETE FROM`: 삭제하길 원하는 테이블명을 사용해 데이터를 삭제할 수 있다. WHERE 구를 생략할 경우 테이블의 모든 데이터가 삭제된다.



### UPDATE

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE conditional_statement;
```

- `UPDATE`: UPDATE를 통해 데이터를 갱신할 수 있다.
- `SET`: 갱신을 원하는 열에 값을 대입한다. 상수값만 대입할 수 있는 것이 아니라 해당 열을 이용한 연산(ex. no = no + 1)도 가능하다. WHERE 구를 생략하면 해당 열의 모든 행이 갱신된다.





## Refer.

-   SQL 첫걸음, 아사이 아츠시
-   빅데이터 교육