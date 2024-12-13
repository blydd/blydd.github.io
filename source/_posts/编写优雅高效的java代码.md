title: 编写高效优雅java代码
date: 2021-01-26 14:08:00
categories: java
toc: true
tags:
	- java

	
	
---


# 面向对象
# 构造器参数太多怎么办
> Java类设计过程中，如果类的构造器或者静态工厂中具有多个参数，并且其中有大量的可选参数时，我们应该怎么办？

## Telescoping Constructor模式(重叠构造器)
我们首先想到的方法肯定是传统的构造器

```java
/**
 * Created by itbird on 2017/3/23
 */

public class Person {
    private String name;
    private String sex;
    private int year;

    public Person(String name, String sex, int year) {
        this.name = name;
        this.sex = sex;
        this.year = year;
    }
}
```
但是设计以及使用过程中我们发现以下几点问题：

- 属性参数逐渐变多时属性参数逐渐变多时，由于要对之前的代码做兼容，所以不可以直接在现有构造器后面追加属性，只能不断新增构造器
```java
/**
 * Created by itbird on 2017/3/23
 */

public class Person {
    private String name;
    private String sex;
    private int year;
    private String city;

    public Person(String name, String sex, int year) {
        this.name = name;
        this.sex = sex;
        this.year = year;
    }

    public Person(String name, String sex, int year, String city) {
        this.name = name;
        this.sex = sex;
        this.year = year;
        this.city = city;
    }
}
```
- 属性参数中有大量的可选参数
```java
/**
 * Created by itbird on 2017/3/23
 */

public class Person {
    private String name;
    private String sex;
    private int year;
    private String city;
    private String state;
    private boolean isFemale;
    private boolean isEmployed;
    private boolean isHomewOwner;

    public Person(String name, String sex, int year) {
        this.name = name;
        this.sex = sex;
        this.year = year;
    }

    public Person(String name, String sex, int year, String city) {
        this.name = name;
        this.sex = sex;
        this.year = year;
        this.city = city;
    }

    public Person(String name, String sex, int year, String city, String newState,
                  boolean newIsFemale, boolean newIsEmployed, boolean newIsHomeOwner) {
        this.name = name;
        this.sex = sex;
        this.year = year;
        this.city = city;
        this.state = newState;
        this.isFemale = newIsFemale;
        this.isEmployed = newIsEmployed;
        this.isHomewOwner = newIsHomeOwner;
    }
}
```
显而易见，这样写的类构造器虽然无可厚非，但是当有许多参数的时候，客户端代码会很难编写，并且难以阅读。如果读者想知道那些值是什么意思，必须很仔细的数着这些参数来探个究竟。

## JavaBeans模式

在这种模式下，调用一个无参构造器来创建对象，然后调用setter方法来设置每个必要的参数，以及每个相关的可选参数。
```java
/**
 * Created by itbird on 2017/3/23
 */

public class Person {
    private String name;
    private String sex;
    private int year;
    private String city;
    private String state;
    private boolean isFemale;
    private boolean isEmployed;
    private boolean isHomewOwner;

    public Person() {
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public boolean isFemale() {
        return isFemale;
    }

    public void setFemale(boolean female) {
        isFemale = female;
    }

    public boolean isEmployed() {
        return isEmployed;
    }

    public void setEmployed(boolean employed) {
        isEmployed = employed;
    }

    public boolean isHomewOwner() {
        return isHomewOwner;
    }

    public void setHomewOwner(boolean homewOwner) {
        isHomewOwner = homewOwner;
    }
}
```
这种模式弥补重叠构造器模式的不足。说的明白一点，就是创建实例很容易，这样产生的代码读起来也很容易:

```java
Person person = new Person();
person.setCity("重庆");
person.setYear(12);
person.setSex("男");
person.setName("itbird");
```
遗憾的是，JavaBeans模式自身有着很严重的缺点。因为构造过程被分到几个调用中，在构造过程中JavaBean可能处于非一致的状态。JavaBeans模式阻止了把类做成不可变的可能，这就需要程序员付出额外的努力来确保他的线程安全。

