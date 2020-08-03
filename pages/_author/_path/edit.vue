/**
*
*  @author ZTiger
*
*/


<template>
  <div class="edit-wrap">
    <editLeft class="edit-left" />
    <div class="edit-right">
      <nuxt-child />
    </div>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";

import editLeft from "@/components/_path/editLeft.vue";

export default {
  transition: "fade",
  components: { editLeft },
  validate({ store, params }) {
    const { user, author } = store.state;
    return (
      user.userState &&
      (author.project.edit || params.author === user.data.userName)
    );
  },
  async asyncData({ store, params, app }) {
    const { author, path, id } = params;
    const { data } = await app.$request.queryPostList({ author, path, id });
    store.commit("author/setProjectList", [
      { _id: 0, name: "首页", type: "home" },
      ...data.list,
    ]);
  },
  data() {
    return {};
  },
  head() {
    return {
      title: `编辑 · ${this.storeSelectPost.title || "首页"} ● TBS.feel`,
    };
  },
  computed: {
    ...mapGetters("author", ["storeProject", "storeSelectPost"]),
  },
  beforeDestroy() {
    this.setSelectPost({});
  },
  methods: {
    ...mapMutations("author", ["setSelectPost"]),
  },
};
</script>


<style scoped>
.edit-wrap {
  display: flex;
  height: 100%;
}
.edit-right {
  position: relative;
  flex: 1;
}
@media screen and (max-width: 900px) {
  .edit-left {
    display: none !important;
  }
}
</style>
