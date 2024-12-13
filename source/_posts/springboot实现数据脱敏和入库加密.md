title: springboot实现数据脱敏和入库加密
date: 2024-5-28 16:50:17
categories: java
toc: true
description: springboot实现数据脱敏和入库加密
tags: 

	- 脱敏
	- 加密


---



# 1.脱敏

[**文章来源**](https://blog.csdn.net/qq_62262918/article/details/136997946)

## 0.**实现思路**

1. 自定义一个脱敏注解用于标记需要脱敏的字段，并且在注解中指定脱敏策略属性。
2. 自定义脱敏策略枚举类，用于维护手机号、邮箱、身份证等信息的脱敏处理方式。
3. 自定义脱敏 JSON 序列化器，在该序列化器中找到带有该注解的字段，根据注解中指定的脱敏策略，在序列化过程中将数据进行脱敏处理并输出到 JSON 中。

## 1.1 自定义脱敏注解

```java
 
import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mijiu.commom.custom.serializable.DesensitizationJsonSerializable;
import com.mijiu.commom.enumerate.DesensitizationStrategyEnum;
 
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
 
/**
 * @author gun
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@JacksonAnnotationsInside
@JsonSerialize(using = DesensitizationJsonSerializable.class)
public @interface Desensitization {
    DesensitizationStrategyEnum desensitizationStrategy();//这是自定义的脱敏策略枚举类型，用于指定脱敏策略，获取对应脱敏处理方法
 
}
```

## 1.2 编写脱敏策略枚举类

> **脱敏的本质其实就是个字符串的替换，我们在脱敏策略枚举类中通过定义函数接口，维护多种类型脱敏策略对应的字符串替换方法。这样做可以保证可维护性可扩展性。**

```java
import lombok.Getter;
 
import java.util.function.Function;
 
 
/**
 * 脱敏策略枚举类，维护对不同类型信息的脱敏处理方式
 * @author gun
 */
@Getter
public enum DesensitizationStrategyEnum {
 
    // 手机号脱敏策略，保留前三位和后四位
    PHONE(s -> s.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2")),
 
    // 邮箱脱敏策略，保留邮箱用户名第一个字符和@符号前后部分
    EMAIL(s -> s.replaceAll("(\\w)[^@]*(@\\w+\\.\\w+)", "$1****$2")),
  
   // ****(邮箱) 脱敏策略，保留最后一个括号前面的内容和最后一个括号中邮箱用户名第一个字符和@符号后部分
    NAME_EMAIL(s -> {
        // 找到最后一个左括号和右括号的位置
        int lastLeftBracketIndex = s.lastIndexOf('(');
        int lastRightBracketIndex = s.lastIndexOf(')');
        if (lastLeftBracketIndex == -1 || lastRightBracketIndex == -1 || lastLeftBracketIndex > lastRightBracketIndex) {
            return s;
        }
        // 提取括号内的内容
        String email = s.substring(lastLeftBracketIndex + 1, lastRightBracketIndex);
        // 使用正则表达式匹配并脱敏邮箱
        Pattern emailPattern = Pattern.compile("(\\w)[^@]*(@\\w+\\.\\w+)");
        Matcher matcher = emailPattern.matcher(email);
        StringBuffer sb = new StringBuffer();
        while (matcher.find()) {
            matcher.appendReplacement(sb, matcher.group(1) + "****" + matcher.group(2));
        }
        matcher.appendTail(sb);
        // 用脱敏后的字符串替换原始字符串中的括号内容
        return s.substring(0, lastLeftBracketIndex + 1) + sb.toString() + s.substring(lastRightBracketIndex);
    }),
 
    // 身份证号脱敏策略，保留前四位和后四位
    ID_CARD(s -> s.replaceAll("(\\d{4})\\d{10}(\\w{4})", "$1*****$2")),
 
    // 地址脱敏策略，保留省市信息，其余部分脱敏为**
    ADDRESS(s -> s.replaceAll("([\\u4e00-\\u9fa5]{2})[\\u4e00-\\u9fa5]+", "$1**")),
 
    // 银行卡号脱敏策略，保留前四位和后三位
    BANK_CARD(s -> s.replaceAll("(\\d{4})\\d{8,12}(\\d{3})", "$1************$2")),
 
    // 姓名脱敏策略，保留姓氏第一个字符，其余部分脱敏为**
    NAME(s -> s.charAt(0) + "**"),
 
    // 密码脱敏策略，统一显示为******
    PASSWORD(s -> "******");
 
    private final Function<String, String> desensitization;
 
    DesensitizationStrategyEnum(Function<String, String> desensitization) {
        this.desensitization = desensitization;
    }
 
}
```

## 1.3 编写JSON序列化实现

> - 平时接口返回的数据结构直接都是交给默认的序列化器把对象转成json的。
> - 实现脱敏的本质就是在这前面添加了一段逻辑，找到带有脱敏注解的属性然后拿到注解指定的脱敏策略实例化这个脱敏策略枚举类，应用对应的脱敏方法处理需要脱敏字段，得到脱敏后的值交给json生成器得到最终脱敏后的json

```java
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.*;
 
import com.fasterxml.jackson.databind.ser.ContextualSerializer;
import com.test.annotation.Desensitization;
import com.test.enm.DesensitizationStrategyEnum;

import java.io.IOException;
import java.util.Objects;
 
/**
 * 自定义的脱敏JSON序列化器
 * @author gun
 */
public class DesensitizationJsonSerializable extends JsonSerializer<String> implements ContextualSerializer {
 
    private DesensitizationStrategyEnum desensitizationStrategy; // 脱敏策略
 
    @Override
    public void serialize(String s, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        // 将字符串按照设定的脱敏策略进行脱敏处理后序列化到 JSON 中
        jsonGenerator.writeString(desensitizationStrategy.getDesensitization().apply(s));
    }
 
    @Override
    public JsonSerializer<?> createContextual(SerializerProvider serializerProvider, BeanProperty beanProperty) throws JsonMappingException {
        // 获取属性上的 Desensitization 注解
        Desensitization annotation = beanProperty.getAnnotation(Desensitization.class);
 
        // 判断注解不为空且属性类型为 String
        if (Objects.nonNull(annotation) && Objects.equals(String.class, beanProperty.getType().getRawClass())) {
            this.desensitizationStrategy = annotation.strategy(); // 设置脱敏策略
            return this;
        }
 
        // 返回默认的序列化器
        return serializerProvider.findValueSerializer(beanProperty.getType(), beanProperty);
    }
}
```

## 1.4 返回类中加脱敏注解

```java
/**
 * @author gun
 */
@Data
@Builder
public class PersonalInfo {
 
    @Desensitization(desensitizationStrategy = DesensitizationStrategyEnum.PHONE)
    private String phone; // 手机号
 
    @Desensitization(desensitizationStrategy = DesensitizationStrategyEnum.EMAIL)
    private String email; // 邮箱
 
    @Desensitization(desensitizationStrategy = DesensitizationStrategyEnum.ID_CARD)
    private String idCard; // 身份证号
 
    @Desensitization(desensitizationStrategy = DesensitizationStrategyEnum.ADDRESS)
    private String address; // 地址
 
    @Desensitization(desensitizationStrategy = DesensitizationStrategyEnum.BANK_CARD)
    private String bankCard; // 银行卡号
 
    @Desensitization(desensitizationStrategy = DesensitizationStrategyEnum.NAME)
    private String name; // 姓名
 
    @Desensitization(desensitizationStrategy = DesensitizationStrategyEnum.PASSWORD)
    private String password; // 密码
 
}
```

# 2.入库加密

> 在`MyBatis-Plus`中实现数据入库加密，主要是利用`MyBatis`的`TypeHandler`接口来处理字段的加密解密逻辑。

## 2.1 **创建自定义TypeHandler**

```java
import com.test.common.service.KmsService;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * 数据类型转换处理器
 * 在需要转换(加密/解密)的字段注解`@TableField`中添加属性 `typeHandler = EncryptDecryptTypeHandler.class`
 * 同时类上注解`@TableName`添加属性`autoResultMap = true`,不然解密时不生效.
 */
@Component
public class EncryptDecryptTypeHandler implements TypeHandler<String> {

    @Resource
    private KmsService kmsService;

    @Override
    public void setParameter(PreparedStatement ps, int i, String parameter, JdbcType jdbcType) throws SQLException {
        // 在这里对parameter进行加密，并设置到PreparedStatement中
        String encryptedValue = doEncrypt(parameter);
        ps.setString(i, encryptedValue);
    }

    @Override
    public String getResult(ResultSet rs, String columnName) throws SQLException {
        // 从ResultSet中获取加密的值，并解密
        String encryptedValue = rs.getString(columnName);
        return doDecrypt(encryptedValue);
    }

    @Override
    public String getResult(ResultSet rs, int columnIndex) throws SQLException {
        // 同上，但使用索引访问列
        String encryptedValue = rs.getString(columnIndex);
        return doDecrypt(encryptedValue);
    }

    @Override
    public String getResult(CallableStatement cs, int columnIndex) throws SQLException {
        // 处理CallableStatement的情况
        String encryptedValue = cs.getString(columnIndex);
        return doDecrypt(encryptedValue);
    }

    /* 加密逻辑 */
    private String doEncrypt(String original) {
        String encStr = enc(original);//自定义加密逻辑
        return encStr;
    }

    /* 解密逻辑 */
    private String doDecrypt(String encrypted) {
      String decStr = dec(encrypted);//自定义解密逻辑
        return decStr;
    }
}
```

## 2.2 **配置TypeHandler**

- **在需要加密的实体类中`@TableName`属性添加`autoResultMap = true`,否则出库查询解密时不生效.**
- **在具体字段的`@TableField`中加属性`typeHandler = EncryptDecryptTypeHandler.class`**

```java

import com.baomidou.mybatisplus.annotation.*;
import com.test.annotation.Desensitization;
import com.test.converter.EncryptDecryptTypeHandler;
import com.test.enm.DesensitizationStrategyEnum;
import io.swagger.annotations.ApiModel;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 测试表
 *
 * @author gun
 * @TableName t_table_test
 */
@Data
@TableName(value = "t_table_test",autoResultMap = true)
public class BpmTodo implements Serializable {

    @Schema(description = "名字")
    @TableField(value = "name")
    private String name;

    @Schema(description = "邮箱")
  															//入库加密
    @TableField(value = "email",typeHandler = EncryptDecryptTypeHandler.class)
    private String email;

}


```

## 2.3 Q&A

如果**手写的查询sql**则需要指定 `resultMap`，并在对应列指定 `TypeHandler` 

```xml
<resultMap id="manager-map" type="com.entity.User">
  <result property="email" column="email" typeHandler="com.test.converter.EncryptDecryptTypeHandler"/>
</resultMap>


<select id="queryUsers" resultMap="manager-map">
	select * from user
</select>

```

如果**手写的增改sql**则需要对应列指定 `TypeHandler` 

```xml
insert into user
  (name, email)
values
							<!-- 入库加密 -->
  (#{name}, #{email,typeHandler=com.test.converter.EncryptDecryptTypeHandler}
```

```xml
update user set
    update_time = now()
    <if test="email != null and email != ''">
      	<!-- 入库加密 -->
       ,email = #{managerEmail,typeHandler=com.test.converter.EncryptDecryptTypeHandler}
    </if>
where id=#{id}
```

