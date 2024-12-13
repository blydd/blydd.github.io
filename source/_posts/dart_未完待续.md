title: dart
date: 2024-04-23 12:10:17
categories: dart
toc: true
description: 
tags: 
	- dart

---



# 介绍：

​    Dart是由谷歌开发的计算机编程语言,它可以被用于web、服务器、移动应用 和物联网等领域的开发。

​    Dart诞生于2011年，号称要取代JavaScript。但是过去的几年中一直不温不火。直到Flutter的出现现在被人们重新重视。

​    要学Flutter的话我们必须首先得会Dart。

​    官网：https://dart.dev/

## 环境搭建：

​      要在我们本地开发Dart程序的话首先需要安装`Dart Sdk`

​	  官方文档：https://dart.dev/get-dart

### windows:

​       http://www.gekorm.com/dart-windows/

### mac：

​        如果mac电脑没有安装`brew`这个工具首先第一步需要安装它：  https://brew.sh/

```shell
brew tap dart-lang/dart
brew install dart
```

## Dart 开发工具：

​    Dart的开发工具有很多： IntelliJ IDEA  、 WebStorm、 Atom、Vscode等

### Vscode中配置Dart。

​       1、vscode插件安装`dart`

​      2、vscode插安装`code runner`     `code runner`  可以运行我们的文件

# 基础语法

## 入口方法

 入口方法的两种定义方式

```dart
main(){
    print('你好dart');
}

//表示main方法没有返回值
void main(){
 		print('你好dart');
}
```



## 变量

  dart是一个强大的脚本类语言，可以不预先定义变量类型 ，自动会类型推断

  dart中定义变量可以通过**var**关键字申明

  如：

```dart
var str='this is var';
String str='this is var';
int str=123;
```

  注意： `var` 后就不要写类型 ，写了类型就不要`var`   两者都写报错



## 常量 

**`const` 值不变,一开始就得赋值**.

**`final` 可以不赋初始值,但只能赋一次.**

常量命名一般全大写.

而final不仅有const的编译时常量的特性，最重要的它是运行时常量，并且final是惰性初始化，即在运行时第一次使用前才初始化

```dart
main() {
  final name = 'Bob';
  final String nickname = 'Bobby';
  print(name);
  print(nickname);

  const bar = 1000000; 
  const double atm = 1.01325 * bar; 
  print(bar);
  print(atm);
}
```



## 命名规则

1. 变量名称必须**由数字、字母、下划线和美元符($)组成**。
2. 标识符**开头不能是数字**
3. 标识符**不能是保留字和关键字**。   
4. 变量的名字是**区分大小写**的.如: age和Age是不同的变量。
5. 标识符(变量名称)一定要见名思意 ：变量名称建议用名词，方法名称建议用动词  

## 数据类型

### Number

> int
>
> double

```dart
void main(){

  //1、int   必须是整型
    int a=123;
    a=45;
    print(a);
  //2、double  既可以是整型 也可是浮点型
    double b=23.5;
    b=24;
    print(b);
  //3、运算符
    // + - * / %
    var c=a+b;
    print(c);
}
```



### String

```dart
void main(){
  //1、字符串定义的几种方式:单引号 双引号
  // var str1='this is str1';
  // var str2="this is str2";
  // print(str1);
  // print(str2);
  
	//2.三单引号 可换行
  // String str1='''this is str1
  // this is str1
  // this is str1
  // ''';
  //  print(str1);

	//3.三双引号 可换行
  //   String str1="""
  //   this is str1
  //   this is str1
  //   this is str1
  //   """;
  //  print(str1);

  //4、字符串的拼接
  String str1='你好';
  String str2='Dart';
  print("$str1 $str2");
  print(str1 + str2);  
  print(str1 +" "+ str2);

}


```



### Booleans

> bool

```dart
void main(){

  //1、bool
  bool flag1=true;
  print(flag1);

  bool flag2=false;
  print(flag2);

  //2、条件判断语句
  var flag=true;
  if(flag){
    print('真');      
  }else{
    print('假');
  }

  var a=123;
  var b=123;
  if(a==b){
    print('a=b');
  }else{
     print('a!=b');
  }
}


```



### List（数组）

> 在Dart中，数组是列表对象，所以大多数人只是称它们为列表

#### 创建list方式

