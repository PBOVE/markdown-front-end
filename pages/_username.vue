/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-wrap">
    <public-header :shadow="true" />
    <valid-remind />
    <div class="index-main scroll">
      <div class="index-content">
        <page-left class="index-content-left" :user="user" />
        <div class="index-content-right">
          <page-right />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";
import validRemind from "@/components/validRemind/index.vue";
import pageLeft from "@/components/userPageLeft/index.vue";
import pageRight from "@/components/userPageRight/index.vue";

export default {
  transition: "fade",
  components: { publicHeader, validRemind, pageLeft, pageRight },
  async validate({ params, app }) {
    const query = { name: params.username };
    const { data } = await app.$request.registerQuery(query);
    return data;
  },
  async asyncData({ params, app, redirect }) {
    const query = { username: params.username };
    const { data } = await app.$request.queryUser(query);
    return { user: data };
  },
  data() {
    return {
      alertShow: false,
      userPage: this.$route.params.username,
    };
  },
  computed: {},
};
</script>


<style scoped>
.index-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.index-main {
  height: 0;
  flex: auto;
  overflow: auto;
}
.index-content {
  display: flex;
  margin: 0 auto;
  padding: 18px 30px 0;
  max-width: 1200px;
}
.index-content-left {
  flex-shrink: 0;
  width: 280px;
  margin: 0 16px;
}
.index-content-right {
  margin: 0 0 0 20px;
}
@media screen and (max-width: 850px) {
  .index-content {
    flex-direction: column;
    align-items: center;
    padding: 5px 18px 0;
  }
  .index-content-left,
  .index-content-right {
    margin: 0;
  }
}
</style>
