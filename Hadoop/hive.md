# Hive

Hadoop에서 구조화된 데이터를 처리하기 위한 데이터 웨어하우스 인프라 도구

메타스토어라는 저장소를 만들어 하둡에서 처리된 메타데이터 구조를 저장한다.

OLAP용으로 설계되었으며 HiveQL(HQL)이라는 SQL 형식 언어를 제공한다.



## Installation

```shell
wget http://apache.tt.co.kr/hive/hive-2.3.3/apache-hive-2.3.3-bin.tar.gz
tar xvfz apache-hive-2.3.3-bin.tar.gz
```



## Environment Setting

1. conf/hive-env.sh

   ```shell
   HADOOP_HOME=/home/hadoop/hadoop-2.7.6
   ```

2. 환경변수

   ```shell
   # Hive Env
   export HIVE_HOME=/home/hadoop/apache-hive-2.3.3.-bin
   export PATH=$PATH:$HIVE_HOME/bin
   ```

3. 하둡 경로 생성

   ```shell
   # Start Hadoop
   start-all.sh
   
   # Create directory
   hadoop fs -mkdir /tmp
   hadoop fs -mkdir /user/hive
   hadoop fs -mkdir /user/hive/warehouse
   
   # Authorization
   hadoop fs -chmod g+x /tmp
   hadoop fs -chmod g+x /user/hive/warehouse
   hadoop fs -chmod 777 /user/hive
   ```



### Derby metastore

1. Metastore 초기화

   ```shell
   # Metastore: derby
   schematool -initSchema -dbType derby
   #
   SLF4J: Class path contains multiple SLF4J bindings.
   SLF4J: Found binding in [jar:file:/home/hadoop/apache-hive-2.3.3-bin/lib/log4j-slf4j-impl-2.6.2.jar!/org/slf4j/impl/StaticLoggerBinder.class]
   SLF4J: Found binding in [jar:file:/home/hadoop/hadoop-2.7.6/share/hadoop/common/lib/slf4j-log4j12-1.7.10.jar!/org/slf4j/impl/StaticLoggerBinder.class]
   SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
   SLF4J: Actual binding is of type [org.apache.logging.slf4j.Log4jLoggerFactory]
   Metastore connection URL:        jdbc:derby:;databaseName=metastore_db;create=true
   Metastore Connection Driver :    org.apache.derby.jdbc.EmbeddedDriver
   Metastore connection User:       APP
   Starting metastore schema initialization to 2.3.0
   Initialization script hive-schema-2.3.0.derby.sql
   Initialization script completed
   schemaTool completed
   ```

2. Hive 실행

   > 메타스토어가 생성되어 있는 위치(apache-hive-2.3.3-bin)에서 명령을 실행해야 한다!

   ```shell
   hive
   #
   SLF4J: Class path contains multiple SLF4J bindings.
   SLF4J: Found binding in [jar:file:/home/hadoop/apache-hive-2.3.3-bin/lib/log4j-slf4j-impl-2.6.2.jar!/org/slf4j/impl/StaticLoggerBinder.class]
   SLF4J: Found binding in [jar:file:/home/hadoop/hadoop-2.7.6/share/hadoop/common/lib/slf4j-log4j12-1.7.10.jar!/org/slf4j/impl/StaticLoggerBinder.class]
   SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
   SLF4J: Actual binding is of type [org.apache.logging.slf4j.Log4jLoggerFactory]
   Logging initialized using configuration in jar:file:/home/hadoop/apache-hive-2.3.3-bin/lib/hive-common-2.3.3.jar!/hive-log4j2.properties Async: true
   Hive-on-MR is deprecated in Hive 2 and may not be available in the future versions. Consider using a different execution engine (i.e. spark, tez) or using Hive 1.X releases.
   hive>
   ```

