/**
*
*  @author ZTiger
*
*/

<template>
  <div class="modify-md-wrap">
    <div class="modify-header">
      <div class="modify-header-button button-select">编辑</div>
    </div>
    <client-only>
      <v-md-editor
        v-model="handbook"
        mode="edit"
        placeholder="留言"
        :toolbar="toolbar"
        :left-toolbar="leftToolbar"
        :right-toolbar="rightToolbar"
        :codemirror-config="codemirrorConfig"
        :disabled-menus="[]"
        @upload-image="handleUploadImage"
      />
    </client-only>
  </div>
</template>

<script>
import { uploadFile } from '@/api/account';

export default {
  model: {
    prop: 'model',
    event: 'parent-event',
  },
  props: {
    model: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // 内容
      handbook: '',
      // 左侧侧工具栏
      leftToolbar: '',
      rightToolbar: 'title bold | ul ol table hr | link code',
      // 初始化 Codemirror 的配置
      codemirrorConfig: {
        lineNumbers: false,
      },
      // 自定义工具栏
      toolbar: {
        title: {
          title: '标题',
          icon: 'v-md-icon-title',
          action(editor) {
            editor.insert((selected) => {
              const content = selected || '标题';
              return {
                text: `### ${content}`,
                selected: content,
              };
            });
          },
        },
      },
    };
  },
  watch: {
    handbook: {
      handler(value) {
        this.$emit('parent-event', value);
      },
    },
    model: {
      handler(value) {
        this.handbook = value;
      },
      immediate: true,
    },
  },
  methods: {
    // 上传照片
    async handleUploadImage(_event, insertImage, files) {
      const fileData = new FormData();
      fileData.append('file', files[0]);
      try {
        const { data } = await uploadFile(fileData);
        insertImage({
          url: `/api/storage/preview/${data[0]}`,
          desc: files[0].name.replace(/\..+/, ''),
        });
      } catch (err) {}
    },
    // 保存
    handlesave(callback) {
      callback(this.handbook);
    },
  },
};
</script>

<style scoped>
.modify-md-wrap {
  position: relative;
  height: 100%;
}
.v-md-editor {
  box-shadow: none;
  height: calc(100% - 20px);
}
.modify-header {
  position: absolute;
  top: 0px;
  left: 10px;
}
.modify-header-button {
  display: inline-block;
  padding: 0 20px;
  height: 41px;
  line-height: 41px;
  border: 1px solid transparent;
  border-radius: 8px 8px 0 0;
}
.button-select {
  background: #fff;
  border: 1px solid #dcdee2;
  border-bottom: 0;
}
@media screen and (max-width: 550px) {
  .v-md-editor {
    height: 200px;
  }
  .modify-header {
    display: none;
  }
}
</style>
<style >
.modify-md-wrap .CodeMirror-focused {
  border: 1px solid #57a3f3 !important;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
  background-color: #fff !important;
}
.modify-md-wrap .ivu-input::placeholder {
  color: #808695;
}
.modify-md-wrap .CodeMirror {
  height: calc(100% - 13px) !important;
  margin: 10px 10px 0;
  border: 1px solid #dcdee2;
  width: calc(100% - 20px);
  border-radius: 8px;
  background-color: #fafbfc;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
.modify-md-wrap .CodeMirror-placeholder {
  color: #808695 !important;
}
.modify-md-wrap .v-md-icon-title::before {
  content: 'H';
}
.modify-md-wrap .v-md-editor__left-area {
  display: none;
}
.modify-md-wrap .v-md-editor__toolbar-left + .v-md-editor__toolbar-right {
  margin: 0;
}
</style>
