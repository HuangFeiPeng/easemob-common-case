<template>
  <div class="app-container">
    <a-row>
      <a-col :span="24">
        <div class="func-coulmn">
          <span
            class="iconfont"
            @click="StrToFunc(item.funcName)"
            :class="item.class"
            v-for="(item, index) in funcIconList"
            :key="index"
          ></span>
        </div>
        <div class="emoji-box" v-show="isShowEmojiBox">
          <span
            class="emoji-icon"
            v-for="(emoji, index) in emoji_icon"
            :key="index"
            @click.stop.prevent="addEmoji(emoji)"
            >{{ emoji }}</span
          >
        </div>
      </a-col>
      <a-col :span="24" @click.prevent="isShowEmojiBox = false">
        <!-- 区分群组与单聊，单聊没有@功能 【另不需要@功能可直接取消判断采用普通input或单聊富文本框】 -->
        <div
          v-if="selectedObject && selectedObject.chatType === 'singleChat'"
          id="editable"
          ref="editable"
          class="content-editable input-textarea"
          spellcheck="false"
          contenteditable="true"
          @input="valueChange"
          placeholder="请输入消息内容..."
        ></div>
        <vue-tribute v-else :options="options">
          <div
            id="editable"
            ref="editable"
            class="content-editable input-textarea"
            spellcheck="false"
            contenteditable="true"
            @input="valueChange"
            placeholder="@..."
          ></div>
        </vue-tribute>
        <!-- 发送按钮 -->
        <a-button
          v-show="textContent"
          id="send_btn"
          @click="send"
          type="primary"
          >发送</a-button
        >
        <!-- 引用消息预览 -->
        <div v-show="isShowCite" class="quote-box">
          <template v-if="citeContent">
            <p class="quote-content">
              {{ citeShowMsgType(citeContent) }}
            </p>
          </template>

          <div class="cannelCite" @click.stop.prevent="cannelCite">
            <a-icon type="close" />
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import VueTribute from "vue-tribute";
import { emoji_icon } from "@/assets/face/index.js";
import { HANDLE_MSG_TYPE } from "../../constants/msgType";
import { MESSAGR_ERROR_CODE } from "../../constants/errorCode";
export default {
  components: {
    VueTribute,
  },
  props: {
    selectedObject: {
      type: Object,
      requied: true,
      default: () => ({}),
    },
    isShowCite: {
      type: Boolean,
      requied: true,
      default: false,
    },
    citeContent: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      HANDLE_MSG_TYPE,
      funcIconList: [
        { class: "icon-biaoqing", funcName: "handleShowEmoji" },
        { class: "icon-tupian", funcName: "handleUploadImg" },
        { class: "icon-shipin", funcName: "handleUploadVideo" },
      ],
      emoji_icon,
      isShowEmojiBox: false,
      textContent: "",
      innerHTML: "",
      atUserList: [],
      options: {
        trigger: "@",
        // specify whether a space is required before the trigger string
        requireLeadingSpace: false,
        noMatchTemplate: "<li>暂无数据</li>",
        //values 要传入的检索数据
        values: [],
        positionMenu: true,
        selectTemplate: (item) => {
          //利用选中后的回调,把选定的id加入到被@的数组当中
          console.log(item.original.key);
          this.atUserList.push(item.original.key);
          return `<span id="${item.original.key}" contenteditable="false"><a>
            @
            ${item.original.value}
            </a></span>`;
        },
      },
    };
  },
  watch: {
    selectedObject(newVal) {
      if (newVal.chatType === "groupChat") {
        let { affiliations } = newVal["groupInfo"] || [];
        this.handleGroupMember(affiliations);
      }
    },
  },
  computed: {
    citeShowMsgType() {
      return (citeMsg) => {
        if (citeMsg.content && citeMsg.content.type === "txt") {
          return `${citeMsg.from}：${citeMsg.content.msg}`;
        } else if (citeMsg.content) {
          return `${citeMsg.from}：${HANDLE_MSG_TYPE[citeMsg.content.type]}`;
        }
        // return citeMsg;
      };
    },
  },
  methods: {
    ...mapActions(["sendTextMessage"]),
    addEmoji(emoji) {
      //这种写法是因为引入vue-tribute 暂时没有解决双向绑定之后@功能无法使用问题，手动向富文本的div中添加并且向绑定的textContent中添加。
      this.$refs["editable"].append(emoji);
      this.textContent = this.textContent + emoji;
    },
    //循环点击调用对应的时间
    StrToFunc(funcName) {
      this[funcName]();
    },
    handleShowEmoji: function () {
      return (this.isShowEmojiBox = !this.isShowEmojiBox);
    },
    handleUploadImg: function () {
      console.log(">>>>>处理上传发送图片");
    },
    handleUploadVideo: function () {
      console.log(">>>>>处理上传发送视频");
    },
    //初始化群组列表
    handleGroupMember(memberList) {
      let values = [];
      memberList.length > 0 &&
        memberList.map((item) => {
          if (
            item.owner !== WebIM.conn.user &&
            item.member !== WebIM.conn.user
          ) {
            return values.push({
              key: item.member || item.owner,
              value: item.member || item.owner,
            });
          }
        });
      this.options.values = values;
    },
    //富文本内容改变回调
    valueChange(e) {
      //监听到如果是删除操作，进入到处理删除逻辑方法
      // console.log("textContent", e.target.textContent);
      if (e.inputType === "deleteContentBackward") {
        //传入事件target的所有子节点
        this.deleteAtUser(e.target.childNodes);
      }
      this.textContent = e.target.textContent;
      // this.innerHTML = e.target.innerHTML;
    },
    //取消@
    deleteAtUser(nodes) {
      const atUsersList = this.atUserList;
      let atId = [];
      //如果子节点为空那么就置空所有@id
      if (nodes.length < 1) {
        return (this.atUserList = []);
      }
      //循环所有子节点如果为span类型即为@标签，加入到atId
      nodes.forEach((item) => {
        if (item.nodeName === "SPAN") {
          atId = [...atId, item.id];
        }
      });
      //循环atUsersList，如果其中的key如果不在atId中说明用户有进行删除那么删除对应的atUserList
      atUsersList.forEach((item, index) => {
        if (!atId.includes(item.key)) {
          return this.atUserList.splice(index, 1);
        }
      });
    },
    //发送消息
    async send() {
      //消息内容
      const msgData = this.textContent.replace(/ |\n/g, "");
      const em_at_list = this.atUserList;
      const toId = this.selectedObject.channelId;
      const chatType = this.selectedObject.chatType;
      const citeMsg = Object.assign({}, this.citeContent);
      console.log(">>>>>>citeMsg", citeMsg);
      try {
        await this.sendTextMessage({
          msgData,
          em_at_list,
          citeMsg,
          chatType,
          toId,
        });
        this.textContent = "";
        this.$refs["editable"].innerHTML = "";
        this.atUserList = [];
        this.cannelCite();
      } catch (error) {
        console.log(">>>>发送失败");
        this.$notification.error({
          message: "消息发送失败",
          description: `${MESSAGR_ERROR_CODE[error["type"]]}`,
          duration: 2,
        });
      }
    },
    //取消引用
    cannelCite() {
      this.$emit("update:isShowCite", false);
      this.$emit("setCiteContent", {});
    },
  },
};
</script>
<style lang="less">
.app-container {
  position: relative;
}
.func-coulmn {
  width: 30px;
  height: 28px;
  background: #fff;
  border-radius: 5px;
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  .iconfont {
    display: inline-block;
    height: 25px;
    line-height: 28px;
    text-align: center;
    font-size: 30px;
  }
  &:hover {
    width: 100px;
    border-radius: 5px;
    // box-shadow: 0px 0px 10px 3px rgb(45, 41, 41);
  }
}
.emoji-box {
  position: absolute;
  left: 0;
  top: -215px;
  width: 300px;
  height: 190px;
  overflow: auto;
  background: #fff;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0px 0px 10px gray;
  z-index: 999;
  .emoji-icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    font-size: 22px;
    // border: 1px solid red;
    text-align: center;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      border-radius: 5px;
      // background: rgba(160, 158, 158, 0.39);
      transform: scale(1.5);
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
.input-textarea {
  margin-top: 5px;
  border-radius: 5px;
  width: 100%;
  height: 75px;
  overflow-y: scroll;
  background: #fff;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 18px;
  letter-spacing: 1.5px;
  img {
    max-width: 50px;
    max-height: 50px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
#send_btn {
  position: absolute;
  right: 10px;
  top: 25px;
  font-size: 15px;
}
.content-editable:empty:before {
  content: attr(placeholder);
  display: block;
  color: #6510ad;
}
// Tribute-specific styles
.tribute-container {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(#000, 0.13);
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  border: 1px solid rgba(#000, 0.13);
  background-clip: padding-box;
  overflow: hidden;
}
.tribute-container li {
  color: #3f5efb;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}
.tribute-container li.highlight,
.tribute-container li:hover {
  background: #6510ad;
  color: #fff;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
.quote-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 3px;
  width: 80%;
  height: 25px;
  border-radius: 3px;
  padding: 0 10px;
  background: #f3f3f3;
  .quote-content {
    min-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cannelCite {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>