/**
*
*  @author ZTiger
*
*/

<template>
  <div class="modify-md-wrap">
    <textarea v-model="handbook" class="modify-textarea" />
  </div>
</template>

<script>
// import { uploadFile } from '@/api/account';

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
    // // 上传照片
    // async handleUploadImage(_event, insertImage, files) {
    //   const fileData = new FormData();
    //   fileData.append('file', files[0]);
    //   try {
    //     const { data } = await uploadFile(fileData);
    //     insertImage({
    //       url: `/api/storage/preview/${data[0]}`,
    //       desc: files[0].name.replace(/\..+/, ''),
    //     });
    //   } catch (err) {}
    // },
    // 保存
    handlesave(callback) {
      callback(this.handbook);
    },
  },
};
</script>

<style scoped>
.modify-md-wrap {
  height: 100%;
  width: 100%;
  /* border-top: 1px solid #dcdee2;
  border-bottom: 1px solid #dcdee2; */
}
.modify-textarea {
  resize: none;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  padding: 10px;
}
</style>
