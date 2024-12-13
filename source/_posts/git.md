title: git
date: 2024-4-08 10:56:17
description: git
toc: true
categories: java
tags: 
	- git


---

# 1.git常用命令

## 1.1.设置用户信息

- **设置用户名** `git config --global user.name "yourname"`
- **设置邮箱** `git config --global user.email "youemail@qq.com"`
- **查看配置信息** `git config --list`  
- **查看用户名**  `git config user.name`

配置信息保存在   `~/.gitconfig` 文件中

## 1.2 获取git仓库

要使用git对代码进行版本控制,首先要获得git仓库,获得方式有两种:

- 本地初始化一个git仓库

```shell
# 在本地仓库文件夹中
git init
```

- 从远程仓库克隆

```shell
git clone 远程仓库地址
```

## 1.3 工作目录、暂存区以及版本库 概念 

- **版本库:**前面看到的.git隐藏文件夹就是版本库,版本库中存储了很多配置信息、日志信息和文件版本信息等
- **工作目录(工作区)** :包含.git文件夹的目录就是工作目录,主要用于存放开发的代码
- **暂存区:** .git文件夹中有很多文件,其中有一个index文件就是暂存区,也可以叫做stage.暂存区是一个临时保存修改文件的地方

## 1.4 Git工作目录下文件的两种状态

- untracked 未跟踪(未被纳入版本控制)
- tracked 已跟踪(被纳入版本控制)
  - Unmodified	未修改状态
  - Modified        已修改状态
  - Staged          已暂存状态

## 1.5 提交命令和查看状态

```shell
# 查看各个文件状态
git status
# 使输出信息更简洁
git status -s
# 把文件加入暂存区 
git add hell.java
# 把文件取消暂存
git reset HEAD hell.java
# 把暂存区文件提交到本地仓库 (如果文件没加入暂存区则无法提交到本地仓库)
# 如果不加-m,则会打开编辑器让填写日志
git commit -m "提交日志"
 # 删除文件(删除本地工作区文件,需要git commit -m "delete file" 提交到远程)
 # 如果右键删除文件,并没有加到暂存区,还需要通过git add 文件名加到暂存区后再commit同步到git远程
 # 推荐git rm方式删除
 git rm hell.java
 
```

## 1.6 将文件添加到忽略列表

一般我们总会有些文件无需纳入Git的管理,也不希望它们总出现在未跟踪文件列表,通常都是些自动生成的文件,比如日志文件,或者编译过程中创建的临时文件等。在这种情况下,我们可以在工作目录中创建一个名为.gitignore的文件(文件名称固定) ,列出要忽略的文件模式。

windows下无法直接创建.gitignore文件,需要通过gitbash命令:touch .gitignore创建



 

## 1.7 查看日志记录

```shell
# 通过回车分页查看 退出输入q
git log
```

## 1.8 远程仓库

### 1.8.1**查看远程仓库**

如果想查看已经配置的远程仓库服务器,可以运行`git remote`命令,显示和本地仓库已经关联的远程仓库。它会列出指定的每一个远程服务器的简写。
如果已经克隆了远程仓库,那么至少应该能看到origin,这是Git克隆的仓库服务器的默认名字

`git remote -v` 显示更多信息

### **1.8.2添加远程仓库**

一个本地仓库可以绑定多个远程仓库

`git remote add <shortname> <url>`   shortname远程仓库简称

Eg: `git remote add origin https://gitee.com/ChuanzhiBoKe/repo1.git`

### 1.8.3**移除远程仓库**

如果因为一些原因想要移除一个远程仓库,可以使用`git remote rm 远程仓库简称`

注意:此命令只是从本地移除远程仓库的记录,并不会真正影响到远程仓库

### 1.8.4**抓取和拉取**

- git fetch是从远程仓库获取最新版本到本地仓库,不会自动merge

​			执行完git fetch后会把远程仓库文件以二进制形式存储到.git中,并不会主动合并到工作区,还需要手动合并:

​			`git merge origin/master`  (origin/master会在git fetch后显示)

- git pull是从远程仓库获取最新版本并merge到本地仓库

  ​		注意:如果当前本地仓库不是从远程仓库克隆,而是本地创建的仓库,并且仓库中存在文件,此时再从远程仓库拉取文件(**git pull 		origin master**)的时候会报错(fatal:refusing to merge unrelated histories ) ,
  
  ​		解决此问题可以在git pull命令后加入参数**-allow-unrelated-histories**
  
  ​		然后会让输入日志.保存即可.

### 1.8.5**推送到远程仓库**

​	`git push origin master`

> 只有把文件加入暂存区才可加到本地仓库,如果想一步完成:
>
> `git commit -a -m "提交日志"`

## 1.9 git分支

### 1.9.1查看分支:

```shell
#列出所有本地分支
$ git branch
#列出所有远程分支
$ git branch -r
#列出所有本地分支和远程分支
$ git branch -a
```

### 1.9.2创建分支

```shell
# 创建分支 (在当前分支基础上创建)
git branch 分支名称
# 切换分支
git checkout 分支名称
```

### 1.9.3推送本地分支至远程分支

```shell
git push origin 本地分支名称
```

### 1.9.4合并分支

```shell
# 在master分支下操作此命令,表示把b1分支合并到master
git merge b1

# 有时候合并操作不会如此顺利。如果你在两个不同的分支中,对同一个文件的同一个部分进行了不同的修改, Git就没办法合并它们,同时会提示文件冲突。此时需要我们打开冲突的文件并修复冲突内容,最后执行git add命令来标识中突已解决
# 步骤如下
# 1 git merge b1
# 2 提示冲突,手动解决冲突
# 3 git add
# 4 git commit -m "解决冲突日志"
```

### 1.9.5新增文件推送到远程分支

```shell
git push origin 远程分支名称		
```

### 1.9.6删除本地分支

```shell
# 删除本地分支 不会影响远程分支
#如果要删除的分支中进行了一些开发动作,此时执行上面的删除命令并不会删除分支,如果坚持要删除此分支,可以将命令中的一d参数改为-D
git branch -d 本地分支名称
```



### 1.9.7删除远程分支

```shell
git push origin -d branchName
```

## 1.10 git标签

> 像其他版本控制系统(VCS)一样, Git可以给历史中的某一个提交打上标签,以示重要。比较有代表性的是人们会使用这个功能来标记发布结点(v1.0,v1.2等) 。标签指的是某个分支某个特定时间点的状态。通过标签,可以很方便的切换到标记时的状态。

```shell
# 列出所有标签
git tag
# 创建标签 v0,1是标签名
git tag v0.1  
# 查看tag信息 比较详细
git show 标签名
# 推送标签到远程仓库
git push origin 标签名

#检出标签
#新建一个分支，指向某个tag
$ git checkout -b [新分支名] [标签名]
# 例如:git checkout -b b3 v1.0 表示创建一个b3分支,其代码状态就是v1.0标签时的代码状态

#删除本地标签
git tag -d 本地标签名
#删除远程标签
git push origin:refs/tags/远程标签名
```

# 2. TortoiseGit

TortoiseGit是一款开源的Git图形界面工具,使用TortoiseGit可以简化Git相关的操作(本质上还是执行的Git相关命令)
TortoiseGit下载地址: https://tortoisegit.org/download/

# 3.IDEA使用git

# 4.SSH协议配置

**使用Git Bash生成公钥和私钥:**

1. 使用命令`ssh-keygen-trsa`生成公钥和私钥,执行完成后在windows本地用户.ssh目录:  `C:\Users\用户名\.ssh` 下面生成公钥和私钥
2. 把公钥内容复制到服务器