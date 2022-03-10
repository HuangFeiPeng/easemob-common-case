# easemob-common-case

### 简介

```
easemob-common-case是环信IM，WebSDK4.X的引入集成，登陆，收发消息，等核心功能的实现组合为一个简易案例。
```

#### 核心目录结构说明

| 目录          | 说明               |                                     | 文件组件说明       |
| ------------- | ------------------ | ----------------------------------- | ------------------ |
| public        | 公共文件           |
| node_modules  | 项目依赖           |
| vue.config.js | vue.config.js 配置 |
| src           | 项目源文件         |
|               | assets             | 静态资源文件                        |
|               | components         | 项目组件                            |
|               |                    | Conversation                        | 会话列表组件       |
|               |                    | InputBar                            | 输入框组件         |
|               |                    | Message                             | 消息展示组件       |
|               |                    | UserInfoCard                        | 个人信息卡组件     |
|               | constants          | 常量文件                            |
|               | mock               | 会话列表的模拟数据                  |
|               | router             | 路由                                |
|               | store              | vuex store                          |
|               | utils              | SDK 引入和配置以及 function js 文件 |
|               |                    | easemob                             | SDK 初始化以及配置 |
|               |
|               |                    | function                            | 处理消息以及时间   |
|               | views              | 视图组件                            |
|               |                    | Chat.vue                            | 聊天页面组件       |
|               |                    | Chat.less                           | 聊天页面样式       |
|               | App.vue            | 根组件                              |
|               | main.js            | 入口文件                            |

### 启动方式

```
1、yarn install 或者 npm install 安装依赖
2、yarn run dev 或者 npm run dev
```

#### PS：

```
1、我建议初期接触集成先看下环信的SDK接口文档,快速开始请参考：<https://docs-im.easemob.com/ccim/web/quickstart>,4.xWeb[文档](https://docs-im.easemob.com/ccim/web/message1)
该demo仅供初期集成引入参考，里面所有功能点以及方法都加了注释，可以具体看注释了解，还有很多有待完善的地方有待完善，欢迎在issue提出你的疑问意见，看到会第一时间回复。

```
