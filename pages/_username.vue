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
        <div></div>
      </div>
    </div>
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";
import validRemind from "@/components/validRemind/index.vue";

export default {
  transition: "fade",
  components: { publicHeader, validRemind },
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px 30px 0;
  /* border: 1px solid #ccc; */
}
</style>
