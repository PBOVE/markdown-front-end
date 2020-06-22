/**
*
*  @author ZTiger
*
*/


<template>
  <div class="public-header-wrap" :class="{'public-shadow':shadow}">
    <div class="public-header-left nav-middle">
      <nuxt-link to="/" class="nav-middle">
        <div class="main-logo" />
        <div :style="{display:searchHide?'':'none'}" class="logo-title">Freedom</div>
      </nuxt-link>
      <AutoComplete
        :style="{display:searchHide?'none':''}"
        class="public-header-search"
        placeholder="搜索"
        icon="ios-search"
        v-model="inputData"
        :data="searchData"
      />
    </div>
    <div class="public-header-right nav-middle">
      <nuxt-link v-if="storeUserState" :to="userPage" class="public-header-right-icon nav-middle">
        <Icon type="ios-keypad" />
      </nuxt-link>
      <div
        v-if="storeUserState"
        class="user-portrait-wrap"
        data-user-portrait="true"
        :class="{'borderColor':userDropDown}"
      >
        <img
          v-if="storeImages"
          :src="storeImages"
          class="main-user-image"
          data-user-portrait="true"
        />
        <div v-else class="user-portrait" data-user-portrait="true">{{storeNickName|nickName}}</div>
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
    nickName(name) {
      return name ? name[0].toUpperCase() : "";
    },
  },
  props: {
    shadow: {
      type: Boolean,
      default: false,
    },
    "search-hide": {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 输入数据
      inputData: "",
      // 搜索数据
      searchData: [],
      // 点击用户头像
      userDropDown: false,
    };
  },
  computed: {
    ...mapGetters("user", [
      "storeNickName",
      "storeImages",
      "storeUserName",
      "storeUserState",
    ]),
    // 用户页
    userPage() {
      return `/${this.storeUserName}`;
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
}
.public-shadow {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  margin: 0 0 15px;
}
.public-header-right {
  font-size: 16px;
}
.user-portrait-wrap {
  border: 3px solid transparent;
  border-radius: 50%;
  transition: border 0.3s;
  font-family: Georgia;
  font-size: 0;
  cursor: pointer;
}
.user-portrait-wrap:hover {
  border-color: #c5c8ce;
}
.borderColor {
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
  font-size: 16px;
  color: #e8eaec;
  justify-content: center;
  user-select: none;
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
  margin: 0 0 0 20px;
  width: 350px;
}
.logo-title {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 0 10px;
  color: #000;
}
@media screen and (max-width: 670px) {
  .public-header-left {
    flex: 1;
  }
  .public-header-search {
    display: none;
  }
}
</style>
