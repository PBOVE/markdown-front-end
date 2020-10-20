<template>
  <div class="custom-editor-wrap">
    <div class="custom-editor-header">
      <custom-toolbar @on-save="handlerSave" />
    </div>
    <div class="custom-editor-main">
      <div class="custom-editor-content">
        <div class="custom-editor-left">
          <custom-editor
            ref="editor"
            @on-save="handlerSave"
            @on-change="editorChange"
            @on-scroll="handlerLeftScroll"
            @on-image="handlerImage"
          />
        </div>
        <div class="custom-editor-right">
          <custom-preview ref="preview" :text="handbook" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customToolbar from './toolbar.vue';
import customEditor from './editor.vue';
import customPreview from './preview.vue';

export default {
  components: { customToolbar, customEditor, customPreview },
  data() {
    return {
      // 内容
      handbook: '',
    };
  },
  methods: {
    // 编辑去内容发生变化
    editorChange(value) {
      this.handbook = value;
    },
    // 处理右边滚动
    handlerLeftScroll(pos) {
      this.$refs.preview.setScrollTop(pos);
    },
    // 初始化内容
    initContent(value) {
      this.handbook = value;
      this.$refs.editor.initContent(value);
    },
    // 用户点击保存
    handlerSave() {
      this.$emit('on-save', this.$refs.editor.getContent());
    },
    // 处理照片
    handlerImage(file, insertImage) {
      this.$emit('on-image', [file], insertImage);
    },
  },
};
</script>

<style scoped>
.custom-editor-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.custom-editor-header {
  flex-shrink: 0;
}
.custom-editor-main {
  flex: 1;
  display: flex;
  height: 0;
  overflow: hidden;
}
.custom-editor-content {
  display: flex;
  flex: 1;
  width: 0;
  height: 100%;
  overflow: hidden;
}
.custom-editor-content > div:nth-child(2n) {
  border-left: 1px solid #dcdee2;
}
.custom-editor-left,
.custom-editor-right {
  width: 50%;
}
</style>