```dart
void main() {
  //1、第一种定义List的方式
  var l1=["张三",20,true];
  print(l1);  //[张三, 20, true]
  print(l1.length);  //3
  print(l1[0]); //张三
  print(l1[1]); //20

  //2、第二种定义List的方式 指定类型
  var l2=<String>["张三","李四"];
  print(l2);

 var l3 = <int>[12, 30];
 print(l3);

  //3、第三种定义List的方式  增加数据 ,通过[]创建的集合它的容量可以变化

  var l4 = [];
  print(l4);
  print(l4.length);

  l4.add("张三");
  l4.add("李四");
  l4.add(20);
  print(l4);
  print(l4.length);

  var l5 = ["张三", 20, true];
  l5.add("李四");
  l5.add("zhaosi");
  print(l5);


  //4、第四种定义List的方式 创建一个固定长度的集合

  var l6=List.filled(2, "");
  print(l6);
  print(l6[0]);

  l6[0]="张三";   //修改集合的内容
  l6[1]="李四";
  print(l6);  //[张三, 李四]
  l6.add("王五");  //报错  通过List.filled创建的集合长度是固定,没法增加数据



  //通过List.filled创建的集合长度是固定
  var l6=List.filled(2, "");
  print(l6.length);
  l6.length=0;  //修改集合的长度   报错

  var l7=<String>["张三","李四"];
  print(l7.length);  //2
  l7.length=0;  //可以改变的
  print(l7);  //[]

	//生成时可以不是指定类型
  var l8=List<String>.filled(2, "");
  l8[0]="string";
  // l8[0]=222;//报错.修改时必须是指定类型
  print(l8);//[string, ]   
}

```

#### List常用属性&方法：



​    **常用属性：**

- length          长度
- reversed        翻转
- isEmpty         是否为空
- isNotEmpty      是否不为空

​    **常用方法：**  

- add         增加
- addAll      拼接数组
- indexOf     查找  传入具体值
- remove      删除  传入具体值
- removeAt    删除  传入索引值
- fillRange   修改   
- insert(index,value);            指定位置插入    
- insertAll(index,list)           指定位置插入List
- toList()    其他类型转换成List  
- join()      List转换成字符串
- split()     字符串转化成List
- forEach   
- map
- where 返回满足条件的元素
- any 只要集合里面有满足条件的就返回true
- every 每个元素都满足条件返回true

**示例:**

```dart
void main(){

//List里面的属性：
 List myList=['香蕉','苹果','西瓜'];
 print(myList.length);
 print(myList.isEmpty);
 print(myList.isNotEmpty);
 print(myList.reversed);  //对列表倒序排序
 var newMyList=myList.reversed.toList();
 print(newMyList);

//List里面的方法：
  List myList=['香蕉','苹果','西瓜'];
  myList.add('桃子');   //增加数据  增加一个
  myList.addAll(['桃子','葡萄']);  //拼接数组
  print(myList);
  print(myList.indexOf('苹x果'));    //indexOf查找数据 查找不到返回-1  查找到返回索引值
//forEach 遍历
 myList.forEach((value){
     print("$value");
     print(value);
 });

  myList.remove('西瓜');//删除元素
  myList.removeAt(1);//根据索引删除元素
  print(myList);
  
  List myList=['香蕉','苹果','西瓜'];
  myList.fillRange(1, 2,'aaa');  //修改  [香蕉, aaa, 西瓜]
  myList.fillRange(1, 3,'aaa');//修改  [香蕉, aaa, aaa]
  print(myList);

  myList.insert(1,'aaa');      //插入  一个
  myList.insertAll(1, ['aaa','bbb']);  //插入 多个
  print(myList);

  List myList=['香蕉','苹果','西瓜'];
  var str=myList.join('-');   //list转换成字符串
  print(str);
  print(str is String);  //true

  var str='香蕉-苹果-西瓜';
  var list=str.split('-');
  print(list);//[香蕉, 苹果, 西瓜]
  print(list is List);//true
  //every 每一个都满足条件返回true  否则返回false
  List myList=[1,3,4,5,7,8,9];
   var f=myList.every((value){
       return value>5;
   });
   print(f);//false
  //any 只要集合里面有满足条件的就返回true
   List myList=[1,3,4,5,7,8,9];
   var f=myList.any((value){
       return value>5;
   });
   print(f);
  //where 返回满足条件的元素
  List myList=[1,3,4,5,7,8,9];
   var newList=myList.where((value){
       return value>5;
   });
   print(newList.toList());
  //map
  List myList=[1,3,4];      
   var newList=myList.map((value){
       return value*2;
   });
   print(newList.toList());
}
```



