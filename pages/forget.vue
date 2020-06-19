/**
*
*  @author ZTiger
*
*/


<template>
  <login-register>
    <div class="login-from-wrap">
      <div style="text-align:left; margin-bottom:1rem;">重新设置密码</div>
      <Alert type="warning">
        <div class="forget-tip">忘记密码了？请输入您的电子邮箱，我们会发送重设邮件到您的邮箱。</div>
      </Alert>
      <div class="login-group" ref="emailRef">
        <label for="forget-email">电子邮件地址</label>
        <div class="login-group-input-wrap">
          <input
            id="forget-email"
            type="text"
            placeholder="请输入邮箱"
            autocomplete="off"
            v-model="email"
            @keydown.enter="handleSubmitEvent($event)"
            @blur="handleBlurEvent"
          />
          <div class="login-group-input-suffix">
            <div v-if="emailLoad===1" class="login-group-input-load" />
            <Icon v-else-if="emailLoad===-1" type="ios-warning" size="20" color="#ed4014" />
            <Icon v-else-if="emailLoad===0" type="ios-checkmark-circle" size="20" color="#19be6b" />
          </div>
        </div>
        <div class="login-group-tips">
          <Icon type="md-information-circle" size="16" />
          <span>{{emailErrorText}}</span>
        </div>
      </div>
      <button ref="submitref" class="login-button" @click="handleSubmitEvent($event)">确定</button>
      <div class="login-floor">
        <div style="color:#57a3f3;cursor:pointer;" @click="openModal">收不到邮件</div>
      </div>
    </div>
  </login-register>
</template>


<script>
import loginRegister from "@/components/loginRegister/index.vue";
export default {
  components: { loginRegister },
  data() {
    return {
      // 提示消息
      emailErrorText: "",
      // 邮箱
      email: "",
      // 设置按钮为加载中状态
      loading: false,
      // 邮箱查询等待
      emailLoad: 2,
      // 查询邮箱
      queryEmail: "",
    };
  },
  head() {
    return {
      title: "忘记密码 ● Freedom",
    };
  },
  watch: {
    email() {
      this.emailLoad = 2;
      this.$refs.emailRef.classList.remove("from-error");
    },
  },
  methods: {
    // 处理提交事件
    async handleSubmitEvent(event) {
      if (this.loading) return;
      this.loading = true;

      const ripples = this.handleAnimation(event);
      const valid = this.verifyData();
      if (!valid) {
        this.cancelAnimation(ripples);
        return;
      } else if (this.emailLoad !== 0) {
        this.$Message.info("验证邮箱中，请稍等");
        this.cancelAnimation(ripples);
        return;
      }
      try {
        await this.$request.forgetEmail({ email: this.email });
        const content = "您的邮件已发送，请前往您的邮箱中查看";
        this.email = "";
        this.loading = false;
        this.$Message.success({ duration: 10, content });
      } catch (err) {}
      this.cancelAnimation(ripples);
    },
    // 失去焦点
    handleBlurEvent() {
      const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!this.email) {
        this.emailLoad = 2;
      } else if (!emailReg.test(this.email)) {
        this.emailLoad = -1;
        this.$refs.emailRef.classList.add("from-error");
        this.emailErrorText = "邮箱格式错误";
      } else {
        this.queryEmailMethod(this.email);
      }
    },
    // 检测数据
    verifyData() {
      const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      let verify = true;
      if (!this.email) {
        verify = false;
        this.$refs.emailRef.classList.add("from-error");
        this.emailErrorText = "请输入邮箱地址";
      } else if (!emailReg.test(this.email)) {
        verify = false;
        this.$refs.emailRef.classList.add("from-error");
        this.emailErrorText = "邮箱格式错误";
      }
      return verify;
    },
    // 处理动画
    handleAnimation(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      const ripples = document.createElement("span");
      ripples.style.left = `${x}px`;
      ripples.style.top = `${y}px`;
      this.$refs.submitref.appendChild(ripples);
      return ripples;
    },
    // 取消动画
    cancelAnimation(ripples) {
      setTimeout(() => {
        ripples.remove();
        this.loading = false;
      }, 1000);
    },
    // 查询邮箱
    async queryEmailMethod(email) {
      if (this.emailLoad === 1 || this.queryEmail === email) return;
      this.emailLoad = 1;
      this.queryEmail = email;
      const { data } = await this.$request.registerQuery({ email });
      if (data) {
        this.emailLoad = 0;
      } else {
        this.emailLoad = -1;
        this.$refs.emailRef.classList.add("from-error");
        this.emailErrorText = "此邮箱地址未分配给任何用户账号";
      }
    },
    // 打开对话框
    openModal() {
      this.$Modal.info({
        title: "收不到邮件 ?",
        content:
          "通过邮箱接收邮件，请尝试到广告邮件、订阅邮件、垃圾邮件等目录找找看。",
        okText: "确定",
      });
    },
  },
};
</script>


<style scoped>
@import url("@/assets/css/login.css");
.forget-tip {
  margin: 5px;
  color: rgba(0, 0, 0, 0.65);
}
.login-group {
  margin-top: 40px;
}
</style>
