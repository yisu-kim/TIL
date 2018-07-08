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





## 05 집계와 서브쿼리

집계함수는 복수의 값(집합)에서 하나의 스칼라 값을 계산하여 반환한다.

단, 집합 안에 NULL 값이 있을 경우 이를 무시한다.

### COUNT()

인수로 지정된 집합의 개수를 계산한다.

```sql
COUNT([ALL|DISTINCT] expression)

-- count number of rows
SELECT COUNT(*) FROM table;
```



### DISTINCT

집합을 다룰 때, 중복값이 있는지 여부가 문제가 된다. 이러한 중복된 값을 제거하는 키워드이다.

DISTINCT를 생략한 경우 ALL로 간주되어 중복된 값을 포함한 전체 결과를 표시한다.

```sql
SELECT DISTINCT column FROM table;
```



COUNT() 함수와 DISTINCT 키워드를 결합하여 중복되지 않는 데이터를 구하는 방법은 다음과 같다.

```sql
SELECT COUNT(DISTINCT column) FROM table;
```



### SUM()

수치형 데이터의 합계를 구한다. NULL 값은 무시한다.

```sql
SUM([ALL|DISTINCT] expression)
```



### AVG()

수치형 데이터의 평균값을 구한다. NULL 값은 무시한다.

```sql
AVG([ALL|DISTINCT] expression)

-- convert NULL to 0
SELECT AVG(CASE WHEN column IS NULL THEN 0 ELSE column END) AS alias
FROM table;
```



### MIN()

최솟값을 구한다. 수치형뿐만 아니라 문자열형과 날짜시간형에도 사용할 수 있다. NULL 값은 무시한다.

```sql
MIN([ALL|DISTINCT] expression)
```



### MAX()

최댓값을 구한다. 수치형뿐만 아니라 문자열형과 날짜시간형에도 사용할 수 있다. NULL 값은 무시한다.

```sql
MAX([ALL|DISTINCT] expression)
```



### GROUP BY

집계함수로 넘겨줄 집합을 그룹으로 나눌 수 있다.

GROUP BY 구에 열을 지정하면 지정된 열의 값이 같은 행이 하나의 그룹으로 묶인다. 이때문에 DISTINCT 처럼 중복을 제거하는 효과가 있다.

GROUP BY에 지정한 열 이외의 열은 집계함수 없이 SELECT 구에 기술할 수 없다. 따라서 필요하다면 복수의 열을 GROUP BY 구에 지정하면 된다.

```sql
SELECT *
FROM table
GROUP BY column1, column2, ...;

-- use count(), sum() with group by
SELECT COUNT(column1), SUM(column2)
FROM table
GROUP BY column1;
```



### HAVING

집계함수를 WHERE 조건식에서 사용할 수 없기 때문에 HAVING 구를 대신 사용한다.

```sql
SELECT COUNT(column)
FROM table
GROUP BY column
HAVING expression
```



그 밖에 ORDER BY 구 등에서는 집계함수를 사용할 수 있다.

```sql
SELECT COUNT(column1)
FROM table
GROUP BY column1
ORDER BY SUM(column2) DESC;
```



내부처리 순서는 다음과 같다.

> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY



### SUBQUERY

하부 명령으로 괄호로 묶어 지정한다. SELECT 구 외에도 FROM 구, WEHERE 구 등 각 구에서 서브쿼리를 사용할 수 있다.

```sql
(SELECT ...)
```

#### pattern

- single row: 하나의 값(스칼라 값) 반환
- multiple row: 복수의 행과 하나의 열 반환
- multiple column: 하나의 행과 복수의 열 반환
- table: 복수의 행과 복수의 열 반환



스칼라 값을 반환하는 '스칼라 서브쿼리'의 경우 `=` 연산자를 사용하여 비교한다. 또한, WHERE 구에서 집계함수를 사용해 집계한 결과를 조건식으로 사용할 수 있다.



### EXISTS

데이터가 존재하는지 아닌지를 판별하는 데 사용하는 술어이다. 반환하는 값은 참 또는 거짓이다.

```sql
EXISTS (SELECT ...)
```



### IN

스칼라 값을 비교하는 데 사용하는 `=` 연산자와 달리 집합을 비교할 때는 `IN`을 사용한다.

왼쪽에 지정된 값과 같은 값이 집합 안에 존재하면 참을 반환한다.

