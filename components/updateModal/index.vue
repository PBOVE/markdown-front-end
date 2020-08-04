/**
*
*  @author ZTiger
*
*/

<template>
  <Modal v-model="modalShow" class-name="modal-vertical-center" width="350" :footer-hide="true">
    <div class="modal-edit-header">
      <div>{{ headerTitle }}</div>
      <Icon type="md-close" size="18" class="modal-close" @click="modalShow=false" />
    </div>
    <div class="modal-title">{{ title }}</div>
    <div class="modal-input-wrap">
      <input
        ref="modalInput"
        v-model="content"
        type="text"
        class="modal-input"
        :maxlength="maxlength"
        @keydown.enter="handleButton"
      />
      <div v-if="maxlength" maxlength class="modal-input-prefix">{{ handleLegth(content) }}</div>
    </div>

    <div class="modal-footer">
      <Button type="text" @click="modalShow=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handleButton">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  props: {
    maxlength: {
      type: Number,
      default: 30,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // eslint-disable-next-line vue/require-default-prop
    title: {
      type: String,
    },
    // eslint-disable-next-line vue/require-default-prop
    headerTitle: {
      type: String,
    },
  },
  data() {
    return {
      // 对话框
      modalShow: false,
      // 输入框输入内容
      content: '',
    };
  },
  methods: {
    // 打开对话框
    openModal(content) {
      this.modalShow = true;
      this.content = content;
      this.$nextTick(() => {
        this.$refs.modalInput.focus();
      });
    },
    // 处理点击
    handleButton() {
      this.$emit('on-button', this.content, () => (this.modalShow = false));
    },
    handleLegth(value) {
      if (value) return `${value.length}/${this.maxlength}`;
      else return `0/${this.maxlength}`;
    },
  },
};
</script>

<style scoped>
.modal-input-wrap {
  position: relative;
}
.modal-input {
  padding: 0 40px 0 0;
}
.modal-input-prefix {
  position: absolute;
  right: 0;
  top: 4px;
}
</style>
