/**
*
*  @author ZTiger
*
*/

<template>
  <div class="markdown-wrap">
    <client-only>
      <v-md-editor
        v-model="handbook"
        height="100%"
        :left-toolbar="leftToolbar"
        :right-toolbar="rightToolbar"
        :mode="mode"
        :disabled-menus="[]"
        :codemirror-config="codemirrorConfig"
        @upload-image="handleUploadImage"
        @save="handleSave"
      />
    </client-only>
  </div>
</template>

<script>
import { _uploadFile } from '@/api/account';

export default {
  data() {
    return {
      // 内容
      handbook: '',
      // 配置
      toolbars: {},
      // 模式
      mode: 'editable',
      // 左侧侧工具栏
      leftToolbar: 'save | undo redo clear | image emoji',
      // 右侧工具栏
      rightToolbar: 'preview toc sync-scroll fullscreen',
      // 初始化 Codemirror 的配置
      codemirrorConfig: {},
    };
  },
  mounted() {
    if (window.innerWidth <= 500) {
      this.mode = 'edit';
      this.rightToolbar = 'fullscreen';
      this.leftToolbar = 'save | undo redo clear | emoji ';
      this.codemirrorConfig = { lineNumbers: false };
    }
  },
  methods: {
    // 保存
    handleSave(content) {
      this.$emit('on-save', content);
    },
    // 上传照片
    async handleUploadImage(_event, insertImage, files) {
      const fileData = new FormData();
      fileData.append('file', files[0]);
      try {
        const { data } = await _uploadFile(fileData);
        insertImage({
          url: `/api/storage/preview/${data[0]}`,
          desc: files[0].name.replace(/\..+/, ''),
        });
      } catch (err) {}
    },
    // 设置内容
    setUserByInput(value) {
      this.handbook = value;
    },
  },
};
</script>

<style scoped>
.markdown-wrap {
  height: 100%;
  overflow: hidden;
}
</style>
<style >
.markdown-wrap .v-md-icon-save:before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url('../../assets/svg/save.svg');
  background-size: 100% 100%;

}
.markdown-wrap .v-md-editor__toolbar-item-save{
  line-height: 32px;
}
</style>
