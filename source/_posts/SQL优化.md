title: SQL语句性能提升
date: 2021-01-02 22:10:17
categories: 数据库
toc: true
description: SQL语句性能提升,explain执行计划.
tags: 
   - sql
   - java 

---



# 1.数据准备

> 1). 准备tb_sku表, 导入数据 - 数据1000w
>
> 2). 准备tb_seller表,导入数据 - 数据12条 

# 2.慢查询分析 

## 2.1.show profiles

> **show profiles 是mysql提供可以用来分析当前会话中语句执行的资源消耗情况。可以用于SQL的调优测量,show profiles 能够在做SQL优化时帮助我们了解时间都耗费到哪里去了。**

通过 have_profiling 参数，能够看到当前MySQL**是否支持profile**：

```sql
mysql> select @@have_profiling;
+------------------+
| @@have_profiling |
+------------------+
| YES              |
+------------------+
1 row in set, 1 warning (0.00 sec)
```

默认profiling是关闭的，可以通过set语句在**Session级别开启profiling**： 

```sql
mysql> select @@profiling;
+-------------+
| @@profiling |
+-------------+
|           0 |
+-------------+
1 row in set, 1 warning (0.00 sec)

```

```sql
set profiling=1; //开启profiling 开关；
```

**通过profile，我们能够更清楚地了解SQL执行的过程。**
首先，我们可以执行一系列的操作:

```sql
show databases; 
use db01; 
show tables; 
select * from tb_ksu where id < 5; 
select count(*) from tb_ksu;
```

执行完上述命令之后，再执行`show profiles` 指令， 来查看SQL语句执行的耗时：
通过`show profile for query query_id` 语句可以查看到该SQL执行过程中每个线程的状态和消耗的时间：

```sql
mysql> show profiles;
+----------+------------+---------------------------------+
| Query_ID | Duration   | Query                           |
+----------+------------+---------------------------------+
|        1 | 0.00085725 | show databases                  |
|        2 | 0.00020975 | SELECT DATABASE()               |
|        3 | 0.00121950 | show tables                     |
|        4 | 0.00041000 | select * from t_bill where id<5 |
|        5 | 0.00097875 | select count(*) from t_bill     |
+----------+------------+---------------------------------+
5 rows in set, 1 warning (0.01 sec)
```

```sql
mysql> show profile for query 4;
+--------------------------------+----------+
| Status                         | Duration |
+--------------------------------+----------+
| starting                       | 0.000094 |
| Executing hook on transaction  | 0.000009 |
| starting                       | 0.000010 |
| checking permissions           | 0.000008 |
| Opening tables                 | 0.000042 |
| init                           | 0.000009 |
| System lock                    | 0.000013 |
| optimizing                     | 0.000012 |
| statistics                     | 0.000052 |
| preparing                      | 0.000019 |
| executing                      | 0.000046 |
| end                            | 0.000008 |
| query end                      | 0.000006 |
| waiting for handler commit     | 0.000011 |
| closing tables                 | 0.000040 |
| freeing items                  | 0.000021 |
| cleaning up                    | 0.000013 |
+--------------------------------+----------+
17 rows in set, 1 warning (0.00 sec)
```



> TIP ：
>
> Sending data 状态表示MySQL线程开始访问数据行并把结果返回给客户端，而不仅仅是返回个客户端。 
>
> 由于在Sending data状态下，MySQL线程往往需要做大量的磁盘读取操作，所以经常是整各查询中耗时最长的状态。 
>
> MySQL 的查询优化器可能会对查询进行优化，使得某些步骤（如 `Sending data`）在实际执行过程中被合并或省略，因此在 `SHOW PROFILES` 的结果中可能看不到这些步骤。

在获取到最消耗时间的线程状态后，MySQL支持进一步选择all、cpu、block io 、context switch、page faults等明细类型类查看MySQL在使用什么资源上耗费了过高的时间。例如，选择查看CPU的耗费时间 ： 

