<template>
  <div class="search-wrap">
    <public-header :shadow="true" />
    <div class="search-main scroll-transparent">
      <search-list :search-data="searchData" />
      <div v-if="searchData.length" class="index-page-flex-between search-page">
        <div
          class="search-page-button"
          :class="{ 'search-page-disabled': page === 1 }"
          @click="handlePageChange('previous')"
        >
          上一页
        </div>
        <div
          class="search-page-button"
          :class="{ 'search-page-disabled': page === totalPages }"
          @click="handlePageChange('next')"
        >
          下一页
        </div>
      </div>
      <div v-else>
        <h2>很抱歉，没有找到与 “{{ title }} ”相关的文档。</h2>
      </div>
    </div>
  </div>
</template>

<script>
import publicHeader from '@/components/publicHeader/index.vue';
import { queryArticle } from '@/api/query';
import searchList from '@/components/search/index.vue';

export default {
  transition: 'fade',
  components: { publicHeader, searchList },
  watchQuery: ['q', 'page'],
  async asyncData({ query }) {
    const title = query.q;
    const page = parseInt(query.page || 1);
    const { data } = await queryArticle({
      title,
      type: 'all',
      size: 6,
      page: page - 1,
    });
    const searchData = data.content;
    const totalElements = data.totalElements;
    const totalPages = data.totalPages;
    return { title, page, searchData, totalElements, totalPages };
  },
  methods: {
    // 页码切换
    handlePageChange(type) {
      let page = this.page;
      if (type === 'previous' && page !== 1) {
        page -= 1;
      } else if (type === 'next' && page !== this.totalPages) {
        page += 1;
      }
      this.$router.push({ path: '/search', query: { q: this.title, page } });
    },
  },
  head() {
    return {
      title: `${this.title} ● 搜索`,
    };
  },
};
</script>

<style scoped>
.search-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.search-main {
  flex: 1;
  padding: 20px 30px 40px;
  overflow: auto;
}
.search-page {
  max-width: 800px;
}
.search-page-button {
  height: 40px;
  width: 100px;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  border: 1px solid #dcdee2;
  cursor: pointer;
  transition: all 0.3s;
}
.search-page-button:hover {
  background: #2b85e4;
  color: #ffffff;
}
.search-page-disabled {
  cursor: not-allowed;
  color: #c5c8ce;
  background-color: #f7f7f7;
  border-color: #dcdee2;
}
.search-page-disabled:hover {
  color: #c5c8ce;
  background-color: #f7f7f7;
}
</style>
