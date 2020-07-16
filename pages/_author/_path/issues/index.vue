/**
*
*  @author ZTiger
*
*/


<template>
  <div>
    <div class="issues-header index-page-flex-between">
      <div>
        <Input v-model="value" placeholder="搜索留言" class="issues-header-input" />
        <Button>搜索</Button>
      </div>
      <nuxt-link class="main-success-button index-page-margin-left-16" :to="$route.path + '/new'">
        <Icon type="md-add" />留 言
      </nuxt-link>
    </div>
    <div class="issues-main">
      <div class="issues-blankslate">
        <img src="@/assets/images/issues.svg" class="issues-main-image" />
        <div class="issues-blankslate-title">欢迎使用</div>
        <div>提出你的问题 。在使用之前，请先 创建一个 留言。</div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      value: "",
      // 作者
      author: this.$route.params.author,
    };
  },
  head() {
    return {
      title: `留言 · ${this.author}/${this.storeProject.path} ● TBS.feel`,
    };
  },
  computed: {
    ...mapGetters("author", ["storeProject"]),
  },
};
</script>


<style scoped>
.issues-header-input {
  margin: 0 20px 0 0;
  width: 500px;
}
.issues-main {
  margin: 20px 0 0 0;
  padding: 80px 40px;
  border: 1px solid #dcdee2;
  border-radius: 8px;
}
.issues-blankslate {
  text-align: center;
}
.issues-main-image {
  height: 100px;
  width: 100px;
}
.issues-blankslate-title {
  font-size: 20px;
  font-weight: bold;
}
</style>