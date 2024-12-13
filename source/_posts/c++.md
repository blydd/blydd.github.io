title: c++
date: 2024-5-10 10:50:17
categories: c++
toc: true
description: c++
tags: 

	- c++


---





# 

[CLine下载地址](https://www.jetbrains.com/clion/download)

# Clion解决中文乱码

1. 按住键盘：`ctrl + shift + alt + /`，选择`Registry`
2. 取消勾选：`run.processes.with.pty`

# 代码基础结构

```c++
#include <iostream>
using namespace std;

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```





# 输出

## cout

```c++
//输出单份内容
cout << "Hello, World!" << endl;
cout << 10 << endl;

//或者  输出单份内容
cout << "Hello, World!";

//输出多份内容
cout << "I am" << 10 << "years old and you are 12." << endl;

```

## printf

**%d以10进制显示数字**

**8进制**，以0开头，有效数字：0、1、2、3、4、5、6、7

**16进制**，以`0x`开头，有效数字：`0~9`数字和`a、b、c、d、e、f`.其中字母部分，大小写均可

```c++
    printf("整数：%d\n", 123);//整型使用 %d
printf("%d\n", 011);  //8进制 结果9
printf("%d\n", 0xf);  //16进制 结果15


    printf("实数：%f\n", 3.1415);//实型（小数）使用 %f
    printf("字符：%c\n", 'a');//字符使用 %c
    printf("字符串：%s\n", "itheima");//字符串使用 %s
```



# cin数据输入

语法:

```c++
数据类型 变量;  // 声明变量
cin >> 变量;  // 输入的数据赋值给变量

```

示例:

```c++
#include <iostream>
using namespace std;

int main() {
    cout << "please input a number:" << endl;
    int num;
    cin >> num;//若输入字符串,num值实为0.
    cout << "the number input is:" << num << endl;
    return 0;
}
```



# 注释

- 单行注释：以 `//` 开头，建议相隔一个空格
- 多行注释：以 `/*`开头，`*/`结尾，中间全部内容作为注释在`/* */`内部可以换行

# 标识符命名规则

在C++代码中，会涉及到许多命名的场景，比如**变量**的命名，以及后续学习的**类**、**函数**等命名。这些命名，我们统一称之为：**标识符**，即表示某类实体的符号（名称）。

- 不可用关键字
- 内容限定:即仅可使用字母、数字、下划线的组合，且数字不可开头
- 大小写敏感 如int num 不等同于 int NUM





# 符号常量

符号常量：使用标识符去定义的常量，称之为符号常量。

简单来说，符号常量就是：**给常量起一个名字，就是符号常量。**

## 定义语法

#define 标识符（名称） 常量

示例:

```c++
#define FAT_BMI 28    // 肥胖BMI
#define J2C_RATE 4.19 // 焦耳转卡路里比率

```

## 使用

- 定义在代码头部，同时：先定义，后使用
- 符号常量名是标识符，符合字母、数字、下划线组合的要求且数字不可开头
- 字母建议全部大写

## 符号常量的取消定义

**语法**:`#undef 符号常量名`

常量是不可修改的，符号常量也是，一旦定义完成就无法修改其值。

如果想要更改符号常量的值，需要将其注销（取消定义）后重新定义。

```c++
#include <stdio.h>
#define NUM 10
#undef NUM // 取消NUM的定义
 
#define NUM 100 // 重新定义符号常量NUM
int main()
{ 
    printf("%d\n", NUM);//100
    return 0;
}

```



# 字面量

> 就是指书写到代码内的量，称之为字面量（或字面常量）。不同类型的数据有不同类型的书写方法。

常见数据类型的字面量写法:

![image-20240513135751888](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405131357006.png)

# 运算符

运算符是一种符号，用于告诉编译器执行特定的数学或逻辑操作。

## 算术运算符

![image-20240511150910903](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405111509039.png)

## 赋值运算符

![image-20240511150932597](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405111509684.png)

## 比较运算符

### 用于数字类型

比较运算符：是一种双目运算符，用于对两个数据进行比较（大、小、相等），得到bool型结果。

![image-20240511151028506](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405111510627.png)

可以用于比较：整型、实型、字符型，即数字的大小

### 用于字符串类型

在C++中，支持2种风格的字符串，它们各自的比较方式是不同的。

#### **C语言风格字符串**

- `char s[] = “hello”` 以及 `char *s = “hello”` 以及 `“hello”`都属于C语言风格字符串
- **如果使用运算符比较，是对比内存地址，而非比较内容**
- 所以需要使用C语言函数strcmp进行比较

```c++
#include "cstring"
//结果分为-1（s1<s2）、0（s1=s2）、1（s1>s2）三种
int result = strcmp(s1, s2);

```

#### **C++风格字符串**（string类型）

进行对比的两个字符串至少有1个是string类型，即可使用运算符比较。

C++对string类型参与的运算符进行了重载，确保可以进行内容对比

## 逻辑运算符

### 普通运算符

逻辑运算符：是一种单/双目运算符，用于对单个或多个表达式进行逻辑判断。

![image-20240511151612634](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405111516737.png)

### 三元运算符

产出bool结果的表达式 ? 值1 : 值2;

## 位运算符等

# 数据类型

## 整形

> 在C++中，数字是有无符号和有符号之分的。
>
> - 无符号：仅仅允许正数存在（默认都是有符号）
> - 有符号：可以允许负数存在

### **如何定义无符号整型**

- 需要主动使用`unsigned`，如`unsigned int num = 1;`
- `u_short`、`u_int`、`u_long`，是无符号`short`、`int`、`long`的**快捷写法**

![image-20240510154229476](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405101542646.png)

`[]` 表示可选，可写可不写。如：signed int 和 int 相同

### 常量的类型确定：

- 遵循最小原则

  > 整数默认为int，如范围不足，会自动扩容，顺序为：int -> uint -> long -> ulong -> long long -> u long long
  >
  > 浮点数默认为double，范围不足会自动扩容到long double

![image-20240510154616604](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405101546677.png)

- 根据后缀确定

![image-20240510154744245](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405101547325.png)

```c++
10L;        // 指定为long类型s
123UL;	    // 指定为unsigned long类型

```

## 实型(小数)

![image-20240510155005737](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405101550798.png)

**注意：实型数据没有`signed`和`unsigned`   默认全部有符号**

`double`和`long double`的有效位数仅做参考，`ANSIC`标准仅要求它们最少实现8字节具体有效范围取决于所用编译器对标准的实现

**有效位:**

```c++
#include <iostream>
using namespace std;

int main() {
    double num = 123456789.87654321;
    cout.width(20);  // 设置显示宽度
    cout << fixed;   // 设置小数显示

    cout << num << endl;//    123456789.876543     只显示出了16位,后面的丢失精度.
    return 0;
}

```

## 字符型

char类型用来表示字符，同时支持有符号和无符号.

![image-20240510155841243](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405101558306.png)

1. char类型本质上是数字,即在内存中存储的是实际上是数字，通过ASCII表进行的映射。
2. char可以存储的范围是超出ASCII的，但是基于ASCII映射，可以认为，char应用内容就是ASCII表

通过ASCII表作为对照，字符 -> 数字存入，数字 -> 字符使用:

![ASCII码](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405101559894.png)

```c++
#include <iostream>
using namespace std;

int main() {
    char a = 97;
    int b = a + 1;//char实际是数字,可参与运算.

    cout << a << endl;//打印映射的ASCII码  a
    cout << b << endl;//98
    return 0;
}

```

## 字符串

在C++中有两种风格的字符串使用形式：

- C语言风格字符串（了解）

```c++
char a[] = "aaa";	// 字符数组模式，不可更改变量值
a = "222";//报错

char *b = "bbb";	// 指针形式 可更改变量值

```

- C++风格字符串

```c++
string c = "c++";
```

## 布尔型

布尔类型的字面量仅仅有两个：

- true  表示真 （本质上是数字1）
- false 表示假 （本质上是数字0）

## 枚举

枚举：本质上是一个被命名的整型常数的集合

在C\C++语言中它是一种基本数据类型。

其主要作用是提高代码的可读性、可维护性和键入性。

因为枚举可以将一些数字或字符串符号化，以此增强程序的可读性和可维护性。

```c++
enum Season {    
  SPRING,    
  SUMMER,    
  AUTUMN,    
  WINTER
};

```

枚举类型每一个元素，都有整数标号，默认从0开始递增。

即上述代码SPRING本质是数字0，SUMBER是2，以此类推。

起始标号可以自行设置，如下：

```c++
enum Season {    
  SPRING = 3,    //从3开始递增，即：SPRING为3、SUMMER为4、AUTUMN为5、WINTER为6
  SUMMER,    
  AUTUMN,    
  WINTER
};

```

## 数组

> 是由一批**相同类型**的元素（element）的集合所组成的数据结构，分配一块**连续的内存**来存储。下标索引从0开始.

### 语法：

<数据类型> <数组名>[<数组长度>];

```c++
//声明
int v[5];	// 定义了一个有5个整型元素的数组
char v[5];	// 定义了一个有5个char元素的数组
double v[5];	// 定义了一个有5个double元素的数组
string v[5];	// 定义了一个有5个字符串元素的数组
bool v[5];	// 定义了一个有5个布尔型元素的数组

//声明时直接初始化赋值
int v[] = {1, 2, 3, 4, 5};

//单个赋值
v[0] = 1;
v[1] = 1;

```



### 特点

- 任意类型均可构建数组

  - 基本数据类型：`int`、`float`、`double`、`char`、`string`、`bool`等
  - 复合数据类型：`结构体`、`联合体`等
  - 指针类型：`int*`、`char*`、`float`*等
  - 枚举类型：`enum`

  ```c++
  // 基本数据类型
  float v1[] = {1.1, 2.2, 3.3, 4.4, 5.5};
  double v2[] = {1.1, 2.2, 3.3, 4.4, 5.5};
  char v3[] = {'a', 'b', 1, 2, 3};
  string v4[] = {"林志铃", "蔡依临", "刘亦飞"};
  bool v5[] = {0, 1, true, false};
  
  // 枚举类型
  enum Color { RED, GREEN, BLUE };
  Color colors[] = {RED, GREEN, BLUE, GREEN, BLUE};
  
  ```

- 固定大小（无边界检查）

  1. C++数组，一旦定义完成，其大小（长度）即固定。

  2. C++不会做数组边界检查，即下标索引超出数组范围，编译过程中不会报错。

     ```c++
     //如下代码，编译能够通过，但运行时可能会有未知问题。    
     int v[] = {1, 2, 3, 4, 5};
     v[10] = 1;
     cout << v[100] << endl;//0
     ```

     

- 内存连续且有序

  数组内存空间是连续分配的，并且每个元素分配大小取决于存放类型

  - char 1字节

  - int 4字节

  - double 8字节等

  通过 `sizeof(数组)/sizeof(数组某元素)` 可以得到数组元素个数

  ```c++
      int v[] = {1, 2, 3, 4, 5};
      cout << sizeof(v)/sizeof(v[0]) << endl;//6
  ```

  

- 元素值可以修改

- 数组变量不记录数据

  `int v[] = {1, 2, 3, 4, 5};` 

  **数组变量v本身**：并非记录了数组内全部元素（即：不存数据）,而是**记录了v[0]元素的内存地址**.

  **数组元素访问规律如下：**

  - 通过数组变量（如v）记录下标0元素内存位置，即可找到v[0]

  - 通过v[0]地址 + 单个元素空间大小（如int数组，4字节），即可找到v[1]

  - 通过v[1]地址 + 4字节，即可找到v[2]

  - …

  - …

  - 以此类推

### 遍历

```c++
#include <iostream>
#include "random"

using namespace std;


int main() {

    int arr[] = {1, 2, 3, 4, 5};
    //while遍历
    int i = 0;
    while (i < sizeof(arr) / sizeof(arr[0])) {
        cout << arr[i] << endl;
        i++;
    }
    //for遍历
    for (int i = 0; i < sizeof(arr) / sizeof(arr[0]); i++) {
        cout << arr[i] << endl;
    }

    return 0;
}

```



### 字符数组

C语言风格的字符串定义：

```c++
"hello";            // 方式1
char s[] = "hello"; // 方式2
char * s = "hello"; // 方式3

```

**方式1（字面常量）和方式2**定义的字符串本质都是：字符数组。

即：`"hello";` 或 `char s[] = "hello";` 均可以表现为：`char s[] = {'h', 'e', 'l', 'l', 'o', '\0'};`

其存储机制为:

- ​	将每一个字符，作为1个元素，存入字符数组中
- ​	在字符数组中，额外在最后添加一个元素\0（空字符），作为结束标记

由于字符串是字符数组，所以如下代码是成立的
```c++
    char s[] = "hello";
    cout << s[0] << endl;   // h
    cout << s[1] << endl;   // e
    cout << s[2] << endl;   // l
    cout << s[3] << endl;   // l
    cout << s[4] << endl;   // o
    cout << s[5] << endl;   // 空输出，即转义字符\0
    cout << sizeof(s) << endl;  // 长度为6
```

### 多维数组

![image-20240511173613531](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405111736702.png)

遍历:

![image-20240511173651551](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405111736658.png)



# 指针

## 介绍

在C++中，指针是至关重要的组成部分。它是C++语言最强大的功能之一，也是最棘手的功能之一。

指针具有强大的能力，其**本质是协助程序员完成内存的直接操纵**。

![image-20240511173758283](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405111737402.png)

**指针：特定类型数据在内存中的存储地址，即内存地址.**

指针只是一个逻辑概念，其实际应用是：指针变量。

指针变量的定义语法：

- 先声明，后赋值：

  ```c++
  变量类型 * 指针变量名;       // 声明
  指针变量名 = 内存地址值;     // 赋值
  //示例
  int num = 10;
  int * p;		// 声明  指针变量本身占用8字节（64位系统）
  p = &num;	// 赋值
  
  cout << p;  // 输出num变量地址
  cout << *p; // 输出10
  
  
  
  ```

  

- 声明和赋值同步：

  ```c++
  变量类型 * 指针变量名 = 内存地址值;
  int num = 10;
  int * p = &num;
  
  ```

  

- 变量类型（如上int）表示，指针（内存地址）指向的内存区域，存放的是整型数据            
-   **`*`符号有两种含义：**
  - **声明时：`*p`，表示变量p，是指针变量（存的是内存地址）			***
  - **使用时：`*p`，表示取指针p执行内存区域的数据**           			
-   **`&`符号表示取变量内存地址，是一个取内存地址的单目操作符**

![image-20240511174843719](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405111748802.png)

## 野指针

**野指针：被声明但未初始化（赋值）的指针。**这个指针会指向随机的内存空间，可能导致未知问题。

**声明即分配（内存）原则**：分配的内存不一定是"干净"的,需要初始化（赋值）进行覆盖

普通变量是对数值进行操作，不会有安全问题，所以没有“野变量”一说。

指针对内存直接操作，所以一旦声明但未赋值，就是“野指针”，一旦使用，后果不可预料。

示例:

```c++
int * p;    // 声明指针（分配了8字节空间）, p是野指针因为未被赋值
*p = 10;    // 将10赋予指针p所指向的空间
						//*p = 10; 是向未知的、随机的4字节内存区域，修改存储值为10  后果不可预料


```

### 避免野指针

为避免野指针，应养成良好的编程习惯，及时初始化，或将指针置为空指针更为安全。

```c++
int * p = NULL;
int * p = nullptr;
//NULL是C++内置的宏，表示”空、什么都没有”的含义，其本质是0
//nullptr是C++11标准引入的关键字，表示指针为空

//上述代码，二选一均可，表示指针指向的地方为”空”，即哪里也不是。
//指针不指向任何地方，那么也就没有了安全问题。


```

**空指针也不是什么光荣的事情，只在需要指针，但需要延迟赋值的场景下作为过渡使用。**

## 指针运算

尽管指针变量内记录的是内存地址，但仍可以进行基础的数学计算。

指针运算是对指针的基础型操作，非常适合操纵数组并配合做动态内存分配。

```c++
int num = 10;
int *p = &num;
cout << p << endl;    // 结果：0x20d1ff6e4   对指针+1，地址+4（字节）
p++;
cout << p << endl;    // 结果：0x20d1ff6e8		对指针+1，地址+4（字节）

```

指针进行加减运算的结果，和指针指向内存区域的数据类型有关，以加法为例：

- char 类型指针 +1， 地址+1 （字节）
- int 类型指针+1， 地址+4（字节）
- double 类型指针+1， 地址+8 （字节）
- …
- 指针+n或-n，即内存地址 `+n * 类型大小` 或 `–n * 类型大小`

**数组对象本身记录的是内存地址（第一个元素地址）**可以通过指针运算，完成使用指针存取数组元素:

```c++
int v[] = {1, 2, 3, 4, 5};
int *p = v;
*p = 11;                // 赋值数组第一个元素
*(p+1) = 22;            // 赋值数组第二个元素
*(p+2) = 33;            // 赋值数组第三个元素
cout << *p << endl;     // 取数组第一个元素
cout << *(p+1) << endl; // 取数组第二个元素
cout << *(p+2) << endl; // 取数组第三个元素

```



### 指针运算细节

1. 求两指针的中间指针（中间地址）:
   - 错误:`mid = (low + high) / 2;`
   - 正确:`mid = low + (high – low) / 2;`

2. 对于指针p，p++ 和 p+1的区别
   - `p++`:指针p发生变化，地址+1
   - `p+1`:得到指针p地址+1结果，p本身不变

## 动态内存分配

> 动态内存分配：即由程序员手动的进行内存空间的分配、内存空间的释放等内存管理操作。

C++代码中，变量、数组等对象的创建，是由C++自动分配内存的，称之为（自动）静态内存分配。

（自动）静态内存管理，是不会进行内存空间的自动清理的（无垃圾回收机制）,我们需要手动的管理内存，即手动分配，用完清理:

- new运算符  
  - new运算符用于申请并分配内存空间并提供指向该空间的指针（内存地址） 
  - 基本语法：
    - new type 申请普通变量空间   `int *p = new int;`
    - new type[n] 申请数组空间
- delete运算符
  - delete运算符用于释放内存:仅可用于new运算符申请的内存区域
  - 基本语法：
    - delete 指针 删除普通变量空间
    - delete[] 指针 删除数组空间

示例:

```c++
//普通变量空间
int *p = new int;
*p = 10;
cout << *p << endl;
delete p;
//数组空间
int *p = new int[5];
p[0] = 1;   // 指针也可用下标，等同于*(p+0)
*p = 1;
p[1] = 2;   // 指针也可用下标，等同于*(p+1)
*(p+1) = 2;
cout << p[0] << endl;
cout << *(p+1) << endl;
delete[] p;



```

## 数组元素的移除

C++内置并未提供对数组元素进行增加（插入）、移除的功能，需要手动实现（vector容器提供，后续学习）。

**移除数组元素，本质上是复制需要的元素到新数组。**

移除元素的核心思路如下：

1. 通过new操作符，申请新数组的内存空间，并复制数据到新数组
2. 通过delete删除旧数组的空间占用
3. 将旧数组指针，指向新数组地址

## 数组元素的插入

同元素的移除一样，新元素的插入同样需要我们手动实现。

核心思路 ：

- 创建新数组，将老数组元素和新插入元素一起复制到新数组中
- 要注意，新元素在指定位置插入（老数组元素要配合做下标增加）

## 指针悬挂

> 指针指向区域已经被回收(delete)，这种问题称之为：指针悬挂

![image-20240513104259015](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405131042149.png)

```c++
int main(){    
  int * p1 = new int;    
  int * p2 = p1;  // 将p1赋值给p2    
  *p1 = 10;    
  delete p1;    
  //p2指针不能正常使用，因为其指向区域已经被回收
  cout << "p2指针记录的是：" << *p2 << endl;    
  return 0;
}

```



所以，总结出两点经验：

- 不要轻易进行指针之间相互赋值
- delete回收空间前，确保此空间100%不再被使用

## const指针

> const是C++关键字，被译为常量，const指针即表示：常量指针。

### 指向const的指针

> 表示指向区域的数据，是不变的，但可以更换指向。

- 语法(将const写在*之前)

  - `const 数据类型 * 指针;`
  - `数据类型 const * 指针;`

  ![image-20240513111122695](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405131111826.png)

  ```c++
  int num1 = 10, num2 = 100;
  const int * p = &num1;
  *p = 20;  //错误   指向区域的值，不可修改
  p = &num2;//正确   可以修改指向
  
  ```

  

### const指针

> 表示指针本身不可更改，但指向的数据可以更改。

语法（将const写在*之后）：

- `数据类型 * const 指针 = 地址;`         // 必须初始化地址，因为指针不可修改了

```c++
int num1 = 10, num2 = 100;
int * const p = &num1;
p = &num2; //错误 指针指向不可更改
*p = 20;   //正确 指向区域内的值可以更改

```

### 指向const的const指针

> 指针和指向区域的值，都不可更改。

语法（*的前后，都写const）：

- `const 类型 * const 指针 = 地址;`         // 必须初始化地址，因为指针不可修改了

```c++
int num1 = 10, num2 = 100;
const int * const p = &num1;
p = &num2;//错误  指针指向不可更改
*p = 20;  //错误  指向区域内的值不可更改

```



使用场景：

- 需要常量的同时也需要动态内存分配的场景
- 因为只有使用指针，方可动态分配内存

## 指针和数组综合案例

有如下数组：`int * pArr = new int[10] {3, 5, 1, 11, 99, 66, 22, 2, 8, 6};`

需求：对数组内元素进行升序（从小到大）排序，得到：`{1, 2, 3, 5, 6, 8, 11, 22, 66, 99}`

# 逻辑判断

## if判断

```c++
if (条件判断){    
  如果判断结果为true，会执行的代码;
}else if (条件判断2){
    条件2为true，会执行的代码;
}else if (条件判断N){
    条件N为true，会执行的代码;
}else{ 
  上述判断全部为false，会执行的代码;
}

```

## switch

expression为常量表达式，应当给予一个常量值类型

应当为**整型（int、short、char）和枚举类型**

break语句可以中断switch语句，否则向下执行其它case段（包括default段）直到执行完或遇到break为止。

```c++
switch(expression){   
  case expression_1:        
    code;        
    break; // 可选的        
  case expression_2:        
    code;        
    break; // 可选的 
       …
       …       
 case expression_N:        
    code;        
    break; // 可选的        
  default: // 可选的    
    // 当没有任何 case 表达式的值与 expression 的值匹配时，执行此语句}

```



## while循环

```c++
while (条件表达式) {    
  // 循环体，当条件表达式为真时执行         
  code;
}

```

## do while循环

> do while循环是while循环的一个变换形式。和while循环在功能上有一点不同：
>
> - while循环，如果条件判断不成立，可以做到一次都不执行循环体的代码
> - do while循环，如果条件判断不成立，**最少会执行一次**循环体的代码

```c++
do 
{     
  // 循环体，至少执行一次         
  code;    
  ...    
} while (条件表达式);

```

## for循环

```c++
for (int i = 1; i <= 5; i++) {    
  cout << i << endl;
}

```

1. continue的作用是：中断所在循环的当次执行，直接进入下一次

2. break的作用是：直接结束所在的循环

   

   注意事项：

   - continue和break，在for和while循环中作用一致
   - 在嵌套循环中，只能作用在所在的循环上，无法对上层循环起作用

## goto语句

continue和break，作用是控制程序执行**有条件跳转**。

C++提供了goto语句，可以提供**无条件跳转**的功能。

**注意**:goto用的好是神器，用不好是大坑。所以能不用就不用吧。



# 结构体(类)

> 结构体（struct），是一种用户自定义复合数据类型，可以包含不同类型的不同成员。

## 语法

```c++
// 声明结构体
struct 结构体类型{    
	成员1类型 成员1名称;    
	...    
  成员N类型 成员N名称;
};

//示例
struct Student{    
	int age;
  string name;
};
//定义和赋值
Student stu = {12,"john"};
//访问成员
stu.name;
```



## 结构体指针

> 作为一种数据类型，结构体也是支持使用指针的。

- 引入已存在结构体地址

  ```c++
  struct Student{    
    string name;    
    string major_code = "003032";       // 默认专业代码    
    int dormitory_num = 1;              // 默认分配1号楼宿舍
  };
  struct Student stu = {"周杰轮", "003001", 5};
  struct Student *p = &stu;
  
  ```

  

- 通过new操作符申请指针空间

  ```c++
  struct Student *p = new Student {"周杰轮", "003001", 5};
  ```

- 使用指针变量访问结构体成员需要更换操作符号为：->

  ```c++
  cout << p->name << endl;            // 访问成员name
  cout << p->major_code << endl;      // 访问成员major_code
  cout << p->dormitory_num << endl;   // 访问成员dormitory_num
  ```

  

## 结构体指针数组

> 结构体同样可以使用指针数组，**主要用于动态内存分配，方便管理大量结构体占用的内存。**

- 引入已存在结构体数组地址

  ```c++
  struct Student arr[] = {{"周杰轮"}, {"林军杰"}, {刘德滑", "003001", 3}};
    // 指向已存在数组地址
    struct Student *p = arr;
  // 数组的每一个元素是结构体对象（非指针）使用.访问成员
  cout << p[0].name << endl;
  cout << p[1].name << endl;
  cout << p[2].name << endl;
  
  ```

  

- 通过new操作符申请指针数组空间

  ```c++
  struct Student *p = new Student[3] {        
    {"周杰轮"},        
    {"林军杰"},        
    {"刘德滑", "003001", 3}
  };
  cout << p[0].name << endl;
  cout << p[1].name << endl;
  cout << p[2].name << endl;
  delete[] p;
  
  ```

  

# 函数

> 函数（Function）：是一个提前封装好的、可重复使用的、完成特定功能的独立代码单元。
>
> 函数不可定义在main内部

![image-20240513145543070](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405131455191.png)

## 引用

> 函数的形参还有引用传参这一种形式。
>
> 引用：是变量的一个别名，它是某个已存在变量的另一个名字。

- 引用创建后，不可更改（更改指向到其它内存区域）
- 因不可更改，所以引用必须初始化
- 因必须初始化，所以引用不可为空（不可修改）

语法，主要使用&表明引用：
```c++
数据类型& 引用名 = 被引用变量;

int a = 10;
int& b = a;

double d1 = 11.11;
double& d2 = d1;
//对b的各种操作等同于操作a
//对d2的各种操作等同于操作d1


```

## 函数的三种传参模式对比

![image-20240513150756806](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202405131507912.png)



# code

## 获取随机数

```c++
#include <iostream>
#include "random"
using namespace std;

/**
 * 获取范围内随机整数
 * @param min 
 * @param max 
 * @return 
 */
int get_random_num(int min, int max){
     // 创建一个随机数生成器
     random_device rd;
     mt19937 gen(rd());
     // 定义一个均匀分布的整数范围
     uniform_int_distribution<> dis(min, max);
     // 生成一个随机数并输出
     int random_number = dis(gen);
     return random_number;
     }


int main() {
    int num =get_random_num(1,100);

    cout << "the random number is:" << num << endl;
    return 0;
}

```

