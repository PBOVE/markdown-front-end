/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-home">
    <project-header title="首页" :images="images" :name="userName" :time="updateTime" />
    <div v-if="storeFormat==='richText'" ref="editor" v-html="content" class="richText" />
    <client-only v-if="storeFormat==='markdown'">
      <v-md-preview height="100%" ref="editor" :text="content" />
    </client-only>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import projectHeader from "@/components/_path/projectHeader.vue";

export default {
  components: { projectHeader },
  async asyncData({ params, app, store }) {
    const { author, path, id } = params;
    const [{ data: details }, { data: listData }] = await Promise.all([
      app.$request.queryPostDetails({ author, path }),
      app.$request.queryPostList({ author, path }),
    ]);
    const { images, content, updateTime, userName } = details;
    const to = `/${author}/${path}`;
    store.commit("author/setPostList", [
      { _id: 0, name: "首页", type: "home", updateTime, to },
      ...listData.list,
    ]);
    store.commit("author/setParentList", []);
    return { content, images, userName, updateTime };
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("author", [, "storeFormat"]),
  },
  mounted() {
    if (process.browser && this.storeFormat === "richText") {
      this.$refs.editor
        .querySelectorAll("pre code")
        .forEach((block) => Prism.highlightElement(block));
    }
  },
};
</script>


<style scoped>
</style>