### Set 

> 无序 不重复集合

```dart
void main(){
  //set转list
  var s=new Set();
  s.add('香蕉');
  s.add('苹果');
  s.add('苹果');
  print(s);   //{香蕉, 苹果}
  print(s.toList()); 

//list转set
  List myList=['香蕉','苹果','西瓜','香蕉','苹果','香蕉','苹果'];
  var s=new Set();
  s.addAll(myList);
  print(s);
  print(s.toList());
  
  //遍历
  s.forEach((value)=>print(value));
}
```



### Maps（字典）

>  通常来说，Map 是一个键值对相关的对象。 键和值可以是任何类型的对象。
>
> **每个键只出现一次， 而一个值则可以出现多次**

#### 创建map方式

```dart
void main(){
  //第一种定义 Maps的方式
  var person={
    "name":"张三",
    "age":20,
    "work":["程序员","送外卖"]
  };

  print(person);
  print(person["name"]);
  print(person["age"]);
  print(person["work"]);

 //第二种定义 Maps的方式
 var p=new Map();
 p["name"]="李四";
 p["age"]=22;
 p["work"]=["程序员","送外卖"];
 print(p);
 print(p["age"]);   
}
```

#### Map常用属性&方法

**常用属性：**

- keys            获取所有的key值

- values          获取所有的value值

- isEmpty         是否为空

- isNotEmpty      是否不为空

**常用方法:**

- remove(key)     删除指定key的数据

- addAll({...})   合并映射  给映射内增加属性

- containsValue   映射内的值是否包含指定值  返回true/false

- forEach    遍历

- map 

- where

- any

- every

**示例**:

```dart
void main(){
//常用属性：
  Map person={
    "name":"张三",
    "age":20,
    "sex":"男"
  };

  print(person.keys.toList());
  print(person.values.toList());
  print(person.isEmpty);
  print(person.isNotEmpty);


//常用方法：
    Map person={
      "name":"张三",
      "age":20,
      "sex":"男"
    };
		//增加元素
    person.addAll({
      "work":['敲代码','送外卖'],
      "height":160
    });
    print(person);
		//删除元素
    person.remove("sex");
    print(person);
		//value是否包含张三
    print(person.containsValue('张三'));
		//遍历
    person.forEach((key,value){            
        print("$key---$value");
    });

}
```



### **用不到的数据类型：**

- Runes 

​	        Rune是UTF-32编码的字符串。它可以通过文字转换成符号表情或者代表特定的文字。

```dart
 main() {
      var clapping = '\u{1f44f}';
      print(clapping);
      print(clapping.codeUnits);
      print(clapping.runes.toList());
      Runes input = new Runes(
          '\u2665  \u{1f605}  \u{1f60e}  \u{1f47b}  \u{1f596}  \u{1f44d}');
      print(new String.fromCharCodes(input));

	}
```

-  Symbols

​        Symbol对象表示在Dart程序中声明的运算符或标识符。您可能永远不需要使用符号，但它们对于按名称引用标识符的API非常有用，因为缩小会更改标识符名称而不会更改标识符符号。要获取标识符的符号，请使用符号文字，它只是＃后跟标识符.

### 数据类型判断

> is 关键词来判断类型

```dart
void main(){

  var str=123;
  if(str is String){
    print('是string类型');
  }else if(str is int){
     print('int');
  }else{
     print('其他类型');
  }
}
```

## 运算符

### 算术运算符

```dart
void main(){
  int a=13;
  int b=5;

  print(a+b);   //加
  print(a-b);   //减
  print(a*b);   //乘
  print(a/b);   //除
  print(a%b);   //取余
  print(a~/b);  //取整
}
```

### 关系运算符

```dart
void main(){
  int a=5;
  int b=3;
  print(a==b);   //相等
  print(a!=b);   //不等
  print(a>b);    //大于
  print(a<b);    //小于
  print(a>=b);   //大于等于
  print(a<=b);   //小于等于
}
```

### 逻辑运算符

