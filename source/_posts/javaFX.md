title: javaFX
date: 2025-1-7 10:50:17
categories: java
toc: true
description: javaFX
tags:

	- javaFX


---



# Stage舞台窗口


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

## 窗口的五种类型

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

## 模态窗口1

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

## 模态窗口2

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

 //设置快捷键1
 //SHORTCUT_DOWN在window下处理为ctrl键,在mac下处理为cmd键
 KeyCombination kc2 = new KeyCodeCombination(KeyCode.C,KeyCombination.SHORTCUT_DOWN);
 sceen.getAccelerators().put(kc2, new Runnable() {
     @Override
     public void run() {
         System.out.println("快捷键触发");
     }
 });
 
 //设置快捷键2
 KeyCodeCombination kc5 = KeyCodeCombination.valueOf("ctrl+alt+k");
 Mnemonic m5 = new Mnemonic(b1,kc5);
 scene.addMnemonic(m5);

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
# 布局
## 1.FlowPane 流式布局
```java
@Override
    public void start(Stage stage) throws Exception {
        //流式布局
        FlowPane flow = new FlowPane();
        //设置背景颜色
        flow.setStyle("-fx-background-color: grey");
        //添加按钮
        flow.getChildren().add(new Button("button1"));
        flow.getChildren().add(new Button("button2"));
        flow.getChildren().add(new Button("button3"));
        flow.getChildren().add(new Button("button4"));
        flow.getChildren().add(new Button("button5"));
        flow.getChildren().add(new Button("button6"));
        flow.getChildren().add(new Button("button7"));
        //设置间距
        flow.setHgap(10);
        flow.setVgap(10);
        //设置边距
        flow.setPadding(new javafx.geometry.Insets(10, 10, 10, 10));
        Scene sceen = new Scene(flow);
        stage.setScene(sceen);
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```

## 2.GridPane网格布局
```java
@Override
    public void start(Stage stage) throws Exception {
        //网格布局
        GridPane grid = new GridPane();
        //设置背景颜色
        grid.setStyle("-fx-background-color: grey");
        //添加按钮到第几列第几行
        grid.add(new Button("button1"),0,0);
        grid.add(new Button("button2"),1,0);
        grid.add(new Button("button3"),2,0);
        grid.add(new Button("button4"),0,1);
        grid.add(new Button("button5"),1,1);
        grid.add(new Button("button6"),2,1);
        grid.add(new Button("button7"),0,2);
        //设置间距
        grid.setHgap(10);
        grid.setVgap(10);
        //设置边距
        grid.setPadding(new javafx.geometry.Insets(10, 10, 10, 10));
        Scene sceen = new Scene(grid);
        stage.setScene(sceen);
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```

