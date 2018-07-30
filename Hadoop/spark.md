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

> standalone mode, local file로 실습한다.

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

  http://server01:8080/ (Web UI)

  http://server01:4040/ (Job Monitor UI)

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

  

> cluster mode, hdfs file로 실습한다.

0. conf/spark-env.sh

   ```shell
   export HADOOP_CONF_DIR=/home/hadoop/hadoop-2.7.6/etc/hadoop
   ```

1. HDFS, Spark cluster 실행

   ```shell
   # Zookeeper: Server01, Server02, Server03
   zkServer.sh start
   
   # HDFS
   start-dfs.sh
   
   # Spark
   $SPARK_HOME/sbin/start-all.sh
   ```

2. hdfs에 실습 파일(baby_names.csv)을 올린다.

   ```shell
   hadoop fs -mkdir input_baby
   hadoop fs -put baby_names.csv input_baby
   ```

3. spark-shell

   ```shell
   spark-shell --master spark://Server01:7077
   ```

4. word count

   ```scala
   // Select Input file
   scala> val babyNames = sc.textFile("hdfs://hadoop-cluster/user/hadoop/input_baby/baby_names.csv")
   babyNames: org.apache.spark.rdd.RDD[String] = hdfs://hadoop-cluster/user/hadoop/input_baby/baby_names.csv MapPartitionsRDD[1] at textFile at <console>:24
   
   // First line
   scala> babyNames.first()
   res0: String = Year,First Name,County,Sex,Count
   
   // Count
   scala> babyNames.count
   res1: Long = 145571
   
   // Split
   scala> val words = babyNames.flatMap(line => line.split(","))
   words: org.apache.spark.rdd.RDD[String] = MapPartitionsRDD[32] at flatMap at <console>:26
   
   // Map
   scala> val counts = words.map(word => (word, 1)).reduceByKey(_+_)
   counts: org.apache.spark.rdd.RDD[(String, Int)] = ShuffledRDD[34] at reduceByKey at <console>:28
   
   scala> counts.collect
   res14: Array[(String, Int)] = Array((ELLOWYN,3), (GLEYDEN,1), (JA'NYLAH,1), (VIANKA,1), (ORLYN,1), (JUSTIN XAVIER,1), (CORNELLIUS,1), (REGINA-MAE,1), (EDA,3), (RORY,45), (GIA ROSE,1), (DEMERISE,1), (ARYA ISABELLE,1), (ADITYO,1), (PERY,1), (TEMPHRIS,1), (SUZANNA,6), (LAZARUS,5), (ESIAH,1), (SOFIAH,1), (JAMELY,2), (FRANCESCO PIO,1), (PAUL,112), (VIIN'CHRIST,1), (DEZIIRAYE,1), (JELISA,1), (VENACE,1), (BOWERY,1), (MARLEY,32), (OLIVIA,362), (ARINOLA,1), (JASIQ,1), (LING,2), (DAJHON,1), (NICOLA,7), (DA RIYAH,1), (HALEIGH,4), (SHANAGH,1), (KYIA,1), (FALLON,10), (KINBERLY,2), (AKEANIA,1), (JETON,1), (KATTILEYA,1), (GIOVAN,1), (SPENSER,1), (XOE,1), (GEMAYRA,1), (KUSHAL,2), (DEVYN-BLAKE,1), (YAMAMAH,1), (MISHKATUN,1), (178,2), (VALERIE,82), (CALISSA,2), (AMANE,1), (XADICHABONU,1), (EDERSON,1), (A...
   
   // Save output file
   scala> counts.saveAsTextFile("hdfs://hadoop-cluster/user/hadoop/output_baby")
   ```

5. word count 결과

   ```shell
   hadoop fs -cat output_baby/*
   (JA'NYLAH,1)
   (GLEYDEN,1)
   (SHERALYN,1)
   (VIANKA,1)
   (CALAHAN,1)
   (CORNELLIUS,1)
   (REGINA-MAE,1)
   (EDA,3)
   (RORY,45)
   (ARYA ISABELLE,1)
   ...
   ```

   

## RDD (Resilient Distributed Dataset)

Apache Spark의 기본 데이터 구조

각 데이터 세트는 여러 서버로 논리적으로 파티셔닝되어 클러스터의 다른 노드에서 계산된다.