```dart
void main(){
  /* ! 取反 */ 
  bool flag=false;
  print(!flag);

  /* &&并且:全部为true的话值为true 否则值为false */ 
  bool a=true;
  bool b=true;
  print(a && b);

  /* ||或者：全为false的话值为false 否则值为true */ 
  bool a=false;
  bool b=false;
  print(a || b);

}
```



### 赋值运算符

```dart
void main(){
//  1、基础赋值运算符   =   ??=      
   int a=10;
   int b=3;
   print(a);
   int c=a+b; 

    // b??=23;  表示如果b为空的话把 23赋值给b
    int b=6;
    b??=23;
    print(b);

//2、  复合赋值运算符   +=  -=  *=   /=   %=  ~/=
   var a=13;
   a+=10;
   print(a);
  
  //3.如果++ -- 写在前面 这时候先运算 再赋值，如果++ --写在后面 先赋值后运行运算
    var a=10;
    var b=a--;

    print(a);  //9
    print(b);  //10
}
```



### 条件表达式

```dart
void main(){
  //1、if else   switch case 
  var score=41;
  if(score>90){
    print('优秀');
  }else if(score>70){
     print('良好');
  }else if(score>=60){
    print('及格');
  }else{
    print('不及格');
  }

  var sex="女";
  switch(sex){
    case "男":
      print('性别是男');
      break;
    case "女":
      print('性别是女');
      break;
    default:
      print('传入参数错误');
      break;
  }

  //2、三目运算符 
  bool flag=false;
  String c=flag?'我是true':'我是false';
  print(c);
     
  //3  ??运算符  为空才赋值
  var a;
  var b= a ?? 10;
  print(b);   //10

  var a=22;
  var b= a ?? 10;
  print(b);//22
}
```



### 类型转换

```dart
void main(){
    //1、Number与String类型之间的转换

      // Number类型转换成String类型 toString()
      var myNum=12;
    	var str=myNum.toString();
    	print(str is String);
      // String类型转成Number类型  int.parse()
      String str='123';
      var myNum=int.parse(str);
      print(myNum is int);

      String str='123.1';
      var myNum=double.parse(str);
      print(myNum is double);

    // try  ... catch
    String price='';
     try{
       var myNum=double.parse(price);
       print(myNum);
     }catch(err){
          print(0);
     } 

 // 2、其他类型转换成Booleans类型
        // isEmpty:判断字符串是否为空
        
        // var str='';
        // if(str.isEmpty){
        //   print('str空');
        // }else{
        //   print('str不为空');
        // }

        // var myNum=123;
        // if(myNum==0){
        //    print('0');
        // }else{
        //   print('非0');
        // }

        // var myNum;
        // if(myNum==0){
        //    print('0');
        // }else{
        //   print('非0');
        // }

        // var myNum;
        // if(myNum==null){
        //    print('空');
        // }else{
        //   print('非空');
        // }

        var myNum=0/0;        
        // print(myNum);
        if(myNum.isNaN){
          print('NaN');
        }
}
```

## 循环遍历

### for循环

- 基本语法

```dart
for (int i = 1; i<=100; i++) {   
  print(i);
}
```

- 示例

  ```dart
  void main(){
  
    //1、打印0-50所有的偶数
     for(int i=0;i<=50;i++){
         if(i%2==0){
           print(i);
         }
     }
  
    //2、求 1+2+3+4 +...100的和
      var sum=0;
      for(var i=1;i<=100;i++){
          sum+=i;
      }
      print(sum);
  
    // 3、计算5的阶乘   (1*2*3*4*5    n的阶乘1*2……*n)
  
     var sum=1;
     for(var i=1;i<=5;i++){
         sum*=i;
     }
     print(sum);
  
    //4、打印List  ['张三','李四','王五'] 里面的内容
     List list=['张三','李四','王五'];
     for(var i=0;i<list.length;i++){
       print(list[i]);
     }
  
    //5、打印List 
    List list=[{
      "title":"新闻111"
    },
    {
      "title":"新闻222"
    },
    {
      "title":"新闻333"
    }];
  
    print(list[1]);
  
    for(var i=0;i<list.length;i++){
      print(list[i]['title']);
    }
  
  
    //4、定义一个二维数组 打印里面的内容
          List list=[
            {
                "cate":'国内',
                "news":[
                  {"title":"国内新闻1"},
                  {"title":"国内新闻2"},
                  {"title":"国内新闻3"}
                ]
            },
            {
                "cate":'国际',
                "news":[
                  {"title":"国际新闻1"},
                  {"title":"国际新闻2"},
                  {"title":"国际新闻3"}
                ]
            }
          ];
          for(var i=0;i<list.length;i++){
              print(list[i]["cate"]);
              print('-------------');
              for(var j=0;j<list[i]["news"].length;j++){
                  print(list[i]["news"][j]["title"]);
              }
          }
  }
  ```

  

