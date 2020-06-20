/**
*
*  @author ZTiger
*
*/


<template>
  <div class="contactemail-link-wrap">
    <public-header :shadow="true" />
    <div class="contactemail-link-content">
      <div class="link-box">
        <div class="link-box-title">验证电子邮箱</div>
        <Divider size="small" />
        <div v-if="verify===0" class="link-box-content">电子邮箱认证中，请稍等</div>
        <div v-else-if="verify===1" class="link-box-content" style="color:#19be6b;">邮箱认证成功</div>
        <div v-else class="link-box-content" style="color:#ed4014;">此电子邮箱认证链接无效，请重新发送验证邀请</div>
      </div>
    </div>
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  components: { publicHeader },
  async validate({ params, app }) {
    try {
      const { data } = await app.$request.verifyRequestId(params.requestId, {
        type: "email",
      });
      return data;
    } catch (err) {}
  },
  data() {
    return {
      verify: 0,
    };
  },
  async mounted() {
    try {
      const { requestId } = this.$route.params;
      await this.$request.verifyEmailLink(requestId);
      const { data } = await this.$request.GetToken();
      if (data.user) this.$store.commit("user/setUser", data.user);
      this.verify = 1;
      const content = "邮箱认证成功,页面将在 6 秒后,跳转至首页";
      this.$Message.success({ duration: 5, content, background: true });
      setTimeout(() => {
        this.$router.push("/");
      }, 6000);
    } catch (code) {
      this.verify = 2;
    }
  },
};
</script>


<style scoped>
.link-box {
  max-width: 500px;
  margin: 30px auto 0;
  padding: 19px 29px 29px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.contactemail-link-content {
  padding: 0 18px;
}
.link-box-title {
  font-size: 24px;
  font-weight: bold;
  color: #000000cc;
}
.link-box-content {
  color: #37474f;
}
</style>
