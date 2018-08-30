﻿# 2 SQL 기본 및 활용

{:toc}

## 2.1 SQL 기본

### 2.1.1 관계형 데이터베이스의 개요

#### Database

- DBMS 필요성

  특정 조직 또는 개인이 필요에 의해 부가가치가 발생하는 데이터를 일정한 형태로 저장하고자 할 때 다음과 같은 요구사항을 만족시키는 시스템을 DBMS(Database Management System)라 한다.

  같은 데이터를 여러 사람이 동시에 여러 용도로 사용하도록 하기 위해 동시성/병행 제어 기능을 제공한다.

  또한, 사건 사고로 인한 데이터의 손실로부터 데이터 복구 기능을 제공한다.

- DBMS 발전

  - #### 1980년대: 관계형 데이터베이스가 상용화되어 Oracle, Sybase, DB2와 같은 제품이 사용되었다.
  - 1990년대: 객체 지향 정보를 지원하기 위해 객체 관계형 데이터베이스로 발전하였다.

- 관계형 데이터베이스

  현실적으로 기업의 핵심 데이터는 대부분 관계형 데이터베이스 구조로 저장되고 SQL 언어로 관리된다.

  관계형 데이터베이스는 정규화를 통해 데이터 이상현상(Anomaly)을 제거하여 데이터 중복을 피할 수 있게 하고, 동시성 관리, 병행 제어를 통해 많은 사용자들이 동시에 데이터를 공유 및 조작할 수 있는 기능을 제공한다.



#### SQL(Structured Query Language)

관계형 데이터베이스의 정의, 조작, 제어를 위해 사용하는 언어이다.

일차적으로는 정확한 데이터를 출력하고, 더 나아가서 튜닝을 통해 응답시간과 자원 활용을 최소화하는 효과적인 SQL문을 작성할 수 있어야 한다.

개정된 ANSI 표준을 따르면 이식성을 높일 수 있다.

- 종류
  - 데이터 조작어(DML)
  - 데이터 정의어(DDL)
  - 데이터 제어어(DCL)
  - 트랜잭션 제어어(TCL)



#### TABLE

- 테이블(Table): 데이터를 저장하는 객체. 관계형 데이터베이스의 기본 단위
- 칼럼/열(Column): 속성 (세로 방향)
- 로우/행(Row): 연결된 데이터 (가로 방향)





### 2.1.2 DDL(DATA DEFINITION LANGUAGE)

#### Data Type

|      | Data Type                            | Description                           |
| ---- | ------------------------------------ | ------------------------------------- |
| 문자 | CHAR(크기)                           | Byte 단위 고정 길이 문자              |
|      | VARCHAR2(크기)                       | Byte 단위 가변 길이 문자              |
| 숫자 | NUMBER(자릿수)                       | 정수 <br>0 ~ 999까지 자릿수를 가진다. |
|      | NUMBER(전체자릿수, 소수점이하자릿수) | 실수                                  |
| 날짜 | DATE                                 | 세기, 년, 월, 일, 시, 분, 초          |





#### CREATE

테이블 생성

```sql
CREATE TABLE 테이블명 (
    칼럼명 도메인 [제약조건],
    ...
) ;
```

테이블명, 칼럼명

- user defined name
- 변수명 지정하는 룰과 비슷함
- 특수문자는 _, $, # 만 허용
- OS에 따라 글자수 제한 있음



예제

```sql
-- 학생(학번, 이름, 생일, 연락처)
CREATE TABLE 학생 (
    학번 CHAR(5)  -- 코드의 경우 문자 타입으로 지정하여 문자형 함수 활용
  , 이름 VARCHAR2(50)  -- 한글은 Byte 넉넉하게
  , 생일 DATE
  , 전화 VARCHAR2(13)
) ;
```





#### CONSTRAINT

Domain만으로는 부족할 때 데이터 무결성을 지키기 위해 제약조건 사용

| Constraint  | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| PRIMARY KEY | 기본키 = NOT NULL & UNIQUE                                   |
| UNIQUE      | 고유키로 중복을 허용하지 않는다.                             |
| NOT NULL    | NULL 값을 허용하지 않는다. 즉, 입력 필수                     |
| CHECK       | 입력 값의 범위를 제한한다.                                   |
| FOREIGN KEY | 외래키는 다른 테이블의 기본키를 참조한다. <br>기본키와 달리 NULL 값이 허용된다. |
| DEFAULT     | 미입력시 기본값을 지정한다.                                  |



- 제약조건 생성

```sql
-- 부서(부서코드, 부서명)
-- 사원(사번, 이름, 성별, 생일, 이메일, 부서코드)

-- Column level constraint
CREATE TABLE 부서 (
    부서코드 CHAR(2) PRIMARY KEY
  , 부서명 VARCHAR2(50) NOT NULL
) ;

CREATE TALBE 사원 (
    사번 CHAR(8) PRIMARY KEY
  , 이름 VARCHAR2(50) NOT NULL
  , 성별 CHAR(1) CHECK (성별 IN ('F', 'M')) NOT NULL  -- F, M
  , 생일 DATE
  , 이메일 VARCHAR2(100) UNIQUE NOT NULL
  , 부서코드 CHAR(2) REFERENCES 부서(부서코드)
) ;
```

사원 테이블이 부서 테이블의 기본키를 외래키로 가지므로 부모 테이블인 부서 테이블부터 만들어야 한다.
자식 테이블을 먼저 만들면 참조할 테이블이 없기 때문에 에러가 발생한다.

> table or view does not exist



제약조건은 칼럼 레벨뿐만 아니라 테이블 레벨에도 기술할 수 있다.

제약조건명을 명명할 때는 일반적으로 `테이블명_칼럼명_제약조건`라는 형식을 사용한다.

```sql
-- Table level constraint
CREATE TABLE 부서 (
    부서코드 CHAR(2)
  , 부서명 VARCHAR2(50)
  , CONSTRAINT 부서_부서코드_PK PRIMARY KEY (부서코드)
  , CONSTRAINT 부서_부서명_NN CHECK ("부서명" IS NOT NULL)
) ;

CREATE TABLE 사원 (
    사번 CHAR(8)
  , 이름 VARCHAR2(50)
  , 성별 CHAR(1)
  , 생일 DATE
  , 이메일 VARCHAR2(100)
  , 부서코드 CHAR(2)
  , CONSTRAINT 사원_사번_PK PRIMARY KEY(사번)
  , CONSTRAINT 사원_이름_NN CHECK ("이름" IS NOT NULL)
  , CONSTRAINT 사원_성별_CK CHECK ("성별" IN ('F', 'M'))
  , CONSTRAINT 사원_성별_NN CHECK ("성별" IS NOT NULL)
  , CONSTRAINT 사원_이메일_UQ UNIQUE (이메일)
  , CONSTRAINT 사원_이메일_NN CHECK ("이메일" IS NOT NULL)
  , CONSTRAINT 사원_부서코드_FK FOREIGN KEY (부서코드) REFERENCES 부서(부서코드)
) ;
```



PRIMARY KEY가 복합키일 때는 테이블 레벨에서만 기술할 수 있다.

```sql
-- ORA-02260: table can have only one primary key
CREATE TABLE TT (
	A CHAR(1) PRIMARY KEY
  , B CHAR(3) PRIMARY KEY
  , C NUMBER(10)
) ;

CREATE TABLE TT (
    A CHAR(1)
  , B CHAR(3)
  , C NUMBER(10)
  , CONSTRAINT TT_PK PIRMARY KEY (A, B)
) ;
```



- 제약조건 삭제

```sql
ALTER TABLE 사원
DROP CONSTRAINT 사원_성별_CK ;
```



- 제약조건 추가

```sql
ALTER TABLE 사원
ADD CONSTRAINT 사원_성별_CK CHECK (성별 IN ('F', 'M')) ;

ALTER TABLE 사원
ADD CONSTRAINT 사원_생일_NN CHECK ("생일" IS NOT NULL) ;

-- MODIFY
ALTER TABLE 사원
MODIFY (생일 NOT NULL) ;
```



- 제약조건 활성화/비활성화

  제약 조건은 설정과 동시에 활성화된다.
  - 비활성화:  DISABLE
  - 활성화: ENABLE

```sql
ALTER TABLE 사원
DISABLE CONSTRAINT 사원_생일_NN ;

ALTER TABLE 사원
ENABLE CONSTRAINT 사원_생일_NN ;
```



- 제약조건 확인

  유저가 생성한 제약조건은 `USER_CONSTRAINTS` 테이블에 기록된다.
  모든 제약조건은 중복 안 됨
  데이터 입력시, 제약조건 에러가 발생한 테이블명을 WHERE 조건식에서 TABLE_NAME과 비교하면 어떤 제약조건을 위배했는지 확인할 수 있다.
  TABLE_NAME의 영문은 대문자 방식으로 저장되므로 주의

```sql
SELECT *
FROM USER_CONSTRAINTS
WHERE TABLE_NAME = '사원' ;
```





#### ALTER

테이블 수정

- add: 추가
- drop: 삭제
- modify: 수정
- rename column: 칼럼명 변경

```sql
-- ADD
ALTER TABLE 테이블명
ADD 추가할 칼럼명 데이터타입 ;

ALTER TABLE 학생
ADD (이메일 VARCHAR2(100), 성적 NUMBER(3)) ;

-- DROP
ALTER TABLE 테이블명
DROP 삭제할 칼럼명 ;

ALTER TABLE 학생
DROP (성적, 이메일) ;

-- MODIFY
ALTER TABLE 테이블명
MODIFY 수정할 칼럼명 수정할 데이터타입 ;

ALTER TABLE 학생
MODIFY (학번 CHAR(8)) ;

-- RENAME COLUMN
ALTER TABLE 테이블명
RENAME COLUMN 예전 이름 TO 바꿀 이름 ;

ALTER TABLE 학생
RENAME COLUMN 전화 TO 휴대폰 ;
```



#### RENAME

테이블명 변경

```sql
RENAME 예전 이름 TO 바꿀 이름 ;
```



보통 테이블명을 변경하기 보다는 별명을 붙인다.

- SYNONYM

  ```sql
  CREATE SYNONYM 별명 FOR 테이블명 ;  -- 권한 필요
  ```


#### DROP

테이블 삭제

테이블의 데이터와 스키마를 모두 삭제한다.

```sql
DROP TABLE 테이블명 ;
```



#### TRAUNCATE

테이블 비우기

테이블의 데이터만 삭제하고 스키마는 남긴다.

log가 남지 않아 `DELETE`에 비해 속도가 빠르나 복구할 수 없다.

```sql
TRUNCATE TABLE 테이블명 ;
```





### 2.1.3 DML(DATA MANIPULATION LANGUAGE)

#### INSERT

데이터 추가

```sql
INSERT INTO 테이블명[(칼럼 리스트)]
VALUES  (값 리스트) ;
```

순서가 같고 모든 내용을 넣을 경우 칼럼 리스트 생략 가능. 이 경우 정의되지 않은 미지의 값이 있으면 `NULL`로 명시한다.

칼럼 리스트를 명시할 경우 칼럼과 값이 매칭되면 순서는 상관없다. 정의하지 않은 컬럼은  `NULL`값이 입력된다.

제약조건과 도메인에 맞는 값을 넣어야 한다. 예를 들어, 제약조건에 맞지 않는 중복된 값 또는 존재하지 않는 외래키 값을 입력할 수 없다.



예제

