# Flume

다양한 소스의 로그 파일, 이벤트 등과 같은 대량의 스트리밍 데이터를 집계하고 수집 및 전송하기 위한 툴, 서비스이자 데이터 처리 메커니즘

신뢰성이 높고 분산처리가 가능하다.



## Architecture

- Agent

  독립 데몬 프로세스(JVM)

  클라이언트 또는 다른 agent로부터 데이터(이벤트)를 수신하여 다음 대상(sink or agent)로 전달한다.



![Flume Agent](https://flume.apache.org/_images/DevGuide_image00.png)



## Installation

- Flume

  ```shell
  wget http://archive.apache.org/dist/flume/1.7.0/apache-flume-1.7.0-bin.tar.gz
  tar xvfz flume-1.7.0-bin.tar.gz
  ```

  

## Environment Setting

- Hadoop 환경변수 확인

  ```shell
  export CLASSPATH=$CLASSPATH:$HADOOP_HOME/lib/*
  ```

- Flume 환경변수 추가

  ```shell
  export FLUME_HOME=/home/hadoop/apache-flume-1.7.0-bin
  export PATH=$PATH:$FLUME_HOME/bin
  export CLASSPATH=$CLASSPATH:$FLUME_HOME/lib/*:.
  ```

- Flume 환경 설정

  template 파일 복사 후 수정

  ```shell
  # conf/flume-env.sh
  export JAVA_HOME=/usr/java/default
  ```




## Exercise

### Local

- Flume configuration 설정

  ```shell
  # conf/flume-conf.properties
  agent.sources = seqGenSrc
  agent.channels = memoryChannel
  agent.sinks = h1
  
  agent.sources.seqGenSrc.type = seq
  agent.sources.seqGenSrc.channels = memoryChannel
  
  agent.channels.memoryChannel.type = memory
  agent.channels.memoryChannel.capacity = 1000
  agent.channels.memoryChannel.transactionCapacity = 100
  agent.channels.memoryChannel.batchSize = 1
  
  agent.sinks.h1.type = hdfs
  agent.sinks.h1.hdfs.path = hdfs://server01:9000/user/hadoop/flume_logs/
  agent.sinks.h1.hdfs.filePrefix = log
  agent.sinks.h1.hdfs.fileType = DataStream
  agent.sinks.h1.hdfs.writeFormat = Text
  agent.sinks.h1.hdfs.batchSize = 100
  agent.sinks.h1.hdfs.rollSize = 0
  agent.sinks.h1.hdfs.rollCount = 10
  agent.sinks.h1.channel = memoryChannel
  ```

- Flume 실행

  하둡 실행 상태 확인 후 다음 실습을 진행한다.

  >  0부터 카운트를 시작하여 10씩 끊어 hdfs에 저장한다.

  ```shell
  flume-ng agent \
  --conf-file $FLUME_HOME/conf/flume-conf.properties \
  -n agent \
  -Dflume.root.logger=INFO,console
  ```

- 웹(https://server01:50070) 또는 콘솔에서 실행 결과를 확인해 본다.

  ```shell
  # first file
  0
  1
  2
  3
  4
  5
  6
  7
  8
  9
  ```

  

### Sender - Receiver

다음 설정을 구현한다.

> - Sender - Server02
>   - Source: /home/hadoop/spooldir
>   - Channel: file
>   - Sink: avro
> - Receiver - Server01
>   - Source: avro
>   - Channel: file
>   - Sink: hdfs



1. Server02에 spooldir/ 생성

   ```shell
   mkdir /home/hadoop/spooldir
   ```

2. conf/ 설정

   - Server02

     ```shell
     # conf/Sender.conf
     Sender.sources = spooldir-source  
     Sender.channels = file-channel
     Sender.sinks = avro-sink
      
     Sender.sources.spooldir-source.type = spooldir
     Sender.sources.spooldir-source.spoolDir = /home/hadoop/spooldir
      
     Sender.sinks.avro-sink.type = avro
     Sender.sinks.avro-sink.hostname = ip주소 
     Sender.sinks.avro-sink.port = 11111
     
     Sender.channels.file-channel.type = file
     Sender.channels.file-channel.checkpointDir = /home/hadoop/testflume/checkpoint/
     Sender.channels.file-channel.dataDirs = /home/hadoop/testflume/data/
      
     Sender.sources.spooldir-source.channels = file-channel
     Sender.sinks.avro-sink.channel = file-channel
     ```

   - Server01

     ```shell
     # conf/Receiver.conf
     Receiver.sources = avro-source  
     Receiver.channels = file-channel
     Receiver.sinks = hdfs-sink
      
     Receiver.sources.avro-source.type = avro
     Receiver.sources.avro-source.bind = 0.0.0.0
     Receiver.sources.avro-source.port = 11111
      
     Receiver.sinks.hdfs-sink.type = hdfs
     Receiver.sinks.hdfs-sink.hdfs.path = hdfs://Server01:9000/user/hadoop/flume/
     Receiver.sinks.hdfs-sink.hdfs.rollInterval = 0
     Receiver.sinks.hdfs-sink.hdfs.rollSize = 0
     Receiver.sinks.hdfs-sink.hdfs.rollCount = 10000
     Receiver.sinks.hdfs-sink.hdfs.fileType = DataStream
      
     #Use a channel which buffers events in file
     Receiver.channels.file-channel.type = file
     Receiver.channels.file-channel.checkpointDir = /home/hadoop/testflume/checkpoint/
     Receiver.channels.file-channel.dataDirs = /home/hadoop/testflume/data/
      
     Receiver.sources.avro-source.channels = file-channel
     Receiver.sinks.hdfs-sink.channel = file-channel
     ```

3. Flume 실행

   - Server01

     ```shell
     flume-ng agent \
     --conf-file $FLUME_HOME/conf/Receiver.conf \
     -n Receiver \
     -Dflume.root.logger=INFO,console
     ```

   - Server02 (root 계정)

     ```shell
     flume-ng agent \
     --conf-file $FLUME_HOME/conf/Sender.conf \
     --name Sender \
     -Dflume.root.logger=INFO,console
     ```

4. 테스트

   1. Server02의 spooldir/ 변경

      ```shell
      # Create test.txt file
      Hello, World!
      ```

   2. 결과 확인

      ```shell
      # Server02 - spooldir/
      test.txt.COMPLETED
      
      # Hadoop - /user/hadoop/flume
      -rw-r--r--   3 hadoop supergroup          6 2018-07-18 16:17 /user/hadoop/flume/FlumeData.1531898273132.tmp
      # file contents
      Hello, World!
      ```

      

