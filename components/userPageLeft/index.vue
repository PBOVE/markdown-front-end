/**
*
*  @author ZTiger
*
*/


<template>
  <div class="page-left-wrap">
    <div class="header">
      <img :src="'/api/storage/preview/'+userImageSrc" class="image" />
      <div class="header-title">{{user.signature}}</div>
    </div>
    <div class="middle">
      <div class="middle-title">{{user.nickName}}</div>
      <div class="middle-content">{{user.userName}}</div>
    </div>
    <div class="button-follow">
      <div v-if="storeUser.userName===user.userName">编辑</div>
      <div v-else>关注</div>
    </div>
    <div class="icon-wrap">
      <Icon type="ios-pin-outline" />
      {{user.location}}
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  props: ["user"],
  data() {
    return {};
  },
  computed: {
    userImageSrc() {
      return this.user.images;
    },
    ...mapGetters("user", ["storeUser"]),
  },
};
</script>


<style scoped>
.header {
  border: 1px solid #c5c8ce;
  border-radius: 4px;
  overflow: hidden;
  font-size: 0;
}
.image {
  width: 280px;
  height: 280px;
}
.header-title {
  padding: 10px 12px;
  line-height: 19px;
  font-size: 14px;
  cursor: pointer;
  color: #586069;
}
.middle {
  padding: 16px 0;
  letter-spacing: 0.1em;
}
.middle-title {
  font-size: 26px;
  color: #24292e;
}
.middle-content {
  font-size: 18px;
  color: #666;
}
.button-follow {
  padding: 6.5px 0;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background: #e9ecef;
  color: #24292e;
  letter-spacing: 0.1em;
}
.button-follow:hover {
  background: #e9ecef99;
}
.icon-wrap{
  margin: 10px 0;
  line-height: 16px;
}
</style>