/**
*
*  @author ZTiger
*
*/

<template>
  <issues-border :images="images" :title="nickName">
    <div class="right-header index-page-flex-middle">
      <div>
        <nuxt-link :to="'/' + userName" class="right-header-link">{{ nickName }}</nuxt-link>
        <span
          class="right-header-time"
          :title="$timeConversion(createTime)"
        >{{ createTime|TimeFilter }}</span>
      </div>
      <div>
        <Icon type="ios-more" size="30" />
      </div>
    </div>
    <client-only>
      <v-md-preview ref="editor" height="100%" :text="content" />
    </client-only>
  </issues-border>
</template>

<script>
import issuesBorder from '@/components/_path/issuesBorder.vue';

export default {
  components: { issuesBorder },
  // eslint-disable-next-line vue/require-prop-types
  props: ['images', 'userName', 'createTime', 'content', 'nickName'],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.issues-card-wrap {
  display: flex;
  align-items: flex-start;
}
.right-header {
  justify-content: space-between;
  padding: 0 10px;
  height: 40px;
  background: #f6f8fa;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #d1d5da;
}
.right-header-link {
  margin: 0 10px 0 0;
  font-size: 18px;
}
.right-header-link:hover {
  text-decoration: underline;
}
.right-header-time {
  color: #515a6e;
}
</style>
