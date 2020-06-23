/**
*
*  @author ZTiger
*
*/


<template>
  <login-Register>
    <div class="register-wrap">
      <div style="text-align:left; margin-bottom:1.1rem;">邮箱注册</div>
      <div class="login-group" ref="emailRef">
        <label for="email">邮箱</label>
        <div class="login-group-input-wrap">
          <input
            id="email"
            type="text"
            placeholder="请输入邮箱"
            autocomplete="off"
            v-model="email"
            @blur="handleBlur(1)"
            @keyup.enter="handleRegisterEvent($event)"
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
      <Poptip
        word-wrap
        class="register-poptip"
        trigger="focus"
        content="用户名只能包含字母数字字符或单个连字符，不能以连字符开头或结尾。"
        placement="top-start"
      >
        <div class="login-group" ref="usernameRef">
          <label for="username">用户名</label>
          <div class="login-group-input-wrap">
            <input
              id="username"
              type="text"
              placeholder="请输入用户名"
              autocomplete="off"
              v-model="username"
              @keyup.enter="handleRegisterEvent($event)"
            />
            <div class="login-group-input-suffix">
              <div v-if="usernameLoad===1" class="login-group-input-load" />
              <Icon v-else-if="usernameLoad===-1" type="ios-warning" size="20" color="#ed4014" />
              <Icon
                v-else-if="usernameLoad===0"
                type="ios-checkmark-circle"
                size="20"
                color="#19be6b"
              />
            </div>
          </div>
          <div class="login-group-tips">
            <Icon type="md-information-circle" size="16" />
            <span>{{usernameErrorText}}</span>
          </div>
        </div>
      </Poptip>
      <Poptip word-wrap class="register-poptip" trigger="focus" placement="top-start">
        <div slot="content" class="register-poptip-content">
          <div>强度: {{strength}}</div>
          <Progress
            class="register-poptip-content-progress"
            :percent="percent"
            :stroke-color="strokeColor"
            :hide-info="true"
          />
          <div>请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
        </div>
        <div class="login-group" ref="passwordRef">
          <label for="password">密码</label>
          <input
            id="password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
            v-model="password"
            @blur="handleBlur(3)"
            @keyup.enter="handleRegisterEvent($event)"
          />
          <div class="login-group-tips">
            <Icon type="md-information-circle" size="16" />
            <span>{{passwordErrorText}}</span>
          </div>
        </div>
      </Poptip>
      <button ref="loginbtn" class="login-button" @click="handleRegisterEvent($event)">注册</button>
      <div class="login-floor">
        <nuxt-link to="/login">使用已有账户登录</nuxt-link>
      </div>
    </div>
  </login-Register>
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
      // 邮箱
      email: "",
      // 用户名错误
      usernameErrorText: "",
      // 密码错误
      passwordErrorText: "",
      // 邮箱错误
      emailErrorText: "",
      // 进度条颜色
      strokeColor: "#ed4014",
      // 强度
      strength: "低",
      // 百分比
      percent: 0,
      // 设置按钮为加载中状态
      loading: false,
      // 用户名查询等待
      usernameLoad: 2,
      // 查询用户名
      queryName: "",
      // 邮箱查询等待
      emailLoad: 2,
      // 查询邮箱
      queryEmail: "",
    };
  },
  head() {
    return {
      title: "注册 ● TBS.feel",
    };
  },
  watch: {
    email() {
      this.handleError("email", "remove");
      this.emailLoad = 2;
    },
    username(name) {
      const usernameReg = /^[A-Za-z0-9]+([\-]?[A-Za-z0-9]+)*$/;
      const nameRules = [
        /^user$/,
        /^accounts$/,
        /^login$/,
        /^register$/,
        /^password_reset$/,
      ];
      const verifyName = nameRule => {
        return nameRule.test(name);
      };
      this.handleError("username", "remove");
      if (!name) {
        this.usernameLoad = 2;
      } else if (!usernameReg.test(this.username)) {
        this.usernameLoad = -1;
        this.handleError("username", "add", "用户名格式错误");
      } else if (nameRules.some(verifyName)) {
        this.usernameLoad = -1;
        this.handleError("username", "add", `用户名 ${name} 不可用`);
      } else this.queryNameMethod(name);
    },
    password(val) {
      this.handleError("password", "remove");
      if (val.length < 6) {
        this.strength = "低";
        this.strokeColor = "#ed4014";
        this.percent = val.length * 5;
      } else if (val.length < 20) {
        this.strength = "中";
        this.strokeColor = "#ff9900";
        this.percent = val.length * 5;
      } else {
        this.strength = "高";
        this.strokeColor = "#19be6b";
        this.percent = 100;
      }
    },
  },
  methods: {
    // 处理失去焦点
    handleBlur(type) {
      const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      const usernameReg = /^[A-Za-z0-9]+([\-]?[A-Za-z0-9]+)*$/;
      if (type === 1) {
        if (!this.email) {
          this.emailLoad = 2;
        } else if (!emailReg.test(this.email)) {
          this.emailLoad = -1;
          this.handleError("email", "add", "邮箱地址格式错误");
        } else {
          this.queryEmailMethod(this.email);
        }
      } else if (type === 3 && this.password && this.password.length < 6) {
        this.handleError("password", "add", "密码强度太低");
      }
    },
    // 验证数据
    verifyData() {
      const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      const usernameReg = /^[A-Za-z0-9]+([\-]?[A-Za-z0-9]+)*$/;
      let flag = true;
      if (!this.email) {
        this.handleError("email", "add", "请输入邮箱地址");
        flag = false;
      } else if (!emailReg.test(this.email)) {
        this.handleError("email", "add", "邮箱地址格式错误");
        flag = false;
      }
      if (!this.username) {
        this.handleError("username", "add", "请输入用户名");
        flag = false;
      } else if (!usernameReg.test(this.username)) {
        this.handleError("username", "add", "用户名格式错误");
        flag = false;
      }
      if (!this.password) {
        this.handleError("password", "add", "请输入密码");
        flag = false;
      } else if (this.password.length < 6) {
        this.handleError("password", "add", "密码强度太低");
        flag = false;
      }
      return flag;
    },
    // 处理注册事件
    async handleRegisterEvent(event) {
      if (this.loading) return;
      this.loading = true;
      const result = this.verifyData();
      const ripples = this.handleAnimation(event);
      if (!result) {
        this.cancelAnimation(ripples);
        return;
      }
      if (this.emailLoad !== 0 || this.usernameLoad !== 0) {
        this.$Message.info({
          background: true,
          content: "数据验证中,请稍等",
          duration: 5,
        });
        this.cancelAnimation(ripples);
        return;
      }
      await this.$request.register({
        username: this.username,
        password: this.password,
        email: this.email,
      });
      this.$router.push("/login");
    },
    // 处理错误
    handleError(name, type, tips) {
      this.$refs[`${name}Ref`].classList[type]("from-error");
      if (tips) this[`${name}ErrorText`] = tips;
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
    // 查询用户名
    async queryNameMethod(name) {
      if (this.usernameLoad === 1) {
        this.queryName = name;
        return;
      }
      this.usernameLoad = 1;
      const { data } = await this.$request.registerQuery({ name });
      if (this.usernameLoad === -1) return (this.queryName = "");
      this.usernameLoad = 2;
      if (this.queryName) {
        const queryName = this.queryName;
        this.queryName = "";
        this.queryNameMethod(queryName);
      } else if (data) {
        this.usernameLoad = -1;
        this.handleError("username", "add", `用户名 ${name} 已存在`);
      } else if (this.username) {
        this.usernameLoad = 0;
      }
    },
    // 查询邮箱
    async queryEmailMethod(email) {
      if (this.emailLoad === 1 || this.queryEmail === email) return;
      this.emailLoad = 1;
      this.queryEmail = email;
      const { data } = await this.$request.registerQuery({ email });
      if (data) {
        this.emailLoad = -1;
        this.handleError("email", "add", `邮箱 ${email} 已存在`);
      } else {
        this.emailLoad = 0;
      }
    },
  },
};
</script>


<style scoped>
@import url("@/assets/css/login.css");
.register-poptip {
  width: 100%;
  position: relative;
}
.register-poptip-content {
  display: flex;
  flex-wrap: wrap;
}
.register-poptip-content-progress {
  margin: 0.7rem 0;
}
</style>
<style >
.register-wrap .ivu-poptip-rel {
  width: 100%;
}
.register-wrap .ivu-poptip-popper {
  width: 100% !important;
}
.register-wrap .ivu-poptip-body-content-inner {
  color: #000;
}
</style>
