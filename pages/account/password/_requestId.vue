/**
*
*  @author ZTiger
*
*/

<template>
  <login-register>
    <div class="forget-from-wrap">
      <div style="text-align:left; margin-bottom:1.1rem;">更换密码</div>
      <Poptip word-wrap class="forget-poptip" trigger="focus" placement="top-start">
        <div slot="content" class="forget-poptip-content">
          <div>强度: {{ strength }}</div>
          <Progress
            class="forget-poptip-content-progress"
            :percent="percent"
            :stroke-color="strokeColor"
            :hide-info="true"
          />
          <div>请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
        </div>
        <div ref="passwordRef" class="login-group">
          <label for="password">新密码</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
            @blur="handleBlurEvent(1)"
            @keyup.enter="handleSubmitEvent($event)"
          />
          <div class="login-group-tips">
            <Icon type="md-information-circle" size="16" />
            <span>{{ passwordErrorText }}</span>
          </div>
        </div>
      </Poptip>
      <div ref="againRef" class="login-group">
        <label for="forget-again">新密码（重复）</label>
        <input
          id="forget-again"
          v-model="again"
          type="password"
          placeholder="请输入新密码（重复）"
          autocomplete="off"
          @keydown.enter="handleSubmitEvent($event)"
          @blur="handleBlurEvent(2)"
        />
        <div class="login-group-tips">
          <Icon type="md-information-circle" size="16" />
          <span>{{ againErrorText }}</span>
        </div>
      </div>
      <button ref="submitref" class="login-button" @click="handleSubmitEvent($event)">确定</button>
    </div>
  </login-register>
</template>

<script>
import { _forgetEmailLink } from '@/api/account';
import { _verifyRequestId } from '@/api/valid';
import loginRegister from '@/components/loginRegister/index.vue';

export default {
  components: { loginRegister },
  async validate({ params }) {
    try {
      const { data } = await _verifyRequestId(params.requestId, {
        type: 'password',
      });
      return data;
    } catch (err) {}
  },
  data() {
    return {
      // 密码
      password: '',
      // 重复密码
      again: '',
      // 密码错误提示
      passwordErrorText: '',
      // 重复密码提示
      againErrorText: '',
      // 进度条颜色
      strokeColor: '#ed4014',
      // 强度
      strength: '低',
      // 百分比
      percent: 0,
    };
  },
  watch: {
    password(val) {
      this.handleError('password', 'remove');
      if (val.length < 6) {
        this.strength = '低';
        this.strokeColor = '#ed4014';
        this.percent = val.length * 5;
      } else if (val.length < 20) {
        this.strength = '中';
        this.strokeColor = '#ff9900';
        this.percent = val.length * 5;
      } else {
        this.strength = '高';
        this.strokeColor = '#19be6b';
        this.percent = 100;
      }
    },
    again() {
      this.handleError('again', 'remove');
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
      }
      const { requestId } = this.$route.params;
      try {
        const params = {
          password: this.password,
        };
        await _forgetEmailLink(requestId, params);
        const content = '密码更换成功';
        this.$Message.success({ duration: 8, content, background: true });
        this.$router.push('/login');
      } catch (err) {
        this.cancelAnimation(ripples);
      }
    },
    // 失去焦点
    handleBlurEvent(type) {
      if (type === 1) {
        if (this.password && this.password.length < 6) {
          this.handleError('password', 'add', '密码强度太低');
        }
      }
      if (this.password && this.again) {
        if (this.password !== this.again) {
          this.handleError('again', 'add', '两次输入的密码必须相同');
        } else this.handleError('again', 'remove');
      }
    },
    // 检测数据
    verifyData() {
      let verify = true;
      if (!this.password) {
        this.handleError('password', 'add', '请输入新密码');
        verify = false;
      } else if (this.password.length < 6) {
        this.handleError('password', 'add', '密码强度太低');
        verify = false;
      }
      if (!this.password) {
        this.handleError('again', 'add', '请输入新密码（重复）');
        verify = false;
      } else if (this.password !== this.again) {
        this.handleError('again', 'add', '两次输入的密码必须相同');
        verify = false;
      }
      return verify;
    },
    // 处理动画
    handleAnimation(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      const ripples = document.createElement('span');
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
    // 处理错误
    handleError(name, type, tips) {
      this.$refs[`${name}Ref`].classList[type]('from-error');
      if (tips) this[`${name}ErrorText`] = tips;
    },
  },
  head() {
    return {
      title: '修改密码 ● TBS.feel',
    };
  },
};
</script>

<style scoped>
@import url('@/assets/css/login.css');
.forget-poptip {
  width: 100%;
  position: relative;
}
.forget-poptip-content {
  display: flex;
  flex-wrap: wrap;
}
.forget-poptip-content-progress {
  margin: 0.7rem 0;
}
</style>
<style >
.forget-from-wrap .ivu-poptip-rel {
  width: 100%;
}
.forget-from-wrap .ivu-poptip-popper {
  width: 100% !important;
}
.forget-from-wrap .ivu-poptip-body-content-inner {
  color: #000;
}
</style>