NULL 값을 무시하지 않지만 NULL 값은 `IS NULL`로만 비교할 수 있다.

```sql
column IN(expression)
```





## 06 데이터베이스 객체 작성과 삭제

### CREATE

테이블을 생성한다.

```sql
CREATE TABLE table_name (
    column1 datatype [DEFAULT value] [NULL|NOT NULL],
    column2 datatype [DEFAULT value] [NULL|NOT NULL]
);
```



### DROP

테이블을 삭제한다.

```sql
DROP TABLE table_name;


-- 데이터 전체 행 삭제
-- DELETE 명령어와 달리 WHERE 조건 지정 불가
TRUNCATE TABLE table_name;
```



### ALTER

테이블을 변경한다.

```sql
ALTER TABLE table_name command

-- ADD
ALTER TABLE table_name
ADD column datatype;

-- MODIFY
ALTER TABLE table_name
MODIFY column datatype;

-- CHANGE
ALTER TABLE table_name
CHANGE old_name new_name [datatype];

-- DROP
ALTER TABLE table_name
DROP column;
```



### CONSTRAINTS

제약을 설정함으로써 저장될 데이터를 제한할 수 있다.

다음과 같은 제약이 주로 사용된다.

- NOT NULL
- UNIQUE
- PRIMARY KEY
- FOREIGN KEY
- CHECK
- DEFAULT
- INDEX

```sql
-- when a table is created
CREATE TABLE table_name (
    column1 datatype constraint,
    column2 datatype constraint
);

-- CONSTRAINT constraint_name
CREATE TABLE sample (
    no INTEGER NOT NULL,
    sub_no INTEGER NOT NULL,
    name VARCHAR(30) UNIQUE,
    CONSTRAINT pkey PRIMARY KEY(no, sub_no)
);

-- after a table is created
-- add constraint
ALTER TABLE table_name
MODIFY column_name datatype constraint;

ALTER TABLE table_name
ADD CONSTRAINT constraint_name constraint;

-- delete constraint
ALTER TALBE table_name
MODIFY column_name datatype;

ALTER TABLE table_name
DROP CONSTRAINT constraint_name;

-- delete primary key
ALTER TABLE table_name
DROP PRIMARY KEY;
```



### INDEX

테이블에 붙여진 색인

이를 통해 검색 속도의 향상을 기대할 수 있다. '이진 트리' 또는 '해시' 알고리즘을 사용한다.

테이블에 의존하므로 테이블을 삭제하면 자동으로 삭제된다.

```sql
CREATE INDEX index_name ON table_name (column1, column2);
-- schema object
DROP INDEX index_name;
-- table object
DROP INDEX index_name ON table_name;
```



### VIEW

뷰는 데이터베이스 객체가 아닌 SELECT 명령을 객체로서 이름 붙여 관리할 수 있도록 한 것

가상 테이블이라고도 불린다. 하지만 실제 테이블과 달리 대량의 저장공간을 필요로 하지 않는데 이는 실제 저장되는 것은 SELECT 명령이기 때문이다.

서브쿼리에서 사용하면 가독성을 높일 수 있다.

```sql
CREATE VIEW view_name (column1, column2) AS SELECT ...;
DROP VIEW view_name;
```

뷰의 열 지정을 생략한 경우 SELECT 명령에서 지정한 열 정보가 자동으로 지정된다. 생략하지 않은 경우 SELECT 명령의 열보다 우선된다.



## 07 복수의 테이블 다루기

### UNION

SELECT 명령어를 집합으로 간주하고 두 집합의 합집합 결과를 얻을 수 있다.

```sql
SELECT * FROM table1
UNION
SELECT * FROM table2;

-- remain duplicate values
SELECT * FROM table1
UNION ALL
SELECT * FROM table2;
```

*(asterisk) 대신 특정 열을 지정할 수도 있다.



### JOIN

#### Cross join

교차결합은 곱집합(cartesian product) 개념과 같다.

세로 방향으로 확장되는 UNION과 달리 가로 방향으로 확장된다.

```sql
SELECT * FROM table1, table2;
```



#### INNER JOIN

교차결합으로 계산된 곱집합에서 원하는 조합을 검색한다.

```sql
SELECT *
FROM table1 INNER JOIN table2
ON conditional_expr;
```



#### SELF JOIN

테이블에 별명을 붙여 동일한 테이블끼리 결합한다. 따로 키워드가 있는 것은 아니다.

