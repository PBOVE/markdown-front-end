/**
*
*  @author ZTiger
*
*/


<template>
  <div class="user-personal-index-wrap">
    <div class="upi-border">
      <div class="upi-msg-title">
        <div class="upi-header-name">个人资料</div>
        <div class="upi-header-title">Freedom 为您带来更好的服务与帮助</div>
      </div>
      <div class="upi-msg-row">
        <div class="upi-msg-row-content layout-middle">
          <div class="layout-middle-left">
            <div class="msg-row-name">头像</div>
            <div class="msg-row-title msg-row-title-tip">更改头像 可帮助您个性化您的帐号</div>
          </div>
          <div class="layout-middle-right layout-middle-img">
            <!-- <img :src="images" class="msg-row-image" v-if="images" /> -->
            <div class="msg-row-Nimage">{{storeUser.nickName.charAt(0).toUpperCase()}}</div>
            <div class="msg-row-image-camera">
              <Icon type="ios-camera" size="20" color="#c5c8ce" />
            </div>
          </div>
        </div>
      </div>
      <div class="upi-msg-row">
        <div class="upi-msg-row-content">
          <div class="msg-row-name">用户名</div>
          <div class="msg-row-title">{{storeUser.userName}}</div>
        </div>
      </div>
      <div class="upi-msg-row">
        <nuxt-link to="/user/personal/nickname" class="upi-msg-row-content layout-middle">
          <div class="layout-middle-left">
            <div class="msg-row-name">昵称</div>
            <div class="msg-row-title">{{storeUser.nickName}}</div>
          </div>
          <div class="layout-middle-right">
            <Icon type="ios-arrow-forward" size="20" />
          </div>
        </nuxt-link>
      </div>
      <div class="upi-msg-row">
        <div class="upi-msg-row-content">
          <div class="msg-row-name">创建时间</div>
          <div class="msg-row-title">{{storeUser.createTime|TimeConversion}}</div>
        </div>
      </div>
      <div class="upi-msg-row">
        <div class="upi-msg-row-content">
          <div class="msg-row-name">更新时间</div>
          <div class="msg-row-title">{{storeUser.updateTime|TimeConversion}}</div>
        </div>
      </div>
      <div class="upi-msg-row">
        <nuxt-link to="/user/personal/password" class="upi-msg-row-content layout-middle">
          <div class="layout-middle-left">
            <div class="msg-row-name">密码</div>
            <div class="msg-row-title">••••••••</div>
          </div>
          <div class="layout-middle-right">
            <Icon type="ios-arrow-forward" size="20" />
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="upi-border">
      <div class="upi-msg-title">
        <div class="upi-header-name">联系信息</div>
      </div>
      <div class="upi-msg-row">
        <nuxt-link to="/email" class="upi-msg-row-content layout-middle">
          <div class="layout-middle-left">
            <div class="msg-row-name">电子邮箱</div>
            <div class="msg-row-title">{{storeUser.email}}</div>
          </div>
          <div class="layout-middle-right">
            <Icon type="ios-arrow-forward" size="20" />
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>


<script>
// 点击上传照片
import { mapGetters } from "vuex";

export default {
  transition: "fade",
  filters: {
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
    return {};
  },
  computed: {
    ...mapGetters("user", ["storeUser"]),
  },
  methods: {
    // 时间转换函数
    // 选择头像
  },
};
</script>


<style scoped>
.upi-border {
  border: 1px solid #dadce0;
  border-radius: 8px;
  margin: 0 0 30px;
  overflow: hidden;
}
.upi-header-name {
  font-size: 23px;
  color: #202124;
}
.upi-header-title {
  margin: 10px 0 0px 0;
  font-size: 12px;
  font-weight: 520;
  color: #5f6368;
}
.upi-msg-title {
  padding: 20px;
}
.upi-msg-row {
  cursor: pointer;
  font-size: 0;
}
.upi-msg-row:hover,
.upi-msg-row:hover + .upi-msg-row {
  border-top: 1px solid #dadce0;
}
.upi-msg-row:hover {
  background: #f5f5f5;
}

.upi-msg-row:active {
  background: #e1e1e1;
  transform-origin: center right;
  transition: all 1s;
}
.upi-msg-row:hover .upi-msg-row-content,
.upi-msg-row:hover + .upi-msg-row .upi-msg-row-content {
  border-width: 0;
}
.upi-msg-row-content {
  padding: 20px 20px 20px 0;
  margin: 0 0 0 20px;
  border-top: 1px solid #dadce0;
  color: #515a6e;
}
.upi-msg-row:hover:nth-of-type(2),
.upi-msg-row:nth-of-type(2) .upi-msg-row-content {
  border-width: 0px;
}
.msg-row-name,
.msg-row-title {
  display: inline-block;
}
.msg-row-name {
  width: 150px;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
  letter-spacing: 0.1em;
}
.msg-row-title {
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  color: #202124;
}
.msg-row-title-tip {
  color: #5f6368;
  font-size: 12px;
}
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
  background: linear-gradient(130deg, #5c2a9d, #0779e4 80%);
}
.layout-middle-img {
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
.layout-middle {
  display: flex;
  align-items: center;
}
.layout-middle-left {
  flex-grow: 1;
}
</style>