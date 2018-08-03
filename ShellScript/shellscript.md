# Shell script

## Example

주키퍼 서버를 각 서버에서 실행하는 것을 자동화하고자 shell script를 작성하였다.

```gist
https://gist.github.com/yisu-kim/8dbd1a059dd085b436ff82d6cf8fd9fc
```
```sh
#!/bin/sh
function zkserver(){
    echo $1
    ssh $1 "$ZOOKEEPER_HOME/bin/zkServer.sh "$cmd
}

cmd=$1
server=("server01" "server02" "server03" "server04" "server05")

if [ "$cmd" = "start" ]; then
    for i in ${server[@]}; do
        zkserver $i
    done
elif [ "$cmd" = "stop" ]; then
    for i in ${server[@]}; do
        zkserver $i
    done
elif [ "$cmd" = "status" ]; then
    for i in ${server[@]}; do
        zkserver $i
    done
else
    echo "Usage: zkserver-ssh.sh [start|stop|status]"
fi
```


마찬가지로 각 서버의 jps 결과를 확인하기 위해 다음과 같은 shell script를 작성하였다.

```gist
https://gist.github.com/yisu-kim/ba73d578c1c896d7c18db4b082779d40
```
```sh
#!/bin/sh
server=("server01" "server02" "server03" "server04" "server05")

for i in ${server[@]}; do
    echo "***"$i
    ssh $i "jps"
done
```
