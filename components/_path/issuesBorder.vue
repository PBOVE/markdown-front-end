/**
*
*  @author ZTiger
*
*/

<template>
  <div class="issues-border">
    <div class="index-page-flex-middle issues-border-left">
      <img v-if="images" :src="imageLink + images" class="issues-border-image" />
      <div v-else class="main-user-portrait">{{ title|name }}</div>
    </div>
    <div class="issues-border-right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    name(name) {
      return name ? name[0].toUpperCase() : '';
    },
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['images', 'title'],
  data() {
    return {
      imageLink: '/api/storage/preview/',
    };
  },
};
</script>

<style scoped>
.issues-border {
  display: flex;
  align-items: flex-start;
}
.issues-border-left {
  padding: 6px 0 0;
}
.issues-border-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.issues-border-right {
  position: relative;
  flex: 1;
  width: calc(100% - 45px);
  margin: 0 0 0 16px;
  border-radius: 8px;
  border: 1px solid #d1d5da;
}
.issues-border-right::before,
.issues-border-right::after {
  content: '';
  display: block;
  position: absolute;
  top: 12px;
  left: -16px;
  border-color: transparent;
  border-style: solid;
}
.issues-border-right::before {
  border-width: 8px;
  border-right-color: #d1d5da;
}
.issues-border-right::after {
  margin-left: 1.6px;
  border-right-color: #f6f8fa;
  border-width: 8px;
}
@media screen and (max-width: 400px) {
  .issues-border-left {
    display: none;
  }
  .issues-border-right {
    margin: 0;
  }
  .issues-border-right::before,
  .issues-border-right::after {
    display: none;
  }
}
</style>