## Builder模式
5个或者5个以上的成员变量 参数不多，但是在未来，参数会增加
```java
public class Person {
    private String name;
    private String sex;
    private int year;
    private String city;
    private String state;
    private boolean isFemale;
    private boolean isEmployed;
    private boolean isHomewOwner;

    public Person() {
    }

    public static class PersonBuilder {
        // 必要参数
        private String name;
        // 可选参数
        private String sex;
        private int year;
        private String city;
        private String state;
        private boolean isFemale;
        private boolean isEmployed;
        private boolean isHomewOwner;

        public PersonBuilder(String name) {
            this.name = name;
        }

        public PersonBuilder setSex(String sex) {
            this.sex = sex;
            return this;
        }

        public PersonBuilder setYear(int year) {
            this.year = year;
            return this;
        }

        public PersonBuilder setCity(String city) {
            this.city = city;
            return this;
        }

        public PersonBuilder setState(String state) {
            this.state = state;
            return this;
        }

        public PersonBuilder setFemale(boolean female) {
            isFemale = female;
            return this;
        }

        public PersonBuilder setEmployed(boolean employed) {
            isEmployed = employed;
            return this;
        }

        public PersonBuilder setHomewOwner(boolean homewOwner) {
            isHomewOwner = homewOwner;
            return this;
        }

        public Person build() {
            Person person = new Person();
            person.name = name;
            person.sex = sex;
            person.city = city;
            person.isEmployed = isEmployed;
            person.isFemale = isFemale;
            person.isHomewOwner = isHomewOwner;
            person.state = state;
            person.year = year;
            return person;
        }
    }
}
```
调用的实例:
```java
Person person = new Person.PersonBuilder("itbird")
                   .setCity("重庆").setYear(15).build();
```
显然，使用Builder模式解决了上诉的难题，达到了“以不变(Builder)应万变(参数)”的目的。

# 不需要实例化的类应该构造器私有
 一些工具类提供的都是静态方法，这些类是不应该提供具体的实例的。可以参考JDK中的Arrays。

# 不要创建不必要的对象
- 反例
> 该语句每次被执行的时候都创建一个新的String实例，但这些创建对象的动作全部都是不必要的。传递给String构造器的参数（”stringette”）本身就是一个String实例，功能方面等同于构造器创建的对象。如果这种用法实在一个循环中，或者在一个被频繁调用的方法中，就会创建出成千上万不必要的String实例。

```java
String s = new String("stringette");
```
- 正例
> 这个版本只用了一个String实例，而不是每一次执行代码都创建一个新的实例。

```java
String s = "stringette";
```
# 避免使用终结方法
终结方法（finalizer）通常是不可预测的，也是很危险的，一般情况下是不必要的。使用终结方法会导致行为不稳定，降低性能以及可移植性问题。

- 反例
```java
Foo foo = new Foo(...);
try{
    //Do what must be done with foo
    ...
}finally{
    foo.terminate();        //Explicit termination method
}
```
使用终结方法的好处，它们有两种合法用途：

第一种用途是，当对象的所有者忘记调用前面建议的显示终止方法的时，终结方法可以充当“安全网（safety net）”。迟一点释放关键资源总比永远不释放要好。但是如果终结方法发现资源还未被终止，则应该在日志中记录一条警告，因为这是客户端的一个BUG，应当被修复。

第二种合理用途与对象的本地对等体（native peer）有关。本地对等体是一个本地对象（native object），普通对象通过本地方法（native method）委托给一个本地对象。因为本地对等体不是一个普通对象，所以垃圾回收器不会知道它，当它的Java对等体被回收的时候，它不会被回收。在本地对等体不拥有关键资源的前提下，终结方法正是执行这项任务最合适的工具。如果本地对等体拥有必须被及时终止的资源，那么该类就应该具有一个显示的终止方法，如前所述。终止方法应该完成所有必要的工作以便释放关键资源。终止方法可以是本地的，或者调用本地方法。

