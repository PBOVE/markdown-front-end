/**
*
*  @author ZTiger
*
*/

<template>
  <div class="index-home">
    <project-header title="首页" :images="images" :name="userName" :time="updateTime" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="storeFormat==='richText'" ref="editor" class="richText" v-html="content" />
    <client-only v-if="storeFormat==='markdown'">
      <v-md-preview ref="editor" height="100%" :text="content" />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import Prism from 'prismjs';
import projectHeader from '@/components/_path/projectHeader.vue';

export default {
  components: { projectHeader },
  async asyncData({ params, app, store }) {
    const { author, path } = params;
    const { data } = await app.$request.queryPostListParent({ author, path });
    const { list, details } = data;
    const { images, content, updateTime, userName } = details;
    const to = `/${author}/${path}`;
    store.commit('author/setPostList', [
      { _id: 0, name: '首页', type: 'home', updateTime, to },
      ...list,
    ]);
    store.commit('author/setParentList', []);
    return { content, images, userName, updateTime };
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('author', ['storeFormat']),
  },
  mounted() {
    // if (process.browser && this.storeFormat === 'richText') {
    //   this.$refs.editor
    //     .querySelectorAll('pre code')
    //     .forEach(block => Prism.highlightElement(block));
    // }
  },
};
</script>

<style scoped>
</style>
