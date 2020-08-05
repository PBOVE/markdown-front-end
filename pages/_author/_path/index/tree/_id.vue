/**
*
*  @author ZTiger
*
*/

<template>
  <div v-if="!isFile" class="index-home">
    <project-header :title="title" :images="images" :name="userName" :time="updateTime" />
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
  validate({ params }) {
    const { id } = params;
    const reg = new RegExp('^[0-9a-fA-F]{24}$');
    return reg.test(id);
  },
  async asyncData({ params, app, store }) {
    const { author, path, id } = params;
    const request = { author, path, id };
    const { data } = await app.$request.queryPostListParent(request);
    const { list, details, parent } = data;
    const { images, content, updateTime, userName, name: title } = details;
    let postList = [];
    const to = `/${author}/${path}`;
    const len = parent.length;
    if (len) {
      const style = {
        'font-weight': 600,
        color: '#0366d6',
        margin: '0 0 0 3px',
      };
      const link = len > 1 ? `${to}/tree/${parent[len - 2]._id}` : to;
      postList = [
        { _id: -1, name: '...', type: false, style, to: link },
        ...list,
      ];
    } else {
      const time = store.state.author.project.updateTime;
      postList = [
        { _id: 0, name: '首页', type: 'home', updateTime: time, to },
        ...list,
      ];
    }
    store.commit('author/setPostList', postList);
    store.commit('author/setParentList', parent);
    const isFile = details.type === 'file';
    return { content, images, userName, updateTime, title, isFile };
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