# 使类和成员的可访问性最小化
编写程序和设计架构，最重要的目标之一就是模块之间的解耦。使类和成员的可访问性最小化无疑是有效的途径之一。

## 为什么要使类和成员的可访问性最小化
可以有效的解除系统中各个模块的耦合度、实现每个模块的独立开发、使得系统更加的可维护，更加的健壮。

## 如何最小化类和接口的可访问性？
 能将类和接口做成包级私有就一定要做成包级私有的。

 如果一个类或者接口，只被另外的一个类应用，那么最好将这个类或者接口做成其内部的私有类或者接口。

## 如何最小化一个了类中的成员的可访问性？
#### 首先设计出该类需要暴露出来的api，然后将剩下的成员的设计成private类型。然后再其他类需要访问某些private类型的成员时，在删掉private，使其变成包级私有。如果你发现你需要经常这样做，那么就请你重新设计一下这个类的api。

#### 对于protected类型的成员，作用域是整个系统，所以，能用包访问类型的成员的话就尽量不要使用保护行的成员。

#### 不能为了测试而将包中的类或者成员变为public类型的，最多只能设置成包级私有类型。

#### 实例域绝对不能是public类型的.

## 使可变性最小化
> 尽量使类不可变，不可变的类比可变的类更加易于设计、实现和使用，而且更不容易出错，更安全。

### 常用的手段
- 不提供任何可以修改对象状态的方法；
- 使所有的域都是final的。
- 使所有的域都是私有的。
- 使用写时复制机制。带来的问题：会导致系统产生大量的对象，而且性能有一定的影响，需要在使用过程中小心权衡。
## 优先使用复合
继承容易破坏封装性，而且会使子类的实现依赖于父类。
复合则是在类中增加一个私有域，引用类的一个实例，这样的话就避免了依赖类的具体实现。
只有在子类确实是父类的一个子类型时，才比较适合用继承。

## 接口优于抽象类
java是个单继承的，但是类允许实现多个接口。
所以当发生业务变化时，新增接口，并且需要进行业务变化的类现新接口即可。但是抽象类有可能导致不需要变化的类也不得不实现新增的业务方法。
在JDK里常用的一种设计方法是：定义一个接口，声明一个抽象的骨架类实现接口，骨架类类实现通用的方法，而实际的业务类可以同时实现接口又继承骨架类，也可以只实现接口。
如HashSet实现了implements Set接口 但是又extends 类AbstractSet，而AbstractSet本身也实现了Set接口。其他如Map，List都是这样的设计的。

---

# 方法
## 可变参数要谨慎使用
可变参数是允许传0个参数的
如果是参数个数在1~多个之间的时候，要做单独的业务控制。

```java
//可能很多 0~很多
   static int sum(int... args) {
       int sum = 0;
       for (int arg : args)
           sum += arg;
       return sum;
   }
   
   //要求参数的个数，是1~多个
   //
   static int sum1(int... args) {
       if(args.length==0) {
           //做点异常处理
       }
       if(args[0]==100) {

       }
       for(int i=1;i<args.length;i++) {
           int sum = 0;
           sum += args[i];
           return sum; 
       }
   }

   static int sum2(int flag, int... args) {
       if(flag==100) {

       }
       int sum = 0;
       for (int arg : args)
           sum += arg;
       return sum;
       return Collections.EMPTY_LIST;
   }
   
```
## 优先使用标准的异常
> 要尽量追求代码的重用，同时减少类加载的数目，提高类装载的性能。

NullPointerException 在参数值不能为null的情况下参数值为null 抛出空指针异常

IndexOutOfBoundsException 下标参数值越界 抛出索引越界异常

ConcurrentModificationException 在禁止并发修改的情况下，检测到对象的并发修改 抛出

UnsupportedOperationException 对象不支持用户请求的方法 抛出