```sql
mysql> show profile cpu for query 7;
+--------------------------------+----------+----------+------------+
| Status                         | Duration | CPU_user | CPU_system |
+--------------------------------+----------+----------+------------+
| starting                       | 0.000081 | 0.000074 |   0.000000 |
| Executing hook on transaction  | 0.000009 | 0.000009 |   0.000000 |
| starting                       | 0.000010 | 0.000009 |   0.000000 |
| checking permissions           | 0.000009 | 0.000009 |   0.000000 |
| Opening tables                 | 0.000032 | 0.000032 |   0.000000 |
| init                           | 0.000007 | 0.000007 |   0.000000 |
| System lock                    | 0.000011 | 0.000010 |   0.000000 |
| optimizing                     | 0.000007 | 0.000007 |   0.000000 |
| statistics                     | 0.000016 | 0.000016 |   0.000000 |
| preparing                      | 0.000019 | 0.000019 |   0.000000 |
| executing                      | 0.000070 | 0.000070 |   0.000000 |
| end                            | 0.000006 | 0.000005 |   0.000000 |
| query end                      | 0.000005 | 0.000006 |   0.000000 |
| waiting for handler commit     | 0.000011 | 0.000025 |   0.000000 |
| closing tables                 | 0.000023 | 0.000009 |   0.000000 |
| freeing items                  | 0.000019 | 0.000019 |   0.000000 |
| cleaning up                    | 0.000012 | 0.000012 |   0.000000 |
+--------------------------------+----------+----------+------------+
17 rows in set, 1 warning (0.01 sec)
```

| 字段       | 含义                           |
| ---------- | ------------------------------ |
| Status     | sql 语句执行的状态             |
| Duration   | sql 执行过程中每一个步骤的耗时 |
| CPU_user   | 当前用户占有的cpu              |
| CPU_system | 系统占有的cpu                  |

## 2.2 慢查询日志

> **慢查询日志记录了所有执行时间超过参数 long_query_time 设置值并且扫描记录数不小于**
> **min_examined_row_limit 的所有的SQL语句的日志。long_query_time 默认为 10 秒，最小**
> **为 0， 精度可以到微秒。**

### 2.2.1 文件位置和格式

慢查询日志默认是关闭的 。可以通过两个参数来控制慢查询日志 ： 

```sql
# 该参数用来控制慢查询日志是否开启， 可取值： 1 和 0 ， 1 代表开启， 0 代表关闭 
mysql> select @@slow_query_log;
+------------------+
| @@slow_query_log |
+------------------+
|                0 |
+------------------+
1 row in set (0.00 sec)
# 开启慢查询日志
mysql> set global slow_query_log=1;
Query OK, 0 rows affected (0.00 sec)

# 该参数用来指定慢查询日志的文件名 
mysql> select @@slow_query_log_file;
+--------------------------------------+
| @@slow_query_log_file                |
+--------------------------------------+
| /var/lib/mysql/262222839fb5-slow.log |
+--------------------------------------+
1 row in set (0.00 sec)

# 该选项用来配置查询的时间限制， 超过这个时间将认为是慢查询， 将进行日志记录， 默认10s 
mysql> select @@long_query_time;
+-------------------+
| @@long_query_time |
+-------------------+
|         10.000000 |
+-------------------+
1 row in set (0.00 sec)
# 设置慢查询时间限制
mysql> set long_query_time=11;
Query OK, 0 rows affected (0.00 sec)

```



### 2.2.2 日志的读取

慢查询日志记录的格式也是纯文本，可以被直接读取。

```sql
-- 由于该语句执行时间很短，为0s ， 所以不会记录在慢查询日志中。
select * from tb_sku where id = '100000030074'\G;  -- \G表示换行显示数据
-- 该SQL语句 ， 执行时长为 24.28s ，超过10s ， 所以会记录在慢查询日志文件中。
select * from tb_sku where name like '%HuaWei手机Meta87384 Pro%'\G;
```

3） 查看慢查询日志文件

直接通过cat 指令查询该日志文件 ：

```shell
bash-4.4# cat /var/lib/mysql/262222839fb5-slow.log
/usr/sbin/mysqld, Version: 8.2.0 (MySQL Community Server - GPL). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument
```

![image-20210127233051622](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/uov1YTpgXFAW7bx.png)

