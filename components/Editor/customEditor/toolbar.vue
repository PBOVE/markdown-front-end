<template>
  <div class="toolbar-wrap">
    <div class="toolbar-wrap-left">
      <Icon type="md-cloud-upload" :size="20" class="toolbar-icon" @click="handlUpload" />
    </div>
    <div class="toolbar-wrap-right"></div>
  </div>
</template>

<script>
export default {
  methods: {
    handlUpload() {
      this.$emit('on-save');
    }
  }
};
</script>

<style scoped lang="scss">
.toolbar-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 41px;
  border-bottom: 1px solid #ddd;
  padding: 0 6px;
}
.toolbar-icon {
  height: 34px;
  width: 34px;
  line-height: 36px;
  border-radius: 4px;
  transition: all 0.2s linear 0s;
  cursor: pointer;
}
.toolbar-icon:hover {
  background: #dcdee2;
}
</style>
