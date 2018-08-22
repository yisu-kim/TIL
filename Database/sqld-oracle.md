# SQL

- oracle sql developer 활용


- hr 유저가 생성한 테이블 복사

  copy 명령어가 따로 없고 다음 명령어를 사용한다.

  ```sql
  create table 테이블명 as select * from 유저명.테이블명
  ```

  ```sql
  create table emp
  as
  select * from hr.emp ;
  
  create table dept
  as
  select * from hr.dept;
  
  select * from emp ;
  select * from dept ;
  ```



## select 문

select 뒤에 올 수 있는 것

  - 컬럼명, 컬럼명, ...
  - *
  - 수식
  - as 컬럼별명
  - 함수
  - ||

```sql
select last_name, salary
from emp ;

select first_name, last_name
from emp;

select first_name || last_name  -- '문자열문자열'
from emp ;

select first_name || ' ' || last_name  -- '문자열 문자열'
from emp ;  

select first_name || ' ' || last_name as name
from emp ;

select first_name || ' ' || last_name name  -- as 생략 가능
from emp ;

select first_name || ' ' || last_name as "고객 이름"
from emp ;

select last_name, salary, salary * 4 as bonus  -- 수식 적용
from emp ;
```



## where 절

where 조건식 and 조건식 or 조건식 ...

- 조건식: T/F

  - 좌항: 컬럼명, 함수, ...

    index를 사용하려면 좌항의 컬럼명은 가급적 변형시키지 않는다.

  - 우항: 값, 수식, ...



### 숫자 조건식

표시 형식을 제거하고 본연의 값만

```sql
select last_name, salary
from emp
where salary >= 15000 ;
```


### 문자 조건식

'문자열'을 작은 따옴표로 감싼다.

```sql
select *
from emp
where email = 'SKING' ;

select *
from emp
where email != 'SKING' ;

select *
from emp
where email <> 'SKING' ;  -- 같지 않다.
```


### 날짜 조건식

- date: 세기, 년, 월, 일, 시, 분, 초
- **to_date('문자열', '패턴')**: 일반적인 날짜 형식이 아닐 때

```sql
select *
from emp
where hire_date = '20030617' ;

select *
from emp
where hire_date = to_date('09-21-2005', 'mm-dd-yyyy') ;
```

## 

## 그 밖의 연산자

### 기본 비교 연산자

=, !=, <>, <=, >=, <, >



### between 값1 and 값2

값1은 최소값, 값2는 최대값

값을 포함하는 범위 연산 

```sql
select last_name, salary
from emp
where 10000 <= salary and salary <= 15000 ;

select last_name, salary
from emp
where salary between 10000 and 15000 ;
```
### 

### in (값1, 값2, ...)

목록 안의 값

```sql
select last_name, department_id
from emp
where department_id = 10
   or department_id = 40
   or department_id = 50 ;

select last_name, department_id
from emp
where department_id in (10, 40, 50) ;
```
### 

### like '패턴'

패턴 연산자. 문자 컬럼만 사용 가능

  - %: 여러 문자를 모를 경우
- _: 한 문자를 모를 경우

```sql
select *
from emp
where email like 'S%' ;

select *
from emp
where email like '____' ;  -- 4글자

select *
from emp
where email like '__E%' ;
```

### 

### is null

null 값 비교시 반드시 is 사용

```sql
select *
from emp
where COMMISSION_PCT is null ;
```
### 

### not

부정문

- not between
- not like
- not in
- is not

```sql
select last_name, salary
from emp
where salary not between 10000 and 15000 ;

select last_name, department_id
from emp
where department_id not in (10, 40, 50) ;

select *
from emp
where email not like 'S%' ;

select *
from emp
where COMMISSION_PCT is not null ;
```



## 정렬

### order by 컬럼명/인덱스 [정렬옵션], ...

기본 옵션은 오름차순(asc)으로 생략 가능. 반대는 내림차순(desc)
인덱스는 1부터 시작

```sql
select department_id, last_name, salary
from emp
order by department_id, salary desc ;

select department_id, last_name, salary
from emp
order by 3 desc ;

select department_id, last_name, salary
from emp
order by 1, 3 desc, 2 ;
```



## 함수

### 단일행 함수

하나의 컬럼에 사용하는 함수

#### upper, lower, initcap

- 문자 함수
  - 대문자: upper()
  - 소문자: lower()
  - 첫문자만 대문자: initcap()

```sql
select *
from emp
where last_name = initcap('CHEN') ;  -- 한 문자열 프로세싱

select *
from emp
where upper(last_name) = 'CHEN' ;  -- 전체 행 프로세싱

select *
from emp
where lower(last_name) = lower('CHEN') ;  -- 전체 행 + 한 문자열 프로세싱
```
첫 번째 방식이 효율적이다. 함수 사용횟수가 가장 적다.
좌항의 컬럼명이 변형되지 않아야 인덱스를 사용한다.

### 

#### length(컬럼명)

문자열 갯수

영문자, 숫자, 한글, 공백, 특수문자 모두 1로 인식

```sql
select email, length(email)
from emp ;

select length('abc 2323 가나다 ^&*')
from dual ;  -- dual은 임시 테이블
```

### 

#### trim(컬럼명[, '문자열'])

문자 앞 뒤의 공백은 제거하고 문자 중간의 공백은 유지한다.
문자열을 옵션으로 넣으면 해당 문자열도 제거할 수 있다.

```sql
select trim('    dkfdf  dkfkd   ')
from dual ;
```

#### 

#### substr(컬럼명, 시작위치, 글자수)

문자열 중 시작 위치부터 글자수만큼  추출

```sql
select job_id,
       substr(job_id, 1, 2),
       substr(job_id, -3),
       substr(job_id, 4, 2)
from emp ;

-- 901010-1234567
select 사원이름
from 사원
where substr(주민번호, 3, 2) = '10' ;  -- 결과 문자열 주의

select *
from 사원
where substr(주민번호, 8, 1) in ('2', '4') ;
```

#### 

#### instr(컬럼명, '찾는 문자')

찾는 문자 위치 인덱스 반환
찾는 문자가 없으면 0 리턴 -> 포함 여부 확인 가능
찾는 문자가 하나 이상이면 첫 번째 위치 리턴

```sql
-- job_id 컬럼에서 '_' 앞 뒤 문자열 검색
select job_id,
       substr(job_id, 1, instr(job_id, '_') - 1) as "앞 문자열",
       substr(job_id, instr(job_id, '_') + 1)   as "뒤 문자열"
from emp ;
```