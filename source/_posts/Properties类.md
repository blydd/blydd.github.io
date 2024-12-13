title: Properties 类
date: 2021-02-25 22:23:17
categories: java
toc: true
description: Properties 类的简介,及使用场景.
tags: 

  - Properties
  - 数据结构

---

> **Properties 继承于 Hashtable。表示一个持久的属性集.属性列表中每个键及其对应值都是一个字符串。**
>
> Properties 类被许多 Java 类使用。例如，在获取环境变量时它就作为 System.getProperties() 方法的返回值。

# 1.定义方法

| **String getProperty(String key)**                         | 用指定的键在此属性列表中搜索属性。                           |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| **String getProperty(String key, String defaultProperty)** | 用指定的键在属性列表中搜索属性。若不存在则返回defaultProperty |
| **void list(PrintStream streamOut)**                       | 将属性列表输出到指定的输出流。                               |
| **void list(PrintWriter streamOut)**                       | 将属性列表输出到指定的输出流。                               |
| **void load(InputStream streamIn) throws IOException**     | 从输入流中读取属性列表（键和元素对）。                       |
| **Enumeration propertyNames( )**                           | 按简单的面向行的格式从输入字符流中读取属性列表（键和元素对）。 |
| **Object setProperty(String key, String value)**           | 添加属性键值对                                               |
| **void store(OutputStream streamOut, String description)** | 以适合使用 load(InputStream)方法加载到 Properties 表中的格式，将此 Properties 表中的属性列表（键和元素对）写入输出流。 |

# 2.简单实例

```java
import java.util.*;
 
public class PropDemo {
 
   public static void main(String args[]) {
      Properties capitals = new Properties();
      Set states;
      String str;
      
      capitals.put("Illinois", "Springfield");
      capitals.put("Missouri", "Jefferson City");
      capitals.put("Washington", "Olympia");
      capitals.put("California", "Sacramento");
      capitals.put("Indiana", "Indianapolis");
 
      // Show all states and capitals in hashtable.
      states = capitals.keySet(); // get set-view of keys
      Iterator itr = states.iterator();
      while(itr.hasNext()) {
         str = (String) itr.next();
         System.out.println("The capital of " +
            str + " is " + capitals.getProperty(str) + ".");
      }
      System.out.println();
 
      // look for state not in list -- specify default
      str = capitals.getProperty("Florida", "Not Found");
      System.out.println("The capital of Florida is "
          + str + ".");
   }
}

```

# 3.写入

> Properties类调用setProperty方法将键值对**保存到内存**中，此时可以通过getProperty方法读取，propertyNames方法进行遍历，但是并没有将键值对持久化到属性文件中，故**需要调用store方法持久化键值对到属性文件中**。

```java
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.Properties;

public class TestProperties {
	public void writeProperties() {
		Properties properties = new Properties();
		OutputStream output = null;
		try {
			output = new FileOutputStream("config.properties");
			properties.setProperty("url", "jdbc:mysql://localhost:3306/");
			properties.setProperty("username", "root");
			properties.setProperty("password", "root");
			properties.setProperty("databases", "music_player");
			properties.store(output, "Steven1997 modify" + new Date().toString());
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			if(output!=null) {
				try {
					output.close();
				}catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}
	public static void main(String[] args) {
		TestProperties t = new TestProperties();
		t.writeProperties();
	}
}

```

执行后，工程下面会出现一个config.properties文件，属性文件内容如下：

![image-20210225221111804](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404031632273.png)

# 4.读取

> 使用getProperty获取config.properties文件配置文件的各项属性。

```java
package property;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class LoadProperties {
	public void loadProperties() {
		Properties properties = new Properties();
		InputStream inputStream = null;
		
		try {
			inputStream = new FileInputStream("config.properties");
			properties.load(inputStream);
			System.out.println("url:" + properties.getProperty("url"));
			System.out.println("username:" + properties.getProperty("username"));
			System.out.println("password:" + properties.getProperty("password"));
			System.out.println("database:" + properties.getProperty("database"));
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			if(inputStream !=null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}
	public static void main(String[] args) {
		LoadProperties l = new LoadProperties();
		l.loadProperties();
	}
}
//运行后的结果
url:jdbc:mysql://localhost:3306/
username:root
password:root
database:music_player
```

# 5.遍历

> 遍历属性文件中的键值对

```java
package property;

import java.io.InputStream;
import java.util.Enumeration;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

public class PropertiesTest {
	public void printAll() {
		Properties prop = new Properties();
		InputStream input = null;
		try {
			String file = "config.properties";
			input = getClass().getClassLoader().getResourceAsStream(file);
			if(input == null) {
				System.out.println("无法加载文件" + file);
				return ;
			}
			prop.load(input);
			// 方法一
			Set<Object> keys = prop.keySet();
			for(Object key:keys) {
				System.out.println("key:" + key.toString() + "|" + "value:" + prop.get(key));
			}
			//方法二：
			Set<Entry<Object, Object>> entrys =	prop.entrySet();//返回的属性键值对实体
			for(Entry<Object, Object> entry:entrys){
				System.out.println("key:"+entry.getKey()+",value:"+entry.getValue());
			}
			//方法三：
			Enumeration<?> e = prop.propertyNames();
			while (e.hasMoreElements()) {
				String key = (String) e.nextElement();
				String value = prop.getProperty(key);
				System.out.println("Key:" + key + ",Value:" + value);
			}

		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			if(input != null) {
				try {
					input.close();
				}catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	public static void main(String[] args) {
		PropertiesTest p = new PropertiesTest();
		p.printAll();
	}
}

```

# 6.注意

> properties文件默认的编码格式居然是ISO-8859-1，这样导致往配置文件里面写入中文的时候转换成另一种格式的编码，需要把properties 文件的编码格式改为UTF-8，这样才会让配置文件保存中文数据的时候不会出现转码的问题