/**
*
*  @author ZTiger
*
*/


<template>
  <div class="signature-wrap">
    <public-header :search-hide="true" />
    <div class="signature-header">
      <div class="eh-content">
        <nuxt-link to="/user/personal">
          <Icon type="md-arrow-round-back" class="eh-content-icon curpoin" />
        </nuxt-link>
        <div>简介</div>
      </div>
    </div>
    <div class="signature-content">
      <div class="signature-content-title">对您的简介所做的更改将反映在您的 Freedom 帐号中。</div>
      <div class="signature-box">
        <div class="signature-content-title" style="padding:18px 0;">简介</div>
        <div class="signature-title">
          <span class="signature-account">{{storeSignature}}</span>
          <Icon type="md-create" class="signature-title-icon curpoin" @click="openModal" />
        </div>
      </div>
    </div>
    <update-modal
      ref="updateModal"
      title="简介"
      headerTitle="简介"
      :maxlength="60"
      :loading="loading"
      @on-button="update"
    />
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import publicHeader from "@/components/publicHeader/index.vue";
import updateModal from "@/components/updateModal/index.vue";

export default {
  transition: "fade",
  components: { publicHeader, updateModal },
  data() {
    return {
      // 设置按钮为加载中状态
      loading: false,
    };
  },
  head() {
    return {
      title: "名称 ● Freedom",
    };
  },
  computed: {
    ...mapGetters("user", ["storeSignature"]),
  },
  methods: {
    // 打开对话框
    openModal() {
      this.$refs.updateModal.openModal(this.storeSignature);
    },
    // 发送修改
    async update(value, callback) {
      if (this.loading) return;
      if (value === this.storeSignature) return callback();
      try {
        this.loading = true;
        const params = {
          signature: value.substr(0, 60),
        };
        const { data } = await this.$request.updataUserMsg(params);
        this.$store.commit("user/setUser", data);
        callback();
      } catch (err) {}
      this.loading = false;
    },
  },
};
</script>


<style scoped>
.signature-content {
  padding: 0 18px;
}
.signature-content,
.eh-content {
  margin: 0 auto;
  max-width: 660px;
}
.signature-header {
  padding: 0 18px;
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
.signature-content-title {
  padding: 24px 0;
  color: rgba(0, 0, 0, 0.65);
}
.signature-box {
  padding: 24px;
  border: 1px solid #dadce0;
  border-radius: 8px;
}
.signature-account {
  margin: 0 10px 0 0;
  font-size: 17px;
  font-weight: 500;
  color: #3c4043;
}
.signature-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.signature-title-icon {
  font-size: 19px;
  color: #515a6e;
}
.curpoin {
  cursor: pointer;
}
</style>