---

# 让代码性能更高
# 需要 Map 的主键和取值时，应该迭代 entrySet()
当循环中只需要 Map 的主键时，迭代 keySet() 是正确的。但是，当需要主键和取值时，迭代 entrySet() 才是更高效的做法，比先迭代 keySet() 后再去 get 取值性能更佳。

反例
```java
Map<String, String> map = ...;
for (String key : map.keySet()) {
    String value = map.get(key);
    ...
}
```
正例
```java
Map<String, String> map = ...;
for (Map.Entry<String, String> entry : map.entrySet()) {
    String key = entry.getKey();
    String value = entry.getValue();
    ...
}
```
# 应该使用Collection.isEmpty()检测空
使用 Collection.size() 来检测空逻辑上没有问题，但是使用 Collection.isEmpty()使得代码更易读，并且可以获得更好的性能。任何 Collection.isEmpty() 实现的时间复杂度都是 O(1) ，但是某些 Collection.size() 实现的时间复杂度可能是 O(n) 。

反例
```java
if (collection.size() == 0) {
    ...
}
```
正例
```java
if (collection.isEmpty()) {
    ...
}
```
如果需要还需要检测 null ，可采用
```java
CollectionUtils.isEmpty(collection)和CollectionUtils.isNotEmpty(collection)。
```
# 不要把集合对象传给自己
此外，由于某些方法要求参数在执行期间保持不变，因此将集合传递给自身可能会导致异常行为。

反例
```java
List<String> list = new ArrayList<>();
list.add("Hello");
list.add("World");
if (list.containsAll(list)) { // 无意义,总是返回true
    ...
}
list.removeAll(list); // 性能差, 直接使用clear()
```
# 集合初始化尽量指定大小
java 的集合类用起来十分方便，但是看源码可知，集合也是有大小限制的。每次扩容的时间复杂度很有可能是 O(n) ，所以尽量指定可预知的集合大小，能减少集合的扩容次数。

反例
```java
int[] arr = new int[]{1, 2, 3};
List<Integer> list = new ArrayList<>();
for (int i : arr) {
    list.add(i);
}
```
正例
```java
int[] arr = new int[]{1, 2, 3};
List<Integer> list = new ArrayList<>(arr.length);
for (int i : arr) {
    list.add(i);
}
```
# 字符串拼接使用 StringBuilder
一般的字符串拼接在编译期 java 会进行优化，但是在循环中字符串拼接， java 编译器无法做到优化，所以需要使用 StringBuilder 进行替换。

反例
```java
String s = "";
for (int i = 0; i < 10; i++) {
    s += i;
}
```
正例
```java
String a = "a";
String b = "b";
String c = "c";
String s = a + b + c; // 没问题，java编译器会进行优化
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10; i++) {
    sb.append(i);  // 循环中，java编译器无法进行优化，所以要手动使用StringBuilder
}
```java
# List 的随机访问
大家都知道数组和链表的区别：数组的随机访问效率更高。当调用方法获取到 List 后，如果想随机访问其中的数据，并不知道该数组内部实现是链表还是数组，怎么办呢？可以判断它是否实现 RandomAccess 接口。

正例
```java
// 调用别人的服务获取到list
List<Integer> list = otherService.getList();
if (list instanceof RandomAccess) {
    // 内部数组实现，可以随机访问
    System.out.println(list.get(list.size() - 1));
} else {
    // 内部可能是链表实现，随机访问效率低
}
```
# 频繁调用 Collection.contains 方法请使用 Set
在 java 集合类库中，List 的 contains 方法普遍时间复杂度是 O(n) ，如果在代码中需要频繁调用 contains 方法查找数据，可以先将 list 转换成 HashSet 实现，将 O(n) 的时间复杂度降为 O(1) 。

