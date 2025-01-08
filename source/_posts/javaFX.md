title: javaFX
date: 2025-1-7 10:50:17
categories: java
toc: true
description: javaFX
tags: 

	- javaFX


---



# Stage舞台

窗口的五种类型

```java
Stage s1 = new Stage();
s1.setTitle("s1");
s1.initStyle(StageStyle.DECORATED);//默认,有按钮及标题栏
//s1.initStyle(StageStyle.TRANSPARENT);//透明背景
//s1.initStyle(StageStyle.UNIFIED);//和默认背景无异
//s1.initStyle(StageStyle.UTILITY);//无最小化最大化按钮
//s1.initStyle(StageStyle.UNDECORATED);//无标题栏及任何按钮,无法移动
s1.show();
```

模态窗口1

```java
        Stage s1 = new Stage();
        s1.setTitle("s1");
        s1.show();

        Stage s2 = new Stage();
        s2.setTitle("s2");
        //设置程序模态窗口,这种类型窗口只有关闭了才能点程序内其他窗口
        s2.initModality(Modality.APPLICATION_MODAL);
        s2.show();
```

模态窗口2

```java
Stage s1 = new Stage();
s1.setTitle("s1");
s1.show();

Stage s2 = new Stage();
s2.setTitle("s2");
//指定s2点所有者为s1,只有s2关闭后才能操作s1,但不影响s3
s2.initOwner(s1);
//设置程序模态窗口,这种类型窗口只有关闭了才能点s1
s2.initModality(Modality.WINDOW_MODAL);
s2.show();

Stage s3 = new Stage();
s3.setTitle("s3");
s3.show();
```



```java
//设置标题
primaryStage.setTitle（"JavaFX"）;
//设置图标
primaryStage.getIcons().add（new Image（"/icon/icon.png"））;
//设置最小化
primaryStage.setIconified(true）;
//设置最大化
primarystage.setMaximized(true）;
//关闭窗口
primarystage.close();
//设置宽高
primaryStage.setWidth（500）;
primarystage.setHeight （500）;   
//设置最大/小宽高
primaryStage.setMaxWidth（500）;
primarystage.setMaxHeight（500）; 
//获取宽高(若未设置宽高,则需在show()方法后获取)
primaryStage.getWidth（）;
primarystage.getHeight() ;                          
//设置是否可以调整窗口大小(含最大化最小化),默认true
primarystage.setResizable（true）;
                          
//实时获取最新宽高
        stage.heightProperty().addListener(new ChangeListener<Number>() {
            @Override
            public void changed(ObservableValue<? extends Number> observableValue, Number number, Number t1) {
                System.out.println("最新高度是:"+t1.doubleValue());
            }
        });
        stage.widthProperty().addListener(new ChangeListener<Number>() {
            @Override
            public void changed(ObservableValue<? extends Number> observableValue, Number number, Number t1) {
                System.out.println("最新宽度是:"+t1.doubleValue());
            }
        });      
//设置全屏(需要设置Scene的前提下)
stage.setFullScreen(true);
//设置背景透明度:0~1
stage.setOpacity(1.0); 
//设置置顶
stage.setAlwaysOnTop(true);
//设置窗口坐标,桌面左上角为0.0.  同样可以监听坐标,同宽高监听.
stage.setX(0);
stage.setY(0);      
                          
                          
                          
```

# Platform平台



```java
//        Platform.runLater(()->{
//            //此处是一个队列,可在空闲时执行一些简单任务.有任务执行会影响程序运行.
//            int i=1;
//            while (i<10){
//                try {
//                    TimeUnit.SECONDS.sleep(1);
//                } catch (InterruptedException e) {
//                    throw new RuntimeException(e);
//                }
//                System.out.println("i=" + i);
//                i++;
//            }
//        });
        //退出程序
//        Platform.exit();
        //如果此属性为false，则即使在最后一个窗口关闭后，应用程序仍将继续正常运行，直到应用程序调用退出。默认值为true。
//        Platform.setImplicitExit(false);
        //监测电脑是否支持某项功能
//        System.out.println(Platform.isSupported(ConditionalFeature.SCENE3D));
//        System.out.println(Platform.isSupported(ConditionalFeature.FXML));
//        System.out.println(Platform.isSupported(ConditionalFeature.MEDIA));
```

# Screen 屏幕