## 3.BorderPane边框布局
```java
@Override
    public void start(Stage stage) throws Exception {
        //网格布局
        BorderPane bp = new BorderPane();
        //设置背景颜色
        bp.setStyle("-fx-background-color: grey");
        //添加上部分
        BorderPane top = new BorderPane();
        top.setStyle("-fx-background-color: red");
        top.setPrefWidth(100);
        top.setPrefHeight(100);
        bp.setTop(top);
        //添加right部分
        BorderPane right = new BorderPane();
        right.setStyle("-fx-background-color: green");
        right.setPrefWidth(100);
        right.setPrefHeight(100);
        bp.setRight(right);
        //添加bottom部分
        BorderPane bottom = new BorderPane();
        bottom.setStyle("-fx-background-color: blue");
        bottom.setPrefWidth(100);
        bottom.setPrefHeight(100);
        bp.setBottom(bottom);
        //添加left部分
        BorderPane left = new BorderPane();
        left.setStyle("-fx-background-color: yellow");
        left.setPrefWidth(100);
        left.setPrefHeight(100);
        bp.setLeft(left);
        //添加center部分
        BorderPane center = new BorderPane();
        center.setStyle("-fx-background-color: orange");
        center.setPrefWidth(100);
        center.setPrefHeight(100);
        bp.setCenter(center);
        //设置间距
        bp.setPadding(new Insets(10));
        Scene sceen = new Scene(bp);
        stage.setScene(sceen);
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```
## 4.TextFlow文字布局
```java
    @Override
    public void start(Stage stage) throws Exception {
        //文字流布局
        TextFlow bp = new TextFlow();
        bp.getChildren().add(new Text("aaaaaaaaaaaaaaaaaaaa"));
        bp.getChildren().add(new Text("vvvvvvvvvvvvvvvvvvvv"));
        bp.getChildren().add(new Text("cccccccccccccccccccc"));
        //设置间距
//        bp.setPadding(new Insets(10));
        Scene sceen = new Scene(bp);
        stage.setScene(sceen);
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```
## 5.DialogPane 对话框布局
```java
@Override
    public void start(Stage stage) throws Exception {
        //锚点布局
        AnchorPane an = new AnchorPane();
        //背景颜色
        an.setStyle("-fx-background-color: grey");
        Button b = new Button("点击显示对话框");
        an.getChildren().add(b);
        //给按钮绑定单击事件
        b.setOnAction(actionEvent -> {
            Stage s = new Stage();
            s.setTitle("弹出的窗口");
            //设置弹窗模态化
            s.initOwner(stage);
            s.initModality(Modality.WINDOW_MODAL);
            //设置弹窗置顶
            s.setAlwaysOnTop(true);
            //设置弹窗不可改变大小
            s.setResizable(false);
            //设置弹框大小
//            s.setWidth(450);
//            s.setHeight(260);

            // 设置对话框
            DialogPane diallog = new DialogPane();
            //对话框内容
            diallog.setHeaderText("HeaderText");
            diallog.setContentText("ContentText");
            //设置对话框按钮
            diallog.getButtonTypes().add(ButtonType.APPLY);
            diallog.getButtonTypes().add(ButtonType.CLOSE);
            //给按钮绑定点击事件
            ((Button)diallog.lookupButton(ButtonType.APPLY)).setOnAction(actionEvent2 -> {
                System.out.println("点击了APPLY");
            });
            ((Button)diallog.lookupButton(ButtonType.CLOSE)).setOnAction(actionEvent2 -> {
                System.out.println("点击了CLOSE");
                s.close();
            });
            //对话框设置图片
            ImageView imageView = new ImageView(new Image(getClass().getResource("/img/warning.png").toExternalForm()));
            imageView.setFitHeight(50);
            imageView.setFitWidth(50);
            diallog.setGraphic(imageView);
            //设置扩展内容
            diallog.setExpanded(false);//扩展内容默认关闭
            diallog.setExpandableContent(new Text("扩展内容...."));

            s.setScene(new Scene(diallog));
            s.show();
        });

        Scene sceen = new Scene(an);
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```

# 组件
## Hyperlink超链接样式组件
```java
@Override
    public void start(Stage stage) throws Exception {
        VBox vBox = new VBox();
        //超链接样式
//        Hyperlink hl = new Hyperlink("http://www.baidu.com");
        Hyperlink hl = new Hyperlink("http://www.baidu.com", new Button("百度一下"));
        vBox.getChildren().add(hl);
        //设定单击事件
        hl.setOnAction(actionEvent -> {
            HostServices hs = this.getHostServices();
            hs.showDocument(((Hyperlink)actionEvent.getSource()).getText());
        });
        Scene sceen = new Scene(vBox);
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```