```sql
INSERT INTO 학생(학번, 이름, 생일, 전화)
       VALUES ('111', 'aaa', '20001010', '111-222-333') ;

INSERT INTO 학생  -- 칼럼 리스트 생략
       VALUES (222, 'bbb', '19851010', '123-456-789') ;

INSERT INTO 학생
       VALUES (333, 'ccc', '19851010', NULL) ;  -- 값 없으면 NULL

-- 다른 테이블의 자료를 검색해서 일괄적으로 입력할 경우
INSERT INTO 학생
       SELECT EMPLOYEE_ID, LAST_NAME, HIRE_DATE, PHONE_NUMBER
       FROM EMP
       WHERE SALARY >= 15000 ;
       
INSERT INTO 부서
       VALUES( 10, '판매부') ;
INSERT INTO 부서
       VALUES( 20, '자재부') ;
INSERT INTO 부서
       VALUES( 30, '생산부') ;

-- "ORA-00001: unique constraint (*.사원_사번_PK) violated"
INSERT INTO 사원
       VALUES( '20180001', '홍길동', 'F', '19951010', 'a@a.com', 10 ) ;
INSERT INTO 사원
       VALUES( '20180001', '홍길동', 'F', '19951010', 'a@a.com', 10 ) ;

-- "ORA-02291: integrity constraint (*.사원_부서코드_FK) violated - parent key not found"
INSERT INTO 사원 VALUES( '20180002', '이순신', 'M', '19961010', 'b@a.com', 100 ) ;

-- Check USER_CONSTRAINTS
SELECT *
FROM USER_CONSTRAINTS
WHERE TABLE_NAME = '사원' ;
```

 



#### UPDATE

데이터 수정

```sql
UPDATE 테이블명
SET 컬럼명 = 값, ...
[WHERE 절] ;
```

`WHERE`절과 함께 사용하는 것이 용도에 적절하다.
특정 칼럼을 모두 같은 값으로 수정하는 경우는 많지 않다.



예제

```sql
UPDATE 학생
SET 이름 = 'qqq'
  , 전화 = '333-4444-5555'
WHERE 학번 = '111' ;
```



#### DELETE

데이터 삭제

```sql
DELETE [FROM] 테이블명
[WHERE 절] ;
```

`WHERE`절과 함께 사용하는 것이 용도에 적절하다.
전체 자료만 삭제하려면 `TRAUNCATE`를 사용해야 하고,
자료와 스키마 즉, 테이블 자체를 삭제하려면 `DROP`을 사용해야 한다.

```sql
DELETE FROM 학생
WHERE 학번 = '111' ;
```



#### SELECT

데이터 조회

- ALL: 기본값. 생략된다.
- DISTINCT: 중복 값이 있으면 1건으로 처리한다.
- ASTERISK(*): 모든 컬럼을 조회할 때 사용
- DUAL 테이블: 테이블이 필요 없는 쿼리문에서 임시로 지정하는 테이블

```sql
SELECT [ALL|DISTINCT] *|칼럼명|수식|함수 [[AS] 칼럼별명]
FROM 테이블명
[WHERE 절]
[GROUP BY 절]
[HAVING 절]
[ORDER BY 절] ;
```



- SELECT 문의 실행 순서
  1. FROM
  2. WHERE
  3. GROUP BY
  4. HAVING
  5. SELECT
  6. ORDER BY



예제

```sql
-- ASTERISK(*)
SELECT *
FROM EMP ;

-- 칼럼명
SELECT LAST_NAME
     , SALARY
FROM EMP ;

-- 수식
SELECT FIRST_NAME || LAST_NAME  -- '이름성'
FROM EMP ;

SELECT FIRST_NAME || ' ' || LAST_NAME  -- '이름 성'
FROM EMP ; 

-- 칼럼별명
SELECT FIRST_NAME || ' ' || LAST_NAME as NAME
FROM EMP ;

SELECT FIRST_NAME || ' ' || LAST_NAME NAME  -- AS 생략
FROM EMP ;

-- DUAL 테이블
SELECT 2 * 3
FROM DUAL ;
```





### 2.1.4 TCL(TRANSACTION CONSTROL LANGUAGE)

#### 트랜잭션 개요

- 트랜잭션
  - 논리적 연산단위. 작업단위. 업무단위.
  - 한 트랜잭션에 하나 이상의 DML 문장 포함
  - 트랜잭션은 의미적으로 분할할 수 없는 최소 단위이다.

- 트랜잭션의 특징

| Feature             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| 원자성(atomicity)   | All or nothing <br>트랜잭션에서 정의된 연산들을 모두 성공적으로 실행되던지 아니면 전혀 실행되지 않은 상태로 남아야 한다. <br>이를 위해 lock 기능을 제공한다. |
| 일관성(consistency) | 트랜잭션이 실행되기 전의 데이터베이스 내용이 잘못되어 있지 않다면 트랜잭션이 실행된 이후에도 데이터베이스 내용에 잘못이 있으면 안 된다. |
| 고립성(isolation)   | 트랜잭션이 실행되는 도중에 다른 트랜잭션의 영향을 받아 잘못된 결과를 만들어서는 안 된다. |
| 지속성(durability)  | 트랜잭션이 성공적으로 수행되면 그 트랜잭션이 갱신한 데이터베이스의 내용은 영구적으로 저장된다. |



- 트랜잭션 실행 과정

  로그인하면 트랜잭션이 실행 됨
  명시적으로 `COMMIT`해야 트랜잭션이 마감됨
  단, DML 문장 이후에 커밋 없어도 DDL 문장이 실행되면 DDL 수행 전에 자동으로 커밋된다. 그리고 새로운 트랜잭션이 실행된다.
  데이터베이스를 정상적으로 접속 종료하면 트랜잭션이 자동 커밋된다. 이상 종료로 접속이 단절되면 자동 롤백된다.

```
-- login
...

-- DML
INSERT ...
DELETE ...
...

-- DDL
(AUTO COMMIT)
CREATE ...
...

-- 명시적 COMMIT
COMMIT ;

-- logout
(AUTO COMMIT)
```



#### COMMIT

커밋: 변경된 데이터를 데이터베이스에 영구적으로 반영하라.



#### ROLLBACK

롤백: 변경된 데이터가 문제가 있으니 변경 전 데이터로 복귀하라.

커밋 전, 수행 중인 트랜잭션에서 사용 가능



#### SAVEPOINT

저장점: 데이터 변경을 사전에 지정한 저장점까지만 롤백하라

특정 `SAVEPOINT`에 대해 `COMMIT`, `ROLLBACK` 가능



TCL 사용 효과

- 데이터 무결성 보장
- 영구적인 변경 전에 데이터의 변경 사항 확인 가능
- 논리적으로 연관된 작업을 그룹핑하여 처리 가능



#### DDL vs. DML

- DDL

  Catalog 변경

  AUTO COMMIT되므로 ROLL BACK 불가

- DML

  여러 개를 묶어 처리. log가 남는다.

  명시적으로 COMMIT 전에 ROLL BACK 가능





### 2.1.5 WHERE 절

#### WHERE 조건절 개요

SELECT 문에서 데이터를 조회할 때 조건을 지정한다.

조건식의 좌항에는 칼럼명, 함수 등이 오고 우항에는 값 또는 수식이 온다.

```sql
WHERE 조건식, ...
```



#### 비교 연산자

| Comparison operator | Description                                 |
| ------------------- | ------------------------------------------- |
| =                   | 같다.                                       |
| !=, <>              | 같지 않다.                                  |
| <=, <, >=, >        | 작거나 같다. / 작다. / 크거나 같다. / 크다. |



예제

```sql
-- 숫자: 표시 형식 없이 본연의 값만 쓴다.
SELECT LAST_NAME
     , SALARY
FROM EMP
WHERE SALARY >= 15000 ;

-- 문자: 문자열을 ''로 감싼다.
SELECT *
FROM EMP
WHERE EMAIL <> 'SKING' ;

-- 날짜: '연도월일'
SELECT *
FROM EMP
WHERE HIRE_DATE = '20030617' ;

-- 일반적인 날짜 형식이 아닐 경우 TO_DATE('문자열', '패턴') 사용
SELECT *
FROM EMP
WHERE HIRE_DATE = TO_DATE('09-21-2005', 'MM-DD-YYYY') ;
```



#### SQL 연산자

| SQL operator        | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| BETWEEN 값1 AND 값2 | 값을 포함하는 범위 연산                                      |
| IN (값 리스트)      | 목록 안의 값만 포함                                          |
| LIKE '패턴'         | 패턴 연산자 <br>%: 여러 문자를 모를 경우 사용 <br>_: 한 문자를 모를 경우 사용 |
| IS NULL             | NULL 값 비교시 사용                                          |



예제

```sql
-- BETWEEN ... AND ...
SELECT LAST_NAME
     , SALARY
FROM EMP
WHERE 1000 <= SALARY AND SALARY <= 15000 ;

SELECT LAST_NAME, SALARY
FROM EMP
WHERE SALARY BETWEEN 10000 AND 15000 ;

-- IN
SELECT LAST_NAME, DEPARTMENT_ID
FROM EMP
WHERE DEPARTMENT_ID = 10
      OR DEPARTMENT_ID = 40
      OR DEPARTMENT_ID = 50 ;

SELECT LAST_NAME, DEPARTMENT_ID
FROM EMP
WEHRE DEPARTMENT_ID IN (10, 40, 50) ;

-- LIKE
SELECT *
FROM EMP
WHERE EMAIL LIKE 'S%' ;

SELECT *
FROM EMP
WHERE EMAIL LIKE '__E%' ;

-- IS NULL
SELECT *
FROM EMP
WHERE COMMISION_PCT IS NULL ;
```





#### 논리 연산자

- AND
- OR
- NOT





#### 부정연산자

- NOT BETWEEN ... AND ...
- NOT LIKE
- NOT IN
- IS NOT





### 2.1.6 함수(FUNCTION)

#### 단일 행 함수

내장 함수로 단일 행 함수와 다중 행 함수를 제공한다.

단일 행 함수는 하나의 칼럼에 사용하는 함수이다.

`SELECT`, `WHERE`, `ORDER BY` 절에 사용 가능하다.



#### 문자형 함수

| Function                         | Description                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| LOWER('문자열')                  | 소문자로 변환                                                |
| UPPER('문자열')                  | 대문자로 변환                                                |
| INITCAP('문자열')                | 첫 글자만 대문자로 변환                                      |
| LENGTH(칼럼명)                   | 문자열 갯수 반환. 영문자, 숫자, 한글, 공백, 특수문자 모두 1글자로 인식 |
| TRIM(['지정문자' FROM ]'문자열') | 문자 앞 뒤의 공백을 제거하고 문자 중간의 공백을 유지 <br>옵션으로 특정 문자를 넣으면 해당 문자를 앞 뒤에서 제거 |
| SUBSTR(칼럼명, 시작위치, 글자수) | 문자열 중 시작 위치부터 글자수만큼 추출                      |
| INSTR(칼럼명, '찾는 문자')       | 찾는 문자의 첫 번째 위치 인덱스 반환 <br>찾는 문자가 없으면 0 반환 |



예제

```sql
-- LOWER, UPPER, INITCAP
SELECT *
FROM EMP
WHERE LAST_NAME = INITCAP('CHEN') ;  -- 한 문자열 프로세싱. 가장 효율적

SELECT *
FROM EMP
WHERE UPPER(LAST_NAME) = 'CHEN' ;  -- 전체 행 프로세싱

SELECT *
FROM EMP
WHERE LOWER(LAST_NAME) = LOWER('CHEN') ;  -- 전체 행 + 한 문자열 프로세싱

-- LENGTH
SELECT EMAIL
     , LENTH(EMAIL)
FROM EMP ;

-- TRIM
SELECT TRIM('   ASDF  QWER  ')
FROM DUAL ;  -- 'ASDF  QWER'

-- SUBSTR
SELECT JOB_ID
     , SUBSTR(JOB_ID, 1, 2)
     , SUBSTR(JOB_ID, -3)  -- 뒤에서부터 3자리
FROM EMP ;

-- INSTR
SELECT JOB_ID
     , SUBSTR(JOB_ID, 1, INSTR(JOB_ID, '_') - 1) "_ 앞 문자열"
     , SUBSTR(JOB_ID, INSTR(JOB_ID, '_') + 1) "_ 뒤 문자열"
FROM EMP ;
```



