<template>
  <div class="custom-textarea-wrap">
    <ace-editor
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
      default: ''
    }
  },
  data() {
    return {
      content: '',
      options: {
        fontSize: 14,
        wrap: true,
        showLineNumbers: false,
        showGutter: false,
      },
    };
  },

  methods: {
    editorInit(editor) {
      require('brace/ext/language_tools'); // language extension prerequsite...
      require('brace/mode/markdown');
      require('brace/mode/javascript'); // language
      require('brace/mode/less');
      require('brace/theme/chrome');
      require('brace/snippets/javascript'); // snippet

      editor.session.on('changeScrollTop', (top) => {
        const height = editor.getSession().getScreenLength() * editor.renderer.lineHeight;
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
    },
    // 初始化内容
    initContent(value) {
      this.content = value;
    }

  },
};
</script>

<style scoped>
.custom-textarea-wrap {
  height: 100%;
  overflow: auto;
}
</style>
