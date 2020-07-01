/**
*
*  @author ZTiger
*
*/


<template>
  <div class="edit-wrap">
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
  validate({ store, params }) {
    return (
      store.state.user.userState &&
      (store.state.author.edit ||
        params.author === store.state.user.data.userName)
    );
  },
  data() {
    return {
      //
      author: this.$route.params.author,
      path: this.$route.params.path,
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
      try {
        const params = {
          author: this.author,
          content,
          path: this.path,
        };
        await this.$request.updateProject(params);
        this.$Message.success({
          background: true,
          content: "项目保存成功",
        });
      } catch (err) {}
    },
    // 上传照片
    async handleUploadImage(event, insertImage) {
      let file;
      if (event.dataTransfer) file = event.dataTransfer.files[0];
      else if (event.target.files) file = event.target.files[0];
      else if (event.clipboardData && event.clipboardData.items.length) {
        file = event.clipboardData.items[0].getAsFile();
      } else return;
      const reg = /^image/;
      if (!file || !reg.test(file.type)) return;
      if (file.size > 1024 * 1024 * 5) {
        this.$Message.warning("文件太大,请不要上传文件大于 3M 的图片");
        return;
      }
      let Filedata = new FormData();
      Filedata.append("file", file);
      try {
        const { data } = await this.$request.uploadFile(Filedata);
        insertImage({
          url: `/api/storage/preview/${data[0]}`,
          desc: file.name.replace(/\..+/, ""),
        });
      } catch (err) {}
    },
  },
};
</script>


<style scoped>
.edit-wrap {
  height: 100%;
}
</style>
