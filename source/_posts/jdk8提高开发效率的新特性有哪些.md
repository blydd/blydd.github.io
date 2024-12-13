title: jdk8以上提高开发效率的新特性有哪些
date: 2024-4-8 15:56:17
categories: java
toc: true
description: jdk8以上提高开发效率的新特性有哪些
tags: 

	- jdk8新特性
	- java

---

# 1.接口的默认方法和静态方法

**众所周知，在接口中定义的普通方法都是抽象方法，方法前面默认都会添加public abstract，不能有方法实现，需要在接口的实现类中对方法进行具体实现。**

但是**Java8开始允许在接口中定义默认方法和静态方法**，对于这两种方法，可以直接在接口对其进行实现，无需再在接口实现类中进行实现。

- 默认方法：又叫扩展方法，在方法前面需通过`default`修饰,不能直接通过接口调用，必须通过接口实现类的实例对象进行方法调用
- 静态方法：又叫类方法，在方法前面需通过`static`修饰。可以直接通过接口调用。



**普通方法必须实现，默认方法可以选择性重写，静态方法无法重写。**

# 2.lambda表达式

> **Lambda表达式是Java8非常重要的一个新特性,其基于函数式编程的思想,支持将代码作为方法参数进行使用**。可以把Lambda表达式理解为通过一种更加简洁的方式表示可传递的匿名函数。
> 它本身没有名称,而且不像方法那样属于某一个类,但是可以有参数列表、代码体、返回值。使用了Lambda表达式之后就不需要再去编写匿名类了。

## 2.1基础格式:

```java
(参数列表) ‐> {
	方法体
}
//没有参数的Lambda表达式
()‐>new Student();
//只有一个参数的Lambda表达式
x -> {
  System.out.println(x);
  return x;
}
//有多个参数的Lambda表达式
(int x,int y)->{
	System.out.println(x);
  System.out.println(y);
	return x+y;
}
//上述可以进行简写，因为在Lambda中，参数列表中参数的数据类型可以交给JVM根据上下文进行推断。所以可以不用定义类型。
//一个参数和仅一条语句的Lambda表达式
x->3+x;
//多个参数和仅一条语句的Lambda表达式
(x,y) ->x+y;
```

## 2.2 **Lambda**表达式底层原理解析

```java
//lambda循环比较 
Arrays.sort(language,(o1,o2)‐>(o1.compareTo(o2)));

//定义一个使用Lambda表达式的方法 
public class SourceDemo { 
	public void demo(){ 
		String[] language = {"c", "c++", "c#", "java","python", "go","hive", "php"}; 
		List<String> list = Arrays.asList(language);
    list.forEach(s‐> System.out.println(s)); 
    } 
    }
//将当前.java文件编译生成.class文件，执行命令后，会在当前文件夹生成对应的.class文件 
javac SourceDemo.java
//将.class文件进行反编译，查看文件内容 
javap ‐p SourceDemo.class
//  生成内容如下
  Compiled from "SourceDemo.java" 
  public class com.itheima.lambda.source.SourceDemo { 
    public com.itheima.lambda.source.SourceDemo(); 
    public void demo(); 
    private static void lambda$demo$0(java.lang.String); 
  }
//此时可以发现，代码中执行Lambda表达式的部分生成了一个静态私有函数。这个静态私有函数的函数干就是 Lambda表达式里面的内容。 那么对于这个静态私有函数，在JDK8内部是如何实现调用的呢？可以查看 LambdaMetafactory 类，该类下有一个 metafactory方法，lambda表达式每一次在执行的时候都会进入到这个方法中，并且为lambda表达式创建一个内 部类。

//如果想查看内部类里面的内容，可以在lambda表达式执行之前，添加 
System.setProperty("jdk.internal.lambda.dumpProxyClasses", "D://"); 
//这个方法会将运行时生成的内部类class文件进行输出。 当该文件生成后，可以通过 javap -c -p class文件名 查看文件中的内容
//此时可以发现编译后的Lambda表达式已经被执行。
```

> 综上所述，Lambda表达式在执行的时候，会调用LambdaMetafactory.metafactory动态的生成内部类，在方法 内调用 SourceDemo$&Lambda$1 ，内部类里的调用方法块并不是动态生成的，只是在原class里已经编译生成了一个 静态的方法，内部类只需要调用该静态方法。 

# 3.函数式接口

> 在Java8中为了让现在有的函数能够更加友好的使用Lambda表达式，因此引入了**函数式接口**这个概念。
>
> **函数式接口是一个 仅有一个抽象方法的普通接口。如果声明多个抽象方法则会报错。**
>
> **但是默认方法和静态方法在此接口中可以定义多个。**
>
> **要想自定义一个函数式接口的话，需要在接口上添加 @FunctionalInterface 。** 
>
> 在`Java8`的类库设计中，已经引入了几个函数式接口：`Predicate`、`Consumer`、`Function`、`Supplier` 

## 3.1 **Predicate**使用

> Predicate接口是Java8定义的一个函数式接口,用于条件判断，属于**`java.util.function`**包下，**内部定义一个 抽象方法`test`、三个默认方法`and`(与)，`negate`(非)，`or`(或)、一个静态方法`isEqual`** 

