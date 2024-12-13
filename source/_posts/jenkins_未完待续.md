title: jenkins
date: 2024-04-19 9:10:17
categories: DevOps
toc: true
description: 
tags: 
	- jenkins
	- 运维

---



# 1.简介

## **背景**

`Jenkins`，之前叫做`Hudson`，由SUN公司启动，2010年`oracle`收购`SUN`导致`hudson`商标归`oracle`保留，`hudson`的主要贡献者基于hudson更名为`jenkins`并持续更新。很长一段时间内`Jenkins`和`Hudson`继续作为两个独立的项目，每个都认为对方是自己的分支。目前Hudson已经停止开发，最新的版本发布于2016年，而Jenkins的社区和开发却异常活跃。**Jenkins是目前市场上使用最多的CI/CD工具。**

**`Jenkins`是基于Java开发的一种持续集成工具。**

`Jenkins`作为持续集成工具，**持续集成是其核心功能**，在核心功能基础之上可扩展实现强大的CD功能。

## **特点**

- 开源免费
- 易于安装（基本上算是所有CI工具里安装配置最简单的）
- 多平台支持（windows/linux/macos）
- 主从分布式架构
- 提供web可视化配置管理页面
- 安装配置简单
- 插件资源丰富

## **应用场景**

- 集成svn/git客户端实现源代码下载检出
- 集成maven/ant/gradle/npm等构建工具实现源码编译打包单元测试
- 集成sonarqube对源代码进行质量检查（坏味道、复杂度、新增bug等）
- 集成SaltStack/Ansible实现自动化部署发布
- 集成Jmeter/Soar/Kubernetes/…..
- 可以自定义插件或者脚本通过jenkins传参运行
- 可以说Jenkins比较灵活插件资源丰富，日常运维工作都可以自动化

## **版本**

- `Jenkins 1.x`：不支持`pipeline`
- `Jenkins 2.x`：支持`pipeline`（主流）
- `Jenkins X`：基于`k8s`的持续集成（趋势）

## **主从集群**

`jenkins`支持主从模式，这将会把构建任务分发到多个从节点去执行，这样就可以支撑起多个项目的大量构建任务，提升构建效率。

同时，你可以提供多种环境（如：开发环境、生产环境）来对同一个项目进行测试和构建。

## **部署方式**

1. **服务器直接运行`war`**(更符合我们的启动习惯)
2. 服务器通过 `yum`命令下载`jenkins`安装包进行安装运行
3. `docker`容器运行


# 2.安装

## 2.1**环境说明**

- centos7
- jdk1.8
- maven3.6.1
- git1.8.3
- jenkins2.241
- Master主机 : 假设主机名叫 jenkins-master
- Slave从机 ： 假设主机名叫 jenkins-slave1

## 2.2安装Master

> 登录master服务器
>
> root用户执行命令

### 2.2.1安装DK

```shell
[root@jenkins-master ~]# yum install java-1.8.0-openjdk-devel.x86_64 -y

#查看java 安装路径
[root@jenkins-master ~]# ls -lrt /etc/alternatives/java
lrwxrwxrwx. 1 root root 73 9月 24 10:21 /etc/alternatives/java ->
/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.302.b08-0.el7_9.x86_64/jre/bin/java

#验证是否安装成功
[root@jenkins-master ~]# java -version
openjdk version "1.8.0_302"
OpenJDK Runtime Environment (build 1.8.0_302-b08)
OpenJDK 64-Bit Server VM (build 25.302-b08, mixed mode)

[root@jenkins-master ~]# javac -version
javac 1.8.0_302
```

### 2.2.2安装git

```shell
[root@jenkins-master ~]# yum install -y git
#验证是否安装成功
[root@jenkins-master ~]# git --version
git version 1.8.3.1
```

### 2.2.3**安装sshpass**

> 远程连接工具

```shell
[root@jenkins-master ~]# yum install sshpass -y
```

### 2.2.4**安装wget**

> 下载工具

```shell
[root@jenkins-master ~]# yum install wget -y
```

