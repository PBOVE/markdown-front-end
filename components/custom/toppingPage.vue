<template>
  <div class="topping-page-wrap">
    <Scroll :height="400" :on-reach-bottom="handleScrollLoad">
      <div
        v-for="(item, index) in sourceArticle"
        :key="item.path"
        @click="handleSourceClick(index)"
      >
        <custom-card
          :title="item.title"
          :description="item.description"
          :like-count="item.likeCount"
          :select="item.select"
        />
      </div>
    </Scroll>
    <div class="target-article scroll-transparent">
      <custom-card
        v-for="(item,index) in targetArticle"
        :key="index"
        :title="item.title"
        :description="item.description"
        :like-count="item.likeCount"
        :select="item.select"
      />
    </div>
  </div>
  </div>
</template>

<script>
import { queryArticle } from '@/api/article';
// import draggable from 'vuedraggable';
import customCard from '@/components/custom/customCard.vue';
// import loadAnimation from '@/components/custom/loadAnimation.vue';

export default {
  components: { customCard },
  data() {
    return {
      // 用户页面
      author: this.$route.params.author,
      // 文章数据
      sourceArticle: [],
      targetArticle: [],
    };
  },
  async mounted() {
    const params = { page: 0, size: 10, author: this.author };
    const { data } = await queryArticle(params);
    this.sourceArticle = [...this.sourceArticle, ...data.content];
  },
  methods: {
    // 处理点击
    handleSourceClick(index) {
      this.targetArticle.push(this.sourceArticle[index]);
    },
    // 处理加载
    handleScrollLoad() {
      return new Promise((resolve) => {
        resolve();
      });
    }
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
  /* border: 2px solid #ffffff; */
  border-radius: 8px;
}
</style>
