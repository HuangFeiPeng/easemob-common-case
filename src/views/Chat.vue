<template>
  <div id="components-layout-demo-basic" class="chat-container">
    <a-layout
      style="position: absolute; width: 100%; overflow: hidden; height: 100%"
    >
      <a-layout-sider class="menu" width="80px">
        <div class="avatar">
          <a-avatar shape="square" :size="64" icon="user" />
        </div>
        <a-row
          style="height: 100%"
          type="flex"
          align="middle"
          justify="space-around"
        >
          <a-col :span="24">
            <div>会话</div>
          </a-col>
          <a-col :span="24">
            <div>好友列表</div>
          </a-col>
          <a-col :span="24">
            <div>群组列表</div>
          </a-col>
          <a-col :span="24">
            <div>设置</div>
          </a-col>
        </a-row>
      </a-layout-sider>
      <Conversation />
      <a-layout class="layout-message-container">
        <a-layout-header class="layout-header"></a-layout-header>
        <a-layout-content class="layout-content">
          <Message />
        </a-layout-content>
        <a-layout-footer class="layout-footer">Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Conversation from "@/components/Conversation";
import Message from "@/components/Message";
import "./Chat.less";
export default {
  name: "Chat",
  components: {
    Conversation,
    Message,
  },
};
</script>


