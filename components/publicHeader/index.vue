/**
*
*  @author ZTiger
*
*/


<template>
  <div class="public-header-wrap" :class="{'public-shadow':shadow}">
    <div class="public-header-left nav-middle">
      <div class="public-header-logo-warp nav-middle">
        <img src="@/assets/images/mountain.png" class="public-header-logo" />
        <nuxt-link to="/" class="public-header-logo-title">Freedom</nuxt-link>
      </div>
    </div>
    <div class="public-header-right nav-middle">
      <nuxt-link to="/dashboard" class="public-header-right-icon nav-middle">
        <Icon type="ios-keypad" />
      </nuxt-link>
      <div class="user-portrait-wrap" v-if="storeNickName" data-user-portrait="true">
        <div class="user-portrait" data-user-portrait="true">{{storeNickName|userName}}</div>
      </div>
      <div v-else>
        <nuxt-link to="/login">
          <span class="link-login">登录</span>
        </nuxt-link>
      </div>
    </div>
    <user-drop v-model="userDropDown" />
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import userDrop from "@/components/userDrop/index.vue";

export default {
  components: { userDrop },
  filters: {
    userName(name) {
      return name[0].toUpperCase();
    },
  },
  props: {
    shadow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userDropDown: false,
    };
  },
  computed: {
    ...mapGetters("user", ["storeNickName"]),
  },
};
</script>


<style scoped>
.public-header-wrap {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 0 50px;
}
.public-shadow {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin: 0 0 15px;
}
.public-header-logo-warp {
  font-size: 0;
}
.public-header-logo {
  height: 30px;
}
.public-header-logo-title {
  margin: 0 0 0 10px;
  font-family: Georgia;
  font-size: 18px;
  font-weight: bold;
  color: #000;
}
.public-header-right {
  font-size: 16px;
}
.user-portrait-wrap {
  border: 3px solid transparent;
  border-radius: 50%;
  transition: border 0.3s;
  font-family: Georgia;
}
.user-portrait-wrap:hover {
  border-color: #c5c8ce;
}
.user-portrait {
  display: flex;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: linear-gradient(130deg, #5c2a9d, #0779e4 80%);
  font-weight: bold;
  color: #e8eaec;
  justify-content: center;
  user-select: none;
  cursor: pointer;
}
.nav-middle {
  display: flex;
  align-items: center;
}
.link-login {
  display: inline-block;
  padding: 6px 12px;
  text-align: center;
  border-radius: 2px;
  font-weight: 500;
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #fff;
  background-color: #2d8cf0;
  transition: background-color 0.8s;
  font-weight: 700;
}
.public-header-right-icon {
  margin: 0 20px 0 0;
  font-size: 25px;
  color: #515a6e;
}
</style>
