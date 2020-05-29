/**
*
*  @author ZTiger
*
*/


<template>
  <div class="login-wrap">
    <div class="login-from-wrap">
      <img class="signal" src="@/static/images/star.png" />
      <div class="login-from">
        <div class="half half-show">
          <div class="title">
            <h3>欢迎来到</h3>
            <h1>
              Markdown
              <span style="font-weight:lighter;">平台</span>
            </h1>
          </div>
          <div class="title-content">
            <div>Markdown是一种可以使用普通文本编辑器编写的标记语言，通过简单的标记语法，它可以使普通文本内容具有一定的格式。</div>
          </div>
          <div class="circle" />
        </div>
        <div class="half half-from">
          <div class="inner">
            <div style="text-align:left; margin-bottom:1rem;">账户密码登录</div>
            <!-- <Alert style="text-align:left;" type="error">账户或密码错误</Alert> -->
            <div class="from-group">
              <label for="username">账户</label>
              <input id="username" type="text" placeholder="请输入账户" autocomplete="off" />
            </div>
            <div class="from-group">
              <label for="password">密码</label>
              <input id="password" type="password" placeholder="请输入密码" />
            </div>
            <div class="from-check">
              <Checkbox v-model="rememberMe" size="large">
                <span style="fontSize:14px; marginLeft:0.5rem; ">记住密码</span>
              </Checkbox>
              <a href="#" class="forget">忘记密码</a>
            </div>
            <button ref="loginbtn" class="loginbtn" @click="handleLoginEvent($event)">登录</button>
            <div class="login-floor">
              <a href="#" class="forget">注册账户</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formLeft: {},
      loginFrom: {
        name: ""
      },
      rememberMe: false
    };
  },
  methods: {
    // 处理登录事件
    handleLoginEvent(event) {
      this.handleAnimation(event);
      window.console.log(event);
    },
    // 处理动画效果
    handleAnimation(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      window.console.log(event.offsetX, event.target.offsetLeft, event.target);
      const ripples = document.createElement("span");
      ripples.style.left = `${x}px`;
      ripples.style.top = `${y}px`;
      this.$refs.loginbtn.appendChild(ripples);
      setTimeout(() => {
        ripples.remove();
      }, 1000);
    }
  }
};
</script>


<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
.login-from-wrap {
  position: relative;
}
.login-from {
  display: flex;
  width: 65rem;
  height: 30rem;
  letter-spacing: 0.1rem;
  background: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 1.4rem 2.9rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.half {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  padding: 0 5rem 4.5rem;
}
.half-show {
  background-image: linear-gradient(134deg, #965eff 0%, #2e5eff 100%);
  color: #fff;
}
.circle {
  position: absolute;
  right: -3.5rem;
  bottom: 1rem;
  width: 7.1rem;
  height: 7.1rem;
  border-radius: 50%;
  border: 1.4rem solid #fff;
}
.signal {
  position: absolute;
  top: -7rem;
  left: 25%;
  opacity: 0.3;
  z-index: 9;
}
.title {
  margin: 0 0 0 1rem;
}
.title-content {
  line-height: 2rem;
}
.title h1 {
  margin: 1rem 0;
}
.inner {
  margin: 4rem 0 0 0;
}
.half-from {
  text-align: center;
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
.from-check {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 1.2rem;
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
