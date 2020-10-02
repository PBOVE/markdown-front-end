<template>
  <div>
    <sort-item
      ref="sortItem"
      class="assist-article scroll-transparent"
      :item-height="108"
      :item-width="236"
      @on-change="handleDataChange"
    >
      <template slot-scope="{ item, index }">
        <custom-card :item="item" :index="index" :close-button="false" />
      </template>
    </sort-item>
  </div>
</template>

<script>
import { queryAssistArticle } from '@/api/article';
import sortItem from '@/components/custom/sortItem.vue';
import customCard from '@/components/custom/customCard.vue';

export default {
  components: { sortItem, customCard },
  transition: 'fade',
  data() {
    return {
      // 用户页面
      author: this.$route.params.author,
    };
  },
  async mounted() {
    const { data } = await queryAssistArticle({ author: this.author });
    this.$refs.sortItem.initData(data);
  },
  methods: {
    // 处理数据发生变化
    handleDataChange() {},
  },
};
</script>

<style>
.assist-article {
  height: 400px;
  padding: 10px 0 0 0;
  overflow: auto;
}
</style>
