
<template>
  <div class="app-container">
    <template v-if="key">
      <a-checkbox-group v-model="clickMessage">
        <div
          class="msgCard-content"
          v-for="(item, index) in msgList[key]"
          :key="item.time"
        >
          <template v-if="!item.recallStatus">
            <a-checkbox
              v-if="
                isShowCheckbox &&
                item['content']['customEvent'] !== 'transmitMsg'
              "
              :value="item"
            >
            </a-checkbox>

            <div class="msgCard-content-item-left">
              <a-avatar
                shape="square"
                size="large"
                :style="{
                  backgroundColor: item.isBeself ? '#f56a00' : '#ffbf00',
                  verticalAlign: 'middle',
                }"
              >
                {{ item.from }}
              </a-avatar>
            </div>
            <a-popover
              trigger="contextmenu"
              placement="right"
              :overlayStyle="{ cursor: 'pointer' }"
              @visibleChange="judegRecallTime($event, item)"
            >
              <template slot="content">
                <!-- 转发 -->
                <template
                  v-if="item['content']['customEvent'] !== 'transmitMsg'"
                >
                  <a-button
                    type="link"
                    size="small"
                    @click.prevent.stop="changeShowCheckBox"
                    >转发
                  </a-button>
                  <a-divider type="vertical" />
                </template>

                <!-- 撤回 -->
                <template v-if="item.from === loginUserInfo.users">
                  <a-button
                    @click.stop.prevent="recallTargetMsg(item)"
                    type="link"
                    size="small"
                    v-text="item.recallTimeout ? '撤回（超过两分钟）' : '撤回'"
                    :disabled="item.recallTimeout"
                  >
                  </a-button>
                  <a-divider type="vertical" />
                </template>

                <!-- 引用 -->
                <template>
                  <a-button
                    size="small"
                    type="link"
                    @click.stop.prevent="citeTargetMsg(item)"
                    >引用
                  </a-button>
                  <a-divider type="vertical" />
                </template>
                <!-- 置顶 -->
                <template>
                  <a-button size="small" type="link"> 置顶</a-button>
                  <a-divider type="vertical" />
                </template>

                <!-- 删除 -->
                <template>
                  <a-popconfirm
                    placement="right"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteTargetMsg(index)"
                  >
                    <template slot="title">
                      <p>确认删除？</p>
                    </template>
                    <a-button size="small" type="link">删除 </a-button>
                  </a-popconfirm>
                </template>
                <!-- 查看转发 -->
                <template>
                  <a-divider type="vertical" />
                  <a-button
                    v-if="item['content']['customEvent'] === 'transmitMsg'"
                    @click.stop.prevent="showTransmitMsg(item)"
                    type="link"
                    >查看</a-button
                  >
                </template>
              </template>
              <div
                class="msgCard-content-item-middle"
                :style="{
                  backgroundColor: item.isBeself ? '#5a119f' : '#FFF',
                  color: item.isBeself ? '#FFF' : '#000',
                }"
              >
                {{ item.type }}
                <!-- 普通文本消息 -->
                <template v-if="item['content']['type'] === 'txt'">
                  {{ item["content"]["msg"] }}
                </template>
                <!-- 普通图片消息 -->
                <template v-if="item['content']['type'] === 'img'">
                  <img
                    :src="item['content']['msg']"
                    alt=""
                    :width="
                      item['content']['width']
                        ? item['content']['width'] / 2
                        : '50'
                    "
                    :height="
                      item['content']['height']
                        ? item['content']['height'] / 2
                        : '50'
                    "
                  />
                </template>
                <!-- 转发卡片消息 -->
                <template
                  v-if="
                    item['content']['type'] === 'custom' &&
                    item['content']['customEvent'] === 'transmitMsg'
                  "
                >
                  <div class="transmitCard-box">
                    <p class="transmitCard-box-title">
                      {{ handleChatType(item.chatType) }}的聊天记录
                    </p>
                    <div class="transmitCard-box-main">
                      <p
                        class="transmitCard-box-msgItem"
                        v-for="msgItem in item['content']['customExts']"
                        :key="msgItem.id"
                      >
                        <!-- 非文本展示[图片][音频][文件等] -->
                        <template
                          v-if="HANDLE_MSG_TYPE[msgItem['content']['type']]"
                        >
                          {{ msgItem["from"] }}：
                          {{ HANDLE_MSG_TYPE[msgItem["content"]["type"]] }}
                        </template>
                        <!-- 文本直接展示内容 -->
                        <template v-else>
                          {{ msgItem["from"] }}：
                          {{ msgItem["content"]["msg"] }}
                        </template>
                      </p>
                    </div>

                    <p class="transmitCard-box-footer">
                      <a-divider></a-divider>聊天记录
                    </p>
                  </div>
                </template>
              </div></a-popover
            >

            <div class="msgCard-content-item-right">
              {{ renderTime(item.time) }}
            </div>
          </template>
          <!--item['content']['customEvent'] !== 'transmitMsg' 禁止转发类型消息再次转发  -->
          <a-divider v-if="item.recallStatus"
            ><span class="recall-text"
              >{{ judegRecallFrom(item.from) }}撤回了一条消息</span
            ></a-divider
          >
        </div>
      </a-checkbox-group>
      <!-- 转发按钮 -->
      <div class="transpond_btn" v-if="isShowTranspondBtn">
        <a-button-group>
          <a-button type="primary" @click="showUserModal">
            <a-icon type="left" />转发
          </a-button>
          <a-button type="primary" @click="channelTranspondMsg">
            取消<a-icon type="right" />
          </a-button>
        </a-button-group>
      </div>
    </template>

    <!-- 转发用户模态框 -->
    <Forward ref="userModal" @toGoTransoundDetail="toGoTransoundDetail" />
    <!-- 查看转发模态框 -->
    <ShowTransmitMsg ref="transmitMsgModal" />
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { renderTime } from "@/utils/function/renderTime";
import Forward from "./components/forwardModal.vue";
import ShowTransmitMsg from "./components/showTransmitMsg.vue";
import { HANDLE_MSG_TYPE } from "@/constants/msgType";
export default {
  components: {
    Forward,
    ShowTransmitMsg,
  },
  props: {
    isShowCheckbox: {
      type: Boolean,
      requied: true,
      default: false,
    },
    isShowCite: {
      type: Boolean,
      requied: true,
      default: false,
    },
  },
  data() {
    return {
      HANDLE_MSG_TYPE,
      isShowTranspondBtn: false, //转发按钮显隐状态
      clickMessage: [], //转发选中消息存放数组 存放值为消息id
    };
  },
  created() {},
  computed: {
    ...mapGetters(["loginUserInfo"]),
    ...mapState({
      msgList: (state) => state.MsgList.messageList,
      key: (state) =>
        state.MsgList.selectedObject && state.MsgList.selectedObject.channelId,
    }),
    //区分转发卡片为单聊还是群组
    handleChatType() {
      return (chatType) => {
        if (chatType === "singleChat") return "个人";
        if (chatType === "groupChat") return "群聊";
      };
    },
    //处理time
    renderTime() {
      return (time) => {
        return renderTime(time);
      };
    },
    //处理撤回的from来源是自己还是他人
    judegRecallFrom() {
      return (from) => {
        const myId = WebIM.conn.user;
        if (from === "" || from === myId) {
          return "您";
        } else {
          return from;
        }
      };
    },
  },
  methods: {
    ...mapActions(["sendTransmitMessage", "startRecallMessage"]),
    ...mapMutations(["DELETE_MESSAGE"]),
    //检验当前要撤回的消息是否已经容许撤回时间
    judegRecallTime(status, item) {
      const nowTime = Date.now();
      if (!status) return;
      if (nowTime - item.time > 120000) {
        return (item.recallTimeout = true);
      }
      console.log(">>>judegRecallTime");
    },
    //转发消息状态
    changeShowCheckBox() {
      this.isShowTranspondBtn = true;
      this.$emit("update:isShowCheckbox", true);
    },
    //展示选择转发对象的模态框
    showUserModal() {
      if (this.clickMessage.length <= 0)
        return this.$message.error("请选择转发消息！");
      this.$refs["userModal"].visible = true;
    },
    //执行转发消息
    toGoTransoundDetail(usersList) {
      const clickMessage = JSON.parse(JSON.stringify(this.clickMessage));
      this.sendTransmitMessage({ clickMessage, usersList }).then(() => {
        //发送完毕初始化
        this.channelTranspondMsg();
      });
      console.log("执行转发消息", clickMessage, usersList);
    },
    //取消转发消息
    channelTranspondMsg() {
      this.isShowTranspondBtn = false;
      this.clickMessage = [];
      this.$emit("update:isShowCheckbox", false);
    },
    //查看转发消息
    showTransmitMsg(msgData) {
      this.$refs["transmitMsgModal"].visible = true;
      this.$refs["transmitMsgModal"].setTansmitMsgList(msgData);
    },

    //删除本地消息
    deleteTargetMsg(idx) {
      console.log(">>>>idx要删除的消息下标", idx);
      const payload = {
        key: this.key,
        index: idx,
      };
      this.DELETE_MESSAGE(payload);
    },
    //撤回消息
    recallTargetMsg(msgData, idx) {
      this.startRecallMessage(msgData)
        .then((res) => {
          if (res) return this.$message.success("已撤回~");
        })
        .catch((e) => {
          if (e.type === 504)
            return this.$message.error("撤回失败！超过两分钟");
        });
    },
    //引用消息
    citeTargetMsg(msgData) {
      this.$emit("update:isShowCite", true);
      this.$emit("setCiteContent", msgData);
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px 20px;
  overflow-y: scroll;
  .ant-checkbox-group {
    width: 100%;
    .msgCard-content {
      position: relative;
      display: inline-flex;
      flex-direction: row;
      width: 100%;
      margin: 10px 0;

      .msgCard-content-item-left {
        position: relative;
        display: inline-flex;
        min-width: 40px;
        margin-left: 4px;
      }
      .msgCard-content-item-middle {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        max-width: 400px;
        min-width: 50px;
        align-items: flex-start;
        background: #fff;
        padding: 5px;
        border-radius: 5px;
        margin: 0 10px;
        word-break: break-all;
        letter-spacing: 2px;
        .transmitCard-box {
          width: 250px;
          .transmitCard-box-title {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            font-weight: 700;
          }
          .transmitCard-box-main {
            max-height: 250px;
            overflow: hidden;
            .transmitCard-box-msgItem {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .transmitCard-box-footer {
            .ant-divider-horizontal {
              margin: 0;
              padding: 0;
            }
          }
        }
      }
      .msgCard-content-item-right {
        font-size: 7px;
        position: relative;
        display: inline-flex;
        width: 100px;

        padding-top: 18px;
      }
    }
  }

  .transpond_btn {
    position: fixed;
    bottom: 25%;
    right: 5%;
    z-index: 99;
  }
  .recall-text {
    display: inline-block;
    width: 200px;
    height: 25px;
    font-size: 7px;
    color: #b7b7b7;
  }
}
</style>