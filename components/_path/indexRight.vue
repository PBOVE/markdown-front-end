<template>
  <div v-if="storeCustomAnchor.length" class="index-right-wrap">
    <div class="index-titles-header">目录</div>
    <div
      v-for="(anchor,index) in storeCustomAnchor"
      :key="index"
      class="index-titles index-page-flex-middle"
      :style="{ padding: `8px 0 8px ${anchor.indent * 15 + 8}px` }"
      :title="anchor.title"
    >
      <span class="circle" />
      <span v-if="anchor.indent === 0" class="index-text-title">{{ anchor.title }}</span>
      <span v-else class="index-text-hidden">{{ anchor.title }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      titles: [],
    };
  },
  computed: {
    ...mapGetters('author', ['storeCustomAnchor']),
  },
  methods: {
    // 处理点击
    handleAnchorClick(anchor) {
      const { editor } = this.$refs;
      const { lineIndex } = anchor;
      const { format } = this.storeArticle;
      let heading;
      if (format === 'richText') {
        heading = editor.querySelector(
          `.richText [data-v-rt-line="${lineIndex}"]`,
        );
      } else if (format === 'markdown') {
        heading = editor.$el.querySelector(
          `.v-md-editor-preview [data-v-md-line="${lineIndex}"]`,
        );
      }
      if (heading) {
        this.previewScrollToTarget(heading);
      }
    },
    // 处理滚动位置
    previewScrollToTarget(heading) {
      const pos = this.$elementOffset(heading);
      window.scrollTo({
        top: pos.top - 100,
        behavior: 'smooth',
      });
    },
  },
};
</script>

<style  scoped>
.index-titles {
  cursor: pointer;
}
.index-right-wrap {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
}
.index-titles:hover {
  background: #f8f8f9;
}
.index-titles i {
  margin: 0 5px 0 0;
  font-size: 10px;
  font-weight: bold;
}
.index-titles-header {
  padding: 11.5px 16px;
  font-weight: bold;
  font-size: 16px;
}
.index-text-title{
  font-weight: bold;
}
.circle{
  display: inline-block;
  height: 5px;
  width: 5px;
  margin-right: 10px;
  border-radius: 50%;
  background: #000;
}
</style>
