title:  springboot单元测试
date: 2020-12-02 22:56:17
categories: java
toc: true
description: springboot单元测试
tags: 
	- springboot
	- 单元测试


---

> SpringBoot提供了一些实用程序和注解，用来帮助我们测试应用程序，在SpringBoot中开启单元测试只需引入`spring-boot-starter-test`即可，其包含了一些主流的测试库。本文主要介绍基于Service和Controller的单元测试。

# 1、引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

运行Maven命令`dependency:tree`可看到其包含了以下依赖：

```shell
[INFO] +- org.springframework.boot:spring-boot-starter-test:jar:1.5.9.RELEASE:test
[INFO] |  +- org.springframework.boot:spring-boot-test:jar:1.5.9.RELEASE:test
[INFO] |  +- org.springframework.boot:spring-boot-test-autoconfigure:jar:1.5.9.RELEASE:test
[INFO] |  +- com.jayway.jsonpath:json-path:jar:2.2.0:test
[INFO] |  |  +- net.minidev:json-smart:jar:2.2.1:test
[INFO] |  |  |  \- net.minidev:accessors-smart:jar:1.1:test
[INFO] |  |  |     \- org.ow2.asm:asm:jar:5.0.3:test
[INFO] |  |  \- org.slf4j:slf4j-api:jar:1.7.25:compile
[INFO] |  +- junit:junit:jar:4.12:test
[INFO] |  +- org.assertj:assertj-core:jar:2.6.0:test
[INFO] |  +- org.mockito:mockito-core:jar:1.10.19:test
[INFO] |  |  \- org.objenesis:objenesis:jar:2.1:test
[INFO] |  +- org.hamcrest:hamcrest-core:jar:1.3:test
[INFO] |  +- org.hamcrest:hamcrest-library:jar:1.3:test
[INFO] |  +- org.skyscreamer:jsonassert:jar:1.4.0:test
[INFO] |  |  \- com.vaadin.external.google:android-json:jar:0.0.20131108.vaadin1:test
[INFO] |  +- org.springframework:spring-core:jar:4.3.13.RELEASE:compile
[INFO] |  \- org.springframework:spring-test:jar:4.3.13.RELEASE:test
```



- JUnit，标准的单元测试Java应用程序；
- Spring Test & Spring Boot Test，对Spring Boot应用程序的单元测试提供支持；
- Mockito, Java mocking框架，用于模拟任何Spring管理的Bean，比如在单元测试中模拟一个第三方系统Service接口返回的数据，而不会去真正调用第三方系统；
- AssertJ，一个流畅的assertion库，同时也提供了更多的期望值与测试返回值的比较方式；
- Hamcrest，库的匹配对象（也称为约束或谓词）；
- JsonPath，提供类似XPath那样的符号来获取JSON数据片段；
- JSONassert，对JSON对象或者JSON字符串断言的库。

一个标准的Spring Boot测试单元应有如下的代码结构：

```java
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationTest {
	
}
```



# 2、知识准备

## 2.1.JUnit4注解

JUnit4中包含了几个比较重要的注解：`@BeforeClass`、`@AfterClass`、`@Before`、`@After`和`@Test`。

**`@BeforeClass`和`@AfterClass`在每个类加载的开始和结束时运行，必须为静态方法；**

**`@Before`和`@After`则在每个测试方法开始之前和结束之后运行。**

