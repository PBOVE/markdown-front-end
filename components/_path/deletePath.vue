/**
*
*  @author ZTiger
*
*/

<template>
  <Modal v-model="modalShow" footer-hide width="530" style="color:#000" :closable="false">
    <div class="index-between-modal">
      <div style="fontSize:16px; fontWeight: 600; ">删除文档库</div>
      <Icon type="md-close" class="modal-close" size="16" @click="modalShow=false" />
    </div>
    <Alert type="error" class="alert-wrap" style="fontWeight: 600;">警告：文档库删除无法撤消！请慎重操作！</Alert>
    <div style="letter-spacing: 0.1rem">
      该操作将永久删除文档库
      <span class="highlight-red">{{ storeProject.title }}</span> 的数据，同时取消文档库的关联成员。
    </div>
    <div type="warning" style="margin:20px 0px 20px">
      请输入
      <span style="fontWeight: 600;">{{ storeProject.author }}/{{ storeProject.path }}</span>
      进行确认
    </div>
    <Input v-model="projectPath" />
    <div class="modal-footer">
      <Button type="text" @click="modalShow=false">取消</Button>
      <Button type="error" :disabled="disabled" :loading="loading" @click="handleSubmit">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      // 知识库路径
      projectPath: '',
      // 设置按钮为禁用状态
      disabled: true,
      // 加载
      loading: false,
      // 对话框展示
      modalShow: false,
    };
  },
  computed: {
    ...mapGetters('author', ['storeProject']),
  },
  watch: {
    projectPath(val) {
      const path = `${this.storeProject.author}/${this.storeProject.path}`;
      this.disabled = val !== path;
    },
  },
  methods: {
    // 初始化数据
    init() {
      this.modalShow = true;
      this.projectPath = '';
    },
    // 处理提交
    handleSubmit() {
      this.loading = true;
      const { author, path } = this.$route.params;
      try {
        this.$request.deleteProject({ author, path });
        this.$router.push(`/${author}`);
      } catch (err) {}
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.alert-wrap {
  margin: 20px 0 20px;
  color: #ed4014;
  letter-spacing: 0.1rem;
}
.highlight-black,
.highlight-red {
  font-weight: bold;
  border-bottom: 2px dashed red;
  word-break: break-all;
  letter-spacing: 0rem;
}
.highlight-black {
  border-bottom: 2px dashed black;
}
.modal-footer {
  padding: 20px 0 0;
}
</style>
