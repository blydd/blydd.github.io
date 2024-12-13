title: 获取httpServerletRequest工具类
date: 2020-12-04 10:10:17
categories: 工具类
description: 获取httpServerletRequest工具类
tags: 
	- httpServerletRequest

	- java
---






```java
package com.mmile.studysb.utils;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * 获取HttpServletRequest
 */
public class HttpContextUtils {
    public static HttpServletRequest getHttpServletRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }
}
```

