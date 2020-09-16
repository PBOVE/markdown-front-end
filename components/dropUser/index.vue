/**
*
*  @author ZTiger
*
*/

<template>
  <transition name="userDrop">
    <div class="user-drop-box" @click.stop>
      <Spin v-show="loading" fix />
      <div class="box-header">
        <div class="header-content">
          <head-portrait-show
            class="header-protrait"
            :images="storeImages"
            :name="storeUser.nickName"
            :width="80"
            :height="80"
          />
          <div class="header-icon-wrap">
            <div class="header-icon" @click="openHeadPortrait">
              <Icon type="ios-camera" size="18" />
            </div>
          </div>
        </div>
        <div class="header-name">{{ storeUser.nickName }}</div>
        <div class="header-name">{{ storeUser.userName }}</div>
        <weather-view v-if="storeWeather" class="weather-view" />
        <router-link to="/user" class="header-link-user">管理您的 TBS.feel 账号</router-link>
      </div>
      <Divider />
      <div class="box-main">
        <div class="box-main-button" @click="buttonEvent">
          <span>退出</span>
        </div>
      </div>
      <head-portrait v-model="headPortrait" />
    </div>
  </transition>
</template>

<script>
// 点击上传照片
import headPortrait from '@/components/headPortrait/setting.vue';
import { mapGetters } from 'vuex';
import { _logout } from '@/api/user';
import headPortraitShow from '@/components/headPortrait/show.vue';
import weatherView from '@/components/publicHeader/weather.vue';

export default {
  components: { headPortrait, headPortraitShow, weatherView },
  data() {
    return {
      // 修改照片
      headPortrait: false,
      // 加载
      loading: false,
    };
  },
  computed: {
    ...mapGetters('user', ['storeUser', 'storeImages', 'storeWeather']),
  },
  methods: {
    // 打开修改照片
    openHeadPortrait() {
      this.headPortrait = true;
      this.$emit('input', false);
    },
    // 点击退出
    async buttonEvent() {
      try {
        this.loading = true;
        await _logout();
        this.$store.commit('token/removeToken');
        this.$router.push('/login');
      } catch (err) {}
    },
  },
};
</script>

<style scoped>
.user-drop-box {
  position: fixed;
  z-index: 1998;
  right: 8%;
  top: 55px;
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.box-header {
  padding: 30px 30px 10px;
  text-align: center;
  font-size: 15px;
}
.header-content {
  position: relative;
  display: inline-block;
  font-size: 0;
}
.box-main-button,
.header-icon-wrap,
.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-icon-wrap {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: #fff;
}
.header-icon {
  height: 24px;
  width: 24px;
  box-shadow: 0 1px 1px 0 rgba(65, 69, 73, 0.3),
    0 1px 3px 1px rgba(65, 69, 73, 0.15);
  border-radius: 50%;
  cursor: pointer;
}
.header-icon:hover {
  background: #f8faff;
  color: #1a73e8;
}
.header-name {
  margin: 10px 0 5px 0;
  font-size: 16px;
  font-family: Georgia;
  color: #202124;
  letter-spacing: 0.1em;
}
.header-name:last-of-type {
  margin: 0 0 5px 0;
  color: #5f6368;
}
.header-link-user {
  display: inline-block;
  margin: 15px 0 0 0;
  padding: 5px 20px;
  border: 1px solid #dadce0;
  border-radius: 100px;
  color: #3c4043;
}
.header-link-user:hover {
  background: #f7f8f8;
}
.box-main {
  padding: 10px 30px 30px;
  text-align: center;
}
.box-main-button {
  display: inline-block;
  padding: 8px 25px;
  font-size: 14px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  cursor: pointer;
}
.box-main-button:hover {
  background: #e8eaec;
}
.userDrop-enter-active,
.userDrop-leave-active {
  transition: all 0.3s ease;
}
.userDrop-enter,
.userDrop-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
@media screen and (max-width: 400px) {
  .user-drop-box {
    width: 90%;
    right: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
@media screen and (min-width: 500px) {
  .weather-view{
    display: none;
  }
}
</style>
