/**
*
*  @author ZTiger
*
*/

<template>
  <div class="container">
    <div v-if="author===storeUser.userName&&storeUser.authentication" class="container-header">
      <!-- <div class="container-header-title">您可以通过 HTML 和 CSS 修改当前页面</div>
      <Button>编辑</Button> -->
    </div>
    <client-only>
      <iframe id="iframePreview" class="container-iframe" scrolling="no" :height="`${height}px`"></iframe>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import xss from 'xss';

export default {
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
    this.$nextTick(() => {
      this.initIframe();
    });
  },
  methods: {
    initIframe() {
      const preview = document.getElementById('iframePreview').contentDocument;
      preview.body.innerHTML = this.handbook;
      this.height = preview.body.offsetHeight + 20;
    },
  },
};
</script>

<style scoped>
.container-header {
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
}
.container-header-title {
  flex: 1;
}
.container-iframe {
  border-width: 0px;
  width: 100%;
}
</style>
