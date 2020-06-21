/**
*
*  @author ZTiger
*
*/


<template>
  <div class="dashboard-wrap">
    <public-header :shadow="true" />
    <valid-remind />
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

</style>
