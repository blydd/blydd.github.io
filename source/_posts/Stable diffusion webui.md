title: stable diffusion webui
date: 2024-11-28 10:10:17
categories: 折腾
toc: true
description: 
tags: 
	- ai绘画
	- sd
	- webui


---

# 安装web-ui

## windows

> 目前，市面上基于Stable Diffusion制作的实用程序中，最受欢迎的是一个由一位越南开发者[Automatic1111](https://github.com/AUTOMATIC1111)制作的[Stable Diffusion WebUI（SD Web UI）](https://github.com/AUTOMATIC1111/stable-diffusion-webui)，提供了非常可视化的参数调节与对海量扩展应用的支持。

### 安装步骤

第一步：下载前置软件应用：Python、Git、对应显卡驱动，按视频指引完成前置安装；

第二步：从代码仓库Git Clone（克隆）WebUI的本体包；

- `git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git`
- 如果连不上，使用镜像地址：`git clone https://gitee.com/nenly/stable-diffusion-webui.git`

第三步：下载一个大模型（Checkpoint），手动放置在根目录下的模型文件夹内；

- 模型大小在1~7G之间
- 大模型格式为.ckpt或.safetensor，放置地址为上面的文件夹（根目录）内的/models/stable-diffusion文件夹内；

第四步：双击运行webui-user.bat文件，自动下载部分依赖并等待安装完成；

> 安装预计总占用空间3~4G左右，一般在30分钟内可完成。

第五步：等待安装完成，看到“Running on Local URL”一类的字样后，复制其后的链接在浏览器中打开，即可进入WebUI；

第六步（可选）：按照第8课里的相关指引，安装汉化文件、部分基础扩展和进阶扩展：

> 建议安装：中文本地化补丁（汉化），图库浏览器，Tag Autocompletion（提示词补全）；
>
> 参考视频:https://www.bilibili.com/video/BV1hz4y1a76M?t=5.0

**以后每次运行程序：按第四步中所示方式，双击运行webui-user.bat文件即可。**

### Q&A:

 ⛔ **卡在Couldn't Install Torch选项上了？**

打开**stable-diffusion-webui（根目录）/modules**文件夹，找到一个叫**launch_utils.py**的脚本文件，打开。

通过搜索找到这样一段代码，在“torchversion==xxx”后面手动加上一个“-i https://mirrors.aliyun.com/pypi/simple/”，保存文档关闭再运行即可；

 ⛔ **卡在Installing GFPGAN/CLIP/Transformer等选项上了？**

打开**stable-diffusion-webui（根目录）/modules**文件夹，找到一个叫**launch_utils.py**的脚本文件，打开。

每一个“https://github.com/”前面手动加上一个“https://ghproxy.com/”（一共应该要添加7~8个），保存文档关闭再运行即可；

# **正面提示词后请添加：**

(masterpiece:1,2), best quality, highres, original, extremely detailed wallpaper, perfect lighting,(extremely detailed CG:1.2),

**后续添加提示词：**

looking at viewer, close-up, upper body,

# **负面提示词后请添加：**

NSFW, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, (ugly:1.331), (duplicate:1.331), (morbid:1.21), (mutilated:1.21), (tranny:1.331), mutated hands, (poorly drawn hands:1.5), blurry, (bad anatomy:1.21), (bad proportions:1.331), extra limbs, (disfigured:1.331), (missing arms:1.331), (extra legs:1.331), (fused fingers:1.61051), (too many fingers:1.61051), (unclear eyes:1.331), lowers, bad hands, missing fingers, extra digit,bad hands, missing fingers, (((extra arms and legs))),







# **模型下载网站**

- C站  https://civitai.com/
- 抱脸 https://huggingface.co/models?pipeline_tag=text-to-image&sort=downloads
- L站 https://www.liblibai.com/#/index/model
- 炼丹阁 https://www.liandange.com/



# **名词解释**

- **VAE** 变分自编码器,作用：增加图片饱和度，降低灰度，让图片有更多色彩
- **面部修复** 识别人像后进行局部重绘,渲染人物图时需要，提高SD对人体面部的细节捕捉
- **平铺图**（Tiling） 顾名思义可以进行平铺,主要用来做纹理图案背景
- **高清放大**/Hires.fix  增加噪点扩散放大,把模糊的图片变清晰
- **提示词引导系数(**CFG Scale)  提示词的权重,文字和图片的相关度建议4-9之间,数值高：提示词和图片的相关度越高
- **随机和子**  筛子：重置种子为-1（出图完全随机） ,循环标志：复制上一张图的种子
- **模型**(checkpoint): ai训练的数据集，用来支持AI出画作画





# **embeddings**(嵌入)

-  又叫textual inversion（文本反转）,是在stable diffusion中控制图像风格的一种方法.我们可以将它理解为，某一些具有特定功能的关键词的打包

- - 举个很简单的案例

  - - 如果说我们要描述一个“三明治^，我们可能会用到很多的关键词，比如：金枪鱼罐头、蛋黄酱、鸡蛋、西红柿、 生菜叶，吐司面包
    - 如果说“三明治”是一个我们经常需要用到的描述词，我们就可以将描述“三明治”的所有关键词打包成一个文件这个文件的名称叫做“三明治”，以后当我们在其他的地方需要用到这个描述词的时候，我们只需要输入“三明治” 一个关键词就可以了，而不再需要输入上面的一大堆关键词—这个就是embeddings文件的底层逻辑。

  - 用法

  - - - 正因为embeddings只是一些关键词的打包，训练 embeddings可以用少至3-5个样本即可完成，因此 embeddings文件的体积极小！大部分在100k左右，小的只有几k。

      - 下载

      - - 在civitai网站中，我们可以通过筛选“Textual Inversion“ 来找到并下载embeddings文件；
        - 下载之后存放的路径是根目录下的 “lembeddings” 文件夹

  - Negative Embeddings 负面嵌入

  - - Negative Embeddings（负面嵌入）针对不良内容进行训练， 通常可以在负面提示中使用它们来改善图像。
    - 二次元手部修复推荐：badhandv4 - AnimelllustDiffusion 
    - 二次元画面改善推荐：EasyNegative 
    - 写实类推荐： Deep Negative

  - 

# Hypernetwork 超网络(鸡肋)

- - 是一种微调技术，最初由stable difusion的早期采用者NovelAI开发。它是一个附加到stable diffusion模型的小型神经网络，用于修改其风格。

  - 目前的局限性

  - - 1、Hypernetwork的使用效果并不理想，甚至还不如体积只有几k的embeddings文件，但是Hypernetwork的文件体积却可以与lora相提并论，在几十M甚至上百M；
    - 2、Hypernetwork可以实现的效果，用其他的替代方式几乎都可以实现，比如用embeddings或者用lora

  - 与其他模型的区别

  - - Hypernetwork无法单独运作.它需要与checkpoint模型配合来生成图像.
    - LORA 模型与Hypernetwork最相似。它们的文件大小相似，通常低于 200MB，比checkpoint模型小得多。有一个公认的事实，LORA 模型比Hypernetwork模型能产生更好的结果。
    - Embeddings是一种称为Textual Inversion” 文本反转”的微调方法的结果。与Hypernetwork一样， 文本反转不会改变模型。它只是定义新的提示词来实现某些样式。根据目前网上的评价，作图效果embeddings比 Hypernetwork稍微强大一些。

# ControlNet

总结一句话，ControlNet就是进一步通过其他维度来控制出图的准确度

- ControlNet的本质是文生图（txt2img）
- 预处理器与模型要配合使用

**5款常用的Controlnet**

![5款常用的controlnet](https://bgt-blog-pic.oss-cn-qingdao.aliyuncs.com/imgs/202411281446012.jpg)

## 安装使用

### 1.安装

扩展 --> 从网址安装 --> 输入https://github.com/Mikubill/sd-webui-controlnet.git --> 安装

**扩展地址：**https://github.com/Mikubill/sd-webui-controlnet

### 2.下载模型:

**1.1版本模型地址：**

（下载地址）https://huggingface.co/lllyasviel/ControlNet-v1-1/tree/main

  (下载地址-夸克）https://pan.quark.cn/s/13f64e0a1133

（模型介绍）https://github.com/lllyasviel/ControlNet-v1-1-nightly

**1.14版本后更新的新模型（包括社区模型）与XL模型的地址：**https://huggingface.co/lllyasviel/sd_control_collection/tree/main

> **<u>模型下载后，一般放置于`stable-diffusion-webui（根目录）\extensions\sd-webui-controlnet\models or stable-diffusion-webui（根目录）\models\ControlNet`</u>**

**预处理器下载地址（缺东西在里面找）：**https://huggingface.co/lllyasviel/Annotators/tree/main

> **<u>预处理器下载后，一般放置于`stable-diffusion-webui（根目录）\extensions\sd-webui-controlnet\annotator\downloads`</u>**

# **提示词**

- 英文

- 提示词之间用英文的半角逗号分隔

- 越靠前的提示词权重越高

- 调整权重
  - （ ）小括号增加1.1倍

  - { }大括号增加1.05倍

  - [ ]中括号減少1.1倍

  - 或者括号＋冒号＋数字：（1girl：1.5）就是1.5倍权重

  - 注意：大幅度调整权重，会让画面扭曲（控制在1.5权重以内比较好）

  - 参考一些模型网站例图和提示词记录网站的成品

  - - Openart:  https://openart.ai/ 
    - Arthubai:  https://Arthubai.ai/


# 模型

## **模型风格分类**

### 二次元模型
> 偏漫画/插画风，具有较鲜明的绘画笔触质感

  - 精致度满满，室内外场景优秀 counterfeitV2.5
  - 最受欢迎的二次元模型：AnythingV5
  - 魔幻感十足：dreamlike diffusion

### 真实系模型
> 偏真实的，拟真程度高，对现实世界还原度高

  - 真实朴素:Realistic vision
  - 照片级：Lofi
  - 精细的写实风格:deliberate

### 2.5D模型
> 介于前面两者之间的，接近目前观众对一些游戏和3D动画的想象

  - 动漫角色的二次创， 即真实又二次元： never ending dream
  - 超现实的画面：Protogen ×3.4 （Photorealism）
  - 国风、小人书、水墨风： guofeng3

### 其他类型
> 平面设计，建筑设计之类的
- 富有现代感的建筑（dvArch - Multi-Prompt Archittecture Tuned Model）
- 富有魔幻感的场景 （Cheese Daddy's Landscapes mix)





## **LORA模型**

### 介绍

> lora是Low-Rank Adaptation（低秩适应）的缩写， lora是一种在消耗更少内存的情况下加速大型模型训练的训练方法，在stable diffusion中它允许您使用低秩适应技术来快速微调扩散模型。他也是微软的研究人员为了解决大语言模型微调而开发的一项技术，简而言之，LoRA训练模型可以更轻松地针对不同概念（例如角色或特定风格）进行模型训练。然后，这些经过训练的模型可以被导出并供其他人使用。

- 文件后缀：CKPT或者safetensor

- 文件大小：小于200MB

- 放置位置: SD根目录下的/models/lora文件夹内

- 下载地址:  C站

### 使用方式 

`<>+lora+冒号+文件名`（放在文件夹内的文件名） 例如：`<lora：kyockcho2>`

1. 注意权重是直接加后面不能用括号<lora：kyockcho2：0.8>

2. 直接小红书点开，然后点一下想用的LORA
3. 用Additional network插件

### 应用板块

- 人物角色形象
- 画风或者风格
- 概念
- 服饰
- 物体/特定元素

### Additional Networks扩展

https://github.com/kohya-ss/sd-webui-additional-networks

### LoRA链接

本课中使用到的大部分LoRA，均可以在网盘内找到。如需参考绘制方法和提示词，请查阅以下的模型源地址。

**人物LoRA**

- 边缘行者Lucy：https://civitai.com/models/5477/lucy-cyberpunk-edgerunners-lora

**画风LoRA**

- 吉卜力画风：https://civitai.com/models/6526?modelVersionId=6370

**概念LoRA**

- Gacha splash LORA：https://civitai.com/models/13090?modelVersionId=38884

**服装LoRA**

- A-Mecha Musume A素体机娘：https://civitai.com/models/15464/a-mecha-musume-a

**特定元素LoRA**

- Cyberhelmet | Wearable LoRA：https://civitai.com/models/25360/cyberhelmet-or-wearable-lora

### 常见问题

**Q：通过内置LoRA功能和LoRA插件加上去的LoRA有区别吗？**

**A：理论上没有任何区别。插件只是提供了一个单独编辑LoRA的窗口。**

- 目前较为主流的LoRA应用形式其实是通过内置功能（点击加提示词），我也更建议你采用这种方式；

**Q：有一些LoRA放进模型文件夹了，却没有显示？**

**A：常见于使用2.1或XL模型时**。WebUI会默认将不符合当前主模型版本的LoRA隐藏，可以在设置-扩展模型（Additional Networks）中的对应选项将其调节为可显示的状态即可。（可按如下方式设置）

![img](https://bgt-blog-pic.oss-cn-qingdao.aliyuncs.com/imgs/202411281551123.png)

**Q：使用LoRA时，出现类似“The size of tensor a (96) must match the size of tensor b (168)……“的报错信息**

**A：这个问题是由于使用的LoRA底模版本与你的大模型底模版本不一致导致的。**

- 和Checkpoint一样，LoRA模型也需要基于Stable Diffusion的底模进行训练。你可以查看模型页面的相关选项，了解你的LoRA底模是什么版本的（一般作者标题/版本号也会明说）；

  ![img](https://bgt-blog-pic.oss-cn-qingdao.aliyuncs.com/imgs/202411281550921.png)

- 在使用1.5版本模型（即SD1.5和基于它微调出来的Checkpoint）出图时，请选用同样基于1.5的LoRA模型；用2.1、XL模型时同理。
