# Sqoop

- SQl to hadOOP = SQOOP
- RDBMS와 Hadoop 간에 대용량 데이터들을 효율적으로 변환해 주는 도구
- 데이터의 import/export를 맵리듀스를 통해 처리하여 장애 허용 능력과 병렬 처리 능력을 갖춤



> 본 실습에서는 sqoop1을 hadoop-2.7.6 버전 위에서 구동시킨다.

## Installation

- sqoop

  http://sqoop.apache.org/ 를 통해 다운받을 수 있다.

  ```shell
  wget http://apache.tt.co.kr/sqoop/1.4.7/sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz
  tar xvfz sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz
  ```

- MySql

  설치되어 있다고 가정한다.

- mysql-connector-java

  ```shell
  wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.46.tar.gz
  tar xvfz mysql-connector-java-5.1.46.tar.gz
  ```



## Environment setting

- mysql-connector-java-5.1.46-bin.jar 파일을 sqoop의 lib/ 로 복사

  ```shell
  cp mysql-connector-java-5.1.46/mysql-connector-java-5.1.46-bin.jar sqoop-1.4.7.bin__hadoop-2.6.0/lib
  ```

- sqoop 환경 설정

  template 파일을 복사 후 수정하였다.

  ```shell
  # conf/sqoop-env.sh
  export HADOOP_COMMON_HOME=/home/hadoop/hadoop-2.7.6
  export HADOOP_MAPRED_HOME=/home/hadoop/hadoop-2.7.6
  ```

- sqoop 환경변수 추가

  ```shell
  # .bash_profile
  export SQOOP_HOME=/home/hadoop/sqoop-1.4.7.bin__hadoop-2.6.0
  export PATH=$PATH:$SQOOP_HOME/bin
  ```



## Exercise

> Exercise1.
>
> MySql to HDFS, HDFS to MySql



하둡이 실행된 상태인지 확인 후 다양한 옵션을 적용하여 다음 실습을 진행한다.

- list-databases

  데이터베이스 리스트 보기

  ```shell
  sqoop list-databases \
  --connect jdbc:mysql://ip주소:포트/?useSSL=false \
  --username '유저명' \
  --password '패스워드'
  ```

