title: 利用Alist搭建本地影音系统挂载阿里云盘为本地
date: 2024-3-22 10:10:17
categories: 折腾

toc: true

description: 
tags: 

	- alist


---



[官方文档](https://alist.nn.ci/zh/guide/install/script.html )



# 一键脚本安装

默认安装在 `/opt/alist` 中。 自定义安装路径，将安装路径作为第二个参数添加，必须是绝对路径（如果路径以 alist 结尾，则直接安装到给定路径，否则会安装在给定路径 alist 目录下），如 安装到 `/root`：

```shell
# Install
curl -fsSL "https://alist.nn.ci/v3.sh" | bash -s install /root
# update
curl -fsSL "https://alist.nn.ci/v3.sh" | bash -s update /root
# Uninstall
curl -fsSL "https://alist.nn.ci/v3.sh" | bash -s uninstall /root
```

# 安装完毕提示

用户名默认`admin`

```shell
Alist 安装成功！

访问地址：http://YOUR_IP:5244/

配置文件路径：/root/alist/data/config.json
---------如何获取密码？--------
先cd到alist所在目录:
cd /root/alist
随机设置新密码:
./alist admin random
或者手动设置新密码:
./alist admin set NEW_PASSWORD
----------------------------
启动服务中

查看状态：systemctl status alist
启动服务：systemctl start alist
重启服务：systemctl restart alist
停止服务：systemctl stop alist

温馨提示：如果端口无法正常访问，请检查 服务器安全组、本机防火墙、Alist状态
```

# 配置阿里云盘

首次进入[网站](http://YOUR_IP:5244/)会有如下提示,需要点下面的manage进入配置:

![image-20240322101908638](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240322101908638.png)

参考:

[官方文档](https://alist.nn.ci/zh/guide/drivers/aliyundrive)

[知乎](https://www.zhihu.com/question/567047941)



点击左侧的存储，点击添加。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-66c2f637b8e505be57eab2e6c4ac19aa_1440w.png)

**驱动一定要选择阿里云盘Open**，不要选“阿里云盘”，千万别搞错了。**挂载路径可以自己填写喜欢的名称，前面的斜杠要加上**。我这里就写阿里云盘备份盘。

**序号是给我们挂载的云盘排序用的，这是第一个，就从0开始**。**Web代理关闭，WebDAV策略选择[302重定向](https://www.zhihu.com/search?q=302重定向&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})。**

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-74ec08721c218bc490de72b396dc65da_1440w.png)

往下滚动，其他选项均保持默认不变，**将云盘类型设置为资源库**，然后**填入自己阿里云盘的刷新令牌(重点！)，如何获得刷新令牌呢？需要从电脑浏览器访问下面这个网站：**

```text
https://alist.nn.ci/tool/aliyundrive/request
```

打开后，先点击Scan QrCode，然后用手机版阿里云盘app扫码，授权成功后，再点击页面最下方的I have scan。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-15420860a19c65ccb06f5abe6fcead71_1440w.webp)

接下来就会获得阿里云盘的[refresh_token](https://www.zhihu.com/search?q=refresh_token&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})，全选并复制。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-eac0db32e33889e69eb5ae2cfef672d1_1440w.webp)

填入alist的“刷新令牌”框中即可。

![image-20240322145721358](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240322145721358.png)

页面继续往下滚动，确认Oauth令牌链接为

```text
https://api.xhofe.top/alist/ali_open/token
或者
https://api.nn.ci/alist/ali_open/token
```

移除方式可以选择删除或者回收站，看自己需求。其他选项保持默认，设置完毕后点击添加。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-5e82757bfe67087779345815531a0c0d_1440w.webp)

我们可以按照以上方式，同样将阿里云盘资源库也挂载一次，除了将挂载路径和云盘类型更换为资源库及设置一个新的序号外，其他内容全部保持不变，包括刷新令牌也不变。两个盘都挂载成功后，会在alist的存储页面显示出来，并且状态为WORK：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-28ac4b6d80720ef96f1f49aa81beef06_1440w.png)

点击alist左下角的“主页”，回到主页后，可以看到我们的阿里云盘已经能正常显示了：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-35899a6058e9c9efe4cf8f426972f536_1440w.webp)

作者：袋鼠叔叔
链接：https://www.zhihu.com/question/567047941/answer/3206878540
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



# 配置夸克网盘

夸克网盘也是阿里旗下的产品，主要优势在于88VIP免费赠送会员，所以这两年也非常火爆，用户数量已经不逊于阿里云盘，甚至有赶超百度网盘的势头。夸克网盘的alist挂载方法和前面的阿里云盘有一些区别，主要是获取Cookie的方式不一样，下面我们开始。

**仍然进入Alist管理页面，添加一个新的驱动，驱动选择“夸克”。挂载路径和序号根据自己需求填写，缓存过期时间仍然填0。Webdav策略选择“[本地代理](https://www.zhihu.com/search?q=本地代理&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})”。**

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-630b18f25dada42db400cecb9ffa16cb_1440w.webp)

**继续往下滚动，我们需要获取Cookie。**打开电脑浏览器并登录夸克网盘账号(用网页版登录)，然后按键盘上的F12，进入开发者模式。

点击上方的Network(网络)选项卡，在左侧的Name(名称)中找到“sort?[pr=u](https://www.zhihu.com/search?q=pr%3Du&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})”开头的条目并选中(如果该条目没刷新出来，需要稍等几秒钟)，然后在右侧的Request Headers中，找到[Cookie值](https://www.zhihu.com/search?q=Cookie值&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})并复制：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-19dbf01b385ef70908ab3cab7facfd2f_1440w.png)

将复制的Cookie值填入alist设置页面，其他选项全部保持默认，然后点击添加即可。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-5527d6db8f3ae448658c0c4f807e9397_1440w.webp)