见如下例子：

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestApplicationTests {

    @BeforeClass
    public static void beforeClassTest() {
        System.out.println("before class test");
    }
    @Before
    public void beforeTest() {
        System.out.println("before test");
    }
    @Test
    public void Test1() {
        System.out.println("test 1+1=2");
        Assert.assertEquals(2, 1 + 1);
    }
    @Test
    public void Test2() {
        System.out.println("test 2+2=4");
        Assert.assertEquals(4, 2 + 2);
    }
    @After
    public void afterTest() {
        System.out.println("after test");
    }
    @AfterClass
    public static void afterClassTest() {
        System.out.println("after class test");
    }
}
```



运行输出如下：

```shell
...
before class test
before test
test 1+1=2
after test
before test
test 2+2=4
after test
after class test
...
```

从上面的输出可以看出各个注解的运行时机。

## 2.2.Assert

上面代码中，我们使用了Assert类提供的assert口方法，下面列出了一些常用的assert方法：

- `assertEquals("message",A,B)`，判断A对象和B对象是否相等，这个判断在比较两个对象时调用了`equals()`方法。
- `assertSame("message",A,B)`，判断A对象与B对象是否相同，使用的是`==`操作符。
- `assertTrue("message",A)`，判断A条件是否为真。
- `assertFalse("message",A)`，判断A条件是否不为真。
- `assertNotNull("message",A)`，判断A对象是否不为`null`。
- `assertArrayEquals("message",A,B)`，判断A数组与B数组是否相等。


## 2.3.MockMvc

下文中，对Controller的测试需要用到MockMvc技术。MockMvc，从字面上来看指的是模拟的MVC，即其可以模拟一个MVC环境，向Controller发送请求然后得到响应。

在单元测试中，使用MockMvc前需要进行初始化，如下所示：

```java
private MockMvc mockMvc;

@Autowired
private WebApplicationContext wac;

@Before
public void setupMockMvc(){
    mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
}
```



### 2.3.1 MockMvc模拟MVC请求

**模拟一个get请求：**

```java
mockMvc.perform(MockMvcRequestBuilders.get("/hello?name={name}","mrbird"));
```



**模拟一个post请求**：

```java
mockMvc.perform(MockMvcRequestBuilders.post("/user/{id}", 1));
```



**模拟文件上传：**

```java
mockMvc.perform(MockMvcRequestBuilders.fileUpload("/fileupload").file("file", "文件内容".getBytes("utf-8")));
```



**模拟请求参数：**

```java
// 模拟发送一个message参数，值为hello
mockMvc.perform(MockMvcRequestBuilders.get("/hello").param("message", "hello"));
// 模拟提交一个checkbox值，name为hobby，值为sleep和eat
mockMvc.perform(MockMvcRequestBuilders.get("/saveHobby").param("hobby", "sleep", "eat"));
```



**也可以直接使用`MultiValueMap`构建参数：**

```java
MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
params.add("name", "mrbird");
params.add("hobby", "sleep");
params.add("hobby", "eat");
mockMvc.perform(MockMvcRequestBuilders.get("/hobby/save").params(params));
```



**模拟发送JSON参数：**

```java
String jsonStr = "{\"username\":\"Dopa\",\"passwd\":\"ac3af72d9f95161a502fd326865c2f15\",\"status\":\"1\"}";
mockMvc.perform(MockMvcRequestBuilders.post("/user/save").content(jsonStr.getBytes()));
```



实际测试中，要手动编写这么长的JSON格式字符串很繁琐也很容易出错，可以借助Spring Boot自带的Jackson技术来序列化一个Java对象（可参考[Spring Boot中的JSON技术](https://mrbird.cc/Spring-Boot中的JSON技术.html)），如下所示：

```java
User user = new User();
user.setUsername("Dopa");
user.setPasswd("ac3af72d9f95161a502fd326865c2f15");
user.setStatus("1");

String userJson = mapper.writeValueAsString(user);
mockMvc.perform(MockMvcRequestBuilders.post("/user/save").content(userJson.getBytes()));
```



其中，mapper为`com.fasterxml.jackson.databind.ObjectMapper`对象。

**模拟Session和Cookie：**

```java
mockMvc.perform(MockMvcRequestBuilders.get("/index").sessionAttr(name, value));
mockMvc.perform(MockMvcRequestBuilders.get("/index").cookie(new Cookie(name, value)));
```



**设置请求的Content-Type：**

```java
mockMvc.perform(MockMvcRequestBuilders.get("/index").contentType(MediaType.APPLICATION_JSON_UTF8));
```



**设置返回格式为JSON：**

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}", 1).accept(MediaType.APPLICATION_JSON));
```



