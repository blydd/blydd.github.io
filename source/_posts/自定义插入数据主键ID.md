title: mybatis自定义插入主键
date: 2020-12-04 10:10:17
categories: java
description: mybatis自定义插入主键
tags: 
	- java
	- mybatis
	- sql

	
---


> **Order这个属性设为after,before这个执行顺序都是相对于下面的insert into这个sql的;
Order设为before:那么就先执行selectkey这个标签的sgl,再将这条sql生成的uuid set到User里面去,然后再执行insert into将这个已经带uuid为id的这个User insert到数据库中.**

```xml
<!--自增主键之UUID-->
<insert id="insertUser" parameterType="com.test.mybatis.po.User">
  <!--只要不是自增主键,那么order都设置为before-->
  <selectkey keyProperty="id" resultrype="string" order="BEFORE">
  	SELECT UUID()
  </selectkey>
  INSERT INTO USER (ID,USERNAME,BIRTHDAY,SEX,ADDRESS)
  VALUES (#{id},#{username},#{birthday},#{sex},#{address})
</insert>
```