#### 숫자형 함수

| Function              | Description                      |
| --------------------- | -------------------------------- |
| MOD(숫자1, 숫자2)     | 숫자1을 숫자2로 나눈 나머지      |
| ROUND(숫자[, 자릿수]) | 숫자를 자릿수 + 1에서 반올림     |
| TRUNC(숫자[, 자릿수]) | 숫자를 자릿수 + 1에서 자름(내림) |



예제

```sql
-- MOD
SELECT MOD(5, 2)
FROM DUAL ;

-- ROUND
SELECT ROUND(123.4567, 2)
     , ROUND(123.4567, 0)
     , ROUND(123.4567, -2)
FROM DUAL ;

-- TRUNC
SELECT TRUNC(123.4567, 2)
     , TRUNC(123.4567, 0)
     , TRUNC(123.4567, -2)
FROM DUAL ;
```



#### 날짜형 함수

| Function                                | Description              |
| --------------------------------------- | ------------------------ |
| SYSDATE                                 | 현재 날짜와 시각 출력    |
| EXTRACT(YEAR\|MONTH\|DAY FROM 날짜칼럼) | 결과값은 숫자 타입       |
| +/-                                     | 일 단위로 연산           |
| ADD_MONTHS(날짜칼럼, [+\|-]개월수)      | 개월 단위로 연산         |
| MONTHS_BETWEEN(최근날짜, 예전날짜)      | 두 날짜 사이의 월수 계산 |
| LAST_DAY(날짜칼럼)                      | 해당 달의 말일           |
| ROUND(날짜칼럼, 'DAY'\|'MONTH'\|'YEAR') | 기준에 맞춰 반올림       |
| TRUNC(날짜칼럼, 'DAY'\|'MONTH'\|'YEAR') | 기준에 맞춰 내림         |



예제

```sql
-- SYSDATE
SELECT TO_CHAR(SYSDATE, 'YYYY/MM/DD HH:MI:SS AM DAY')
FROM DUAL ;  -- 18/08/23 01:42:55 오후 목요일

-- EXTRACT
SELECT LAST_NAME
     , EXTRACT(YEAR FROM HIRE_DATE) 입사년도
FROM EMP ;

-- +/-
SELECT HIRE_DATE
     , HIRE_DATE + 10
     , HIRE_DATE - 10
FROM EMP ;

-- ADD_MONTHS
SELECT HIRE_DATE
     , ADD_MONTHS(HIRE_DATE, 3)
     , ADD_MONTHS(HIRE_DATE, -3)
FROM EMP ;

-- MONTHS_BETWEEN
SELECT LAST_NAME
     , TRUNC(SYSDATE - HIRE_DATE) 근속일수
     , TRUNC(MONTHS_BETWEEN(SYSDATE, HIRE_DATE)) 근속월수
FROM EMP ;

-- LAST_DAY
SELECT HIRE_DATE
     , LAST_DAY(HIRE_DATE)
FROM EMP ;

-- ROUND, TRUNC
SELECT HIRE_DATE,
       ROUND(HIRE_DATE, 'DAY')  -- 03/06/15 -> 03/07/01
     , ROUND(HIRE_DATE, 'MONTH')  -- 03/06/17 -> 03/07/01
     , ROUND(HIRE_DATE, 'YEAR')  -- 05/09/18 -> 06/01/01
FROM EMP ;
```





#### 변환 함수

명시적/암시적 형변환 기능을 제공한다.

| Function                    | Description                                     |
| --------------------------- | ----------------------------------------------- |
| TO_NUMBER('문자열')         | 숫자형태의 문자열을 숫자 타입로 변환            |
| TO_DATE('문자열', '패턴')   | 문자열을 주어진 패턴에 맞는 날짜 타입으로 변환  |
| TO_CHAR(숫자\|날짜, '패턴') | 숫자 또는 날짜를 패턴에 맞춰 문자 타입으로 변환 |



예제

```sql
-- TO_NUMBER
SELECT TO_NUMBER('1') + 10
FROM DUAL ;

-- TO_DATE
SELECT TO_DATE('20001010', 'YYYYMMDD')
FROM DUAL ;

-- TO_CHAR
SELECT SYSDATE
     , TO_CHAR(SYSDATE, 'D')  -- 요일(숫자)
     , TO_CHAR(SYSDATE, 'DDD')  -- 일수
FROM DUAL ;
```





#### CASE 표현

IF문과 유사한 기능 제공

```sql
-- SIMPLE_CASE_EXPRESSION
SELECT LAST_NAME
     , DEPARTMENT_ID
     , SALARY
     , CASE DEPARTMENT_ID WHEN 10 THEN SALARY*2
                          WHEN 20 THEN SALARY*3
                          WHEN 30 THEN SALARY*4
                          ELSE SALARY
                          END AS BONUS
FROM EMP ;

-- SEARCHED_CASE_EXPRESSION
SELECT LAST_NAME  
     , CASE WHEN SALARY >= 3000 THEN 'HIGH'  
            WHEN SALARY >= 1000 THEN 'MID'  
            ELSE 'LOW'
            END AS SALARY_GRADE   
  FROM EMP;
  
-- DECODE
SELECT LAST_NAME
     , DEPARTMENT_ID
     , SALARY
     , DECODE(DEPARTMENT_ID, 10, SALARY * 2,
                             20, SALARY * 3,
                             30, SALARY * 4,
                             SALARY) AS BONUS
FROM EMP ;
```



#### NULL 관련 함수

아직 입력되지 않은 미지의 값으로 0 또는 공백과 다르다.

NULL이 연산에 포함되면 결과가 NULL이 된다.

이 문제를 해결하려면 `NVL`/`ISNULL` 함수를 사용한다.

NULL 값이 논리연산식에 포함되면 결과는 경우에 따라 다르다.



| Function                                    | Description                                                  |
| ------------------------------------------- | ------------------------------------------------------------ |
| NVL(칼럼명, NULL인 경우 대체값)             | NULL인 경우 대체값을 반환                                    |
| ISNULL(칼럼명, NULL인 경우 대체값)          | 위와 같음                                                    |
| NVL2(칼럼명, NULL이 아닌 경우, NULL인 경우) | NULL이 아닌 경우와 NULL인 경우의 대체값 반환                 |
| NULLIF(값1, 값2)                            | 값1과 값2가 같으면 NULL 반환, 다르면 값1 반환                |
| COALESCE(값 리스트)                         | NULL이 아닌 최초의 표현식 반환 <br>모든 표현식이 NULL이면 NULL 반환 |



예제

```sql
-- NVL
SELECT LAST_NAME
     , SALARY
     , SALARY + (SALARY * NVL(COMMISION_PCT, 0)) 실지급액
FROM EMP ;

-- NVL2
SELECT COMMISION_PCT
     , NVL2(COMMISSION_PCT, '수당받음', '수당없음') 수당여부
FROM EMP ;

-- NULLIF
SELECT NULLIF('aa', 'aa')  -- NULL
     , NULLid('aa', 'bb')  -- 'aa'
FROM DUAL ;

-- COALESCE
SELECT COALESCE(10, 20, 30)  -- 10
     , COALESCE(NULL, 20, 30)  -- 20
     , COALESCE(NULL, NULL, 30)  -- 30
FROM DUAL ;
```





### 2.1.7 GROUP BY, HAVING 절

#### 집계 함수(Aggregate Function)

다중 행 함수에 속하는 집계 함수는 그룹 당 단 하나의 결과를 돌려주는 함수이다.

데이터 전체를 집계할 경우에는 `GROUP BY`절을 없이도 사용할 수 있다.

집계함수는 NULL을 제외하고 수행된다.

- COUNT
- SUM
- AVG
- MAX
- MIN



#### GROUP BY 절

행을 그룹화하여 그룹에 대한 통계 정보를 얻을 때 주로 사용한다.

`SELECT` 절에 기술된 일반 칼럼은 반드시 `GROUP BY` 절에 기술되어 있어야 한다.

정렬된 결과를 보여주기 위해 `ORDER BY` 절과 함께 사용된다.

```sql
GROUP BY 칼럼명|표현식 ;
```



#### HAVING 절

`GROUP BY` 절에 의해 만들어진 그룹에 대해 조건을 적용한다.

`HAVING` 절에서는 집계 함수를 사용할 수 있다.

`HAVING` 절을 `GROUP BY` 절 이전으로 순서를 바꿔도 실행에 문제 없다.

```sql
HAVING 그룹조건식 ;
```



예제

```sql
-- 집계 함수
SELECT COUNT(*)
FROM EMP ;

-- GROUP BY
SELECT DEPARTMENT_ID
     , JOB_ID
     , COUNT(*) "부서직군별 근무인원"
FROM EMP
GROUP BY DEPARTMENT_ID
       , JOB_ID
ORDER BY DEPARTMENT_ID
       , JOB_ID ;
       
-- Error
SELECT DEPARTMENT_ID
     , JOB_ID  -- GROUP BY와 함께 기술되지 않은 일반 속성
FROM EMP
GROUP BY DEPARTMENT_ID
ORDER BY DEPARTMENT_ID ;

-- HAVING
SELECT EXTRACT(YEAR FROM HIRE_DATE) "연도"
     , COUNT(*) "연도별 입사인원수"
FROM EMP
GROUP BY EXTRACT(YEAR FROM HIRE_DATE)  -- 별명 사용 불가
HAVING COUNT(*) >= 20  -- 별명 사용 불가
ORDER BY "연도별 인사인원수" DESC ;
```



### 2.1.8 ORDER BY 절

#### ORDER BY

특정 칼럼을 기준으로 정렬한다. 이때, 칼럼명, 벌명, 인덱스를 혼용할 수 있다.

기본값은 오름차순(ASC)로 생략 가능하다. 반대는 내림차순(DESC)을 사용한다.

```sql
ORDER BY 칼럼명|별명|인덱스 ;
```



예제

```sql
SELECT DEPARTMENT_ID
     , LAST_NAME
     , SALARY
FROM EMP
ORDER BY DEPARTMENT_ID
       , SALARY DESC ;

SELECT DEPARTMENT_ID
     , LAST_NAME
     , SALARY
FROM EMP
ORDER BY 1, 3 DESC ;
```



#### SELECT 문 실행 순서

```sql
5 SELECT  -- 데이터 출력/계산
1 FROM  -- 테이블 참조
2 WHERE  -- 데이터 조건 적용
3 GROUP BY  -- 데이터 행 그룹화
4 HAVING  -- 그룹 조건 적용
5 ORDER BY  -- 데이터 정렬
```



#### TOP N 쿼리

`ROWNUM`은 pseudo column으로 1부터 시작한다.

```sql
SELECT LAST_NAME
     , SALARY
FROM EMP
WHERE ROWNUM < 4
ORDER BY SALARY DESC ;
```





### 2.1.9 조인(JOIN)

#### JOIN 개요

정규화를 통해 분할된 여러 테이블로부터 조회할 때 `JOIN`을 이용하여 연관관계를 성립시킨다.

테이블 N개로부터 조회할 경우 N - 1번 `JOIN`한다.



#### EQUI JOIN