```java
 //获取全部屏幕
ObservableList<Screen> screens = Screen.getScreens();
//获取主屏幕
//            Screen screen = Screen.getPrimary()
for (Screen screen : screens) {
    System.out.println("屏幕的DPI="+screen.getDpi());
    Rectangle2D rec1 = screen.getBounds();
    System.out.println("下面是完整屏幕宽高和坐标");
    System.out.println("左上角x="+rec1.getMinX() + "左上角y="+rec1.getMinY());
    System.out.println("右下角x="+rec1.getMaxX() + "右下角y="+rec1.getMaxY());
    System.out.println("宽度="+rec1.getWidth() + "高度="+rec1.getHeight());

    Rectangle2D rec2 = screen.getVisualBounds();
    System.out.println("下面是可以看到的屏幕宽高和坐标");
    System.out.println("左上角x="+rec2.getMinX() + "左上角y="+rec2.getMinY());
    System.out.println("右下角x="+rec2.getMaxX() + "右下角y="+rec2.getMaxY());
    System.out.println("宽度="+rec2.getWidth() + "高度="+rec2.getHeight());
    System.out.println("------------------");
}
```





![image-20250108095113434](https://bgt-blog-pic.oss-cn-qingdao.aliyuncs.com/imgs/202501080951683.png)

# 程序打开网页

```java
 HostServices host = getHostServices();
 host.showDocument("http://www.baidu.com");




HostServices host = getHostServices();
for (int i = 0; i < 10; i++) {
    host.showDocument("http://www.baidu.com");
}
```

# 鼠标点击及键盘按事件

```java
 Button button = new Button("b1");
 // 鼠标点击事件
 button.setOnAction((event -> {
     Button source = (Button) event.getSource();
     source.setPrefWidth(200);
     source.setPrefHeight(200);
     source.setText("单击");

 }));

 //鼠标双击事件1
 button.setOnMouseClicked((event -> {
     //双击,且是鼠标左键才认为是双击
            if (event.getClickCount() == 2 && event.getButton().name().equals(MouseButton.PRIMARY.name())) {
               System.out.println("双击");
            }
 }));
//鼠标双击事件2
button.addEventHandler(MouseEvent.MOUSE_CLICKED, (event -> {
System.out.println("当前鼠标按键是:"+event.getButton().name());
//双击,且是鼠标左键才认为是双击
if (event.getClickCount() == 2 && event.getButton().name().equals(MouseButton.PRIMARY.name())) {
           System.out.println("双击");
       }
 }));
//键盘按下事件
button.setOnKeyPressed(keyEvent -> {
    System.out.println("按下键盘"+keyEvent.getCode().name());
});
//键盘释放事件
button.setOnKeyReleased (keyEvent -> {
    System.out.println("释放键盘" + keyEvent.getCode().name());
});
```

# 设置快捷键

```java
Group group = new Group();
Button button = new Button("b1");
// 鼠标点击事件
button.setOnAction((event -> {
    System.out.println("单击事件");
    System.out.println(KeyCode.C.name());
}));
group.getChildren().add(button);
Scene sceen = new Scene(group);

        //设置快捷键
        //SHORTCUT_DOWN在window下处理为ctrl键,在mac下处理为cmd键
        KeyCombination kc2 = new KeyCodeCombination(KeyCode.C,KeyCombination.SHORTCUT_DOWN);
        sceen.getAccelerators().put(kc2, new Runnable() {
            @Override
            public void run() {
                System.out.println("快捷键触发");
            }
        });

stage.setScene(sceen);
stage.setTitle("javafx");
stage.setWidth(800);
stage.setHeight(800);
stage.show();
```

# TextField输入框

```java
 Group group = new Group();
Scene sceen = new Scene(group);
stage.setScene(sceen);
stage.setTitle("javafx");
stage.setWidth(800);
stage.setHeight(800);

//输入框
TextField text = new TextField();
//设置宽高
text.setPrefWidth(100);
text.setPrefHeight(50);
//设置位置
text.setLayoutX(100);
text.setLayoutY(100);
//设置字体大小
text.setStyle("-fx-font-size: 20px;");
//设置圆角
text.setStyle("-fx-background-radius: 30px;");
//设置边框粗细及颜色
text.setStyle("-fx-border-width: 2px; -fx-border-color: red;");
//设置提示
text.setTooltip(new Tooltip("这是提示"));
text.setPromptText("placeholder");
group.getChildren().add(text);
//限制输入字符长度
text.textProperty().addListener(new ChangeListener<String>() {
    @Override
    public void changed(ObservableValue<? extends String> observableValue, String oldVal, String newVal) {
                if (newVal.length()>5){
                    text.setText(oldVal);
                }
            }
        });
//监听选中了哪些字符
text.selectedTextProperty().addListener(new ChangeListener<String>() {
    @Override
    public void changed(ObservableValue<? extends String> observableValue, String oldVal, String newVal) {
         System.out.println("选中的文本:"+newVal);
     }
 });


 //密码输入框 方法属性同上
 PasswordField ptext = new PasswordField();
 ptext.setPrefWidth(200);
 ptext.setPrefHeight(20);
 group.getChildren().add(ptext);

 stage.show();
```

