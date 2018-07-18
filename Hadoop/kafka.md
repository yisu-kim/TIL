# Kafka

Building real-time data pipelines and streaming apps

게시(Publish) - 가입(Subscribe) 기반 메시징 시스템

분산 처리가 가능해 처리량, 파티셔닝, 복제 및 내결함성이 뛰어나 대규모 메시지 처리 응용 프로그램에 적합



## Installation

```shell
wget https://archive.apache.org/dist/kafka/1.0.1/kafka_2.11-1.0.1.tgz
tar xvfz kafka_2.11-1.0.1.tgz
```



## Exercise

> Standalone 모드로 실습



single node - single broker

>  각각 putty 새 창을 열어 명령을 실행한다.

1. Start zookeeper server

   ```shell
   # start
   bin/zookeeper-server-start.sh config/zookeeper.properties
   # stop
   bin/zookeeper-server-stop.sh config/zookeeper.properties
   ```

2. Start kafka server

   ```shell
   # start
   bin/kafka-server-start.sh config/server.properties
   # stop
   bin/kafka-server-stop.sh config/server.properties
   ```

   jps로 확인

   ```shell
   2371 Kafka
   2038 QuorumPeerMain
   2744 Jps
   ```

3. Create topic

   ```shell
   # Create Topic
   bin/kafka-topics.sh --create \
   --zookeeper localhost:2181 \
   --replication-factor 1 \
   --partitions 1 \
   --topic Hello-Kafka
   # out
   Created topic "Hello-Kafka".
   
   # List of Topics
   bin/kafka-topics.sh --list \
   --zookeeper localhost:2181
   # out
   Hello-Kafka
   ```

4. Start producer

   ```shell
   # Start Producer to Send Messages
   bin/kafka-console-producer.sh \
   --broker-list localhost:9092 \
   --topic Hello-Kafka
   # out
   >test message
   >안녕
   ```

5. Start consumer

   ```shell
   # Start Consumer to Receive Messages
   bin/kafka-console-consumer.sh \
   --zookeeper localhost:2181 \
   --topic Hello-Kafka \
   --from-beginning
   # out
   test message
   안녕
   ```

   

여러 producer, consumer를 생성할 수 있다. 동일한 topic을 지정하면 같은 메세지가 전달된다.