反例
```java
ArrayList<Integer> list = otherService.getList();
for (int i = 0; i <= Integer.MAX_VALUE; i++) {
    // 时间复杂度O(n)
    list.contains(i);
}
```
正例
```java
ArrayList<Integer> list = otherService.getList();
Set<Integer> set = new HashSet(list);
for (int i = 0; i <= Integer.MAX_VALUE; i++) {
    // 时间复杂度O(1)
    set.contains(i);
}
```

---

# 让代码更优雅
# 长整型常量后添加大写 L
在使用长整型常量值时，后面需要添加 L ，必须是大写的 L ，不能是小写的 l ，小写 l 容易跟数字 1 混淆而造成误解。

反例
```java
long value = 1l;
long max = Math.max(1L, 5);
```
正例
```java
long value = 1L;
long max = Math.max(1L, 5L);
```
# 不要使用魔法值
当你编写一段代码时，使用魔法值可能看起来很明确，但在调试时它们却不显得那么明确了。这就是为什么需要把魔法值定义为可读取常量的原因。但是，-1、0 和 1不被视为魔法值。

反例
```java
for (int i = 0; i < 100; i++){
    ...
}
if (a == 100) {
    ...
}
```
正例
```java
private static final int MAX_COUNT = 100;
for (int i = 0; i < MAX_COUNT; i++){
    ...
}
if (count == MAX_COUNT) {
    ...
}
```
# 不要使用集合实现来赋值静态成员变量
对于集合类型的静态成员变量，不要使用集合实现来赋值，应该使用静态代码块赋值。

反例
```java
private static Map<String, Integer> map = new HashMap<String, Integer>() {
    {
        put("a", 1);
        put("b", 2);
    }
};

private static List<String> list = new ArrayList<String>() {
    {
        add("a");
        add("b");
    }
};
```
正例
```java
private static Map<String, Integer> map = new HashMap<>();
static {
    map.put("a", 1);
    map.put("b", 2);
};

private static List<String> list = new ArrayList<>();
static {
    list.add("a");
    list.add("b");
};
```
# 建议使用 try-with-resources 语句
Java 7 中引入了 try-with-resources 语句，该语句能保证将相关资源关闭，优于原来的 try-catch-finally 语句，并且使程序代码更安全更简洁。

反例
```java
private void handle(String fileName) {
    BufferedReader reader = null;
    try {
        String line;
        reader = new BufferedReader(new FileReader(fileName));
        while ((line = reader.readLine()) != null) {
            ...
        }
    } catch (Exception e) {
        ...
    } finally {
        if (reader != null) {
            try {
                reader.close();
            } catch (IOException e) {
                ...
            }
        }
    }
}
```
正例
> 那什么是try-with-resource呢？简而言之，当一个外部资源的句柄对象（比如FileInputStream对象）实现了AutoCloseable接口，那么就可以将上面的板式代码简化为如下形式：

```java
private void handle(String fileName) {
    try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
        String line;
        while ((line = reader.readLine()) != null) {
            ...
        }
    } catch (Exception e) {
        ...
    }
}
```
将外部资源的句柄对象的创建放在try关键字后面的括号中，当这个try-catch代码块执行完毕后，Java会确保外部资源的close方法被调用。代码是不是瞬间简洁许多！

# 删除未使用的私有方法和字段
删除未使用的私有方法和字段，使代码更简洁更易维护。若有需要再使用，可以从历史提交中找回。

反例
```java
public class DoubleDemo1 {
    private int unusedField = 100;
    private void unusedMethod() {
        ...
    }
    public int sum(int a, int b) {
        return a + b;
    }
}
```
正例
```java
public class DoubleDemo1 {
    public int sum(int a, int b) {
        return a + b;
    }
}
```
# 删除未使用的局部变量
删除未使用的局部变量，使代码更简洁更易维护。

反例
```java
public int sum(int a, int b) {
    int c = 100;
    return a + b;
}
```
正例
```java
public int sum(int a, int b) {
    return a + b;
}
```
# 删除未使用的方法参数
未使用的方法参数具有误导性，删除未使用的方法参数，使代码更简洁更易维护。但是，由于重写方法是基于父类或接口的方法定义，即便有未使用的方法参数，也是不能删除的。

