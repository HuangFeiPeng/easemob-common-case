<template>
  <div>
    <a-modal
      v-model="visible"
      title="选择联系人"
      @ok="handleOk"
      @cancel="handleCannel"
    >
      <div class="forwardContent">
        <a-checkbox-group v-model="toBeForwordUsers">
          <a-row>
            <a-col :span="24">
              <a-checkbox
                v-for="(item, key, index) in conversationList"
                :key="item.id"
                :value="key"
                :index="index"
              >
                {{ handleName(item, key) }}
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      visible: false,
      toBeForwordUsers: [],
    };
  },
  computed: {
    ...mapGetters(["conversationList"]),
    handleName() {
      return (item, key) => {
        if (item.chatType === "singleChat") {
          return item.userInfo
            ? item.userInfo.nickname
              ? item.userInfo.nickname
              : key
            : key;
        }
        if (item.chatType === "groupChat") {
          return item.groupInfo
            ? item.groupInfo.name
              ? item.groupInfo.name
              : key
            : key;
        }
        return;
      };
    },
  },
  methods: {
    handleOk(e) {
      //传入要转发的userId
      if (this.toBeForwordUsers.length <= 0)
        return this.$message.error("请选择要转发的目标！");
      this.visible = false;
      this.$emit("toGoTransoundDetail", this.toBeForwordUsers);
    },
    handleCannel() {
      this.visible = false;
      this.toBeForwordUsers = [];
    },
  },
};
</script>
<style lang="less" scoped></style>
