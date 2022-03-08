<template>
  <div>
    <a-modal
      mask
      v-model="visible"
      title="查看转发消息"
      @ok="handleOk"
      :zIndex="9999"
    >
      <div class="msgItem-box">
        <div v-for="(item, index) in tansmitMsgList" :key="index">
          <a-divider orientation="left">{{ renderTime(item.time) }}</a-divider>
          <span>{{ item.from }} </span>
          <p class="textMsg" v-if="item.content.type === 'txt'">
            <a-divider type="vertical" />
            {{ item.content.msg }}
          </p>
          <img
            class="imgMsg"
            v-if="item.content.type === 'img'"
            :src="item.content.msg"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { renderTime } from "@/utils/function/renderTime";
export default {
  data() {
    return {
      renderTime,
      visible: false,
      tansmitMsgList: [],
    };
  },
  methods: {
    setTansmitMsgList(msgData) {
      this.$nextTick(() => {
        const {
          content: { customExts },
        } = msgData;
        this.tansmitMsgList = Object.assign([], customExts);
      });
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
.msgItem-box {
  max-height: 300px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  .textMsg {
    font-size: 17px;
  }
  .imgMsg {
    max-width: 100px;
    max-height: 100px;
  }
}
</style>