**模拟HTTP请求头：**

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}", 1).header(name, values));
```



### 2.**3.2MockMvc处理返回结果**

期望成功调用，即HTTP Status为200：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}", 1))
    .andExpect(MockMvcResultMatchers.status().isOk());
```



期望返回内容是`application/json`：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}", 1))
    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
```



检查返回JSON数据中某个值的内容：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}", 1))
    .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("mrbird"));
```



这里使用到了`jsonPath`，`$`代表了JSON的根节点。更多关于`jsonPath`的介绍可参考 https://github.com/json-path/JsonPath。

判断Controller方法是否返回某视图：

```java
mockMvc.perform(MockMvcRequestBuilders.post("/index"))
    .andExpect(MockMvcResultMatchers.view().name("index.html"));
```



比较Model：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/user/{id}", 1))
    .andExpect(MockMvcResultMatchers.model().size(1))
    .andExpect(MockMvcResultMatchers.model().attributeExists("password"))
    .andExpect(MockMvcResultMatchers.model().attribute("username", "mrbird"));
```



比较forward或者redirect：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/index"))
    .andExpect(MockMvcResultMatchers.forwardedUrl("index.html"));
// 或者
mockMvc.perform(MockMvcRequestBuilders.get("/index"))
    .andExpect(MockMvcResultMatchers.redirectedUrl("index.html"));
```



比较返回内容，使用`content()`：

```java
// 返回内容为hello
mockMvc.perform(MockMvcRequestBuilders.get("/index"))
    .andExpect(MockMvcResultMatchers.content().string("hello"));

// 返回内容是XML，并且与xmlCotent一样
mockMvc.perform(MockMvcRequestBuilders.get("/index"))
    .andExpect(MockMvcResultMatchers.content().xml(xmlContent));

// 返回内容是JSON ，并且与jsonContent一样
mockMvc.perform(MockMvcRequestBuilders.get("/index"))
    .andExpect(MockMvcResultMatchers.content().json(jsonContent));
```



输出响应结果：

```java
mockMvc.perform(MockMvcRequestBuilders.get("/index"))
    .andDo(MockMvcResultHandlers.print());
```



# 3、 测试Service

现有如下Service：

```java
@Repository("userService")
public class UserServiceImpl extends BaseService<User> implements UserService {

    @Override
    public User findByName(String userName) {
        Example example = new Example(User.class);
        example.createCriteria().andCondition("username=", userName);
        List<User> userList = this.selectByExample(example);
        if (userList.size() != 0)
            return userList.get(0);
        else
            return null;
    }
}
```



编写一个该Service的单元测试，测试`findByName`方法是否有效：

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {

    @Autowired
    UserService userService;

    @Test
    public void test() {
        User user = this.userService.findByName("scott");
        Assert.assertEquals("用户名为scott", "scott", user.getUsername());
    }
}
```



运行后，JUnit没有报错说明测试通过，即`UserService`的`findByName`方法可行。


此外，和在Controller中引用Service相比，**在测试单元中对Service测试完毕后，数据能自动回滚，只需要在测试方法上加上`@Transactional`注解**，比如:

```java
@Test
@Transactional
public void test() {
    User user = new User();
    user.setId(this.userService.getSequence("seq_user"));
    user.setUsername("JUnit");
    user.setPasswd("123456");
    user.setStatus("1");
    user.setCreateTime(new Date());
    this.userService.save(user);
}
```



运行，测试通过，查看数据库发现数据并没有被插入，这样很好的**避免了不必要的数据污染**。

# 4、 测试Controller

现有如下Controller：

```java
@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("user/{userName}")
    public User getUserByName(@PathVariable(value = "userName") String userName) {
        return this.userService.findByName(userName);
    }

    @PostMapping("user/save")
    public void saveUser(@RequestBody User user) {
        this.userService.saveUser(user);
    }
}
```



现在编写一个针对于该Controller`getUserByName(@PathVariable(value = "userName") String userName)`方法的测试类：

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    private MockMvc mockMvc;
    
    @Autowired
    private WebApplicationContext wac;
    
    @Before
    public void setupMockMvc(){
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }
    
    @Test
    public void test() throws Exception {
        mockMvc.perform(
            MockMvcRequestBuilders.get("/user/{userName}", "scott")
            .contentType(MediaType.APPLICATION_JSON_UTF8))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("scott"))
        .andDo(MockMvcResultHandlers.print());
    }
}
```



