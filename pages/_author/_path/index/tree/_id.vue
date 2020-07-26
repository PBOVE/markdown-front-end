/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-home" v-if="!isFile">
    <project-header :title="title" :images="images" :name="userName" :time="updateTime" />
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
  validate({ params }) {
    const { id } = params;
    const reg = new RegExp("^[0-9a-fA-F]{24}$");
    return reg.test(id);
  },
  async asyncData({ params, app, store }) {
    const { author, path, id } = params;
    const request = { author, path, id };
    const { data } = await app.$request.queryPostDetails(request);
    const { images, content, updateTime, userName, name: title } = data;
    const isFile = data.type === "file";
    if (isFile) {
      const { data: listData } = await app.$request.queryPostList(request);
      const { list, parent } = listData;
      store.commit("author/setPostList", [
        {
          _id: -1,
          name: "...",
          type: false,
          style: { "font-weight": 600, color: "#0366d6", margin: "0 0 0 3px" },
          to:
            parent.length !== 1
              ? `/${author}/${path}/tree/${parent[0]._id}`
              : `/${author}/${path}`,
        },
        ...list,
      ]);
      store.commit("author/setParentList", parent);
    }
    return { content, images, userName, updateTime, title, isFile };
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("author", [, "storeFormat"]),
  },
};
</script>


<style scoped>
</style>
