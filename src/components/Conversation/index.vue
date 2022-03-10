<template>
  <a-layout-sider class="conversation-container" width="350px">
    <a-row>
      <a-col :span="24">
        <a-input-search
          class="search_input"
          placeholder="input search text"
          @search="onSearch"
        />
      </a-col>
      <a-col :span="24">
        <div class="conver-list-box">
          <ul class="conver-list-box-ul">
            <li
              class="conver-list-ul-item"
              :class="{ active: idx === index }"
              v-for="(item, index) in conversationList"
              :key="item.id"
              @click="(idx = index), selectedUser(item)"
            >
              <a-badge :count="item.unread_num" :overflow-count="99">
                <div class="avatar-box">
                  <a-avatar class="avatar" :src="handleCard(item).avatarurl" />
                </div>
              </a-badge>
              <div class="last-msg-box">
                <div class="content">
                  <div class="content-name" :title="handleCard(item).nickname">
                    {{ handleCard(item).nickname }}
                  </div>
                  <div class="content-last-msg">
                    <p class="msg">
                      <!-- 如果last含有ext就特别处理 -->
                      <span v-if="item.ext" class="ext-tips">{{
                        handleExtTips(item)
                      }}</span>
                      <span class="from-name">{{ handleFromName(item) }}：</span
                      >{{ handleMsgType(item) }}
                    </p>
                  </div>
                </div>
                <div class="time">{{ renderTime(item.timestamp) }}</div>
              </div>
            </li>
          </ul>
        </div>
      </a-col>
    </a-row>
  </a-layout-sider>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { renderTime } from "@/utils/function/renderTime";
import { HANDLE_MSG_TYPE } from "@/constants/msgType";
export default {
  data() {
    return {
      avatarurl:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

      idx: -1,
      loading: false,
      busy: false,
    };
  },
  computed: {
    ...mapGetters(["conversationList", "loginUserInfo"]),
    //处理基础会话信息展示
    handleCard() {
      return (item) => {
        if (item.chatType === "singleChat" && item.userInfo) {
          let obj = {
            nickname:
              (item.userInfo.nickname && item.userInfo.nickname) ||
              item.channelId,
            avatarurl:
              (item.userInfo.avatarurl && item.userInfo.avatarurl) ||
              this.avatarurl,
          };
          return obj;
        }
        if (item.chatType === "groupChat") {
          let obj = {
            nickname: `${
              (item.groupInfo && item.groupInfo.name) || item.channelId
            }`,
          };
          return obj;
        }
      };
    },
    //处理lastMsg from name 展示
    handleFromName() {
      const myId = WebIM.conn.user;
      const loginUserInfo = this.loginUserInfo;
      return (item) => {
        if (item.from === myId) {
          return loginUserInfo.nickname
            ? loginUserInfo.nickname
            : loginUserInfo.users;
        }
        if (item.from !== myId) {
          return item.userInfo && item.userInfo.nickname
            ? item.userInfo.nickname
            : item.from;
        }
      };
    },
    //处理ext-tips不同展示效果
    handleExtTips() {
      return (extTips) => {
        let showType = "";
        let loginUser = WebIM.conn.user;
        //ext 为 em_at_list为@
        if (
          extTips.ext["em_at_list"] &&
          extTips.ext["em_at_list"].indexOf(loginUser) !== -1
        ) {
          return (showType = "[有人@我]");
        }
        //ext 为 extTips.ext.msgType 音视频呼叫
        if (extTips.ext.msgType && extTips.ext.msgType === "rtcCallWithAgora") {
          return (showType = "[音视频呼叫]");
        }

        return showType;
      };
    },
    //处理不同的消息不同的lastMsg预览
    handleMsgType() {
      return (item) => {
        const {
          content,
          content: { type, msg },
        } = item;
        if (!item.content.recallStatus) {
          if (type === "txt") {
            return msg;
          }
          //其他类型消息
          if (HANDLE_MSG_TYPE[type]) {
            return HANDLE_MSG_TYPE[type];
          }
          //自定义类型的消息
          if (type === "custom" && content.customEvent === "userCard") {
            return `[个人名片]`;
          }
          if (type === "custom" && content.customEvent === "transmitMsg") {
            return `[聊天记录]`;
          }
        } else {
          return `撤回了一条消息`;
        }
      };
    },
    //renderTime
    renderTime() {
      return (time) => {
        return renderTime(time);
      };
    },
  },
  methods: {
    ...mapMutations(["SET_SELECTED_OBJ"]),
    onSearch() {
      return console.log(">>>搜索");
    },
    selectedUser(item) {
      this.SET_SELECTED_OBJ(item);
    },
  },
};
</script>
<style lang="less" scoped>
.ant-list-bordered {
  padding: 5px 0;
  border: none;
}
.ant-list-split .ant-list-item:last-child {
  border-bottom: 1px solid #201b4f;
}
.conversation-container {
  background: #fff !important;
  padding: 5px;
  .search_input {
    margin: 5px 0;
  }
  .conver-list-box {
    width: 100%;
    border-radius: 8px;
    .conver-list-box-ul {
      padding-inline-start: 0;
      list-style-type: none;
      width: 100%;
      .conver-list-ul-item {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        min-height: 80px;
        width: 100%;
        border: 1px solid #5800c0;
        border-radius: 8px;
        margin: 5px 0;
        cursor: pointer;
        .avatar-box {
          margin: 8px;
          border-radius: 50%;
          border: 1px solid #5800c0;
          overflow: hidden;
          .avatar {
            width: 50px;
            height: 50px;
          }
        }

        .last-msg-box {
          width: 100%;
          padding: 0 8px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .content {
            width: 80%;

            .content-name {
              width: 80px;
              height: 25px;
              color: #fff;
              background: linear-gradient(135deg, #6510ad 50%, #104fad);
              text-align: center;
              line-height: 25px;
              border-radius: 3px;
              font-weight: bold;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .content-last-msg {
              // width: 75%;
              .ext-tips {
                color: red;
              }
              .from-name {
                // font-weight: 500;
                color: slategrey;
              }
              .msg {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          .time {
            position: absolute;
            right: -20px;
            top: 0;
            width: 80px;
            height: 35px;
            z-index: 10;
          }
        }
      }
      .active {
        background: rgba(0, 0, 0, 0.167);
      }
    }
  }
}
</style>