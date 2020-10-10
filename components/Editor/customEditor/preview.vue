<template>
  <div ref="wrap" class="custom-preview-wrap">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div ref="preview" v-highlight v-html="content" />
  </div>
</template>

<script>
import showdown from 'showdown';
import xssFilter from 'showdown-xss-filter';

export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // 内容
      content: '',
      // 转 html
      converter: new showdown.Converter({
        tables: true,
        strikethrough: true,
        openLinksInNewWindow: true,
        parseImgDimensions: true,
        extensions: [xssFilter],
      }),
    };
  },
  watch: {
    text: {
      handler(value) {
        this.content = this.converter.makeHtml(value);
      },
      immediate: true,
    },
  },
  methods: {
    // 设置滚动条高度
    setScrollTop(pos) {
      const offsetHeight = this.$refs.wrap.offsetHeight;
      const scrollHeight = this.$refs.preview.offsetHeight + 40;
      const scale = (scrollHeight - offsetHeight) / (pos.height - offsetHeight);
      if (scale < 0) return;
      this.$refs.wrap.scrollTop = scale * pos.top;
    },
  },
};
</script>

<style lang="scss">
$primary-color: #17233d;

.custom-preview-wrap {
  height: 100%;
  padding: 20px;
  overflow: auto;
  color: #515a6e;
  word-break: break-all;
  h1 {
    margin: 0.67em 0;
    padding: 0 0 0.2em;
    color: $primary-color;
    border-bottom: 1px solid #dcdee2;
  }
  h2 {
    color: $primary-color;
    margin: 0.83em 0;
  }
  h3 {
    color: $primary-color;
    margin: 1.17em 0;
  }
  h4 {
    color: $primary-color;
    margin: 1.33em 0;
  }
  h5 {
    color: $primary-color;
    margin: 1.67em 0;
  }
  h6 {
    color: $primary-color;
    margin: 2.33em 0;
  }
  ol,
  ul {
    padding-left: 1.2em;
  }
  li{
    padding: 1em 0;
    line-height: 40px;
  }
  table {
    display: block;
    margin: 1rem 0;
    overflow-x: auto;
    border-collapse: collapse;
  }
  tr {
    border-top: 1px solid #dfe2e5;
  }
  td,
  th {
    padding: 0.6em 1em;
    border: 1px solid #dfe2e5;
  }
  tr:nth-child(2n) {
    background-color: #f6f8fa;
  }
  hr {
    margin: 8px 0;
    border: 0;
    height: 1px;
    background: #dfe2e5;
  }
  blockquote {
    margin: 1rem 0;
    padding: 0.25rem 0 0.25rem 1rem;
    font-size: 1rem;
    border-left: 0.2rem solid #dfe2e5;
  }
  .hljs {
    margin: 1em 0;
    border-radius: 3px;
    display: inline;
  }
  pre .hljs {
    display: block;
  }
  p {
    margin: 0 0 16px;
  }
}
</style>