## 菜单栏
### 菜单，选项，单/多选菜单项
```java
@Override
    public void start(Stage stage) throws Exception {
        /**菜单栏*/
        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: grey");
        MenuBar menuBar = new MenuBar();

        /**菜单*/
        Menu menu1 = new Menu("普通菜单");
        Menu menu2 = new Menu("多选菜单");
        Menu menu3 = new Menu("单选菜单");
        Menu menu4 = new Menu("子菜单");
        /**普通菜单项*/
        MenuItem mi1 = new MenuItem("菜单项1",new ImageView(new Image(getClass().getResource("/img/warning.png").toExternalForm())));
        MenuItem mi2 = new MenuItem("菜单项2");
        MenuItem menuItem5 = new MenuItem("菜单项5");
        MenuItem menuItem6 = new MenuItem("菜单项6");
        /**菜单项的子菜单*/
        Menu em = new Menu("下面还有菜单项");
        em.getItems().addAll(menuItem5,menuItem6);
        /*菜单项分割线*/
        SeparatorMenuItem separate1 = new SeparatorMenuItem();
        //给菜单选项添加快捷键
        mi1.setAccelerator(KeyCombination.valueOf("ctrl+j"));
        //给菜单选项添加单击事件
        mi1.setOnAction(actionEvent -> System.out.println("点击了菜单项1"));
        //把菜单选项添加到熬菜单
        menu1.getItems().addAll(mi1,separate1,mi2);
        menu4.getItems().addAll(em);

        /**多选菜单*/
        CheckMenuItem cm1 = new CheckMenuItem("111");
        CheckMenuItem cm2= new CheckMenuItem("222");
        CheckMenuItem cm3 = new CheckMenuItem("333");
        //设置默认选中状态
        cm2.setSelected(true);
        menu2.getItems().addAll(cm1,cm2,cm3);

        /**一组菜单项单选*/
        ToggleGroup tg = new ToggleGroup();
        RadioMenuItem rm1 = new RadioMenuItem("111");
        RadioMenuItem rm2 = new RadioMenuItem("222");
        RadioMenuItem rm3 = new RadioMenuItem("333");
        //设置默认选中状态
        rm1.setSelected(true);
        rm1.setToggleGroup(tg);
        rm2.setToggleGroup(tg);
        rm2.setToggleGroup(tg);
        menu3.getItems().addAll(rm1,rm2,rm3);
        //监听rm1是否被选中点击
        rm1.selectedProperty().addListener(new ChangeListener<Boolean>() {
            @Override
            public void changed(ObservableValue<? extends Boolean> observable, Boolean oldValue, Boolean newValue) {
                System.out.println("111是否被选中"+newValue);
            }
        });

        //把菜单添加到菜单栏
        menuBar.getMenus().addAll(menu1,menu2,menu3,menu4);

        an.getChildren().add(menuBar);
        Scene sceen = new Scene(an);
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
        //设置菜单栏长度和主布局等长
        menuBar.setPrefWidth(an.getWidth());
        //监听主窗口变化,动态设置菜单栏宽度
        an.widthProperty().addListener(new ChangeListener<Number>() {
            @Override
            public void changed(ObservableValue<? extends Number> observable, Number oldValue, Number newValue) {
                menuBar.setPrefWidth(newValue.doubleValue());
            }
        });
    }
```
### 自定义菜单项
```java
    @Override
    public void start(Stage stage) throws Exception {
        /**菜单栏*/
        AnchorPane an = new AnchorPane();
        an.setStyle("-fx-background-color: grey");
        MenuBar menuBar = new MenuBar();

        /**菜单*/
        Menu menu1 = new Menu("自定义菜单");
        //自定义菜单项-按钮
        CustomMenuItem ci1 = new CustomMenuItem();
        ci1.setContent(new Button("button"));
        //自定义菜单项-进度条
        CustomMenuItem ci2 = new CustomMenuItem();
        ci2.setContent(new ProgressBar(1));
        //自定义菜单项-布局
        CustomMenuItem ci3 = new CustomMenuItem();
        HBox hb = new HBox();
        hb.setStyle("-fx-background-color: yellow");
        hb.setPrefWidth(200);
        hb.setPrefHeight(100);
        hb.getChildren().add(new Button("button1"));
        hb.getChildren().add(new Button("button2"));
        hb.getChildren().add(new Button("button3"));
        ci3.setContent(hb);



        menu1.getItems().addAll(ci1,ci2,ci3);
        //把菜单添加到菜单栏
        menuBar.getMenus().addAll(menu1);

        an.getChildren().add(menuBar);
        Scene sceen = new Scene(an);
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```
## TitledPane&Accordion折叠面板
```java
@Override
    public void start(Stage stage) throws Exception {
        AnchorPane an = new AnchorPane();
        //折叠布局1
        TitledPane tp = new TitledPane("个人信息", new Button("button"));
        //折叠布局2
        TitledPane tp1 = new TitledPane();
        tp1.setText("个人信息");
        HBox hBox = new HBox();
        hBox.getChildren().addAll(new Button("button1"),new Button("button2"));
        tp1.setContent(hBox);
        AnchorPane.setTopAnchor(tp1,200d);
        //对多个折叠布局编组，每次展开一个
        Accordion ac = new Accordion();
        ac.getPanes().addAll(tp,tp1);


        an.getChildren().addAll(ac);
        Scene sceen = new Scene(an);ac
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```
## TabPane选项卡布局
```java
 @Override
    public void start(Stage stage) throws Exception {
        AnchorPane an = new AnchorPane();
       //选项卡布局
        TabPane tp = new TabPane();
        tp.setPrefWidth(299);
        tp.setPrefHeight(300);
        tp.setStyle("-fx-background-color: green");
        //选项卡1
        HBox hBox = new HBox();
        hBox.getChildren().addAll(new Button("button1"),new Button("button2"));
        Tab tab1 = new Tab("tab1", hBox);

        //选项卡2
        VBox vBox = new VBox();
        vBox.getChildren().addAll(new Button("button1"),new Button("button2"));
        Tab tab2 = new Tab("tab1", vBox);
        //添加选项卡进tabpane
        tp.getTabs().addAll(tab1,tab2);

        //单独/全局设置选项卡是否可关闭
        tab1.setClosable(false);
        tp.setTabClosingPolicy(TabPane.TabClosingPolicy.UNAVAILABLE);
        //设置选项卡位置
        tp.setSide(Side.TOP);
        an.getChildren().addAll(tp);
        Scene sceen = new Scene(an);
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```
## RadioButton单选按钮
```java
@Override
    public void start(Stage stage) throws Exception {
        /**单选按钮*/
        AnchorPane an = new AnchorPane();
        ToggleGroup tg = new ToggleGroup();
        RadioButton rb1 = new RadioButton("单选按钮1");
        RadioButton rb2 = new RadioButton("单选按钮2");
        rb1.setToggleGroup(tg);
        rb2.setToggleGroup(tg);
        //设置默认选中按钮
        tg.selectToggle(rb2);
        //把单选组放进容器
        HBox hBox = new HBox(rb1, rb2);
        //监听选择了哪个按钮
        tg.selectedToggleProperty().addListener(new ChangeListener<Toggle>() {
            @Override
            public void changed(ObservableValue<? extends Toggle> observableValue, Toggle toggle, Toggle t1) {
                System.out.println("选中了按钮:"+ ((RadioButton) t1).getText());
            }
        });

        an.getChildren().add(hBox);
        Scene sceen = new Scene(an);
        //设置舞台信息
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```
## CheckBox复选框
```java
 @Override
    public void start(Stage stage) throws Exception {
        /**多选按钮*/
        AnchorPane an = new AnchorPane();
        CheckBox cb1 = new CheckBox("复选框1");
        CheckBox cb2 = new CheckBox("复选框2");
        CheckBox cb3 = new CheckBox("复选框3");
        CheckBox cb4 = new CheckBox("复选框4");
        HBox hBox = new HBox();
        hBox.getChildren().addAll(cb1, cb2,cb3,cb4);
        //设置默认选中
        cb2.setSelected(true);
        //设置默认为不确定状态,只有默认时才是不确定,点击后只有是和否两种
        cb3.setIndeterminate(true);
        //设置可以一直有不确定状态,点击后只有"是"和"否"和"不确定"三种
        cb4.setAllowIndeterminate(true);

        //监听各个复选框的选中状态
        an.setOnMouseClicked(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent mouseEvent) {
                hBox.getChildren().forEach(item->{
                    if (item instanceof CheckBox) {
                        CheckBox cb = (CheckBox) item;
                        System.out.println(cb.getText() + "的选中状态是:" + cb.isSelected()+",不确定状态是:"+cb.isIndeterminate());
                    }
                });
            }
        });
        an.getChildren().add(hBox);
        Scene sceen = new Scene(an);
        //设置舞台信息
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```

