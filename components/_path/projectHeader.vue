/**
*
*  @author ZTiger
*
*/

<template>
  <div class="project-header-wrap index-page-flex-middle index-text-hidden">
    <head-portrait-show
      v-if="link"
      :images="images"
      :name="name"
      :width="25"
      :height="25"
      style="margin:0 10px 0 0;"
    />
    <nuxt-link v-if="link" :to="'/' + link" class="margin project-header-name">{{ name }}</nuxt-link>
    <div class="margin project-header-time" :title="$timeConversion(time)">{{ time|TimeFilter }}</div>
    <div class="margin project-header-title index-text-hidden">{{ title }}</div>
  </div>
</template>

<script>
import headPortraitShow from '@/components/headPortrait/show.vue';

export default {
  components: { headPortraitShow },
  props: {
    images: { type: String, default: '' },
    name: { type: String, default: '' },
    time: { type: String, default: '' },
    title: { type: String, default: '' },
    link: { type: String, default: '' },
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
