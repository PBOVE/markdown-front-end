/**
*
*  @author ZTiger
*
*/


<template>
  <div class="user-security-index-wrap">
    <div class="user-border">
      <div class="user-title-wrap user-title-password-wrap">
        <div class="user-title">账户安全</div>
        <img src="@/assets/images/key.png" width="100" />
      </div>
      <div class="user-row">
        <nuxt-link to="/password" class="user-row-main user-middle">
          <div class="user-middle-left">
            <div class="user-row-title">密码</div>
            <div class="user-row-content">••••••••</div>
          </div>
          <div class="user-middle-right">
            <Icon type="ios-arrow-forward" size="20" />
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="user-border">
      <div class="user-title-wrap">
        <div class="user-title">账户删除</div>
        <div class="user-title-content">您可以随时删除自己的 “Freedom” 帐号。如果事后改变主意了，您可能无法恢复帐号。</div>
        <div class="user-title-content">您将失去该帐号中的所有数据和内容</div>
        <div class="user-title-content">您将无法使用需要通过该帐号登录的 “Freedom” 服务</div>
      </div>
      <div class="delete-account">
        <nuxt-link to="/delete">删除你的账户</nuxt-link>
      </div>
    </div>
  </div>
</template>


<script>
// 点击上传照片
import headPortrait from "@/components/headPortrait/index.vue";
import { mapGetters } from "vuex";

export default {
  transition: "fade",
  components: { headPortrait },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["storeUser", "storeImages"]),
  },
};
</script>

<style scoped>
.user-title-password-wrap {
  display: flex;
  min-height: 140px;
}
.user-title {
  flex: 1;
}
.user-row {
  border-top: 1px solid #dadce0;
}
.user-row:hover {
  border-top: 1px solid #dadce0;
}
.delete-account {
  padding: 0 20px 20px;
}
</style>