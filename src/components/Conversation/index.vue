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
        <div>
          <a-list :data-source="conversationList" split bordered>
            <a-list-item
              :class="[
                'conversation-list-item',
                idx === index ? 'checked' : '',
              ]"
              slot="renderItem"
              slot-scope="item, index"
            >
              <a-list-item-meta
                :description="`${item.from}-${item.content.msg}`"
                @click="idx = index"
              >
                <a slot="title">{{ handleCard(item).nickname }}</a>
                <a-avatar slot="avatar" :src="handleCard(item).avatarurl" />
              </a-list-item-meta>
              <a-badge :count="item.unread_num" :overflow-count="99" />
            </a-list-item>
          </a-list>
        </div>
      </a-col>
    </a-row>
  </a-layout-sider>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      avatarurl:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

      idx: 0,
      loading: false,
      busy: false,
    };
  },
  computed: {
    ...mapGetters(["conversationList"]),
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
  },
  methods: {
    onSearch() {
      return console.log(">>>搜索");
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
  .conversation-list-item {
    margin: 10px 0;
    background: #fff;
    border: 1px solid #201b4f;
    border-radius: 5px;
    transition: all 0.3s ease-out;
    &:hover {
      transform: scale(1.1);
    }
  }
  .checked {
    background: rgba(0, 0, 0, 0.071);
  }
}
</style>