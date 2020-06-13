/**
*
*  @author ZTiger
*
*/


<template>
  <div class="email-wrap">
    <public-header />
    <div class="email-header">
      <div class="eh-content">
        <nuxt-link to="/user/personal">
          <Icon type="md-arrow-round-back" class="eh-content-icon" />
        </nuxt-link>
        <div>电子邮箱联系地址</div>
      </div>
    </div>
    <div class="email-content">
      <div class="email-content-title">您可用于登录自己帐号的电子邮件地址。万一您无法访问自己的帐号，我们还可以通过这些电子邮件地址与您联系。</div>
      <div class="email-box">
        <div>
          <span class="email-account">{{storeEmail}}</span>
          <span
            :style="{color:storeUser.authentication?'#19be6b':'#ed4014'}"
          >{{storeUser.authentication|authentication}}</span>
        </div>
        <div class="email-again" @click="modalFlag=true">发送验证邮件</div>
      </div>
    </div>
    <Modal
      v-model="modalFlag"
      width="340"
      class-name="main-center-modal"
      :footer-hide="true"
      :mask-closable="false"
    >
      <div class="email-modal-title">验证邮件</div>
      <div class="email-modal-content">
        <div>验证邮件已发送至</div>
        <div style="color: #000;">{{storeEmail}}</div>
      </div>
      <div class="email-modal-footer">
        <Button @click="modalFlag=false">取 消</Button>
        <Button type="primary">发 送</Button>
      </div>
    </Modal>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  transition: "fade",
  components: { publicHeader },
  filters: {
    authentication(state) {
      return state ? "(已验证)" : "(待验证)";
    },
  },
  data() {
    return {
      // 对话框
      modalFlag: false,
    };
  },
  computed: {
    ...mapGetters("user", ["storeEmail", "storeUser"]),
  },
};
</script>


<style scoped>
.email-content{
  padding: 0 18px;
}
.email-content,
.eh-content {
  margin: 0 auto;
  max-width: 660px;
}
.email-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.eh-content {
  display: flex;
  align-items: center;
  padding: 0 0 5px 0;
  font-size: 23px;
  color: #202124;
}
.eh-content-icon {
  margin: 0 10px 0 0;
  cursor: pointer;
  height: 34px;
  width: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 24px;
  color: #000;
}
.eh-content-icon:active {
  border-radius: 50%;
  background: #dcdee2;
}
.email-content-title {
  padding: 24px 0;
  color: rgba(0, 0, 0, 0.65);
}
.email-box {
  padding: 24px;
  border: 1px solid #dadce0;
  border-radius: 8px;
}
.email-box-title {
  font-size: 17px;
}
.email-account {
  margin: 0 10px 0 0;
  font-size: 17px;
  font-weight: 500;
  color: #3c4043;
}
.email-again {
  display: inline-block;
  margin: 10px 0;
  padding: 5px 0;
  font-size: 15px;
  cursor: pointer;
  color: #2d8cf0;
}
.email-modal-title {
  font-size: 18px;
}
.email-modal-content {
  margin: 15px 0;
  font-size: 14px;
}
.email-modal-footer {
  text-align: right;
}
.email-modal-footer button:first-of-type {
  margin: 0 15px 0 0;
}
</style>