### 2.2.5**安装axel**

> 多线程下载工具

```shell
[root@jenkins-master ~]# wget http://download-ib01.fedoraproject.org/pub/epel/7/x86_64/Packages/a/axel-2.4-9.el7.x86_64.rpm

[root@jenkins-master opt]# rpm -ivh axel-2.4-9.el7.x86_64.rpm
```

### 2.2.6**创建jenkins用户**

```shell
[root@jenkins-master opt]# useradd jenkins --home-dir /home/jenkins --shell /bin/bash
# 设置密码为12345678
[root@jenkins-master opt]# passwd jenkins
```

### 2.2.7**下载安装maven**

 **下载解压**

```shell
#如果下载报错可用wget
[root@jenkins-master opt]# axel -n 20 https://archive.apache.org/dist/maven/maven-3/3.6.1/binaries/apache-maven-3.6.1-bin.tar.gz
[root@jenkins-master opt]# tar zxvf apache-maven-3.6.1-bin.tar.gz
[root@jenkins-master ~]# vi /etc/profile
# maven环境配置
export MAVEN_HOME=/opt/apache-maven-3.6.1
export PATH=$MAVEN_HOME/bin:$PATH
[root@jenkins-master ~]# source /etc/profile
# 验证maven安装成功
[root@jenkins-master ~]# mvn -v
```

**配置镜像加速**

> maven下的 conf/settings.xml 找到<mirrors>和</mirrors>标签，在其中添加如下内容(镜像加速)：

```xml
<mirror>
  <id>alimaven</id>
  <name>alimaven</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
  <mirrorOf>central</mirrorOf>
</mirror>
```

### 2.2.8**安装rsync**

> 跨机器文件同步工具

```shell
[root@jenkins-master opt]# yum install rsync -y
```

### 2.2.9**关闭防火墙**

```shell
[root@jenkins-master ~]# systemctl stop firewalld
[root@jenkins-master ~]# systemctl disable firewalld
Removed symlink /etc/systemd/system/multi-user.target.wants/firewalld.service.
Removed symlink /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service.
```

### 2.2.10**安装Jenkins**

#### **创建安装目录**

> 进入该目录后下载jenkins

```shell
#创建jenkins安装目录
[root@jenkins-master ~]# mkdir /opt/jenkins
# 该目录为jenkins用户授权
[root@jenkins-master ~]# chown -R jenkins:jenkins /opt/jenkins
```

#### **下载Jenkins**

> 下载jenkins安装包，war索引页：http://mirrors.jenkins-ci.org/war/

- 最新版本安装下载

```shell
#下载最新版 或指定版本https://mirrors.jenkins-ci.org/war/2.346/jenkins.war
[root@jenkins-master jenkins]# axel -n 20 https://mirrors.jenkins-ci.org/war/latest/jenkins.war
																					
```

- 指定版本下载

```shell
#指定版本
[root@jenkins-master jenkins]# axel -n 20 https://mirrors.jenkins-ci.org/war/2.288/jenkins.war
```

#### **编辑启动脚本**

> 登录jenkins用户后创建启动脚本

```shell
#切换到jenkins用户下
[root@jenkins-master jenkins]# su jenkins
#创建jenkins启动脚本
[jenkins@jenkins-master jenkins]$ vi jenkins.sh
```

**脚本具体内容如下**

