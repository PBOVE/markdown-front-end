/**
*
*  @author ZTiger
*
*/

<template>
  <div class="index-wrap">
    <public-header :shadow="true" />
    <valid-remind />
    <div class="index-main scroll">
      <div class="index-content">
        <page-left class="index-content-left" />
        <div class="index-content-right">
          <page-right />
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { queryRegister, queryAccount } from '@/api/user';
import publicHeader from '@/components/publicHeader/index.vue';
import validRemind from '@/components/validRemind/index.vue';
import pageLeft from '@/components/_author/pageLeft.vue';
import pageRight from '@/components/_author/pageRight.vue';

export default {
  transition: 'fade',
  components: { publicHeader, validRemind, pageLeft, pageRight },
  async validate({ params }) {
    const query = { name: params.author };
    const { data } = await queryRegister(query);
    return data;
  },
  async fetch({ store, params }) {
    const { author: username } = params;
    const { data } = await queryAccount({ username });
    store.commit('author/setAuthor', data);
  },
  data() {
    return {
      alertShow: false,
    };
  },
  computed: {
    ...mapGetters('author', ['storeAuthor']),
  },
  head() {
    return {
      title: `${this.$route.params.author} ● TBS.feel`,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.storeAuthor.userName },
        { hid: 'description', name: 'description', content: this.storeAuthor.signature }
      ]
    };
  },
};
</script>

<style scoped>
.index-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.index-main {
  height: 0;
  flex: auto;
  overflow: auto;
}
.index-content {
  display: flex;
  margin: 0 auto;
  padding: 30px 30px 0;
  max-width: 1200px;
}
.index-content-left {
  flex-shrink: 0;
  width: 280px;
  margin: 0 16px;
}
.index-content-right {
  width: 100%;
  margin: 0 0 0 20px;
}
@media screen and (max-width: 850px) {
  .index-content {
    flex-direction: column;
    align-items: center;
  }
  .index-content-left,
  .index-content-right {
    margin: 0;
  }
}
@media screen and (max-width: 550px) {
  .index-content-left {
    width: 100%;
  }
}
</style>
