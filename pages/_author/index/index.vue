<template>
  <div>
    <transition name="fade" mode="out-in">
      <index-page v-if="!tab" :topping-article="toppingArticle" />
      <project-page v-else-if="tab==='articles'" :articles="articles" />
      <likes-page v-else-if="tab==='likes'" :likes="likes" />
    </transition>
  </div>
</template>

<script>
import { queryArticle, queryToppingArticle } from '@/api/article';
import { queryAccountLike } from '@/api/user';
import indexPage from '@/components/_author/index.vue';
import projectPage from '@/components/_author/projects.vue';
import likesPage from '@/components/_author/likes.vue';

export default {
  components: { indexPage, projectPage, likesPage },
  async asyncData({ params, query }) {
    const { author } = params;
    const { tab, page, q: title } = query;
    let articles, likes, toppingArticle;
    if (tab === 'articles') {
      const request = { author, page: page ? page - 1 : 0, title };
      const { data } = await queryArticle(request);
      articles = data;
    } else if (tab === 'likes') {
      const request = { author, page: page ? page - 1 : 0 };
      const { data } = await queryAccountLike(request);
      likes = data;
    } else {
      const { data } = await queryToppingArticle({ author });
      toppingArticle = data;
    }
    return { articles, likes, toppingArticle };
  },
  watchQuery: ['tab', 'page', 'q'],
  computed: {
    tab() {
      const paramsPath = ['articles', 'likes'];
      const { tab } = this.$route.query;
      return paramsPath.includes(tab) ? tab : '';
    },
  },
};
</script>

<style scoped>
</style>
