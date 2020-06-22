/**
*
*  @author ZTiger
*
*/


<template>
  <div class="error">
    <public-header :shadow="true" />
    <div class="error-box">
      <img src="@/assets/images/404.svg" />
      <div class="error-tips">抱歉，您访问的页面不存在。</div>
      <Button type="primary">
        <nuxt-link to="/" class="error-link">返回首页</nuxt-link>
      </Button>
    </div>
  </div>
</template>

<script>
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  components: { publicHeader },
  data() {
    return {};
  },
  head() {
    return {
      title: "页面没有找到 ● Freedom",
    };
  },
};
</script>

<style  scoped>
.error {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
.error-box {
  margin: 80px auto 0 auto;
  text-align: center;
}
.error-tips {
  margin: 20px 0;
}
.error-link,
.error-link:hover {
  color: #fff;
}
</style>