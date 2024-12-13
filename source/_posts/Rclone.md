title: Rclone
date: 2024-3-27 15:56:17
categories: 折腾
toc: true
description: 
tags: 
	- rclone


---

# 简介

[官网](https://rclone.org/)

[中文站](https://www.rclone.cn/)

[GitHub项目地址](https://github.com/rclone/rclone)

[下载地址](https://rclone.org/downloads/)

rclone是一个命令行程序，用于同步文件和目录，管理各种云存储服务。

rclone 支持多种文件传输方式，包括复制，同步，移动，删除文件。它还支持文件加密和压缩，支持分块上传和分块下载，可以暂停和恢复传输，支持文件的校验和合并。

rclone 的主要优势在于它的灵活性和可扩展性。它可以用来做很多事情，包括备份，文件同步，数据迁移等。它可以在各种平台上运行，包括 Windows，macOS，Linux，FreeBSD，NetBSD 等。

rclone 的配置简单，可以使用命令行或者配置文件来配置。使用 rclone 可以非常方便的操作云存储，支持的命令也非常丰富，使用起来非常方便。

简单来讲，主要的功能如下：

- 将文件备份（和加密）到云存储
- 从云存储还原（和解密）文件
- 将云数据镜像到其他云服务或本地
- 将数据迁移到云，或在云存储供应商之间迁移
- 将多个、加密、缓存或不同的云存储挂载为磁盘
- 使用 lsf、ljson、size、ncdu 分析和核算云存储上保存的数据
- 将文件系统合并在一起，将多个本地和/或云文件系统呈现为一个

# 安装

这个工具就是一个二进制文件，可以直接[下载](https://rclone.org/downloads/)使用.

## windows

## mac

`brew install rclone`

验证安装成功

```shell
❯ rclone -V
rclone v1.66.0
- os/version: darwin 13.3.1 (64 bit)
- os/kernel: 22.4.0 (arm64)
- os/type: darwin
- os/arch: arm64 (ARMv8 compatible)
- go/version: go1.22.1
- go/linking: dynamic
- go/tags: none
```



# 可同步网盘

- Amazon Drive
- Amazon S3
- Backblaze B2
- Box
- Ceph
- [DigitalOcean](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-DigitalOcean.html&source=article&objectId=1764095) Spaces
- Dre[amh](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-amh.html&source=article&objectId=1764095)ost
- Dropbox
- FTP
- [Google](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-Google.html&source=article&objectId=1764095) Cloud Storage
- [Google Drive](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-Google-Drive.html&source=article&objectId=1764095)
- HTTP
- Hubic
- Jottacloud
- [IBM](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-IBM.html&source=article&objectId=1764095) COS S3
- Memset Memstore
- Mega
- Microsoft Azure Blob Storage
- Microsoft [OneDrive](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-OneDrive.html&source=article&objectId=1764095)
- Minio
- [Nextcloud](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-Nextcloud.html&source=article&objectId=1764095)
- OVH
- OpenDrive
- Openstack Swift
- Oracle Cloud Storage
- ownCloud
- pCloud
- put.io
- QingStor
- Rackspace Cloud Files
- SFTP
- Wasabi
- WebDAV
- Yandex Disk
- The local filesystem

# 常用的rclone命令

- rclone config : 配置会话；
- rclone config file : 显示配置文件的路径，一般配置文件默认为 ~/.config/rclone/rclone.conf
- rclone config show : 显示配置文件信息
- rclone copy : 将文件从原文件夹复制至目标文件夹，跳过已复制的文件；
- rclone sync : 将文件从原文件夹同步至目标文件夹，只修改目的地；
- rclone move : 将文件从原文件夹移动至目标文件夹；
- rclone delete : 删除路径中的内容；
- rclone purge : 清空指定路径下的所有文件数据；
- rclone mkdir : 创建一个新目录； 
- rclone rmdir : 删除一个空目录；
- rclone rmdirs : 删除路径下的所有空目录；
- rclone check : 检查源和目标的数据是否匹配；
- rclone ls : 列出指定路径下所有的文件包含文件的大小及路径；
- rclone lsd : 列出路径中的所有目录containers和buckets；
- rclone lsl : 列出具有大小、修改时间和路径中的所有对象；
- rclone md5sum : 为路径中的所有对象生成一个md5sum文件；
- rclone sha1sum : 为路径中的所有对象生成一个sha1sum文件；
- rclone size : 返回远程路径中对象的总大小和数量；
- rclone version : 显示版本号；
- rclone cleanup : 如果可能的话，清理remote；
- rclone d[edu](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-edu.html&source=article&objectId=1764095)pe : 交互式查找[重复文件](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-%E9%87%8D%E5%A4%8D%E6%96%87%E4%BB%B6.html&source=article&objectId=1764095)并删除重命名它们；
- rclone authorize : 远程认证；
- rclone cat : 连接文件并将它们发送到stdout；
- rclone copyto : 将文件从源复制到目标，跳过已复制的文件；
- rclone genautocomplete : rclone输出完成脚本；
- rclone gendocs : rclone将markdown文档输出到所提供的目录；
- rclone listremotes : 列出所有远程的配置文件；
- rclone mount : 将远程目标挂载至本地；
- rclone moveto : 将文件或目录从源移动至目标；
- rclone obscure : 在rclone.conf文件中使用模糊密码；
- rclone cryptcheck : 检验远程认证；
- rclone about : 获取配额信息；

# 选项

## –backup-dir=DIR

当使用`sync、copy or move`时，所有涉及到覆盖或删除的文件变动，原始文件会被移动到`--backup-dir=DIR`选项所设置的目录中，如果设置了后缀选项`--suffix`，则在文件后缀附加指定字符串，例如原文件’abc.txt’，如果指定`--suffix 20181101`，则[备份](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-%E5%A4%87%E4%BB%BD.html&source=article&objectId=1764095)后的文件名全称为”abc.txt20181101”      # 同步本地目录至远程目录current的文件，并且备份已经覆盖或删除文件至远程old文件夹中     $ rclone sync /path/to/local remote:current --backup-dir remote:old     # 同步本地目录“./"至远程”test“目录，覆盖或删除的文件移动至远程old文件夹中，并将后缀名后附加”20181108“     $ sudo rclone sync ./ One:test --backup-dir One:old --suffix 20181108  

## –bind string

要绑定到输出连接的本地地址。这可以是IPv4地址、IPv6地址或主机名。如果主机名没有解析或解析为多个IP地址，则会出错。

## –bwlimit=BANDWIDTH_S[PE](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-PE.html&source=article&objectId=1764095)C

此选项控制带宽限制。限制可以通过两种方式指定：单个限制或依据时间表限制。指定带宽限制单位为kBytes/s，或使用后缀b、k、M、G，默认值为0，表示不限制带宽。例如，要将带宽限制为10MB/s，则使用–bwlimit 10M。

还可以指定限制的”时间表“，这将导致在某些时间应用某些限制。要指定时间表，请将条目格式设置为”WEEKDAY-HH:MM, BANDWIDTH WEEKDAY-HH:MM, BANDWIDTH…“，其中：WEEKDAY是可选元素。它可以写成整个世界或仅使用3个第一个字符。HH:MM从00：00到23：59是一小时。

例1：如下时间表避免白天工作时间，早8:00限制带宽512kBytes/sec，12:00限制提升至10M，下午13:00降至512kBytes/sec，18:00提升至30M，在23:00开始完全禁用，网络全速运行。      --bwlimit "08:00,512 12:00,10M 13:00,512 18:00,30M 23:00,off"  

例2：周一带宽限制为512kBytes/sec，周五结束前提升至10Mbytes/s。周日10:00，它将设置为1Mbyte/s。从周日的20：00起将是无限的。      --bwlimit "Mon-00:00,512 Fri-23:59,10M Sat-10:00,1M Sun-20:00,off"  

例3：等价于例4      --bwlimit "Mon-00:00,512 12:00,1M Sun-20:00,off"  

例4：      --bwlimit "Mon-00:00,512 Mon-12:00,1M Tue-12:00,1M Wed-12:00,1M Thu-12:00,1M Fri-12:00,1M Sat-12:00,1M Sun-12:00,1M Sun-20:00,off"  

带宽限制仅适用于数据传输。它们不适用于目录列表的带宽。注意，这些单位是字节/秒,而不是比特/秒。通常连接是以比特/秒来测量的，转换时需要除以8。例如10Mbit/s连接，那么在指定参数时需要计算10/8=1.25Mbyte/s，即”–bwlimit 1.25M“

在Unix系统（[Linux](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-Linux.html&source=article&objectId=1764095), MacOS, …）上，可以通过向rclone发送SIGUSR2信号来切换带宽限制器。它允许消除长时间运行的rclone传输的限制，并在需要时将其恢复为使用`--bwlimit`指定的值。假设只有一个rclone实例在运行，你可以像这样切换限制器：      kill -SIGUSR2 $(pidof rclone)  

通过如下配置可以动态更改bwlimit      rclone rc core/bwlimit rate=1M  

## –buffer-size=SIZE

设置缓冲区大小来加速文件传输。每个-transfer都会使用这么多内存来缓冲。当使用mount或cmount时，每个打开的文件描述符将使用设置的缓冲区大小的内存进行缓冲。设置为0可禁用最小内存使用的缓冲。

## –checkers=N

并行运行的检查器数量。检查程序在同步期间对文件进行等同性检查。对于某些存储系统（例如S3, Swift, Dropbox），这可能需要很长时间才能并行运行。默认是并行运行8个检查程序。

## -c, –checksum

通常，rclone会查看文件的修改时间和大小，以查看它们是否相等。如果设置此标志，则rclone将检查文件哈希和大小以确定文件是否相等。当远程不支持设置修改时间并且需要比仅检查文件大小更准确的同步时，这非常有用。

当在对象上存储相同散列类型的远程之间进行传输时，这非常有用，例如Drive和Swift。有关哪些远程控制支持哪种散列类型的详细信息，[请参阅概述部分中的表](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Frclone.org%2Foverview%2F&source=article&objectId=1764095)。

例如`rclone --checksum sync s3:/bucket swift:/bucket`比没有–checksum标志的运行得快的多。使用些标志时，如果远程文件不正常，rclone将不会更新远程文件的mtimes。

## –config=CONFIG_FILE

指定rclone配置文件的位置。通常配置文件位于主目录中.config/rclone/rclone.conf，如果设置了XDGCONFIGHOME，它将位于XDG_CONFIG_HOME/rclone/rclone.conf

如果您运行rclone -h并查看–config选项帮助，您将看到默认位置的位置。使用此标志可覆盖配置位置，例如`rclone --config='.myconfig"`

## –contimeout=TIME

设置连接超时时间。TIME为时间格式，5秒参数为5s，10分钟为10m或3h30m。连接超时是rclone等待连接进入远程[对象存储](https://cloud.tencent.com/product/cos?from_column=20065&from=20065)系统的时间。默认为1m（1分钟）

## –dedupe-mode MODE

运行重复数据删除命令模式。模式分为interactive, skip, first, newest, oldest, rename。缺省为interactive（交互式）

## –disable FEATURE, FEATURE, …

禁用以逗号分隔的可选功能列表。例如：禁用[服务器](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-%E6%9C%8D%E5%8A%A1%E5%99%A8.html&source=article&objectId=1764095)端move和[服务器](https://cloud.tencent.com/act/pro/promotion-cvm?from_column=20065&from=20065)copy的使用：      --disable move, copy  

查看可以禁用哪些功能的列表：      --disable help  

请[参阅概览功能](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Frclone.org%2Foverview%2F%23features&source=article&objectId=1764095)和[可选功能](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Frclone.org%2Foverview%2F%23optional-features&source=article&objectId=1764095)，了解哪个功能能做到什么。 此标志可用于调试和特殊情况（例如Google Drive将服务器端copy总量限制为100GB/天）

## -n, –dry-run

进行试运行而不进行永久性更改。使用它来查看rclone在没有实际操作的情况下会做什么。设置同步命令以删除目标中的文件时很有用。

## –ignore-checksum

通常，rclone会检查传输文件的校验和是否匹配，如果没有，则会在传输时出现”损坏“错误。您可以使用些选项跳过该检查。您应该只在遇到”传输损坏“错误消息时才使用它，并且您确定可能要传输可能已损坏的数据。

## –ignore-existing

使用此选项将使rclone无条件地跳过目标上存在的所有文件，无论这些文件的内容如何。虽然这不是一般推荐的选项，但在文件因加密而发生变化的情况下，它可能很有用。但是，如果传输中断，则无法纠正部分传输。

## –ignore-size

通常，rclone会查看文件的修改时间和大小，以查看它们是否相等。如果设置此标志，则rclone将仅检查修改时间。如果设置–checksum，那么它只检查checksum。它还会导致rclone跳过验证传输后大小相同。

这对于向[OneDrive](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fonedrive.live.com%2F&source=article&objectId=1764095)传输文件和从OneDrive传输文件非常有用，OneDrive偶尔会误报图像文件的大小([有关详细信息，请参阅#399])[[https://github.com/ncw/rclone/issues/399\]](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fgithub.com%2Fncw%2Frclone%2Fissues%2F399]&source=article&objectId=1764095)

## -i, –ignore-times

使用此选项将导致rclone无条件地上载所有文件，而不管目标上的文件状态如何。通常，rclone会跳过任何具有相同修改时间且大小相同的文件（如果使用–checksum，则具有相同的checksum）。

## –immutable

将源文件和目标文件视为不可变并禁止修改。设置此选项后，将根据请求创建和删除文件，但永远不会更新现有文件。如果源和目标之间的现有文件不匹配，则rclone将给出错误源和目标存在但不匹配：修改了不可变文件。

请注意，只有传输文件的命令（例如sync、copy、move）才会受到此行为影响，并且只允许修改。文件仍然可以被明确删除（例如delete、purge）或隐式删除（例如sync、move）。如果需要避免删除和修改，请使用copy -immutable。

这用作不可变或仅附加数据集（特别是备份存档）的附加保护层，其中修改意味着损坏并且不应传播。

## –leave-root

在rmdirs中，即使它是空的，它也不会删除根目录。

## –log-file=FILE

将输出记录输出至FILE。默认情况下，此选项无效。这对于跟踪同步和-v标志的问题非常有用。有关详细信息，请参阅[“日志记录部分”](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Frclone.org%2Fdocs%2F%23logging&source=article&objectId=1764095)。

请注意，如果您使用logrotate程序来[管理](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-%E7%AE%A1%E7%90%86.html&source=article&objectId=1764095)rclone的[日志](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-%E6%97%A5%E5%BF%97.html&source=article&objectId=1764095)，那么您应该使用copytruncate选项，因为rclone没有旋转日志的信号。

## –log-format LIST

日志格式选项是以逗号来分隔的列表。date, time, microseconds, longfile, shortfile, UTC。默认为“date,time”

## –log-level LEVEL

设置rclone的日志级别：默认的日志级别为NOTICE（警告）

1. DEBUG（调试）：等效于-vv。它输出大量的调试信息及有用的[bug](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-bug.html&source=article&objectId=1764095)报告，并真正打出rclone正在做什么。
2. INFO（信息）：等效于-v。它全出差于每个传输的信息，默认情况下每分钟打印一次STATS。
3. NOTICE（警告）：如果没有提供日志标志，则为默认日志级别。当工作时它输出的信息有限，只输出警告及重要的信息。
4. ERROR（错误）：等效于-q。它只输出错误消息。

## –low-level-retries NUMBNER

这个选项可以控制rclone的低级重试次数，它用于重试失败的操作，通常是一个HTTP请求。例如，这可能是上传大文件的一部分。你将在日志中看到带有-v标志的低级重试。 这不应该从正常操作中的默认值更改。但是，如果您进行了大量的低级重试，则可能希望减小该值，以便rclone更快的进行高级重试，请参阅–retries标志。

禁用低次重试，使用命令`--low-level-retries 1`

## –max-backlog=N

设定检测或传输用于sync、copy或move的最大的的排队等候的文件积压。你可以任意设定它，它只会在队列使用的时候占用内存。需要注意的是，当使用积压时，它将以数字N单位kb的内存顺序完成。

设置N的值越大则rclone可以能够更准确地计算待处理文件的数量，并能够更精准地预估完成时间。N值越小则rclone同步至远程列表的越快。

## –max-delete=N

设置rclone不要删除超过N个文件。如果超出限制，那么返回错误信息并且rclone将停止正在进行的操作。

## –max-depth=N

设置除了purge（清空）命令之外所有命令的递归深度。例如：`rclone --max-depth 1 ls remote:path`命令，它只能看到远程设定目录中的顶级目录文件，使用`--max-depth 2`则意味着您将看到两层目录级别中的所有文件，依次类推。

由于历史的原因，lsd命令默认使用`--max-depth`为1，您可以使用命令行标志覆盖它。也可以使用`--max-depth 1`命令来禁用递归操作。需要注意的是，如果与sync并使用–delete-excluded一起使用，则会将未递归的文件视为已经排除，并将在目标上删除。如果你不确定会发生什么，请先使用–dry-run进行测试。

## –max-transfer=SIZE

设定传输的最大值，rclone当达到指定的大小时，它将停止传输，并将退出代码标记为8。默认为关闭。

## –modify-window=TIME

检查文件是否已被修改时，这是文件可以具有的最大允许时间差，仍然被视为等效。默认值为1ns，除非被远程控制覆盖。 例如，OS X仅将修改时间存储到最近的秒，因此如果您正在读取和写入OSX文件系统，则默认情况下这将是1秒。此命令行标志允许您覆盖该计算的默认值。

## –no-gzip-en[coding](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-coding.html&source=article&objectId=1764095)

不要设置Accept-Encoding：gzip。 这意味着rclone不会自动向服务器请求压缩文件。如果您已将服务器设置为使用Content-Encoding返回文件：gzip但您上传了压缩文件，则非常有用。没有必要在正常操作中设置它，这样做会降低rclone的网络传输效率。

## –no-update-modtime

使用此标志时，如果远程文件不正常，rclone将不会更新远程文件的修改时间。如果远程与其他[工具](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fxtboke.cn%2Ftag-%E5%B7%A5%E5%85%B7.html&source=article&objectId=1764095)同步（例如Google Drive客户端），则可以使用此功能。

## -P, –progress

此标志使rclone更新终端中静态块中的统计信息，提供传输的实时概述。任何日志消息都将在静态块上方滚动。 日志消息会将静态块向下推到终端的底部。通常每500mS更新一次，但可以使用–stats标志覆盖此期间。这可以与–stats-one-line标志一起使用，以实现更简单的显示。注意：在Windows上，在修复此错误之前，所有非ASCII字符都将替换为。 当–progress正在使用时。

## -q, –quiet

通常，rclone输出统计信息和完成消息。 如果设置此标志，它将尽可能少地输出。

## –retries int

如果失败多次失败，则重试整个同步（默认值为3）。一些遥控器可能不可靠，一些重试有助于获取由于错误而未被转移的文件。使用–retries 1禁用重试。

## –retries-sleep=time

这将设置–retries指定的每次重试之间的间隔默认值为0.使用0禁用。

## –size-only

通常，rclone会查看文件的修改时间和大小，以查看它们是否相等。 如果设置此标志，则rclone将仅检查大小。这可以用于从Dropbox传输文件，这些文件已经被桌面同步客户端修改，该客户端没有像rclone那样设置修改时间的校验和。

## –stats=TIME

传输数据（sync, copy, copyto, move, moveto）的命令将定期打印数据传输统计信息以显示其进度。默认值为1m，使用0禁用。如果设置统计间隔，则所有命令都可以显示统计信息。这在运行其他命令，检查或安装时非常有用。

默认情况下，统计信息记录在INFO级别，这意味着它们不会以默认日志级别显示NOTICE。使用–stats-log-level NOTICE或-v使它们显示。有关日志级别的详细信息，请参阅[“日志记录”](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Frclone.org%2Fdocs%2F%23logging&source=article&objectId=1764095)部分。

请注意，在macOS上，你可以发送SIGINFO(通常是终端中的ctrl-T)以立即打印统计信息。

## –stats-file-name-length integer

默认情况下，-stats输出将截断超过40个字符的文件名和路径。 这相当于提供–stats-file-name-length 40.使用–stats-file-name-length 0禁用由stats打印的文件名截断。

## –stats-log-level string

日志级别显示–stats输出。 这可以是DEBUG，INFO，NOTICE或ERROR。 默认值为INFO。 这意味着在默认的日志记录级别，即注意，统计信息将不会显示 - 如果您希望它们使用–stats-log-level NOTICE。 有关日志级别的详细信息，请参阅[“日志记录”](https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Frclone.org%2Fdocs%2F%23logging&source=article&objectId=1764095)部分。

## –stats-one-line

指定此值后，rclone会将统计信息压缩为一行，仅显示最重要的统计信息。

## –stats-unit=bits|bytes

默认情况下，数据传输速率将以bytes/s打印。此选项允许以bit/s打印数据速率

## –suffix=SUFFIX

这仅适用于–backup-dir。 如果未设置，则–backup-dir将使用其原始名称移动文件。 如果已设置，则文件将添加SUFFIX。有关详细信息，请参阅–backup-dir。

## –syslog

在功能强大的操作系统（不是Windows或Plan9）上，将所有日志输出发送到syslog。这对于在脚本或rclone挂载中运行rclone非常有用。

## –syslog-facility string

如果使用–syslog，则设置syslog工具（例如KERN，USER）。 请参阅man syslog以获取可能的设施列表。 默认设施是DAEMON。

## –tpslimit float

每秒限制HTTP事务。 默认值为0，用于表示每秒无限制的事务数。例如，要将rclone限制为每秒10个HTTP事务使用–tpslimit 10，或者每2秒限制1个事务使用–tpslimit 0.5。当rclone每秒的事务数导致[云存储](https://cloud.tencent.com/product/cos?from_column=20065&from=20065)提供程序出现问题时（例如，禁止您或限制速率），请使用此选项。这对于rclone mount来控制使用它的应用程序的行为非常有用。另见–tpslimit-burst。

## –tpslimit-burst int

–tpslimit的最大交易次数。 （默认1） 通常–tpslimit将完成指定的每秒事务数。 但是，如果你提供–tps-burst，那么rclone可以在空闲时保存一些事务，从而提供一个高达所提供参数的突发。例如，如果你提供–tpslimit-burst 10那么如果rclone已经空闲超过10 *  -tpslimit那么它可以在它们再次受限之前非常快地完成10个事务。 这可用于提高–tpslimit的性能，而不会更改每秒的长期平均事务数。

## –track-renames

默认情况下，rclone不会跟踪重命名的文件，因此如果您在本地重命名文件然后将其同步到远程文件，rclone将删除远程文件上的旧文件并上传新副本。

如果您使用些标志，并且远程支持服务器端副本或服务器端移动，并且源和目标具有兼容的哈希，则这将在同步操作期间跟踪重命名并执行服务器端重命名。文件将按大小和哈希匹配，如果两者都不匹配，则将考虑重命名。

如果目标不支持服务器端复制或移动，则rclone将回退到默认行为并将错误级别消息记录到控制台。注意：–track-renames不支持加密。

## –delete-(before, during, after)

此选项允许您指定在同步文件夹时删除目标上的文件时间。在开始传输任何新文件或更新文件之前，指定值–delete-before将删除目标上存在的所有文件，但不删除源文件。这使用两次通过文件系统，一次用于删除，一次用于复制。

指定–delete-during将在检查和上载文件时删除文件。这是最快的选项，使用的内存最少。

指定–delete-after（默认值）将延迟删除文件，直到成功传输所有新的/更新的文件。要删除的文件将在复制传递中收集，然后在复制传递成功完成后删除。要删除的文件保存在内存中，因此此模式可能会占用更多内存。这是最安全的模式，因为如果之后没有错误，它只会删除文件。如果在删除开始之前出现错误，那么由于存在IO错误，您将收不到删除文件的消息。

## –fast-list

任何涉及目录列表的事件（例如sync, copy, ls ）时，rclone通常会列出一个目录并在使用更多目录列表处理任何子目录之前对其进行处理。这可以并行化，前且使用最少的内存可以非常快速地工作。

但是，某些云存储可以在一个（或少量）事务中列出目录下的所有文件。它些往往是基于bucket的云存储（例如S3, B2, GCS, Swift, Hubic）。

如果使用–fast-list标志，则rclone将使用些方法列出目录。这将对列表产生以下影响：

- 它将使用更少的交易
- 它将使用更多内存，rclone必须将整个列表加载到内存中
- 它可能更快，因为它使用更少的事务
- 它可能会更慢，因为它无法并行化
- rclone应始终使用和不使用–fast-list提供相同的结果

如果您为交易付费并且可以将整个同步列表放入内存中，则建议使用–fast-list。如果你有一个非常大的同步，那么不要使用–fast-list否则你将耗尽内存。如果你在不支持的的云存储上使用–fast-list，那么rclone将忽略它。

## –timeout=TIME

此参数将设置IO空闲超过。如果传输已经开始但是在这么长时间内变为空闲，则认为它已断开并断开连接。默认为5分钟，设置0为禁用。

## –transfers=N

并行运行的文件传输数。如果云存储提供大量超时，或者如果你有足够的带宽和快速的云存储，那么将它设置为较小的数字有时会很有用。默认设置是并行运行4个文件传输。

## -u, –update

该参数会强制rclone跳过目标上存在的任何文件，并且修改时间比源文件更新。如果现有目标文件的修改时间与源文件的修改时间相等，则在大小不同时将更新。不支持MOD时间的云存储上，检查的时间将是上传的时间。这意味着如果上传到其中一个云存储，rclone将跳过目标上存在的任何文件，并且上传的时间比源文件的修改时间更新。当转移到不直接支持MOD时间的云存储时，这很有用，因为它比–size-only检查更准确，比使用–checksum更快。

## –use-server-modtime

一些云存储是不保留文件修改时间的（例如：Swift, S3）。在此类的云存储上，rclone将原始的modtime存储为对象的附加元数据。默认情况下，当操作modtime时，它将进行API调用以检索元数据。 使用此参数，可以禁用额外的API调有用，而是依赖服务器的修改时间。通常情况下，本地同步远程数据，只要知道本地文件比服务器文件的时间更新就足够了，因此它可以加快进程并减少所需的API调用次数。

## -v, -w, –verbose

使用参数-v，则rclone会返回每个传输文件的少量重要事件；

使用参数-vv，则rclone会返回每个传输文件执行每一步的详细的信息。

## -V, –VERSION

显示rclone版本信息





# 语法及示例

```
# 本地到网盘
rclone [功能选项] <本地路径> <配置名称:路径> [参数] [参数]
# 网盘到本地
rclone [功能选项] <配置名称:路径> <本地路径> [参数] [参数]
# 网盘到网盘
rclone [功能选项] <配置名称:路径> <配置名称:路径> [参数] [参数]
 
# [参数]为可选项

```

```shell
# 同步本地/data/file的文件夹内容到tencent-cos存储下的/beifen文件夹中,并且排除/root/excludes.txt中指定的文件内容
rclone sync /data/file tencent-cos:/beifen --exclude-from '/root/excludes.txt'
 
# 两个网盘文件同步
rclone copy 配置网盘名称1:网盘路径 配置网盘名称2:网盘路径
```



# 文章来源

- https://cloud.tencent.com/developer/article/1764095
- https://blog.csdn.net/qq_22903531/article/details/131434705