계보 그래프(DAG)를 사용하여 복원력(resilient)이 뛰어나고 결함 내성(fault-tolerant)이 있어 누락되거나 손상된 파티션을 재계산할 수 있다.



### Transformation

| Name                                      | Use                                                          |
| ----------------------------------------- | ------------------------------------------------------------ |
| map()                                     | RDD의 각 요소에 함수를 적용하고 결과 RDD를 되돌려 준다.      |
| flatMap()                                 | RDD의 각 요소에 함수를 적용하고 반환된 반복자의 내용들로 이루어진 RDD를 되돌려 준다. 종종 단어 분해를 위해 쓰인다. |
| filter()                                  | filter()로 전달된 함수의 조건을 통과한 값으로만 이루어진 RDD를 되돌려 준다. |
| distinct()                                | 중복 제거                                                    |
| sample(withReplacement, fraction, [seed]) | 복원 추출(withReplacement=true)이나 비복원 추출로 RDD에서 표본을 뽑아낸다. |
| union()                                   | 두 RDD에 있는 데이터들을 합한 RDD를 생성한다. 다만, 집합이 아니므로 중복이 있을 수 있다. |
| intersection()                            | 두 RDD에 모두 있는 데이터들만을 가진 RDD를 반환한다.         |
| subtract()                                | 한 RDD가 가진 데이터를 다른 쪽에서 삭제한다.                 |
| cartesian()                               | 두 RDD의 카테시안 곱                                         |



Transformation 실습

