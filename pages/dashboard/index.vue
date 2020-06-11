/**
*
*  @author ZTiger
*
*/


<template>
  <div class="dashboard-wrap">
    <public-header />
    <Alert type="warning" closable class="dashboard-tip">
      <div class="dashboard-tip-title">您还没有完成你的账号验证</div>
      <div class="dashboard-tip-content">
        <div class="dashboard-tip-content-row">您必须先完成电子邮箱验证，否则有些功能将无法实现</div>
        <div class="dashboard-tip-content-row">
          <span>您可以使用电子邮箱来验证身份，请前往</span>
          <nuxt-link to="/user">个人主页</nuxt-link>
          <span>进行验证。</span>
        </div>
      </div>
    </Alert>
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  components: { publicHeader },
  data() {
    return {};
  },
};
</script>


<style scoped>
.dashboard-tip {
  margin: 0 100px;
  text-align: center;
  color: #8a6d3b;
}

.dashboard-tip-title {
  font-size: 16px;
}
.dashboard-tip-content {
  font-size: 14px;
}
.dashboard-tip-content-row {
  margin: 8px 0 0 0;
}
</style>