如果慢查询日志内容很多， 直接查看文件，比较麻烦， 这个时候可以借助于mysql自带的`mysqldumpslow` 工具， 来对慢查询日志进行分类汇总。

![image-20210127233130483](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/FPJBk3ZUbVK9Eli.png)

# 3. explain执行计划

通过以上步骤查询到效率低的 SQL 语句后，可以通过 `EXPLAIN`或者 DESC命令获取 `MySQL`如何执行 SELECT 语句的信息，包括在 SELECT 语句执行过程中表如何连接和连接的顺序。

查询SQL语句的执行计划 ： 

```sql
explain select * from tb_sku where id = '100000030074';
```

![image-20210127233204260](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/mBeIr3fAGSPZLqt.png)

| 字段          | 含义                                                         |
| ------------- | ------------------------------------------------------------ |
| id            | select查询的序列号，是一组数字，表示的是查询中执行select子句或者是操作表的顺序。 |
| Select_type   | 表示 SELECT 的类型，常见的取值有 SIMPLE（简单表，即不使用表连接或者子查询）、PRIMARY（主查询，即外层的查询）、UNION（UNION 中的第二个或者后面的查询语句）、SUBQUERY（子查询中的第一个SELECT）等 |
| table         | 输出结果集的表                                               |
| **type**      | **表示表的连接类型，性能由好到差的连接类型为( system ---> const-----> eq_ref ------> ref -------> ref_or_null---->index_merge ---> index_subquery -----> range ----->index ------> all )** |
| possible_keys | 表示查询时，可能使用的索引                                   |
| **key**       | **表示实际使用的索引**                                       |
| Key_len       | 索引字段的长度                                               |
| **rows**      | **扫描行的数量**                                             |
| Extra         | 执行情况的说明和描述                                         |

## 3.1 id

-  字段是 select查询的序列号是一组数字表示的是查询中执行select子句或者是操作表的顺序。
  - id 相同表示加载表的顺序是从上到下。
  - id 不同id值越大，优先级越高，越先被执行。
  -  id 有相同，也有不同，同时存在。id相同的可以认为是一组，从上往下顺序执行；在所有的组中，id的值越大，优先级越高，越先执行。

## 3.2 select_type

表示 SELECT 的类型，常见的取值，如下表所示：

![image-20240328173303966](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/image-20240328173303966.png)

## 3.3 type 

显示的是访问类型，是较为重要的一个指标，可取值为：

![image-20240402101255999](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021012123.png)

一般来说， 我们需要保证查询至少达到 range 级别， 最好达到ref

## 3.4  key

- possible_keys : 显示可能应用在这张表的索引， 一个或多个。
-  key ： 实际使用的索引， 如果为NULL， 则没有使用索引。
- key_len : 表示索引中使用的字节数， 该值为索引字段最大可能长度，并非实际使用长度，在不损失精确性的前提下长度越短越好 。

## 3.5 rows

扫描行的数量。

## 3.6 filtered

这个字段表示存储引擎返回的数据在server层过滤后，剩下多少满足查询的记录数量的比例。

# 4. 索引的使用 

## 4.1 概述及作用

MySQL官方对索引的定义为：**索引（index）是帮助MySQL高效获取数据的数据结构（有序）。**在数据之外，数据库系统还维护者满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据， 这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是索引。

**优势：**

1. 类似于书籍的目录索引，**提高数据检索的效率，降低数据库的IO成本**。
2. **通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗**。

**劣势：**

1. 实际上索引也是一张表，该表中保存了主键与索引字段，并指向实体类的记录，所以**索引列也是要占用空间的**。
2. 虽然索引大大提高了查询效率，同时却也**降低更新表的速度**，如对表进行INSERT、UPDATE、DELETE。因为更新表时，MySQL 不仅要保存数据，还要保存一下索引文件每次更新添加了索引列的字段，都会调整因为更新所带来的键值变化后的索引信息。

## 4.2 索引结构

MySQL数据库中默认的存储引擎InnoDB的索引结构为B+树，而根据叶子节点的内存存储不同，**索引类型分为主键索引和非主键索引**。

