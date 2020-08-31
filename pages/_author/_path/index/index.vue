/**
*
*  @author ZTiger
*
*/

<template>
  <div class="index-home">
    <project-header title="首页" :images="options.images" :name="options.nickName" :link="options.userName" :time="options.pdateTime" />
    <index-show :content="content" />
  </div>
</template>

<script>
import { _queryPostListParent } from '@/api/post';
import indexShow from '@/components/_path/indexShow.vue';
import projectHeader from '@/components/_path/projectHeader.vue';

export default {
  components: { projectHeader, indexShow },
  async asyncData({ params, store }) {
    const { author, path } = params;
    const { data } = await _queryPostListParent({ author, path });
    const { list, details } = data;
    const { content, updateTime, updateUser } = details;
    const to = `/${author}/${path}`;
    store.commit('author/setPostList', [
      { _id: 0, name: '首页', type: 'home', updateTime, to },
      ...list,
    ]);
    store.commit('author/setParentList', []);
    return { options: { updateTime, ...updateUser }, content };
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
