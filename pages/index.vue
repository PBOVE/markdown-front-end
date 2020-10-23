/**
*
*  @author ZTiger
*
*/

<template>
  <div class="home-page-wrap">
    <public-header :shadow="true" />
    <div class="home-page-content">
      <Alert class="tip">
        <h2>
          首页 暂时没有想出来怎么做, 放哪些内容. 现在 完成内容 搜索文档, 用户创建,用户信息修改,文档创建等功能
        </h2>
      </Alert>
    </div>
    <public-footer />
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader/index.vue';
import publicFooter from '@/components/publicFooter/index.vue';

export default {
  transition: 'fade',
  components: { publicHeader, publicFooter },
  data() {
    return {};
  },
};
</script>

<style scoped>
.home-page-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.home-page-content {
  flex: auto;
}
.tip {
  max-width: 1200px;
  margin: 20px auto 0;
}
</style>