- import

  mysql -> hdfs

  ```shell
  sqoop import \
  --connect jdbc:mysql://ip주소:포트/employees?useSSL=false \
  --username '유저명' \
  --password '패스워드' \
  --table employees \
  -m 1 \
  --target-dir /user/hadoop/sqoopMySqlToHdfs
  ```
    - delete-target-dir

      기존 target-dir 삭제 후 재생성

      ```shell
      --delete-target-dir
      ```

    - where

      조건절 추가

      ```shell
      --where 'emp_no>10003'
      ```

    - columns

      컬럼 지정

      ```shell
      --columns " emp_no "
      ```

    - split-by

      맵퍼가 작업을 나눌 기준 컬럼 지정

      ```shell
      --split-by emp_no
      ```

    - boundary-query

      스플릿 생성을 위해 사용하는 바운더리 쿼리

      ```shell
      --boundary-query "select min(emp_no), max(emp_no) from employees"
      ```

    - query

      조인

      ```shell
      --query 'select employees.emp_no, dept_emp.dept_no from dept_emp inner join employees on(dept_emp.emp_no = employees.emp_no) where $CONDITIONS'
      ```

      ```shell
      # e.g.
      sqoop import \
      --connect jdbc:mysql://ip주소:포트/employees?useSSL=false \
      --username '유저명' \
      --password '패스워드' \
      --query 'select employees.emp_no, dept_emp.dept_no from dept_emp inner join employees on(dept_emp.emp_no = employees.emp_no) where $CONDITIONS' \
      --split-by employees.emp_no \
      --target-dir /user/hadoop/sqoopMySqlToHdfs \
      --delete-target-dir
      
      # result
      10001,d005
      10002,d007
      10003,d004
      10004,d004
      10005,d003
      10006,d005
      10007,d008
      10008,d005
      10009,d006
      10010,d004
      ...
      ```

  - incremental

    증분된 데이터

    > java-json.jar 파일을 sqoop의 lib/ 에 추가해야 한다.

    - append

      ```shell
      sqoop import \
      --connect jdbc:mysql://ip주소:포트/employees?useSSL=false \
      --username '유저명' \
      --password '패스워드' \
      --table employees \
      --incremental append \
      --check-column emp_no \
      --last-value 300024 \
      -m 1 \
      --target-dir /user/hadoop/sqoopMySqlToHdfs
      
      # log
      18/07/18 12:22:44 INFO mapreduce.ImportJobBase: Transferred 4.5658 MB in 97.4951 seconds (47.9554 KB/sec)
      18/07/18 12:22:44 INFO mapreduce.ImportJobBase: Retrieved 100000 records.
      18/07/18 12:22:45 INFO util.AppendUtils: Appending to directory sqoopMySqlToHdfs
      18/07/18 12:22:45 INFO util.AppendUtils: Using found partition 4
      18/07/18 12:22:45 INFO tool.ImportTool: Incremental import complete! To run another incremental import of all data following this import, supply the following arguments:
      18/07/18 12:22:45 INFO tool.ImportTool:  --incremental append
      18/07/18 12:22:45 INFO tool.ImportTool:   --check-column emp_no
      18/07/18 12:22:45 INFO tool.ImportTool:   --last-value 499999
      18/07/18 12:22:45 INFO tool.ImportTool: (Consider saving this with 'sqoop job --create')
      
      # result
      hadoop fs -ls /user/hadoop/sqoopMySqlToHdfs
      Found 6 items
      -rw-r--r--   3 hadoop supergroup          0 2018-07-18 11:16 /user/hadoop/sqoopMySqlToHdfs/_SUCCESS
      -rw-r--r--   3 hadoop supergroup    1227071 2018-07-18 11:15 /user/hadoop/sqoopMySqlToHdfs/part-m-00000
      -rw-r--r--   3 hadoop supergroup     729372 2018-07-18 11:15 /user/hadoop/sqoopMySqlToHdfs/part-m-00001
      -rw-r--r--   3 hadoop supergroup     596856 2018-07-18 11:16 /user/hadoop/sqoopMySqlToHdfs/part-m-00002
      -rw-r--r--   3 hadoop supergroup    1326468 2018-07-18 11:16 /user/hadoop/sqoopMySqlToHdfs/part-m-00003
      -rw-r--r--   3 hadoop supergroup    4637031 2018-07-18 12:22 /user/hadoop/sqoopMySqlToHdfs/part-m-00004
      ```

    - lastmodified

      ```shell
      sqoop import \
      --connect jdbc:mysql://ip주소:포트/employees?useSSL=false \
      --username '유저명' \
      --password '패스워드' \
      --table employees \
      --incremental lastmodified \
      --check-column hire_date \
      --last-value 2017-10-23 \
      -m 1 --target-dir /user/hadoop/sqoopMySqlToHdfs
      
      # log
      18/07/18 13:20:28 INFO tool.ImportTool: Incremental import complete! To run another incremental import of all data following this import, supply the following arguments:
      18/07/18 13:20:28 INFO tool.ImportTool:  --incremental lastmodified
      18/07/18 13:20:28 INFO tool.ImportTool:   --check-column hire_date
      18/07/18 13:20:28 INFO tool.ImportTool:   --last-value 2018-07-18 00:19:38.0
      18/07/18 13:20:28 INFO tool.ImportTool: (Consider saving this with 'sqoop job --create')
      
      # result
      /user/hadoop/sqoopMySqlToHdfs/part-m-00000 (빈 파일)
      ```

      

