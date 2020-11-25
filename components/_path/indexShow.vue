<template>
  <div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="storeFormat==='richText'" ref="editor" class="richText" v-html="content" />
    <client-only v-if="storeFormat==='markdown'">
      <v-md-preview ref="editor" height="100%" :text="content" />
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  props: {
    content: { type: String, default: '' },
  },
  computed: {
    ...mapGetters('author', ['storeFormat']),
  },
  watch: {
    content: {
      handler(value) {
        if (!value) return;
        const format = this.storeFormat;
        if (format === 'richText') this.handleRTitles();
        else if (format === 'markdown') this.$nextTick(() => this.handleMTitles());
      },
    }
  },
  mounted() {
    const format = this.storeFormat;
    if (format === 'richText') this.handleRTitles();
    else if (format === 'markdown') this.$nextTick(() => this.handleMTitles());
  },
  methods: {
    ...mapMutations('author', ['setCustomAnchor']),
    // 处理 mankdown 语法编辑目录
    handleMTitles() {
      const anchors = this.$refs.editor.$el.querySelectorAll(
        '.v-md-editor-preview h1,h2,h3,h4,h5,h6',
      );
      const titles = Array.from(anchors).filter(
        title => !!title.textContent.trim(),
      );
      if (!titles.length) {
        this.setCustomAnchor([]);
        return;
      }
      const hTags = Array.from(
        new Set(titles.map(title => title.tagName)),
      ).sort();
      this.setCustomAnchor(
        titles.map(el => ({
          title: el.textContent,
          lineIndex: el.getAttribute('data-v-md-line'),
          indent: hTags.indexOf(el.tagName),
        })),
      );
    },
    // 处理富文本编辑器
    handleRTitles() {
      const anchors = this.$refs.editor.querySelectorAll('h1,h2,h3,h4,h5,h6');
      const titles = Array.from(anchors).filter(
        title => !!title.textContent.trim(),
      );
      if (!titles.length) {
        this.setCustomAnchor([]);
        return;
      }
      const hTags = Array.from(
        new Set(titles.map(title => title.tagName)),
      ).sort();
      this.setCustomAnchor(
        titles.map((el, index) => {
          el.setAttribute('data-v-rt-line', index + 1);
          return {
            title: el.textContent,
            lineIndex: el.getAttribute('data-v-rt-line'),
            indent: hTags.indexOf(el.tagName),
          };
        }),
      );
    },
  },
};
</script>

<style>
</style>
