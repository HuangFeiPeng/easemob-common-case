
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
            <span @click.prevent.stop="changeShowCheckBox">转发</span>
            | <span>撤回</span> | <span>删除</span> |
            <span @click.stop.prevent="changeShowCite">引用</span>
          </template>
          <div
            class="msgCard-content-item-middle"
            :style="{
              backgroundColor: item.isBeself ? '#5a119f' : '#FFF',
              color: item.isBeself ? '#FFF' : '#000',
            }"
          >
            {{ item["content"]["msg"] }}
          </div></a-popover
        >

        <div class="msgCard-content-item-right">
          {{ renderTime(item.time) }}
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { renderTime } from "@/utils/function/renderTime";
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
    return {};
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
    changeShowCheckBox() {
      this.$emit("update:isShowCheckbox", !this.isShowCheckbox);
    },
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
}
</style>