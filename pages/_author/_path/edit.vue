/**
*
*  @author ZTiger
*
*/


<template>
  <div class="edit-wrap">
    <editLeft class="edit-left" />
    <div class="edit-right">
      <tinymce-editor v-if="storeFormat==='richText'" @on-save="handleSave" />
      <markdown-editor v-else-if="storeFormat==='markdown'" @on-save="handleSave" />
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import tinymceEditor from "@/components/EditorTinymce/index.vue";
import markdownEditor from "@/components/EditorMarkdown/index.vue";
import editLeft from "@/components/_path/editLeft.vue";

export default {
  transition: "fade",
  components: { tinymceEditor, markdownEditor, editLeft },
  validate({ store, params }) {
    return (
      store.state.user.userState &&
      (store.state.author.edit ||
        params.author === store.state.user.data.userName)
    );
  },
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
    };
  },
  head() {
    return {
      title: `编辑 · ${this.author}/${this.storeProject.path} ● TBS.feel`,
    };
  },
  computed: {
    ...mapGetters("author", ["storeFormat", "storeProject"]),
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
        await this.$request.updatePContent(params);
        this.$Message.success({
          background: true,
          content: "知识库保存成功",
        });
      } catch (err) {}
    },
  },
};
</script>


<style scoped>
.edit-wrap {
  display: flex;
  height: 100%;
}
.edit-right {
  flex: 1;
}
</style>