3. HiveQL 실습

   ```sql
   # Database
   CREATE DATABASE userdb;
   SHOW DATABASES;
   USE userdb;
   
   # Table
   CREATE TABLE employee(eid int, name String, salary String);
   SHOW tables;
   ```

4. 맵리듀스 처리

   ```sql
   INSERT INTO employee(eid, name, salary) VALUES(1, "Tom", "1000");
   -- mapreduce task
   WARNING: Hive-on-MR is deprecated in Hive 2 and may not be available in the future versions. Consider using a different execution engine (i.e. spark, tez) or using Hive 1.X releases.
   Query ID = hadoop_20180720114225_5c2f890e-297e-4f25-be96-409f7277a540
   Total jobs = 3
   Launching Job 1 out of 3
   Number of reduce tasks is set to 0 since there's no reduce operator
   Starting Job = job_1532052871683_0001, Tracking URL = http://0.0.0.0:8089/proxy/application_1532052871683_0001/
   Kill Command = /home/hadoop/hadoop-2.7.6/bin/hadoop job  -kill job_1532052871683_0001
   Hadoop job information for Stage-1: number of mappers: 1; number of reducers: 0
   2018-07-20 11:43:02,018 Stage-1 map = 0%,  reduce = 0%
   2018-07-20 11:43:05,578 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 5.72 sec
   MapReduce Total cumulative CPU time: 5 seconds 720 msec
   Ended Job = job_1532052871683_0001
   Stage-4 is selected by condition resolver.
   Stage-3 is filtered out by condition resolver.
   Stage-5 is filtered out by condition resolver.
   Moving data to directory hdfs://Server01:9000/user/hive/warehouse/employee/.hive-staging_hive_2018-07-20_11-42-25_228_4816065614352907305-1/-ext-10000
   Loading data to table default.employee
   MapReduce Jobs Launched:
   Stage-Stage-1: Map: 1   Cumulative CPU: 5.72 sec   HDFS Read: 4379 HDFS Write: 312642 SUCCESS
   Total MapReduce CPU Time Spent: 5 seconds 720 msec
   OK
   Time taken: 44.205 seconds
   ```

5. 맵리듀스 결과 확인

   ```sql
   SELECT * FROM employee;
   -- 
   OK
   1       Tom     1000
   ```

   

### MariaDB metastore

1. 설치

   ```shell
   yum install mariadb-server
   # service start
   systemctl start mariadb
   ```

2. 보안 설정

   ```shell
   mysql_secure_installation
   #
   Enter current password for root (enter for none):
   OK, successfully used password, moving on...
   
   Set root password? [Y/n] y
   New password: 패스워드
   Re-enter new password: 패스워드
   
   Remove anonymous users? [Y/n] y
   
   Disallow root login remotely? [Y/n] y
   
   Remove test database and access to it? [Y/n] y
   
   Reload privilege tables now? [Y/n] y
   
   All done!  If you've completed all of the above steps, your MariaDB
   installation should now be secure.
   Thanks for using MariaDB!
   ```

3. MariaDB 접속

   ```shell
   mysql -u root -p  # 또는 mysqladmin -u root -p version
   ...
   MariaDB [(none)]>
   ```

4. mysql 데이터베이스 사용

   ```mariadb
   use mysql;
   -- 
   ...
   Database changed
   MariaDB [mysql]>
   ```

5. 사용자 추가

   ```mariadb
   -- local
   > INSERT INTO user(host,user,authentication_string,ssl_cipher,x509_issuer,x509_subject) VALUES('localhost','유저명',password('패스워드'),'','','');
   -- local
   > INSERT INTO user(host,user,authentication_string,ssl_cipher,x509_issuer,x509_subject) VALUES('127.0.0.1','유저명',password('패스워드'),'','','');
   -- other
   > INSERT INTO user(host,user,authentication_string,ssl_cipher,x509_issuer,x509_subject) VALUES('%','유저명',password('패스워드'),'','','');
   > FLUSH privileges;
   ```

