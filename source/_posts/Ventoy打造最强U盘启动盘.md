title: Ventoy打造最强U盘启动盘,安装istoreOS系统
date: 2024-3-24 21:10:17
categories: 折腾

toc: true

description: 
tags: 

	- ventoy
	- u盘
	- istoreOS


---

> Ventoy是一个制作可启动山盘的工具,官可以将你喜欢的PE全部整合到一起,例如优启通\ FirePE\微PE,如果你的U盘容量够大,也可以将多个系统安装镜像统统塞进去,例如Win7.ISO \Win8.ISO \Wini0.lSO\ Win1l.ISO.
>
> 不仅如此,你还可以将Windows等系统装进U盘,随时随地就可以打开你的个人电脑.

# 准备

- 32g以上u盘

# 制作

[官网](https://www.ventoy.net/cn/download.html)下载ventoy,解压,打开安装程序.

![image-20240324215206822](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324215206822.png)

![](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324215227266.png)

选择你的u盘

![image-20240324215541049](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324215541049.png)

分区类型选GPT

![image-20240324215609107](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324215609107.png)

点击安装,提示格式化硬盘.

完成后如果u盘名称变为`Ventoy`,表示安装成功.

# iStoreOS系统安装

[下载最新iStoreOS固件](https://fw.koolcenter.com/iStoreOS/x86_64_efi/),下载完固件后需要先解压，再放到Ventoy启动盘的根目录下U盘才能识别到。

![image-20240324215915851](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324215915851.png)

把u盘插入要刷系统的主机,开机进入BIOS界面,

> 注意:如果找不到U盘的原因可能是U盘不兼容，需要换一个兼容的U盘

进入Ventoy界面,选择IstoreOS固件,按回车.

![image-20240324220209542](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324220209542.png)

![image-20240324220254495](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324220254495.png)

然后输入 `quickstart`

![image-20240324220405683](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324220405683.png)

![image-20240324220436139](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324220436139.png)

完成后拔掉u盘,重启系统即可.

重启完成进入后台 管理页面:默认IP是。192.168.100.1 默认密码是。password

![image-20240324220659443](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324220659443.png)

![image-20240324220736193](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324220736193.png)

![image-20240324220815873](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240324220815873.png)

 现在我们的Ventov启动盘就有两个(StoreOS固件（新版和测试版）,我们可以两个固件随时切换使用

# 相关链接

本文来源:  https://www.bilibili.com/list/watchlater?oid=572960814&bvid=BV1qz4y1n7pu&spm_id_from=333.788.top_right_bar_window_view_later.content.click

Ventoy下载：https://www.ventoy.net/cn/download.html 

iStoreOS最新版固件下载：https://fw.koolcenter.com/iStoreOS/x86_64_efi/ 

iStoreOS测试版固件下载：https://fw.koolcenter.com/iStoreOS/alpha/x86/x86_64_efi/ 

酷友社的QQ频道： https://pd.qq.com/s/448pvg3jq 

iStoreOS官网： https://www.istoreos.com/ 

易有云官网： https://www.linkease.com/ 

关于我们： https://www.istoreos.com/about/