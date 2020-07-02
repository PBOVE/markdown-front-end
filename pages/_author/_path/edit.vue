/**
*
*  @author ZTiger
*
*/


<template>
  <div class="edit-wrap">
    <tinymce-editor v-if="storeFormat==='richText'" @on-save="handleSave" />
    <markdown-editor v-else-if="storeFormat==='markdown'" @on-save="handleSave" />
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import tinymceEditor from "@/components/EditorTinymce/index.vue";
import markdownEditor from "@/components/EditorMarkdown/index.vue";

export default {
  components: { tinymceEditor, markdownEditor },
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
  computed: {
    ...mapGetters("author", ["storeFormat"]),
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
  },
};
</script>


<style scoped>
.edit-wrap {
  height: 100%;
}
</style>
