title: linux常用命令
date: 2020-12-04 10:10:17
categories: linux
toc: true
description: linux常用命令
tags: 
   - linux

---

 # 常用命令

## 展示路径文件

```shell
# 友好展示信息
ll -h
# 展示指定目录的文件
ll -h /etc
#切换到上次访问目录,只能最后两个目录间切换
cd -
```

## **显示主机名**

```shell
hostname        #显示完整名字
hostname -s 	  #显示短格式名字
hostname -a	    #显示主机别名
hostname -i	    #显示主机ip
```

## **上传下载:**

> scp [r] 用户名@ip:文件路径 本地路径 #下载文件 -r表示下载文件夹

>scp [r] 本地文件 用户名@ip:上传路径 #上传文件 -r表示上传文件夹

>wget http://soft.vpser.net/Inmp/Inmp1.1-full.tar.gz   #下载命令

crl软件按:alt p

## grep和管道

`|` 是管道符号,可连接不同命令

grep是正则表达式,用于字符串搜索.格式:`grep 字符串` 搜索的文件,eg:`ll | grep aaa`

## **命令行登陆linux服务器:**

>ssh -p22 用户名@ip
>如果不输用户名,则以当前用户名登陆linux服务器,第一次连接会下载服务器公钥,选yes.

## 安装与卸载

> rpm命令相当于windows下的添加/卸载程序.
>
> yum命令相当于带联网功能的rpm.

```shell
#程序安装
rpm -ivh 程序名
#程序查看
rpm -qa
#程序卸载
rpm -e --nodeps 程序名
```

# 

# 启动springboot项目

> 后台启动jar并把日志输出到指定文件中

```shell
nohup java -jar my-blog.jar > mylog.txt  & 

nohup java -jar my-blog.jar > catalina.out 2>&1 &
```

# 系统相关

## **查看系统是32位或64位**

`getconf LONG_BIT`  

```shell
#查看系统进程
ps -ef
#重启
reboot
#关机
halt
#网络设置
setup
#开启某端口防火墙
firewall-cmd --permanent --zone=public --add-port=7006/tcp --permanent
```

## systemctl

systemctl 命令是用来控制系统服务的实用工具，它可以启动、停止、重新启动和关闭系统服务，还可以显示所有系统服务的当前状态，在`Centos7.0`之前，使用的是`service`命令，在`Centos7.0`之后， 使用`systemctl`命令来进行服务控制

| 服务管理命令             | 功能           |
| ------------------------ | -------------- |
| systemctl start 服务名   | 开启服务       |
| systemctl stop 服务名    | 关闭服务       |
| systemctl status 服务名  | 显示服务状态   |
| systemctl enable 服务名  | 设置开机自启动 |
| systemctl disable 服务名 | 关闭开机自启动 |

- 网络操作
  - systemctl status network ＃ 查看网络服务状态 
  - systemctl stop network ＃ 停止网络服务 
  - systemctl start network ＃ 启动网络服务 
  - systemctl restart network ＃ 重启网络服务
- 防火墙操作
  - systemctl stop firewalld.service #停止firewall
  - systemctl disable firewalld.service #禁止firewall开机启动 
  - systemctl status firewalld.service #查看防火墙状态

## 磁盘管理:硬盘/内存

- `df -h`  显示磁盘剩余空间
- `du -h［目录名］`  显示目录下的目录大小
- `free -h`    查看内存使用率

## **端口**

- `netstat -nltp` 查看本机系统每个进程占用的端口

- `netstat -an`		  #**查看本机启用的端口**

- `netstat -tuln`	#查看本机开了哪些端口和正在被远程调用的调用方

- `ipnetstat -tuln`	查看本机开了哪些端口和正在被远程调用的调用方ip

>telnet [域名或ip] [端口]	#远程管理与端口探测命令
> eg:telnet 192.168.0.252 80	#探测服务器80端口,成功的话没有提示,进入空白页,退出摁ctrl+],退回到telnet界面,输入quit命令退出

