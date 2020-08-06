/**
*
*  @author ZTiger
*
*/

<template>
  <Modal v-model="modalShow" footer-hide width="530" style="color:#000" :closable="false">
    <div class="index-between-modal">
      <div style="fontSize:16px; fontWeight: 600; ">更改文档库可见性</div>
      <Icon type="md-close" class="modal-close" size="16" @click="modalShow=false" />
    </div>
    <Alert type="error" class="alert-wrap" style="fontWeight: 600;">警告：这是潜在的破坏性行为！请慎重操作！</Alert>
    <RadioGroup v-model="share" vertical style="padding: 0px 16px 20px;">
      <Radio label="1" class="row-middle">
        <div style="margin:0 0 0 10px">
          <div class="row-title">所有人可见</div>
          <div class="row-content">{{ public }}</div>
        </div>
      </Radio>
      <Radio label="0" class="row-middle">
        <div style="margin:0 0 0 10px">
          <div class="row-title">仅自己可见</div>
          <div class="row-content">{{ private }}</div>
        </div>
      </Radio>
    </RadioGroup>
    <div type="warning" style="margin:0 0px 20px">
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
      // 分享
      share: '1',
      //
      public: '',
      //
      private: '',
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
    init(share) {
      this.modalShow = true;
      this.projectPath = '';
      if (share) {
        this.share = '1';
        this.public = '该文档库当前是对所有人可见';
        this.private = '仅自己和文档库成员可见';
      } else {
        this.share = '0';
        this.public = '对所有人可见';
        this.private = '该文档库当前仅对自己可见';
      }
    },
    // 处理提交
    async handleSubmit() {
      const share = this.storeProject.share ? '1' : '0';
      if (share === this.share) return (this.modalShow = false);
      const { author, path } = this.$route.params;
      const params = { author, path };
      params.share = this.share === '1';
      this.loading = true;
      const { data } = await this.$request.updateProject(params);
      this.$store.commit('author/setProject', data);
      this.$Message.success({ background: true, content: '更新成功' });
      this.loading = false;
      this.modalShow = false;
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
.modal-footer {
  padding: 20px 0 0;
}
.row-middle {
  display: flex;
  align-items: center;
  height: auto;
}
.row-title,
.row-content {
  color: #000;
  height: 25px;
}
.row-title {
  letter-spacing: 0.1rem;
  font-weight: 600;
}
</style>