두 테이블 간에 칼럼 값들이 서로 정확하게 일치하는 경우 사용한다.

PK-FK 관계를 기반으로 한다.

- `USING` 조건절: 기준 칼럼명이 같을 때 사용한다. 단, 테이블명이나 별명과 같은 접두사를 붙일 수 없다.
- `ON` 조건절: 기준 칼럼명이 달라도 사용할 수 있다.  단, 접두사를 명확하게 지정해야 한다.

```sql
-- USING
FROM 테이블1 JOIN 테이블며2 USING(기준 칼럼 리스트) ;

-- ON
FROM 테이블1 JOIN 테이블2 ON 테이블1.칼럼1 = 테이블2.칼럼2 ;
```



예제

```sql
-- ORACLE
SELECT LAST_NAME
     , SALARY
     , DEPARTMENT_NAME
FROM EMP, DEPT
WHERE EMP.DEPARTMENT_ID = DEPT.DEPARTMENT_ID ;

-- ANSI 표준
SELECT LAST_NAME
     , SALARY
     , DEPARTMENT_NAME
FROM EMP JOIN DEPT USING(DEPARTMENT_ID) ;
```



#### NON EQUI JOIN

두 테이블 간에 칼럼 값들이 서로 정확하게 일치하지 않을 때 범위로 연산하는 경우 사용한다.



예제

```sql
SELECT E.LAST_NAME
     , E.SALARY
     , J.GRADE_LEVEL
FROM EMP E JOIN JOB_GRADES J
     ON E.SALARY BETWEEN J.LOWEST_SAL AND J.HIGHEST_SAL ;
```



#### 3개 이상 테이블 JOIN

3개 이상의 테이블로부터 조회하더라도 `JOIN`은 두 테이블간에 일어난다.



예제

```sql
-- ORACLE
SELECT *
FROM EMP E, DEPT D, LOCATIONS L
WHERE E.DEPARTMENT_ID = D.DEPARTMENT_ID
      AND D.LOCATION_ID = L.LOCATION_ID ;

-- ANSI 표준
SELECT *
FROM EMP E JOIN DEPT USING(DEPARTMENT_ID)
     JOIN LOCATIONS USING(LOCATION_ID) ;
     
SELECT *
FROM EMP E JOIN DEPT
     ON E.DEPARTMENT_ID = D.DEPARTMENT_ID
     JOIN LOCATIONS
     ON D.LOCATION_ID = L.LOCATION_ID ;
```





## 2.2 SQL 활용

### 2.2.1 표준 조인(STANDARD JOIN)

#### STANDARD SQL 개요

현재 기업형 DBMS는 순수 관계형 데이터베이스가 아닌 객체 지원 기능이 포함된 객체관계형(Object Relational) 데이터베이스를 대부분 사용하고 있다.

- 1986: SQL1. ANSI 표준 최초 제정
- 1992: SQL2. 차이가 크고 상호 호환 불가
- 1999: SQL3. 호환 가능한 여러 기준 제정



#### INNER JOIN

`EQUI JOIN`과 `NON EQUI JOIN`이 속한다.

`OUTER JOIN`과 대비되는 JOIN으로 동일한 값이 있는 행만 반환한다.



#### NATURAL JOIN

두 테이블 간의 동일한 이름을 갖는 모든 칼럼들에 대해 `EQUI JOIN` 수행
기준 칼럼에 테이블명이나 별명과 같은 접두사를 붙일 수 없다. 다른 칼럼에는 붙여도 상관 없다.

별도의 칼럼 순서를 지정하지 않으면 기준 칼럼이 다른 칼럼보다 먼저 출력된다.
단, on을 사용하면 테이블을 합친 순서대로 2번 출력된다.

SQL SERVER는 지원하지 않음



예제

```sql
SELECT DEPARTMENT_ID
     , EMP.EMPLOYEE_ID
     , EMP.LAST_NAME
     , DEPT.DEPARTMENT_NAME
FROM EMP NATURAL JOIN DEPT ;

-- ORA-25155: column used in NATURAL join cannot have qualifier
SELECT EMP.DEPARTMENT_ID
     , EMPLOYEE_ID
     , LAST_NAME
     , DEPARTMENT_NAME
FROM EMP NATURAL JOIN DEPT ;
```



#### CROSS JOIN

M*N 데이터 조합이 발생한다. 이 때문에 오버플로우가 일어날 수 있다.

튜닝이나 리포트를 작성하기 위해 고의적으로 사용하는 경우가 있다.



예제

```sql
SELECT LAST_NAME
     , DEPARTMENT_NAME
FROM EMP CROSS JOIN DEPT
ORDER BY LAST_NAME ;
```





#### OUTER JOIN

`INNER JOIN`과 대비되는 JOIN으로 동일한 값이 없는 행을 반환하고자 할 때 사용한다.

- `LEFT (OUTER) JOIN`
- `RIGHT (OUTER) JOIN`
- `FULL (OUTER) JOIN`: `LEFT JOIN` + `RIGHT JOIN`

- `(+)`: LEFT JOIN과 RIGHT JOIN 대신 사용할 수 있다. `(+)`를 붙인 테이블에 NULL이 있어도 빠짐없이 모두 보여준다.



예제

```sql
-- EMP 테이블에는 부서가 없는 사원이 존재한다.
-- DEPT 테이블에는 사원이 없는 부서가 존재한다.

-- LEFT JOIN
SELECT LAST_NAME
     , DEPARTMENT_ID
     , DEPARTMENT_NAME
FROM EMP LEFT JOIN DEPT USING(DEPARTMENT_ID) ;  -- 부서 없는 사원 출력

SELECT LAST_NAME
     , DEPARTMENT_ID
     , DEPARTMENT_NAME
FROM EMP, DEPT
WHERE EMP.DEPARTMENT_ID = DEPT.DEPARTMENT_ID(+) ;

-- RIGHT JOIN
SELECT LAST_NAME
     , DEPARTMENT_ID
     , DEPARTMENT_NAME
FROM EMP RIGHT JOIN DEPT USING(DEPARTMENT_ID) ; -- 사원 없는 부서 출력

SELECT LAST_NAME
     , DEPARTMENT_ID
     , DEPARTMENT_NAME
FROM EMP, DEPT
WHERE EMP.DEPARTMENT_ID(+) = DEPT.DEPARTMENT_ID ;

-- FULL JOIN
SELECT LAST_NAME
     , DEPARTMENT_ID
     , DEPARTMENT_NAME
FROM EMP, DEPT
WHERE EMP FULL JOIN DEPT USING(DEPARTMENT_ID) ;  -- 전체 결과 출력
```



### 2.2.2 집합 연산자(SET OPERATOR)

서로 다른 테이블에서 유사한 형태의 결과를 반환하는 것을 하나로 합치고자 할 때 그리고 동일 테이블에서 서로 다른 질의를 수행하여 결과를 합치고자 할 때 사용한다.

SELECT 절의 칼럼수가 동일하고 데이터 타입이 상호 호환 가능해야 한다.

| Set Operator | Description                           |
| ------------ | ------------------------------------- |
| UNION        | 합집합. 중복된 행은 한 번만 출력한다. |
| UNION ALL    | 합집합. 중복된 행도 그대로 표시된다.  |
| INTERSECT    | 교집합                                |
| EXCEPT/MINUS | 차집합                                |



#### UNION
```sql
SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE TEAM_ID = 'K02'

UNION

SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE TEAM_ID = 'GK' ;
```


#### UNION ALL
```sql
SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE TEAM_ID = 'K02'

UNION ALL

SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE TEAM_ID = 'GK' ;
```



#### INTERSECT

```sql
SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE TEAM_ID = 'K02'

INTERSECT

SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE POSITION = 'MF'
ORDER BY 1, 2, 3, 4, 5 ;
```



- 다른 표현
  - <>: 한 칼럼의 정확한 값 비교
  - NOT IN: 여러 칼럼의 정확한 값 비교
  - NOT EXIST: 여러 칼럼의 존재 여부 확인 (존재 여부만 체크시 성능 좋다.)

```sql
-- <>
SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE TEAM_ID = 'K02'
      AND POSITION <> 'MF'
ORDER BY 1, 2, 3, 4, 5 ;

-- NOT IN
-- <>
SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE TEAM_ID = 'K02'
      AND PLAYER_ID NOT IN (SELECT PLAYER_ID
                            FROM PLAYER
                            WHERE POSITION = 'MF')
ORDER BY 1, 2, 3, 4, 5 ;

-- NOT EXISTS
SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER X
WHERE TEAM_ID = 'K02'
      AND NOT EXISTS (SELECT 1
                      FROM PLAYER Y
                      WHERE Y.PLAYER_ID = X.PLAYER_ID
                            AND POSITION = 'MF')
ORDER BY 1, 2, 3, 4, 5 ;
```



#### EXCEPT/MINUS

```sql
SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE TEAM_ID = 'K02'

MINUS

SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE POSITION = 'MF'
ORDER BY 1, 2, 3, 4, 5 ;
```





### 2.2.3 계층형 질의와 셀프 조인

#### 계층형 질의

계층형 데이터란 동일 테이블에 계층적으로 상위와 하위 데이터가 포함된 데이터를 말한다.

엔터티를 순환관계 데이터 모델로 설계할 경우 계층형 데이터가 발생한다.

```sql
WHERE 조건
START WITH 조건
CONNECT BY PRIOR 조건
[ORDER SIBLINGS BY] ;
```

- START WITH (액세스)
  계층 구조 전개의 시작 위치 지정
  생략 하면 루트부터 시작

- CONNECT BY (조인)
  다음에 전개될 자식 데이터 지정

  - PRIOR
    CONNECT BY 절에 사용되며 현재 읽은 칼럼을 지정
    `PRIOR 자식 = 부모` 형태로 사용하면 순방향 전개한다.
    `PRIOR 부모 = 자식` 형태로 사용하면 역방향 전개한다.

- ORDER SIBLINGS BY
  형제 노드(동일 LEVEL) 사이에서 정렬 수행

- WHERE (필터링)

  모든 전개를 수행한 후에 지정된 조건을 만족하는 데이터만 추출



- 가상 칼럼

| Pseudo Column     | Description                                    |
| ----------------- | ---------------------------------------------- |
| LEVEL             | 1부터 시작                                     |
| CONNECT_BY_ISLEAF | 해당 데이터가 리프 데이터면 1, 그렇지 않으면 0 |



- 함수

| Function                                  | Description                                        |
| ----------------------------------------- | -------------------------------------------------- |
| SYS_CONNECT_BY_PATH(칼럼명, '경로분리자') | 루트 데이터로부터 현재 전개할 데이터까지 경로 표시 |
| CONNECT_BY_ROOT 칼럼명                    | 현재 전개할 데이터의 루트 데이터 표시              |



예제
```sql
-- 순방향: 자식 = 부모
SELECT LEVEL
     , LPAD(' ', 4 * (LEVEL-1)) || EMPNO 사원
     , MGR 관리자
     , CONNECT_BY_ISLEAF ISLEAF
FROM EMP
START WITH MGR IS NULL  -- 생략 가능
CONNECT BY PRIOR EMPNO = MGR ;  -- 사원 = 매니저

-- 역방향: 부모 = 자식
SELECT LEVEL
     , LPAD(' ', 4 * (LEVEL-1)) || EMPNO 사원
     , MGR 관리자
     , CONNECT_BY_ISLEAF ISLEAF
FROM EMP
START WITH EMPNO = '7876'
CONNECT BY PRIOR MGR = EMPNO ;  -- 매니저 = 사원

-- 함수
SELECT CONNECT_BY_ROOT(EMPNO) 루트사원
     , SYS_CONNECT_BY_PATH(EMPNO, '/') 경로
     , EMPNO 사원
     , MGR 관리자
FROM EMP
START WITH MGR IS NULL
CONNECT BY PRIOR EMPNO = MGR ;
```



