/**
*
*  @author ZTiger
*
*/

<template>
  <div class="project-header-wrap index-page-flex-middle index-text-hidden">
    <img v-if="images" :src="'/api/storage/preview/'+images" class="main-user-image margin" />
    <div v-else class="main-user-portrait margin">{{ name|name }}</div>
    <nuxt-link :to="'/' + name" class="margin project-header-name">{{ name }}</nuxt-link>
    <div class="margin project-header-time" :title="$timeConversion(time)">{{ time|TimeFilter }}</div>
    <div class="margin project-header-title index-text-hidden">{{ title }}</div>
  </div>
</template>

<script>
export default {
  filters: {
    name(name) {
      return name ? name[0].toUpperCase() : '';
    },
  },
  props: {
    images: { type: String, default: '' },
    // eslint-disable-next-line vue/require-default-prop
    name: String,
    // eslint-disable-next-line vue/require-default-prop
    time: String,
    // eslint-disable-next-line vue/require-default-prop
    title: String,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.project-header-wrap {
  padding: 11.5px 16px;
  background: #f6f8fa;
  border-bottom: 1px solid #dcdee2;
}
.margin {
  margin: 0 10px 0 0;
}
.project-header-name {
  font-size: 18px;
}
.project-header-name:hover {
  text-decoration: underline;
}
.project-header-time {
  color: #515a6e;
}
</style>