## TextArea多行文本
```java
 @Override
    public void start(Stage stage) throws Exception {
        /**多行文本*/
        AnchorPane an = new AnchorPane();
        TextArea ta = new TextArea("请输入描述");
        //设置自动换行
        ta.setWrapText(true);
        //设置宽高
        ta.setPrefWidth(200);
        ta.setPrefHeight(100);
        //设置初始化时展示几行几列
//        ta.setPrefRowCount(2);
//        ta.setPrefColumnCount(2);
        //设置全选
        ta.selectAll();
        //设置光标位置
        ta.positionCaret(3);
        //设置光标在头部
        ta.home();
        //设置是否可编辑
        ta.setEditable(true);
        //清除文本
//        ta.clear();
        //复制
        ta.copy();
        //监听文本
        ta.textProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observableValue, String oldVal, String newVal) {
                System.out.println("输入的内容:"+newVal);
            }
        });

        an.getChildren().add(ta);
        Scene sceen = new Scene(an);
        //设置舞台信息
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```

## TextArea&TextField监听输入
```java
@Override
    public void start(Stage stage) throws Exception {
        AnchorPane an = new AnchorPane();
        TextField tf = new TextField();
        //限制用户输入只能字母,输入数字无效
        tf.setTextFormatter(new TextFormatter<>(change -> change.getControlNewText().matches("[a-zA-Z]*") ? change : null));

        TextArea ta = new TextArea();
        //多行文本监听输入的内容,如果出现数字5,替换为伍
        ta.textProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observableValue, String s, String t1) {
                ta.setTextFormatter(new TextFormatter<String>(new StringConverter<String>() {
                    @Override
                    public String toString(String s) {
                        System.out.println("toString:"+s);
                        return s;
                    }
                    @Override
                    public String fromString(String s) {
                        System.out.println("fromString:"+s);
                        if (s.contains("5")){
                            return s.replace("5","伍");
                        }
                        return s;
                    }
                }));
                //TextArea必须有这个提交
                ta.commitValue();
            }
        });
        AnchorPane.setTopAnchor(ta,100d);
        an.getChildren().addAll(tf,ta);

        Scene sceen = new Scene(an);
        //设置舞台信息
        stage.setScene(sceen);
        stage.setTitle("javafx");
        stage.setWidth(600);
        stage.setHeight(500);
        stage.show();
    }
```

