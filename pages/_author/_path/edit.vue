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
import { _queryPostListRoot } from '@/api/post';
import { mapGetters, mapMutations } from 'vuex';
import { _articleDetails } from '@/api/article';
import editLeft from '@/components/_path/editLeft.vue';

export default {
  transition: 'fade',
  components: { editLeft },
  async validate({ store, params }) {
    const { author, path } = params;
    const { user } = store.state;
    if (user.data.userName === author) return true;
    const { data } = await _articleDetails({ author, path });
    return data.edit;
  },
  async asyncData({ store, params }) {
    const { author, path, id } = params;
    const { data } = await _queryPostListRoot({ author, path, id });
    store.commit('author/setArticleList', [
      { _id: 0, name: '首页', type: 'home' },
      ...data.list,
    ]);
  },
  data() {
    return {};
  },
  head() {
    return {
      title: `编辑 · ${this.storeSelectPost.title || '首页'} ● TBS.feel`,
    };
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('author', ['storeArticle', 'storeSelectPost']),
  },
  // eslint-disable-next-line vue/order-in-components
  beforeDestroy() {
    this.setSelectPost({});
  },
  // eslint-disable-next-line vue/order-in-components
  methods: {
    ...mapMutations('author', ['setSelectPost']),
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
