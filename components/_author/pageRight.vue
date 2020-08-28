/**
*
*  @author ZTiger
*
*/

<template>
  <div class="page-right">
    <div class="header">
      <nuxt-link class="header-row" :to="'/'+author" :class="{border:!tab}">
        <Icon type="ios-book-outline" />
        <span>概述</span>
      </nuxt-link>
      <nuxt-link
        class="header-row"
        :to="'/'+ author + '?tab=articles'"
        :class="{border:tab==='articles'}"
      >
        <Icon type="ios-folder-open-outline" />
        <span>{{ fileName }}</span>
      </nuxt-link>
      <nuxt-link class="header-row" :to="'/'+author + '?tab=likes'" :class="{border:tab==='likes'}">
        <Icon type="ios-heart-outline" />
        <span>喜欢</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      author: this.$route.params.author,
    };
  },
  computed: {
    ...mapGetters('user', ['storeUserState', 'storeUserName']),
    tab() {
      const paramsPath = ['articles', 'likes'];
      const { tab } = this.$route.query;
      return paramsPath.includes(tab) ? tab : '';
    },
    fileName() {
      if (!this.storeUserState) return '文档';
      else if (this.storeUserName === this.author) return '我的';
      return '文档';
    },
  },
};
</script>

<style scoped>
.page-right {
  margin: 0 0 20px 0;
}
.header {
  display: flex;
  justify-content: center;
}
.header-row {
  position: relative;
  padding: 4px 20px 4px 20px;
  font-size: 16px;
  letter-spacing: 0.1rem;
  cursor: pointer;
  color: #000;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}
.header-row i {
  margin: 0 8px 0 0;
  font-weight: bold;
}
.header-row::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  transform: scaleX(0);
  background: #00000055;
  border-radius: 1px;
}
.header-row:hover::before {
  transform: scaleX(1);
  transition: all 0.4s;
}
.header-row:active::before {
  transform: scaleX(1);
  transition: all 0.4s;
}
.border::before {
  transform: scaleX(1);
  background: #2d8cf0;
}
@media screen and (max-width: 550px) {
  .header-row > i {
    display: none;
  }
}
</style>