```shell
#1、开放端口
firewall-cmd --zone=public --add-port=5672/tcp --permanent   # 开放5672端口
firewall-cmd --zone=public --remove-port=5672/tcp --permanent  #关闭5672端口
firewall-cmd --reload   # 配置立即生效
#2、查看防火墙所有开放的端口
firewall-cmd --zone=public --list-ports
#3.、关闭防火墙
#如果要开放的端口太多，嫌麻烦，可以关闭防火墙，安全性自行评估
systemctl stop firewalld.service
#4、查看防火墙状态
 firewall-cmd --state
#5、查看监听的端口
netstat -lnpt
#PS:centos7默认没有 netstat 命令，需要安装 net-tools 工具，yum install -y net-tools
#6、检查端口被哪个进程占用
netstat -lnpt |grep 5672
# 7 查看进程的详细信息
ps 6832
```



## 重定向 `>`  `>>`

- `ll > aaa.txt`  把ll命令的输入覆盖到aaa.txt
- `ll >> aaa.txt`  把ll命令的输入追加到aaa.txt

## 生成公钥与私钥

> 保存目录: `/root/.ssh`

```shell
ssh-keygen -t -rsa
```

拷贝公钥到指定服务器:

> 完成即可实现免密登陆

```shell
ssh-copy-id 指定服务器ip
```



# 日期和时间

- `date`   查看系统时间（默认格式）
- `date + "%Y-%m-%d %H:%M:%S"` 查看系统时间（指定格式）
- `date-s “时间字符串“`      设置系统时间

示例:

```shell
[root@nohurry ~]#  date
2024年 06月 04日 星期二 09:09:01 CST
[root@nohurry ~]# date +"%Y-%m-%d %H:%M:%S"
2024-06-04 09:09:32
[root@nohurry ~]# date -s "2024-06-04 09:09:32"
2024年 06月 04日 星期二 09:09:32 CST
[root@nohurry ~]# date +"%Y-%m-%d %H:%M:%S"
2024-06-04 09:09:45
```

## 和网络时间同步(对表)

```shell
crontab -e

#每隔一分钟和阿里云服务器对表
* * * * * /usr/sbin/ntpdate ntp4.aliyun.com
```



# 文件

## 文件权限

```shell
- RWX RW- R--
1  2   3   4
# 1:类型,d目录,-普通文件,l链接文件
# 2:所属用户权限,用u(user)表示
# 3:所属组权限,用g(group)表示
# 4:其他用户权限,用o(other)表示
# 所有权限,用a(all)表示

#修改权限
chmod u=rwx demo.java
chmod g=rw- demo.java
chmod o=rwx demo.java
#给所属用户添加执行权限
chmod 744 demo.java
#给所属用户添加执行权限
chmod u+x demo.java

#更改文件夹内所有文件的权限
chmod -R 权限 文件夹名

#增加执行权限
chmod +X demo.java
```

## 浏览文件内容

- cat 文件名

  适合查看数据量小的文件,全部展示.

- more 文件名

  分页显示文件内容

  空格:下一页	回车:下一行	ctrl+b:上一屏 	q:退出

- less 文件名

  分页查看文件内容.操作同more.

  标注行号:less -mN 文件名

- tail -20 文件名

  快速查看文件最后20行内容.

- Vim 文件名

  输入 : set nu,会显示行号.

## **查找文件**

```shell
find / -name httpd.conf　　#在根目录下查找文件httpd.conf，表示在整个硬盘查找

find /etc -name httpd.conf　　#在/etc目录下文件httpd.conf

find /etc -name '*srm*'　　#使用通配符*(0或者任意多个)。表示在/etc目录下查找文件名中含有字符串‘srm’的文件

find . -name 'srm*' 　　#表示当前目录下查找文件名开头是字符串‘srm’的文件

sudo find / -type d -name *tomcat*  #查找文件夹位置,文件夹名字不确定的用*补上
```

