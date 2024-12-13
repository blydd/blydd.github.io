title: WebSocket
date: 2024-04-26 12:10:17
categories: java
toc: true
description: 
tags: 
	- springboot
	- WebSocket

---



# 一、为什么需要 WebSocket？



 **HTTP 协议有一个缺陷：通信只能由客户端发起。**

举例来说，我们想了解今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。

**这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。**我们只能使用"轮询"：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。

轮询的效率低，非常浪费资源.

# 二、简介

WebSocket 协议在2008年诞生，2011年成为国际标准。**所有浏览器都已经支持了**。

它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404261340474.png)

其他特点包括：

（1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。**默认端口也是80和443**，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是`ws`（如果加密，则为`wss`），服务器网址就是 URL。

​		`ws://example.com:80/some/path`

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404261342358.jpg)

# 三、客户端的简单示例

WebSocket 的用法相当简单。

下面是一个网页脚本的例子（点击[这里](https://jsbin.com/muqamiqimu/edit?js,console)看运行结果），基本上一眼就能明白。

```javascript
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};     
```

# 四、客户端的 API

WebSocket 客户端的 API 如下。

## 4.1 WebSocket 构造函数

WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。

```javascript
var ws = new WebSocket('ws://localhost:8080');
```


执行上面语句之后，客户端就会与服务器进行连接。

实例对象的所有属性和方法清单，参见[这里](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)。

## 4.2 webSocket.readyState

`readyState`属性返回实例对象的当前状态，共有四种。

- `CONNECTING`：值为0，表示正在连接。
- `OPEN`：值为1，表示连接成功，可以通信了。
- `CLOSING`：值为2，表示连接正在关闭。
- `CLOSED`：值为3，表示连接已经关闭，或者打开连接失败。

下面是一个示例。

```javascript
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```

## 4.3 webSocket.onopen

**实例对象的`onopen`属性，用于指定连接成功后的回调函数。**

```javascript
ws.onopen = function () {
  ws.send('Hello Server!');
}
```


如果要指定多个回调函数，可以使用`addEventListener`方法。

```javascript
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```

## 4.4 webSocket.onclose

**实例对象的`onclose`属性，用于指定连接关闭后的回调函数。**

```javascript
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
```

## 4.5 webSocket.onmessage

**实例对象的`onmessage`属性，用于指定收到服务器数据后的回调函数。**

```javascript
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};

ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```

注意，服务器数据可能是文本，也可能是二进制数据（`blob`对象或`Arraybuffer`对象）。

```javascript
ws.onmessage = function(event){
  if(typeof event.data === String) {
    console.log("Received data string");
  }

  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```

除了动态判断收到的数据类型，也可以使用`binaryType`属性，显式指定收到的二进制数据类型。

```javascript
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```

## 4.6 webSocket.send()

**实例对象的`send()`方法用于向服务器发送数据。**

发送文本的例子。

```javascript
ws.send('your message');
```


发送 `Blob` 对象的例子。

```javascript
var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);
```


发送 `ArrayBuffer` 对象的例子。

```javascript
// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```

## 4.7 webSocket.bufferedAmount

**实例对象的`bufferedAmount`属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。**

```javascript
var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```

## 4.8 webSocket.onerror

**实例对象的`onerror`属性，用于指定报错时的回调函数。**

```javascript
socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener("error", function(event) {
  // handle error event
});
```

# 五、服务端的实现

`WebSocket` 服务器的实现，可以查看维基百科的[列表](https://en.wikipedia.org/wiki/Comparison_of_WebSocket_implementations)。

常用的 `Node` 实现有以下三种。

- [µWebSockets](https://github.com/uWebSockets/uWebSockets)
- [Socket.IO](http://socket.io/)
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)

具体的用法请查看它们的文档，这里不详细介绍了。

# 六、WebSocketd

下面，我要推荐一款非常特别的 `WebSocket` 服务器：[`Websocketd`](http://websocketd.com/)。

它的最大特点，就是后台脚本不限语言，标准输入（`stdin`）就是 `WebSocket` 的输入，标准输出（`stdout`）就是 `WebSocket` 的输出。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404261358467.png)

举例来说，下面是一个 Bash 脚本counter.sh。

```bash
#!/bin/bash

echo 1
sleep 1

echo 2
sleep 1

echo 3
```

命令行下运行这个脚本，会输出1、2、3，每个值之间间隔1秒。

```shell
$ bash ./counter.sh
1
2
3
```


现在，启动`websocketd`，指定这个脚本作为服务。

```shell
$ websocketd --port=8080 bash ./counter.sh
```


上面的命令会启动一个 `WebSocket` 服务器，端口是`8080`。每当客户端连接这个服务器，就会执行counter.sh脚本，并将它的输出推送给客户端。

```javascript
var ws = new WebSocket('ws://localhost:8080/');

ws.onmessage = function(event) {
  console.log(event.data);
};
```

上面是客户端的 `JavaScript` 代码，运行之后会在控制台依次输出1、2、3。

有了它，就可以很方便地将命令行的输出，发给浏览器。

```shell
$ websocketd --port=8080 ls
```

上面的命令会执行`ls`命令，从而将当前目录的内容，发给浏览器。使用这种方式实时监控服务器，简直是轻而易举（[代码](https://github.com/joewalnes/web-vmstats)）。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404261402751.jpg)



更多的用法可以参考[官方示例](https://github.com/joewalnes/websocketd/tree/master/examples/bash)。

- [Bash 脚本读取客户端输入的例子](https://github.com/joewalnes/websocketd/blob/master/examples/bash/greeter.sh)
- [五行代码实现一个最简单的聊天服务器](https://github.com/joewalnes/websocketd/blob/master/examples/bash/chat.sh)

​		

```bash
#!/bin/bash

# Copyright 2013 Jeroen Janssens
# All rights reserved.
# Use of this source code is governed by a BSD-style
# license that can be found in the LICENSE file.

# Run a simple chat server: websocketd --devconsole --port 8080 ./chat.sh
#
# Please note that this example requires GNU tail, which is not the default
# tail on OS X. Even though this script properly escapes the variables,
# please keep in mind that it is in general a bad idea to read
# untrusted data into variables and pass this onto the command line.

echo "Please enter your name:"; read USER
echo "[$(date)] ${USER} joined the chat" >> chat.log
echo "[$(date)] Welcome to the chat ${USER}!"
tail -n 0 -f chat.log --pid=$$ | grep --line-buffered -v "] ${USER}>" &
while read MSG; do echo "[$(date)] ${USER}> ${MSG}" >> chat.log; done
```

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404261404631.png)


websocketd 的实质，就是命令行的 WebSocket 代理。只要命令行可以执行的程序，都可以通过它与浏览器进行 WebSocket 通信。下面是一个 Node 实现的回声服务[greeter.js](https://github.com/joewalnes/websocketd/blob/master/examples/nodejs/greeter.js)。

```javascript
process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write('data: ' + chunk);
  }
});
```

启动这个脚本的命令如下。

```shell
$ websocketd --port=8080 node ./greeter.js
```


官方仓库还有其他[各种语言](https://github.com/joewalnes/websocketd/tree/master/examples)的例子。

# 七、GoEasy WebSocket 消息推送服务

大家看了前面的介绍，可能已经发现了，`WebSocket` 的使用有一个前提条件，就是要自己搭建一个服务。

但是很多时候，它只是一个前后端消息的中介，没有其他功能。单独搭一个服务似乎有点麻烦，尤其是在你的应用并不大的情况下。

很多开发者都希望，直接使用现成的 `WebSocket` 服务，免得自己搭建，最好还是免费的。

下面就介绍一个国内这样的 `WebSocket` [服务商 `GoEasy`](https://www.goeasy.io/cn/websocket.html?s=ryf)。你不需要自己搭建了，前后端接入他们的服务器就可以了，他们的机器都在国内，速度和可靠性有保证。

![img](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404261406683.webp)

示例代码可以[参考文档](https://docs.goeasy.io/2.x/pubsub/get-start?s=ryf)，只要几行，就能立刻使用 WebSocket 了。

服务端使用 `PHP`、`C#`、`Java`、`Go`、`Node`、`Python` 等各种语言，都没有问题。客户端支持 `Uniapp`、各种小程序、`Web` 等不同应用和 `Vue`、`React`、`Taro` 等主流框架。

GoEasy 2015年就上线了，有很多大企业客户，做到了百万级用户同时在线，每秒千万级消息的实时送达。他们保证消息数据全程加密传输，高并发、低延时，99.95%的高可用。

只要你的 `DAU`（日活跃用户数）不超过`200`，他们的服务是永久免费的，对于个人的小型应用应该够用了。企业的商业项目需要付费，还提供私有部署。

# 八、参考链接

[How to Use WebSockets](http://cjihrig.com/blog/how-to-use-websockets/)
[WebSockets - Send & Receive Messages](https://www.tutorialspoint.com/websockets/websockets_send_receive_messages.htm)
[Introducing WebSockets: Bringing Sockets to the Web](https://www.html5rocks.com/en/tutorials/websockets/basics/)

# 九、 Spring Boot中实现WebSocket

## 依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.5.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>cc.mrbird</groupId>
    <artifactId>spring-boot-websocket-socketjs</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>spring-boot-websocket-socketjs</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

## 构建服务端

在cc.mrbird.socket目录下新建handler包，然后在该包下新建`MyStringWebSocketHandler`继承`TextWebSocketHandler`：

```java
package com.test.ws;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@Slf4j
public class MyStringWebSocketHandler extends TextWebSocketHandler {


    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("建立连接成功");
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        session.close(CloseStatus.SERVER_ERROR);
        log.error("连接异常", exception);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        log.info("断开连接");
    }

    /**
     * 处理客户端发来的消息
     * @param session
     * @param message
     * @throws Exception
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String receiveMessage = message.getPayload();
        log.info("客户端发送过来的消息:"+receiveMessage);
        // 发送消息给客户端
        session.sendMessage(new TextMessage(fakeAi(receiveMessage)));
        // 关闭连接
        // session.close(CloseStatus.NORMAL);
    }

    private static String fakeAi(String input) {
        if (input == null || "".equals(input)) {
            return "说句话啊?";
        }
        return input.replace('你', '我')
                .replace("吗", "")
                .replace('?', '!')
                .replace('？', '！');
    }
}
```



该类重写了父类`AbstractWebSocketHandler`的四个方法：

![QQ20200316-185332@2x](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404261443865.png)

- afterConnectionEstablished，和客户端链接成功的时候触发该方法；
- handleTransportError，和客户端连接失败的时候触发该方法；
- afterConnectionClosed，和客户端断开连接的时候触发该方法；
- handleTextMessage，和客户端建立连接后，处理客户端发送的请求。

`WebSocketSession`对象代表每个客户端会话，包含许多实用方法：

![QQ20200316-185851@2x](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404261443263.png)

此外，因为我们的目的是实现和客户端的通信，并且内容为文本内容，所以我们继承的是`TextWebSocketHandler`；如果传输的是二进制内容，则可以继承`BinaryWebSocketHandler`，更多信息可以自行查看`WebSocketHandler`的子类。

接着在cc.mrbird.socket目录下新建configure包，然后在该包下新建`WebSocketServerConfigure`配置类：

```java
package com.test.ws;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketServerConfigure implements WebSocketConfigurer {

    /**
     * 注入自定定义的消息处理Handler
     */
    @Autowired
    private MyStringWebSocketHandler myStringWebSocketHandler;

    /**
     * 注册消息处理handler,并和发送消息url:/connect绑定
     * @param registry
     */
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myStringWebSocketHandler, "/connect").withSockJS();
    }
}
```



`@EnableWebSocket`用于开启`WebSocket`相关功能，我们注入了上面创建的`MyStringWebSocketHandler`，并将其注册到了`WebSocketHandlerRegistry`。

上面代码的含义是，当客户端通过`/connect`url和服务端连接通信时，使用`MyStringWebSocketHandler`处理会话。`withSockJS`的含义是，通信的客户端是通过`SockJS`实现的，下面会介绍到。

## 构建客户端

[SockJS](https://github.com/sockjs/sockjs-client)是一个JS插件，用于构建`WebSocket`，兼容性好。

在resources目录下新建static包，然后在该包下新建client.html：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebSocket客户端</title>
    <script src="https://cdn.bootcss.com/sockjs-client/0.3.4/sockjs.min.js"></script>
    <link href="https://cdn.bootcss.com/twitter-bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<style>
    .jumbotron {
        width: 100%;
    }

    #text {
        height: 3rem;
        font-size: 1rem;
        line-height: 3rem;
        margin: 1rem;
    }

    .btn {
        margin-right: 5px;
    }

    #connect {
        margin-left: 1rem;
    }

    #log {
        margin: 1rem 0 0 1rem;
    }

</style>
<div class="container">
    <div class="row">
        <div class="jumbotron">
            <input type="text" placeholder="请输入你想传输的内容" id="text" class="col-lg-12"/>
            <input type="button" value="连接" class="btn btn-info" id="connect" onclick="connect()"/>
            <input type="button" value="发送" class="btn btn-success" id="sent" disabled="disabled" onclick="sent()"/>
            <input type="button" value="断开" class="btn btn-danger" id="disconnect" disabled="disabled"
                   onclick="disconnect()"/>

            <div id="log">
                <p>聊天记录:</p>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    let text = document.querySelector('#text');
    let connectBtn = document.querySelector("#connect");
    let sentBtn = document.querySelector("#sent");
    let disconnectBtn = document.querySelector("#disconnect");
    let logDiv = document.querySelector("#log");

    let ws = null;

    function connect() {
        let targetUri = "/connect";
        ws = new SockJS(targetUri);
        ws.onopen = function () {
            setConnected(true);
            log('和服务端连接成功！');
        };
        ws.onmessage = function (event) {
            log('服务端说：' + event.data);
        };
        ws.onclose = function () {
            setConnected(false);
            log('和服务端断开连接！')
        }
    }

    function sent() {
        if (ws != null) {
            ws.send(text.value);
            log('客户端说：' + text.value);
        } else {
            log('请先建立连接！')
        }
    }

    function disconnect() {
        if (ws != null) {
            ws.close();
            ws = null;
        }
        setConnected(false);
    }

    function log(value) {
        let content = document.createElement('p');
        content.innerHTML = value;
        logDiv.appendChild(content);
        text.value = '';
    }

    function setConnected(connected) {
        connectBtn.disabled = connected;
        disconnectBtn.disabled = !connected;
        sentBtn.disabled = !connected;
    }
</script>
</body>
</html>
```



html，css那些都不重要，重要的是我们引入了`SockJS`库。在`connect()`方法中，我们通过`new SockJS(/connect)`和上面的服务端建立了Socket通信。`SockJS`对象包含几个常用的实用方法：

- `onopen`，和服务端讲了连接后的回调方法；
- `onmessage`，服务端返回消息时的回调方法；
- `onclose`，和服务端断开连接的回调方法；
- `send`，发送消息给服务端；
- `close`，断开和服务端的连接。

上面的JS较为简单，其他逻辑自己看看吧。

## 通信测试

启动项目，浏览器访问：http://localhost:8080/client.html：

![QQ20200316-191957@2x](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404261443795.png)



文章来源 :

-   **[阮一峰的网络日志](https://www.ruanyifeng.com/blog/2017/05/websocket.html)**
-   **[MrBird](https://mrbird.cc/Spring-Boot%E6%95%B4%E5%90%88WebSocket.html)**

​		