#### 셀프 조인

ALIAS를 통해 동일한 테이블을 복사해서 조인

```sql
SELECT ALIAS명1.칼럼명, ALIAS명2.칼럼명,
FROM 테이블1 ALIAS명1, 테이블2 ALIAS명2
WHERE ALIAS명1.칼럼명2 = ALIAS명2.칼럼명2 ;
```



예제

```sql
-- SELF JOIN
SELECT E1.EMPNO 사원번호
     , E1.ENAME 사원이름
     , E2.ENAME 상사이름
FROM EMP E1, EMP E2
WHERE E1.MGR = E2.EMPNO
ORDER BY E1.EMPNO ;

SELECT E1.EMPNO 사원
     , E1.MGR 관리자
     , E2.MGR 차상위_관리자
FROM EMP E1 LEFT OUTER JOIN EMP E2
         ON (E1.MGR = E2.EMPNO)
ORDER BY E2.MGR DESC, E1.MGR, E1.EMPNO ;
```



### 2.2.4 서브쿼리

서브쿼리가 메인쿼리에 포함되는 종속 관계
괄호로 묶여져 있어 먼저 실행된다.
서브쿼리는 메인쿼리의 칼럼을 모두 사용할 수 있지만 메인 쿼리는 서브쿼리의 칼럼을 사용할 수 없다. 단, 예외적으로 Inline View에 정의된 칼럼은 사용할 수 있다. 또한 SELECT 절에서 넘겨준 값들은 사용할 수 있다.

- 위치
  - WHERE 절: Nested Subquery
  - FROM 절: Inline View
  - SELECT 절: Scalar Subquery
  - ...


예제

```sql
SELECT ROWNUM
     , ENAME
     , SAL
FROM (SELECT ENAME
           , SAL
      FROM EMP
      ORDER BY SAL DESC)
WEHRE ROWNUM <= 5 ;
```



- SUB QUERY vs. JOIN
  조인은 두 개의 테이블 위치를 바꾸어 보더라도 같은 결과가 나오지만 서브쿼리의 경우는 주종의 관계이므로 일반적으로 다른 결과가 나온다.
  서브쿼리를 집합적 개념을 사용할 수 있는 조인으로 바꾸는 것을 권고한다.


- 서브쿼리의 종류

|                      | Subquery                        | Description                                                  |
| -------------------- | ------------------------------- | ------------------------------------------------------------ |
| 반환되는 데이터 형태 | Single Row(단일행) 서브쿼리     | 실행 결과가 항상 1건 <br>단일행 비교 연산자(=, <, <=, >, >=, !=, <>)와 함께 사용 |
|                      | Multi Row(다중행) 서브쿼리      | 실행 결과가 여러 건 <br>다중행 비교 연산자(IN, ALL, ANY, SOME, EXISTS)와 함께 사용 <br>단일행 비교 연산자와 혼용 가능 (e.g. >= ANY) |
|                      | Multi Column(다중칼럼) 서브쿼리 | 실행 결과가 여러 칼럼 <br>메인 쿼리의 조건절에서 여러 칼럼을 동시에 비교할 수 있다. 이때, 비교하고자 하는 칼럼의 개수와 위치가 동일해야 한다. |
| 동작 방식            | Un-Correlated(비연관) 서브쿼리  | 서브쿼리가 메인쿼리의 칼럼을 가지고 있지 않는 형태 <br>메인 쿼리에 값을 제공하기 위한 목적으로 주로 사용 |
|                      | Correlated(연관) 서브쿼리       | 서브쿼리가 메인 쿼리의 칼럼을 가지고 있는 형태 <br>메인 쿼리가 먼저 수행되어 읽혀진 데이터를 서브쿼리에서 조건이 맞는지 확인하려는 목적으로 주로 사용 |



#### 단일 행 서브쿼리

```sql
SELECT PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
FROM PLAYER
WHERE TEAM_ID = (SELECT TEAM_ID
                 FROM PLAYER
                 WHERE PLAYER_NAME = '정남일')
ORDER BY PLAYER_NAME ;

SELECT PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
FROM PLAYER
WHERE HEIGHT <= (SELECT AVG(HEIGHT)
                 FROM PLAYER)
ORDER BY PLAYER_NAME ;
```


#### 다중 행 서브쿼리

- 다중행 비교 연산자

| Operator                  | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| IN (서브쿼리)             | 서브쿼리 결과에 존재하는 임의의 값과 동일한 조건 (Multiple OR 조건) |
| 비교연산자 ALL (서브쿼리) | 서브쿼리의 결과에 존재하는 모든 값을 만족하는 조건 <br>비교연산자로 `>`를 사용했다면 서브쿼리 결과의 최대값보다 큰 모든 행이 조건을 만족한다. |
| 비교연산자 ANY (서브쿼리) | 서브쿼리의 결과에 존재하는 어느 하나의 값이라도 만족하는 조건 <br>비교연산자로 `>`를 사용했다면 서브쿼리 결과의 최소값보다 큰 모든 행이 조건을 만족한다. <br>SOME과 동일 |
| EXISTS (서브쿼리)         | 서브쿼리의 결과를 만족하는 값이 존재하는지 여부를 확인하는 조건 <br>즉 1건만 찾으면 더이상 진행하지 않는다. <br>서브쿼리의 데이터가 필요한 경우가 아니면 SELECT 절에 1, 'X' 같은 의미없는 상수값을 사용한다. <br>EXISTS 연산자의 왼쪽에는 칼럼명이나 상수를 표시하지 않는다. <br>항상 연관 서브쿼리로 사용한다. |



```sql
-- ORA-01427: single-row subquery returns more than one row
SELECT REGION_NAME 연고지명
     , TEAM_NAME 팀명
     , E_TEAM_NAME 영문팀명
FROM TEAM
WHERE TEAM_ID = (SELECT TEAM_ID
                  FROM PLAYER
                  WHERE PLAYER_NAME = '정현수')
ORDER BY TEAM_NAME ;

-- IN
SELECT REGION_NAME 연고지명
     , TEAM_NAME 팀명
     , E_TEAM_NAME 영문팀명
FROM TEAM
WHERE TEAM_ID IN (SELECT TEAM_ID
                  FROM PLAYER
                  WHERE PLAYER_NAME = '정현수')
ORDER BY TEAM_NAME ;

-- ANY
SELECT LAST_NAME, SALARY
FROM EMP
WHERE SALARY >= ANY (SELECT ROUND(AVG(SALARY), 0)
                     FROM EMP1
                     GROUP BY DEPARTMENT_ID ) ;  -- 결과 50행

-- ALL
SELECT LAST_NAME, SALARY
FROM EMP
WHERE SALARY >= ALL (SELECT ROUND(AVG(SALARY), 0)
                     FROM EMP1
                     GROUP BY DEPARTMENT_ID ) ;  -- 결과 1행
                     
-- EXISTS
SELECT STADIUM_ID
     , STADIUM_NAME
FROM STADIUM
WHERE EXISTS (SELECT 1
              FROM SCHEDULE
              WHERE SCHE_DATE BETWEEN '20120501' AND '20120521') ;
```



#### 다중 칼럼 서브쿼리

```sql
SELECT TEAM_ID 팀코드
     , PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM PLAYER
WHERE (TEAM_ID, HEIGHT) IN (SELECT TEAM_ID, MIN(HEIGHT)
                            FROM PLAYER
                            GROUP BY TEAM_ID)
ORDER BY TEAM_ID, PLAYER_NAME ;
```


#### 연관 서브쿼리

```sql
SELECT T.TEAM_NAME 팀명
     , M.PLAYER_NAME 선수명
     , M.POSITION 포지션
     , M.BACK_NO 백넘버
     , M.HEIGHT 키
FROM PLAYER M, TEAM T
WHERE M.TEAM_ID = T.TEAM_ID
AND M.HEIGHT < (SELECT AVG(S.HEIGHT)
                FROM PLAYER S
                WHERE S.TEAM_ID = M.TEAM_ID  -- 메인쿼리의 칼럼
                AND S.HEIGHT IS NOT NULL
                GROUP BY S.TEAM_ID)
ORDER BY 선수명 ;
```


#### 그 밖의 위치에서 사용하는 서브쿼리

- SELECT 절

  Scala Subquery

  1 ROW, 1 COLUMN (단일값) 리턴

```sql
SELECT PLAYER_NAME 선수명
     , HEIGHT 키
     , ROUND((SELECT AVG(HEIGHT)
              FROM PLAYER X
              WHERE X.TEAM_ID = P.TEAM_ID)) 팀평균키
FROM PLAYER P ;
```


  - FROM 절

    Inline View, Dynamic View

    테이블 명이 올 수 있는 곳에 사용하고 중첩이 가능하다.
```sql
SELECT T.TEAM_NAME 팀명
     , P.PLAYER_NAME 선수명
     , P.BACK_NO 백넘버
FROM (SELECT TEAM_ID, PLAYER_NAME, BACK_NO
      FROM PLAYER
      WHERE POSITION = 'MF') P, TEAM T
WHERE P.TEAM_ID = T.TEAM_ID
ORDER BY 선수명 ;
```
	인라인 뷰에서는 ORDER BY 절을 사용할 수 있다. 인라인 뷰에 먼저 정렬을 수행하고 정렬된 결과 중 일부 데이터를 추출하는 것은 TOP-N 쿼리라고 한다.

```sql
-- Oracle
SELECT PLAYER_NAME 선수명
     , POSITION 포지션
     , BACK_NO 백넘버
     , HEIGHT 키
FROM (SELECT PLAYER_NAME, POSITION, BACK_NO, HEIGHT
      FROM PLAYER
      WHERE HEIGHT IS NOT NULL
      ORDER BY HEIGHT DESC)
WHERE ROWNUM <= 5 ;

-- SQL Server
SELECT TOP(5) PLAYER NAME AS 선수명
     , POSITION AS 포지션
     , BACK_NO AS 백넘버
     , HEIGHT AS 키
FROM PLAYER
WHERE HEIGHT IS NOT NULL
ORDER BY HEIGHT DESC ;
```


  - HAVING 절
```sql
SELECT P.TEAM_ID 팀코드
     , T.TEAM_NAME 팀명
     , ROUND(AVG(P.HEIGHT), 2) 평균키
FROM PLAYER P, TEAM T
WHERE P.TEAM_ID = T.TEAM_ID
GROUP BY P.TEAM_ID, T.TEAM_NAME
HAVING AVG(P.HEIGHT) < (SELECT AVG(HEIGHT)
                        FROM PLAYER
                        WHERE TEAM_ID = 'K02') ;
```


  - UPDATE 문의 SET 절
```sql
UPDATE TEAM A
SET A.E_TEAM_NAME = (SELECT X.STADIUM_NAME
                     FROM STADIUM X
                     WHERE X.STADIUM_ID = A.STADIUM_ID) ;
```



  - INSERT문의 VALUES 절
```sql
INSERT INTO PLAYER(PLAYER_ID, PLAYER_NAME, TEAM_ID)
VALUES ((SELECT TO_CHAR(MAX(TO_NUMBER(PLAYER_ID)) + 1) FROM PLAYER), '홍길동', 'K06') ;
```



#### VIEW

- Table vs. View
  - 일반 테이블: 자료, 물리적 테이블
  - VIEW: 쿼리, 가상 테이블



