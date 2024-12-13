title: 10个有趣的linux命令
date: 2024-4-1 10:50:17
categories: linux
toc: true
description: 10个有趣的linux命令
tags: 
	- linux


---





# 1.rev命令



**一行接一行地颠倒所输入的字符串。**

运行：

```
$rev
```

如输入：shiyanlou

```
shiyanlou
```

![image-20240401105646687](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011056756.png)



# **2.asciiview命令**



1.先安装aview



```
$sudo apt-get install aview
```

2.再安装imagemagick

```
$sudo apt-get install imagemagick
```

3.使用asciiview

```
$asciiview shiyanlou.png -driver curses
```



效果如下：



![image-20240401105807449](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011058483.png)

#  



# **3.sl命令**



你会看到一辆火车从屏幕右边开往左边……

安装

```
$ sudo apt-get install sl
```

运行

```
$ sl
```

![image-20240401105832176](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011058207.png)



# **4.aafire命令**



**在你的终端放一把火。**

安装

```
$sudo apt-get install libaa-bin
```

运行

```
$aafire
```

![image-20240401105857259](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011058294.png)



# **5.cmatrix命令**



这个很酷！《黑客帝国》那种矩阵风格的动画效果。

安装

```
$ sudo apt-get install cmatrix
```

运行

```
$cmatrix
```

要关闭效果，按ctrl+c 结束。

![image-20240401105922096](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011059135.png)



# **6.factor命令**



**分解因数**，这个……可以帮家里的小学生解题

运行：

```
$factor60
```

![image-20240401105939292](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011059323.png)



# **7.oneko命令**



**桌面上出现一只喵星人**，跟着你的鼠标跑，你不动了它就睡觉。哈哈，这个挺不错!

安装

```
$sudo apt-get install oneko
```

运行

```
$oneko
```

要关掉这家伙，按ctrl+c 结束。

![image-20240401105957379](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011059412.png)



# **8.boxes命令**



**在输入的文本或者代码周围框上各种ASCII 艺术画。**

安装

```
$ sudo apt-get install boxes
```

运行

```
$ echo "shiyanlou.com" | boxes
```



or



```
$ echo "shiyanlou.com" | boxes -d dog
```

![image-20240401110019807](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011100842.png)



# **9.xeyes命令**



xeyes命令是一个图形显示程序。运行这个程序，你会看到一双萌萌的眼睛会一直盯着你。

安装

```
$ sudo apt-get install xeyes
```

运行

```
$ xeyes
```

![image-20240401110033259](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011100297.png)



# **10.pv命令**



有时候我们在电影屏幕上看到一些**字幕一个个匀速显示出来**，像有人在边敲键盘，边显示一样。Linux上的pv命令可以实现这种效果。

安装

```
$ sudo apt-get install pv
```

运行

```
$ echo "welcome to shiyanlou.com , you can learn IT by doing" | pv -qL 10
```

![image-20240401110055448](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404011100480.png)



**[内容来源](https://mp.weixin.qq.com/s?__biz=MzI3NzQ4MTE4Mw==&mid=2247521333&idx=1&sn=b3250351772d98994580b2d9b0a4ebcc&chksm=eadb59729f996d7366bc250855930a6d7117fdb53e66dad562496faf1670241d6cf5f4e9de0c&scene=132&exptype=timeline_recommend_article_extendread_extendread_for_notrec&show_related_article=1&subscene=132&scene=132#wechat_redirect)**