```java
import com.itheima.lambda.Student;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

public class MyPredicateDemo {
 /**
  * 定义方法,接收入参学生列表 和 函数式接口Predicate
  * @param studentList
  * @param predicate
  * @return
  */
 public static List<Student> filter(List<Student> studentList, Predicate<Student> predicate){
    ArrayList<Student> list = new ArrayList<>();
    studentList.forEach(s‐>{
       if (predicate.test(s)){
        	list.add(s);
       }
    });
    return list;
 }
 
 public static void main(String[] args) {
    List<Student> students = new ArrayList<>();
    students.add(new Student(1,"张三","M"));
    students.add(new Student(2,"李四","M"));
    students.add(new Student(3,"王五","F"));
    //通过lambda表达式调用filter方法
    List<Student> result = filter(students, (s) ‐> s.getSex().equals("F"));
    System.out.println(result.toString());
 }
}
```

`and`用法

```java
import java.util.function.Predicate;

public class DemoPredicateAnd {
    public static void main(String[] args) {
        boolean isValid = method(
                s -> s.contains("H"), s -> s.contains("W"));
        System.out.println("字符串符合要求吗:" + isValid);
    }

    //定义过滤方法,两个条件都满足才返回true
    private static boolean method(Predicate<String> one, Predicate<String> two) {
        boolean isValid = one.and(two).test("Hello world");
        return isValid;
    }
}
```



## 3.2 **Consumer**使用 

> Consumer也是JDK8提供的函数式接口，用于进行**获取数据**的操作，其内部定义了一个抽象方法`accept`、一个默认方法`andThen`。
>
> 对于`accept()`方法来说，它接受一个泛型`T`对象。如果现在需要访问类型`T`对象，并对其进行某些操作的话，就可以使用这个接口。 

```java
package com.haier.cscp.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class MyConsumerDemo {
    //定义遍历方法
    public static void foreach(List<String> arrays, Consumer<String> consumer) {
        arrays.forEach(s -> consumer.accept(s));
    }

    public static void main(String[] args) {
        List<String> arrays = new ArrayList<>();
        arrays.add("java");
        arrays.add("python");
        arrays.add("go");
        arrays.add("hive");
        //调用遍历方法,传入集合和逻辑
        foreach(arrays, (s) -> System.out.print(s + ","));
        System.out.println();
        //集合继承了Iterable,而Iterable的forEach方法入参也是Consumer,故也可直接使用forEach
        arrays.forEach(s -> System.out.print(s + ","));
    }
}
```

## 3.3 **Function**使用

> Function主要用于进行类型转换的操作。内部提供一个抽象方法`apply`、两个默认方法`compose`，`andThen`、一个 静态方法`identity` 
>
> 对于apply方法，它接收一个泛型`T`对象，并返回一个泛型`R`的对象

```java
package com.example.demo.test;

import java.util.function.Function;

public class MyFunctionDemo {
    public static Integer convert(String value, Function<String,Integer> function){
        return function.apply(value);
    }

    public static void main(String[] args) {
        Integer convert = convert("666", value -> Integer.valueOf(value)+222);
        System.out.println(convert);
    }
}

```

## 3.4 **Supplier**使用

> Supplier也是用来进行值获取操作，内部只有一个抽象方法get

```java
package com.example.demo.test;

import java.util.function.Supplier;

public class MySupplierDemo {
    public static Integer getMin(Supplier<Integer> supplier){
        return  supplier.get();
    }

    public static void main(String[] args) {
        int[] arr = {100,22,111};
        Integer min1 = getMin(() -> {
            int min = arr[0];
            for (int a : arr) {
                if (min > a) {
                    min = a;
                }
            }
            return min;
        });
        System.out.println(min1);
    }
}

```

## 3.5 类型检查**&**推断 

> 对于Lambda表达式的类型推断，它是对`Java7`中的目标类型推断进行的再次扩展。在`Java7`中引入了 `菱形操作符` 的概念，它可以是代码在编译时自动推断出泛型参数的类型。
>

```java
//全量声明 
Map<String,String> map = new HashMap<String, String>(); 
//菱形运算符 
Map<String,String> map1 = new HashMap<>();
```

第二种书写代码的方式，也是我们在开发中经常使用的。不用明确声明泛型类型，代码在进行编译时，可以自动的进行类型推断。 

那么在Java8中对于这种使用方式又进一步扩展，可以省略Lambda表达式中的所有参数类型。在编译时根据Lambda表达式的上下文信息推断出参数的正确类型。这就是所谓的类型推断。

> 到现在为止，对于Lambda表达式都只用到了方法体里面的参数，但Lambda其实是支持使用外部定义的变量的。在下面这段代码中，在Lambda表达式内部引用了外部变量。**但是当在Lambda方法体内使用外部变量时，其必须声明为final。下述代码虽然没有显示的声明，但是在Java8它自动的会对需要为final的变量(port)进行转换。** 

```java
public void demo(){ 
  int port = 8086; 
  Runnable runnable = ()‐> System.out.println(port); 
}
```

# 4. 方法引用`::` 

方法引用更近一步的优化了Lambda的使用。它让代码感觉更加的自然。我们可以直接使用 `::` 来简化`Lambda`表达式的使用。

使用语法如下： `类名或实例名::方法名`  

```java
students.sort(Comparator.comparing(Student::getId)); 
```

# **5. Stream**流使用 

> 流操作是Java8提供一个重要新特性，它允许开发人员以声明性方式处理集合，其**核心类库主要改进了对集合类的 API和新增Stream操作**。Stream类中每一个方法都对应集合上的一种操作。将真正的函数式编程引入到Java中，能 让代码更加简洁，极大地简化了集合的处理操作，提高了开发的效率和生产力。 
>
> **stream不是一种数据结构，它只是某种数据源的一个视图，数据源可以是一个数组，Java容器或`I/O channel`等。在Stream中的操作每一次都会产生新的流，内部不会像普通集合操作一样立刻获取值，而是惰性取值，只有等到用户真正需要结果的时候才会执行。** 