### while循环

- 基础语法

```dart
while(表达式/循环条件){			
			语句/循环体
}			
    		
do{
	语句/循环体
}while(表达式/循环条件);
```

- 示例

```dart
void main(){

//1、求1+2+3+4 ...+100的和
   int i=1;
   var sum=0;
   while(i<=100){
      sum+=i;
      i++;
   }
   print(sum);


   int ii=1;
   var sum2=0;
   do{
      sum2+=ii;
      ii++;
   }while(ii<=100);
   print(sum2);

  //while 和 do while的区别   第一次循环条件不成立的情况下do while执行一次
    int iii=10;
	  while(iii<2){
	  	print('执行代码');//未执行
	  }

	  var jj=10;	  
	  do{
	  	print('执行代码');//执行
	  }while(jj<2);

}
```

### break & continue

-  **break语句功能:**

​          1、在switch语句中使流程跳出switch结构。

​          2、在循环语句中使流程跳出当前循环,遇到break 循环终止，后面代码也不会执行

​          注意:

​          1、如果在循环中已经执行了break语句,就不会执行循环体中位于break后的语句。

​          2、在多层循环中,一个break语句只能向外跳出一层

​        **break可以用在switch case中 也可以用在 for 循环和 while循环中**

-  **continue语句的功能:**

​          【注】只能在循环语句中使用,使本次循环结束，即跳过循环体重下面尚未执行的语句，接着进行下次的是否执行循环的判断。

​	        *continue可以用在for循环以及 while循环中，但是不建议用在while循环中，不小心容易死循环*

- 示例

  ```dart
  main() {
  
      //1、如果i等于4的话跳过
       for(var i=1;i<=10;i++){
         if(i==4){
           continue;  /*跳过当前循环体 然后循环还会继续执行*/
         }
         print(i);
       }
    
  
  
      //2、如果 i等于4的话跳出循环
       for(var i=1;i<=10;i++){
         if(i==4){
           break;  /*跳出循环体*/
         }
         print(i);
       }
        
  
      //3、break语句只能向外跳出一层
        for(var i=0;i<5;i++){	 	           	
  		   	print('外层---$i');
            for(var j=0;j<3;j++){            
              if(j==1){
                break;
              }
              print('里层$j');	
            }	
  		  }
  
  
  
    //4、while循环 break跳出循环
    var i=1;
    while(i<=10){
      if(i==4){
        break;
      }
      print(i);
      i++;
    }
  
   //5. break跳出switch语句
     var sex="男";
     switch (sex) {
       case "男":
         print('男');
         break;
       case "女":
         print('男');
         break;
       default:
     }
      
  }
  ```

  

## 自定义方法

###  基本格式

```dart
返回类型  方法名称（参数1，参数2,...）{
  方法体
  return 返回值;
}
```

### 示例

```dart
void printInfo(){
  print('我是一个自定义方法');
}

int getNum(){
  var myNum=123;
  return myNum;
}

String printUserInfo(){
  return 'this is str';
}

List getList(){
  return ['111','2222','333'];
}

void main(){
   print(printUserInfo());//this is str

//演示方法的作用域:方法内部可以再定义方法,但作用域仅限外部方法
  void xxx(){
      aaa(){

          print(getList());
          print('aaa');
      }
      aaa();
  }

  // aaa();  错误写法 
  xxx();  //调用方法
}
```

### 方法传参