反例
```java
public int sum(int a, int b, int c) {
    return a + b;
}
```
正例
```java
public int sum(int a, int b) {
    return a + b;
}
```
# 删除表达式的多余括号
对应表达式中的多余括号，有人认为有助于代码阅读，也有人认为完全没有必要。对于一个熟悉 Java 语法的人来说，表达式中的多余括号反而会让代码显得更繁琐。

反例
```java
return (x);
return (x + 2);
int x = (y * 3) + 1;
int m = (n * 4 + 2);
```
正例
```java
return x;
return x + 2;
int x = y * 3 + 1;
int m = n * 4 + 2;
```
# 工具类应该屏蔽构造函数
工具类是一堆静态字段和函数的集合，不应该被实例化。但是，Java 为每个没有明确定义构造函数的类添加了一个隐式公有构造函数。所以，为了避免 java “小白”使用有误，应该显式定义私有构造函数来屏蔽这个隐式公有构造函数。

反例
```java
public class MathUtils {
    public static final double PI = 3.1415926D;
    public static int sum(int a, int b) {
        return a + b;
    }
}
```
正例
```java
public class MathUtils {
    public static final double PI = 3.1415926D;
    private MathUtils() {}
    public static int sum(int a, int b) {
        return a + b;
    }
}
```
# 删除多余的异常捕获并抛出
用 catch 语句捕获异常后，什么也不进行处理，就让异常重新抛出，这跟不捕获异常的效果一样，可以删除这块代码或添加别的处理。

反例
```java
private static String readFile(String fileName) throws IOException {
    try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
        String line;
        StringBuilder builder = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            builder.append(line);
        }
        return builder.toString();
    } catch (Exception e) {
        throw e;
    }
}
```
正例
```java
private static String readFile(String fileName) throws IOException {
    try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
        String line;
        StringBuilder builder = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            builder.append(line);
        }
        return builder.toString();
    }
}
```
# 公有静态常量应该通过类访问
虽然通过类的实例访问公有静态常量是允许的，但是容易让人它误认为每个类的实例都有一个公有静态常量。所以，公有静态常量应该直接通过类访问。

反例
```java
public class User {
    public static final String CONST_NAME = "name";
    ...
}

User user = new User();
String nameKey = user.CONST_NAME;
```
正例
```java
public class User {
    public static final String CONST_NAME = "name";
    ...
}

String nameKey = User.CONST_NAME;
```
# 不要用NullPointerException判断空
空指针异常应该用代码规避（比如检测不为空），而不是用捕获异常的方式处理。

反例
```java
public String getUserName(User user) {
    try {
        return user.getName();
    } catch (NullPointerException e) {
        return null;
    }
}
```
正例
```java
public String getUserName(User user) {
    if (Objects.isNull(user)) {
        return null;
    }
    return user.getName();
}
```
使用String.valueOf(value)代替””+value
当要把其它对象或类型转化为字符串时，使用 String.valueOf(value) 比””+value 的效率更高。

反例
```java
int i = 1;
String s = "" + i;
```
正例
```java
int i = 1;
String s = String.valueOf(i);
```
# 过时代码添加 @Deprecated 注解
当一段代码过时，但为了兼容又无法直接删除，不希望以后有人再使用它时，可以添加 @Deprecated 注解进行标记。在文档注释中添加 @deprecated 来进行解释，并提供可替代方案

正例
```java
/**
 * 保存
 *
 * @deprecated 此方法效率较低，请使用{@link newSave()}方法替换它
 */
@Deprecated
public void save(){
    // do something
}
```

---

# 让代码远离 bug
# 禁止使用构造方法 BigDecimal(double)
BigDecimal(double) 存在精度损失风险，在精确计算或值比较的场景中可能会导致业务逻辑异常。

