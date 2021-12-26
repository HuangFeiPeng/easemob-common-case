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
                      <span v-if="item.ext" class="ext-tips">{{
                        handleExtTips(item)
                      }}</span>
                      <span class="from-name">{{ item.from }}：</span
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
            nickname: `群组${item.channelId}`,
          };
          return obj;
        }
      };
    },
    //处理ext-tips不同展示效果
    handleExtTips() {
      return (extTips) => {
        let showType = "";
        let loginUser = WebIM.conn.user;
        if (
          extTips.ext["em_at_list"] &&
          extTips.ext["em_at_list"].indexOf(loginUser) !== -1
        ) {
          return (showType = "[有人@我]");
        }
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
        if (type === "txt") {
          return msg;
        }
        if (type === "img") {
          return "[图片]";
        }
        if (type === "file") {
          return "[文件]";
        }
        if (type === "custom" && content.customEvent === "userCard") {
          return `[个人名片]`;
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
      height: 800px;
      overflow: scroll;
      .conver-list-ul-item {
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
          position: relative;
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
            right: 0;
            top: 0;
            width: 80px;
            height: 35px;
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