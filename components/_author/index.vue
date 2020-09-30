/**
*
*  @author ZTiger
*
*/

<template>
  <div class="container">
    <div v-if="author===storeUser.userName&&storeUser.authentication" class="container-header index-page-flex-middle">
      <div class="container-header-title index-page-flex-middle" @click="handleCustom">
        <img src="@/assets/svg/menu.svg" width="20" height="20">
        <span style="margin:0 0 0 5px">自定义桌面</span>
      </div>
    </div>
    <!-- <div class="index-page-title">置顶文档</div> -->
    <div>
      <custom-card
        v-for="(item, index) in toppingArticle"
        :key="item.path"
        :item="item"
        :index="index"
        :close-button="false"
      />
    </div>
    <sustom-page v-model="sustomPage" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import sustomPage from '@/components/custom/customPage.vue';
import customCard from '@/components/custom/customCard.vue';

export default {
  components: { sustomPage, customCard },
  transition: 'fade',
  props: {
    // 置顶文档
    toppingArticle: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      handbook: '',
      options: {},
      // 高度
      height: 200,
      // 用户页面
      author: this.$route.params.author,
      // 自定义页面
      sustomPage: false
    };
  },
  computed: {
    ...mapGetters('user', ['storeUser']),
  },
  async mounted() {

  },
  methods: {
    // 处理自定义页面
    handleCustom() {
      this.sustomPage = true;
    }

  },
};
</script>

<style scoped>
.container-header {
  margin: 0 0 20px 0;
}
.container-header-title {
  flex: 1;
  cursor: pointer;
}
.container-iframe {
  border-width: 0px;
  width: 100%;
}
.index-page-title{
  font-size: 16px;
  letter-spacing: 0.1em;
  font-weight: bold;
  color: #464c5b;
}
</style>