反例
```java
BigDecimal value = new BigDecimal(0.1D); // 0.100000000000000005551115...
```
正例
```java
BigDecimal value = BigDecimal.valueOf(0.1D);; // 0.1
```
# 返回空数组和空集合而不是 null
返回 null ，需要调用方强制检测 null ，否则就会抛出空指针异常。返回空数组或空集合，有效地避免了调用方因为未检测 null 而抛出空指针异常，还可以删除调用方检测 null 的语句使代码更简洁。

反例
```java
public static Result[] getResults() {
    return null;
}

public static List<Result> getResultList() {
    return null;
}

public static Map<String, Result> getResultMap() {
    return null;
}

public static void main(String[] args) {
    Result[] results = getResults();
    if (results != null) {
        for (Result result : results) {
            ...
        }
    }

    List<Result> resultList = getResultList();
    if (resultList != null) {
        for (Result result : resultList) {
            ...
        }
    }

    Map<String, Result> resultMap = getResultMap();
    if (resultMap != null) {
        for (Map.Entry<String, Result> resultEntry : resultMap) {
            ...
        }
    }
}
```
正例
```java
public static Result[] getResults() {
    return new Result[0];
}

public static List<Result> getResultList() {
    return Collections.emptyList();
}

public static Map<String, Result> getResultMap() {
    return Collections.emptyMap();
}

public static void main(String[] args) {
    Result[] results = getResults();
    for (Result result : results) {
        ...
    }

    List<Result> resultList = getResultList();
    for (Result result : resultList) {
        ...
    }

    Map<String, Result> resultMap = getResultMap();
    for (Map.Entry<String, Result> resultEntry : resultMap) {
        ...
    }
}
```
# 优先使用常量或确定值来调用 equals 方法
对象的 equals 方法容易抛空指针异常，应使用常量或确定有值的对象来调用 equals 方法。当然，使用 java.util.Objects.equals() 方法是最佳实践。

反例
```java
public void isFinished(OrderStatus status) {
    return status.equals(OrderStatus.FINISHED); // 可能抛空指针异常
}
```
正例
```java
public void isFinished(OrderStatus status) {
    return OrderStatus.FINISHED.equals(status);
}

public void isFinished(OrderStatus status) {
    return Objects.equals(status, OrderStatus.FINISHED);
}
```
# 枚举的属性字段必须是私有不可变
枚举通常被当做常量使用，如果枚举中存在公共属性字段或设置字段方法，那么这些枚举常量的属性很容易被修改。理想情况下，枚举中的属性字段是私有的，并在私有构造函数中赋值，没有对应的 Setter 方法，最好加上 final 修饰符。

反例
```java
public enum UserStatus {
    DISABLED(0, "禁用"),
    ENABLED(1, "启用");

    public int value;
    private String description;

    private UserStatus(int value, String description) {
        this.value = value;
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
```
正例
```java
public enum UserStatus {
    DISABLED(0, "禁用"),
    ENABLED(1, "启用");

    private final int value;
    private final String description;

    private UserStatus(int value, String description) {
        this.value = value;
        this.description = description;
    }

    public int getValue() {
        return value;
    }

    public String getDescription() {
        return description;
    }
}
```
# 小心String.split(String regex)
字符串 String 的 split 方法，传入的分隔字符串是正则表达式！部分关键字（比如.| 等）需要转义

反例
```java
"a.ab.abc".split("."); // 结果为[]
"a|ab|abc".split("|"); // 结果为["a", "|", "a", "b", "|", "a", "b", "c"]
```
正例
```java
"a.ab.abc".split("\\."); // 结果为["a", "ab", "abc"]
"a|ab|abc".split("\\|"); // 结果为["a", "ab", "abc"]
```

[文章来源][1]


[1]: https://baiyp.ren/%E7%BC%96%E5%86%99%E9%AB%98%E6%95%88%E4%BC%98%E9%9B%85%E7%9A%84Java%E4%BB%A3%E7%A0%81.html