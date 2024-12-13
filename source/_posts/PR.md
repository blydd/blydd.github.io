title: PR
date: 2021-02-25 22:23:17
categories: 折腾
toc: true
description: 
tags: 

  - pr
  - 剪辑

---





# 1.电子相册案例

###  快捷键:

​	选中素材按`\`,自动调整面板到合适大小.

​	`c` 菜刀工具

​	`v` 选择工具

​	`ctrl alt v` 粘贴属性

​	鼠标指针放到音频左侧,按`alt`键滑动鼠标滚轮,可以放大音频波峰.

导入光晕后不显示其他图层问题:选中素材--效果控件--不透明度--混合模式改为滤色

### 用到效果:

​	高斯模糊,

​	径向阴影:相框效果:白色,不透明度100%,光源:1000 530).光源参数调整位置.如果没效果把"调整图层大小"勾选上.

​	投影:相框阴影效果(颜色黑色,不透明80%,距离30,柔和度15)

### 导出:

​	格式:`H.264  (mp4)`

​	预设:高比特率



# 2.电影混剪案例

首先确定剪辑思路.

创建序列:拖着视频到新建序列按钮.

小丸工具箱设置:

![image-20210730220239921](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031649658.png)

- 视频显示不全问题:


​	序列是`1080p`,拖进去视频是`720p`,则会出现视频显示不全的问题.

​	解决:选中视频,右击,缩放为帧大小.

- 电影遮罩:


​	新建--颜色遮罩--默认值--纯黑色--添加到时间轴并拉长--搜索效果裁剪添加到遮罩,修改顶部88%(或者直接拖动)

- 字幕:新版标题


​	选中时间轴-->`ctrl t`-->新建了字幕图层. 

​	改字体:效果--文本--英文用`light`,中文用`regular`,更有层次感

​	**问题:显示不全**

​	解决:效果调整矢量运动(该属性只有字幕图层才有).

**打标记**:选中标记,按`alt`,向右拖动可以把标记拉长为一段标记.

**挑选视频片段技巧**:砍好视频片段后,右击创建子剪辑,该片段就会放入素材区.

## **快捷键:**

- `L` 播放视频-加速,
- `K`播放视频-暂停,
- `J`播放视频-倒退.

- 视频启用/不启用:`shift E`


- 把音频上移一个轨道:选中音频:按上箭头.


**视频结尾渐隐效果**:效果搜索**黑场过度**,拖到视频结尾,设置16帧长.

**音频淡出效果**:效果搜索**恒定功率**,拖到音频结尾. 

音效素材:www.aigei.com

戴耳机画面: 把全部轨道素材右移:然后选中中间空白,右键**波纹删除.**

![image-20210730224638766](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031649743.png)

**导出**:中等比特率,大小和视频质量比较适中.

# 3.定格动画案例

 **批量修改持续时间**:选中批量素材右键-->更改持续时间(快捷键`ctrl R`)

**删除素材间隙**:

1. 点击空白右键波纹删除.
2. 序列--封闭间隙.
3. 更改持续时间时勾选"波纹剪辑,移动尾部剪辑"

**添加花字**:推荐旧版标题.

​		问题:色块把字体遮住了.  解决:选中字体,`ctrl x`剪切,`ctrl v`粘贴,就放到最上面一层了.

​		添加阴影. 

**关键帧动画**: 左右箭头中间的按钮点下表示添加一个关键帧点. 

![image-20210730231144955](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031649318.png)

**蒙版**:

​	选中素材--效果控件--不透明度--点下钢笔工具 

​	alt键:画蒙版路径时方便调整线条 

# 4.手机也能拍和剪

 曝光三要素:ppt讲解 

​	快门:

​		速度越快,进光量越小,照片越暗;速度越快,画面清晰无残影.(1/50秒和人眼差不多)

​		

![image-20210801162918125](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031649816.png)

​	光圈:

​		决定相机镜头打开的大小,数字越大、光圈越小,进光量越小

​		影响景深,使背景虚化:光圈越大,景深越小(背景虚化越严重),适合拍以人为主题画面

![image-20210801163800245](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031650536.png)

ISO

​	相机感光元件本身的敏感度

​	数字越大、感光元件对光线越敏感,画面越亮.

​	数字越大,噪点越多.

![image-20210801163939613](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031650880.png)



![image-20210801164021158](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031650828.png)

![image-20210801164045570](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031650264.png)

苹果手机拍摄:相机一定要设置为兼容模式.

推荐软件:filmic,调节快门ISo自平衡等参数;

​				定格动画工作室,可以把拍摄的上一张照片的残影显示在屏幕,收费.

设备:曼富图手持三脚架稳定器,八爪鱼,手机稳定器,俯拍支架.

手机剪辑软件:

​	巧影:操作逻辑和pr很像.

# 5.生活化vlog

![image-20210801173535808](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031650129.png)

![image-20210801173602238](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031651155.png)

![image-20210801173703724](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031651939.png)

![image-20210801173742186](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031652326.png)

![image-20210801173812520](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031652717.png)

![image-20210801173852331](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031652697.png)



大神:peter mckinnon,b站搜索皮老师,或者关注8k8k,搬运翻译了很多皮老师作品.

​		燃烧的陀螺仪

手持自拍叙事:a-roll;

声音旁边叙事:b-roll;

环境音.

找音乐:网易云音乐搜索vlog.

调整音量:关键帧.有人说话时背景音乐小点.

调色:选中素材--窗口--Lumetri颜色--调整参数.

​		通过调高曝光和阴影使画面变亮,适当拉高下对比度是画面更好看,稍微降低点黑色

# 6.旅拍vlog

推荐博主:小墨与阿猴.影视飓风,sam kolder.

旅游攻略网站:马蜂窝

平时注意搜集名人名言

收音设备:铁三角AT9912,wireless go

​	"我的组合是ulanzi V2的兔笼,加转接线 加铁三角AT9912"

转场:b站搜索无缝转场.

音乐:b站搜索"别只用网易云了!影视飓风音乐资源大公开".课程整理无版权音乐素材包

百度地图:录屏--搜索--快速点叉.

# 7.上镜要点

上镜方法:

​	emoji:视频.

​	带头套

​	老番茄处境法

背景:

​	基础简洁版,细节精致版.

​	拍摄时选大光圈,定焦镜头 ,可以虚化背景. 

打光:

​	单灯打光法

​	三灯打光法:

​		主光:拍摄中的主要光源

​		补光:降低主光产生的阴影

​		顶光:分离人物和背景

![image-20210802213756039](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031652011.png)



![image-20210802213926957](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031652596.png)

![image-20210802214019554](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031652336.png)



![image-20210802214141269](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031652267.png)

![image-20210802214209691](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031653120.png)

![image-20210802214230517](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031653678.png)

# 8.视频剪辑全流程

好用的录屏软件:oCam 

更高清的录屏软件:OBS,视频比特率2500比较合适.

降噪:处理音频神器--Au. 

​	选中视频--右击--在adobe audition中编辑剪辑--选中无人说话的2秒左右--效果--降噪/恢复--捕捉噪声样本 --全选音频--效果--降噪/恢复--降噪(处理) --降噪参数调整为85,降噪幅度改为40db--应用.

​	快捷键三秒完成:选中无人说话素材--shift P--Ctrl A--ctrl shift P--回车

匹配响度:让所有声音响度保持一致.

​		au窗口--匹配响度-- 匹配响度面板--把音频拉进来--改参数:匹配到选ITU-R BS.1770-3响度,目标响度-15,容差2,最高实际峰值电平-2--点击运行--ctrl s--文件--全部关闭--回到pr自动处理完成. 

QW快速剪辑法:时间轴指针放一位置--选中素材--按q,指针前面素材就会波纹删除掉.W用来删除指针后面素材. 



如果序列是1080p,但是素材是720p,无法铺满全屏:右击素材--缩放为帧大小.



花字制作:

​	使用旧版标题制作简单花字.还有可以把花字做成样式,方便后续多次使用:

![image-20210802220636071](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031653154.png)



复杂花字需要借助ps做好后放入pr使用:ps导出png图片.

花字动画:主要是关键帧.

导入预设:随便右击一个效果--导入预设

两种花字动画制作方法:1.关键帧;2.视频过渡效果

音效:素材大礼包.爱给网,站长素材网

视频放大缩小动画:选中视频--打开位置和缩放关键帧--shift + 右箭头 按两下右移10帧-- 改缩放为200,改下位置.

# 9.玩转pr特效

**预渲染**:运算量比较大的片段会变红色,选中入点,按`i`,选中出点,按`o`,按`enter`进行预渲染.

### 花字特效

转场插件.素材大礼包安装.安装完成后在效果面板视频过渡下面多出很多转场特效. 

​	双击转场特效,更改持续时间. 也可选中转场特效后在效果控件面板更改其他属性.

​	批量更改转场持续时间:编辑--首选项--时间轴--视频过渡默认持续时间12帧比较合适.

​	效果面板右下角新建素材箱,把常用的放进去.

### 图片花字法

选用透明底的png图片:千库网,stickpng

gif图片:站长素材网 ,soogif.com,阿里矢量.

### 表情贴图法

​	花瓣网:搜索贴纸.

​	追踪动画:选中贴纸--效果控件--运动--调整好位置--打开位置关键帧--每隔五帧调整.

### 特效素材法

​	综艺结果素材包

### TBC法

​	 to be continue:作死用.

 	时间轴指针放到指定片段位置,右击,添加帧定格, 后面片段就全静止住了.

​	黑白效果:效果--新建--新建调整图层--放到素材视频上方--效果搜索黑白添加到调整图层--素材和调整图层都变黑白,比直接把黑白效果添加到视频中更灵活. 

​	慢放:方法一:右击素材--调整持续时间(速度或持续时间都可更改以实现慢放 )

​			方法二:选中素材--按快捷键R--鼠标会变样--把视频往前拉就是快进,反之慢放 

### 雪茄墨镜法

​	关键帧:位置,旋转.

### 头部放大法

​	把要放大的片段砍出来--效果搜索放大,添加到砍出的片段 --选中素材--效果控件--放大-- 调中央和大小和羽化值属性,还可加关键帧.

# 10.鬼畜节目效果

### Up主

​	小可儿:作品念诗之王,调音教程,从0开始学鬼畜.

​	还有一天就放假了:鬼畜小课堂

​	 

### 搜索素材:

​	b站搜索鬼畜明星 + 原版,例如:元首 原版

​	音乐:网易云搜索鬼畜.

找伴奏的网站:5sing.kugou.com

### 处理音频神器:iZotope.RX.7.Audio.Editor.

​	separation algorithm选joint channel选项.

​	把音乐拖进去--右侧找到music rebalance调出面板-- 把voice拉最低,点preview预览,人声部分就被擦除了,Bypass是还原按钮.

​	把音乐拖进去--右侧找到music rebalance调出面板-- 把voice之外的拉最低,点preview预览,音乐 部分就被擦除了,Bypass是还原按钮.

​	渲染--保存.

### 使用pr模板:	

​	模板导入素材库	 

​	鬼畜技法:倒放-->右击素材,持续时间,倒放

​					小人翻转:关键帧旋转.

ps去掉无关人物:图片导入ps--点击左侧矩形框选工具-- 框选住要删的小人--shift f5--内容识别弹框点确定--导出图片.

导入震动预设:效果--presets--震动--模糊震动

水平反转效果:画面左右反转.

复制效果:把画面切成几份.

RGB图层分离效果:效果颜色平衡(RGB)拖到视频上--效果控件红色降为0,  绿色降为0,不透明度改为滤色--按住alt键复制一层,把绿色调到100,红色蓝色降为0--再alt复制一层把红色改为100--把某一层往后移2帧,另外一层后移4帧,然后对齐,即实现轻微分离效果.

镜头扭曲效果:



# 11.调色

色彩原理

​	三原色:红绿蓝(RGB)

![image-20210805222334615](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031653961.png)

任意两种三原色相加,等于另外一种三原色的补色

rgb是机器语言,转换成人类语言就是色相,饱和度/纯度(S ),明度(色彩的明亮程度 B)

调色:

​	打开两个面板:lumetri颜色(调整参数)和lumetri范围(右击勾选分量即可 )

​	新建一个调整图层,放到视频轨道上面:在调整图层上面进行调色.

​	一级调色-基本校正:把视频的一些偏色和曝光的问题调整一下:调整白平衡,调整色调

​	色相饱和度曲线:调整局部颜色.

​	HSL辅助:针对某一个颜色单独调色.很厉害.

​	如何使用LUT:LUT就是别人做好的调色文件,可以直接加载到视频上使用. lumetri颜色面板中加载:创意面板中使用.

​	软件查看效果--找到对应的lut--pr中lumetri颜色面板中导入使用.



# 12.绿幕抠图

效果搜索`键控`拖到绿幕素材上--效果控件--超级键--吸管工具--点下绿幕的绿色部分   这种方法扣不干净.

## 第一步

- 效果搜索**`颜色键`**拖到素材上
- 效果控件`颜色键`
- `吸管工具`点一下人物附近的颜色 
- 颜色键`颜色容差`(最好不超过50,推荐30左右)
- 若没扣干净,再次拖一个`颜色键`(同样设置颜色容差30左右)扣剩下的绿色.
- 如果还扣不干净再拖一个`颜色键`.
- 如果最后边上剩一点扣不干净,可以搜索`裁剪`效果把视频裁剪一部分,把没扣掉的绿色裁剪掉

## 第二步

人物边上的绿色没有完全扣干净,搜索**`超级键`**拖到素材,`吸管工具`点下人物边上的绿色(如果大部分都扣掉了看不见绿色可以暂时点下颜色键左边的`fx`,超级键点完再还原)

效果面板:修改`遮罩生成`:

- **`透明度`**35左右.透明度越高,人物更像幽灵一样
- **`基值`**30. 基值越高,人物周围效果不会那么硬,但太高会显假,建议30-50.
- **`抑制`**可以把周围毛糙的边缘扣干净(10-30),
- **`柔化`**看情况调整.一般10-20



**人物调色**:lumetri颜色--RGB曲线

**人物磨皮**:安装插件beauty box,效果搜索beauty box拖到调整图层 

**绿幕素材使用**:绿幕素材拖到时间轴--右击缩放为帧大小--搜索超级键拖上去--吸管工具吸一下绿色.

下载绿幕素材:b站搜索GB绿幕素材









# 13.延时摄影

固定延时:

![image-20210808102442281](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031653955.png)

去闪烁插件: 安装好插件后,效果搜索high speed拖到视频上:适用于水面等.



移动延时:	

​	 处理时解决抖动问题:右击视频--嵌套,变绿色--效果搜索变形稳定器拖到绿色的视频上,开始智能分析 

​		但是如果原片过于抖动也旧不了,会出现果冻效应

# 14.剪辑魔术

​		大神:油管 zach king博主

​	跳接类:不要出现光线变化,机位固定 ,加手持抖动效果:导入手持抖动预设--选中素材右击嵌套--选择抖动效果拖到素材.

​	遮罩类:关键帧.

# 15.大师珍藏篇





​    模板资源网站:

- NEWCG \
- 大众联网:ae模板 pr模板 音乐素材 插件 等

​	音效素材网站:爱给网 站长素材

​	图片素材网站:免费可商用--pixabay.com,unsplash.com,pexels.com

​							收费网站--摄图网699pic.com, 千库网588ku.com,千图网58pic.com

​	pr快捷键:

​		QWE快速剪辑:编辑--快捷键-- 搜索添加编辑--添加快捷键E(砍视频)  

​		波纹删除: 编辑--快捷键--搜索波纹删除--添加快捷键S

​		添加出入点:`i`添加入点,`o`添加出点,选中按`enter`可以预渲染,也可用于导出指定片段:导出时源范围选"序列切入/序列切出"

​		`JKL`:播放速度.

​		拖动素材位置:选中素材,按着`ctrl`可以往前拖动,也可拖到预览面板.  

​		反撤销:`ctrl shift z` 

队列导出工具:adobe media encoder,批量导出视频,导出时选择队列,添加到队列自动启动该软件.

文件管理神器:`windows:clover`  





# 案例

## 1.电影开场 文字背景

1. 导入视频,添加效果裁剪,打开顶部和底部关键帧,进行裁剪.

   ![image-20240523214058559](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405232140744.png)

2.  把视频按住Alt键向上复制一份,把复制的视频删掉裁剪效果,并添加文字调整大小,并保证文字在黑幕范围内

   ![image-20240523214255102](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405232142154.png)

3. 添加效果轨道遮罩键到复制的视频上,效果控件中修改属性遮罩为视频3,合成方式改成亮度遮罩

   ![image-20240523214450352](/Users/boguotong/Library/Application%20Support/typora-user-images/image-20240523214450352.png)