```java
List<String> result = studentList.stream() 
  .filter(s ‐> s.getAge() < 20) //过滤出年龄小于20岁的学生 
  .sorted(Comparator.comparing(Student::getAge)) //对结果进行排序 
  .map(Student::getName) // 提取出结合中的name属性 
  .collect(Collectors.toList());//转换成一个新的集合
```

通过上述代码的执行，可以发现**无需再去定义过多的冗余变量**。我们可以将多个操作组成一个调用链，形成数据处理的流水线。在减少代码量的同时也更加的清晰易懂。 

并且对于现在调用的方法，本身都是一种高层次构件，与线程模型无关。因此在并行使用中，**开发者们无需再去操心线程和锁了。Stream内部都已经做好了。**

steam流本身就是将集合的操作由外部迭代转换为了内部迭代。而内部迭代来说，它所操作的就是不是一个集合了，而是一个流。它会将所有的操作融合在流中，由其在内部进行处理，这种隐式的方式称之为**内部迭代**。 

**并且内部迭代支持并行处理，更利于集合操作的性能优化。其关注与对数据的计算。** 

## 5.1流操作详解

**Stream流接口中定义了许多对于集合的操作方法,总的来说可以分为两大类:中间操作和终端操作。**

- **中间操作**:会返回一个流,通过这种方式可以将多个中间操作连接起来,形成一个调用链,从而转换为另外一个流。除非调用链最后存在一个终端操作,否则中间操作对流不会进行任何结果处理。
- **终端操作**:会返回一个具体的结果,如`boolean`, `list`, `integer`等。

### 5.1.1筛选`filter distinct`

对于集合的操作，经常性的会涉及到对于集中符合条件的数据筛选，Stream中对于数据筛选两个常见的API：`filter`(过滤)、`distinct`(去重) 

```java
//filter
Stream<Student> studentStream = studentList.stream() 
																.filter(s‐>s.getAge() < 20); //.filter(Student::getIsPass);
List<Student> list = studentStream.collect(Collectors.toList());
//distinct 对对象进行去重的话，还需要在对象内部重写，hashCode()和equals()方法才可以实现去重。
List<Integer> result = numberList.stream() 
  .filter(n ‐> n % 2 == 0) 
  .distinct() 
  .collect(Collectors.toList());
```

### 5.1.2 切片`limit skip`

> 基于**`limit()`**实现数据截取,该方法会返回一个不超过给定长度的流。
>
> 对于`limit`方法的实现，它会接收截取的长度，如果该值小于0，则抛出异常，否则会继续向下调用 

```java
List<Integer> numberList = Arrays.asList(1, 2, 3, 4, 1, 2, 3, 4); 
List<Integer> collect = numberList.stream().limit(5).collect(Collectors.toList());
```

> 基于**`skip()`**实现数据跳过,刚才已经基于`limit`完成了数据截取，但是`limit`对于数据截取是从前往后截取几个。如果现在对结果只获取后几个怎么办呢？此时就需要使用`skip()`。其与`limit()`的使用是相辅相成的。 
>
> 在`skip`方法中接收的`n`代表的是要跳过的元素个数，如果`n`小于`0`，抛出非法参数异常，如果`n`等于`0`，则返回当前 流。如果`n`大于`0`，才会调用`makeRef()`。同时指定limit参数为-1. 

```java
    public static void main(String[] args) {
        List<Integer> numberList = Arrays.asList(1, 2, 3, 4, 1, 2, 3, 4);
        List<Integer> collect = numberList.stream().limit(5).skip(2).collect(Collectors.toList());
        System.out.println(collect);//[3, 4, 1]
    }
```

### 5.1.3映射  `map`

> 在对集合进行操作的时候，我们经常会从某些对象中选择性的提取某些元素的值，就像编写`sql`一样，指定获取表 中特定的数据列 :
>
>   `SELECT name FROM student;` 
>
> 在Stream API中也提供了类似的方法，`map()`。它接收一个函数作为方法参数，这个函数会被应用到集合中每一个 元素上，并最终将其映射为一个新的元素。 

```java
//获取每一个学生的名字，并形成一个新的集合 
List<String> nameList = studentList.stream() 
  .map(Student::getName) 
  .collect(Collectors.toList());
//获取每一个学生名字的长度
List<Integer> nameList = studentList.stream()
  .map(Student::getName)
  .map(String::length) //也可以继续向下获取每一个名称的长度 
  .collect(Collectors.toList());
```

### 5.1.4匹配`anyMatch allMatch`

> 有时还需要判断集合中某些元素是否匹配对应的条件，如果有的话，在进行后续的操作。在 Stream API中也提供了相关方法供我们进行使用，如`anyMatch`、`allMatch`等。他们对应的就是`&&`和`||`运算符。
>
> `anyMatch()`主要用于判断流中是否至少存在一个符合条件的元素，它会返回一个`boolean`值，并且对于它的操作， 一般叫做<u>短路求值</u> (某些操作不用操作整个流就可以得到结果:`&&  ||` )

```java
//anyMatch执行时，只要流中有一个元素符合条件就会返回true
if (studentList.stream().anyMatch(s‐>s.getAge()<20)){ 
		System.out.println("集合中有符合条件的学生"); 
}
//allMatch会判断流中是否所有条件都符合条件，全部符合才会返回true
if (studentList.stream().allMatch(Student::getIsPass)){ 
  System.out.println("所有学生合格"); 
}else { 
  System.out.println("有学生不合格"); 
}

```

