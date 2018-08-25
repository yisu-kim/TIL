# 2 SQL 기본 및 활용

{:toc}

## 2.1 SQL 기본

### 2.1.1 관계형 데이터베이스의 개요

#### Database

- DBMS 필요성

  특정 조직 또는 개인이 필요에 의해 부가가치가 발생하는 데이터를 일정한 형태로 저장하고자 할 때 다음과 같은 요구사항을 만족시키는 시스템을 DBMS(Database Management System)라 한다.

  같은 데이터를 여러 사람이 동시에 여러 용도로 사용하도록 하기 위해 동시성/병행 제어 기능을 제공한다.

  또한, 사건 사고로 인한 데이터의 손실로부터 데이터 복구 기능을 제공한다.

- DBMS 발전

  - 1980년대: 관계형 데이터베이스가 상용화되어 Oracle, Sybase, DB2와 같은 제품이 사용되었다.
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



## Ref.

- SQL 전문가 가이드 2013 Edition