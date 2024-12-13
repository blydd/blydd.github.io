title: redis
date: 2021-01-23 23:10:17
categories: 数据库
toc: true
description: redis五种数据类型,持久化,事务,通用命令等.
tags: 
	- redis

---



# 安装

```shell
#安装gcc环境
yum install gcc-c++
wget http://download.redis.io/releases/redis-3.2.8.tar.gz
#1.下载安装包 6.0.5版本
wget http://download.redis.io/releases/redis-6.0.5.tar.gz

#2.解压到指定文件夹
mkdir -p /usr/local/redis
tar -zxvf redis-6.0.5.tar.gz -C /usr/local/redis/
#3.在编译安装前，查看系统gcc环境的版本（gcc -v），centos7默认安装的版本为4.8.5，该版本过低会无法进行安装，需要升级gcc到6以上。
sudo yum -y install centos-release-scl
sudo yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils
sudo scl enable devtoolset-9 bash
sudo echo "source /opt/rh/devtoolset-9/enable" >> /etc/profile
gcc -v

#4.进入文件夹 编译
cd /usr/local/redis/redis-6.0.5/
make
#编译并安装到指定文件夹
sudo make && sudo make install PREFIX=/usr/local/redis/redis-6.0.5
#若编译报错:zmalloc.h:50:10: fatal error: jemalloc/jemalloc.h: No such file or directory
#则使用命令:make MALLOC=libc

#5.修改redis.conf的一些必要配置：
daemonize no --> yes  # 让redis启动的时候以后台服务的形式
requirepass foobared --> #设置redis的连接密码
port 6379　　　　--> #redis的启动端口，默认为6379

#6.将redis做成服务，并设置成开机启动：

#7.指定redis日志和数据存放目录
mkdir -p /usr/local/redis/redis-6.0.5/log
mkdir -p /usr/local/redis/redis-6.0.5/data
vim redis.conf
# 指定redis日志文件存放目录
logfile "/usr/local/redis/redis-6.0.5/log/redis.log"
#指定redis数据存放目录
dir /usr/local/redis/redis-6.0.5/data
```



# 基本使用

## 简介

C语言开发,依赖gcc环境.

客户端启动会默认连接本机6379端口.

## 特点:

- 高效性.Redis读取的速度是110000次/s,写的速度是81000次/s
- 原子性. Redis的所有操作都是原子性的,同时Redis还支持对几个操作全并后的原子性执行。
- 稳定性:持久化,主外复制(集群) .
- 其他特性:支持过期时间,支持事务,消息订阅。

## 常用命令

- `reids`默认有`16`个数据库,命名是`0 , 1 , 2 ....15`,默认使用`0`号数据库,切换数据库使用命令`select 2`.
- 移动数据到别的库:`move key 2`: 表示把key移到2库.
- 清空当前数据库:`flushdb`
- 清空redis服务器:`flushall`
- 退出客户端:`quit`或`ctrl c`
- 查询当前数据库中`key`的数量:`dbsize`
- 查看当前`redis`信息:`info`
- 启动服务端 前端启动(无法部署集群) `./redis/bin/redis-server`
- 后端启动
  - 修改redis.conf文件,开启守护线程: daemonize yes
  - `./bin/redis-server ./redis.conf`
- 启动客户端 默认连接本地6379端口 `./redis/bin/redis-cli`
- 连接其他机器 `./bin/redis-cli -h ip -p 6379`
- 关闭redis `kill -9 进程号` 或 `./bin/redis-cli shutdown`
- 查询所有key  *表示0或多个 ?表示1个`keys *`
- 查询长度为4的key `keys ????`
- 模糊查询 查询带name的key `keys *name*`
- 删除key 删除多个key `del key [key2 key3...]`
- 判断key是否存在 存在返回1否则返回0 `exists key`
- 重命名key 不常用 `rname oldkey newkey`
- 返回key的value的数据类型 `type key`
- 设置key过期时间30秒,单位是秒,默认永久有效 `expire key 30`
- 查询key剩余有效期时间,-2表示过期,会删除key.若未设置超时返回-1 `ttl key`

# 数据类型

> `key`都是字符串类型,`value`分为五种数据类型:`String`,`hash`,`list`,`set`,`有序set`

## String

> 单个值最大512M,对应`java`中的`map`

### 使用命令

```shell
set key value
get key
del key
getset key value
incr key
decr key
append key
incrby 
decrby 
```

## hash

> 示例:{username:"zhangsan",age:"18"},类似`JSON`,对应`java`中的`bean`.

### 使用命令

```shell
#赋值
hset key field value
#赋值多个
hmset key field value[field1 value1 field2 value2...]

#取值
hget key field
#取值多个
hmget key field1 field2...
#取值全部
hgetall key
#查询key有几个field
hlen key
#查询hash所有field
hkeys key
#查询hash所有value
hvals key

#删除
hdel key field [field2 field3...]
#删除整个hash
del key

#增加值
hincrby key field 10

#判断field的value是否存在,存在返回1,否则返回0
hexists key field
```

## list

> 示例:[1,2,3],对应linkedList链表集合,增删快.
>
> redis中是双向链表,增删极快.

