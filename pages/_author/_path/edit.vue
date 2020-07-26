/**
*
*  @author ZTiger
*
*/


<template>
  <div class="edit-wrap">
    <editLeft class="edit-left" @on-loading="handleLoading" />
    <div class="edit-right">
      <Spin size="large" fix v-show="spinShow" />
      <tinymce-editor v-if="storeFormat==='richText'" @on-save="handleSave" />
      <markdown-editor v-else-if="storeFormat==='markdown'" @on-save="handleSave" />
    </div>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
import tinymceEditor from "@/components/EditorTinymce/index.vue";
import markdownEditor from "@/components/EditorMarkdown/index.vue";
import editLeft from "@/components/_path/editLeft.vue";

export default {
  transition: "fade",
  components: { tinymceEditor, markdownEditor, editLeft },
  validate({ store, params }) {
    const { user, author } = store.state;
    return (
      user.userState &&
      (author.project.edit || params.author === user.data.userName)
    );
  },
  async asyncData({ store, params, app }) {
    const { author, path } = params;
    const { data } = await app.$request.queryPostDetails({ author, path });
    store.commit("author/setContent", data.content);
    store.commit("author/setSelectPost",{ id: 0, title: "首页" });
  },
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
      spinShow: false,
    };
  },
  head() {
    return {
      title: `编辑 · ${this.storeSelectPost.title || "首页"} ● TBS.feel`,
    };
  },
  computed: {
    ...mapGetters("author", ["storeFormat", "storeProject", "storeSelectPost"]),
  },
  beforeDestroy() {
    this.setSelectPost({});
  },
  methods: {
    ...mapMutations("author", ["setSelectPost"]),
    // 保存
    async handleSave(content) {
      try {
        const params = {
          author: this.author,
          path: this.path,
          content,
        };
        const id = this.storeSelectPost.id;
        if (id) params.id = id;
        await this.$request.updatePContent(params);
        this.$Message.success({
          background: true,
          content: "保存成功",
        });
      } catch (err) {}
    },
    // 处理加载
    handleLoading(value) {
      this.spinShow = value;
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
  position: relative;
  flex: 1;
}
@media screen and (max-width: 900px) {
  .edit-left {
    display: none;
  }
}
</style>