- VIEW 장점
  - 편리성: 복잡한 쿼리나 통계를 보기 위해 뷰를 저장하여 사용할 수 있다.
  - 보안성: 원하는 일부 칼럼만 보여주고 나머지는 감출 수 있다.
  - 독립성: 테이블 구조가 변경되어도 응용 프로그램이 바뀌지 않아도 된다.



- VIEW 생성
```sql
CREATE VIEW 뷰명
AS
쿼리 ... ;
```



- VIEW 사용
  일반 테이블과 마찬가지 방법을 사용한다.
```sql
SELECT *
FROM 뷰명 ;
```



- VIEW 확인
```sql
SELECT *
FROM USER_VIEWS ;
```


- VIEW를 통한 DML
  - 단수 VIEW: DML 가능
  - 복합 VIEW: DML 불가능. 하나의 테이블에서 조인된 쿼리, 통계 테이블



### 2.2.5 그룹 함수(GROUP FUNCTION)

- AGGREGATE FUNCTION

  COUNT, SUM, AVG, MAX, MIN 등의 각종 집계 함수

- GROUP FUNCTION

  ROLLUP, CUBE, GROUPING SETS (소계, 중계, 총합계 등 여러 레벨로 사용할 때)

- WINDOW FUNCTION

  분석, 순위 함수



#### ROLLUP

소그룹 간 소계 계산 ( =~ EXCEL 부분합)

```sql
GROUP BY ROLLUP (칼럼명, ...) ;
```



예제

```sql
-- GROUP BY
SELECT DNAME
     , JOB
     , COUNT(*) "Total Empl"
     , SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY DNAME, JOB
ORDER BY DNAME, JOB ;

-- ROLLUP
SELECT DNAME
     , JOB
     , COUNT(*) "Total Empl"
     , SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY ROLLUP (DNAME, JOB)  -- 부서별/직군별 소계, 전체 총계
ORDER BY DNAME, JOB ;  -- 계층별 순서는 정렬하나 같은 계층 내 정렬은 ORDER BY 사용할 것

-- ROLLUP 함수 일부 사용
SELECT DECODE(GROUPING(DNAME), 1, 'All Departments', DNAME) AS DNAME
     , DECODE(GROUPING(JOB), 1, 'All Jobs', JOB) AS JOB
     , COUNT(*) "Total Empl"
     , SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY DNAME, ROLLUP (JOB)
ORDER BY DNAME, JOB ;

-- ROLLUP 함수 결합 칼럼 사용
SELECT DNAME, JOB, MGR, SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY ROLLUP (DNAME, (JOB, MGR)) ;  -- 부서-(직군, 매니저) 직군과 매니저를 같은 레벨로 취급
```



#### GROUPING

ROLLUP이나 CUBE에 의한 소계가 계산된 결과에는 GROUPING(EXPR) = 1

그 외 결과에는 GROUPING(EXPR) = 0

```sql
GROUPING(칼럼명|표현식)
```



예제

```sql
-- GROUPING
SELECT DNAME
     , GROUPING(DNAME)
     , JOB
     , GROUPING(JOB)
     , COUNT(*) "Total Empl"
     , SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY ROLLUP (DNAME, JOB)
ORDER BY DNAME, JOB ;
```


#### CUBE

GROUP BY 항목들 간 결합 가능한 모든 경우에 대해 다차원적인 소계 계산
시스템에 부담을 줄 수 있다.

결과는 별도의 정렬 없이 가장 위에 위치

```sql
GROUP BY CUBE (칼럼명, ...) ;
```



예제

```sql
SELECT CASE GROUPING(DNAME) WHEN 1 THEN 'ALL Departments' ELSE DNAME END AS DNAME
     , CASE GROUPING(JOB) WHEN 1 THEN 'All Jobs' ELSE JOB END AS JOB
     , COUNT(*) "Total Empl"
     , SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY CUBE (DNAME, JOB) ;
```



#### GROUPING SETS

다양한 소계 집계 가능
GROUP BY 절을 여러 번 반복하지 않아도 됨

```sql
GROUP BY GROUPING SETS (칼럼명, ...) ;
```



예제

```sql
SELECT DECODE(GROUPING(DNAME), 1, 'All Departments', DNAME) AS DNAME
     , DECODE(GROUPING(JOB), 1, 'All Jobs', JOB) AS JOB
     , COUNT(*) "Total Empl"
     , SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY GROUPING SETS (JOB, DNAME) ;  -- 순서 바꿔도 같은 결과

SELECT DNAME, JOB, MGR, SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY GROUPING SETS ((DNAME, JOB, MGR), (DNAME, JOB), (JOB, MGR)) ;
```



- CASE

  CASE/DECODE를 이용해, 소계를 나타내는 필드에 원하는 문자열을 지정할 수 있어 보고서 작성시 유용하게 사용

```sql
-- CASE
SELECT CASE GROUPING(DNAME) WHEN 1 THEN 'ALL Departments' ELSE DNAME END AS DNAME
     , CASE GROUPING(JOB) WHEN 1 THEN 'All Jobs' ELSE JOB END AS JOB
     , COUNT(*) "Total Empl"
     , SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY ROLLUP (DNAME, JOB)
ORDER BY DNAME, JOB ;

-- DECODE
SELECT DECODE(GROUPING(DNAME), 1, 'All Departments', DNAME) AS DNAME
     , DECODE(GROUPING(JOB), 1, 'All Jobs', JOB) AS JOB
     , COUNT(*) "Total Empl"
     , SUM(SAL) "Total Sal"
FROM EMP, DEPT
WHERE DEPT.DEPTNO = EMP.DEPTNO
GROUP BY ROLLUP (DNAME, JOB)
ORDER BY DNAME, JOB ;
```





### 2.2.6 윈도우 함수(WINDOW FUNCTION)

- 그룹 내 순위함수: RANK, DENSE_RANK, ROW_NUMBER
- 일반 집계 함수: SUM, MAX, MIN, AVG, COUNT
- 그룹 내 행 순서 함수: FIRST_VALUE, LAST_VALUE, LAG, LEAD
- 그룹 내 비율 함수: RATIO_TO_REPORT, PERCENT_RANK, CUME_DIST, NTILE



```sql
SELECT WINDOW_FUNCTION (ARGUMENTS) OVER ([PARTITION BY 칼럼] [ORDER BY 절] [WINDOWING 절])
FROM 테이블명 ;
```
- WINDOWING 절
  함수의 대상이 되는 행 기준의 범위를 강력하게 지정할 수 있다.
  ROWS는 행 수, RANGE는 값의 범위
  SQL Server는 지원 안 됨



#### RANK

특정 항목에 대한 순위
동일한 값에 대해서는 동일한 순위

- PARTITION: 특정 범위 내에서 순위를 구함

```sql
-- 전체 급여, 직군별 급여 순위
SELECT JOB, ENAME, SAL,
       RANK() OVER (ORDER BY SAL DESC) ALL_RANK,
       RANK() OVER (PARTITION BY JOB ORDER BY SAL DESC) JOB_RANK
FROM EMP ;

-- 부서별 급여, 전체 급여 순위
SELECT DEPTNO, ENAME, SAL
     , RANK() OVER (PATITION BY DEPTNO ORDER BY SAL DESC) DEPT_RANK
     , RANK() OVER (ORDER BY SAL DESC) ALL_RANK
FROM EMP
ORDER BY DEPTNO, SAL DESC ;
```



#### DENSE_RANK

동일한 순위를 하나의 건수 취급

```sql
SELECT JOB, ENAME, SAL
     , RANK() OVER (ORDER BY SAL DESC) RANK
     , DENSE_RANK() OVER(ORDER BY SAL DESC) DENSE_RANK
FROM EMP ;
```



#### ROW_NUMBER

고유 번호

```sql
SELECT JOB, ENAME, SAL
     , RANK() OVER (ORDER BY SAL DESC) RANK
     , ROW_NUMBER() OVER (ORDER BY SAL DESC) ROW_NUMBER
FROM EMP ;
```



#### 일반 집계 함수

```sql
-- SUM
SELECT MGR, ENAME, SAL
     , SUM(SAL) OVER (PARTITION BY MGR) MGR_SUM
FROM EMP ;

-- 누적합
SELECT MGR, ENAME, SAL
     , SUM(SAL) OVER (PARTITION BY MGR
                      ORDER BY SAL
                      RANGE UNBOUNDED PRECEDING)

-- AVG
SELECT DEPTNO, ENAME, SAL
     , ROUND(AVG(SAL) OVER (PARTITION BY DEPTNO), 0) DEPT_AVG
FROM EMP ;

SELECT MGR, ENAME, HIREDATE, SAL
     , ROUND(AVG(SAL) OVER (PARTITION BY MGR
                            ORDER BY HIREDATE
                            ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)) AS MGR_AVG
FROM EMP ;

-- MAX
---- 매니저별 최고 급여
SELECT MGR, ENAME, SAL
     , MAX(SAL) OVER (PARTITION BY MGR) AS MGR_MAX
FROM EMP ;

---- 부서별 최고 급여
SELECT DEPTNO, ENAME, SAL
     , MAX(SAL) OVER (PARTITION BY DEPTNO) DEPT_MAX
FROM EMP ;

---- 부서별 최고 급여를 받는 사원 정보
SELECT DEPTNO, ENAME, SAL
FROM (SELECT DEPTNO, ENAME, SAL
           , MAX(SAL) OVER (PARTITION BY DEPTNO) DEPT_MAX
      FROM EMP)
WHERE SAL = DEPT_MAX ;
     AS MGR_SUM
FROM EMP ;

-- COUNT
SELECT ENAME, SAL
     , COUNT(*) OVER (ORDER BY SAL
                      RANGE BETWEEN 50 PRECEDING AND 150 FOLLOWING) AS SIM_CNT
FROM EMP ;

SELECT DEPTNO, ENAME, SAL
     , COUNT(*) OVER (PARTITION BY DEPTNO
                      ORDER BY SAL
                      RANGE BETWEEN 100 PRECEDING AND 100 FOLLOWING) AS SIM_CNT
FROM EMP ;
```



#### FIRST_VALUE

파티션별 가장 먼저 나온 값을 반환

공동 순위는 인정하지 않는다.

```sql
SELECT DEPTNO, ENAME, SAL
     , FIRST_VALUE(ENAME) OVER (PARTITION BY DEPTNO
                                ORDER BY DESC
                                ROWS UNBOUNDED PRECEDING) AS DEPT_RICH
FROM EMP ;
```

- ROWS UNBOUNDED PRECEDING

  현재 행을 기준으로 파티션 내의 첫 번째 행까지



#### LAST_VALUE

파티션별 가장 나중에 나온 값 반환

공동 순위는 인정하지 않는다.

```sql
SELECT DEPTNO, ENAME, SAL
     , LAST_VALUE(ENAME) OVER (PARTITION BY DEPTNO
                               ORDER BY SAL DESC
                               ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS DEPT_POOR
FROM EMP ;
```

- ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING

  현재 행을 포함해서 파티션 내의 마지막 행까지



#### LAG

파티션별 이전 몇 번째 행의 값 반환

```sql
LAG(칼럼명, 몇번째이전값, NULL일 경우 대체값)
```



```sql
SELECT ENAME, HIREDATE, SAL
     , LAG(SAL) OVER (ORDER BY HIREDATE) AS PREV_SAL
FROM EMP
WHERE JOB = 'SALESMAN' ;

SELECT ENAME, HIREDATE, SAL
     , LAG(SAL, 2, 0) OVER (ORDER BY HIREDATE) AS PREV_SAL
FROM EMP
WHERE JOB = 'SALESMAN' ;
```



#### LEAD

파티션별 이후 몇 번째 행의 값 반환

```sql
LEAD(칼럼명, 몇번째이후값, NULL일 경우 대체값)
```



