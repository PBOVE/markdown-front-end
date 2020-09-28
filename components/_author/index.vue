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
    <!-- <sustom-page /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import sustomPage from '@/components/custom/customPage.vue';

export default {
  components: { sustomPage },
  transition: 'fade',
  data() {
    return {
      handbook: '',
      options: {},
      // 高度
      height: 200,
      // 用户页面
      author: this.$route.params.author,
    };
  },
  computed: {
    ...mapGetters('user', ['storeUser']),
  },
  mounted() {

  },
  methods: {
    // 处理自定义页面
    handleCustom() {

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
</style>