6. 권한 설정

   ```mariadb
   -- local
   > GRANT ALL privileges ON *.* TO 유저명@localhost IDENTIFIED BY '패스워드' WITH GRANT OPTION;
   -- local
   > GRANT ALL privileges ON *.* TO 유저명@127.0.0.1 IDENTIFIED BY '패스워드' WITH GRANT OPTION;
   -- other
   > GRANT ALL privileges ON *.* TO '유저명'@'%' IDENTIFIED BY '패스워드' WITH GRANT OPTION;
   > FLUSH privileges;
   ```

7. 사용자 설정 확인

   ```mariadb
   SELECT user, host FROM user;
   -- 
   +--------+-----------+
   | user   | host      |
   +--------+-----------+
   | 유저명  | %         |
   | 유저명  | 127.0.0.1 |
   | root   | 127.0.0.1 |
   | root   | ::1       |
   | 유저명  | localhost |
   | root   | localhost |
   +--------+-----------+
   ```

8. conf/hive-site.xml

   ```xml
   <?xml version="1.0" encoding="UTF-8" standalone="no"?>
   <?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
   <configuration>
       <property>
           <name>hive.metastore.local</name>
           <value>false</value>
       </property>
       <property>
           <name>javax.jdo.option.ConnectionURL</name>
           <value>jdbc:mysql://localhost:3306/hive?createDatabaseIfNotExist=true</value>
       </property>
       <property>
           <name>javax.jdo.option.ConnectionDriverName</name>
           <value>com.mysql.jdbc.Driver</value>
       </property>
       <property>
           <name>javax.jdo.option.ConnectionUserName</name>
           <value>hadoop</value>
       </property>
       <property>
           <name>javax.jdo.option.ConnectionPassword</name>
           <value>Pa$$w0rd123</value>
       </property>
   </configuration>
   ```

9. Hive 실행

   ```shell
   hive
   #
   ...
   hive>
   ```

10. HiveQL 실습

    ```mariadb
    -- Create database
    CREATE DATABASE test;
    
    -- Use database
    USE test;
    
    -- Create table
    CREATE TABLE employees
    (
    emp_no int,
    birth_date String,
    first_name String,
    last_name String,
    gender String,
    hire_date String
    )
    ROW FORMAT DELIMITED
    	FIELDS TERMINATED BY ','
    	LINES TERMINATED BY '\n'
    	STORED AS TEXTFILE;
    
    -- Describe table
    DESCRIBE employee;
    -- 
    OK
    emp_no                  int
    birth_date              string
    first_name              string
    last_name               string
    gender                  string
    hire_date               string
    
    -- Load data
    LOAD DATA LOCAL INPATH '/home/hadoop/employees2.txt' 
    OVERWRITE INTO TABLE employees;
    
    -- Select data
    SELECT * FROM employee LIMIT 5;
    -- 
    OK
    10001   1953-09-02      Georgi  Facello M       1986-06-26
    10002   1964-06-02      Bezalel Simmel  F       1985-11-21
    10003   1959-12-03      Parto   Bamford M       1986-08-28
    10004   1954-05-01      Chirstian       Koblick M       1986-12-01
    10005   1955-01-21      Kyoichi Maliniak        M       1989-09-12
    
    SELECT COUNT(*) FROM employee;
    -- 
    WARNING: Hive-on-MR is deprecated in Hive 2 and may not be available in the future versions. Consider using a different execution engine (i.e. spark, tez) or using Hive 1.X releases.
    Query ID = hadoop_20180720151240_a1dea84e-ef97-4194-a635-cb573c1ef540
    Total jobs = 1
    Launching Job 1 out of 1
    Number of reduce tasks determined at compile time: 1
    In order to change the average load for a reducer (in bytes):
      set hive.exec.reducers.bytes.per.reducer=<number>
    In order to limit the maximum number of reducers:
      set hive.exec.reducers.max=<number>
    In order to set a constant number of reducers:
      set mapreduce.job.reduces=<number>
    Starting Job = job_1532052871683_0003, Tracking URL = http://0.0.0.0:8089/proxy/application_1532052871683_0003/
    Kill Command = /home/hadoop/hadoop-2.7.6/bin/hadoop job  -kill job_1532052871683_0003
    Hadoop job information for Stage-1: number of mappers: 1; number of reducers: 1
    2018-07-20 15:13:06,038 Stage-1 map = 0%,  reduce = 0%
    2018-07-20 15:13:16,236 Stage-1 map = 100%,  reduce = 0%, Cumulative CPU 10.82 sec
    2018-07-20 15:13:17,465 Stage-1 map = 100%,  reduce = 100%, Cumulative CPU 13.19 sec
    MapReduce Total cumulative CPU time: 13 seconds 190 msec
    Ended Job = job_1532052871683_0003
    MapReduce Jobs Launched:
    Stage-Stage-1: Map: 1  Reduce: 1   Cumulative CPU: 13.19 sec   HDFS Read: 28256578 HDFS Write: 630481 SUCCESS
    Total MapReduce CPU Time Spent: 13 seconds 190 msec
    OK
    300024
    Time taken: 38.8 seconds, Fetched: 1 row(s)
    
    -- WHERE
    SELECT * FROM employee WHERE gender='F';
    
    -- GROUP BY
    SELECT gender, COUNT(*) FROM employee
    GROUP BY gender;
    -- 
    F       120051
    M       179973
    ```



