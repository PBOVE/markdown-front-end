/**
*
*  @author ZTiger
*
*/

<template>
  <login-register>
    <div class="login-from-wrap">
      <div style="text-align:left; margin-bottom:1.1rem;">账户密码登录</div>
      <div ref="accountRef" class="login-group">
        <label for="account">用户名/邮箱</label>
        <input
          id="account"
          v-model="account"
          type="text"
          placeholder="请输入用户名/邮箱"
          autocomplete="off"
          @keyup.enter="handleLoginEvent($event)"
        />
        <div class="login-group-tips">
          <Icon type="md-information-circle" size="16" />
          <span>请输入用户名</span>
        </div>
      </div>
      <div ref="passwordRef" class="login-group">
        <label for="password">密码</label>

        <div class="login-group-input-wrap">
          <input
            id="password"
            v-model="password"
            autocomplete="off"
            placeholder="请输入密码"
            :type="eye?'password':'text'"
            @keyup.enter="handleLoginEvent($event)"
          />
          <div class="login-group-input-suffix main-center-middle">
            <Icon
              :type="eye?'ios-eye-outline':'ios-eye-off-outline'"
              size="20"
              style="cursor:pointer;"
              @click="eye=!eye"
            />
          </div>
        </div>
        <div class="login-group-tips">
          <Icon type="md-information-circle" size="16" />
          <span>请输入密码</span>
        </div>
      </div>
      <div class="from-check">
        <Checkbox v-model="remember">记住密码</Checkbox>
        <nuxt-link to="/password_reset">忘记密码</nuxt-link>
      </div>
      <button ref="loginbtn" class="login-button" @click="handleLoginEvent($event)">登录</button>
      <div class="login-floor">
        <nuxt-link to="/register">注册账户</nuxt-link>
      </div>
    </div>
  </login-register>
</template>

<script>
import loginRegister from '@/components/loginRegister/index.vue';
import { userLogin, queryToken } from '@/api/user';

export default {
  components: { loginRegister },
  data() {
    return {
      // 账户
      account: '',
      // 密码
      password: '',
      // 记住密码
      remember: false,
      // 查看密码
      eye: true,
      // 设置按钮为加载中状态
      loading: false,
    };
  },
  watch: {
    account() {
      this.$refs.accountRef.classList.remove('from-error');
    },
    password() {
      this.$refs.passwordRef.classList.remove('from-error');
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
          account: this.account,
          password: this.password,
          remember: this.remember
        };
        await userLogin(params);
        const { data } = await queryToken();
        this.$store.commit('user/setWeather', data.weather);
        this.$store.commit('user/setUser', data.user);
        this.$store.commit('token/setToken', data._csrf.token);
        this.$router.push(
          this.$route.query.redirect || `/${data.user.userName}`,
        );
      } catch (err) {
        this.cancelAnimation(ripples);
      }
    },
    // 处理动画
    handleAnimation(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      const ripples = document.createElement('span');
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
      const account = this.account.replace(/\s+/g, '');
      const password = this.password.replace(/\s+/g, '');
      let valid = true;
      if (!account) {
        this.$refs.accountRef.classList.add('from-error');
        valid = false;
      }
      if (!password) {
        this.$refs.passwordRef.classList.add('from-error');
        valid = false;
      }
      return valid;
    },
  },
  head() {
    return {
      title: '登录 ● TBS.feel',
    };
  },
};
</script>

<style scoped>
@import url('@/assets/css/login.css');
.from-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0 1.2rem;
  user-select: none;
}
</style>
<style >
.login-wrap .ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: rgba(34, 47, 255, 0.33);
  background-color: rgb(34, 47, 255);
}
</style>
