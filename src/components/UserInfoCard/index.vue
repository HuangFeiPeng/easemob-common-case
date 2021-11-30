<template>
  <div>
    <!-- 用户信息详情 -->
    <a-card hoverable style="width: 300px" extra>
      <img
        height="200"
        slot="cover"
        alt="example"
        src="@/assets/img/backgroud.png"
      />
      <template slot="actions" class="ant-card-actions">
        <a-icon key="setting" type="setting" />
        <a-icon
          key="edit"
          type="edit"
          @click.prevent.native="
            () => {
              visible = !visible;
              $emit('update:isShowUserInfoCard', false);
            }
          "
        />
        <a-icon
          key="ellipsis"
          type="ellipsis"
          @click.prevent.native="isShowDetailedInfo = !isShowDetailedInfo"
        />
      </template>
      <a-card-meta
        :title="
          loginUserInfo.nickname ? loginUserInfo.nickname : loginUserInfo.users
        "
        :description="loginUserInfo.sign ? loginUserInfo.sign : '暂无个性签名'"
      >
        <a-avatar
          slot="avatar"
          :src="loginUserInfo.avatarurl && loginUserInfo.avatarurl"
        />
      </a-card-meta>
      <div class="detailed-info" v-show="isShowDetailedInfo">
        <p>
          <span>性别：</span
          >{{
            (loginUserInfo.gender && GENDER[loginUserInfo.gender]) || "未知"
          }}
        </p>
        <p>
          <span>邮箱：</span
          >{{ (loginUserInfo.mail && loginUserInfo.mail) || "暂未填写" }}
        </p>
        <p>
          <span>电话：</span>
          {{ (loginUserInfo.phone && loginUserInfo.phone) || "暂未填写" }}
        </p>
      </div>
    </a-card>
    <!-- 用户属性设置 -->
    <a-modal
      width="650px"
      title="个人属性编辑"
      :visible="visible"
      okText="确认"
      cancelText="取消"
      :closable="false"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="昵称：">
          <a-input v-model="form.nickname" />
        </a-form-model-item>
        <a-form-model-item label="性别：">
          <a-radio-group v-model="form.gender" name="sex">
            <a-radio value="1"> 男 </a-radio>
            <a-radio value="2"> 女 </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="邮箱：" prop="mail">
          <a-input v-model="form.mail" />
        </a-form-model-item>
        <a-form-model-item label="电话：" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item label="生日：" prop="birth">
          <a-input v-model="form.birth" placeholder="格式：1998-03-11" />
        </a-form-model-item>
        <a-form-model-item label="个性签名：">
          <a-input v-model="form.sign" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
const GENDER = {
  0: "未知",
  1: "男",
  2: "女",
  man: "男",
};
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["isShowUserInfoCard"],
  data() {
    //校验邮箱
    let validateMail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入邮箱"));
      }
      if (value && !/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)) {
        return callback(new Error("请输入正确格式邮箱"));
      }
      callback();
    };
    //校验手机号
    let validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      if (value && !/^[1][0-9]{10}$/.test(value)) {
        return callback(new Error("请输入正确格式手机号"));
      }
      callback();
    };
    //校验生日
    let validateBirth = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入此格式生日"));
      }
      if (
        value &&
        !/^((19[2-9]\d{1})|(20((0[0-9])|(1[0-8]))))\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2][0-9])|30|31)$/.test(
          value
        )
      ) {
        return callback(new Error("请输入正确格式生日"));
      }
      callback();
    };
    return {
      GENDER,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        nickname: "",
        avatarurl: "",
        mail: "",
        phone: "",
        gender: "1",
        birth: "",
        sign: "",
      },
      isShowDetailedInfo: false,
      visible: false,
      rules: {
        mail: [{ validator: validateMail, trigger: "change" }],
        phone: [{ validator: validatePhone, trigger: "change" }],
        birth: [{ validator: validateBirth, trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapGetters(["loginUserInfo"]),
  },
  mounted() {
    this.initForm();
  },

  methods: {
    ...mapActions(["setUserInfo"]),
    initForm() {
      this.form.nickname = this.loginUserInfo?.nickname ?? "";
      this.form.avatarurl = this.loginUserInfo?.avatarurl ?? "";
      this.form.mail = this.loginUserInfo?.mail ?? "";
      this.form.gender = this.loginUserInfo?.gender ?? "1";
      this.form.birth = this.loginUserInfo?.birth ?? "";
      this.form.sign = this.loginUserInfo?.sign ?? "";
    },
    async handleOk(e) {
      const data = Object.assign({}, this.form);
      try {
        await this.setUserInfo(data);
        this.visible = false;
      } catch (error) {
        this.$message.error(`修改失败,请稍后重试！`);
      }
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
.detailed-info {
  width: 100%;
  height: 100%;
  padding: 5px;
}
</style>