主键索引的叶子节点存储的是整行数据，在InnoDB中主键索引页被称为聚簇索引。其结构如下：

![image-20210127233731435](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021017134.png)

而非主键索引的叶子节点内容存储的是主键的值，在InnoDB中，非主键索引也被称为二级索引或辅助索引。其结构如下：

![image-20210102114005619](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021020938.png)

## 4.3 验证索引 

在tb_sku表中一共存在1000w的记录 ;

A. 根据主键ID查询速度很快

![image-20210102114138923](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021022295.png)

B. 根据name查询速度变慢

C.对name字段建立索引再次查询,速度很快.

```sql
create index idx_sku_name on tb_sku(name);
```

## 4.4 索引使用规则

没有建立索引之前, 执行计划如下

![image-20210102114309709.png](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021022555.png)

建立索引 : 

```sql
create index idx_seller_name_status_address on tb_seller(name, status, address);
```

### 全值匹配 

对索引中所有列都指定具体值。

该情况下，索引生效，执行效率高。

```sql
explain select * from tb_seller where name='小米科技' and status='1' and address='北京市';
```

#### ![image-20210102114412770](https://i.loli.net/2021/01/27/5wTQco1LvV7FEan.png)



###  最左前缀法则

如果索引了多列，要遵守最左前缀法则。**指的是查询从索引的最左前列开始，并且不跳过索引中的列**(并非要求索引第一字段必须在第一位,出现即可.)。

- 匹配最左前缀法则，走索引：


![image-20210102114537793](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021024524.png)

- 违法最左前缀法则 ， 索引失效:

