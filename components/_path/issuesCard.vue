/**
*
*  @author ZTiger
*
*/

<template>
  <issues-border :images="images" :user-name="userName">
    <div class="right-header index-page-flex-middle">
      <div>
        <nuxt-link :to="'/' + userName" class="right-header-link">{{ userName }}</nuxt-link>
        <span
          class="right-header-time"
          :title="$timeConversion(createTime)"
        >{{ createTime|TimeFilter }}</span>
      </div>
      <div>
        <Icon type="ios-more" size="30" />
      </div>
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div ref="rightMain" class="right-main" v-html="mdCompile(content)" />
  </issues-border>
</template>

<script>
import issuesBorder from '@/components/_path/issuesBorder.vue';
import Prism from 'prismjs';
import Marked from 'marked';
import xss from 'xss';

export default {
  components: { issuesBorder },
  // eslint-disable-next-line vue/require-prop-types
  props: ['images', 'userName', 'createTime', 'content'],
  data() {
    return {};
  },
  mounted() {
    if (process.browser) {
      this.$refs.rightMain
        .querySelectorAll('pre code')
        // eslint-disable-next-line no-undef
        .forEach(block => Prism.highlightElement(block));
    }
  },
  methods: {
    mdCompile(content) {
      const html = xss(content);
      return Marked(html);
    },
  },
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
.right-main {
  padding: 20px;
}
</style>
