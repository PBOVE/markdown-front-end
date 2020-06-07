/**
*
*  @author ZTiger
*
*/


<template>
  <div class="inner">
    <div style="text-align:left; margin-bottom:1rem;">账户密码登录</div>
    <div class="from-group" ref="usernameRef">
      <label for="username">账户</label>
      <input
        id="username"
        type="text"
        placeholder="请输入账户"
        autocomplete="off"
        v-model="username"
        @change="handleBlur(1)"
      />
    </div>
    <div class="from-group" ref="passwordRef">
      <label for="password">密码</label>
      <input
        id="password"
        type="password"
        placeholder="请输入密码"
        v-model="password"
        @change="handleBlur(2)"
      />
    </div>
    <div class="from-check">
      <Checkbox v-model="rememberMe" size="large">
        <span style="fontSize:14px; marginLeft:0.5rem; ">记住密码</span>
      </Checkbox>
      <a href="#">忘记密码</a>
    </div>
    <button ref="loginbtn" class="loginbtn" @click="handleLoginEvent($event)">登录</button>
    <div class="login-floor">
      <a href="#">注册账户</a>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 用户名
      username: "",
      // 密码
      password: "",
      // 记住密码
      rememberMe: false,
      //  设置按钮为加载中状态
      loading: false,
    };
  },
  methods: {
    // 处理登录事件
    handleLoginEvent(event) {
      if (this.loading) return;
      this.loading = true;
      const valid = this.verifyContent();
      const ripples = this.handleAnimation(event);
      if (!valid) {
        setTimeout(() => {
          ripples.remove();
          this.loading = false;
        }, 1000);
        return;
      }
      this.$axios
        .post("/login", {
          username: this.username,
          password: this.password,
        })
        .then(res => {
          console.log(res);
        });
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
    // 处理失去焦点
    handleBlur(type) {
      switch (type) {
        case 1:
          this.$refs.usernameRef.classList.remove("from-error");
          break;
        case 2:
          this.$refs.passwordRef.classList.remove("from-error");
          break;
        default:
          break;
      }
    },
  },
};
</script>


<style scoped>
.inner {
  margin: 4rem 0 0 0;
}
.from-group {
  margin: 0 0 1rem 0;
}
.from-group,
.from-group input,
.half-from button {
  display: inline-block;
  width: 100%;
}
.from-group label {
  position: relative;
  background: #fff;
  padding: 0 0.28rem;
  color: #666;
  bottom: -0.6rem;
  user-select: none;
}
.from-group input {
  height: 2.6rem;
  outline: none;
  border: 0.07rem solid #ddd;
  border-radius: 0.4rem;
  text-align: center;
  letter-spacing: 0.1rem;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
.from-group input::placeholder {
  color: #ddd;
}
.from-group input:hover {
  border-color: #222fffdd;
}
.from-group input:focus {
  border-color: #222fffdd;
  box-shadow: 0 0 0 0.14rem #222fff44;
}
.from-error.from-group input{
  border-color: #ed4014;
}
.from-error.from-group label {
  color: #ed4014;
}
.from-error.from-group input:focus {
  border-color: #ed4014;
  box-shadow: 0 0 0 2px rgba(237, 64, 20, 0.2);
}
.from-error.from-group input:hover {
  box-shadow: 0 0 0 2px rgba(237, 64, 20, 0.2);
}
.from-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0 1.2rem;
  user-select: none;
}
.loginbtn {
  position: relative;
  height: 2.6rem;
  margin: 1rem 0 0 0;
  outline: none;
  color: #fff;
  font-size: 1.14rem;
  letter-spacing: 0.2rem;
  border: 0;
  background-image: linear-gradient(90deg, #0162c6, #755bea);
  box-shadow: 0 0.28rem 0.85rem rgba(34, 47, 255, 0.33);
  text-shadow: 0 0.14rem 0.28rem rgba(0, 0, 0, 0.28);
  border-radius: 0.3rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;
}
.login-floor {
  margin: 1.2rem 0 0;
  text-align: right;
  user-select: none;
}
</style>
<style >
.loginbtn span {
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