### 5.1.5查找`findany findFirst`

- `findany`

> `fifindAny`用于获取流中随机的某一个元素，并且利用短路在找到结果时，立即结束。
>
> `fifindAny`对于同一数据源的多次操作会返回不同的结果。但是，如果我们的操作是串行的， 在数据较少的情况下，一般会返回第一个结果，如果在并行的情况下，那就不能确保返回的是第一个了。 
>
> 这种设计主要是为了获取更加高效的性能

```java
Optional<Student> optional = studentList.stream().filter(s ‐> s.getAge() < 20).findAny(); 
if (optional.isPresent()){ 
	System.out.println(optional.get()); 
}
//并行流
for(int i=0;i<100;i++){ 
  Optional<Student> optional = studentList.parallelStream().filter(s ‐> s.getAge() < 20).findAny();
  if (optional.isPresent()){ 
    System.out.println(optional.get()); 
  } 
}
```

- `findFirst`

> `fifindFirst`使用原理与`fifindAny`类似，但不管是在并行还是串行，指定返回流中的第一个元素。 

```java
for(int i=0;i<100;i++){ 
  Optional<Student> optional = studentList 
    .stream() 
    //.parallelStream() 
    .filter(s ‐> s.getAge() < 20) 
    .findFirst(); 
  if (optional.isPresent()){ 
    System.out.println(optional.get()); 
  }
}
```

### 5.1.6 归约(求和、最大值、最小值等)

> 到现在截止，对于流的终端操作，我们返回的有`boolean`、`Optional`和`List`。但是在集合操作中，我们经常会涉及 对元素进行统计计算之类的操作，如求和、求最大值、最小值等，从而返回不同的数据结果。 

#### 5.1.6.1累积求和 

```java
//第一个参数声明为初始值，第二个参数接收一个lambda表达式，代表当前流中的两个元素，它会反复相加每一个元素，直到流被归约成一个最终结果
Integer reduce = numbers.stream().reduce(0, (a, b) ‐> a + b);
//优化:Integer类中提供了sum方法，用于对两个数求和，这里我们可 以直接基于lambda方法调用的形式来使用
Integer reduce = numbers.stream().reduce(0, Integer::sum);
//继续优化:reduce方法还有一个重载方法，不需要初始化值，会返回一个 Optional对象
Optional<Integer> optional = numbers.stream().reduce(Integer::sum);
```

#### 5.1.6.2最大值最小值

```java
//最大值
Optional<Integer> optional = numbers.stream().reduce(Integer::max)
//优化
Optional<Integer> optional = numbers.stream().max(Integer::compareTo);
//最小值
Optional<Integer> min = numbers.stream().min(Integer::compareTo);
```

## 5.2构建流

> 难道Stream只能在集合基础上才能操作么？当然不是，我们还可以基于值、数组甚至文件来构建流，完成流操作。

### 5.2.1基于值创建流 

> 在Stream中提供了一个静态方法`of`，它可以接收任意数量参数，显式的创建一个流。并且会根据传入的参数类 型，构建不同泛型的流。
>
> 其内部就是基于`Arrays`中的`stream`方法将传入的多个参数转换为数组，然后创建流，并遍历数组，将每一个元素放入流中。

```java
Stream<String> stringStream = Stream.of("1", "2", "3"); 
Stream<Object> stream = Stream.of("1", "2", 3,true,new St());
```

### 5.2.2基于数组创建流

```java
Integer[] numbers = new Integer[]{1,2,3,4,5,6};
Stream<Integer> integerStream = Arrays.stream(numbers);
```

### 5.2.3基于文件创建流 

​	在Java中 提供了`Files`类，该类中提供了一些对于文件操作的相关方法。可以看下`Files`类中部分方法

​	在该类中部分方法返回值就是Stream，如：`newDirectoryStream`、`list`、`lines`等。 



## 5.3收集器(返回复杂数据类型)

> 对于数据的返回，我们返回的都是一些简单的数据类型。那现在我们要做一些复杂的数据返回，应该怎么做呢？ 比方说返回一个Map或者List。就需要通过收集器来实现了
>
> 其内部主要核心是通过`Collectors`完成更加复杂的计算转换，从而获取到最终结果。并且`Collectors`内部提供了非常多的常用静态方法，直接拿来就可以了。比方说：`toList`。 

```java
//根据年龄进行分组
Map<Integer, List<Student>> map = studentList.stream().collect(Collectors.groupingBy(Student::getAge));
```

### 5.3.1 通过**`counting()`**统计集合总数

```java
Long collect = studentList.stream().collect(Collectors.counting());
//简写
long count = studentList.stream().count();
```

### 5.3.2 通过**`maxBy()`**与**`minBy()`**获取最大值最小值 

```java
//获取年龄最大的学生 
Optional<Student> optional = studentList.stream().collect(Collectors.maxBy(Comparator.comparing(Student::getAge)));
//优化
Optional<Student> studentOptional = studentList.stream().max(Comparator.comparing(Student::getAge));
//获取年龄最小的学生 
Optional<Student> studentOptional = studentList.stream().min(Comparator.comparing(Student::getAge));
```

### 5.3.3 通过**`summingInt()`**进行数据汇总 

```java
//获取年龄总和
Integer collect = studentList.stream().collect(Collectors.summingInt(Student::getAge));
//简化
int sum = studentList.stream().mapToInt(Student::getAge).sum();
```

### 5.3.4 通过**`averagingInt()`**进行平均值获取 