```sh
#!/bin/bash
args=$1
#注意修改jenkinswar包的目录
jenkins_war_path="/opt/jenkins"
#jenkins开放端口
jenkins_http_port="8888"
#java安装路径
java_home="/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.302.b08-0.el7_9.x86_64"
function isRuning() {
	local jenkinsPID=$(ps -ef | grep jenkins.war | grep -v grep | awk '{print $2}')
	if [ -z ${jenkinsPID} ]; then
		echo "0"
	else
		echo ${jenkinsPID}
	fi
}

#停止jenkins
function stop() {
	local runFlag=$(isRuning)
	if [ ${runFlag} -eq "0" ]; then
		echo "Jenkins is already stoped."
	else
		$(kill -9 ${runFlag})
		echo "Stop jenkins sucess."
	fi
}

#启动jenkins
function start() {
	local runFlag=$(isRuning)
	echo "${runFlag}"
	if [ ${runFlag} -eq "0" ]; then
		$(
			${java_home}/bin/java -jar ${jenkins_war_path}/jenkins.war --
			httpPort=${jenkins_http_port} &
		) >/dev/null
		if [ $? -eq 0 ]; then
			echo "Start jenkins success."
			exit
		else
			echo "Start jenkins fail."
		fi
	else
		echo "Jenkins is running now."
	fi
}
#重启jenkins
function restart() {
	local runFlag=$(isRuning)
	if [ ${runFlag} -eq "0" ]; then
		echo "Jenkins is already stoped."
		exit
	else
		stop
		start
		echo "Restart jenkins success."
	fi
}
#根据输入的参数执行不同的动作
#参数不能为空
if [ -z ${args} ]; then
	echo "Arg can not be null."
	exit
#参数个数必须为1个
elif [ $# -ne 1 ]; then
	echo "Only one arg is required:start|stop|restart"
#参数为start时启动jenkins
elif [ ${args} = "start" ]; then
	start
#参数为stop时停止jenkins
elif [ ${args} = "stop" ]; then
	stop
#参数为restart时重启jenkins
elif [ ${args} = "restart" ]; then
	restart
else
	echo "One of following args is required: start|stop|restart"
	exit 0
fi
```

```shell
#查看java 安装路径
[root@jenkins-master ~]# ls -lrt /etc/alternatives/java
lrwxrwxrwx. 1 root root 73 9月 24 10:21 /etc/alternatives/java ->
/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.302.b08-0.el7_9.x86_64/jre/bin/java
```



### 2.2.11**启动jenkins**

```shell
[jenkins@jenkins-master jenkins]$ sh jenkins.sh start
```

![image-20240419100345043](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404191003220.png)

访问地址: IP:8888

# 3.使用及配置



## 3.1获取并修改管理员密码

登录后需要输入解锁密码才能够继续访问jenkins

启动日志中会打印管理员密码

也可通过如下命令可以从jenkins安装目录中获取管理员密码:

```shell
[jenkins@jenkins-master .jenkins]$ cat/home/jenkins/.jenkins/secrets/initialAdminPassword
b3c14cb5c6844201bc0ad01e4dfbf2d2
```

![image-20240419101438632](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404191014695.png)



**登入后跳过插件安装,就进入了欢迎界面,点击开始使用就会来到jenkins的主页面**

**修改管理员密码为123456，具体操作为点击页面左上角`jenkins`->`people`->`admin`->`configure`进行修改**

## 3.2 **镜像加速**

> jenkins默认镜像地址：https://updates.jenkins.io/update-center.json
>
> 常见的jenkins镜像地址有以下地址
>
> 清华大学 https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
>
> 华为 https://mirrors.huaweicloud.com/jenkins/updates/update-center.json
>
> xmission http://mirror.xmission.com/jenkins/updates/update-center.json

- 方式一

```shell
[jenkins@jenkins-master .jenkins]$ vi /home/jenkins/.jenkins/hudson.model.UpdateCenter.xml
```

将XML内的url的值替换为：http://mirror.xmission.com/jenkins/updates/update-center.json

```xml
<?xml version='1.1' encoding='UTF-8'?>
<sites>
	<site>
		<id>default</id>
		<url>http://mirror.xmission.com/jenkins/updates/update-center.json</url>
	</site>
</sites>
```



- 方式二

> 进入到web-ui界面的`Manage Plugins`->`Advanced` -> `Update Site`进行修改

![image-20240419101137152](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404191011232.png)

## 3.3**安装插件**

> jenkins运行需要安装很多插件，下面我们介绍下如何安装插件，下面我们以 Role-based Authorization Strategy 插件为例介绍下如何安装插件