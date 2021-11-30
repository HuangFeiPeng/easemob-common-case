<template>
  <div id="components-layout-demo-basic" class="chat-container">
    <span class="iconfont .icon-qunzuduoren"></span>
    <a-layout
      style="position: absolute; width: 100%; overflow: hidden; height: 100%"
    >
      <a-layout-sider class="menu" width="80px">
        <div class="avatar">
          <a-popover
            v-model="visible"
            title="个人信息"
            placement="right"
            trigger="click"
          >
            <template slot="content">
              <UserInfoCard :isShowUserInfoCard.sync="visible" />
            </template>
            <a-avatar
              :src="loginUserInfo && loginUserInfo.avatarurl"
              shape="circle"
              :size="64"
              style="color: #f56a00; backgroundcolor: #fde3cf"
            >
              {{
                loginUserInfo.avatarurl
                  ? loginUserInfo.avatarurl
                  : loginUserInfo.users
              }}
            </a-avatar>
          </a-popover>
        </div>
        <a-row
          style="height: 100%"
          type="flex"
          align="middle"
          justify="space-around"
        >
          <a-col :span="24" v-for="(item, idx) in memuList" :key="idx">
            <div>
              <span
                :class="[item.class, idx === index ? 'checked' : '']"
                @click="index = idx"
              ></span>
            </div>
          </a-col>
        </a-row>
      </a-layout-sider>
      <Conversation />
      <a-layout class="layout-message-container">
        <a-layout-header class="layout-header">
          <span class="iconfont .icon-qunzuduoren" style="color: red"></span>
        </a-layout-header>
        <a-layout-content class="layout-content">
          <Message />
        </a-layout-content>
        <a-layout-footer class="layout-footer">Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserInfoCard from "@/components/UserInfoCard";
import Conversation from "@/components/Conversation";
import Message from "@/components/Message";
import "./Chat.less";
export default {
  name: "Chat",
  components: {
    UserInfoCard,
    Conversation,
    Message,
  },
  data() {
    return {
      visible: false,
      index: 0,
      memuList: [
        { class: "iconfont icon-dangqianhuihua" },
        { class: "iconfont icon-haoyou" },
        { class: "iconfont icon-qunzuduoren" },
        { class: "iconfont icon-shezhi" },
      ],
    };
  },
  computed: {
    ...mapGetters(["loginUserInfo"]),
  },
};
</script>



