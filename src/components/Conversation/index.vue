<template>
  <a-layout-sider class="conversation-container" width="350px">
    <a-row>
      <a-col :span="24">
        <a-input-search
          placeholder="input search text"
          style="width: 100%"
          @search="onSearch"
        />
      </a-col>
      <a-col :span="24">
        <div>
          <a-list :data-source="data" split bordered>
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta :description="item.email">
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
.conversation-container {
  background: #fff !important;
  padding: 5px;
}
</style>