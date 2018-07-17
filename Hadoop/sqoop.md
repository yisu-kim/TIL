# Sqoop

SQl to hadOOP = SQOOP

RDBMS와 Hadoop 간에 대용량 데이터들을 효율적으로 변환해 주는 도구

데이터의 import/export를 맵리듀스를 통해 처리하여 장애 허용 능력과 병렬 처리 능력을 갖춤



> 본 실습에서는 sqoop1을 hadoop-2.7.6 버전 위에서 구동시킨다.
>
> http://sqoop.apache.org/ 를 통해 다운받을 수 있다.

1. sqoop-1.4.7 버전을 다운로드 하고 압축을 푼다.

   ```shell
   wget http://apache.tt.co.kr/sqoop/1.4.7/sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz
   tar xvfz sqoop-1.4.7.bin__hadoop-2.6.0.tar.gz
   ```

2. MySql이 설치되었다고 가정하고 이 과정은 생략한다.

3. mysql-connector-java를 다운로드 후 압축을 푼다.

   ```shell
   wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-5.1.46.tar.gz
   tar xvfz mysql-connector-java-5.1.46.tar.gz
   ```

4. mysql-connector-java-5.1.46-bin.jar 파일을 sqoop의 lib/ 로 복사한다.

   ```shell
   cp mysql-connector-java-5.1.46/mysql-connector-java-5.1.46-bin.jar sqoop-1.4.7.bin__hadoop-2.6.0/lib
   ```

5. sqoop 환경 설정

   template 파일을 복사 후 수정하였다.

   ```shell
   # conf/sqoop-env.sh
   export HADOOP_COMMON_HOME=/home/hadoop/hadoop-2.7.6
   export HADOOP_MAPRED_HOME=/home/hadoop/hadoop-2.7.6
   ```

6. sqoop 환경 변수

   ```shell
   # .bash_profile
   export SQOOP_HOME=/home/hadoop/sqoop-1.4.7.bin__hadoop-2.6.0
   export PATH=$PATH:$SQOOP_HOME/bin
   ```

7. sqoop 실행

   > RDBMS인 mysql의 데이터를 hdfs로 import 해보고, 반대로 hdfs의 데이터를 mysql로 export해본다.

   하둡이 실행되어 있어야 한다. (완전분산모드의 경우 zookeeper도 실행)

   구체적인 값은 본인의 mysql 서버의 설정에 따른다.

   ```shell
   # check database list
   sqoop list-databases --connect jdbc:mysql://ip주소:포트/?useSSL=false --username '유저명' --password '패스워드'
   
   # import (mysql -> hdfs)
   sqoop import --connect jdbc:mysql://ip주소:포트/데이터베이스명?useSSL=false --username '유저명' --password '패스워드' --table 테이블명 -m 1 --target-dir /user/hadoop/sqoopMySqlToHdfs
   
   # check import result
   hadoop fs -tail /user/hadoop/sqoopMySqlToHdfs/part-m-00000
   
   # export (hdfs -> mysql)
   sqoop export --connect jdbc:mysql://ip주소:포트/데이터베이스명?useSSL=false --username '유저명' --password '패스워드' --table 테이블명 -m 1 --export-dir /user/hadoop/sqoopMySqlToHdfs/part-m-00000
   ```

   