### 场景:

​	大数据量集合操作,任务队列

### 使用命令

```shell
#左赋值
lpush key a b c d 
#右赋值 符合习惯
rpush key a b c d

#取值,获取list中start到end的值.
#start end 从0开始,可为负数,-1表示尾部元素,-2表示倒数第二个元素...
lrange key start end
#查询list长度
llen key

#删除左边第一个元素,若key不存在返回nil,存在返回第一个元素
lpop key
#删除右边最后一个元素
rpop key
#删除集合中所有a,若0改为2表示左边开始删2个,-2表示右边开始删2个   效率极低,因为需要给集合赋索引操作
lrem key 0 a

#在pivot元素前|后插入value  效率不高
linsert kry before|after pivot value
#替换下标为index的元素为value 效率不高
lset key index value

#将集合中尾部元素弹出,添加到头部,存入新集合list2 通过循环实现队列功能
rpoplpush list1 list2
#eg: list1为 a b c ,执行一次后:list1: a b list2:c
#循环队列
rpoplpush list1 list1
```

## set

> 对应hashset,无序,不重复.
>

### 场景:

​	redis中涉及到两个集合的交集 并集 差集运算.

### 使用命令

```shell
#赋值,重复的会去除
sadd key a b c d d
#删除元素
srem key a b
#查询所有元素
smembers key
#查询a元素是否存在,存在返回1,否则返回0
sismember key a
#查询set中元素数量
scard key
#随机返回set中一个元素 伪随机
srandmember key


#差集运算,属于key1 不属于key2
sdiff key1 key2
#交集运算
sinter key1 key2
#并集运算
sunion key1 key2
#将差|并|交集存入新的set3中
sdiffstore|sunionstore|sinterstore set3 set1 set2
```

## 有序set

> 有序,不重复.
>
> 默认升序
>

### 场景:

​	排行榜 

### 使用命令

```shell
#赋值 
zadd set1 500 xiaoming 200 xiaohong 100 xiaogang

#查询xiaoming的分数
zscore set1 xiaoming
#查询元素数量
zcard set1
#查询所有元素
zrange set1 0 -1
#查询所有元素的分数
zrange set1 0 -1 withscores
#倒序查看所有元素 -->排行榜
zrevrange set1 0 -1 withscores
#按分数范围查询元素. 后可加withscores显示分数.后可加limit 0 1查询前两名
zrangebyscore set1 200 500
#查询指定分数范围内有几个元素
zcount set1 200 1000
#查询xiaoming在set1中的排名 从小到大
zrank set1 xiaoming
#查询xiaoming在set1中的排名 从大到小
zrevrank set1 xiaoming

#删除元素
zrem set1 xiaoming xiaohong
#范围删除 删除前两名
zremrangebyscore set1 0 1

#加值 给xiaoming加200分
zincrby set1 200 xiaoming

```

# redis通用命令

```shell
#查询所有key  *表示0或多个 ?表示1个
keys *
#查询长度为4的key
keys ????
#模糊查询 查询带name的key
keys *name*

#删除key 删除多个key
del key [key2 key3...]

#判断key是否存在 存在返回1否则返回0
exists key

#重命名key 不常用
rname oldkey newkey

#返回key的value的数据类型
type key

#设置key过期时间30秒,单位是秒,默认永久有效
expire key 30
#查询key剩余有效期时间,-2表示过期,会删除key.若未设置超时返回-1
ttl key
```

# redis事务

> redis事务不是为了保证数据完整性,而是为了服务于批量操作.
>
> 事务中报错并不会回滚,而是正常顺序执行.

```shell
#开启事务
multi
#提交事务
exec
#回滚事务
discard
```

# redis持久化

> redis默认所有增删改都是在内存中执行,因此提供了两种持久化策略

- RDB

  > 默认策略.
  >
  > 相当于是照快照,保存的是一种状态,占用空间小.
  >
  > 符合要求时会随时启动保存操作,占用系统资源(内存),适合内存充裕的服务器.
  >
  > 大公司一般使用RDB策略.

  > 持久化操作何时进行?
  >
  > - 服务器正常关闭时 ./bin/redis-cli shutdown
  >
  > - 满足一定条件时.在redis.conf中可配置,但一般默认的即是最优配置.
  >
  >   默认配置如下:
  >
  >   Save 900 1       -->每900秒(15分钟)有一个key变化,则照快照.
  >
  >   save 300 10     -->每300秒(5分钟)有10个key变化,则照快照.
  >
  >   save 60 10000 -->每60秒(1分钟)有10000个key变化,则照快照.

- AOF

  > - 默认关闭.
  >
  > - 原理:使用日志功能保存数据,aof只会保存导致key变化的命令.
  >
  > - 优点:占用内存小;缺点:日志文件大,不适合灾备;恢复效率低.
  >
  > - 适用内存小的服务器.
  >
  > - 三种机制:
  >
  >   - everysec 每秒同步
  >   - always     每次修改同步
  >   - no             不同步(默认)
  >
  > - 配置:
  >
  >   - 修改redis.conf文件:
  >
  >     Appendonly yes :开启aof
  >
  >     appendfsync always:选择策略
  >
  >     重启redis