运行后，JUnit通过，控制台输出过程如下所示：

```shell
MockHttpServletRequest:
      HTTP Method = GET
      Request URI = /user/scott
       Parameters = {}
          Headers = {Content-Type=[application/json;charset=UTF-8]}

Handler:
             Type = demo.springboot.test.controller.UserController
           Method = public demo.springboot.test.domain.User demo.springboot.test.controller.UserController.getUserByName(java.lang.String)

Async:
    Async started = false
     Async result = null

Resolved Exception:
             Type = null

ModelAndView:
        View name = null
             View = null
            Model = null

FlashMap:
       Attributes = null

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = {Content-Type=[application/json;charset=UTF-8]}
     Content type = application/json;charset=UTF-8
             Body = {"id":23,"username":"scott","passwd":"ac3af72d9f95161a502fd326865c2f15","createTime":1514535399000,"status":"1"}
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```



继续编写一个针对于该Controller`saveUser(@RequestBody User user)`方法的测试类：

```java
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

    private MockMvc mockMvc;
    
    @Autowired
    private WebApplicationContext wac;
    
    @Autowired
    ObjectMapper mapper;
    
    
    @Before
    public void setupMockMvc(){
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }
	
    @Test
    @Transactional
    public void test() throws Exception {
        User user = new User();
        user.setUsername("Dopa");
        user.setPasswd("ac3af72d9f95161a502fd326865c2f15");
        user.setStatus("1");
        
        String userJson = mapper.writeValueAsString(user);
        mockMvc.perform(
            MockMvcRequestBuilders.post("/user/save")
            .contentType(MediaType.APPLICATION_JSON_UTF8)
            .content(userJson.getBytes()))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(MockMvcResultHandlers.print());
    }
}
```



运行过程如下所示：

```shell
MockHttpServletRequest:
      HTTP Method = POST
      Request URI = /user/save
       Parameters = {}
          Headers = {Content-Type=[application/json;charset=UTF-8]}

Handler:
             Type = demo.springboot.test.controller.UserController
           Method = public void demo.springboot.test.controller.UserController.saveUser(demo.springboot.test.domain.User)

Async:
    Async started = false
     Async result = null

Resolved Exception:
             Type = null

ModelAndView:
        View name = null
             View = null
            Model = null

FlashMap:
       Attributes = null

MockHttpServletResponse:
           Status = 200
    Error message = null
          Headers = {}
     Content type = null
             Body = 
    Forwarded URL = null
   Redirected URL = null
          Cookies = []
```



值得注意的是，在一个完整的系统中编写测试单元时，可能需要模拟一个登录用户信息Session，MockMvc也提供了解决方案，可在初始化的时候模拟一个HttpSession：

```java
private MockMvc mockMvc;
private MockHttpSession session;

@Autowired
private WebApplicationContext wac;

@Before
public void setupMockMvc(){
    mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    session = new MockHttpSession();
    User user =new User();
    user.setUsername("Dopa");
    user.setPasswd("ac3af72d9f95161a502fd326865c2f15");
    session.setAttribute("user", user); 
}
```



源码链接：https://github.com/wuyouzhuguli/Spring-Boot-Demos/tree/master/19.Spring-Boot-Testing

From: [MyBird][1]


[1]: https://mrbird.cc/Spring-Boot%20TESTing.html