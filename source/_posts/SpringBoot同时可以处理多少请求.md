

title: SpringBoot同时可以处理多少请求？
date: 2024-05-30 22:23:17
categories: java
toc: true
description: 
tags: 
  - springboot
  - tomcat
  - 面试

---


准确的来说，Spring Boot 同时可以处理多少个请求，并不取决于 Spring Boot 框架本身，而是取决于其内置的 Web 容器（因为 Web 容器的行为，决定了 Spring Boot 的行为，所以咱们姑且认为两个问题的回答是一样的）。

# **1.Web三大容器**

Web 容器目前也是三分天下，市面上最常见的三种 Web 容器分别是：Tomcat、Undertow 和 Jetty，其中 **Tomcat 为 Spring Boot 框架默认的 Web 容器**。

它们三者的区别如下：

- Tomcat 是 Apache 软件基金会下的开源项目，是最广泛使用的 Servlet 容器之一，完全实现了 Java Servlet 和 JavaServer Pages（JSP）规范。它不仅是一个 Servlet 容器，也是一个轻量级的应用服务器，尽管相比其他轻量级服务器，Tomcat 被认为是稍微重一些的。Tomcat 支持众多的企业级特性，如 SSL、连接池等，适合运行大型的、复杂的企业级应用。它的稳定性和成熟度经过了多年的企业级应用验证，因此在很多企业中作为首选的 Web 容器。
- Undertow 是 Red Hat（红帽公司）开发的一个灵活的、高性能的 Web 服务器和反向代理服务器，它是 WildFly 应用服务器的默认 Web 容器。Undertow 设计上注重低内存占用和高并发处理能力，尤其擅长处理大量的短连接场景，比如 RESTful API 服务。Undertow 支持 Servlet 3.1、WebSocket以及非阻塞 IO(NIO)，并且是支持 HTTP/2 协议的现代服务器之一。它的设计理念在于提供一个模块化、可嵌入式的解决方案，易于集成到现有的系统中，同时也适合微服务架构。
- Jetty 是一个开源的、轻量级的 Web 服务器和 Servlet 容器，由 Eclipse 基金会维护。它以其可嵌入式、高度可配置性著称，常用于需要快速启动和轻量级部署的场景，比如开发阶段、测试环境或轻量级应用。Jetty 也支持 Servlet 规范和 WebSocket，且同样基于 NIO，使得它在处理大量并发连接时表现出色。Jetty 设计上强调灵活性和可扩展性，易于通过 API 定制以满足特定需求，因此在云环境、持续集成、DevOps 等领域很受欢迎。

> 总的来说，Tomcat 因其成熟稳定和企业级特性适用于大型应用；Undertow 以高性能和低内存占用见长，特别适合处理高并发短连接场景；而 Jetty 则以轻量、灵活、易于嵌入为特点，适合快速开发和轻量级部署。

# **2.最大连接数和最大等待数**

以 Spring Boot 框架默认的 Web 容器 Tomcat 为例，它能够同时处理多少个请求，其实是在 Spring Boot 框架中的 `spring-configuration-metadata.json` 文件中配置着，如下图所示：

![图片](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405301807136.webp)

打开此文件，搜索“**server.tomcat.max-connections**”（Tomcat 最大连接数）会得到以下结果：

![图片](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405301807238.webp)

也就是说，**默认情况下 Tomcat 允许的最大连接数是 8192（=8*1024)个。**

那么，此时有人可能会认为，**默认情况下 Spring Boot 同时能处理的请求数应该是 8192，如果你也是这样认为，那你就错了**。为什么呢？

因为，虽然 Tomcat 可以允许最大的连接数是 8192，但是 Tomcat 还有一个最大等待数，也就是说，如果达到了 8192 之后，还有一个等待队列可以存放请求的连接，所以，**Spring Boot 可以同时处理多少个连接，等于 Tomcat 的最大连接数加 Tomcat 的最大等待数**。

我们继续在 spring-configuration-metadata.json 文件中，搜索“**server.tomcat.accept-count”**（Tomcat 最大等待数），搜索结果如下图所示：

![图片](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405301807353.webp)

也就是说，默认情况下，Tomcat 最大等待数为 100 个。

# **3.同时处理请求数**

所以得出结论：**默认情况下 Spring Boot 能够同时处理的请求数=最大连接数（8192）+最大等待数（100），结果为 8292 个。**

当然，这两个值是可以在 Spring Boot 配置文件中修改的，如下配置所示：

```yaml
server:
  tomcat:
    max-connections: 2000 # 最大连接数
    accept-count: 200 # 最大等待数
```

# **4.扩展知识：设置Web容器**

Spring Boot 框架如何设置 Web 容器为 Jetty 或 Undertow 呢？接下来，我们来看一下。

## **4.1 设置容器为Jetty**

**要设置 Spring Boot 框架的 Web 容器为 Jetty，只需要修改 pom.xml 文件即可**，如下配置所示：

```xml
<dependencies>
    <!-- Spring Boot Starter Web 但排除Tomcat -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- 排除Tomcat -->
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <!-- 添加Jetty起步依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jetty</artifactId>
    </dependency>
</dependencies>
```

也就是说，只需要将默认的 tomcat 排除掉，添加 jetty 的依赖即可。

## **4.2 设置容器为Undertow**

要设置 Spring Boot 框架的 Web 容器为 Undertow 的思路和上面 Jetty 的实现思路相同，只需要修改 pom.xml 文件即可，如下配置所示：

```xml
<dependencies>
    <!-- Spring Boot Starter Web 但排除Tomcat -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-tomcat</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <!-- 添加Undertow起步依赖 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-undertow</artifactId>
    </dependency>
</dependencies>
```



[文章来源](https://mp.weixin.qq.com/s?__biz=MzU1NTkwODE4Mw==&mid=2247507166&idx=1&sn=900ab248dcecbd1314f6683c00826eb8&chksm=fa6f20e84016d3fe241ff6bb229c6a654666cd77c1e57422738b4e5174e4073dce778e64a4dd&scene=132&exptype=timeline_recommend_article_extendread_extendread_interest&show_related_article=1&subscene=132&scene=132#wechat_redirect)