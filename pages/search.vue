<template>
  <div class="search-wrap">
    <Affix>
      <public-header :shadow="true" />
    </Affix>
    <div class="search-main">
      <!-- <div style="width:300px"></div> -->
      <div>
        <div v-for="(item) in searchData" :key="item._id" class="search-item-wrap">
          <div class="index-page-flex-middle">
            <Icon type="ios-podium" color="#19be6b" style="margin: 0 10px 0 0" />
            <nuxt-link :to="`/${item.author}/${item.path}`" class="search-link">
              <span>{{ item.author }}</span> /
              <span class="text-title">{{ item.title }}</span>
            </nuxt-link>
          </div>
          <div class="search-description">{{ item.description }}</div>
          <div class="index-page-flex-middle">
            <Icon type="md-star-outline" size="14" />
            <span style="margin: 0 5px">{{ item.likeCount }}</span>
            <Icon type="ios-time-outline" style="margin:0 5px; 0 0" size="14" />
            <span
              class="index-page-row-time"
              style="margin: 0 5px 0 0"
              :title="$timeConversion(item.time)"
            >{{ item.time | TimeFilter }}前更新</span>
            <Icon v-if="item.share" type="ios-unlock-outline" size="14" />
            <Icon v-else type="ios-lock-outline" size="14" />
          </div>
        </div>
        <Page :total="totalElements" show-total size="small">
          <div>共 {{ totalElements }} 条</div>
        </Page>
      </div>
    </div>
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader/index.vue';
import { queryArticle } from '@/api/query';

export default {
  components: { publicHeader },
  watchQuery: ['q'],
  async asyncData({ query }) {
    const { q: title } = query;
    const { data } = await queryArticle({ title });
    const searchData = data.content;
    const totalElements = data.totalElements;
    console.log(data);
    return { title, searchData, totalElements };
  },
  head() {
    return {
      title: `${this.title} ● 搜索`,
    };
  },
};
</script>

<style scoped>
.search-main {
  display: flex;
  margin: 20px auto;
  padding: 30px 30px 0;
  max-width: 1200px;
}
.search-link:hover {
  text-decoration: underline;
}
.search-description {
  margin: 10px 0;
}
.search-item-wrap {
  margin: 0 0 20px;
  padding: 0 0 20px;
  border-bottom: 1px solid #e1e4e8;
}
</style>
