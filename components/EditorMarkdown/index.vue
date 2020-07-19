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
        @upload-image="handleUploadImage"
        @save="handleSave"
      />
    </client-only>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

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
      leftToolbar: "undo redo clear | image  emoji save",
      // 右侧工具栏
      rightToolbar: "preview toc sync-scroll fullscreen",
    };
  },
  computed: {
    ...mapGetters("author", ["storeContent"]),
  },
  watch: {
    storeContent: {
      handler(val) {
        this.handbook = val;
      },
      immediate: true,
    },
  },
  mounted() {
    if (window.innerWidth < 500) {
      this.mode = "edit";
      this.rightToolbar = "fullscreen";
      this.leftToolbar = "undo redo clear |  emoji save";
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
  },
};
</script>


<style scoped>
.markdown-wrap {
  height: 100%;
  overflow: hidden;
}
</style>
