/**
*
*  @author ZTiger
*
*/


<template>
  <div class="user-personal-index-wrap">
    <div class="user-border">
      <div class="user-title-wrap">
        <div class="user-title">个人资料</div>
        <div class="user-title-content">Freedom 为您带来更好的服务与帮助</div>
      </div>
      <div class="user-row" @click="headPortrait=true">
        <div class="user-row-main user-middle">
          <div class="user-middle-left">
            <div class="user-row-title">照片</div>
            <div class="user-row-content user-row-content-tip">更改照片，可帮助您个性化您的帐号</div>
          </div>
          <div class="user-middle-right layout-middle-img">
            <img v-if="storeImages" :src="storeImages" class="msg-row-image" />
            <div v-else class="msg-row-Nimage">{{storeUser.nickName|userName}}</div>
            <div class="msg-row-image-camera">
              <Icon type="ios-camera" size="20" color="#c5c8ce" />
            </div>
          </div>
        </div>
      </div>
      <div class="user-row">
        <div class="user-row-main">
          <div class="user-row-title">用户名</div>
          <div class="user-row-content">{{storeUser.userName}}</div>
        </div>
      </div>
      <div class="user-row">
        <nuxt-link to="/accounts/nickname" class="user-row-main user-middle">
          <div class="user-middle-left">
            <div class="user-row-title">昵称</div>
            <div class="user-row-content">{{storeUser.nickName}}</div>
          </div>
          <div class="user-middle-right">
            <Icon type="ios-arrow-forward" size="20" />
          </div>
        </nuxt-link>
      </div>
      <div class="user-row">
        <nuxt-link to="/accounts/signature" class="user-row-main user-middle">
          <div class="user-middle-left">
            <div class="user-row-title">个性签名</div>
            <div class="user-row-content">{{storeUser.signature}}</div>
          </div>
          <div class="user-middle-right">
            <Icon type="ios-arrow-forward" size="20" />
          </div>
        </nuxt-link>
      </div>
      <div class="user-row">
        <div class="user-row-main">
          <div class="user-row-title">创建时间</div>
          <div class="user-row-content">{{storeUser.createTime|TimeConversion}}</div>
        </div>
      </div>
      <div class="user-row">
        <div class="user-row-main">
          <div class="user-row-title">更新时间</div>
          <div class="user-row-content">{{storeUser.updateTime|TimeConversion}}</div>
        </div>
      </div>
    </div>
    <div class="user-border">
      <div class="user-title-wrap user-title-email-wrap">
        <div class="user-title">联系信息</div>
        <img src="@/assets/images/email_1.png" width="50px" />
      </div>
      <div class="user-row user-row-email">
        <nuxt-link to="/accounts/email" class="user-row-main user-middle">
          <div class="user-middle-left">
            <div class="user-row-title">电子邮箱</div>
            <div class="user-row-content">{{storeUser.email}}</div>
          </div>
          <div class="user-middle-right">
            <Icon type="ios-arrow-forward" size="20" />
          </div>
        </nuxt-link>
      </div>
    </div>
    <head-portrait v-model="headPortrait" />
  </div>
</template>


<script>
// 点击上传照片
import headPortrait from "@/components/headPortrait/index.vue";
import { mapGetters } from "vuex";

export default {
  transition: "fade",
  components: { headPortrait },
  filters: {
    userName(name) {
      return name ? name[0].toUpperCase() : "";
    },
    TimeConversion(time) {
      const date = new Date(time);
      const completion = num => {
        return num.toString().padStart(2, "0");
      };
      return (
        date.getFullYear() +
        "年" +
        completion(date.getMonth() + 1) +
        "月" +
        completion(date.getDate()) +
        "日"
      );
    },
  },
  data() {
    return {
      // 打开设置头像
      headPortrait: false,
    };
  },
  computed: {
    ...mapGetters("user", ["storeUser", "storeImages"]),
  },
};
</script>


<style scoped>
.msg-row-image,
.msg-row-Nimage {
  height: 60px;
  width: 60px;
}
.msg-row-Nimage {
  font-family: Georgia;
  font-size: 18px;
  text-align: center;
  line-height: 60px;
  color: #dff6f0;
  font-weight: bold;
  background: linear-gradient(130deg, #5c2a9d, #0779e4 80%);
}
.layout-middle-img {
  flex-shrink: 0;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}
.msg-row-image-camera {
  position: absolute;
  left: 0;
  bottom: 0px;
  width: 60px;
  text-align: center;
  background: rgba(32, 33, 36, 0.6);
}
.user-row-email {
  border-top: 1px solid #dadce0;
}
.user-row-email:hover {
  border-top: 1px solid #dadce0;
}
.user-title-email-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 90px;
}
</style>