# Jedis

> jedis是java连接操作redis的框架.
>
> redis有什么命令,jedis就有对应的方法.

```java
//单实例使用示例
Jedis jedis = new Jedis("192.168.0.20",6379);


//连接池
JedisPoolConfig config = new JedisPoolConfig();
config.setMaxTotal(50);//池中最大连接数
config.setMaxIdle(10);//池中空闲时保留的最大连接数
JedisPool pool = new JedisPool(config,"192.168.0.20",6379);
Jedis jedis = pool.getResource();
jedis.getName("username");
jedis.close();//连接归还池中.
```

# 过期策略

过期策略通常有以下三种:

- **定时过期**
  每个设置过期时间的key都需要创建一个定时器,到过期时间就会立即清除。该策略可以立即清除过期的数据,**对内存很友好;但是会占用大量的CPU资源去处理过期的数据**,从而影响缓存的响应时间和吞吐量。
- **惰性过期.**
  只有当访问一个key时,才会判断该key是否已过期,过期则清除。**该策略可以最大化地节省CPU资源,却对内存非常不友好**。极端情况可能出现大量的过期key没有再次被访问,从而不会被清除,占用大量内存。

- **定期过期**
  每隔一定的时间,会扫描一定数量的数据库的expires字典中一定数量的key,并清除其中已过期的key。**该策略是前两者的一个折中方案**。通过调整定时扫描的时间间隔和每次扫描的限定耗时,可以在不同情况下使得CPU和内存资源达到最优的平衡效果。.

# 内存淘汰策略

Redis的内存淘汰策略是指在Redis的用于缓存的内存不足时,怎么处理需要新写入且需要申请额外空间的数据.

**实际项目中设置内存淘汰策略: maxmemory-policy allkey-lru,移除最近最少使用的key.**

**过期策略默认是: maxmemory-policy noeviction**

redis.conf配置如下:

```shell
# MAXMEMORY POLICY: how Redis will select what to remove when maxmemory
# is reached. You can select one from the following behaviors:
#最大内存策略:当到达最大使用内存时,你可以在下面5种行为中选择, Redis如何选择淘汰数据库键 当内存不足以容纳新写入数据时

# volatile-lru -> Evict using approximated LRU, only keys with an expire set.
#在设置了过期时间的键空间中,移除最近最少使用的key,这种情况一般是把redis既当缓存，又做持久化存储的时候才用。

# allkeys-lru -> Evict any key using approximated LRU.
#移除最近最少使用的key (推荐)

# volatile-lfu -> Evict using approximated LFU, only keys with an expire set.

# allkeys-lfu -> Evict any key using approximated LFU.

# volatile-random -> Remove a random key having an expire set.
#在设置了过期时间的键空间中，随机移除一个键，不推荐

# allkeys-random -> Remove a random key, any key.
#直接在键空间中随机移除一个键,弄啥叻

# volatile-ttl -> Remove the key with the nearest expire time (minor TTL)
#在设置了过期时间的键空间中,有更早过期时间的key优先移除不推荐

# noeviction -> Don't evict anything, just return an error on write operations.
#不做过键处理,只返回一个写操作错误。不推荐
```



# Redis的主从复制架构.

> 主从复制,是指将一台Redis服务器的数据,复制到其他的Redis服务器。前者称为主节点(master),后者称为从节点(slave),**数据的复制是单向的,只能由主节点到从节点。**
>
> 默认情况下,每台Redis服务器都是主节点;且一个主节点可以有多个从节点(或没有从节点),但一个从节点只能有一个主节点。

## 原理

1. 当从数据库启动后,会向主数据库发送SYNC命令
2. 主数据库接收到SYNC命令后开始在后台保存快照(RDB持久化) ,并将保存快照期间接收到的命令缓存进来.
3. 快照完成后, Redis (Master)将快照文件和所有缓存的命令发送给从数据库
4. Redis (Slave)接收到RDB和缓存命令时,会开始载入快照文件并执行接收到的缓存的命令
5. 后续,每当主数据库接收到写命令时,就会将命令同步给从数据库。所以3和4只会在初始化的时候执行

## 场景

1. 备份容错(如果只有一个节点,会存在单点故障问题)
2. 读写分离(读多写少的场景很适用) ,如果写操作很多,就得使用集群
3. 从数据库持久化(可以将持久化的性能消耗移动到从节点) 

## 搭建

```shell
# 修改从节点的配置文件redis.conf
vim redis.conf
#修改		主节点ip		主节点port
slaveof masterip masterport
```

# 哨兵

> **Sentinel (哨兵)是Redis的高可用性解决方案**:由一个或多个Sentinel实例组成的Sentinel系统可以监视任意多个主服务器,以及这些主服务器属下的所有从服务器,并**在被监视的主服务器进入下线状态时,自动将下线主服务器属下的某个从服务器升级为新的主服务器**。

## 配置哨兵

> 每台服务器都要修改sentinel.conf文件配置哨兵.
>
> 一般哨兵的配置节点数不能是1个,最好是有几个主从节点,就配置几个哨兵。不能哨兵自己出现单点故障

