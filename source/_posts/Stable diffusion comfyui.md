title: stable diffusion comfyui
date: 2024-11-29 10:10:17
categories: 折腾
toc: true
description: 
tags: 
	- ai绘画
	- sd
	- comfyui


---



# ComfyUI简介

ComfyUI是一种新型的Stable Diffusion用户界面，因其独树一帜的“节点式”界面，逐渐成为了AI绘画领域进阶玩家的得力武器。搭配各式各样的自定义节点与功能强大的工作流，它得以用更低的配置实现许多在WebUI等常规界面里无法做到的复杂生成任务，并为基于Stable Diffusion搭建各类AIGC应用提供了便利。

项目主页：https://github.com/comfyanonymous/ComfyUI

# 安装

## Windows（N卡）安装流程

如果你使用的是Windows平台且为N卡用户，只需要在项目主页的Release页面下载作者提供的“官方整合包”，即可一键开启ComfyUI探索之路：

下载地址：https://github.com/comfyanonymous/ComfyUI/releases

进入后，点击“**[Download Link with stable pytorch 2.1 cu121](https://github.com/comfyanonymous/ComfyUI/releases/download/latest/ComfyUI_windows_portable_nvidia_cu121_or_cpu.7z)**”即可下载。

下载完毕后，解压文件夹至任意空白路径。双击“run_nvdidia_gpu.bat”，即可开启ComfyUI。

## MAC

1. Git clone 此存储库。

```JSON
git clone https://github.com/comfyanonymous/ComfyUI.git
```

2. 把您的 SD 大模型（Checkpoint，ckpt/safetensors 文件）放在 models/checkpoints 文件夹中；

> 或者如果你有存储于Automatic1111 WebUI项目中的模型文件，则无需额外搬运至ComfyUI的文件夹内，只需通过如下步骤简单配置即可实现模型文件的“互通”：
>
> 1. 拷贝WebUI根目录的路径（即包含webui_user.bat文件的路径）：`/Users/boguotong/software/sdwebui/stable-diffusion-webui`
> 2. 用记事本打开ComfyUI根目录下的`extra_model_path.yaml.example`文件，将路径粘贴至`base_path`后面.
> 3. 保存文件，并将文件重命名，去除.example的后缀.

3. 将您的 VAE 放入 models/vae 文件夹中；

4. 依赖安装

   ```bash
   cd ~/software/ComfyUI
   pip install -r requirements.txt
   ```

5. 启动ComfyUI。

​		启动命令: `python main.py --force-fp16`

​		GUI地址: http://127.0.0.1:8188

# 安装manager

> 这个插件是全能型插件管理工具,安装完这个插件后,之后即可在这个manager中安装管理其他插件.

```shell
cd ~/software/ComfyUI/custom_nodes
git clone https://github.com/ltdrdata/ComfyUI-Manager.git
```

重启生效.

## 汉化

`manager` --> `Custom Node Manager` --> 安装[**AIGODLIKE-COMFYUI-TRANSLATION**](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION) -->`Restart` --> 小齿轮设置 --> AGL -->切换语言.

> 如果restart后小齿轮设置中没有AGL选项,手动重启.

## 安装翻译节点

`manager` --> `Custom Node Manager` --> 安装[**AlekPet/ComfyUI_Custom_Nodes_AlekPet**](https://github.com/AlekPet/ComfyUI_Custom_Nodes_AlekPet) -->`Restart`



# ComfyUI工作流网站分享

## 官方工作流示例

ComfyUI Example：https://comfyanonymous.github.io/ComfyUI_examples/

可根据需要检索不同分类下的工作流下载使用。包含作者撰写的各种工作流的应用说明。

如果想一次性下载所有工作流，可以将这个项目下载/克隆到本地：https://github.com/comfyanonymous/ComfyUI_examples

```shell
git clone https://github.com/comfyanonymous/ComfyUI_examples.git
```



## 国内网站

1. eSheep电子羊AIGC社区 https://www.esheep.com/app

	主页点击工作流/应用分区，即可浏览、下载或在线运行各类工作流。

2. AIGODLIKE https://www.aigodlike.com/

	下拉选取“ComfyUI奥术”，即可查看其他用户上传的ComfyUI生成图片，保存或复制参数皆可读取到图片中的工作流。

## 国外网站

1. Comfy Workflows：https://comfyworkflows.com/
2. Openart.AI：https://openart.ai/workflows/home
3. ComfyICU：https://comfy.icu/
4. C站工作流分区：https://civitai.com/models
