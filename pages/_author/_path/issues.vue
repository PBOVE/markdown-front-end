/**
*
*  @author ZTiger
*
*/

<template>
  <div class="issues-wrap">
    <div class="issues-content">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  transition: 'fade',
  data() {
    return {
      // 作者
      author: this.$route.params.author,
    };
  },
  head() {
    return {
      title: `issues · ${this.author} · ${this.storeProject.title} ● TBS.feel`,
    };
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('author', ['storeProject']),
  },
};
</script>

<style scoped>
.issues-wrap {
  height: 100%;
}
.issues-content {
  padding: 35px 0;
  margin: 0 auto;
  max-width: 1200px;
}
</style>
