/**
*
*  @author ZTiger
*
*/


<template>
  <transition name="userDrop">
    <div class="user-drop-box" v-show="model" @click.stop>
      <div class="box-header">
        <div class="header-content">
          <img v-if="storeImages" :src="storeImages" class="box-header-image" />
          <div class="header-nickname" v-else>{{storeUser.nickName|userName}}</div>
          <div class="header-icon-wrap">
            <div class="header-icon">
              <Icon type="ios-camera" size="18" />
            </div>
          </div>
        </div>
        <div class="header-name">{{storeUser.nickName}}</div>
        <div class="header-name">{{storeUser.userName}}</div>
        <router-link to="/user" class="header-link-user">管理您的 Freedom 账号</router-link>
      </div>
      <Divider />
      <div class="box-main">
        <div class="box-main-button">退出</div>
      </div>
    </div>
  </transition>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  filters: {
    userName(name) {
      return name ? name[0].toUpperCase() : "";
    },
  },
  model: {
    prop: "model",
    event: "model-event",
  },
  props: {
    model: Boolean,
  },
  data() {
    return {
      images: "",
    };
  },
  computed: {
    ...mapGetters("user", ["storeUser", "storeImages"]),
  },
  mounted() {
    window.addEventListener("click", this.globalEvent);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.globalEvent);
  },
  methods: {
    // 注册全局事件
    globalEvent(evnet) {
      const target = evnet.target;
      if (target.dataset.userPortrait === "true") {
        this.$emit("model-event", !this.model);
      } else {
        this.$emit("model-event", false);
      }
    },
  },
};
</script>


<style scoped>
.user-drop-box {
  position: fixed;
  z-index: 1998;
  right: 20px;
  top: 50px;
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
.box-header-image,
.header-nickname {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.header-nickname {
  line-height: 80px;
  font-size: 22px;
  font-family: Georgia;
  color: #dff6f0;
  background: linear-gradient(130deg, #5c2a9d, #0779e4 80%);
}
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
</style>