```sql
SELECT *
FROM table t1 INNER JOIN table t2
ON t1.primary_key = t2.primary_key
```



#### LEFT / RIGHT JOIN

외부결합은 어느 한 쪽에만 존재하는 데이터행을 다룰 때 사용한다.

결합의 기준에 따라 LEFT 또는 RIGHT 방향을 선택한다.



## 08 데이터베이스 설계

### 데이터 모델링

1. 정보 모델링: 현실 세계의 개념 -> 개념적 모델(ER 다이어그램)
2. 데이터 모델링: 개념적 모델 -> 논리적 모델(관계 데이터 모델)
3. DB 구현: 논리적 모델 -> 데이터베이스

<br>

- 데이터베이스 생명주기
  1. 요구사항 수집 및 분석: 사용자 요구사항을 분석하여 구축 범위 설정
  2. 설계: 핵심 개체를 도출하여 ERD를 작성하고(개념적 설계), 사용하는 DBMS의 종류에 맞게 변환하여 상세 속성을 정의하고 정규화한 후(논리적 설계), 데이터베이스 스키마를 도출함(물리적 설계).
  3. 구현: 스키마를 적용하여 테이블 및 객체를 생성
  4. 운영: 테이터베이스를 기반으로 소프트웨어 서비스를 제공
  5. 감시 및 개선: 운영상 시스템의 문제를 관찰하여 데이터베이스의 문제점 개선

<br>

- 개념적 모델링
  - 요구사항을 분석한 결과를 토대로 핵심 개념을 구분하여 뼈대 구축
  - 개체(entity)를 추출하고 개체들 간의 관계 정의. ER 다이어그램(ERD, Entity Relationship Diagram) 작성
- 논리적 모델링
  - 개념적 모델링에서 만든 ERD를 DBMS에 맞게 사상(매핑, mapping)하여 스키마 설계
  - 상세 속성을 추출하고 정규화 수행
- 물리적 모델링
  - 논리적 모델을 DBMS의 특성에 맞게 실제 컴퓨터 저장장치에 저장하기 위한 구조로 정의(데이터 타입, 사이즈, 제약조건 등)
  - 응답시간 최소화, 트랜잭션, 효율적 공간 배치 등을 고려해야 한다.



### ER 모델

현실 세계의 개념을 개체(entity)와 개체 간 관계(relationship)로 표현

- 개체(Entity)
  - 독립적인 의미를 지님. 업무적인 내용의 명사 위주로 실체를 추출
  - 개체의 특성을 나타내는 속성(attribute)에 의해 식별됨.
  - ER 다이어그램상에서 '직사각형'으로 나타냄
- 속성(Attribute)
  - 개체가 가진 성질, 분류, 수량, 상태, 특성, 특징 등을 나타내는 세부사항
  - ER 다이어그램상에서 '타원'으로 표현. 개체 타입과 실선으로 연결됨.
  - 식별자: 개체를 식별할 수 있는 유일한 키(기본키)일 경우 밑줄을 그음.
    - 후보키(Candidate Key): 각 인스턴스를 유일하게 구분할 수 있는 속성
    - 기본키(Primary Key): 후보키 중 가장 적합한 키 선택
    - 대체키(Alternate Key): 후보키 중 기본키로 선정되지 않은 속성
    - 복합키(Composite Key): 하나의 속성으로 유일하게 구분할 수 없을 경우 둘 이상의 컬럼을 묶어 정의
- 관계(Relationship)
  - 개체 사이의 연관성 즉, 업무적인 연관성을 나타냄
  - 일대일(1:1) 관계, 일대다(1:N) 관계, 다대다(M:N) 관계로 유형을 나눌 수 있다.



### 관계형 모델

- 개체 -> 테이블
- 속성 -> 컬럼
- 식별자 -> 기본키
- 관계 -> 참조키



### 정규화

테이블을 올바른 형태로 변경 및 분할하고 기본키를 지정한다.

이는 하나의 데이터가 한 곳에 저장되도록 하기 위함이다.

