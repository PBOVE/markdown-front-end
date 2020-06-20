/**
*
*  @author ZTiger
*
*/


<template>
  <div class="password-wrap">
    <public-header />
    <div class="delete-header">
      <div class="delete-header-content">
        <nuxt-link to="/user/security">
          <Icon type="md-arrow-round-back" class="delete-header-content-icon" />
        </nuxt-link>
        <div>删除您的 “Freedom” 帐号</div>
      </div>
    </div>
    <div class="delete-content">
      <div class="delete-content-title">您可以永久删除自己的 Freedom 帐号以及所有服务和数据</div>
      <div class="user-border delete-main">
        <div>这部分内容非常重要，请仔细阅读。</div>
        <div class="delete-tip">您正在尝试删除自己的 “Freedom” 帐号（您可以通过此帐号使用各种 “Freedom” 服务）。</div>
        <div class="delete-tip">删除后，您将无法再使用任何 “Freedom” 服务，并且您的帐号和数据也将会丢失。</div>
        <Divider />
        <div style="max-width:300px">
          <div style="padding:0px 0 6px;font-size:14px;">账户密码:</div>
          <Input v-model="password" type="password" size="large" placeholder="请输入密码" />
        </div>
        <div style="margin-top:25px;">
          <Button type="primary" size="large" @click="handleButton" :loading="loading">删除账户</Button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  transition: "fade",
  components: { publicHeader },

  data() {
    return {
      // 对话框展示
      modelShow: true,
      // 设置按钮为加载中状态
      loading: false,
      // 密码
      password: "",
    };
  },
  head() {
    return {
      title: "帐号注销 ● Freedom",
    };
  },

  methods: {
    async handleButton() {
      if (!this.password) {
        this.$Message.info({
          background: true,
          content: "请您输入您的 Freedom 账户密码",
          duration: 5,
        });
        return;
      }
      try {
        this.loading = true;
        await this.$request.deleteAccount({ password: this.password });
        this.$store.commit("token/removeToken");
        this.$router.push("/login");
      } catch (err) {}
      this.loading = false;
    },
  },
};
</script>


<style scoped>
.delete-content {
  padding: 0 18px;
}
.delete-content,
.delete-header-content {
  margin: 0 auto;
  max-width: 780px;
}
.delete-header {
  padding: 0 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.delete-header-content {
  display: flex;
  align-items: center;
  padding: 0 0 5px 0;
  font-size: 23px;
  color: #202124;
}
.delete-header-content-icon {
  margin: 0 10px 0 0;
  cursor: pointer;
  height: 34px;
  width: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 24px;
  color: #000;
}
.delete-header-content-icon:active {
  border-radius: 50%;
  background: #dcdee2;
}
.delete-content-title {
  padding: 24px 0;
  color: rgba(0, 0, 0, 0.65);
}
.delete-main {
  padding: 24px;
}
.delete-tip {
  margin: 10px 0 0 0;
  font-weight: 520;
  color: #5f6368;
  letter-spacing: 0.1em;
}
</style>