```java
Double collect = studentList.stream().collect(Collectors.averagingInt(Student::getAge));
//另外一种 这种方式虽然代码写多了一些，但是可以防止空值的出现。
OptionalDouble average = studentList.stream().mapToDouble(Student::getAge).average(); 
if (average.isPresent()){ 
  double asDouble = average.getAsDouble(); 
  System.out.println(asDouble); 
}
```

### 5.3.5复杂结果返回

> 到此截止，已经通过收集器完成了汇总、求和、求最大最小值、求平均值的操作。但是值得注意的是，这些操作每 一次都是返回单独的一个值，但是日常开发中，经常需要获取多种内容，那这种需求应该如何完成？Collectors也 提供了相关静态方法进行解决，这三个方法可以，返回的都是收集器。其内部已经包含了多种结果内容 
>
> 上述方法返回了`IntSummaryStatistics`类，其内部提供了相关`getter`方法用于获取汇总值、总和、最大值最小值等 方法，直接调用即可 
>
> 对于另外的`summarizingDouble()`和`summarizingLong()`使用方式都是相同的。只不过他们适用于收集属性数据类 型为`double`和`long`而已。 

```java
IntSummaryStatistics collect = studentList.stream().collect(Collectors.summarizingInt(Student::getAge));
long count = collect.getCount(); 
long sum = collect.getSum(); 
int max = collect.getMax(); 
int min = collect.getMin(); 
double average = collect.getAverage();
```

### 5.3.6通过**joining()**进行数据拼接 

```java
String collect = studentList.stream().map(Student::getName).collect(Collectors.joining());
String collect = studentList.stream().map(Student::getName).collect(Collectors.joining(","));
```

### 5.3.7 分组

```java
//一级分组 根据年龄分组
Map<Integer, List<Student>> map = studentList.stream().collect(Collectors.groupingBy(Student::getAge))
//根据年龄 是否通过进行多级分组
Map<Integer, Map<String, List<Student>>> collect = studentList.stream().collect(Collectors.groupingBy(Student::getAge, Collectors.groupingBy(student ‐> { 
  if (student.getIsPass()) { 
    return "pass"; 
  } else { 
    return "not pass"; 
  } 
})));
//多级分组变形 
//根据年龄进行分组，获取并汇总人数 
Map<Integer, Long> collect = studentList.stream().collect(Collectors.groupingBy(Student::getAge, Collectors.counting())); 
//根据年龄与是否及格进行分组，并汇总人数
Map<Integer, Map<Boolean, Long>> collect = studentList.stream().collect(Collectors.groupingBy(Student::getAge, Collectors.groupingBy(Student::getIsPass, Collectors.counting())));
//根据年龄与是否及格进行分组，并获取每组中分数最高的学生
Map<Integer, Map<Boolean, Student>> collect = studentList.stream().collect( Collectors.groupingBy(Student::getAge, 
                                                                                               		Collectors.groupingBy(Student::getIsPass, 
                                                                                                                     			Collectors.collectingAndThen( 
                                                                                                                       				Collectors.maxBy( 
                                                                                                                         						Comparator.comparing(Student::getScore)), Optional::get))));
```

### 5.3.8 自定义收集器

> 根据源码，`Collector`接口需要三个参数。T：流中要收集的元素类型、A：累加器的类型、R：收集的结果类型。 
>
> 如想自定义收集器，需要实现Collector接口中的五个方法：`supplier`、`accumulator`、`fifinisher`、`combiner`、 
>
> `characteristics` 
>
> - `supplier`：用于创建一个容器，在调用它时，需要创建一个空的累加器实例，供后续方法使用。 
>
> - `accumulator`：基于supplier中创建的累加容器，进行累加操作。 
>
> - `fifinisher`：当遍历完流后，在其内部完成最终转换，返回一个最终结果。 
>
> - `combiner`：用于在并发情况下，将每个线程的容器进行合并。 
>
> - `characteristics`：用于定义收集器行为，如是否可以并行或使用哪些优化。其本身是一个枚举，内部有三个值，分别为： 
>
>   `CONCURRENT`：表明收集器是并行的且只会存在一个中间容器。 
>
>   `UNORDERED`：表明结果不受流中顺序影响，收集是无序的。 
>
>   `IDENTITY_FINISH`：表明累积器的结果将会直接作为归约的最终结果，跳过fifinisher()。 

自定义收集器，返回所有合格的学员:

