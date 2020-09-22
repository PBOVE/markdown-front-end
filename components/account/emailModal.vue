<template>
  <Modal v-model="modalShow" class-name="modal-vertical-center" width="350" :footer-hide="true">
    <div class="modal-edit-header">
      <div>更改邮箱</div>
      <Icon type="md-close" size="18" class="modal-close" @click="modalShow=false" />
    </div>
    <Form ref="from" :model="dataItem" label-position="top" :rules="rules">
      <FormItem prop="password">
        <Input v-model="dataItem.password" type="password" password placeholder="账户密码" size="large" />
      </FormItem>
      <FormItem prop="email" style="padding-top:5px">
        <Input v-model="dataItem.email" placeholder="邮箱" size="large" />
      </FormItem>
    </Form>
    <div class="modal-footer">
      <Button type="text" @click="modalShow=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handleButton">确定</Button>
    </div>
  </Modal>
</template>

<script>
import { updateEmail } from '@/api/account';

export default {
  data() {
    return {
      modalShow: false,
      // 加载
      loading: false,
      // 输入的内容
      dataItem: {},
      // 规则
      rules: {
        password: [{ required: true, message: '不允许为空', trigger: 'blur' }],
        email: [
          { required: true, message: '不允许为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async handleButton() {
      try {
        this.loading = true;
        await this.validate();
        const { data } = await updateEmail(this.dataItem);
        this.$store.commit('user/setUser', data);
        this.modalShow = false;
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
    // 检查
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.from.validate((valid) => {
          if (valid) {
            resolve(true);
          } else {
            reject(new Error('空值'));
          }
        });
      });
    },
    // 对话框
    openModal() {
      this.dataItem = {};
      this.$refs.from.resetFields();
      this.modalShow = true;
    }
  },
};
</script>

<style  scoped>
.modal-edit-header {
  padding: 0 0 20px;
}
.modal-footer {
  padding: 10px 0 0;
}
</style>
