/**
*
*  @author ZTiger
*
*/

<template>
  <div class="delete">
    <div class="setting-delete-header">危险操作</div>
    <Divider />
    <div class="setting-delete-row">
      <div class="setting-delete-left">
        <div class="setting-delete-title">删除</div>
        <div>一旦删除，就无法返回。确定是否删除。</div>
      </div>
      <div class="setting-delete-roght">
        <Button type="error" @click="handleDelete">确定删除</Button>
      </div>
    </div>

    <Modal v-model="modalShow" footer-hide width="400" :closable="false">
      <div class="model-header">您确定要删除吗?</div>
      <div class="model-main">
        此操作无法撤消。这将永久删除
        <strong>{{ storeProject.author }}/{{ storeProject.title }}</strong> 文档库
      </div>
      <div class="model-tip">请输入文档库路径, 表示确认删除此文档库</div>
      <Input v-model="projectPath" />
      <div class="model-footer">
        <Button type="text" @click="modalShow=false">取消</Button>
        <Button type="error" :disabled="disabled" :loading="loading" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
      // 对话框
      modalShow: false,
      // 知识库路径
      projectPath: '',
      // 设置按钮为禁用状态
      disabled: true,
      // 加载
      loading: false,
    };
  },
  computed: {
    ...mapGetters('author', ['storeProject']),
  },
  watch: {
    projectPath(val) {
      if (val === this.storeProject.path) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
  methods: {
    // 处理删除
    handleDelete() {
      this.modalShow = true;
    },
    // 处理提交
    handleSubmit() {
      this.loading = true;
      try {
        this.$request.deleteProject({ author: this.author, path: this.path });
        this.$router.push(`/${this.author}`);
      } catch (err) {}
    },
  },
};
</script>

<style scoped>
.setting-delete-header {
  font-size: 24px;
  padding: 0 0 8px;
}
.setting-delete-title {
  font-size: 14px;
  font-weight: 600;
  margin: 2px 0 0;
}
.setting-delete-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.model-header {
  font-size: 18px;
  color: #000;
}
.model-main {
  color: #000;
  margin: 10px 0;
}
.model-tip {
  color: #000;
  margin: 0 0 10px 0;
}
.model-footer {
  text-align: right;
  margin: 20px 0 0;
}
.model-footer button:last-of-type {
  margin: 0 0 0 10px;
}
</style>
