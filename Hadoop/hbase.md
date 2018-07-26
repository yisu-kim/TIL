# HBase

하둡 HDFS 위에서 작동하는 비관계형 분산 데이터베이스

Large 데이터를 저장하고 임의의 엑세스(Random Access)가 가능하다.

열 기반 데이터베이스(column-oriented database)이며 테이블은 행 별로 정렬된다.

온라인 분석 처리(OLAP)에 적합하다.



## Installation

```shell
wget http://archive.apache.org/dist/hbase/1.2.6/hbase-1.2.6-bin.tar.gz
tar xvfz hbase-1.2.6-bin.tar.gz
```



## Environment Setting

> 완전분산모드로 구축

1. 환경변수 설정

   ```shell
   export HBASE_HOME=/home/hadoop/hbase-1.2.6
   export PATH=$PATH:$HBASE_HOME/bin
   ```

2. conf/hbase-env.sh

   ```shell
   export JAVA_HOME=/usr/java/default
   export HBASE_PID_DIR=/home/hadoop/hbase-1.2.6/pids
   export HBASE_MANAGES_ZK=false
   # cluster mode
   export HADOOP_CONF_DIR=/home/hadoop/hadoop-2.7.6/etc/hadoop
   export HBASE_CLASSPATH=$HBASE_CLASSPATH:$HADOOP_CONF_DIR
   ```

3. conf/hbase-site.xml

   ```xml
   <configuration>
     <property>
       <name>hbase.rootdir</name>
       <value>hdfs://hadoop-cluster/hbase</value>
     </property>
     <property>
       <name>hbase.zookeeper.quorum</name>
       <value>Server01,Server02,Server03</value>
     </property>
     <property>
       <name>hbase.zookeeper.property.dataDir</name>
       <value>/home/hadoop/zookeeper-3.4.10/data</value>
     </property>
     <property>
       <name>hbase.cluster.distributed</name>
       <value>true</value>
     </property>
   </configuration>
   ```

4. conf/regionservers

   ```
   Server02
   Server03
   ```

   

## Exercise

1. Zookeeper 실행

   ```shell
   # Server01, Server02, Server03
   zkServer.sh start
   ```

2. HDFS 실행

   ```shell
   start-all.sh
   ```

3. HBase 실행

   ```shell
   start-hbase.sh
   ```

4. jps 확인

   Server01에는 HMaster, Server02와 Server03에는 HRegionServer가 구동된다.

   ```shell
   # Server01
   2610 ResourceManager
   3298 Jps
   2234 NameNode
   2027 QuorumPeerMain
   3164 HMaster
   2445 SecondaryNameNode
   
   # Server02
   2096 QuorumPeerMain
   2678 HRegionServer
   2311 NodeManager
   2204 DataNode
   2863 Jps
   
   # Server03
   2928 Jps
   2195 DataNode
   2295 NodeManager
   2088 QuorumPeerMain
   2670 HRegionServer
   ```

5. 웹 인터페이스 확인

   - HMaster: http://server01:16010
   - HRegionServer: http://server02:16030, http://server03:16030

6. HBase shell 실행

   ```shell
   hbase shell
   ...
   hbase(main):001:0>
   ```

7. shell 실습

   ```shell
   >status
   1 active master, 0 backup masters, 2 servers, 0 dead, 2.0000 average load
   
   >version
   1.2.6, rUnknown, Mon May 29 02:25:32 CDT 2017
   
   >create 'emp', 'personal data', 'pro data'
   =>Hbase::Table-emp
   
   >list
   TABLE
   emp
   => ["emp"]
   
   >put 'emp', '1', 'personal data:name', 'dennis'
   >put 'emp', '1', 'personal data:city', 'seoul'
   
   >get 'emp', '1'
   COLUMN                CELL
    personal data:city   timestamp=1531722818603, value=seoul
    personal data:name   timestamp=1531722779906, value=dennis
   
   >scan 'emp'
   ROW                   COLUMN+CELL
    1                    column=personal data:city, timestamp=1531722818603, value=seoul
    1                    column=personal data:name, timestamp=1531722779906, value=dennis
   
   >disable 'emp'
   >enable 'emp'
   
   >drop 'emp'
   
   >exit
   ```

8. 종료

   ```shell
   # HBase
   stop-hbase.sh
   
   # Hadoop
   stop-all.sh
   
   # Zookeeper
   zkServer.sh stop
   ```

   

