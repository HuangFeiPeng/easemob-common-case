<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
export default {
  data() {
    return {
      username: "hfp",
      password: "1",
    };
  },
  created() {
    this.initEasemobListen();
    this.login();
  },
  methods: {
    ...mapActions(["getUserInfo", "getSessionList", "getToDoUpdateLastMsg"]),
    /* ------------- 环信初始化监听回调（该步骤必须优先挂载） ------------ */
    initEasemobListen() {
      const conn = WebIM.conn;
      conn.listen({
        onOpened: () => {
          console.log(">>>>>>>>WebIM登陆成功");
          NProgress.done();
          this.initUserData();
        }, //连接成功回调
        onClosed: () => {}, //连接关闭回调
        onTextMessage: (message) => {
          console.log("收到文本消息", message);
          this.sendReadAck(message);
        }, //收到文本消息
        onEmojiMessage: (msg) => {}, //收到表情消息
        onPictureMessage: (msg) => {}, //收到图片消息
        onCmdMessage: (msg) => {}, //收到命令消息
        onAudioMessage: (msg) => {}, //收到音频消息
        onLocationMessage: (msg) => {}, //收到位置消息
        onFileMessage: (msg) => {}, //收到文件消息
        onVideoMessage: function (message) {
          var node = document.getElementById("privateVideo");
          var option = {
            url: message.url,
            headers: {
              Accept: "audio/mp4",
            },
            onFileDownloadComplete: function (response) {
              var objectURL = WebIM.utils.parseDownloadResponse.call(
                conn,
                response
              );
              node.src = objectURL;
            },
            onFileDownloadError: function () {
              console.log("File down load error.");
            },
          };
          WebIM.utils.download.call(conn, option);
        }, //收到视频消息
        onPresence: (msg) => {}, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
        onRoster: (msg) => {}, //处理好友申请
        onInviteMessage: (msg) => {}, //处理群组邀请
        onOnline: () => {}, //本机网络连接成功
        onOffline: () => {}, //本机网络掉线
        onError: function (message) {
          console.log("+++++error", message);
        }, //失败回调
        onBlacklistUpdate: function (list) {
          //黑名单变动
          // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
          console.log(list);
        },
        onRecallMessage: (msg) => {}, //收到撤回消息回调
        onReceivedMessage: (msg) => {}, //收到消息送达服务器回执
        onDeliveredMessage: (msg) => {}, //收到消息送达客户端回执
        onReadMessage: function (message) {
          console.log("收到消息已读回执", message);
        }, //收到消息已读回执
        onCreateGroup: (msg) => {}, //创建群组成功回执（需调用createGroupNew）
        onMutedMessage: (msg) => {}, //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
        onChannelMessage: (msg) => {}, //收到整个会话已读的回执，在对方发送channel ack时会在这个回调里收到消息
      });
    },
    /* ------------- 环信登陆方法（账号已写死） ------------ */
    login() {
      /*
       * WebIM.conn.isOpened()方法可在端上判断SDK是否为登陆状态
       * undefined & false 为未登录
       * true 为登陆
       */
      if (
        WebIM.conn.isOpened() === undefined ||
        WebIM.conn.isOpened() === false
      ) {
        NProgress.inc();
        WebIM.conn.open({
          user: this.username,
          pwd: this.password,
          appKey: WebIM.config.appkey,
        });
      }
    },
    /* ----------------- 初始化当前登陆用户数据 ----------------- */
    async initUserData() {
      const users = this.username;
      //拉取当前用户用户属性
      try {
        let userInfo = await this.getUserInfo({ users });
        console.log(userInfo);
      } catch (error) {}

      //拉取会话列表
      this.getSessionList();
      //获取会话列表中存在的用户属性
    },
    /* ----------------发送已读回执--------------- */
    sendReadAck(message) {
      const { id: bodyId, from } = message;
      let msg = new WebIM.message("read", WebIM.conn.getUniqueId());
      msg.set({
        id: bodyId,
        to: from,
      });
      WebIM.conn.send(msg.body);
    },
  },
};
</script>
<style lang="scss">
@import url("./assets/Icon/iconfont.css");
#app {
  margin: 0;
  padding: 0;
}
</style>
