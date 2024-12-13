title: Spring中的InitializingBean的使用详解
date: 2024-4-9 10:10:17
categories: java
toc: true
description:
tags: 
   - InitializingBean
   - PostConstruct
   - 注解
   - spring
   - bean初始化

---

# 1.`InitializingBean`简介

`InitializingBean`是`Spring`提供的拓展性接口，`InitializingBean`接口为`bean`提供了属性初始化后的处理方法，它只有一个`afterPropertiesSet`方法，凡是继承该接口的类，在`bean`的属性初始化后都会执行该方法。

```java
package org.springframework.beans.factory;

public interface InitializingBean {
    void afterPropertiesSet() throws Exception;
}

```

**用法:**

```java
@Component
public class MyInitializingBean implements InitializingBean {
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("我是启动时加载...");
    }
}

```

![程序启动在日志中看到输出信息](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404091044647.png)

# 2.`@PostConstruct`简介

- **简介:**

​			该注解是`Java jdk`提供的注解，而不是`Spring`框架提供的.

​			JavaEE5引入了`@PostConstruct`和`@PreDestroy`两个作用于`Servlet`生命周期的注解，实现`Bean`初始化之前和销毁之前的自定义操作。 

​			官方文档：https://docs.oracle.com/javase/8/docs/api/javax/annotation/PostConstruct.html

- **该注解的方法在整个Bean初始化中的执行顺序：**

​			`Constructor`(构造方法) -> `@Autowired`(依赖注入) -> `@PostConstruct`(注释的初始化方法)

- **功能：**

  ​	当依赖注入完成后用于执行初始化的方法，并且**只会被执行一次**

  

- **`@PostConstruct`注释规则**

  1. 除了拦截器这个特殊情况以外，其他情况都不允许有参数，否则spring框架会报IllegalStateException；而且返回值要是void，但实际也可以有返回值，至少不会报错，只会忽略

  2. 方法随便用什么权限来修饰，public、protected、private都可以，反正功能是由反射来实现

  3. 方法不可以是static的，但可以是final的
  
  4. 文档中说一个类只能有一个方法加此注解，但实际测试中，我在一个类中多个方法加了此注解，并没有报错，而且都执行了，我用的是 Spring Boot 框架。


- **示例:**

```java
import javax.annotation.PostConstruct;
 
@Component
public class Utils {
    @Autowired
    private UserService userService;
    @PostConstruct
    void init() {
        userService.doSomething();  //userService注入后执行一些初始化操作
    }
}
```



# 3.`构造方法`、`@PostConstruct`、`afterPropertiesSet`、`bean初始化init方法`执行顺序。

```java
@Component
public class MyInitializingBean implements InitializingBean {

    public MyInitializingBean() {
        System.out.println("我是MyInitializingBean构造方法执行...");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("我是afterPropertiesSet方法执行...");
    }

    @PostConstruct
    public void postConstruct() {
        System.out.println("我是postConstruct方法执行...");
    }

    public void init(){
        System.out.println("我是init方法执行...");
    }

    @Bean(initMethod = "init")
    public MyInitializingBean test() {
        return new MyInitializingBean();
    }
}

```

![程序启动在日志中的输出信息](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404091047152.png)

**通过启动日志我们可以看出执行顺序优先级：<u>`构造方法` > `postConstruct` >`afterPropertiesSet` > `init方法`。</u>**

在Spring初始化bean的时候，如果该bean实现了InitializingBean接口，并且同时在配置了init-method，系统则是先调用afterPropertieSet()方法，然后再调用init-method中指定的方法。

# 4.总结：

1、`Spring`为`bean`提供了两种初始化`bean`的方式，实现`InitializingBean`接口重写`afterPropertiesSet`方法，或者在配置文件中通过`init-method`指定，两种方式可以同时使用。

2、实现`InitializingBean`接口是直接调用`afterPropertiesSet`方法，比通过反射调用`init-method`指定的方法效率要高一点，但是`init-method`方式消除了对`spring`的依赖。

3、如果调用afterPropertiesSet方法时出错，则不调用init-method指定的方法。









                            版权声明：本文为博主原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接和本声明。

原文链接：https://blog.csdn.net/TreeShu321/article/details/108180366

原文链接：https://blog.csdn.net/skh2015java/article/details/117751380