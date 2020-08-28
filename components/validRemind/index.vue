/**
*
*  @author ZTiger
*
*/

<template>
  <Alert
    v-if="storeUserState&&!storeUser.authentication"
    type="warning"
    closable
    class="dashboard-tip"
  >
    <div style="fontSize:16px;">您还没有完成你的账号验证</div>
    <div style="fontSize:14px;">
      <div style="marginTop:8px;">您必须先完成电子邮箱验证，否则有些功能将无法实现</div>
      <div style="marginTop:8px;">
        <span>您可以使用电子邮箱来验证身份，请前往</span>
        <nuxt-link to="/account/email">个人信息</nuxt-link>
        <span>进行验证。</span>
      </div>
    </div>
  </Alert>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters('user', ['storeUserName', 'storeUserState', 'storeUser']),
  },
};
</script>

<style scoped>
.dashboard-tip {
  margin: 20px 100px 0;
  text-align: center;
  color: #8a6d3b;
}
@media screen and (max-width: 540px) {
  .dashboard-tip {
    margin: 0 10px;
  }
}
</style>
