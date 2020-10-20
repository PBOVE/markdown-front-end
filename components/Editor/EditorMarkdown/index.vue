/**
*
*  @author ZTiger
*
*/

<template>
  <div class="markdown-wrap">
    <client-only>
      <custom-editor ref="customEditor" @on-save="handleSave" @on-image="handleUploadImage" />
    </client-only>
  </div>
</template>

<script>
import { uploadFile } from '@/api/account';
import customEditor from '@/components/Editor/customEditor/index.vue';

export default {
  components: { customEditor },
  data() {
    return {
      // 内容
      handbook: '',
    };
  },
  mounted() {
  },
  methods: {
    // 保存
    handleSave(content) {
      this.$emit('on-save', content);
    },
    // 上传照片
    async handleUploadImage(files,insertImage) {
      const fileData = new FormData();
      fileData.append('file', files[0]);
      try {
        const { data } = await uploadFile(fileData);
        console.log(data)
        insertImage({
          url: `/api/storage/preview/${data[0]}`,
          desc: files[0].name.replace(/\..+/, ''),
        });
      } catch (err) {}
    },
    // 设置内容
    setUserByInput(value) {
      this.$nextTick(() => {
        this.$refs.customEditor.initContent(value);
      });
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
  background: url('../../../assets/svg/save.svg');
  background-size: 100% 100%;

}
.markdown-wrap .v-md-editor__toolbar-item-save{
  line-height: 32px;
}
</style>
