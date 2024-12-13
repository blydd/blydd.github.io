title: nginx如何处理请求
date: 2024-3-7 16:10:17
categories: nginx
description: server块讲解
tags: 

	- nginx
	- nginx-server块
	- nginx配置文件


---



> 翻自[官网](http://nginx.org/en/docs/http/request_processing.html) [server_name官网文档](http://nginx.org/en/docs/http/server_names.html)

# 1.基于名称的虚拟服务器

**nginx首先决定哪个服务器应该处理请求。**让我们从一个简单的配置开始，其中所有三个虚拟服务器都在端口*上侦听：80:

```yaml
server {
    listen      80;
    server_name example.org www.example.org;
    ...
}

server {
    listen      80;
    server_name example.net www.example.net;
    ...
}

server {
    listen      80;
    server_name example.com www.example.com;
    ...
}
```

**在这个配置中，nginx只验证请求头字`Host`以确定请求应该路由到哪个服务器**。如果它的值与任何服务器名称都不匹配，或者请求根本不包含这个头字段，那么nginx会将请求路由到这个端口的默认服务器。在上面的配置中，默认服务器是第一个服务器，这是nginx的标准默认行为。还可以使用listen指令中的default_server参数显式设置哪个服务器应为默认服务器：

```yaml
server {
    listen      80 default_server;
    server_name example.net www.example.net;
    ...
}
```

> *default_server参数自0.8.21版本以来一直可用。在早期版本中，应使用默认参数。*

请注意，**default_server是侦听端口的属性，而不是服务器名称的属性**。稍后将对此进行详细介绍。

# 2.如何拦截未携带Host请求头参数的请求

如果不允许没有“Host”请求头字段的请求，则可以定义一个丢弃请求的服务器：

```yaml
server {
    listen      80;
    server_name "";
    return      444;
}
```

在这里，服务器名称被设置为一个空字符串，该字符串将匹配没有“Host”请求头字段的请求，并返回一个特殊的nginx的非标准代码444来关闭连接。

> 从版本0.8.48开始，这是服务器名称的默认设置，因此可以省略server_name “”。在早期版本中，机器的主机名被用作默认服务器名称。

# 3.同时配置了ip和域名(server_name)的混合虚拟服务器

让我们来看一个更复杂的配置，其中一些虚拟服务器侦听不同的地址：

```yaml
server {
    listen      192.168.1.1:80;
    server_name example.org www.example.org;
    ...
}

server {
    listen      192.168.1.1:80;
    server_name example.net www.example.net;
    ...
}

server {
    listen      192.168.1.2:80;
    server_name example.com www.example.com;
    ...
}
```

在这个配置中，nginx首先根据`listen`指令验证请求的IP地址和端口。然后，它根据与IP地址和端口匹配的`server`块的`server_name`条目来验证请求的`Host`头字段。如果找不到匹配的`server_name`，则由默认服务器处理请求。

例如，在`192.168.1.1:80`端口上收到的对`www.example.com`的请求将由`192.168.1.1:80`端口的默认服务器处理，即由第一台服务器处理，因为没有为此端口定义`www.example.com`,**即listen属性监听了具体的ip和端口后就监听指定的ip和端口请求,此时server_name配置失效.**

如前所述，**`default_server`**是侦听端口的属性，并且可以为不同的端口定义不同的默认服务器：

```yaml
server {
    listen      192.168.1.1:80;
    server_name example.org www.example.org;
    ...
}

server {
    listen      192.168.1.1:80 default_server;
    server_name example.net www.example.net;
    ...
}

server {
    listen      192.168.1.2:80 default_server;
    server_name example.com www.example.com;
    ...
}
```

# 4.nginx如何选择location来处理一个请求

```yaml
server {
    listen      80;
    server_name example.org www.example.org;
    root        /data/www;

    location / {
        index   index.html index.php;
    }

    location ~* \.(gif|jpg|png)$ {
        expires 30d;
    }

    location ~ \.php$ {
        fastcgi_pass  localhost:9000;
        fastcgi_param SCRIPT_FILENAME
                      $document_root$fastcgi_script_name;
        include       fastcgi_params;
    }
}
```

nginx首先搜索由文字字符串给出的最具体的前缀位置，而不考虑列出的顺序。在上述配置中，唯一的前缀位置是“/”，由于它与任何请求匹配，因此将作为最后手段使用。然后nginx按照配置文件中列出的顺序检查正则表达式给出的位置。第一个匹配到表达式即停止向下匹配，nginx将使用这个location。如果没有正则表达式与请求匹配，那么nginx将使用前面找到的最特定的前缀位置。

请注意，所有类型的位置都只测试请求行中没有参数的URI部分。这样做是因为查询字符串中的参数可以通过几种方式给出，例如：

```shell
/index.php?user=john&page=1
/index.php?page=1&user=john
```

此外，任何人都可以请求查询字符串中的任何内容：

```shell
/index.php?page=1&something+else&user=john
```

现在，让我们看看在上面的配置中如何处理请求：

- 请求`“/logo.gif”`首先由前缀位置`“/”`匹配，然后由正则表达式`“`\\.（gif|jpg|png）$`”`匹配，因此由后一个位置处理。使用指令`“`root /data/www`”`，将请求映射到文件`/data/ww/logo.gif`，并将文件发送到客户端。
- 请求`“`/index.php`”`也首先由前缀位置`“`/`”`匹配，然后由正则表达式`“`\\.（php）$`”`匹配。因此，它由后一个位置处理，并将请求传递给在`localhost:9000`上侦听的FastCGI服务器。fastcgi_param指令将fastcgi参数SCRIPT_FILENAME设置为`“/data/www/index.php”`，然后fastcgi服务器执行该文件。变量`$document_root`等于根指令的值，变量`$fastcgi_script_name`等于请求URI，即“/index.php”。
- 请求`“`/about.html`”`仅与前缀位置`“`/`”`匹配，因此在该位置进行处理。使用指令`“`root /data/www`”`，将请求映射到文件`/data/ww/about.html`，并将文件发送到客户端。
- 处理请求`“/”`更为复杂。它只与前缀位置“/”匹配，因此，它由该位置处理。然后，index指令根据其参数和`“`root /data/www`”`指令来测试索引文件的存在。如果文件`/data/www/index.html`不存在，而文件`/data/www/index.php`存在，那么指令会进行内部重定向到“`/index.php`”，nginx会再次搜索位置，就像请求是由客户端发送的一样。正如我们之前看到的，重定向的请求最终将由FastCGI服务器处理。