```dart
main() {
//1、定义一个方法 求1到这个数的所有数的和
  int sumNum(int n){
      var sum=0;
      for(var i=1;i<=n;i++){
        sum+=i;
      }
      return sum;
    } 

    var n1=sumNum(5);
    print(n1);

//2、定义一个带可选参数的方法 ，最新的dart定义可选参数需要指定类型默认值
   String printUserInfo(String username,[int age=0]){  //行参
     if(age!=0){
       return "姓名:$username---年龄:$age";
     }
     return "姓名:$username---年龄保密";
   }
   print(printUserInfo('张三',21)); //实参
   print(printUserInfo('张三'));

//3、定义一个带默认参数的方法
   String printUserInfo(String username,[String sex='男',int age=0]){  //行参
     if(age!=0){
       return "姓名:$username---性别:$sex--年龄:$age";
     }
     return "姓名:$username---性别:$sex--年龄保密";
   }
   print(printUserInfo('张三'));
   print(printUserInfo('小李','女'));
   print(printUserInfo('小李','女',30));

//5、定义一个命名参数的方法，最新的dart定义命名参数需要指定类型默认值

  // String printUserInfo(String username, {int age = 0, String sex = '男'}) {//行参    
  //   if (age != 0) {
  //     return "姓名:$username---性别:$sex--年龄:$age";
  //   }
  //   return "姓名:$username---性别:$sex--年龄保密";
  // }
  // print(printUserInfo('张三', age: 20, sex: '未知'));


//6、实现一个 把方法当做参数的方法

  // var fn=(){
  //   print('我是一个匿名方法');
  // };
  // fn();


  //fn1方法
  fn1() {
    print('fn1');
  }
  //fn2方法
  fn2(fn) {
    fn();
  }
  //调用fn2这个方法 把fn1这个方法当做参数传入
  fn2(fn1);
}

```

### 箭头函数

> 箭头函数内只能写一条语句，并且语句后面没有分号

```dart
void main() {
   List list=['苹果','香蕉','西瓜'];
   list.forEach((value)=>print(value));

  //注意和方法的区别: 箭头函数内只能写一条语句，并且语句后面没有分号(;)
   list.forEach((value)=>{
     print(value)
   });

/*需求：修改下面List里面的数据，让数组中大于2的值乘以2*/
   List list=[4,1,2,3,4];
   var newList=list.map((value)=>value>2?value*2:value);
   print(newList.toList());
}

```



### 匿名方法&自执行方法&递归

```dart
void main() {
  //匿名方法
   var printNum=(){
     print(123);
   };
   printNum();

   var printNum=(int n){
     print(n+2);
   };
   printNum(12);

//自执行方法
  ((int n){
    print(n);
    print('我是自执行方法');
  })(12);

//通过方法的递归 求1-100的和
  var sum=0;
  fn(int n){
      sum+=n;
      if(n==0){
        return;
      }
      fn(n-1);
  }

  fn(100);
  print(sum);
}

```

### 闭包

> 1、全局变量特点:    全局变量常驻内存、全局变量污染全局
>  2、局部变量的特点：  不常驻内存会被垃圾机制回收、不会污染全局
>
> 想实现的功能：
>    1.常驻内存
>    2.不污染全局
>    
> 闭包可以解决这个问题.

**闭包**: 函数嵌套函数, 内部函数会调用外部函数的变量或参数, **实现变量或参数不会被系统回收**(不会释放内存)

**闭包的写法**： 函数嵌套函数，并`return` 里面的函数，这样就形成了闭包。

```dart
/*全局变量*/
var a = 123;

void main() {
  fn(){
    a++;
    print(a);
  }
  fn();//124
  fn();//125
  fn();//126


//闭包
  fn1() {
    var a = 123; /*不会污染全局   常驻内存*/
    return () {//返回一个匿名函数
      a++;
      print(a);
    };
  }

  var b = fn1();
  b();//124
  b();//125
  b();//126
}

```

## 面向对象

面向对象编程(OOP)的三个基本特征是：封装、继承、多态      



- 封装：封装是对象和类概念的主要特性。封装，把客观事物封装成抽象的类，并且把自己的部分属性和方法提供给其他对象调用, 而一部分属性和方法则隐藏。               
- 继承：面向对象编程 (OOP) 语言的一个主要功能就是“继承”。继承是指这样一种能力：它可以使用现有类的功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。       
- 多态：允许将子类类型的指针赋值给父类类型的指针, 同一个函数调用会有不同的执行效果 。





Dart所有的东西都是对象，所有的对象都继承自Object类。



Dart是一门使用类和单继承的面向对象语言，所有的对象都是类的实例，并且所有的类都是Object的子类



一个类通常由属性和方法组成。