```shell
#1 修改主节点配置文件
vim sentinel.conf
#15行 每台机器修改为自己对应的主机各
bind 127.0.0.1 192.168.1.1
#修改后台运行
daemonize yes
#三台机器监控的主节点
#	monitor监控,master-name服务器名称可自定义,ip服务器ip,quorum为2时2代表只有两个或两个以上的哨兵认为主服务器不可用的时候,才会进行failover操作。			
sentinel monitor <master-name> <ip> <redis-port> <quorum>

#如果Redis是有密码的,需要指定密码
# 定义服务的密码, mymaster服务名称, 123456是Redis服务器密码
# sentinel auth-pass <master-name> <password>

#2 把配置文件复制到其他节点服务器
scp sentinel.conf 从节点1ip:$PWD
scp sentinel.conf 从节点2ip:$PWD
#分别修改从节点配置文件,绑定自己机器的ip
bind 从节点1ip
bind 从节点2ip

#3 每台服务器启动哨兵服务
bin/redis-sentinel sentinel.conf

#4 验证哨兵启动是否成功
#查看Sentinel master的状态 连接哨兵 26379是哨兵端口
bin/redis-cli -h 从节点2ip -p 263794
#使用ping命令检查哨兵是否工作,如果正常会返回PONG
#使用命令info,可以查看主节点有几个从节点,及几个哨兵.
```

## 哨兵模式下的代码连接

> 哨兵模式下,代码中就不能配置主节点连接信息,因为主节点可能挂掉,所以应该配置哨兵的连接信息,并使用JedisSentinelPool来创建连接池。

# 集群

## docker搭建redis集群

### 创建模板及脚本

> 在/usr/local/server/redis-cluster/目录下创建一个模板,把可变参数传入;

```shell
#集群各节点公共配置模板
#端口 
port ${PORT} 
#非保护模式 若开启则每次都需输入密码 
protected-mode no 
#启用集群模式 
cluster-enabled yes c
luster-config-file nodes.conf 
#超时时间 
cluster-node-timeout 5000 
#集群各节点IP地址 
cluster-announce-ip 192.168.2.110
#集群节点映射端口 
cluster-announce-port ${PORT} 
#集群总线端口 
cluster-announce-bus-port 1${PORT} 
#开启aof持久化策略 
appendonly yes 
#后台运行 
#daemonize yes 
#进程号存储 
pidfile /var/run/redis_${PORT}.pid 
#集群加密 
#masterauth itheima 
#requirepass itheima
```

> 创建redis创建容器脚本:

```shell
#!/bin/bash
#在/usr/local/server/redis-cluster下生成conf和data目标，并生成配置信息

#输入信息
read -p "请输入本机IP地址：" Native_IP

# 创建文件夹
mkdir -p /usr/local/server/redis-cluster
# 下载redis配置模板
echo "正在下载redis-cluster.tmpl配置模板，请手动下载redis-cluster.tmpl文件并复制到/usr/local/server/redis-cluster目录";
# 文件下载地址 请手动下载redis-cluster.tmpl文件
#wget -P /usr/local/server/redis-cluster https://srv-file22.gofile.io/download/RoGvVk/redis-cluster.tmpl

echo "正在创建redis-net网络";
#c创建网络
docker network create redis-net

echo "正在创建redis配置文件";
for port in `seq 7001 7006`; 
do 
  mkdir -p /usr/local/server/redis-cluster/${port}/conf && PORT=${port} Native_IP=${Native_IP}  envsubst < /usr/local/server/redis-cluster/redis-cluster.tmpl > /usr/local/server/redis-cluster/${port}/conf/redis.conf && mkdir -p /usr/local/server/redis-cluster/${port}/data;
done
echo "正在启动redis容器";
#创建6个redis容器
for port in `seq 7001 7006`;
do
	docker run -d -it -p ${port}:${port} -p 1${port}:1${port} -v /usr/local/server/redis-cluster/${port}/conf/redis.conf:/usr/local/etc/redis/redis.conf -v /usr/local/server/redis-cluster/${port}/data:/data --privileged=true --restart always --name redis-${port} --net redis-net --sysctl net.core.somaxconn=1024 redis redis-server /usr/local/etc/redis/redis.conf;
done
#查找ip
for port in `seq 7001 7006`;
do
	echo  -n "$(docker inspect --format '{{ (index .NetworkSettings.Networks "redis-net").IPAddress }}' "redis-${port}")":${port}" ";
done
#换行
echo -e "\n"
#输入信息
read -p "请把输入要启动的docker容器名称，默认redis-7001：" DOCKER_NAME
#判断是否为空
if [ ! $DOCKER_NAME ]; 
	then DOCKER_NAME='redis-7001'; 
fi
#进入容器
docker exec -it redis-7001 /bin/bash

# 删除容器
#docker rm -f $(docker ps -a |  grep "redis-*"  | awk '{print $1}')

```

> 创建删除脚本

```shell
#!/bin/bash
echo "正在停止所有redis容器";
docker stop $(docker ps -a |  grep "redis-*"  | awk '{print $1}')
echo "正在删除所有redis容器";
docker rm -f $(docker ps -a |  grep "redis-*"  | awk '{print $1}')
echo "正在删除redis-net网络";
docker network rm redis-net
echo "正在删除/usr/local/server目录";
#rm -rf /usr/local/server
rm -rf 7001 7002 7003 7004 7005 7006

```

