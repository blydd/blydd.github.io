title: nginx安装方式
date: 2024-3-7 16:10:17
categories: nginx
description: 
tags: 

	- nginx
	- nginx安装








---



# 1.CentOS

## 1.1yum安装

```shell
# 1. 安装EPEL仓库
sudo yum install epel-release
# 2. 更新repo
sudo yum update
# 3. 安装nginx
sudo yum install nginx
# 4. 验证安装
sudo nginx -V
```

## 1.2通过Nginx的官⽅仓库来安装

> 这样可以保证安装的是最新的版本

```shell
1. 安装前置依赖
sudo yum install yum-utils

2. 添加nginx仓库
sudo vim /etc/yum.repos.d/nginx.repo

3. 添加以下内容
[nginx-stable] [nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
或者
[nginx-mainline] [nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
上⾯的 stable 和 mainline 就分别表示稳定版和主线版，可以根据⾃⼰的需要来选择。

4. 更新repo
sudo yum update

5. 安装nginx
sudo yum install nginx

6. 验证安装
除了使⽤ sudo nginx -V 之外，还可以使⽤下⾯的⽅式来验证：
# 启动Nginx
sudo nginx
curl -I 127.0.0.1
如果能够看到类似下⾯的输出，就表示安装成功了：
HTTP/1.1 200 OK
Server: nginx/1.25.1
```

# 2.Debian、Ubuntu

## 2.1apt安装

```shell
# 1. 更新仓库信息
sudo apt-get update
# 2. 安装nginx
sudo apt-get install nginx
# 3. 验证安装
sudo nginx -V
```

## 2.2通过Nginx的官⽅仓库来安装

> 这样可以保证安装的是最新的版本

```shell
# 1. 安装前置依赖
sudo apt install curl gnupg2 ca-certificates lsb-release debian-archivekeyring

# 2. 导⼊官⽅Nginx签名密钥
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
 | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null

# 3. 验证下载的⽂件中包含了正确的密钥
gpg --dry-run --quiet --no-keyring --import --import-options import-show
/usr/share/keyrings/nginx-archive-keyring.gpg

# 4. 设置稳定版或者主线版的Nginx包
# 稳定版
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/debian `lsb_release -cs` nginx" \
 | sudo tee /etc/apt/sources.list.d/nginx.list
# 主线版
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
http://nginx.org/packages/mainline/debian `lsb_release -cs` nginx" \
 | sudo tee /etc/apt/sources.list.d/nginx.list

# 5. 设置仓库优先级，优先使⽤Nginx官⽅仓库
echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPinPriority: 900\n" \
 | sudo tee /etc/apt/preferences.d/99nginx

# 6. 安装nginx
sudo apt update
sudo apt install nginx

# 7. 验证安装
sudo nginx
curl -I 127.0.0.1
```

# 3.MAC安装

```shell
brew install nginx
```

# 4.从源码编译安装

> 从源码编译安装的⽅式可以让我们⾃定义Nginx的安装⽬录、模块等，但是安装过程⽐较繁琐，需要安装⼀些依赖库

## 4.1安装PCRE库

> PCRE是Perl Compatible Regular Expressions的缩写，是⼀个Perl库，包括perl兼容的正则表达式库。

```shell
wget github.com/PCRE2Project/pcre2/releases/download/pcre2-10.42/pcre2-10.42.tar.gz
tar -zxf pcre2-10.42.tar.gz
cd pcre2-10.42
./configure
make
sudo make install
```

## 4.2 安装zlib库

> zlib是⼀个数据压缩库，⽤于Nginx的gzip模块。

```shell
wget http://zlib.net/zlib-1.2.13.tar.gz
tar -zxf zlib-1.2.13.tar.gz
cd zlib-1.2.13
./configure
make
sudo make install
```

## 4.3 安装OpenSSL库

> OpenSSL是⼀个强⼤的安全套接字层密码库，⽤于Nginx的SSL模块

```shell
wget http://www.openssl.org/source/openssl-1.1.1t.tar.gz
tar -zxf openssl-1.1.1t.tar.gz
cd openssl-1.1.1t
./Configure darwin64-x86_64-cc --prefix=/usr
make
sudo make install
```

## 4.4 下载Nginx源码

### 4.4.1下载主线版的Nginx源码：

```shell
wget https://nginx.org/download/nginx-1.23.4.tar.gz
tar zxf nginx-1.23.4.tar.gz
cd nginx-1.23.4
```



### 4.4.2下载稳定版的Nginx源码：

```shell
wget https://nginx.org/download/nginx-1.24.0.tar.gz
tar zxf nginx-1.24.0.tar.gz
cd nginx-1.24.0
```

## 4.5 配置编译选项

> 编译选项可以通过 ./configure --help 来查看。 下⾯是⼀个官⽹的例⼦：

```shell
./configure
--sbin-path=/usr/local/nginx/nginx
--conf-path=/usr/local/nginx/nginx.conf
--pid-path=/usr/local/nginx/nginx.pid
--with-pcre=../pcre2-10.42
--with-zlib=../zlib-1.2.13
--with-http_ssl_module
--with-stream
--with-mail=dynamic
--add-module=/usr/build/nginx-rtmp-module
--add-dynamic-module=/usr/build/3party_module
```

| **参数（Parameter）** | **说明（Description）**                       |
| --------------------- | --------------------------------------------- |
| --prefix=             | 指定安装⽬录                                  |
| --sbin-path=          | 指定Nginx可执⾏⽂件                           |
| --conf-path=          | 指定配置⽂件位置                              |
| --pid-path=           | 指定pid⽂件位置                               |
| --error-log-path=     | 指定错误⽇志⽂件                              |
| --http-log-path=      | 指定HTTP⽇志⽂件                              |
| --user=               | 指定运⾏Nginx的⽤户                           |
| --group=              | 指定运⾏Nginx的组                             |
| --with-pcre=          | 指定PCRE库的位置                              |
| --with-pcre-jit       | 开启PCRE的JIT（Just-in-time compilation）⽀持 |
| --with-zlib=          | 指定zlib库的位置                              |

