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

- Oracle, DB2, PostgreSQL, MySQL, SQLite, MongoDB, ...

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



## Refer.

-   SQL 첫걸음, 아사이 아츠시
-   빅데이터 교육