![image-20210102114555809](https://i.loli.net/2021/01/27/HpVSzP5ctUOxX4C.png)

- 如果符合最左前缀法则，但是出现跳跃某一列，只有最左列索引生效：

![image-20210102114620872](https://i.loli.net/2021/01/27/RcKYmrQLfxqtUDT.png)

### 范围查询右边的列，不能使用索引 

![image-20210102114702779](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021026514.png)

根据前面的两个字段name ， status 查询是走索引的， 但是最后一个条件address 没有用到索引。

### 在索引列上进行运算操作索引将失效

![image-20210102114742534](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021027956.png)

### 字符串不加单引号造成索引失效

![image-20210102114759976](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021027308.png)

由于，在查询时，没有对字符串加单引号，MySQL的查询优化器，会自动的进行类型转换，造成索引失效。

### 使用or使索引失效

**用or分割开的条件， 如果or前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被用到。**

示例，name字段是索引列 ， 而createtime不是索引列，中间是or进行连接是不走索引的 :

```sql
explain select * from tb_seller where name='黑马程序员' or createtime = '2088-01-01 12:00:00'\G;
```

![image-20210102114914453](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021028901.png)

### 以%开头的Like模糊查询索引失效

**如果仅仅是尾部模糊匹配，索引不会失效。如果是头部模糊匹配，索引失效。**

![image-20210102114937160](https://i.loli.net/2021/01/27/5eQYGLuVTdZ3bKJ.png)

- 解决方案 ：

  通过覆盖索引来解决

![image-20210102115000614](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021028374.png)

### 如果MySQL评估使用索引比全表更慢则不使用索引。

![image-20210102115253554](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021029654.png)

### is NULL, is NOT NULL 有时索引失效。

![image-20210102115311582](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021029056.png)

###  in , not in 有时索引失效

![image-20210102115328409](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021029669.png)

### 尽量使用覆盖索引避免select \*

尽量使用**覆盖索引**（只访问索引的查询（索引列完全包含查询列）），减少select * 。

![image-20210102115353112](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021029274.png)

如果查询列，超出索引列，也会降低性能。

> TIP :
>
> using index ：使用覆盖索引的时候就会出现 
>
> using where：在查找使用索引的情况下，需要回表去查询所需的数据 
>
> using index condition：查找使用了索引，但是需要回表查询数据 
>
> using index ; using where：查找使用了索引，但是需要的数据都在索引列中能找到，所以不需要回表查询数据 

## 4.5 索引设计原则

- 对查询频次较高，且数据量比较大的表建立索引。

- 索引字段的选择，最佳候选列应当从where子句的条件中提取，如果where子句中的组合比较多，那么应当挑选最常用、过滤效果最好的列的组合。

- 使用唯一索引，区分度越高，使用索引的效率越高。
- 索引可以有效的提升查询数据的效率，但索引数量不是多多益善，索引越多，维护索引的代价自然也就水涨船高。对于插入、更新、删除等DML操作比较频繁的表来说，索引过多，会引入相当高的维护代价，降低DML操作的效率，增加相应操作的时间消耗。另外索引过多的话，MySQL也会犯选择困难病，虽然最终仍然会找到一个可用的索引，但无疑提高了选择的代价。
- 使用短索引，索引创建之后也是使用硬盘来存储的，因此提升索引访问的I/O效率，也可以提升总体的访问效率。假如构成索引的字段总长度比较短，那么在给定大小的存储块内可以存储更多的索引值，相应的可以有效的提升MySQL访问索引的I/O效率。
- 利用最左前缀，N个列组合而成的组合索引，那么相当于是创建了N个索引，如果查询时where子句中使用了组成该索引的前几个字段，那么这条查询SQL可以利用组合索引来提升查询效率。

# 5. 常见的SQL优化 

## 5.1 环境准备 

```sql
CREATE TABLE `emp` ( 
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `name` varchar(100) NOT NULL, `age` int(3) NOT NULL, 
  `salary` int(11) DEFAULT NULL, PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert into `emp` (`id`, `name`, `age`, `salary`) values('1','Tom','25','2300'); 
insert into `emp` (`id`, `name`, `age`, `salary`) values('2','Jerry','30','3500'); 
insert into `emp` (`id`, `name`, `age`, `salary`) values('3','Luci','25','2800');
insert into `emp` (`id`, `name`, `age`, `salary`) values('4','Jay','36','3500');
insert into `emp` (`id`, `name`, `age`, `salary`) values('5','Tom2','21','2200'); 
insert into `emp` (`id`, `name`, `age`, `salary`) values('6','Jerry2','31','3300');
insert into `emp` (`id`, `name`, `age`, `salary`) values('7','Luci2','26','2700'); 
insert into `emp` (`id`, `name`, `age`, `salary`) values('8','Jay2','33','3500'); 
insert into `emp` (`id`, `name`, `age`, `salary`) values('9','Tom3','23','2400'); 
insert into `emp` (`id`, `name`, `age`, `salary`) values('10','Jerry3','32','3100'); 
insert into `emp` (`id`, `name`, `age`, `salary`) values('11','Luci3','26','2900');
```

## 5.2 order by优化

### 5.2.1 两种排序方式

1). 第一种是通过对返回数据进行排序，也就是通常说的 filesort 排序，所有不是通过索引直接返回排序结果的排序都叫 FileSort 排序。

![image-20210102115948644](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021030509.png)

2). 第二种通过有序索引顺序扫描直接返回有序数据，这种情况即为 using index，不需要额外排序，操作效率高。

![image-20210102120019132](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021030574.png)

多字段排序

![image-20210102120101808](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021030818.png)

了解了MySQL的排序方式，优化目标就清晰了：尽量减少额外的排序，通过索引直接返回有序数据。

where 条件和Order by 使用相同的索引，并且Order By 的顺序和索引顺序相同， 并且Order by 的字段都是升序，或者都是降序。否则肯定需要额外的操作，这样就会出现FileSort。

### 5.2.2 Filesort 的优化

通过创建合适的索引，能够减少 Filesort 的出现，但是在某些情况下，条件限制不能让Filesort消失，那就需要加快 Filesort的排序操作。对于Filesort ， MySQL 现在采用的是一次扫描算法：一次性取出满足条件的所有字段，然后在排序区 sort buffer 中排序后直接输出结果集。排序时内存开销较大，但是排序效率比两次扫描算法要高。

MySQL 通过比较系统变量 max_length_for_sort_data 的大小和Query语句取出的字段总大小， 来判定是否那种排序算法，如果max_length_for_sort_data 更大，那么使用第二种优化之后的算法；否则使用第一种。

可以适当提高 sort_buffer_size 和 max_length_for_sort_data 系统变量，来增大排序区的大小，提高排序的效率。

![image-20210102120229796](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021031148.png)

## 5.3 group by优化

由于GROUP BY 实际上也同样会进行排序操作，而且与ORDER BY 相比，GROUP BY 主要只是多了排序之后的分组操作。当然，如果在分组的时候还使用了其他的一些聚合函数，那么还需要一些聚合函数的计算。所以，在GROUP BY 的实现过程中，与 ORDER BY 一样也可以利用到索引。

如果查询包含 group by 但是用户想要避免排序结果的消耗， 则可以执行order by null 禁止排序。如下 ：

```sql
explain select age,count(*) from emp group by age;
```

![image-20210102120357530](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021032297.png)

优化后:

```sql
explain select age,count(*) from emp group by age order by null;
```

![image-20210102120425871](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021032507.png)

从上面的例子可以看出，第一个SQL语句需要进行"filesort"，而第二个SQL由于order by null 不需要进行 "filesort"， 而上文提过Filesort往往非常耗费时间。

创建索引 ： 

```sql
create index idx_emp_age_salary on emp(age,salary);
```

![image-20210102120521652](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021032752.png)

## 5.4 limit优化

limit分页操作, 越往后, 性能越低 :

优化方案: 

```sql
select * from tb_sku t , (select id from tb_sku order by id limit 9000000,1) a where t.id = a.id;
```

## 5.5 count优化

在很多的业务系统中，都需要考虑进行分页操作，但是当我们执行分页操作时，都需要进行一次count操作，求取总记录数，如果数据库表的数据量大，在InnoDB引擎中，执行count操作的性能是比较低的，需要遍历全表数据，对计数进行累加。

优化方案：

①. 在大数据量的查询中，只查询数据， 而不展示总记录数 ； 

②. 通过缓存redis维护一个表的计数，来记录数据库表的总记录数，在执行插入/删除时，需要动态更新；

③. 在数据库表中定义一个大数据量的计数表，在执行插入/删除时，需要动态更新。

弊端:无法满足各种带where条件的count查询.

## 5.6 大批量插入优化

使用load命令!

环境准备:

```sql
CREATE TABLE `tb_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT, 
  `username` VARCHAR(50) NOT NULL, 
  `password` VARCHAR(50) NOT NULL, 
  `name` VARCHAR(20) NOT NULL, 
  `birthday` DATE DEFAULT NULL,
  `sex` CHAR(1) DEFAULT NULL, 
  PRIMARY KEY (`id`), 
  UNIQUE KEY `unique_user_username` (`username`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 ;
```

Load使用:

```sql
-- fields terminated by ',' lines terminated by '\n'可自定义别的符号.
load data local infile '/root/sql1.log' into table `tb_user` fields terminated by ',' lines terminated by '\n';
```

### 5.6.1 对于 InnoDB 类型的表，有以下几种方式可以提高导入的效率：

#### 1） 主键顺序插入

因为InnoDB类型的表是按照主键的顺序保存的，所以将导入的数据按照主键的顺序排列，可以有效的提高导入数据的效率。如果InnoDB表没有主键，那么系统会自动默认创建一个内部列作为主键，所以如果可以给表创建一个主键，将可以利用这点，来提高导入数据的效率。



![image-20210102121542033](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021033432.png)

![image-20210102121518728](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021033016.png)

#### 2) 关闭唯一性校验

在导入数据前执行 SET UNIQUE_CHECKS=0，关闭唯一性校验，在导入结束后执行 SET UNIQUE_CHECKS=1，恢复唯一性校验，可以提高导入的效率。

![image-20210102121608494](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021034009.png)

#### 3) 手动提交事务

如果应用使用自动提交的方式，建议在导入前执行 SET AUTOCOMMIT=0，关闭自动提交，导入结束后再执行 SET AUTOCOMMIT=1，打开自动提交，也可以提高导入的效率。

![image-20210102121630297](https://nohurry-imgbed.oss-cn-qingdao.aliyuncs.com/imgs/202404021034051.png)