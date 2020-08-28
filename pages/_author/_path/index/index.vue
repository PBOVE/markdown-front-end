/**
*
*  @author ZTiger
*
*/

<template>
  <div class="index-home">
    <project-header title="首页" :images="options.images" :name="options.nickName" :link="options.userName" :time="options.pdateTime" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="storeFormat==='richText'" ref="editor" class="richText" v-html="content" />
    <client-only v-if="storeFormat==='markdown'">
      <v-md-preview ref="editor" height="100%" :text="content" />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { _queryPostListParent } from '@/api/post';
import projectHeader from '@/components/_path/projectHeader.vue';

export default {
  components: { projectHeader },
  async asyncData({ params, store }) {
    const { author, path } = params;
    const { data } = await _queryPostListParent({ author, path });
    const { list, details } = data;
    const { images, content, updateTime, nickName, userName } = details;
    const to = `/${author}/${path}`;
    store.commit('author/setPostList', [
      { _id: 0, name: '首页', type: 'home', updateTime, to },
      ...list,
    ]);
    store.commit('author/setParentList', []);
    return { options: { images, updateTime, nickName, userName }, content };
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('author', ['storeFormat']),
  },
};
</script>

<style scoped>
</style>