- 제 1정규화: 하나의 셀에 하나의 값만 저장되어야 하며, 반복되는 속성은 추출 후 기본키를 지정해 새로운 테이블 생성한다. 기존 테이블과 1:N 관계가 형성된다.

  | 회원번호 | 이름   | 주소          | 핸드폰        | 자격증       | 취득일   |
  | -------- | ------ | ------------- | ------------- | ------------ | -------- |
  | 1        | 홍길동 | 서울시 면목동 | 111-1111-1111 | 운전면허 1종 | 19980203 |
  | 1        | 홍길동 | 서울시 면목동 | 111-1111-1111 | MCP          | 19990603 |
  | 1        | 홍길동 | 서울시 면목동 | 111-1111-1111 | 정보처리기사 | 20000502 |

  - 제 1정규화 결과

  | 회원번호 | 이름   | 주소          | 핸드폰        |
  | -------- | ------ | ------------- | ------------- |
  | **1**    | 홍길동 | 서울시 면목동 | 111-1111-1111 |

  | 자격증번호 | 자격증       | 취득일   | 회원번호 |
  | ---------- | ------------ | -------- | -------- |
  | **1**      | 운전면허1종  | 19980203 | 1        |
  | **2**      | MCP          | 19990603 | 1        |
  | **3**      | 정보처리기사 | 20000502 | 1        |

  ​	

- 제 2정규화: 복합키에 전체적으로 의존하지 않는 속성 제거

  | 학번    | 과정코드 | 평가 | 과정명         |
  | ------- | -------- | ---- | -------------- |
  | **100** | **A01**  | A    | Java프로그래밍 |
  | **101** | **B01**  | D+   | 웹마스터       |
  | **102** | **B02**  | A    | DBMS전문가     |
  | **103** | **B03**  | B    | 웹마스터       |

  - 제 2정규화 결과

  | 학번    | 과정코드 | 평가 |
  | ------- | -------- | ---- |
  | **100** | **A01**  | A    |
  | **101** | **B01**  | D+   |
  | **102** | **B02**  | A    |
  | **103** | **B03**  | C    |

  | 과정코드 | 과정명         |
  | -------- | -------------- |
  | **A01**  | Java프로그래밍 |
  | **B01**  | 웹마스터       |
  | **B02**  | DBMS전문가     |
  | **B03**  | 웹마스터       |

  

- 제 3정규화: 기본키에 의존하지 않는 일반 컬럼 제거

  | 주문ID | 상품ID | 회원ID | 회원명 | 전화번호 | 수량 | 단가 |
  | ------ | ------ | ------ | ------ | -------- | ---- | ---- |
  | **1**  | A01    | HONG   | 홍길동 | 222-2222 | 2    | 15   |
  | **2**  | B03    | PARK   | 박찬호 | 111-1111 | 3    | 18   |
  | **3**  | A02    | PSR    | 박세리 | 333-3333 | 1    | 19   |
  | **4**  | B03    | HGD    | 홍길동 | 444-4444 | 1    | 20   |

  - 제 3정규화 결과

  | 주문ID | 상품ID | 회원ID | 수량 | 단가 |
  | ------ | ------ | ------ | ---- | ---- |
  | **1**  | A01    | HONG   | 2    | 15   |
  | **2**  | B03    | PARK   | 3    | 18   |
  | **3**  | A02    | PSR    | 1    | 19   |
  | **4**  | B03    | HGD    | 1    | 20   |

  | 회원ID   | 회원명 | 전화번호 |
  | -------- | ------ | -------- |
  | **HONG** | 홍길동 | 222-2222 |
  | **PARK** | 박찬호 | 111-1111 |
  | **PSR**  | 박세리 | 333-3333 |
  | **HGD**  | 홍길동 | 444-4444 |



### TRANSACTION

트랜잭션을 사용하면 SQL 명령을 하나로 묶어 실행할 수 있다.

- 자동커밋을 끄기 위해 트랜잭션의 시작을 선언(START TRANSACTION)한다.
- 일련의 단계를 처리할 때 에러가 발생하면 롤백(ROLLBACK)해서 종료할 수 있다. 롤백하면 트랜잭션 내에서 행해진 모든 변경사항을 없었던 것으로 할 수 있다.
- 아무 에러가 발생하지 않으면 전체 변경사항을 적용하고 커밋(COMMIT)하여 트랜잭션을 종료한다.

```sql
-- start transaction
START TRANSACTION;
-- error
ROLLBACK;
-- no error
COMMIT;
```





## Refer.

- SQL 첫걸음, 아사이 아츠시

- [MySQL 5.7 Reference Manual](https://dev.mysql.com/doc/refman/5.7/en)

- 데이터 모델링 참고자료

  