### 执行脚本,创建容器,创建集群

> 执行redis.sh脚本,创建容器,创建集群:

```shell
#1 执行脚本 创建容器
./redis.sh
[root@localhost redis-cluster]# ./redis.sh 
请输入本机IP地址：192.168.2.110
正在下载redis-cluster.tmpl配置模板，请手动下载redis-cluster.tmpl文件并复制到/usr/local/server/redis-cluster目录
正在创建redis-net网络
2f24ef5a195f41775f7cd85d56218d6a7f34591f349c7c835d26b6c4ec9be019
正在创建redis配置文件
正在启动redis容器
df2ceae9f7e44a2ebe4727d06717db7f636693ef8a2ff42458ce7e3cf5738937
86e34c9145760f65394615e221ec886d9634775966cfd30bb33a41a2ba0b8963
fdda9586b0987c6d207b840290e5c21fc1ca624574404a3db744d54bdc074177
f0c725bc27884e319a7d16575dc919063a8999d2d6ab1a62773af7ce3aee227f
9a2373144fed4b48fb9a168cdc1ecb2fbbd3d5f08a8314580c6e4a5d2216ca32
1d0ed018e4c6ec2f6b292f668ac6d47658a183a7b5aa5839395eb098c2e46356
172.18.0.2:7001 172.18.0.3:7002 172.18.0.4:7003 172.18.0.5:7004 172.18.0.6:7005 172.18.0.7:7006 
#按回车确认
请把输入要启动的docker容器名称，默认redis-7001：

#2 创建集群
cd /usr/local/bin/
#进入到任意一个安装好的redis节点的bin目录，里面有个脚本对象redis-cli，然后执行集群创建 
#--cluster-replicas 1 表示每个主节点有一个从节点
./redis-cli --cluster create 172.18.0.2:7001 172.18.0.3:7002 172.18.0.4:7003 172.18.0.5:7004 172.18.0.6:7005 172.18.0.7:7006 --cluster-replicas 1

```

### 验证集群是否创建成功

```shell
#进入任意一个节点
cd /usr/local/bin
#连接任意节点
 ./redis-cli -p 7001 -c
 #执行赋值操作,可看到进行了重定向操作:7001重定向到了7003,说明集群创建成功.
 #重定向原理:redis根据key值进行crc16%16384,计算出该key应该存到哪个节点的哈希槽中
 127.0.0.1:7001> set username zhangsan
-> Redirected to slot [14315] located at 192.168.2.110:7003
OK
192.168.2.110:7003> 
#也可以在节点中执行cluster nodes查看集群中节点信息,及哈希槽分配信息.
192.168.2.110:7003> cluster nodes
76579cdead091c604e60e03454bab68ae69caa36 192.168.2.110:7004@17004 slave 52c2332c4271dba57d3be960d5feef2334b767e5 0 1611586728573 3 connected
b7dde8f6eb6f0385303e45bc54c588e8ea422acf 192.168.2.110:7005@17005 slave 8bddaceb3363a9675e48e6a76c4194c50cc545ac 0 1611586729588 1 connected
52c2332c4271dba57d3be960d5feef2334b767e5 192.168.2.110:7003@17003 myself,master - 0 1611586727000 3 connected 10923-16383
8bddaceb3363a9675e48e6a76c4194c50cc545ac 192.168.2.110:7001@17001 master - 0 1611586729000 1 connected 0-5460
4967d4c7cd28c8601eb9de843f1a1d449a343a7c 192.168.2.110:7006@17006 slave 21d108f7cb03af71f707fb314b730a76c33b8c74 0 1611586728000 2 connected
21d108f7cb03af71f707fb314b730a76c33b8c74 192.168.2.110:7002@17002 master - 0 1611586727561 2 connected 5461-10922
192.168.2.110:7003> 
```



## 创建集群遇到的问题

### rpc error: code = 2 desc = oci runtime error: exec failed: container_linux.go:247: starting containe

```shell
#查看我的docker 版本
docker --version
Docker version 1.13.1, build 07f3374/1.13.1

#更新yum 即可修复 （如果yum的仓库连接不成功， 可以使用阿里仓库）
 yum update -y
```

###  创建集群后,一直点点点等待连接

> 相关端口未打开
>
> ```shell
> firewall-cmd --zone=public --add-port=7001/tcp --permanent   # 开放7001端口
> firewall-cmd --zone=public --remove-port=17001/tcp --permanent  #关闭17001端口
> firewall-cmd --reload   # 配置立即生效
> ```
>
> 

## 集群的扩容

### 通过启动两个节点7007 7008,一主一从

