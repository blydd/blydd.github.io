title: nginx配置文件
date: 2024-3-7 16:10:17
categories: nginx
toc: true
description: nginx配置文件详解
tags: 

	- nginx
	- nginx配置文件


---

> Nginx的配置⽂件是 nginx.conf ，⼀般位于 /etc/nginx/nginx.conf 。 可以使⽤ nginx -t 来查看配置⽂件的位置和检查配置⽂件是否正确。

# 全局块
> 主要⽤来设置⼀些影响Nginx服务器整体运⾏的配置指令，主要包括配置运⾏Nginx服务器的⽤户（组）、允许⽣成的worker process数、进程PID存放路径、⽇志存放路径和类型以及配置⽂件引⼊等。



## user

> 指定运⾏Nginx服务器的⽤户，只能在全局块配置
>
> 将user指令注释掉，或者配置成nobody的话所有⽤户都可以运⾏

```shell
#user [user] [group]
#user nginx;
user nobody nobody;
```

## worker_processes

> 指定⽣成的worker进程的数量，也可使⽤⾃动模式，只能在全局块配置

```shell
worker_processes  1; #auto或其他数字
```

## error_log

> 错误⽇志存放路径和类型

```shell
#error_log  /var/log/nginx/error.log;
#error_log  /var/log/nginx/error.log  notice;
#error_log  /var/log/nginx/error.log  info;
```

## pid

> 进程PID存放路径

```shell
pid /var/run/nginx.pid;
```

# events块

```shell
events {
	# 指定使⽤哪种⽹络IO模型，只能在events块中进⾏配置
	# use epoll
	
	# 每个worker process允许的最⼤连接数
  worker_connections  1024;
}
```

# http块

> http块是配置⽂件的主要部分，包括http全局块和server块。

```shell
http {
		****
}
```

## include

> nginx 可以使⽤include指令引⼊其他配置⽂件

```shell
include       mime.types;
```

## default_type

> 默认类型，如果请求的URL没有包含⽂件类型，会使⽤默认类型

```shell
default_type  application/octet-stream;
```

## log_format

> 定义⽇志格式

```shell
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
```

## access_log 

> ⽇志存放路径和类型
>
> 格式为：access_log <path> [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]];

```shell
access_log /var/log/nginx/access.log main;
```

## sendfile

> 开启⾼效⽂件传输模式

```shell
sendfile        on;
#tcp_nopush     on;
```

## sendfile_max_chunk

> 设置sendfile最⼤传输⽚段⼤⼩，默认为0，表示不限制

```shell
sendfile_max_chunk 1m;
```

## keepalive_requests

> 每个连接的请求次数

```shell
keepalive_requests 100;
```

## keepalive_timeout

> 连接超时时间

```shell
keepalive_timeout  65;
```

## gzip压缩相关

```shell
  # 开启gzip压缩
  #gzip  on;
	# 开启gzip压缩的最⼩⽂件⼤⼩
	# gzip_min_length 1k;
	# gzip压缩级别，1-9，级别越⾼压缩率越⾼，但是消耗CPU资源也越多
	# gzip_comp_level 2;
	# gzip压缩⽂件类型
	# gzip_types text/plain application/javascript application/xjavascript text/css application/xml text/javascript application/x-httpdphp image/jpeg image/gif image/png;
```

## upstream

> upstream指令⽤于定义⼀组服务器，⼀般⽤来配置反向代理和负载均衡

```shell
	upstream www.example.com {
		# ip_hash指令⽤于设置负载均衡的⽅式，ip_hash表示使⽤客户端的IP进⾏hash，
		# 这样可以保证同⼀个客户端的请求每次都会分配到同⼀个服务器，解决了session共享的问题
		ip_hash;
		# weight ⽤于设置权重，权重越⾼被分配到的⼏率越⼤
		server 192.168.50.11:80 weight=3;
		server 192.168.50.12:80;
		server 192.168.50.13:80;
	}
```

## server

> server块是配置虚拟主机的，⼀个http块可以包含多个server块，每个server块就是⼀个虚拟主机。

### 示例

```shell
server {
				# 监听IP和端⼝
				# listen的格式为：
				# listen [ip]:port [default_server] [ssl] [http2] [spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number];
				# listen指令⾮常灵活，可以指定多个IP和端⼝，也可以使⽤通配符
				# 下⾯是⼏个实际的例⼦：
				# listen 127.0.0.1:80; # 监听来⾃127.0.0.1的80端⼝的请求
				# listen 80; # 监听来⾃所有IP的80端⼝的请求
				# listen *:80; # 监听来⾃所有IP的80端⼝的请求，同上
				# listen 127.0.0.1; # 监听来⾃来⾃127.0.0.1的80端⼝，默认端⼝为80
        listen       80;
				# server_name ⽤来指定虚拟主机的域名，可以使⽤精确匹配、通配符匹配和正则匹配等⽅式
				# server_name example.org www.example.org; # 精确匹配
				# server_name *.example.org; # 通配符匹配
				# server_name ~^www\d+\.example\.net$; # 正则匹配
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
				
				# location块⽤来配置请求的路由，⼀个server块可以包含多个location块，每个location块就是⼀个请求路由
        # location块的格式是：
				# location [=|~|~*|^~] /uri/ { ... }
				# = 表示精确匹配，只有完全匹配上才能⽣效
				# ~ 表示区分⼤⼩写的正则匹配
				# ~* 表示不区分⼤⼩写的正则匹配
				# ^~ 表示普通字符匹配，如果匹配成功，则不再匹配其他location
				# /uri/ 表示请求的URI，可以是字符串，也可以是正则表达式
				# { ... } 表示location块的配置内容
				location / {
						# root指令指定请求的根⽬录，可是绝对路径，也可是相对路径
            root   html;
						# index指令指定默认⽂件，如请求的是⽬录，则会在⽬录下查找默认⽂件
            index  index.html index.htm;
        }
				# 下⾯是⼀些location的示例：
				 location = / { # 精确匹配请求
						 root /usr/share/nginx/html;
						 index index.html index.htm;
				 }
				 location ^~ /images/ { # 匹配以/images/开头的请求
						 root /usr/share/nginx/html;
				 }
				 location ~* \.(gif|jpg|jpeg)$ { # 匹配以gif、jpg或者jpeg结尾的请求
						 root /usr/share/nginx/html;
				 }
				 location !~ \.(gif|jpg|jpeg)$ { # 不匹配以gif、jpg或者jpeg结尾的请求
						 root /usr/share/nginx/html;
				 }
				 location !~* \.(gif|jpg|jpeg)$ { # 不匹配以gif、jpg或者jpeg结尾的请求
						 root /usr/share/nginx/html;
				 }

				# error_page ⽤于指定错误⻚⾯，可以指定多个，按照优先级从⾼到低依次查找
        #error_page  404              /404.html;
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
```

### 其他的server块例子

```shell
 # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
```

### 配置https

```shell
server {
	listen 443 ssl;
	server_name www.lifeab.asia;
	#相对路径下的证书目录
	ssl_certificate   cert/a.pem;
	ssl_certificate_key  cert/a.key;
	ssl_session_timeout 5m;
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;

  #把https请求重定向
	location / {
					#实际服务开放地址
	        proxy_pass http://182.92.10.251:8888;
        	proxy_set_header Host $host;
	        proxy_set_header X-Real-IP $remote_addr;
        	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	        proxy_set_header X-Forwarded-Proto $scheme;
    	}	
    }
```