```scala
// map(func)
scala> val babyNames.textFile("hdfs://hadoop-cluster/user/hadoop/input_baby/baby_names.csv")

scala> val rows = babyNames.map(line => line.split(",")).collect
res52: Array[Array[String]] = Array(Array(Year, First Name, County, Sex, Count), Array(2013, GAVIN, ST LAWRENCE, M, 9), Array(2013, LEVI, ST LAWRENCE, M, 9), Array(2013, LOGAN, NEW YORK, M, 44), Array(2013, HUDSON, NEW YORK, M, 49), Array(2013, GABRIEL, NEW YORK, M, 50), Array(2013, THEODORE, NEW YORK, M, 51), Array(2013, ELIZA, KINGS, F, 16), Array(2013, MADELEINE, KINGS, F, 16), Array(2013, ZARA, KINGS, F, 16), Array(2013, DAISY, KINGS, F, 16), Array(2013, JONATHAN, NEW YORK, M, 51), Array(2013, CHRISTOPHER, NEW YORK, M, 52), Array(2013, LUKE, SUFFOLK, M, 49), Array(2013, JACKSON, NEW YORK, M, 53), Array(2013, JACKSON, SUFFOLK, M, 49), Array(2013, JOSHUA, NEW YORK, M, 53), Array(2013, AIDEN, NEW YORK, M, 53), Array(2013, BRANDON, SUFFOLK, M, 50), Array(2013, JUDY, KINGS, F, 16), Array...

// flatMap(func) vs. map(func)
scala> sc.parallelize(List(1, 2, 3)).flatMap(x => List(x, x, x)).collect
res53: Array[Int] = Array(1, 1, 1, 2, 2, 2, 3, 3, 3)

scala> sc.parallelize(List(1, 2, 3)).map(x => List(x, x, x)).collect
res54: Array[List[Int]] = Array(List(1, 1, 1), List(2, 2, 2), List(3, 3, 3))

// filter

scala> val david = rows.filter(line => line(1).contains("DAVID")).collect
res56: Array[Array[String]] = Array(Array(2013, DAVID, NEW YORK, M, 53), Array(2013, DAVID, SUFFOLK, M, 51), Array(2013, DAVID, KINGS, M, 272), Array(2013, DAVID, NASSAU, M, 40), Array(2013, DAVID, MONROE, M, 12), Array(2013, DAVID, ALBANY, M, 5), Array(2013, DAVID, RENSSELAER, M, 5), Array(2013, DAVID, RICHMOND, M, 20), Array(2013, DAVID, BRONX, M, 87), Array(2013, DAVID, ROCKLAND, M, 44), Array(2013, DAVID, QUEENS, M, 136), Array(2013, DAVID, CHAUTAUQUA, M, 5), Array(2013, DAVID, DUTCHESS, M, 10), Array(2013, DAVID, ORANGE, M, 35), Array(2013, DAVID, ERIE, M, 22), Array(2013, DAVID, ONONDAGA, M, 17), Array(2013, DAVID, WESTCHESTER, M, 31), Array(2013, DAVID, ONEIDA, M, 8), Array(2013, DAVID, NIAGARA, M, 8), Array(2013, DAVID, SCHENECTADY, M, 5), Array(2012, DAVID, ULSTER, M, 5), Array...

// union
scala> val par = sc.parallelize(1 to 9)
par: org.apache.spark.rdd.RDD[Int] = ParallelCollectionRDD[95] at parallelize at <console>:24

scala> val par2 = sc.parallelize(5 to 15)
par2: org.apache.spark.rdd.RDD[Int] = ParallelCollectionRDD[96] at parallelize at <console>:24

scala> par.union(par2).collect
res57: Array[Int] = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)

// intersection
scala> par.intersection(par2).collect
res58: Array[Int] = Array(8, 9, 5, 6, 7)

// distinct
scala> par.union(par2).distinct.collect
res59: Array[Int] = Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)

// The Keys
scala> val babyNames.textFile("hdfs://hadoop-cluster/user/hadoop/input_baby/baby_names.csv")

scala> val rows = babyNames.map(line => line.split(","))

// groupByKey
scala> val namesToCounties = rows.map(name => (name(1), name(2)))
namesToCounties: org.apache.spark.rdd.RDD[(String, String)] = MapPartitionsRDD[108] at map at <console>:28

scala> namesToCounties.groupByKey.collect
res60: Array[(String, Iterable[String])] = Array((SHERALYN,CompactBuffer(Kings)), (GLEYDEN,CompactBuffer(Bronx)), (JA'NYLAH,CompactBuffer(Bronx)), (VIANKA,CompactBuffer(Bronx)), (ORLYN,CompactBuffer(Bronx)), (REGINA-MAE,CompactBuffer(Niagara)), (CORNELLIUS,CompactBuffer(Suffolk)), (EDA,CompactBuffer(Kings, Queens, Suffolk)), (RORY,CompactBuffer(Erie, Jefferson, Kings, Kings, Lewis, Madison, Monroe, Nassau, New York, New York, Niagara, Niagara, Oneida, Onondaga, Ontario, Queens, Rensselaer, Richmond, Saratoga, Saratoga, Schenectady, Schuyler, Steuben, Suffolk, Suffolk, Sullivan, Ulster, Wayne, Westchester, Yates, WESTCHESTER, ERIE, WESTCHESTER, Erie, Kings, Nassau, New York, Suffolk, Bronx, Broome, Chenango, Clinton, Cortland, Delaware, Dutchess)), (DEMERISE,CompactBuffer(Onondaga)), (GI...

// reduceByKey
scala> val filteredRows = babyNames.filter(line => !line.contains("Count")).map(line => line.split(","))
filteredRows: org.apache.spark.rdd.RDD[Array[String]] = MapPartitionsRDD[111] at map at <console>:26

scala> filteredRows.map(n => (n(1), n(4).toInt)).reduceByKey((v1, v2) => v1 + v2).collect
res61: Array[(String, Int)] = Array((JA'NYLAH,1), (GLEYDEN,1), (SHERALYN,1), (VIANKA,1), (CALAHAN,1), (CORNELLIUS,1), (REGINA-MAE,1), (EDA,3), (RORY,107), (ARYA ISABELLE,1), (GIA ROSE,1), (DEMERISE,1), (ADITYO,1), (PERY,1), (TEMPHRIS,1), (SUZANNA,7), (LAZARUS,6), (ESIAH,2), (SOFIAH,1), (JAMELY,2), (FRANCESCO PIO,1), (PAUL,1053), (VIIN'CHRIST,1), (DEZIIRAYE,1), (JELISA,1), (VENACE,1), (BOWERY,1), (MARLEY,117), (OLIVIA,10200), (ARINOLA,1), (LING,2), (DAJHON,1), (JASIQ,1), (NICOLA,8), (HALEIGH,4), (FALLON,24), (SHANAGH,1), (KYIA,1), (DA RIYAH,1), (KINBERLY,2), (AKEANIA,1), (JETON,1), (KATTILEYA,1), (GIOVAN,1), (SPENSER,1), (XOE,1), (GEMAYRA,1), (KUSHAL,3), (DEVYN-BLAKE,1), (YAMAMAH,1), (MISHKATUN,1), (CALISSA,2), (VALERIE,928), (AMANE,1), (XADICHABONU,1), (EDERSON,1), (AVIYAN,1), (CHUKWUNO...

// aggregateByKey
scala> filteredRows.map(n => (n(1), n(4))).aggregateByKey(0)((k, v) => v.toInt + k, (v, k) => k + v).sortBy(_._2).collect
res62: Array[(String, Int)] = Array((BRADLAY,1), (WYAN,1), (YEYLING,1), (GEMINA,1), (AGAPAE,1), (SAMMAYA,1), (JULIY,1), (TORSTEN,1), (KONA,1), (SHEYONNE,1), (AYUSHMAAN,1), (J'ANA,1), (TEJUS,1), (KIMURA,1), (ELLIAN,1), (NYIEL,1), (J'ANAIA,1), (CAMILA LIZETH,1), (DIOGOU,1), (ABEDA,1), (ATRIS,1), (EYSIAH,1), (JIMICA,1), (GEDALIAH,1), (SCARLETT ROSE,1), (SAREENA,1), (ALEJANDRO MARTIN,1), (LUXDEI,1), (JIANNA CHARLIZE,1), (MARLYSE,1), (ELIVYN,1), (RAYHON,1), (RITESH,1), (OSAN,1), (HARVEER,1), (RAFIUR,1), (SIMRANJIT,1), (MARCOSTEVEN,1), (JHEIREN,1), (HAMIDULLAH,1), (SAMRIDDHI,1), (TI'SHAWN,1), (TYMON,1), (ONDINE,1), (TAIGH,1), (NEDZBUDIN,1), (MENDEECEE,1), (ERIQ,1), (ROYALTII,1), (NICKOLAOS,1), (OLYAN,1), (GABRIELI,1), (RACANELLI,1), (BRIANDA,1), (CALIANNA,1), (MEEDEE,1), (ANAYSHA,1), (MOHAMME...

// sortByKey
// ascending
scala> filteredRows.map(n => (n(1), n(4))).sortByKey().collect.foreach(println)
res64:
(A M JANSON,1)
(A MATEO,1)
(A MIAH,1)
(A RIYAH,1)
(A SHAAD,1)
...

// descending
scala> filteredRows.map(n => (n(1), n(4))).sortByKey(false).collect.foreach(println)
res65:
(ZYVETTE,1)
(ZYSHONNE,1) (ZYSHAWNE,1)
(ZYRION,1)
(ZYREE,1)
...

// join
scala> val names1 = sc.parallelize(List("abe", "abby", "apple")).map(a => (a, 1))
names1: org.apache.spark.rdd.RDD[(String, Int)] = MapPartitionsRDD[138] at map at <console>:24

scala> val names2 = sc.parallelize(List("apple", "beatty", "beatrice")).map(a => (a, 1))
names2: org.apache.spark.rdd.RDD[(String, Int)] = MapPartitionsRDD[140] at map at <console>:24

scala> names1.join(names2).collect
res77: Array[(String, (Int, Int))] = Array((apple,(1,1)))

scala> names1.leftOuterJoin(names2).collect
res78: Array[(String, (Int, Option[Int]))] = Array((abe,(1,None)), (abby,(1,None)), (apple,(1,Some(1))))

scala> names1.rightOuterJoin(names2).collect
res79: Array[(String, (Option[Int], Int))] = Array((apple,(Some(1),1)), (beatrice,(None,1)), (beatty,(None,1)))
```