## 新建文件夹

```shell
#创建多层目录
mkdir /t1/t2
# t3目录不存在的话则先创建t3
mkdir -p t3/t4
```

## **复制解压**

压缩包格式:

- *.tar 	打包,不压缩.
- *.tar.gz 打包并压缩

```shell
cp -r 源文件夹 目的地  #Linux复制文件夹,-r表示递归
cp 文件 新目录/新文件名 #复制并改名

#压缩 -zcvf参数顺序不能变.eg压缩当前目录下全部文件:tar -zcvf hehe.tar.gz *
tar -zcvf 压缩包名字.tar.gz 需压缩的文件

#解压缩到当前目录
tar -zxvf 压缩包名
#解压缩到指定目录
tar -zxvf 压缩包名 -C 指定目录地址

```





## 快捷方式

`ln -s 原文件 快捷方式`

```shell
#在当前目录为文件设置快捷方式
[root@nohurry ~]# ln -s /usr/local/java/reload.sh sbreload.sh
#查看快捷方式,指向原文件
[root@nohurry ~]# ll
lrwxrwxrwx  1 root root       25 6月   4 09:14 sbreload.sh -> /usr/local/java/reload.sh
```

## 文件编辑器VIM

`vim`命令进入文件后默认进入命令行模式,此时只能敲命令,常用命令如下:

![image-20240604092037630](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202406040920679.png)

按`i`或`o`进入**输入模式**

按`esc`进入**底行模式**:

![image-20240604092424969](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202406040924040.png)





# 网络

## **ping：测试网络命令**

>       - -c count：ping的次数
>       - -W timeout：超时时间，配合-c使用
>       - -I ipaddress：指定用自己主机的IP去ping对方主机
>       - -s size：每次ping发出的数据包大小，最大值65507
>       - -f：竭尽自己主机的能力发出数据包

```shell
[root@centos7 ~]# ping -c1 -W1 192.168.0.6 #脚本中常用的ping测试，ping一次，超时时间1s
[root@centos7 ~]# ping -s 65507 -f 192.168.0.6 #竭尽自己所能，向192.168.0.6发出大数据包，ddos攻击
```



## VMWARE虚拟机网络连接方式

- 桥接模式

> 需要依赖外部网络环境，VMware 虚拟出来的操作系统就像是局域网中的一台独立的主机， 需要手工为虚拟系统配置IP地址，虚拟机解ip必须和宿主机（windows）的ip是同一个网段。开发环境下可能会使用，学习环境不用，**类似于虚剂机和主机就好比插在同一台交换机上的两台电脑**

- NAT模式

  > 使用 NAT 模式，就是让虚拟系统借助 NAT（网络地址转换）功能，通过宿主机器所在的网络来访问公网，**如果主机能够正常上网，那么虚拟机也能够直接上网。**此时虚拟机处于一个新的网段内，由 VMware提供的DHCP服务自动分配IP地址，然后通过VMware提供的NAT服务，共享主机实现上网，不依赖外部网络环境

-  仅主机模式

  > 仅主机模式和NAT模式是类似的，**在该模式下，虚拟网络是一个全封闭的网络，它唯一能够访问的就是主机**，当然多个虚拟机之间也可以互相访问，只需要记住**仅主机模式是无法进行上网的**



## **配置ip,修改网卡信息文件**

`vi /etc/sysconfig/network-scripts/ifcfg-etho`	

## **查看DNS服务器地址:**

`cat /etc/resolv.conf`

`nslookup 127.0.0.1 | grep Server`

修改DNS服务器非常简单，只需要修改`/etc/resolv.conf`配置文件即可。那么修改DNS是否需要重启某些服务，答案是不需要。修改后会立即生效，不需做任何额外处理。



# JDK

## 安装JDK

- 安装依赖

