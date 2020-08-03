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
        :codemirrorConfig="codemirrorConfig"
        @upload-image="handleUploadImage"
        @save="handleSave"
      />
    </client-only>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 内容
      handbook: "",
      // 配置
      toolbars: {},
      // 模式
      mode: "editable",
      // 左侧侧工具栏
      leftToolbar: "save | undo redo clear | image  emoji",
      // 右侧工具栏
      rightToolbar: "preview toc sync-scroll fullscreen",
      // 初始化 Codemirror 的配置
      codemirrorConfig: {},
    };
  },
  mounted() {
    if (window.innerWidth < 500) {
      this.mode = "edit";
      this.rightToolbar = "fullscreen";
      this.leftToolbar = "save | undo redo clear | emoji ";
      this.codemirrorConfig = { lineNumbers: false };
    }
  },
  methods: {
    // 保存
    async handleSave(content) {
      this.$emit("on-save", content);
    },
    // 上传照片
    async handleUploadImage(event, insertImage, files) {
      const reg = /^image/;
      let fileData = new FormData();
      // files.forEach(file => {
      //   fileData.append("file", file);
      // });
      fileData.append("file", files[0]);
      try {
        const { data } = await this.$request.uploadFile(fileData);
        // const images = [];
        // files.forEach((file, index) => {
        //   images.push({
        //     url: `/api/storage/preview/${data[index]}`,
        //     desc: file.name.replace(/\..+/, ""),
        //   });
        // });
        insertImage({
          url: `/api/storage/preview/${data[0]}`,
          desc: files[0].name.replace(/\..+/, ""),
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
