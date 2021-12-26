<template>
  <div class="app-container">
    <a-row>
      <a-col :span="24">
        <div class="func-coulmn">
          <span
            class="iconfont"
            :class="item.class"
            v-for="(item, index) in funcIconList"
            :key="index"
          ></span>
        </div>
      </a-col>
      <a-col :span="24">
        <div
          class="input-textarea"
          contenteditable="true"
          spellcheck="false"
          @change="handleInputValue"
        ></div>
        <div v-show="isShowQutoe" class="quote-box">
          <p>引用内容：{{ inputValue }}</p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      funcIconList: [
        { class: "icon-biaoqing" },
        { class: "icon-tupian" },
        { class: "icon-shipin" },
      ],
      inputValue: "",
      isShowQutoe: true,
    };
  },
  methods: {
    handleInputValue(e) {
      console.log(">>>>>>监听input内容", e);
    },
  },
};
</script>
<style lang="less">
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
.input-textarea {
  margin-top: 5px;
  border-radius: 5px;
  width: 100%;
  height: 75px;
  overflow: scroll;
  background: #fff;
  padding: 5px;
  border: none;
  outline: none;
  img {
    max-width: 50px;
    max-height: 50px;
  }
}
.quote-box {
  margin-top: 3px;
  width: 80%;
  height: 25px;
  border-radius: 3px;
  padding: 0 3px;
  background: #f3f3f3;
}
</style>