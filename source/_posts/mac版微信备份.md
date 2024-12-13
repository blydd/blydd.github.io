title: mac版微信备份
date: 2024-4-2 10:40:17
categories: mac
toc: true
description: mac版微信备份文件存储路径
tags: 
	- 微信
	- macos


---

# 1.快速将iPhone上微信的聊天记录备份到电脑



## 第1步

用数据线将手机与电脑连接

## 第2步

打开iPhone里的个人热点，关闭电脑的WiFi和本地连接（或者直接拔掉网线）。这样电脑就可以经由数据线通过手机的WiFi进行上网。

当然我们的目的并不是让电脑通过手机连接外网，而是让电脑和手机处于同一WiFi环境内。

## 第3步

打开电脑端和手机端微信，电脑端选择备份聊天记录，手机端会自动弹出选择要备份的会话.

看到这里有小伙伴儿可能会问了，电脑连接手机的热点以后，是不是通过手机的流量备份的？会不会消耗我太多的流量？

其实大家完全不用担心，备份是通过局域网环境进行的，并没有外网的流量流入和流出，不信可以看我的截图。可以看到，此时的上网速度约等于0，也就是说并不消耗手机的流量。

![image-20240402105117625](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021051676.png)

# 2.Mac 版微信聊天记录备份文件路径

访达打开路径快捷键:`CMD + SHIFT + G`

`/Library/Containers/com.tencent.xinWeChat/Data/Library/Application\ Support/com.tencent.xinWeChat/2.0b4.0.9`

在 Mac 电脑系统内，微信的备份文件会存放在 2.0b4.0.9 的 Backup 文件夹内，并且备份目录的路径不会改变。每一个微信账号的聊天记录备份对应此目录下的一个文件夹，名称通常为**一长串字母和数字**的组合。

![image-20240402105325620](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021053647.png)

如需把备份文件存储到网盘或硬盘,操作Backup 文件夹即可.

例如压缩文件夹保存到阿里云盘,下次备份后(增量备份)再次压缩保存阿里云盘,需要恢复时只需最新的一个备份文件即可.
