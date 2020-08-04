/**
*
*  @author ZTiger
*
*/

<template>
  <div class="index-list-wrap">
    <nuxt-link
      v-for="item in storePostList"
      :key="item._id"
      class="row-wrap tree-row"
      :to="item.to ? item.to : link + item._id "
    >
      <img v-if="item.type" :src="require('@/assets/svg/'+item.type+'.svg')" class="row-wrap-img" />
      <div class="row-right index-text-hidden">
        <div class="row-right-title index-text-hidden" :style="item.style">{{ item.name }}</div>
        <div
          v-if="item.updateTime"
          class="row-right-time"
          :title="$timeConversion(item.updateTime)"
        >{{ item.updateTime|TimeFilter }}</div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
    };
  },
  computed: {
    ...mapGetters('author', ['storePostList']),
    link() {
      return `/${this.author}/${this.path}/tree/`;
    },
  },
};
</script>

<style scoped>
.row-wrap {
  padding: 10px 16px;
  border-bottom: 1px solid #dcdee2;
  cursor: pointer;
}
.row-wrap:hover {
  background: #f8f8f9;
}
.row-wrap:last-of-type {
  border-bottom: 0;
}
.row-wrap-img {
  height: 20px;
  width: 20px;
  margin: 0 16px 0 0;
}
.row-right {
  flex: 1;
  display: flex;
}
.row-right-title {
  color: #000;
}
.row-right-title,
.row-right-updateUser {
  flex: 1;
}

.row-right-time {
  width: 80px;
  text-align: right;
  color: #515a6e;
}
</style>