## Exercise

### 실습 데이터

emp_data.txt

```
Michael|Montreal,Toronto|Male,30|DB:80|Product:DeveloperLead
Will|Montreal|Male,35|Perl:85|Product:Lead,Test:Lead
Shelley|New York|Female,27|Python:80|Test:Lead,COE:Architect
Lucy|Vancouver|Female,57|Sales:89,HR:94|Sales:Lead
```



### 실습

1. Internal Table

   ```mariadb
   -- Create external table and load the data
   CREATE TABLE IF NOT EXISTS employee_internal
   (
   name string,
   work_place ARRAY<string>,
   sex_age STRUCT<sex:string,age:int>,
   skills_score MAP<string,int>,
   depart_title MAP<STRING,ARRAY<STRING>>
   )
   COMMENT 'This is an internal table'
   ROW FORMAT DELIMITED
   	FIELDS TERMINATED BY '|'
   	COLLECTION ITEMS TERMINATED BY ','
   	MAP KEYS TERMINATED BY ':'
   	STORED AS TEXTFILE;
   
   LOAD DATA LOCAL INPATH '/home/hadoop/emp_data.txt'
   OVERWRITE INTO TABLE employee_internal;
   
   -- Select table
   select * from employee_internal;
   -- 
   Michael   ["Montreal","Toronto"]  {"sex":"Male","age":30} {"DB":80}       {"Product":["Developer^DLead"]}
   Will    ["Montreal"]    {"sex":"Male","age":35} {"Perl":85}     {"Product":["Lead"],"Test":["Lead"]}
   Shelley ["New York"]    {"sex":"Female","age":27}       {"Python":80}   {"Test":["Lead"],"COE":["Architect"]}
   Lucy    ["Vancouver"]   {"sex":"Female","age":57}       {"Sales":89,"HR":94}   {"Sales":["LeadMichael"]}
   Will    ["Montreal"]    {"sex":"Male","age":35} {"Perl":85}     {"Product":["Lead"],"Test":["Lead"]}
   Shelley ["New York"]    {"sex":"Female","age":27}       {"Python":80}   {"Test":["Lead"],"COE":["Architect"]}
   Lucy    ["Vancouver"]   {"sex":"Female","age":57}       {"Sales":89,"HR":94}   {"Sales":["Lead"]}
   ```

   