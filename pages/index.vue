/**
*
*  @author ZTiger
*
*/

<template>
  <div class="home-page-wrap">
    <Affix>
      <public-header :shadow="true" />
    </Affix>
    <div class="home-page-content">
      <custom-card
        v-for="(item, index) in article"
        :key="item._id + index"
        :item="item"
        :index="index"
        :close-button="false"
        :router-link="true"
        class="custom-card"
      />
    </div>
    <public-footer />
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader/index.vue';
import publicFooter from '@/components/publicFooter/index.vue';
import customCard from '@/components/custom/customCard.vue';
import { queryAllArticle } from '~/api/query';

export default {
  transition: 'fade',
  components: { publicHeader, publicFooter, customCard },
  async asyncData() {
    const { data: article } = await queryAllArticle();
    console.log(article);
    return { article };
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.home-page-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.home-page-content {
  flex: auto;
  margin: 0 auto;
  max-width: 1100px;
}
.tip {
  max-width: 1200px;
  margin: 20px auto 0;
}
</style>