```shell
yum install glibc.i686
yum -y install libaio.so.1 libgcc_s.so.1 libstdc++.so.6
yum update libstdc++-4.4.7-4.e16.x86-64
yum install gcc-c++
```

- 安装jdk

```shell
# 1 查看已安装老版本
rpm -qa | grep java
# 2 卸载老版本
rpm -e --nodeps 上面查到的
# 3 上传jdk包,解压到指定目录
tar -zxvf -C /usr/local/java
# 4 配置环境变量 vim /etc/profile
JAVA_HOME=/usr/local/java/jdk...
CLASS_PATH=.:$JAVA_HOME/lib.tools.jar
PATH=$JAVA_HOME/bin:$PATH
export JAVA_HONE CLASSPATH PATH
# 5 重新加载配置文件
source /etc/profile
```

## 查看JDK安装路径

```shell
java -verbose #查看jdk安装路径.最后两行为jdk安装路径
```



# 常见错误

##  1.yum安装时报[cannot find a valid baseurl for repo](https://www.cnblogs.com/phpandmysql/p/7773063.html)

> 出现这个问题是因为yum在安装包的过程中，虽然已经联网，但是没法解析远程包管理库对应的域名，所以我们只需要在网络配置中添加上DNS对应的ip地址即可。

​	1.查看网卡名:`ip addr`

