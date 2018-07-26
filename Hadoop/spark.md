# Spark

- In-memory 컴퓨팅

  하둡보다 빠른 성능

- 통합된 프레임 워크
  - 일괄 처리
  - 실시간 처리
  - 스트림 분석
  - 기계 학습
  - 대화식 SQL



## Installation

- Scala

  ```shell
  wget https://downloads.lightbend.com/scala/2.12.2/scala-2.12.2.rpm
  rpm -ivh scala-2.12.2.prm
  /usr/share/scala
  ```

- Spark

  ```shell
  wget http://apache.tt.co.kr/spark/spark-2.2.2/spark-2.2.2-bin-hadoop2.7.tgz
  tar -xvf spark-2.2.2-bin-hadoop2.7.tgz
  ```



## Environment setting

> 다음의 환경 설정을 각 서버로 복사한다.

- 환경 변수

  ```shell
  export SPARK_HOME=/home/hadoop/spark-2.2.2-bin-hadoop2.7
  export PATH=$PATH:$SPARK_HOME/bin
  ```

- conf/spark-env.sh

  ```shell
  export JAVA_HOME=/usr/java/default
  ```

- conf/slaves

  ```
  Server02
  Server03
  ```



## Exercise

- Spark 서버 시작

  Hadoop의 `start-all.sh` 명령어와 같으므로 해당 디렉토리를 지정하여 실행한다.

  ```shell
  $SPARK_HOME/sbin/start-all.sh
  #
  starting org.apache.spark.deploy.master.Master, logging to /home/hadoop/spark-2.2.2-bin-hadoop2.7/logs/spark-hadoop-org.apache.spark.deploy.master.Master-1-Server01.out
  Server02: starting org.apache.spark.deploy.worker.Worker, logging to /home/hadoop/spark-2.2.2-bin-hadoop2.7/logs/spark-hadoop-org.apache.spark.deploy.worker.Worker-1-Server02.out
  Server03: starting org.apache.spark.deploy.worker.Worker, logging to /home/hadoop/spark-2.2.2-bin-hadoop2.7/logs/spark-hadoop-org.apache.spark.deploy.worker.Worker-1-Server03.out
  ```

- jps 확인

  ```shell
  # Server01
  8688 Jps
  8587 Master
  
  # Server02
  7452 Worker
  7549 Jps
  
  # Server03
  7447 Worker
  7548 Jps
  ```

- 웹 인터페이스 확인

  http://server01:8080/

- Spark shell 실행 (script mode)

  언어는 Scala를 사용한다.

  그 외에도 pyspark, rspark 실행이 가능하다.

  ```shell
  spark-shell
  #
  Setting default log level to "WARN".
  To adjust logging level use sc.setLogLevel(newLevel). For SparkR, use setLogLevel(newLevel).
  18/07/26 12:17:17 WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform... using builtin-java classes where applicable
  Spark context Web UI available at http://192.168.111.128:4040
  Spark context available as 'sc' (master = local[*], app id = local-1532575039600).
  Spark session available as 'spark'.
  Welcome to
        ____              __
       / __/__  ___ _____/ /__
      _\ \/ _ \/ _ `/ __/  '_/
     /___/ .__/\_,_/_/ /_/\_\   version 2.2.2
        /_/
  
  Using Scala version 2.11.8 (Java HotSpot(TM) 64-Bit Server VM, Java 1.8.0_171)
  Type in expressions to have them evaluated.
  Type :help for more information.
  
  scala>
  ```



- Wordcount 실습

  > README.md 파일로 실습한다.
  >
  > 해당 파일이 있는 위치에서 spark-shell 을 실행해야 한다.

  ```scala
  // Select file
  scala> val inputfile = sc.textFile("README.md")
  //
  inputfile: org.apache.spark.rdd.RDD[String] = README.md MapPartitionsRDD[1] at textFile at <console>:24
  
  // Count line number
  scala> inputfile.count()
  res0: Long = 103
  
  // Split
  scala> val words = inputfile.flatMap(line => line.split(" "))
  scala> words.collect()
  res1: Array[String] = Array(#, Apache, Spark, "", Spark, is, a, fast, and, general, cluster, computing, system, for, Big, Data., It, provides, high-level, APIs, in, Scala,, Java,, Python,, and, R,, and, an, optimized, engine, that, supports, general, computation, graphs, for, data, analysis., It, also, supports, a, rich, set, of, higher-level, tools, including, Spark, SQL, for, SQL, and, DataFrames,, MLlib, for, machine, learning,, GraphX, for, graph, processing,, and, Spark, Streaming, for, stream, processing., "", <http://spark.apache.org/>, "", "", ##, Online, Documentation, "", You, can, find, the, latest, Spark, documentation,, including, a, programming, guide,, on, the, [project, web, page](http://spark.apache.org/documentation.html)., This, README, file, only, contains, basic, se...
  
  // Map
  scala> val mapWords = words.map(word => (word, 1))
  scala> mapWords.collect()
  res2: Array[(String, Int)] = Array((#,1), (Apache,1), (Spark,1), ("",1), (Spark,1), (is,1), (a,1), (fast,1), (and,1), (general,1), (cluster,1), (computing,1), (system,1), (for,1), (Big,1), (Data.,1), (It,1), (provides,1), (high-level,1), (APIs,1), (in,1), (Scala,,1), (Java,,1), (Python,,1), (and,1), (R,,1), (and,1), (an,1), (optimized,1), (engine,1), (that,1), (supports,1), (general,1), (computation,1), (graphs,1), (for,1), (data,1), (analysis.,1), (It,1), (also,1), (supports,1), (a,1), (rich,1), (set,1), (of,1), (higher-level,1), (tools,1), (including,1), (Spark,1), (SQL,1), (for,1), (SQL,1), (and,1), (DataFrames,,1), (MLlib,1), (for,1), (machine,1), (learning,,1), (GraphX,1), (for,1), (graph,1), (processing,,1), (and,1), (Spark,1), (Streaming,1), (for,1), (stream,1), (processing.,1), ...
                                     
  // Reduce
  scala> val counts = mapWords.reduceByKey(_+_)
  // scala> val counts = mapWrods.reduceByKey{case (x, y) => x + y}
  scala> counts.collect()
  res3: Array[(String, Int)] = Array((package,1), (this,1), (Version"](http://spark.apache.org/docs/latest/building-spark.html#specifying-the-hadoop-version),1), (Because,1), (Python,2), (page](http://spark.apache.org/documentation.html).,1), (cluster.,1), (its,1), ([run,1), (general,3), (have,1), (pre-built,1), (YARN,,1), (locally,2), (changed,1), (locally.,1), (sc.parallelize(1,1), (only,1), (several,1), (This,2), (basic,1), (Configuration,1), (learning,,1), (documentation,3), (first,1), (graph,1), (Hive,2), (info,1), (["Specifying,1), ("yarn",1), ([params]`.,1), ([project,1), (prefer,1), (SparkPi,2), (<http://spark.apache.org/>,1), (engine,1), (version,1), (file,1), (documentation,,1), (MASTER,1), (example,3), (["Parallel,1), (are,1), (params,1), (scala>,1), (DataFrames,,1), (provides,...
  ```

  

  

  

