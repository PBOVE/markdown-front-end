<template>
  <div ref="editor">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="storeFormat==='richText'" class="richText" v-html="content" />
    <client-only v-if="storeFormat==='markdown'">
      <custom-preview :text="content" />
    </client-only>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import customPreview from '@/components/Editor/customEditor/preview';

export default {
  components: { customPreview },
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
        this.$nextTick(() => this.handleRTitles());
      },
    }
  },
  mounted() {
    this.$nextTick(() => this.handleRTitles());
  },
  methods: {
    ...mapMutations('author', ['setCustomAnchor']),
    // 处理编辑器
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