```sql
SELECT ENAME, HIREDATE, SAL
     , LEAD(SAL) OVER (ORDER BY HIREDATE) AS PREV_SAL
FROM EMP
WHERE JOB = 'SALESMAN' ;
```





#### RATIO_TO_REPORT

파티션 내 전체 SUM(칼럼) 값에 대한 행별 칼럼 값의 백분율 반환

```sql
SELECT ENAME, SAL
     , ROUND(RATIO_TO_REPORT(SAL) OVER (), 2) AS R_R
     , ROUND(SAL / (SELECT SUM(SAL) FROM EMP WHERE JOB='SALESMAN'), 2) AS R_R2  -- 서브쿼리 구현
FROM EMP
WHERE JOB = 'SALESMAN' ;
```



#### PERCENT_RANK

파티션별 제일 먼저나오는 것을 0으로 제일 늦게 나오는 것을 1로 하여 순서별 백분율 반환

```sql
SELECT DEPTNO, ENAME, SAL
     , PERCENT_RANK() OVER (PARTITION BY DEPTNO ORDER BY SAL DESC) AS P_R
FROM EMP ;
```



#### CUME_DIST

파티션별 전체 건수에서 현재 행보다 작거나 같은 건수에 대한 누적백분율 반환

```sql
SELECT DEPTNO, ENAME, SAL
     , ROUND(CUME_DIST() OVER (PARTITION BY DEPTNO ORDER BY SAL DESC), 2) AS CUME_DIST
FROM EMP ;
```



#### NTILE

파티션별 전체 건수를 N등분한 결과 반환

```sql
NTILE(등분할 수)
```



```sql
SELECT ENAME, SAL
     , NTILE(4) OVER (ORDER BY SAL DESC) AS QUAR_TILE
FROM EMP ;

SELECT ENAME, SAL
     , NTILE(4) OVER (PARTITION BY DEPTNO ORDER BY SAL DESC) AS QUAR_TILE
FROM EMP ;
```



### 2.2.7 DCL(DATA COTROL LANGUAGE)

#### DCL 개요

데이터 보호와 보안을 위해 유저를 생성하고 권한을 제어할 수 있는 명령어를 DCL이라 한다.

- CREATE USER
- GRANT/REVOKE



#### 유저와 권한

- 유저 생성

  DBA 권한을 가지고 있어야 유저를 생성할 수 있다.

```sql
CREATE USER 유저명 IDENTIFIED BY 패스워드 ;
```



- 권한 부여

  유저에게 권한을 부여한다. 여러 유저를 지정하거나 `PUBLIC` 키워드로 모든 유저에게 한 번에 권한을 부여할 수 있다.

  `WITH GRANT OPTION`을 통해 권한을 부여할 수 있는 권한도 넘길 수 있다.

```sql
GRANT 권한 ON 테이블명 TO 유저명 ;

-- PUBLIC
GRANT 권한 ON 테이블명 TO PUBLIC ;

-- WITH GRANT OPTION
GRANT 권한 ON 테이블명 TO 유저명 WITH GRANT OPTION ;
```



- 권한 회수

  유저에게 부여했던 권한을 회수할 수 있다. `CASCADE` 키워드로 연쇄적인 회수가 가능하다.

```sql
REVOKE 권한 ON 테이블명 TO 유저명 ;
```



- Object 권한

  Object를 생성한 생성자가 모든 권한을 가진다. 마찬가지로 다른 유저에게 권한을 부여할 수 있다.

```sql
GRANT SELECT ON BOOK TO PUBLIC ;

REVOKE SELECT ON BOOK TO PUBLIC ;

-- USER1 -> USER2
GRANT SELECT ON BOOK TO USER2 WITH GRANT OPTION ;

-- USER2 -> USER3
GRANT SELECT ON BOOK TO USER3 ;

-- USER1
REVOKE SELECT ON BOOK FROM USER2 CASCASE ;
```



#### Role을 이용한 권한 부여
유저가 생성될 때마다 유저에게 필요한 권한을 부여해야 하는데, 이를 효율적으로 관리하기 위해 유저와 권한 사이를 중개하는 Role을 제공한다.
필요한 권한만 묶어 Role을 생성한 뒤 한꺼번에 유저에게 권한을 부여할 수 있다.

- 역할 생성
```sql
CREATE ROLE 역할명 ;
```

- 생성한 역할 확인
```sql
-- DBA
SELECT *
FROM DBA_SYS_PRIVS ;

-- USER
SELECT *
FROM USER_SYS_PRIVS ;
```

- 권한 묶음
```sql
GRANT 권한 ON 테이블 TO 역할명 ;
```

- 역할을 이용한 권한 부여
```sql
GRANT 역할명 TO 유저명 ;
```

- 역할 삭제
```sql
DROP ROLE 역할명 ;
```

- CONNECT, RESOURCE
  오라클에서 가장 많이 사용하는 Role은 CONNECT와 RESOURCE이다.
  CONNECT는 로그인 권한 등이 포함되어 있고, RESOURCE는 오브젝트 생성 권한 등이 포함되어 있다.
  일반적으로 유저를 생성할 때, 두 가지 Role을 사용하여 기본 권한을 부여한다.
```sql
GRANCT CONNECT, RESOURCE TO 유저명 ;
```



### 2.2.8 절차형 SQL

#### 절차형 SQL 개요
절차 지향적인 프로그램이 가능하도록 절차형 SQL을 제공한다.
일반적으로 다음 3가지 유형 중 데이터 무결성 및 집계를 위해 TRIGGER를 사용하는 빈도가 높다. PROCEDURE는 DBA가 주로 사용하며 USER DEFINED FUNCTION는 스칼라 서브쿼리가 대체하고 있다.
- PROCEDURE
- TRIGGER
- USER DEFINED FUNCTION




#### PL/SQL 개요
Oracle의 PL/SQL은 Block 구조로 되어 있다. 이를 통해 각 기능별로 모듈화가 가능하다.
SQL 문장과 PROCEDURE 문장이 구분되어 처리된다. 즉 프로그램과 SQL 쿼리 작업을 분리하여 처리한다.

- Block 구조
  - DECLARE: 선언부(변수, 상수)
  - BEGIN: 실행부
  - EXCEPTION: 예외 처리부
  - END



- PROCEDURE 생성
  프로시저를 생성하여 저장한다. 필요할 때 호출하여 실행할 수 있다.
  - 매개변수: 프로시저가 호출될 때 프로시저 안으로 들어오는 값 또는 프로시저에서 처리한 결과값을 운영체제로 리턴시킬 값을 저장한다.
  - mode: 매개변수의 유형에는 3가지 mode가 있다.
    - IN: 운영체제 -> 프로시저
    - OUT: 프로시저 -> 운영체제
    - INOUT: IN과 OUT 동시 수행
  - /: 프로시저를 컴파일하라는 명령어
```sql
CREATE [OR REPLACE] Procedure [프로시저명]
 ( 매개변수 [mode] 데이터타입,
  ... )
IS [AS]
...
BEGIN
...
EXCEPTION
...
END ;
/

```



- PROCEDURE 삭제
```sql
DROP Procedure 프로시저명 ;
```



#### Procedure 생성과 활용
- 프로시저 생성
  1. DEPT 테이블에 들어갈 칼럼 값(부서코드, 부서명, 위치)을 입력 받는다.
  2. 입력 받은 부서코드가 존재하는지 확인한다.
  3. 부서 코드가 존재하면 '이미 등록된 부서번호입니다'라는 메시지를 출력값에 넣는다.
  4. 부서코드가 존재하지 않으면 입력 받은 필드 값으로 새로운 부서 레코드를 입력한다.
  5. 새로운 부서가 정상적으로 입력되면 `COMMIT` 명령어를 통해 트랜잭션을 종료한다.
  6. 에러가 발생하면 모든 트랜잭션을 `ROLLBACK`하고 'ERROR 발생`이라는 메시지를 출력값에 넣는다.

  - 변수 이름: camel 표기법
  - `:=`: 대입 연산자

```sql
CREATE OR REPLACE Procedure p_DEPT_insert  -- 1
(v_DEPTNO in   number,
 v_dname in   varchar2,
 v_loc in   varchar2,
 v_result out varchar2)
IS
cnt number := 0
BEGIN
  SELECT COUNT(*) INTO CNT  -- 2
  FROM DEPT
  WHERE DEPTNO = v_DEPTNO
            AND ROWNUM = 1 ;
  if cnt > 0 then  -- 3
    v_result := '이미 등록된 부서번호이다' ;
  else
    INSERT INTO DEPT (DEPTNO, DNAME, LOC)  -- 4
    VALUES (v_DEPTNO, v_dname, v_loc) ;
    COMMIT ;  -- 5
    v_result := '입력 완료!' ;
  end if ;
EXCEPTION  -- 6
  WHEN OTHERS THEN
    ROLLBACK ;
    v_result := 'ERROR 발생' ;
END ;
/
```

- 프로시저 활용
```sql
EXECUTE 프로시저명(매개변수) ;
```
  1. DEPT 테이블을 조회하여 확인한다.
  2. Procedure를 실행한 결과 값을 받을 변수를 선언한다.
  3. 존재하는 DEPTNO(10)를 매개변수로 Procedure를 실행한다.
  4. DEPTNO(10)인 부서는 이미 존재하므로 rslt의 값은 '이미 등록된 부서번호이다'라고 출력된다.
  5. 존재하지 않는 DEPTNO(50)을 매개변수로 Procedure를 실행한다.
  6. rslt를 출력하면 '입력 완료!'라고 출력된다.
  7. 다시 DEPT 테이블을 조회하여 입력한 결과를 확인한다.

```sql
SELECT * FROM DEPT ;  -- 1

variable rslt varchar2(30) ;  -- 2

EXECUTE p_DEPT_insert(10, 'dev', 'seoul', :rslt) ;  -- 3
print rslt ;  -- 4

EXECUTE p_DEPT_insert(50, 'NewDev', 'seoul', :rslt) ;  -- 5
print rslt ;  -- 6

SELECT * FROM DEPT ;  -- 7
```


#### User Defined Function
사용자 정의 함수는 프로시저와 달리 특정 작업을 수행하고 RETURN을 사용해서 반드시 하나의 값을 되돌려 줘야 한다.
```sql
-- create user defined function
CREATE OR REPLACE Function UTIL_ABS
(v_input in number)
  return NUMBER
IS
  v_return number := 0 ;
BEGIN
  if v_input < 0 then
    v_return := v_input * -1 ;
  else
    v_return := v_input ;
  end if;
  RETURN v_return ;
END ;
/

-- use user defined function
SELECT SCHE_DATE 경기일자
     , HOMETEAM_ID || ' - ' || AWAYTEAM_ID 팀들
     , HOME_SCORE || ' - ' || AWAY_SCORE 스코어
     , dbo.UTIL_ABS(HOME_SCORE - AWAY_SCORE) 점수차
FROM SCHEDULE
WHERE GUBUN = 'Y'
ORDER BY SCHE_DATE ;
```



#### Trigger 생성과 활용

특정한 테이블에 INSERT, UPDATE, DELETE와 같은 DML문이 수행되었을 때, 데이터베이스에서 자동으로 동작하도록 작성된 프로그램

사용자가 직접 호출하는 것이 아니라 생성 이후 조건이 맞으면 데이트베이스에서 자동 수행된다.
 전체 트랜잭션 작업 또는 각 행에 대해 발생된다.

데이터웨어하우스의 실시간 집계성 테이블, Materialized View(물리적 테이블이 존재하는 뷰) 생성시 주로 사용한다.

데이터 무결성을 위한 FK 역할을 수행할 수도 있다.


