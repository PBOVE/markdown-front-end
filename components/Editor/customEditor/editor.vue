<template>
  <div
    class="custom-textarea-wrap"
    @dragover.prevent
    @paste="handlePaste($event)"
    @drop.prevent="handleDrop($event)"
  >
    <ace-editor
      ref="ace"
      v-model="content"
      lang="markdown"
      theme="chrome"
      width="100%"
      height="100%"
      :options="options"
      @init="editorInit"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // 内容
      content: '',
      // 配置
      options: {
        fontSize: 14,
        wrap: true,
        showLineNumbers: false,
        showGutter: false,
      },
      //
    };
  },
  mounted() {},
  methods: {
    editorInit(editor) {
      require('brace/ext/language_tools'); // language extension prerequsite...
      require('brace/mode/markdown');
      require('brace/mode/javascript'); // language
      require('brace/mode/less');
      require('brace/theme/chrome');
      require('brace/snippets/javascript'); // snippet

      editor.session.on('changeScrollTop', top => {
        const height =
          editor.getSession().getScreenLength() * editor.renderer.lineHeight;
        this.$emit('on-scroll', { top, height });
      });
      editor.session.on('change', () => {
        this.$emit('on-change', this.content);
      });
      editor.commands.addCommand({
        name: 'save',
        bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
        exec: () => this.$emit('on-save', this.content),
        readOnly: false,
      });
      editor.on('paste', e => {
        console.log(e);
      });
      // console.log();
    },
    // 初始化内容
    initContent(value) {
      this.content = value;
    },
    // 获取内容
    getContent() {
      return this.content;
    },
    // 处理复制
    handlePaste(event) {
      const items = (event.clipboardData || window.clipboardData).items;
      let file = null;
      if (!items || items.length === 0) return;
      // 搜索剪切板items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.includes('image')) {
          file = items[i].getAsFile();
          break;
        }
      }
      if (!file) return;
      this.$emit('on-image', file);
    },
    // 处理粘贴
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (!file) return;
      this.$emit('on-image', file, this.insertImage);
    },
    // 照片插入
    insertImage(image) {
      this.$refs.ace.editor.insert(`![${image.desc}](${image.url} =100%x*)`);
    },
  },
};
</script>

<style scoped>
.custom-textarea-wrap {
  height: 100%;
  overflow: auto;
}
</style>
