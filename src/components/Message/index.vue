
<template>
  <div class="app-container">
    <template v-if="key">
      <div class="msgCard-content" v-for="item in msgList[key]" :key="item.id">
        <a-checkbox
          v-if="isShowCheckbox"
          @change="checkChange(item)"
        ></a-checkbox>
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
        >
          <template slot="content">
            <span @click.prevent.stop="changeShowCheckBox">转发 | </span>
            <span v-if="item.from === myId">撤回 | </span> <span>删除 | </span>
            <span @click.stop.prevent="changeShowCite">引用</span>
          </template>
          <div
            class="msgCard-content-item-middle"
            :style="{
              backgroundColor: item.isBeself ? '#5a119f' : '#FFF',
              color: item.isBeself ? '#FFF' : '#000',
            }"
          >
            {{ item.type }}
            <template v-if="item['content']['type'] === 'txt'">
              {{ item["content"]["msg"] }}
            </template>
            <template v-if="item['content']['type'] === 'img'">
              <img
                :src="item['content']['msg']"
                alt=""
                :width="
                  item['content']['width']
                    ? item['content']['width'] / 10
                    : '50'
                "
                :height="
                  item['content']['height']
                    ? item['content']['height'] / 10
                    : '50'
                "
              />
            </template></div
        ></a-popover>

        <div class="msgCard-content-item-right">
          {{ renderTime(item.time) }}
        </div>
      </div>
      <!-- 转发按钮 -->
      <div class="transpond_btn" v-if="isShowTranspondBtn">
        <a-button-group>
          <a-button type="primary" @click="toGoTransoundDetail">
            <a-icon type="left" />转发
          </a-button>
          <a-button type="primary" @click="channelTranspondMsg">
            取消<a-icon type="right" />
          </a-button>
        </a-button-group>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { renderTime } from "@/utils/function/renderTime";
import WebIM from "../../utils/easemob/initEasemob";
export default {
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
      myId: WebIM.conn.user, //当前登陆ID
      isShowTranspondBtn: false, //转发按钮显隐状态
      clickMessage: [], //转发选中消息存放数组 存放值为消息id
    };
  },
  computed: {
    ...mapState({
      msgList: (state) => state.MsgList.messageList,
      key: (state) =>
        state.MsgList.selectedObject && state.MsgList.selectedObject.channelId,
    }),
    renderTime() {
      return (time) => {
        return renderTime(time);
      };
    },
  },
  methods: {
    //转发消息状态
    changeShowCheckBox() {
      this.isShowTranspondBtn = true;
      this.$emit("update:isShowCheckbox", true);
    },
    //执行转发消息
    toGoTransoundDetail() {
      console.log("执行转发消息");
    },
    //取消转发消息
    channelTranspondMsg() {
      this.isShowTranspondBtn = false;
      this.$emit("update:isShowCheckbox", false);
    },
    //引用消息状态
    changeShowCite() {
      this.$emit("update:isShowCite", true);
    },
    checkChange() {
      console.log(">>>>>>选中状态变化");
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
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
    }
    .msgCard-content-item-right {
      font-size: 7px;
      position: relative;
      display: inline-flex;
      width: 100px;

      padding-top: 18px;
    }
  }
  .transpond_btn {
    position: absolute;
    bottom: 10px;
    left: 0;
    z-index: 99;
  }
}
</style>