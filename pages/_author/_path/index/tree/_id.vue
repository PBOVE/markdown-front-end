/**
*
*  @author ZTiger
*
*/

<template>
  <div v-if="!isFile" class="index-home">
    <project-header
      :title="option.title"
      :images="option.images"
      :name="option.nickName"
      :link="option.userName"
      :time="option.updateTime"
    />
    <index-show :content="content" />
  </div>
</template>

<script>
import { queryPostListParent } from '@/api/post';
import projectHeader from '@/components/_path/projectHeader.vue';
import indexShow from '@/components/_path/indexShow.vue';

export default {
  components: { projectHeader, indexShow },
  validate({ params }) {
    const { id } = params;
    const reg = new RegExp('^[0-9a-fA-F]{24}$');
    return reg.test(id);
  },
  async asyncData({ params, store }) {
    const { author, path, id } = params;
    const request = { author, path, id };
    const { data } = await queryPostListParent(request);
    const { list, details, parent } = data;
    const { content, updateTime, updateUser, name: title } = details;
    const option = { updateTime, title, ...updateUser };
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
      const time = store.state.author.article.updateTime;
      postList = [
        { _id: 0, name: '首页', type: 'home', updateTime: time, to },
        ...list,
      ];
    }
    store.commit('author/setPostList', postList);
    store.commit('author/setParentList', parent);
    store.commit('author/setCustomAnchor', []);
    const isFile = details.type === 'file';
    return { content, option, isFile };
  },
  data() {
    return {};
  },
  computed: {

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
