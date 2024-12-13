title: docker
date: 2024-7-17 22:56:17
categories: java
toc: true
description: docker
tags: 
	- docker





---



# 安装

## centos

1. **备份原有 Docker 镜像源文件**（如果有的话，以防万一需要恢复）：

   ```shell
   1sudo cp /etc/yum.repos.d/docker-ce.repo{,.bak}
   ```

2. **下载阿里云提供的 Docker CE 镜像源配置文件**：

   ```shell
   sudo wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo
   ```

   或者，如果wget命令不可用，可以使用curl命令代替：

   ```shell
   sudo curl -o /etc/yum.repos.d/docker-ce.repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
   ```

3. **清理并更新 YUM 缓存**：

   ```shell
   sudo yum clean all
   sudo yum makecache
   ```

4. **安装或更新 Docker CE**：

    

   如果尚未安装 Docker CE，可以使用以下命令安装：

   ```shell
   sudo yum install docker-ce
   ```

   如果已经安装了 Docker CE 并希望更新到最新版本，可以使用：

   ```shell
   sudo yum update docker-ce
   ```

5. **启动并设置 Docker 服务开机自启**：

   ```shell
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

完成以上步骤后，你就成功地将 Docker 的镜像源设置为了阿里云镜像源，这将有助于加快 Docker 镜像的下载速度。记得验证 Docker 是否正常工作，可以通过运行 `docker info` 或者 `docker run hello-world` 来测试。

# 配置国内镜像加速

创建或编辑 `/etc/docker/daemon.json` 文件（如果文件不存在则创建）：

```json
{
  "registry-mirrors": ["https://mpuom15x.mirror.aliyuncs.com"]
}
```

重启 Docker 服务使配置生效：

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```



# 安装常用

## nacos

```shell
sudo docker run -d --name my-nacos -p 8848:8848 nacos/nacos-server
```

## mysql

> 首次启动时自动创建数据库、用户及设置用户密码

```shell
docker run --name my-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=test -e MYSQL_USER=bgt -e MYSQL_PASSWORD=123456 -d mysql:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --explicit_defaults_for_timestamp=true
```

**允许远程连接**:

1. **进入容器**:

   ```
   docker exec -it my-mysql /bin/bash
   ```

2. **进入MySQL客户端**:

   ```
   mysql -u root -p
   ```

3. **更新MySQL配置以允许远程访问**: 在MySQL客户端中执行以下命令，以允许所有IP地址远程连接（注意，这样做可能有安全风险，生产环境中应谨慎设置）:

   ```
   USE mysql;
   UPDATE user SET host='%' WHERE user='root';
   FLUSH PRIVILEGES;
   EXIT;
   ```

4. **重启MySQL容器**: 先退出容器，然后重启容器以应用更改。

   ```
   exit
   docker restart my-mysql
   ```