### Action

| Name                                     | Use                                       |
| ---------------------------------------- | ----------------------------------------- |
| collect()                                | RDD의 모든 데이터 요소 리턴               |
| count()                                  | RDD의 요소 개수 리턴                      |
| countByValue()                           | RDD에 있는 각 값의 개수 리턴              |
| take(num)                                | RDD의 값들 중 num개 리턴                  |
| top(num)                                 | RDD의 값들 중 상위 num개 리턴             |
| takeOrdered(num)(ordering)               | 제공된 ordering 기준으로 num개 값 리턴    |
| takeSample(withReplacement, num, [seed]) | 무작위 값들 리턴                          |
| reduce(func)                             | RDD 값들을 병렬로 병합 연산               |
| fold(zero)(func)                         | reduce()와 동일하나 zero 값을 넣어 준다.  |
| aggregate(zeroValue)(seqOp, combOp)      | reduce()와 유사하나 다른 타입을 리턴한다. |
| foreach(func)                            | RDD의 각 값에 func을 적용한다.            |



Action 실습

```scala
// reduce
scala> val names1 = sc.parallelize(List("abe", "abby", "apple"))
names1: org.apache.spark.rdd.RDD[String] = ParallelCollectionRDD[3] at parallelize at <console>:25

scala> names1.reduce((t1, t2) => t1 + t2)
res1: String = abbyabeapple

scala> names1.flatMap(k => List(k.size)).reduce((t1, t2) => t1 + t2)
res2: Int = 12

scala> val names2 = sc.parallelize(List("apple", "beatty", "beatrice")).map(a => (a, a.size))
names2: org.apache.spark.rdd.RDD[(String, Int)] = MapPartitionsRDD[6] at map at <console>:25

scala> names2.flatMap(t => Array(t._2)).reduce(_+_)
res3: Int = 19

// collect
scala> sc.parallelize(List(1, 2, 3)).flatMap(x => List(x, x, x)).collect
res4: Array[Int] = Array(1, 1, 1, 2, 2, 2, 3, 3, 3)

scala> sc.parallelize(List(1, 2, 3)).map(x => List(x, x, x)).collect
res5: Array[List[Int]] = Array(List(1, 1, 1), List(2, 2, 2), List(3, 3, 3))

// count
scala> names2.count
res6: Long = 3

// first
scala> names2.first
res7: (String, Int) = (apple,5)

// take
scala> names2.take(2)
res8: Array[(String, Int)] = Array((apple,5), (beatty,6))

// countByKey
scala> val hockeyTeams = sc.parallelize(List("wild", "blackhawks", "red wings", "wild", "oilers", "whalers", "jets", "wild"))
hockeyTeams: org.apache.spark.rdd.RDD[String] = ParallelCollectionRDD[12] at parallelize at <console>:25

scala> hockeyTeams.map(k => (k, 1)).countByKey
res9: scala.collection.Map[String,Long] = Map(wild -> 3, oilers -> 1, jets -> 1, red wings -> 1, whalers -> 1, blackhawks -> 1)

scala> val babyNamesToTotalCount = sc.textFile("file:///home/hadoop/baby_names.csv").map(line => line.split(",")).map(n => (n(1), n(4)))
babyNamesToTotalCount: org.apache.spark.rdd.RDD[(String, String)] = MapPartitionsRDD[31] at map at <console>:26

scala> babyNamesToTotalCount.countByKey
res10: scala.collection.Map[String,Long] = Map(MARY ANN -> 2, VAYDA -> 3, AMIR -> 90, ABIGAIL -> 294, KORBEN -> 4, JAYAN -> 2, COCO -> 3, ATIKA -> 2, BRYT -> 1, MILLIYEARA -> 1, YAOZIYU -> 1, MALINI -> 1, LEEYAH-AMINAH -> 1, ELISABELLA -> 1, ELAYAN -> 1, EMYA -> 1, KHI'LEI -> 1, CLAISHA -> 1, HUMAIRA -> 3, OSIAS -> 2, KRISTIJAN -> 1, RUSHIEYA -> 1, NIKIL -> 1, AVALYNNE -> 1, LAVINIA -> 3, GIANNA -> 203, SA'NIEYAH -> 1, ALBRIGHT -> 1, FATIMATOU -> 2, FRANCK ETHAN -> 1, ZASKIA -> 1, MANSOR -> 1, MICHELLY -> 1, MI'KAYAH -> 1, AL-IMAD -> 1, RAENAH -> 1, ALEXAVIERE -> 1, MIRIAH -> 1, CAEDEN -> 6, ABDURRAHMON -> 1, AURQWEZ -> 1, OMIR -> 1, MENNO -> 3, JASNOOR -> 3, LUCEE -> 1, BRACKSON -> 1, DI-MARLEY -> 1, AKSHAY -> 2, TSVI -> 1, MI'KING -> 1, LAUREEN -> 2, MOMOREOLUWA -> 1, ANUSHA -> 3, GEO...
                                               
// saveAsTextFile
scala> val onlyInterestedIn = sc.textFile("file:///home/hadoop/baby_names.csv").map(line => line.split(",")).map(n => (n(1), n(4)))
onlyInterestedIn: org.apache.spark.rdd.RDD[(String, String)] = MapPartitionsRDD[43] at map at <console>:26

scala> onlyInterestedIn.saveAsTextFile("file:///home/hadoop/results")
//
(First Name,Count)
(GAVIN,9)
(LEVI,9)
(LOGAN,44)
(HUDSON,49)
(GABRIEL,50)
...
```