## choiceBox下拉框
```java
package com.bgt.javafxdemo;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import javafx.util.StringConverter;
import java.util.Objects;

public class HelloApplication extends Application {
    @Override
    public void start(Stage stage) throws Exception {
//        new LoginPanel();

        AnchorPane root = new AnchorPane();
        //下拉框单选-字符串
        ChoiceBox<String> cb = new ChoiceBox<>();
        cb.getItems().addAll("选项1","选项2","选项3");
        //设置默认选择项
        cb.setValue("选项2");
        //监听选择项
        cb.getSelectionModel().selectedItemProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observableValue, String s, String t1) {
                System.out.println("选择了："+t1);
            }
        });

        //下拉框单选-对象类型
        ChoiceBox<Student> cb2 = new ChoiceBox<Student>();
        cb2.getItems().addAll(new Student("张三"),new Student("李四"));
        AnchorPane.setTopAnchor(cb2,100d);
        root.getChildren().addAll(cb,cb2);
        //监听选择项
        cb2.getSelectionModel().selectedItemProperty().addListener(new ChangeListener<Student>() {
            @Override
            public void changed(ObservableValue<? extends Student> observableValue, Student s, Student t1) {
                System.out.println("选择了："+t1.getName());
            }
        });
        //下拉项显示对象属性（数据转换）
        cb2.setConverter(new StringConverter<Student>() {
            @Override
            public String toString(Student student) {
                return Objects.nonNull(student)?student.getName():"";
            }

            @Override
            public Student fromString(String s) {
                return null;
            }
        });


        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setWidth(800);
        stage.setHeight(600);
        stage.setTitle("javafx");
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}

class Student{
    private String name;
    public Student(String name){this.name=name;}
    public String getName(){
        return this.name;
    }
}
```
## ColorPicker颜色拾取器
```java
 @Override
    public void start(Stage stage) throws Exception {
        AnchorPane root = new AnchorPane();

        ColorPicker cp = new ColorPicker();
        cp.setPrefWidth(200);
        root.getChildren().add(cp);

        //监听选择的颜色，设置为主页面背景颜色
        cp.valueProperty().addListener(new ChangeListener<Color>() {
            @Override
            public void changed(ObservableValue<? extends Color> observableValue, Color color, Color t1) {
                System.out.println( t1.toString());
                root.setStyle("-fx-background-color: #"+t1.toString().substring(2));
            }
        });

        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setWidth(800);
        stage.setHeight(600);
        stage.setTitle("javafx");
        stage.show();
    }
```

## DatePicker日期选择器
```java
   @Override
    public void start(Stage stage) throws Exception {
        AnchorPane root = new AnchorPane();

        DatePicker cp = new DatePicker();
        cp.setPrefWidth(200);
        root.getChildren().add(cp);

        //监听选择的颜色，设置为主页面背景颜色
        cp.valueProperty().addListener(new ChangeListener<LocalDate>() {
            @Override
            public void changed(ObservableValue<? extends LocalDate> observableValue, LocalDate color, LocalDate t1) {
                System.out.println("选择的时间是："+ t1.toString());
            }
        });

        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setWidth(800);
        stage.setHeight(600);
        stage.setTitle("javafx");
        stage.show();
    }
```