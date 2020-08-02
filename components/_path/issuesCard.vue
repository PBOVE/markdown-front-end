/**
*
*  @author ZTiger
*
*/


<template>
  <issues-border :images="images" :userName="userName">
    <div class="right-header index-page-flex-middle">
      <div>
        <nuxt-link :to="'/' + userName" class="right-header-link">{{userName}}</nuxt-link>
        <span
          class="right-header-time"
          :title="$timeConversion(createTime)"
        >{{createTime|TimeFilter}}</span>
      </div>
      <div>
        <Icon type="ios-more" size="30" />
      </div>
    </div>
    <div class="right-main" ref="rightMain" v-html="mdCompile(content)" />
  </issues-border>
</template>


<script>
import issuesBorder from "@/components/_path/issuesBorder.vue";
import hljs from "highlight.js";
import Marked from "marked";
import xss from "xss";

export default {
  props: ["images", "userName", "createTime", "content"],
  components: { issuesBorder },
  data() {
    return {};
  },
  methods: {
    mdCompile(content) {
      const html = xss(content);
      return Marked(html);
    },
  },
  mounted() {
    if (process.browser) {
      this.$refs.rightMain
        .querySelectorAll("pre code")
        .forEach((block) => Prism.highlightElement(block));
    }
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
