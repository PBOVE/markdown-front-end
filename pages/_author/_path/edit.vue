/**
*
*  @author ZTiger
*
*/

<template>
  <div class="edit-wrap">
    <edit-left class="edit-left" />
    <div class="edit-right">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { queryPostListRoot } from '@/api/post';
import { mapGetters, mapMutations } from 'vuex';
import { articleDetails } from '@/api/article';
import editLeft from '@/components/_path/editLeft.vue';

export default {
  transition: 'fade',
  components: { editLeft },
  async validate({ store, params }) {
    const { author, path } = params;
    const { user } = store.state;
    if (user.data.userName === author) return true;
    const { data } = await articleDetails({ author, path });
    return data.edit;
  },
  async asyncData({ store, params }) {
    const { author, path, id } = params;
    const { data } = await queryPostListRoot({ author, path, id });
    store.commit('author/setArticleList', [
      { _id: 0, name: '首页', type: 'home' },
      ...data.list,
    ]);
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('author', ['storeArticle', 'storeSelectPost']),
  },
  beforeDestroy() {
    this.setSelectPost({});
  },
  methods: {
    ...mapMutations('author', ['setSelectPost']),
  },
  head() {
    return {
      title: `编辑 · ${this.storeSelectPost.title || '首页'} ● TBS.feel`,
    };
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
