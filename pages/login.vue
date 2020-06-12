/**
*
*  @author ZTiger
*
*/


<template>
  <login-register>
    <div class="login-from-wrap">
      <div style="text-align:left; margin-bottom:1rem;">账户密码登录</div>
      <div class="login-group" ref="usernameRef">
        <label for="username">用户名</label>
        <input
          id="username"
          type="text"
          placeholder="请输入用户名"
          autocomplete="off"
          v-model="username"
          @keyup.enter="handleLoginEvent($event)"
        />
        <div class="login-group-tips">
          <Icon type="md-information-circle" size="16" />
          <span>请输入用户名</span>
        </div>
      </div>
      <div class="login-group" ref="passwordRef">
        <label for="password">密码</label>
        <input
          id="password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
          v-model="password"
          @keyup.enter="handleLoginEvent($event)"
        />
        <div class="login-group-tips">
          <Icon type="md-information-circle" size="16" />
          <span>请输入密码</span>
        </div>
      </div>
      <div class="from-check">
        <Checkbox v-model="rememberMe" size="large">
          <span style="fontSize:14px; marginLeft:0.5rem; ">记住密码</span>
        </Checkbox>
        <a href="#">忘记密码</a>
      </div>
      <button ref="loginbtn" class="login-button" @click="handleLoginEvent($event)">登录</button>
      <div class="login-floor">
        <nuxt-link to="/register">注册账户</nuxt-link>
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
      // 用户名
      username: "",
      // 密码
      password: "",
      // 记住密码
      rememberMe: false,
      // 设置按钮为加载中状态
      loading: false,
    };
  },
  head() {
    return {
      title: "登录 ● Mountain",
    };
  },
  watch: {
    username() {
      this.$refs.usernameRef.classList.remove("from-error");
    },
    password() {
      this.$refs.passwordRef.classList.remove("from-error");
    },
  },
  methods: {
    // 处理登录事件
    async handleLoginEvent(event) {
      if (this.loading) return;
      this.loading = true;
      const valid = this.verifyContent();
      const ripples = this.handleAnimation(event);
      if (!valid) {
        this.cancelAnimation(ripples);
        return;
      }
      try {
        const params = {
          username: this.username,
          password: this.password,
        };
        await this.$request.LoginIn(params);
        const { data } = await this.$request.GetToken();
        this.$cookies.set("access_token", data._csrf.token);
        this.$store.commit("user/setUser", data.user);
        this.$store.commit("token/setToken", data._csrf.token);
        this.$router.push(this.$route.query.redirect || "/dashboard");
        console.log(data);
      } catch (err) {
        this.$Message.error({
          content: "用户名或密码错误,请重新输入",
          duration: 5,
        });
        this.cancelAnimation(ripples);
        return;
      }
    },
    // 处理动画
    handleAnimation(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      const ripples = document.createElement("span");
      ripples.style.left = `${x}px`;
      ripples.style.top = `${y}px`;
      this.$refs.loginbtn.appendChild(ripples);
      return ripples;
    },
    // 取消动画
    cancelAnimation(ripples) {
      setTimeout(() => {
        ripples.remove();
        this.loading = false;
      }, 1000);
    },
    // 检测
    verifyContent() {
      const username = this.username.replace(/\s+/g, "");
      const password = this.password.replace(/\s+/g, "");
      let valid = true;
      if (!username) {
        this.$refs.usernameRef.classList.add("from-error");
        valid = false;
      }
      if (!password) {
        this.$refs.passwordRef.classList.add("from-error");
        valid = false;
      }
      return valid;
    },
  },
};
</script>


<style scoped>
@import url("@/assets/css/login.css");
.from-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0 1.2rem;
  user-select: none;
}
</style>
<style >
.login-button span {
  position: absolute;
  background: #fff;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: animate 1s linear infinite;
}
.login-wrap .ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: rgba(34, 47, 255, 0.33);
  background-color: rgb(34, 47, 255);
}
@keyframes animate {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;
  }
  100% {
    width: 700px;
    height: 600px;
    opacity: 0;
  }
}
</style>

