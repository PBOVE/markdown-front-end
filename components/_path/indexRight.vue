<template>
  <div>
    <div v-if="titles.lengrh" class="index-right-header">目录</div>
    <div
      v-for="(anchor,index) in titles"
      :key="index"
      class="index-titles index-page-flex-middle"
      :style="{ padding: `8px 0 8px ${anchor.indent * 15}px` }"
      :title="anchor.title"
      @click="handleAnchorClick(anchor)"
    >
      <span class="index-text-hidden">{{ anchor.title }}</span>
    </div>
  </div>
</template>

<script>
export default {

  methods: {
    // 处理 mankdown 语法编辑目录
    handleMTitles() {
      const anchors = this.$refs.editor.$el.querySelectorAll(
        '.v-md-editor-preview h1,h2,h3,h4,h5,h6',
      );
      const titles = Array.from(anchors).filter(
        title => !!title.textContent.trim(),
      );
      if (!titles.length) {
        this.titles = [];
        return;
      }
      const hTags = Array.from(
        new Set(titles.map(title => title.tagName)),
      ).sort();
      this.titles = titles.map(el => ({
        title: el.textContent,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
      }));
    },
    // 处理富文本编辑器
    handleRTitles() {
      const anchors = this.$refs.editor.querySelectorAll('h1,h2,h3,h4,h5,h6');
      const titles = Array.from(anchors).filter(
        title => !!title.textContent.trim(),
      );
      if (!titles.length) {
        this.titles = [];
        return;
      }
      const hTags = Array.from(
        new Set(titles.map(title => title.tagName)),
      ).sort();
      this.titles = titles.map((el, index) => {
        el.setAttribute('data-v-rt-line', index + 1);
        return {
          title: el.textContent,
          lineIndex: el.getAttribute('data-v-rt-line'),
          indent: hTags.indexOf(el.tagName),
        };
      });
    },
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
  }
};
</script>

<style>

</style>