- export

  hdfs -> mysql

  ```shell
  sqoop export \
  --connect jdbc:mysql://ip주소:포트/employees?useSSL=false \
  --username '유저명' \
  --password '패스워드' \
  --table employees2 \
  -m 1 \
  --export-dir /user/hadoop/sqoopMySqlToHdfs/part-m-00000
  ```



- codegen

  ```shell
  sqoop codegen \
  --connect jdbc:mysql://ip주소:포트/employees?useSSL=false \
  --username '유저명' \
  --password '패스워드' \
  --table employees
  
  # result
  INFO orm.CompilationManager: Writing jar file: /tmp/sqoop-hadoop/compile/5bbd78c7fa1550d51279b6a90aad1997/employees.jar
  ```



- eval
  ```shell
  sqoop eval \
  --connect jdbc:mysql://ip주소:포트/employees?useSSL=false \
  --username '유저명' \
  --password '패스워드' \
  --query "select * from employees"
  
  # result
  ---------------------------------------------------------------------------------
  | emp_no      | birth_date | first_name     | last_name        | gender | hire_date  |
  ---------------------------------------------------------------------------------
  | 10001       | 1953-09-02 | Georgi         | Facello          | M | 1986-06-26 |
  | 10002       | 1964-06-02 | Bezalel        | Simmel           | F | 1985-11-21 |
  | 10003       | 1959-12-03 | Parto          | Bamford          | M | 1986-08-28 |
  ...
  ```



### job

job을 통해 수행할 명령을 기억해 사용할 수 있다.

- Create a Sqoop Job

  ```shell
  # myjob1: import job
  sqoop job \
  --create myjob1 -- import \
  --connect jdbc:mysql://ip주소:포트/employees?useSSL=false \
  --username '유저명' \
  --password '패스워드' \
  --table employees \
  --incremental lastmodified \
  --check-column hire_date \
  --last-value 2017-10-24 \
  -m 1 \
  --target-dir /user/hadoop/sqoopMySqlToHdfs
  
  # myjob2: list-databases
  sqoop job \
  --create myjob2 -- list-databases \
  --connect jdbc:mysql://ip주소:포트/?useSSL=false \
  --username '유저명' \
  --password '패스워드'
  ```

- To manage the job

  ```shell
  # Check the job list
  sqoop job --list
  # out
  Available jobs:
    myjob1
    myjob2
    
  # Execute the job
  sqoop job --exec myjob2
  
  # Show the job
  sqoop job --show myjob1
  
  # Delete the job
  sqoop job --delete myjob2
  ```

  

> Exercise2.
>
> Sqoop usage MySql to HBase

1. 실습 환경 준비

   ```shell
   # Zookeeper
   zkServer.sh start
   
   # Hadoop
   start-all.sh
   
   # HBase
   start-hbase.sh
   ```

2. HBase에 테이블 생성

   ```shell
   hbase shell
   > create 'employees', 'employees_cf'
   ```

3. Sqoop import (MySql to HBase)

   ```shell
   sqoop import \
   --connect jdbc:mysql://ip주소:포트/employees?useSSL=false \
   --username '유저명' \
   --password '패스워드' \
   --table employees \
   --columns "emp_no,first_name,last_name" \
   --hbase-table employees \
   --column-family employees_cf \
   --hbase-row-key emp_no \
   -m 1
   ```

4. HBase에서 결과 확인

   ```shell
   hbase shell
   > scan 'employees'
   ROW                   COLUMN+CELL
    100000               column=employees_cf:first_name, timestamp=1531891007049, value=Hiroyasu
    100000               column=employees_cf:last_name, timestamp=1531891007049, value=Emden
    100001               column=employees_cf:first_name, timestamp=1531891007049, value=Jasminko
    100001               column=employees_cf:last_name, timestamp=1531891007049, value=Antonakopoulos
    100002               column=employees_cf:first_name, timestamp=1531891007049, value=Claudi
    100002               column=employees_cf:last_name,
   ...
   ```

   



## Ref.

- 시작하세요! 하둡 프로그래밍 (2nd), 정재화