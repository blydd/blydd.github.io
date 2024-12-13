title:  IDEA热部署
date: 2020-12-02 22:56:17
toc: true
description: springboot热部署
categories: java
tags: 

	- idea
	- 热部署


---

> 所谓的热部署就是在你修改了后端代码后不需要手动重启，工具会帮你快速的自动重启是修改生效。其深层原理是使用了两个`ClassLoader`，一个`Classloader`加载那些不会改变的类（第三方Jar包），另一个`ClassLoader`加载会更改的类，称为`restart ClassLoader`，这样在有代码更改的时候，原来的`restart ClassLoader` 被丢弃，重新创建一个`restart
> ClassLoader`，由于需要加载的类相比较少，所以实现了较快的重启时间。

# 1.引入依赖Devtools

搭建一个简单的Spring Boot项目，然后引入Spring-Boot-devtools：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>

```

devtools会监听classpath下的文件变动，并且会立即重启应用（发生在保存时机），因为其采用的虚拟机机制，该项重启是很快的。

# 2.开启Build Automatically：

![image-20240403145135201](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031451281.png)

# 3.开启运行中热部署

## 3.1 [低版本](https://so.csdn.net/so/search?q=低版本&spm=1001.2101.3001.7020)需要双击shift搜索registry

![在这里插入图片描述](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031453153.png)

![在这里插入图片描述](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031453670.jpeg)

## 3.2 高版本设置如下所示

![开启热部署](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031454212.png)

# 4.测试热部署

在入口类中添加一个方法，用于热部署测试：

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class DemoApplication {
    @RequestMapping("/")
    String index() {
        return "hello spring boot";
    }
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```



启动项目访问http://localhost:8080/，页面输出hello spring boot。

将方法的返回值修改为hello world并在保存的瞬间，应用便重启好了，刷新页面，内容也将得到更改。

