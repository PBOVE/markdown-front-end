/**
*
*  @author ZTiger
*
*/


<template>
  <div class="user-personal-wrap">
    <div style="text-align:center;font-size:26px;">个人信息</div>
    <div class="up-title">您在 Freedom 中使用的基本信息，例如您的昵称和头像</div>
    <nuxt-child />
  </div>
</template>


<script>
export default {
  transition: "fade",
  data() {
    return {};
  },
   head() {
    return {
      title: "账户 ● Freedom",
    };
  },
};
</script>


<style scoped>
.user-personal-wrap {
  width: 840px;
  margin: 0 0 0 8%;
}
.up-title {
  margin: 10px 0;
  font-family: Roboto, Arial, sans-serif;
  font-size: 1.01rem;
  color: #5f6368;
  text-align: center;
}
@media screen and (max-width: 1240px) {
  .user-personal-wrap {
    width: 100%;
    margin: 0;
  }
}
@media screen and (max-width: 1070px) {
  .ui-box {
    width: 100%;
  }
}
</style>