夸克网盘挂载成功。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-8faecfea8c376e69d4a9297197a89aa3_1440w.webp)

# **配置百度网盘**

**目前使用人数最多，市场最大的网盘。VIP会员价格不便宜，速度快，资源多，但是对非会员限速很厉害。使用Alist挂载的情况下，如果是VIP会员，请优先选择官方API接口。非会员可以尝试使用第三方接口，但有时候会不太稳定。**

仍然打开Alist管理页面—存储—添加。驱动选择百度网盘，挂载路径和序号按需填写。特别注意，一定要打开[web代理](https://www.zhihu.com/search?q=web代理&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})，并且将WebDAV策略设置为302重定向，才能正常在线播放视频。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-901d6bda7ccf4a9da5d18a4e6c67f27d_1440w.webp)

继续往下滚动，这里只有一个地方需要我们自己填写，就是刷新令牌。那么如何获取呢？首先用电脑浏览器登录[网页版百度网盘](https://pan.baidu.com/login?redirecturl=https%3A%2F%2Fpan.baidu.com%2Fdisk%2Fmain%23%2Findex)，然后访问以下地址：

```text
https://alist.nn.ci/zh/guide/drivers/baidu.html
```

在页面中找到刷新令牌链接，并点击：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-b0cda62dffed703c1ad7b5d712e30938_1440w.png)

点击后就可以看到refresh_token，这个就是刷新令牌。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-03f17f9504a2ac219d81d9f8fd663d38_1440w.webp)

将其复制粘贴到alist的页面中即可：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-c3bda8bbb79f8e8a8e30e1b5c7a2d050_1440w.webp)

下面的自定义UA，上传线程及上传api全部保持默认，点击添加完成，百度云盘成功挂载至Alist。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-ebb12034a958e4a93cc121fe4791a784_1440w.webp)

**我以上仅展示了最常用的百度，夸克和阿里云盘作为实操案例。但实际上Alist作为目前市面上最强大的网盘挂载工具，支持几乎所有的网盘类型及厂商，如果有其他网盘需求，可以自己搜索一下方法，基本大同小异。Alist官网也为大家贴心的准备了每一种网盘的说明文档供参考。**

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-0e56b6405dd69ad09a774dca4bb70384_1440w.webp)

# 大招:使用RaiDrive将Alist中的云盘挂载到电脑

现在，我们已经可以通过浏览器的alist管理页面，从而访问所有已挂载的云盘，但这还不是结束。**我们的最终目的是将这些网盘全部挂载到电脑，像使用本地硬盘那样使用网盘**。接下来要用到的就是RaiDrive这款强大的[本地磁盘](https://www.zhihu.com/search?q=本地磁盘&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})映射软件。

> **RaiDrive目前只支持Windows平台，但在苹果macOS平台上，你可以考虑使用Folx开发商出品的Cloud Mounter作为替代。Cloud Mounter是一款类似于RaiDrive的工具，可以帮助你将网盘挂载映射成电脑本地硬盘。**
>
> ![image-20240325120020339](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240325120020339.png)

百度搜索RaiDrive官网，点击download并选择合适的版本，32位系统选择X86，64位系统选择X64，下载后安装在电脑中：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-552220a75d9592c72fea25b6578a8d65_1440w.webp)

接下来点击设置页面最上方的添加，新建一个[虚拟服务器](https://www.zhihu.com/search?q=虚拟服务器&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})，服务类型为NAS—WebDAV。[虚拟驱动器](https://www.zhihu.com/search?q=虚拟驱动器&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})选择一个自己喜欢且尚未被占用的，盘符随意填写。

最重要的是把地址后面的√去掉，使用http方式连接，然后在http://后输入NAS的ip地址+Alist端口号。最后输入自己的Alist登录账户和密码，确认连接即可。我把所有要点击或填写的位置都明确标注在下图，方便大家跟着设置：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-f501520896c8588272276be189065127_1440w.webp)

连接成功后，在“我的电脑”中就可以看到由RaiDrive虚拟的本地硬盘盘符了，打开以后和我们日常使用本地硬盘并无二致：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-7ae64622a9479a1a7af1e8a6e6ffba27_1440w.webp)

经过测试，只要跟着这个教程一步一步走，我们既可以使用浏览器正常下载，上传及播放云盘中的文件(视频)，也可以通过RaiDrive像操作本地硬盘那样使用云盘，在几个云盘之间来回复制粘贴也没有问题，完全能够跑满宽带的上传和下载速度：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-9519bd92bbb78320f5d1ca653ce673c4_1440w.webp)

夸克网盘复制到阿里云盘稳定在3M/S，跑满上行

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-8a33347680d52aa5572f71c280e2ca8d_1440w.png)

百度网盘复制到电脑桌面稳定在20M/S以上，跑满200M宽带下行

当然，如果想要在手机上挂载alist中的网盘到本地，也没有任何问题，使用支持WebDAV协议的App即可，如ES[文件浏览器](https://www.zhihu.com/search?q=文件浏览器&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3206878540})，SolidExplorer等，设置方法和RaiDrive是完全一样的。比如我这里以Solid Explorer为例：

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-87f2e168e6765f5e7ab816d0bb88d5ff_1440w.webp)

如果想要在手机或TV端集中观看网盘中的视频，只要使用支持WebDAV的播放器即可，如Kodi，Emby，Jellyfin等，实测无论是播放还是拖拽，都非常丝滑:

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/v2-0bc8f0abbcd5f7d7aaa53abec12f55fc_1440w.webp)





作者：袋鼠叔叔
链接：https://www.zhihu.com/question/567047941/answer/3206878540
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。