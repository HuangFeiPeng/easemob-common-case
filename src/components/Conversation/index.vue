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
          <a-list :data-source="data" split bordered>
            <a-list-item
              :class="[
                'conversation-list-item',
                idx === index ? 'checked' : '',
              ]"
              slot="renderItem"
              slot-scope="item, index"
            >
              <a-list-item-meta :description="item.email" @click="idx = index">
                <a slot="title">{{ "刘某某" + index }}</a>
                <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </a-list-item-meta>
              <div>Content</div>
            </a-list-item>
          </a-list>
        </div>
      </a-col>
    </a-row>
  </a-layout-sider>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          gender: "male",
          name: {
            title: "Mr",
            first: "Fletcher",
            last: "Cooper",
          },
          email: "fletcher.cooper@example.com",
          nat: "NZ",
        },
        {
          gender: "male",
          name: {
            title: "Mr",
            first: "Fletcher",
            last: "Cooper",
          },
          email: "fletcher.cooper@example.com",
          nat: "NZ",
        },
        {
          gender: "male",
          name: {
            title: "Mr",
            first: "Fletcher",
            last: "Cooper",
          },
          email: "fletcher.cooper@example.com",
          nat: "NZ",
        },
      ],
      idx: 0,
      loading: false,
      busy: false,
    };
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