![image-20201002225245978](http://mele.cool/image-20201002225245978.png)

使用自定义收集器 :

![image-20201002225308032](http://mele.cool/image-20201002225308032.png)

# 6.数据并行化

> 为了让数据处理更加高效，`Java8`对于`Stream`也提供了并行的操作方式，在`Java7`之前如果要对数据并行处理，需要开发人员做的事情很多，如数据如何进行分块、开启多少个线程、哪个线程负责哪部分数据、出现线程竞争怎么办等等的问题。 
>
> `Java8`对于数据并行化处理的实现非常简单，直接调用一个`parallelStream()`就可以开启并行化处理。
>
> - 并行：多个任务在同一时间点发生，并由不同的`cpu`进行处理，不互相抢占资源
> - 并发：多个任务在同一时间点内同时发生了，但由同一个`cpu`进行处理，互相抢占资源
>
> 当在大量数据处理上，数据并行化可以大量缩短任务的执行时间，将一个数据分解成多个部分，然后并行处理，最后将多个结果汇总，得到最终结果。 
>
> `int sum = numbers.parallelStream().mapToInt(i ‐> i).sum();` 
>
> **当将stream()切换为parallelStream()后，则完成了串行转换为并行的实现。** 

## 6.1并行流原理

对于并行流，其在底层实现中，是沿用了Java7提供的fork/join分解合并框架进行实现。fork根据**cpu**核数进行数据分块，join对各个fork进行合并。实现过程如下所示：

![image-20201002225809916](http://mele.cool/image-20201002225809916.png)

## 6.2并行流注意事项

对于并行流，一定不要陷入一个误区：并行一定比串行快。并行在不同的情况下它不一定是比串行快的。影响并行流性能主要存在5个因素： 

**1）数据大小：**输入数据的大小，直接影响了并行处理的性能。因为在并行内部实现中涉及到了fork/join操作，它本身就存在性能上的开销。因此**只有当数据量很大，使用并行处理才有意义。** 

**2）源数据结构**：fork时会对源数据进行分割，数据源的特性直接影响了fork的性能。 

- ArrayList、数组或IntStream.range，可分解性最佳，因为他们都支持随机读取，因此可以被任意分割。 
- HashSet、TreeSet，可分解性一般，其虽然可被分解，但因为其内部数据结构，很难被平均分解。 
- LinkedList、Streams.iterate、BufferedReader.lines，可分解性极差，因为他们长度未知，无法确定在哪里进行分割。 

**3）装箱拆箱** 

- **尽量使用基本数据类型，避免装箱拆箱。** 

**4）CPU核数** 

- fork的产生数量是与可用CPU核数相关，可**用的核数越多，获取的性能提升就会越大。** 

**5）单元处理开销** 

- **花在流中每个元素的时间越长，并行操作带来的性能提升就会越明显**。 

## 6.3结论

**根据性能测试可知，对于简单操作，如果环境机是多核的话，建议使用Stream并行，同时在不考虑核数的情况*下，普通for循环性能要明显高于Stream串行，相差两倍左右。**

**对于复杂操作，推荐使用Stream API操作。** 

# 7.异步编程`CompletableFuture`

> 在现在软件开发的环境下，经常需要考虑如何能够设计出性能更加优异的系统。就像上面提到的数据并行化，就 是充分利用多核处理器结合并行操作来让代码执行效率更加优异。第二种方式就是让功能方法能够并行执行(异步编程CompletableFuture)。 

## 7.1`Future`介绍

有的同学会说，对于任务并行需求，直接通过多线程实现不就可以了， 要注意，对于多线程的实现，java提 供了三种方式：继承Thread类、实现Runnable接口和实现Callable接口。但是业务代码在执行时会考虑执行顺序 的问题，直接基于这些方式实现多线程会出现两个问题： 

1）要想控制线程执行顺序，会通过join()等待线程结束，那这样的话又回归到了阻塞式调用的思路上，违背了并行的需求。 另外还可以通过wait()、notify()、notifyAll()结合状态变量实现，但实现起来过于复杂。 

2）线程执行完之后，要想获取线程执行结果，还要用过共享变量或线程间通信等方式来获取，同样过于复杂。 为了解决上述问题，Java5中推出了**Future**，其初衷就是用于构建复杂并行操作。内部方法在返回时，不是返回一个值，而是返回Future对象。 其本质是在执行主业务的同时，异步的执行其他分业务，从而利用原本需要同步执行时的等待时间去执行其他的业 务，当需要获取其结果时，再进行获取。 

**在Future接口中有五个抽象方法：** 

1. cancel()：取消任务, 取消成功返回true；入参mayInterruptIfRunning表示是否允许取消正在执行中的任务。 
2. isCancelled()：返回布尔值，代表是否取消成功。
3. isDone()：返回布尔值，代表是否执行完毕。 
4. get()：返回Future对象，获取执行结果，如果任务没有完成会阻塞到任务完成再返回。 
5. get(long timeout, TimeUnit unit)：获取执行结果并设置超时时间，如果超时则抛出TimeoutException 

## 7.2CompletableFuture

CompletableFuture是Java1.8提供的一个新类，其实现了Future与CompletionStage两个接口。提供了诸多API扩展功能，可以通过Stream形式简化异步编程的复杂度，同时提供通过回调方式处理计算结果。

### 7.2.1 异步任务创建

在CompletableFuture中提供了四个静态方法用于创建异步任务 

```java
//根据源码可知，runAsync()分为一个参数和两个参数，并且其内部都会调用asyncRunStage().
//在该方法内部会创建异步任务，并把任务放入线程池中。并且runAsync()是没有返回值的。
//根据源码可知，当传入Executor会使用指定线程池执行，如果没有传入则使用默认ForkJoinPool.commonPool()执 行，值得注意的是，commonPool中都是守护线程，主线程执行完，子线程也就over了。因此建议当任务非常耗 时，使用自定义线程池。
1.runAsync(Runnable runnable) 
2.runAsync(Runnable runnable,Executor executor) 
//根据源码可知，supplyAsync()分为一个参数和两个参数，并且其内部都会调用asyncSupplyStage().
  //现在可知，其实supplyAsync()与runAsync()内部原理类似，但supplyAsync()有返回值。
3.supplyAsync(Supplier<U> supplier) 
4.supplyAsync(Supplier<U> supplier,Executor executor)
  
```

使用示例:

![image-20201002232340066](http://mele.cool/image-20201002232340066.png)

### 7.2.2 异步计算结果触发回调 

> 当异步任务结束或者抛出异常时，还要根据结果来完成特定的操作，对于这种需求CompletableFuture也提供了方法进行实现 

#### **7.2.2.1whenComplete()**与**whenCompleteAsync()**

whenComplete是在当前任务线程中继续执行指定的特定处理，而whenCompleteAsync会将指定的特定交给线程池另开启一个线程来执行。

![image-20201003162011657](http://mele.cool/image-20201003162011657.png)

#### 7.2.2.2 **exceptionally()**

> exceptionally()与上述两个方法类似，都是用于当异步任务结束后，执行特定处理，但不同的是，上述两个方法即 可以处理正常的返回结果也可以处理异常，而exceptionally()只对异常进行处理，且其使用的是主线程。

![image-20201003162122297](http://mele.cool/image-20201003162122297.png)

### 7.2.3 多任务依赖执行 

#### 7.2.3.1 **thenApply()**

> 该方法会接收一个Function，用于声明后续要执行的业务，其中T代表上一个方法的执行结果，fn代表当前任务的 结果数据类型，最终其会映射到CompletableFuture中的结果数据类型。 

![image-20201003162440304](http://mele.cool/image-20201003162440304.png)

根据运行结果可以看到，此处通过thenApply()串接了两个任务，第二个方法会在第一个方法执行完成后触发，且第二个方法的执行依赖于第一个方法的执行结果。 

#### 7.2.3.2 **handle()**

> handle()的使用效果与thenApply()类似，但不同的是thenApply()只能处理任务的正常返回结果，一旦出现异常则 无法进行后续处理。而handle()即可以处理正常结果，也可以处理异常结果。
>
> 当第一个任务出现异常后，第二个任务会对该异常进行后续的处理，完成串性操作。

![image-20201003162616742](http://mele.cool/image-20201003162616742.png)

#### 7.2.3.3 **thenAccept()**

> 当将多个任务连接起来执行时，有时最终是不需要返回结果，CompletableFuture中也提供了方法实现。 thenAccept()使用与上述方法类似，接收任务执行结果，并使用，但其没有结果返回。 

![image-20201003162744285](http://mele.cool/image-20201003162744285.png)

#### 7.2.3.4  **thenRun()**

> thenRun()与thenAccept()使用基本相同，都是不会进行结果返回，但不同的是，thenRun()不关心方法是否有结 果，只要它完成，就会触发其执行。

![image-20201003162822708](http://mele.cool/image-20201003162822708.png)

### 7.2.4 两任务合并执行

#### 7.2.4.1 两个任务全部完成触发

##### 7.2.4.1.1 **thenCombine()**

> 当两个异步任务都执行完毕后，它可以将两个任务进行合并，获取到两个任务的执行结果，进行合并处理，最后会有返回值。 
>
> 内部会判断当前要执行的函数是否为null，或者任务有没有执行完。如果为true，则抛出空指针异常。接着会构建 一个新的任务，将任务放入栈中，线程池会为其分配线程让其执行。 

![image-20201003163113414](http://mele.cool/image-20201003163113414.png)

##### 7.2.4.1.2 **thenAcceptBoth()**

> thenAcceptBoth()使用与thenCombine()类似，当两个任务执行完，获取两个任务的结果进行特定处理，但 thenAcceptBoth()没有返回值 

![image-20201003163229028](http://mele.cool/image-20201003163229028.png)

##### 7.2.4.1.3 **runAfterBoth()**

> 当两个任务执行完毕，触发特定任务处理，但不要两个异步任务结果，且不会进行值返回。

![image-20201003163318219](http://mele.cool/image-20201003163318219.png)

#### 7.2.4.2 两个任务任意一个完成触发 

##### 7.2.4.2.1 **applyToEither()**

> 当两个任务异步任务执行，谁先执行完，就以谁的结果为准，完成后续的业务处理，并且会进行结果值返回。

![image-20201003163436119](http://mele.cool/image-20201003163436119.png)

##### 7.2.4.2.2 **acceptEither()**

> acceptEither()的使用效果与applyToEither()类似，但acceptEither()没有返回值

![image-20201003163527665](http://mele.cool/image-20201003163527665.png)

##### 7.2.4.2.3 **runAfterEither()**

> 当两个任务执行，只要有一个任务执行完，则触发特定处理执行，无需使用异步任务的执行结果，且特定处理不会进行值的返回。

![image-20201003163634259](http://mele.cool/image-20201003163634259.png)

### 7.2.5 多任务组合执行

#### 7.2.5.1 **allOf()**

> 当一个特定业务处理任务的执行需要一组异步任务完成后才能执行的话，就可以通过allOf()实现。适用场景：假设现在有一个Z任务，它的执行需要[A,B,C,D,E,F]这一组异步任务全部执行完才能触发。 

![image-20201003163858821](http://mele.cool/image-20201003163858821.png)

#### 7.2.5.2 ）**anyOf()**

> 使用anyOf()时，当一组异步任务中，只要有一个执行完毕，则会被触发，利用该特性可以用来获取最快的那个线程结果。 

![image-20201003164020818](http://mele.cool/image-20201003164020818.png)-
    System.out.println("student存在"); 
  }else { 
    System.out.println("student不存在"); 
  }
  ```

  

- **ifPresent()**方法在执行时，接收一个consumer函数式接口，如果value不为null，则通过consumer中的 

  accept方法获取该值。 

  ```java
  Optional<Student> studentOptional = Optional.ofNullable(student); studentOptional.ifPresent(s‐> System.out.println("学生存在"));
  ```

  - **get()**

    > get()的使用非常简单，但不安全，因为其在获取值的时候，如果值存在，则直接返回封装在Optional中的值，如 果不存在，则抛出NoSuchElementException。因此它的使用前提是已经确定Optional中有值，否则没有使用意义。

  ```java
  if (studentOptional.isPresent()){ 
  	Student result = studentOptional.get(); 
  }
  ```

  - **orElseThrow()**

  > 该方法与get()类似，都是用于取值，但是当Optional中没有值时，get()会直接抛出NoSuchElementException， 这样的话，就存在了一定的局限性，因为有时可能需要抛出自定义异常。此时就可以使用orElseThrow()，它在取值时，如果Optional中没有值时，可以抛出自定义异常。 

![image-20201003165624398](http://mele.cool/image-20201003165624398.png)

- **map()**

```java
if (studentOptional.isPresent()){
		Optional<String> nameOptional = studentOptional.map(Student::getName);
	}
```

- **flflatMap()**

  ```java
  //Student类添加Job属性 
  private Optional<Job> job; 
  //Job类添加Company属性 
  private Optional<ComPany> comPany;
  ```

  > **用于多层调用**，同时对于结 果它不会形成多个Optional，而是将结果处理成最终的一个类型的Optional。但是通过flflatMap获取的返回值必须是Optional类型。而map则没有这个限制。

```java
Optional<String> nameOptional = studentOptional.flatMap(Student::getJob).flatMap(Job::getCompany).map(Company::getName);
```

- **fifilter()**

> 会根据传入的条件进行判断，如果匹配则返回一个Optional对象并包含对应的值，否则返回一个空值的Optional 

```java
Optional<Company> company = companyOptional.filter(c ‐> "itheima".equals(c.getName()));
```

- **orElse()**

> 在取值的时候，如果值不存在，有时我们会考虑返回一个默认值。该需求就可以通过orElse()实现。 其内部会判断值是否为null，如果不为null，则返回该值，如果为null，则返回传入的默认值。 

![image-20201003170351987](http://mele.cool/image-20201003170351987.png)

- **orElseGet()**

> orElseGet()也是用于当Optional中没有值时，返回默认值的方法。但是它与orElse()的区别在于，它是延迟加载 的。只有当Optional中没有值是才会被调用。
>
> **在使用时，更加推荐使用orElseGet()，因为它使用延迟调用所以性能更加优异。** 

![image-20201003170559116](http://mele.cool/image-20201003170559116.png)

# 9.日期时间新方式

> `SimpleDateFormat`本身是线程不安全的，在多线程环境下，如果多个线程使用同一个类解析日期，最后的结果是 无法预期的。同时继承了它的`DateFormat`类也不是线程安全的。 
>
> **`DateTimeFormatter`** 该类是不可变和线程的。该类中提供了很多方法用于替换`SimpleDateFormat`。基于`DateTimeFormatter`改造

- **`LocalDate`** 根据源码可知，该类是一个不可变，线程安全的类。其内部了提供了若干用于操作日期的方法
- **`LocalTime`**LocalTime类可以用来操作时间
- **`LocalDateTime`** LocalDateTime类可以用来操作日期+时间。

# 10.jdk11新特性

## 1）变量类型推断 

在`JS`中，不管类型是什么，我们都是使用`var`来进行变量声明的。但是之前对于`Java`的使用，都会提到它是强类型语言，变量声明需要定义特定类型。但是在`JDK11`中对`JDK8`的类型推断思路又得以延伸，使用`JS`的方式，通过`var`定义局部变量，它会根据右边的表达式推断变量类型 

```java
var text = "hello itheima"; 
sout(text);
```

## 2）新增字符串方法

在 JDK 11 中，新增了一些字符串方法，让字符串处理更加方便。其中包括：

1. `String.repeat(int)`：可以重复指定次数的字符串。
2. `String.lines()`：方便地按行分割字符串。
3. `String.strip()`：去除字符串首尾空白。
4. `String.stripLeading()`：去除字符串开头的空白。
5. `String.stripTrailing()`：去除字符串末尾的空白。
6. `String.isBlank()`：判断字符串是否为空白。

## 3）新增创建集合的方式 

`JDK11`提供了通过`of()`和`copyOf()`创建集合的方式，但是创建的集合长度不可变，不能进行任何修改操作.

`of()`会直接创建，而`copyOf()`首先会判断传入的集合是否为不可变集合，是的话直接返回，不是的话，调用`of()`创建新集合并返回。 

```java
var list = List.of("hello","itheima"); 
var arrayList = new ArrayList<String>(); 
var list2 = List.copyOf(arrayList); 
```

## 4）Files类增强 

在`Files`类中新增两个方法：`writeString`和`readString`。可以把`String`内容写入文件或者把整个文件以`String`读出 

```java
Files.writeString( Path.of("./", "demo.txt"), "hello,itheima", "utf‐8"); 

String info = Files.readString(Paths.get("./demo.txt"), "utf‐8"); 
```



## 5）HTTP Client Api 

平时我们要去访问`HTTP`资源，大多数时间我们都是通过第三方完成的，虽然在`JDK`标准类库中有`HttpURLConnection`，但是也不太好用。 在`JDK9`就提出了`HTTP Client Api`，经过9，10两个版本的改进，在11中正式发布。其同时支持同步请求和异步请 求。

```java
var request = HttpRequest.newBuilder()
.uri(URI.create("http://www.itcast.cn")) 
.POST() 
.build(); 
var client = HttpClient.newHttpClient(); 
// 同步 
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString()); System.out.println(response.body()); 
// 异步 
client.sendAsync(request, HttpResponse.BodyHandlers.ofString()) 
.thenApply(HttpResponse::body) 
.thenAccept(System.out::println);
```

## 6）更方便的编译运行 

```shell
#之前 
javac Demo.java 
java Demo 
#现在 
java Demo.java 
```