- 트리거 생성
```sql
CREATE OR REPLACE Trigger 트리거명
  BEFORE|AFTER DML명령어
  ON 테이블명
  FOR EACH ROW
DECLARE
  변수명 테이블명.칼럼명%TYPE ;
BEGIN
...
END ;
/
```



- 레코드 구조체

| 구분   | :OLD                    | :NEW                  |
| ------ | ----------------------- | --------------------- |
| INSERT | NULL                    | 입력된 레코드 값      |
| UPDATE | UPDATE되기 전 레코드 값 | UPDATE된 후 레코드 값 |
| DELETE | 레코드가 삭제되기 전 값 | NULL                  |




예제
  1. Trigger를 선언한다.
  2. 주문 일자, 주문 상품 값을 저장할 변수를 선언하고, 신규 입력된 데이터를 저장한다.
  3. 먼저 입력된 주문 내역의 주문 일자와 주문 상품을 기준으로 SALES_PER_DATE 테이블에 업데이트한다.
  4. 처리 결과가 SQL%NOTFOUND이면 해당 주문 일자의 주문 상품 실적이 존재하지 않으니 SALES_PER_DATE 테이블에 새로운 집계 데이터를 업데이트한다.
```sql
-- create trigger
CREATE OR REPLACE Trigger SUMMARY_SALES
  AFTER INSERT
  ON ORDER_LIST
  FOR EACH ROW
DECLARE
  o_date ORDER_LIST.order_date%TYPE ;
  o_prod ORDER_LIST.product%TYPE ;
BEGIN
  o_date := :NEW.order_date ;
  o_prod := :NEW.product ;
  UPDATE SALES_PER_DATE
  SET qty = qty + :NEW.qty
      , amount = amount + :NEW.amount ;
  WHERE sale_date = o_date
            AND product = o_prod ;
  if SQL%NOTFOUND then
    INSERT INTO SALES_PER_DATE
    VALUES (o_date, o_prod, :NEW.qyt, :NEW.amount) ;
  end if ;
END ;
/

-- use trigger
INSERT INTO ORDER_LIST VALUES('20120901', 'MONOPACK', 10, 300000) ;
INSERT INTO ORDER_LIST VALUES('20120901', 'MONOPACK', 20, 600000) ;
COMMIT ;

SELECT * FROM ORDER_LIST ;  -- 2개 주문 데이터
SELECT * FROM SALES_PRE_DATE ;  -- 1개 집계 데이터
```


#### 프로시저와 트리거의 차이점
프로시저는 BEGIN ~ END 절 내에 TCL을 사용할 수 있지만, 트리거는 사용할 수 없다.
ROLLBACK을 하면 원 Trigger뿐만 아니라 Trigger로 입력된 정보까지 하나의 트랜잭션으로 인식하여 두 테이블 모두 입력 취소된다.


## 2.3 SQL 최적화 기본 원리

### 2.3.1 옵티마이저와 실행계획
옵티마이저는 최적의 실행계획(Execution Plan)을 세운다.
사용자의 요구사항을 만족하는 결과를 추출할 수 있는 다양한 실행 방법들 중 최적의 실행 방법을 결정한다. 선택한 방법의 적절성 여부는 수행 속도에 큰 영향을 미친다.
다만 실제 SQL문을 처리해보지 않은 상태에서 최적의 실행 방법을 결정해야 하는 어려움이 있다.
- 규칙 기반 옵티마이저(RBO, Rule-Based Optimizer)
- 비용 기반 옵티마이저(CBO, Cost-Based Optimizer)

#### 옵티마이저
- 규칙 기반 옵티마이저(RBO)
  다음 순위에 따라 실행 계획을 세운다. 순위의 숫자가 낮을수록 우선 순위가 높다.
  
| Rank | Access |
|---|---|
| 1 | Single row by rowid |
| 2 | Single row by cluster join |
| 3 | Single row by hash cluster key with unique or primary key |
| 4 | Single row by unique or primary key |
| 5 | Cluster join |
| 6 | Hash cluster key |
| 7 | Indexed cluster key |
| 8 | Composite index |
| 9 | Single column index |
| 10 | Bounded range search on indexed columns |
| 11 | Unbounded range search on indexed columns |
| 12 | Sort merge join |
| 13 | MAX or MIN of indexed column |
| 14 | ORDER BY on indexed column |
| 15 | Rull table scan |

1. Single row by rowid

  ROWID를 통해서 테이블에서 하나의 행을 액세스하는 형태

  ROWID는 행이 포함된 데이터 파일, 블록 등의 정보를 가지고 있다.

4. Single row by unique or primary key
  
유일 인덱스(Unique Index)를 통해서 하나의 행을 액세스하는 형태

  인덱스에 액세스하고 인덱스에 존재하는 ROWID를 추출하여 테이블에 액세스

8. Composite index
  복합 인덱스에 동등 연산자(`=`) 조건으로 검색하는 경우

9. Single column index

  단일 칼럼 인덱스에 `=` 조건으로 검색하는 경우

10. Bounded range search on indexed columns

  인덱스가 생성되어 있는 칼럼에 양쪽 범위를 한정하는 형태

  `BETWEEN`, `LIKE`

11. Unbounded range serach on indexed columns

  인덱스가 생성되어 있는 칼럼에 한쪽 범위만 한정하는 형태


  `>`, `>=`, `<`, `<=`, 
...

15. Full table scan

  전체 테이블 액세스


- 비용 기반 옵티마이저(CBO)
  비용이란 SQL문을 처리하기 위해 예상되는 소요시간 또는 자원 사용량을 의미한다.
  테이블, 인덱스, 칼럼 등 다양한 객체 통계정보와 시스템 통계정보 등을 이용한다.

  정확한 통계 정보를 유지하는 것이 비용 기반 최적화에서 중요한 요소이다.
  동일한 SQL문에 대해 통계정보, DBMS 버전, DBMS 설정 등의 차이로 다른 실행계획이 생성될 수 있다.

  - 구조
    - 질의 변환기

    - 대안 계획 생성기
    
- 비용 예측기




#### 실행계획
- 실행계획 구성요소
  - 연산
    
여러 가지 조작을 통해서 원하는 결과를 얻어내는 일련의 작업

    조인 기법, 액세스 기법, 필터, 정렬, 집계 뷰, ...
  
- 조인 기법
    
두 개의 테이블을 조인할 때 사용할 수 있는 방법
    
NL Join, Hash Join, Sort Merge Join, ...
  

- 조인 순서
    
논리적으로 가능한 조인 순서는 n!만큼 존재한다. 현식적으로 한계 있음
    (
n: FROM 절에 존재하는 테이블 수)
  
- 액세스 기법

    하나의 테이블을 액세스할 때 사용할 수 있는 방법
    
인덱스 스캔(Index Scan), 전체 테이블 스캔(Full Table Scan), ...
  
- 최적화 정보

    - Cost: 상대적인 비용 정보
    - Card(Cardinality): 주어진 조건을 만족한 결과 집합 혹은 조인 조건을 만족한 결과 집합 건수

    - Bytes: 결과 집합이 차지하는 메모리 양


#### SQL 처리 흐름도
SQL 처리 흐름도는 SQL의 내부적인 처리 절차를 시각적으로 표현한 도표이다. 즉, 실행계획을 시각화한 것이다.
SQL문 처리를 위한 조인 순서, 테이블 액세스 기법, 조인 기법 등을 표현할 수 있다. 또한 일량(작업 건수, 처리 결과 건수 등)을 함께 표시할 수 있다.
실행 순서상 왼쪽에 있는 테이블을 Outer Table또는 Driving Table이라 하고, 오른쪽에 있는 테이블을 Inner Table이라 한다.


### 2.3.2 인덱스 기본

#### 인덱스 특징과 종류
검색 성능 최적화. 즉, 검색 조건을 만족하는 데이터를 인덱스를 통해 효과적으로 검색
할 수 있다. 인덱스의 칼럼 순서는 질의 성능에 중요한 영향을 미친다.

단, INSERT, UPDATE, DELETE 등의 작업은 테이블과 인덱스를 함께 변경해야하기 때문에 느려질 수 있다.


- B트리 인덱스
- 클러스터형 인덱스 (SQL Server)
- 전체 테이블 스캔

- B트리 인덱스
  - 브랜치 블록(Branch Block)
    분기를 목적으로 하는 블록으로 다음 단계를 가리키는 포인터를 가지고 있다.
  - 루트 블록(Root Block)
    브랜치 블록 중 가장 상위에 있는 블록
  
- 리프 블록(Leaf Block)
    인덱스를 구성하는 칼럼의 데이터와 해당 데이터를 가지고 있는 행의 위치를 가리키는 레코드 식별자(RID, Record Identifier/Rowid)를 가지고 있다.
    양방향 링크를 가져 오름차순, 내림차순 검색을 쉽게 할 수 있다.

  - B트리 인덱스는 `=`로 검색하는 일치(Exact Match) 검색과 `BETWEEN`, `>` 등과 같은 연산자로 검색하는 범위(Range) 검색 모두에 적합한 구조이다.


- 클러스터형 인덱스 (SQL Server)
  - 인덱스의 리프 페이지가 곧 데이터 페이지이다. 인덱스 키 칼럼과 나머지 칼럼을 리프 페이지에 같이 저장하므로 테이블을 랜덤 액세스할 필요가 없다.
  
- 리프 페이지의 모든 로우(=데이터)는 인덱스 키 칼럼 순으로 정렬되어 저장된다. 따라서 클러스터형 인덱스는 테이블 당 한 개만 생성된다.


#### 전체 테이블 스캔과 인덱스 스캔
- 전체 테이블 스캔
  모든 데이터를 읽어가면서 조건에 맞으면 추출하고 맞지 않으면 버림
  

검색 조건에 맞는 데이터를 찾기 위해서 테이블의 고수위 마크(HWM, High Water Mark) 아래의 모든 블록을 읽는다.
  고수위 마크는 테이블에 데이터가 쓰여졌던 블록 최상위 위치(현재는 지워져서 데이터가 존재하지 않을 수도 있음)를 의미한다.
  - 전체 테이블 스캔하는 경우

    
- SQL문에 조건이 존재하지 않는 경우

      WHERE 절이 없는 경우

    - SQL문에 주어진 조건에 사용 가능한 인덱스가 존재하지 않는 경우
      
사용 가능한 인덱스가 있어도 인덱스 칼럼을 변형하면 인덱스를 사용할 수 없다.
    
- 옵티마이저의 취사 선택
      
조건을 만족하는 데이터가 많은 경우 인덱스보다 효율적이라 판단한 경우
    
- 그 밖의 경우
      
병렬 처리 방식 또는 전체 테이블 스캔 방식의 힌트를 사용한 경우


- 인덱스 스캔
  인덱스를 구성하는 칼럼의 값을 기반으로 데이터를 추출하는 액세스 기법
  인덱스의 리프 블록은 인덱스를 구성하는 칼럼과 레코드 식별자로 구성되어 있다.
  - 인덱스 유일 스캔

    유일 인덱스(Unique Index)를 사용하여 단 하나의 데이터를 추출하는 방식

    모든 칼럼에 대해 `=`로 값이 주어진 경우에만 가능하다.
  
- 인덱스 범위 스캔
    한 건 이상의 데이터를 추출
하는 방식
    모든 칼럼에 대해 `=`로 값이 주어지지 않는 경우, 비유일 인덱스(Non-Unique Index)를 이용하는 경우
 사용한다.

### 2.3.3 조인 수행 원리

#### NL Join



#### Sort Merge Join



#### Hash Join


## Ref.

- SQL 전문가 가이드 2013 Edition