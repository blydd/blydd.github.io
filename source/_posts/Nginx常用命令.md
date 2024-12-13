title: nginx常用命令
date: 2024-3-7 16:10:17
categories: nginx
description: 启停等常用命令
tags: 

	- nginx
	- nginx常用命令






---



```shell
nginx # 启动Nginx
nginx -c filename # 指定配置⽂件
nginx -V # 查看nginx安装目录 编译参数 配置文件和日志文件的位置等各种信息
nginx -t # 检查配置⽂件是否正确，也可⽤来定位配置⽂件的位置
nginx -s quit # 优雅停⽌Nginx
nginx -s stop # 快速停⽌Nginx
nginx -s reload # 重新加载配置⽂件
nginx -s reopen # 重新打开⽇志⽂件
```

