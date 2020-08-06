/**
*
*  @author ZTiger
*
*/

<template>
  <div class="login-register-wrap main-center-middle">
    <div class="login-from-wrap">
      <img class="signal" src="@/assets/images/ball.png" />
      <div class="login-from">
        <div class="half half-show">
          <div class="title">
            <h3>欢迎来到</h3>
            <h1>
              <nuxt-link to="/" style="color:#fff;">TBS.feel</nuxt-link>
              <span style="font-weight:lighter;">平台</span>
            </h1>
          </div>
          <div class="title-content">
            <div></div>
          </div>
          <div class="circle" />
        </div>
        <div class="half half-from">
          <transition name="view" mode="out-in">
            <slot />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.login-register-wrap {
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/svg/background.svg");
  background-size: 100% 100%;
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
  border-radius: 1rem;
  /* box-shadow: 0 1.4rem 2.9rem rgba(0, 0, 0, 0.1); */
  overflow: hidden;
}
.half {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  padding: 2rem 5rem 0rem;
}
.half-show {
  background-image: linear-gradient(134deg, #965eff 0%, #2e5eff 100%);
  color: #fff;
  padding: 0rem 5rem 4.5rem;
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

.half-from {
  border-radius: 0 1.5rem 1.5rem 0;
  border: 1px solid #965eff;
  border-left: 0;
}

@media screen and (max-width: 1040px) {
  .login-from {
    width: 520px;
  }
  .half {
    width: 100%;
  }
  .half-show,
  .signal {
    display: none;
  }
  .half-from {
    border: 0px solid #965eff;
    border-radius: 1.5rem;
  }
}
@media screen and (max-width: 540px) {
  .login-from-wrap {
    width: 100%;
  }
  .login-from {
    margin: 0 auto;
    width: 90%;
  }
  .half {
    padding: 2rem 1rem 0rem;
  }
}
.view-enter,
.view-leave-to {
  opacity: 0;
}
.view-enter-active,
.view-leave-active {
  transition: opacity 0.4s;
}
</style>
