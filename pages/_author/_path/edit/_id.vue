/**
*
*  @author ZTiger
*
*/

<template>
  <div class="edit-content">
    <tinymce-editor v-if="storeFormat==='richText'" ref="editor" @on-save="handleSave" />
    <markdown-editor v-else-if="storeFormat==='markdown'" ref="editor" @on-save="handleSave" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { _updateContent, _queryPostDetails } from '@/api/post';
import tinymceEditor from '@/components/EditorTinymce/index.vue';
import markdownEditor from '@/components/EditorMarkdown/index.vue';

export default {
  components: { tinymceEditor, markdownEditor },
  async asyncData({ store, params }) {
    const { author, path, id } = params;
    const { data } = await _queryPostDetails({ author, path, id });
    store.commit('author/setSelectPost', {
      id: id || 0,
      title: id ? data.name : '首页',
    });
    return { content: data.content, random: Math.random() };
  },
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
    };
  },
  computed: {
    ...mapGetters('author', ['storeFormat', 'storeSelectPost']),
  },
  watch: {
    random: {
      handler() {
        this.$refs.editor.setUserByInput(this.content);
      },
    },
  },
  mounted() {
    this.$refs.editor.setUserByInput(this.content);
  },
  methods: {
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
        await _updateContent(params);
        this.$Message.success({
          background: true,
          content: '保存成功',
        });
      } catch (err) {}
    },
  },
};
</script>

<style scoped>
.edit-content {
  width: 100%;
  height: 100%;
}
</style>