![image-20210130103817342](https://i.loli.net/2021/01/30/5Ss9Fx7OVICRnKN.png)

​	2.修改网络配置文件`vi /etc/sysconfig/network-scripts/ifcfg-ens33`

```shell
#文件末尾添加
DNS1=8.8.8.8
DNS2=4.2.2.2
```

​	3.重启网络`ifup ens33`,成功

## 2.ifconfig命令报`-bash: ifconfig: command not found`

 安装网络工具:`yum install -y net-tools`

## 3.CentOS下`ifconfig`命令不显示ip

1.查看网卡名:`ip addr`,我的显示`ens33`

2.修改配置文件:`/etc/sysconfig/network-scripts/ifcfg-ens33`,ONBOOT改为yes

3.启动网卡`ifup ens33`即可.



# 定时器crontab

## 语法:

![image-20240608230223691](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202406082302729.png)

`?` 表示不参与运算

- 分（0~59）

- 时（0~23）

- 日（0~31，但是你需要考虑你月的天数）

- 月（1~12）

- 周（0~6 O=SUN 或 SUN， MON， TUE， WED， THU， FRI， SAT） 

- 年（1970-2099）

- ![image-20240608230834371](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202406082308436.png)

  

## 使用命令

`crontab -e`,进入定时器编辑界面,编辑定时任务.

例如,每隔一分钟输出一个日期:`* * * * * date >> /root/time.txt`



# shell

## 流程控制

### 语句判断

#### 数字

#### 字符串

![image-20240608183334090](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202406081833209.png)

#### 文件

![image-20240608183411474](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202406081834540.png)![image-20240608183756575](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202406081837658.png)



## 综合案例

### 猜字游戏

```shell
#！/bih/bash
#生成100以内的随机数提示用户猜测猜对为止 
#random 系统自带，值为0-32767任意数 
#随机数1-100
num=$[RANDOM%100+1]
#read 提示用户猜数字
#if判断
while :
do
read -p "计算机生成了一个 1-100 的随机数,你猜:" cai 
	if [ $cai -eq $num ]
then
	echo "恭喜,猜对了"
	exit
elif [ $cai -gt $num ]
then
	echo "不巧,猜大了"
else
	echo"不巧,猜小了"
fi
done
```

### 一键安装jdk

> 先卸载完已安装的jdk

```shell
#!/bin/bash
#1.提示安装idk I
echo "现在开始安装jdk" 
sleep 1 # 休眼1秒钟
#2.删除centos自带的jdk
oldjava= ` rpm -qa | grep java `
for old in ${oldiava};
do
	# echo $old
	#卸载命令
	rpm -e --nodeps $old
done
#3.创建安装目录/export/server,进入安装目录 
java_path="/export/server" 
if [ ! -d $java_path ]
then
	mkdir -p $java_path
fi

#4:解压jdk安装包
tar -xvf /export/software/jdk-8u241-1inux-x64.tar.gz -C $java_path

# 6.设置环境变量
JAVA_HOME="/export/server/jdk1.8.0_241" 
if ! grep "JAVA_HOME" /etc/profile
then
	# JAVA HOME
	echo "------------JAVA HOME ----------"
	echo 'export JAVA_HOME=/export/server/jdk.1.8.0_241' >> /etc/profile
	# PATH
	echo "------------PATH ----------"
	echo 'export PATH=:$JAVA_HOME/bin:$PATH' >> /etc/profile
fi

#7.加载环境变量
source /etc/profile

#8。 提示用户安装成功，查看jdk安装版本 
echo "恭喜您，jdk安装成功！"
java -version
```

### 数据库定时备份

- 编写备份脚本 `dump_mysql.sh`,并赋予执行权限:`chmod +x dump_mysql.sh`

```shell
#!/bin/bash
#完成数据库定时备份
#备份的路径
BACKUP=/export/data/db
#当前时间作为文件名
DATETIME=$(date +%Y_%m_%d_%H_%M_%S)
echo $DATETIME
#使甲变量的时候中可以用小花括号的方式把变量名包起来,如下：
echo ${DATETIME}

echo "----------------开始备份数据库-------------------"
echo "----------------备份的路径是$BACKUP/$DATETIME.tar.gz--------------------"
#主机ip地址 
HOST=XXX.XXX.XXX.XXX
#数据库用户密码,数据库名
DB_USER=root
DB_PWD=xxxxxxxx
DATABASE=your_db_name
#创建备份路径
#如果备份的文件夹路径存在的话，就直接使用，否则就创建
#用法:如果文件夹不存在,则才执行后面的创建命令
[ ! -d "${BACKUP}/${DATETIME}" ] && mkdir -p "${BACKUP}/${DATETIME}"
#执行mysql备份数据库的指令
mysqldump -u${DB_USER} -p${DB_PWD} --host=${HOST} ${DATABASE} > ${BACKUP}/${DATETIME}/${DATETIME}.sql
#打包备份文件
cd ${BACKUP}
tar -czvf ${DATATIME}.tar.gz ${DATETIME}
#删除临时目录
rm -rf ${BACKUP}/${DATETIME}
#删除十天前的备份文件
#语法:-mtime  修改时间,+10  十天前,最后的{}为前面找到的文件 
find ${BACKUP} -mtime +10 -name "*.tar.gz" -exec rm -rf {} \;
echo "_----------------备份成功---------------"
```

![image-20240608225903999](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202406082259050.png)

- 定时任务

  `crontab -e`

  `15 1 * * *  /export/shell/dump_mysql.sh`

# ZooKeeper集群搭建

> Zookeeper是一个分布式协调服务的开源框架。主要用来解决分布式集群中应用系统的一致性问题.
>
> ZooKeeper本质上是一个分布式的小文件存储系统。提供基于类似于文件系统的目录树方式的数据存储，并且可以对树中的节点进行有效管理。从而用来维护和监控你存储的数据的状态变化，通过监控这些数据状态的变化，从而可以达到基于数据的集群管理。
>

Zookeeper集群搭建指的是Zookeeper分布式模式安装。通常由2n+1台server组成。这是因为为了保证Leader选举（基于Paxos算法的实现）能过得到多数的支持，所以ZooKeeper集群的数量一般为奇数。

Zookeeper运行需要java环境，所以需要提前安装jdk。对于安装leader+follower模式的集群，大致过程如下： 

配置主机名称到IP地址映射配置

修改ZooKeeper配置文件