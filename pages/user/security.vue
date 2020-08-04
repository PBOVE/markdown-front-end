/**
*
*  @author ZTiger
*
*/

<template>
  <div class="user-personal-wrap">
    <div style="text-align:center;font-size:26px;">安全性</div>
    <div class="up-title">有助于确保您帐号安全的设置和建议</div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  transition: 'fade',
  data() {
    return {};
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
