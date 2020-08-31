<template>
  <div class="index-wrap">
    <div class="index-content">
      <div class="index-left">
        <div class="index-list-wrap border">
          <div class="index-list-header">
            <span class="index-title index-page-flex-middle">
              <img src="@/assets/svg/link.svg" class="index-title-img" />
              <nuxt-link :to="projectLink" class="index-title-link">{{ storeArticle.title }}</nuxt-link>
              <div v-for="(item, index) in storeParentList" :key="item._id">
                <span class="split-line">/</span>
                <nuxt-link
                  v-if="storeParentList.length - 1 !== index"
                  class="index-title-link"
                  :to="projectLink + '/tree/' + item._id"
                >{{ item.name }}</nuxt-link>
                <span v-else>{{ item.name }}</span>
              </div>
            </span>
            <div class="index-select-icon">
              <Icon type="md-arrow-round-back" :class="{unselect:!left}" />
              <Icon type="md-arrow-round-forward" :class="{unselect:!right}" />
            </div>
          </div>
          <index-list />
        </div>
        <nuxt-child />
      </div>
      <div class="index-right">
        <div class="index-right-title index-between-modal">
          <span>关于</span>
        </div>
        <div class="index-description">{{ storeArticle.description }}</div>
        <Divider />
        <index-right />
      </div>
    </div>
    <BackTop />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import indexList from '@/components/_path/indexList.vue';
import indexRight from '@/components/_path/indexRight.vue';

export default {
  transition: 'fade',
  components: { indexList, indexRight },
  data() {
    return {
      // 标题
      titles: [],
      // 右
      right: '',
      // 左
      left: '',
    };
  },
  computed: {
    ...mapGetters('author', ['storeArticle', 'storeFormat', 'storeParentList']),
    updateUser() {
      return this.storeArticle.updateUser;
    },
    projectLink() {
      return `/${this.storeArticle.author}/${this.storeArticle.path}`;
    },
    IslistId() {
      return !this.$route.params.id;
    },
  },
};
</script>

<style scoped>
.index-wrap {
  height: 100%;
}
.index-content {
  display: flex;
  margin: 0 auto;
  padding: 35px 0;
  max-width: 1200px;
  width: 100%;
}

.index-left {
  flex-shrink: 0;
  width: 75%;
}
.index-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #dcdee2;
  background-color: #f1f8ff;
  word-break: break-all;
}

.index-right {
  flex: 1;
  width: 25%;
  padding: 0 0 0 20px;
}
.border {
  margin: 0 0 20px 0;
  border: 1px solid #c8e1ff;
  border-radius: 8px;
  overflow: hidden;
}
.unselect,
.unselect :hover {
  color: #c5c8ce !important;
  cursor: default !important;
}
.index-title {
  flex-wrap: wrap;
}
.index-title-link:hover {
  text-decoration: underline;
}
.index-title-img {
  width: 20px;
  height: 20px;
  margin: 0 16px 0 0;
}
.index-select-icon {
  flex-shrink: 0;
}
.index-select-icon i:first-of-type {
  margin: 0 10px 0 0;
}
.index-select-icon i {
  font-size: 16px;
  cursor: pointer;
}
.index-select-icon i:hover {
  color: #2d8cf0;
}
.index-home {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
}
.split-line {
  margin: 0 0px 0 3px;
}
.index-right-title {
  padding: 11.5px 16px;
  font-weight: bold;
  font-size: 16px;
}
.index-description{
  margin: 10px 0;
}
@media screen and (max-width: 1240px) {
  .index-content {
    padding: 35px 20px;
    margin: 0;
  }
}
@media screen and (max-width: 800px) {
  .index-left {
    width: 100%;
  }
  .index-right {
    display: none;
  }
}
</style>
