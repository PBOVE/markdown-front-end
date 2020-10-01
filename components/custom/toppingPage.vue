<template>
  <div class="topping-page-wrap">
    <Scroll :height="400" :on-reach-bottom="handleScrollLoad" style="min-width: 256px;" :loading-text="loadingText">
      <load-animation v-show="loadAnimation" />
      <div v-for="(item, index) in sourceArticle" :key="item.path" @click="handleSourceClick(index)">
        <custom-card :item="item" :index="index" :close-button="false" />
      </div>
    </Scroll>
    <sort-item ref="sortItem" class="target-article scroll-transparent" :item-height="108" :item-width="236" @on-change="handleDataChange">
      <template slot-scope="{ item, index}">
        <custom-card :item="item" :index="index" @on-delete="handleCardDelete" />
      </template>
    </sort-item>
  </div>
  </div>
</template>

<script>
import { queryArticle, queryToppingArticle, updateToppingArticle, } from '@/api/article';
import sortItem from '@/components/custom/sortItem.vue';
import customCard from '@/components/custom/customCard.vue';
import loadAnimation from '@/components/custom/loadAnimation.vue';

export default {
  components: { customCard, loadAnimation, sortItem },
  data() {
    return {
      // 用户页面
      author: this.$route.params.author,
      // 文章数据
      sourceArticle: [],
      // 加载
      loadAnimation: false,
      // 页数
      page: 0,
      // 总条数
      totalElements: 0,
      // 总页数
      totalPages: 0,
      // 加载中
      loadingText: '加载中',
      // 请求数据中
      requestLoading: false,
    };
  },
  async mounted() {
    this.loadAnimation = true;
    const params = { page: this.page, author: this.author };
    const results = await Promise.all([
      queryArticle(params),
      queryToppingArticle({ author: this.author }),
    ]);
    this.$refs.sortItem.initData(results[1].data);
    this.sourceArticle = results[0].data.content;
    this.totalElements = results[0].data.totalElements;
    this.totalPages = results[0].data.totalPages;
    this.loadAnimation = false;
  },
  methods: {
    // 处理点击
    handleSourceClick(index) {
      this.$refs.sortItem.pushData(this.sourceArticle[index]);
    },
    // 处理加载
    handleScrollLoad() {
      return new Promise((resolve) => {
        if (this.page >= this.totalPages - 1) {
          this.loadingText = '已经到底啦';
          resolve();
          return;
        }
        this.page += 1;
        queryArticle({ page: this.page, author: this.author }).then((res) => {
          const { data } = res;
          this.sourceArticle = [...this.sourceArticle, ...data.content];
          resolve();
        });
      });
    },
    // 处理删除
    handleCardDelete(item) {
      this.$refs.sortItem.deleteData(item);
    },
    // 处理数据发生改变
    async handleDataChange() {
      const sortData = this.$refs.sortItem.getSortData();
      const params = [];
      sortData.forEach(el => params.push(el._id));
      await updateToppingArticle(params);
    },
  },
};
</script>

<style scoped>
.topping-page-wrap {
  display: flex;
}
.target-article {
  flex: 1;
  margin: 0 0 0 10px;
  padding: 10px;
  height: 400px;
  overflow: auto;
}
</style>
