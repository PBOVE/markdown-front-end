/**
*
*  @author ZTiger
*
*/


<template>
  <div class="home-page-wrap">
    <public-header :shadow="true" />
    <div class="home-page-content"></div>
    <public-footer />
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";
import publicFooter from "@/components/publicFooter/index.vue";

export default {
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
</style>