## Mysql

1. mysql-connect-java 파일 복사

   ```shell
   cp mysql-connector-java-5.1.46.jar $SPARK_HOME/jars
   ```

2. HDFS 실행

   ```shell
   # Zookeeper
   zkServer.sh start
   
   # HDFS
   start-all.sh
   ```

3. spark-shell

   ```scala
   scala> import org.apache.spark.sql.SQLContext
   import org.apache.spark.sql.SQLContext
   
   scala> val sqlcontext = new org.apache.spark.sql.SQLContext(sc)
   warning: there was one deprecation warning; re-run with -deprecation for details
   sqlcontext: org.apache.spark.sql.SQLContext = org.apache.spark.sql.SQLContext@1f7336b2
   
   scala> val dataframe_mysql = sqlcontext.read.format("jdbc").option("url", "jdbc:mysql://ip주소/employees?useSSL=false").option("driver", "com.mysql.jdbc.Driver").option("dbtable", "employees").option("user", "유저명").option("password", "패스워드").load()
   dataframe_mysql: org.apache.spark.sql.DataFrame = [emp_no: int, birth_date: date ... 4 more fields]
   
   scala> dataframe_mysql.show()
   +------+----------+----------+-----------+------+----------+
   |emp_no|birth_date|first_name|  last_name|gender| hire_date|
   +------+----------+----------+-----------+------+----------+
   | 10001|1953-09-02|    Georgi|    Facello|     M|1986-06-26|
   | 10002|1964-06-02|   Bezalel|     Simmel|     F|1985-11-21|
   | 10003|1959-12-03|     Parto|    Bamford|     M|1986-08-28|
   | 10004|1954-05-01| Chirstian|    Koblick|     M|1986-12-01|
   | 10005|1955-01-21|   Kyoichi|   Maliniak|     M|1989-09-12|
   | 10006|1953-04-20|    Anneke|    Preusig|     F|1989-06-02|
   | 10007|1957-05-23|   Tzvetan|  Zielinski|     F|1989-02-10|
   | 10008|1958-02-19|    Saniya|   Kalloufi|     M|1994-09-15|
   | 10009|1952-04-19|    Sumant|       Peac|     F|1985-02-18|
   | 10010|1963-06-01| Duangkaew|   Piveteau|     F|1989-08-24|
   | 10011|1953-11-07|      Mary|      Sluis|     F|1990-01-22|
   | 10012|1960-10-04|  Patricio|  Bridgland|     M|1992-12-18|
   | 10013|1963-06-07| Eberhardt|     Terkki|     M|1985-10-20|
   | 10014|1956-02-12|     Berni|      Genin|     M|1987-03-11|
   | 10015|1959-08-19|  Guoxiang|  Nooteboom|     M|1987-07-02|
   | 10016|1961-05-02|  Kazuhito|Cappelletti|     M|1995-01-27|
   | 10017|1958-07-06| Cristinel|  Bouloucos|     F|1993-08-03|
   | 10018|1954-06-19|  Kazuhide|       Peha|     F|1987-04-03|
   | 10019|1953-01-23|   Lillian|    Haddadi|     M|1999-04-30|
   | 10020|1952-12-24|    Mayuko|    Warwick|     M|1991-01-26|
   +------+----------+----------+-----------+------+----------+
   only showing top 20 rows
   ```

   



## Ref.

- Learning Spark - Holden Karau, Andy Konwinski, Patrick Wendell, Matei Zaharia