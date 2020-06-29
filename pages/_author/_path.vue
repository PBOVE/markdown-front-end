/**
*
*  @author ZTiger
*
*/


<template>
  <div class="path-wrap">
    <public-header :shadow="true" />
    <div>{{storeProject}}</div>
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { publicHeader },
  async validate({ params, app, store }) {
    const { data } = await app.$request.projectContent(params);
    if (data) {
      store.commit("author/setProject", data);
      return true;
    }
    return false;
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("author", ["storeProject"]),
  },
};
</script>


<style scoped>
.path-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