```shell
#docker安装Redis这里编写了一个脚本，安装脚本 redis-port.sh 如下
#!/bin/bash 
#在/usr/local/server/redis-cluster下生成conf和data目标，并生成配置信息 
#换行 
echo -e "\n" 
#输入信息 
read -p "请输入容器端口：" DOCKER_PORT
#输入端口赋值
port=$DOCKER_PORT;
echo -e "$port"
#创建配置文件
mkdir -p ./${port}/conf && PORT=${port} envsubst < ./redis-cluster.tmpl > ./${port}/conf/redis.conf && mkdir -p ./${port}/data;
#创建redis容器
docker run -d -it -p ${port}:${port} -p 1${port}:1${port} -v /usr/local/server/redis-cluster/${port}/conf/redis.conf:/usr/local/etc/redis/redis.conf -v /usr/local/server/redis-cluster/${port}/data:/data --privileged=true --restart always --name redis-${port} --net redis-net --sysctl net.core.somaxconn=1024 redis redis-server /usr/local/etc/redis/redis.conf;
#查找ip
echo -n "启动$(docker inspect --format '{{ (index .NetworkSettings.Networks "redis- net").IPAddress }}' "redis-${port}")":${port}" 成功！";
echo -e "\n"
```

### 启动完成,把7007加进集群,并分配哈希槽.

```shell
#1 查看主节点信息 和从节点信息
[root@localhost bin]# ./redis-cli -p 7001 cluster nodes|grep master
52c2332c4271dba57d3be960d5feef2334b767e5 192.168.2.110:7003@17003 master - 0 1611589610513 3 connected 10923-16383
8bddaceb3363a9675e48e6a76c4194c50cc545ac 192.168.2.110:7001@17001 myself,master - 0 1611589610000 1 connected 0-5460
21d108f7cb03af71f707fb314b730a76c33b8c74 192.168.2.110:7002@17002 master - 0 1611589611527 2 connected 5461-10922
[root@localhost bin]# ./redis-cli -p 7001 cluster nodes|grep slave
4967d4c7cd28c8601eb9de843f1a1d449a343a7c 192.168.2.110:7006@17006 slave 21d108f7cb03af71f707fb314b730a76c33b8c74 0 1611589702041 2 connected
76579cdead091c604e60e03454bab68ae69caa36 192.168.2.110:7004@17004 slave 52c2332c4271dba57d3be960d5feef2334b767e5 0 1611589702000 3 connected
b7dde8f6eb6f0385303e45bc54c588e8ea422acf 192.168.2.110:7005@17005 slave 8bddaceb3363a9675e48e6a76c4194c50cc545ac 0 1611589701540 1 connected
[root@localhost bin]# 

#2 把7007添加到集群中
#命令说明 将节点192.168.2.110:7007添加到节点192.168.2.110:7001所在的集群中
./redis-cli --cluster add-node 192.168.2.110:7007 192.168.2.110:7001

# 3 再次查看主节点信息,已能看到7007节点,但是7007没有分配哈希槽
[root@localhost bin]# ./redis-cli -p 7001 cluster nodes|grep master
52c2332c4271dba57d3be960d5feef2334b767e5 192.168.2.110:7003@17003 master - 0 1611590983590 3 connected 10923-16383
8bddaceb3363a9675e48e6a76c4194c50cc545ac 192.168.2.110:7001@17001 myself,master - 0 1611590981000 1 connected 0-5460
21d108f7cb03af71f707fb314b730a76c33b8c74 192.168.2.110:7002@17002 master - 0 1611590983000 2 connected 5461-10922
eaf055c10e03a10e6493194bc3389d65919c3ecb 192.168.2.110:7007@17007 master - 0 1611590983590 0 connected

#4 重新分配哈希槽
#我们将 7001,7002,7003 中的 100 个哈希槽挪给 7007 ，命令如下：
./redis-cli --cluster reshard 192.168.2.110:7001 --cluster-from 8bddaceb3363a9675e48e6a76c4194c50cc545ac,21d108f7cb03af71f707fb314b730a76c33b8c74,52c2332c4271dba57d3be960d5feef2334b767e5 --cluster-to eaf055c10e03a10e6493194bc3389d65919c3ecb --cluster-slots 100
# 参数说明
#--cluster-from：表示slot目前所在的节点的node ID，多个ID用逗号分隔 
#--cluster-to：表示需要新分配节点的node ID 
#--cluster-slots：分配的slot数量

# 5 再次查看主节点信息,哈希槽已成功分配给7007
[root@localhost bin]# ./redis-cli -p 7001 cluster nodes|grep master
52c2332c4271dba57d3be960d5feef2334b767e5 192.168.2.110:7003@17003 master - 0 1611591101000 3 connected 10956-16383
8bddaceb3363a9675e48e6a76c4194c50cc545ac 192.168.2.110:7001@17001 myself,master - 0 1611591102000 1 connected 33-5460
21d108f7cb03af71f707fb314b730a76c33b8c74 192.168.2.110:7002@17002 master - 0 1611591101598 2 connected 5495-10922
eaf055c10e03a10e6493194bc3389d65919c3ecb 192.168.2.110:7007@17007 master - 0 1611591102514 7 connected 0-32 5461-5494 10923-10955
[root@localhost bin]# 
```

### 把7008加进7007的从节点

