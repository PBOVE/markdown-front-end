/**
*
*  @author ZTiger
*
*/

<template>
  <div class="public-header-wrap" :class="{'public-shadow':shadow}">
    <div class="public-header-left nav-middle">
      <nuxt-link to="/" class="nav-middle">
        <!-- <div class="main-logo" /> -->
        <div class="logo-title">TBS.feel</div>
      </nuxt-link>
      <search-view class="public-header-search" />
    </div>
    <div class="public-header-right nav-middle">
      <weather-view v-if="storeUserState&&storeWeather" class="weather-view" />
      <nuxt-link v-if="storeUserState" :to="userPage" class="public-header-right-icon nav-middle">
        <Icon type="ios-keypad" />
      </nuxt-link>
      <div v-if="storeUserState" @click.stop="openDropUser">
        <head-portrait-show
          :images="storeImages"
          :name="storeNickName"
          :width="30"
          :height="30"
        />
      </div>
      <div v-else>
        <nuxt-link to="/login">
          <span class="link-login">登录</span>
        </nuxt-link>
      </div>
    </div>
    <drop-user v-show="userDropDown" v-model="userDropDown" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import dropUser from '@/components/dropUser/index.vue';
import weatherView from '@/components/publicHeader/weather.vue';
import searchView from '@/components/publicHeader/search.vue';
import headPortraitShow from '@/components/headPortrait/show.vue';

export default {
  components: { dropUser, weatherView, searchView, headPortraitShow },
  props: {
    shadow: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/prop-name-casing
    'search-hide': {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 点击用户头像
      userDropDown: false,
    };
  },
  computed: {
    ...mapGetters('user', [
      'storeNickName',
      'storeImages',
      'storeUserName',
      'storeUserState',
      'storeWeather',
    ]),
    // 用户页
    userPage() {
      return `/${this.storeUserName}`;
    },
  },
  mounted() {
    window.addEventListener('click', this.globalEvent);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.globalEvent);
  },
  methods: {
    // 注册全局事件
    globalEvent() {
      if (this.userDropDown) this.userDropDown = false;
    },
    openDropUser() {
      this.userDropDown = !this.userDropDown;
    },
  },
};
</script>

<style scoped>
.public-header-wrap {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 0 10% 0 3%;
  background: #ffffff;
}
.public-shadow {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.public-header-left {
  flex: 1;
  margin: 0 10px 0 0;
}
.public-header-right {
  font-size: 16px;
}
.borderColor {
  border-color: #c5c8ce;
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
.link-login:hover {
  background: #2d8cf0aa;
}
.public-header-right-icon {
  margin: 0 20px 0 0;
  font-size: 25px;
  color: #515a6e;
}
.public-header-search {
  flex: 1;
  margin: 0 0 0 10px;
}
.logo-title {
  font-family: Georgia;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 0 10px;
  color: #000;
}
@media screen and (max-width: 730px) {
  .logo-title {
    display: inline-block !important;
  }
  .public-header-wrap {
    padding: 0 3%;
  }
  .public-header-right-icon {
    margin: 0 10px 0 0;
  }
}
@media screen and (max-width: 500px) {
  .weather-view {
    display: none;
  }
}
@media screen and (max-width: 400px) {
  .main-logo {
    display: none;
  }
  .logo-title {
    margin: 0;
  }
}

</style>