>我们需要往集群中给 7007 节点添加一个从节点 7008 ，添加从节点的主要目的是提高高可用，防止主节点宕机后该节点无法提供服务。添加从节点命令如下：
>
>```shell
>./redis-cli --cluster add-node 192.168.2.110:7008 192.168.2.110:7007 --cluster-slave --cluster-master-id eaf055c10e03a10e6493194bc3389d65919c3ecb
>
>#参数说明
>#add-node: 后面的分别跟着新加入的slave和slave对应的master 
>#cluster-slave：表示加入的是slave节点 
>#--cluster-master-id：表示slave对应的master的node ID
>
>
>#再次查看从节点信息,7008已加入
>[root@localhost bin]# ./redis-cli -p 7001 cluster nodes|grep slavebdcc8f4553c05fe408a75045ca910b5156d5a11c 192.168.2.110:7008@17008 slave eaf055c10e03a10e6493194bc3389d65919c3ecb 0 1611591482000 7 connected
>4967d4c7cd28c8601eb9de843f1a1d449a343a7c 192.168.2.110:7006@17006 slave 21d108f7cb03af71f707fb314b730a76c33b8c74 0 1611591481472 2 connected
>76579cdead091c604e60e03454bab68ae69caa36 192.168.2.110:7004@17004 slave 52c2332c4271dba57d3be960d5feef2334b767e5 0 1611591482181 3 connected
>b7dde8f6eb6f0385303e45bc54c588e8ea422acf 192.168.2.110:7005@17005 slave 8bddaceb3363a9675e48e6a76c4194c50cc545ac 0 1611591482484 1 connected
>[root@localhost bin]# 
>```
>
>

## 集群的收容

### **移除从节点**

移除 7007 的从节点 7008 ，命令如下：

```shell
#查看从节点
root@579a0ecdc975:/usr/local/bin# ./redis-cli -p 7001 cluster nodes | grep slave
b7dde8f6eb6f0385303e45bc54c588e8ea422acf 192.168.2.110:7005@17005 slave,fail? 8bddaceb3363a9675e48e6a76c4194c50cc545ac 1611969411737 1611969410827 1 connected
bdcc8f4553c05fe408a75045ca910b5156d5a11c 192.168.2.110:7008@17008 slave,fail? eaf055c10e03a10e6493194bc3389d65919c3ecb 1611969413356 1611969410827 7 connected
4967d4c7cd28c8601eb9de843f1a1d449a343a7c 192.168.2.110:7006@17006 slave,fail? 21d108f7cb03af71f707fb314b730a76c33b8c74 1611969412748 1611969410827 2 connected
76579cdead091c604e60e03454bab68ae69caa36 192.168.2.110:7004@17004 slave,fail? 52c2332c4271dba57d3be960d5feef2334b767e5 1611969413356 1611969410827 3 connected
root@579a0ecdc975:/usr/local/bin# 
# 删除7008
[root@localhost bin]# ./redis-cli --cluster del-node 192.168.2.110:7008 bdcc8f4553c05fe408a75045ca910b5156d5a11c
>>> Removing node bdcc8f4553c05fe408a75045ca910b5156d5a11c from cluster 192.168.2.110:7008
Could not connect to Redis at 192.168.2.110:7008: No route to host
[root@localhost bin]# 
```



参数说明：

```shell
del-node:删除节点，后面跟着slave节点的 ip:port 和node ID
```

删除后，我们再来查看集群节点，此时再无7008节点。

![image-20210130095713026](https://i.loli.net/2021/01/30/oxvBH9EgWXTjSGA.png)

### 迁移Master的Slot

我们需要将 7007 节点的哈希槽迁移到 7001,7002,7003 节点上，仍然用上面用过的 redis-cli --cluster reshard

语法，命令如下：

第1次迁移：

```shell
./redis-cli --cluster reshard 192.168.2.114:7007 --cluster-from 443096af2ff8c1e89f1160faed4f6a02235822a7 --cluster-to 80a69bb8af3737bce2913b2952b4456430a89eb3 --cluster-slots 33 --cluster-yes
```

查看集群节点：

![image-20210130100001634](https://i.loli.net/2021/01/30/iIGRsyC3n6l9w24.png)

第2次迁移：

```shell
./redis-cli --cluster reshard 192.168.211.141:7007 --cluster-from 
443096af2ff8c1e89f1160faed4f6a02235822a7 --cluster-to 
c9687b2ebec8b99ee14fcbb885b5c3439c58827f --cluster-slots 34 --cluster-yes 
```



第3次迁移：

```shell
./redis-cli --cluster reshard 192.168.211.141:7007 --cluster-from 
443096af2ff8c1e89f1160faed4f6a02235822a7 --cluster-to 
612e4af8eae48426938ce65d12a7d7376b0b37e3 --cluster-slots 33 --cluster-yes
```

集群状态查询：

![image-20210130100113825](https://i.loli.net/2021/01/30/daySTQE9livjgXJ.png)

### 删除7007主节点

删除节点命令如下：

```shell
./redis-cli --cluster del-node 192.168.211.141:7007 443096af2ff8c1e89f1160faed4f6a02235822a7
```

集群节点查看：![image-20210130100155133](https://i.loli.net/2021/01/30/sLbq7CDHG39WI1A.png)

# 集群面试题

- 问题一: Redis的多数据库机制,了解多少?

  > 正常版: Redis支持多个数据库,并且每个数据库的数据是隔离的不能共享,**单机**下的redis可以支持16个数据库(dbo ~db15) ;
  > 高调版:在Redis Cluster集群架构下只有一个数据库空间,即dbo,因此,我们没有使用Redis的多数据库功能！

- 问题二:懂Redis的批量操作么?

  > 正常版:懂一点。比如mset, mget操作等, blabla...
  > 高调版:在生产上采用的是Redis Cluster集群架构,不同的key会划分到不同的slot中,因此直接使用mset或者mget等操作是行不通的。

- 问题三: Redis集群机制中,你觉得有什么不足的地方吗?.

  > 正常版:不知道
  > 高调版:假设有一个key,对应的value是Hash类型的。如果Hash对象非常大,是不支持映射到不同节点的!只能映射到集群中的一个节点上!还有就是做批量操作比较麻烦!

- 问题四:在Redis集群模式下,如何进行批量操作?

  > 正常版：不知道
  > 高调版：如果执行的key数是比较少,就不用mget了,就用串行get操作。如果真的需要执行的key很多,就使用Hashtag保证这些key映射到同一台redis节点上。简单来说语法如下:

  >  对于key为(foo}.student1, {foo}.student2, {foo}.student3,这类key一定是在同一个redis节点上。因为key中"{}"之间的字符串就是当前key的hash tags,只有key中{}中的部分才被用来做hash,因此计算出来的redis节点一定是同一个!

- 问题五:懂Redis事务么?.

  > 正常版: Redis事务是一些列redis命令的集合,blabla..
  > 高调版：在生产上采用的是Redis Cluster集群架构，不同的key是有可能分配在不同的Redis节点上的,在这种情况下Redis的事务机制是不生效的。其次，Redis事务不支持回滚操作,简直是鸡肋,基本不用!

# 缓存穿透 缓存击穿 缓存雪崩

**缓存穿透**: key对应的数据在数据源并不存在,每次针对此key的请求从缓存获取不到,请求都会到数据源,从而可能压垮数据源。
				**一言以蔽之:查询Key,缓存和数据源都没有,频繁查询数据源**

> 比如用一个不存在的用户id获取用户信息,无论论缓存还是数据库都没有,若黑客利用此漏洞进行攻击可能压垮数据库。
> 解决缓存穿透的方案主要有两种:.
> **方案一:当查询不存在时,也将结果保存在缓存中**。但是这可能会存在一种问题:大量没有查询结果的请求保存在缓存中,这时我们就可以将这些请求的key设置得更短一些; .
> **方案二:**提前过滤掉不合法的请求,可以使用**Redis中布隆过滤器**(快速过滤不存在的key,但是对于已经存在的key无法准确判断是否存在);

**缓存击穿**: key对应的数据存在,但在redis中过期,此时若有大量并发请求过来,这些请求发现缓存过期一般都会从后端DB加载数据并回设到缓存,这个时候大并发的请求可能会瞬间把后端DB压垮

> ​	**一言以蔽之:查询Key,缓存过期,大量并发,频繁查询数据派**
>
> 业界比较常用的做法:**使用互斥锁**。简单地来说,就是在缓存失效的时候(判断拿出来的值为空) ,不是立即去load db (查询数据库) ,而是先使用缓存工具的某些带成功操作返回值的操作(比如Redis的SETNX或者Memcache的ADD)去set一个mutex key,就是只让一个线程构建缓存,其他线程等待构建缓存的线程执行完,重新从缓存获取数据。
>
> ```java
> string get(String key){
>   String value = redis.get(key);
> 	if (value == null){
> 		//如果key不存在,则设置为1
> 		if (redis.setnx(key_mutex, "1")) { 
> 			//设置key的过期时间为3分钟
> 			redis.expire(key_mutex, 3 * 60) ;
> 			//从db中加载数据，但注意：只有一个线程能进入到这里,其他线程访问的时候已有课key_mutex
> 			value =db.get(key); 
> 			//从数据库中加载成功,则设置对应的数据
> 			redis.set(key, value);
> 			redis.delete(key_mutex); 
>  	 	} else { 
> 			//其他线程休息50毫秒后重试
>     	Thread.sleep (50);
> 			get(key);
>   	}
> 	}
> }
> ```

**缓存雪崩**:当缓存服务器重启或者大量缓存集中在某一个时间段失效,这样在失效的时候,也会给后端系统(比如DB)带来很大压力。

> **一言以蔽之:缓存不可用(服务器重启或缓存失效) ,频繁查询数据源**
> 与缓存击穿的区别在于这里针对很多key缓存,前者则是某一个key。
>
> 缓存失效时的雪崩效应对底层系统的冲击非常可怕!大多数系统设计者考虑用**加锁或者队列**的方式保证来保证不会有大量的线程对数据库一次性进行读写,从而避免失效时大量的并发请求落到底层存储系统上。还有一个简单方案就时**将缓存失效时间分散开,**比如可以在原有的失效时间基础上增加一个随机值,比如1-5分钟随机,这样每一个缓存的过期时间的重复率就会降低,就很难引发集体失效的事件。