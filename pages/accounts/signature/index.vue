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
        <div>个性签名</div>
      </div>
    </div>
    <div class="signature-content">
      <div class="signature-content-title">对您的个性签名所做的更改将反映在您的 Freedom 帐号中。</div>
      <div class="signature-box">
        <div class="signature-content-title" style="padding:18px 0;">个性签名</div>
        <div class="signature-title">
          <span class="signature-account">{{storeSignature}}</span>
          <Icon type="md-create" class="signature-title-icon curpoin" @click="openModal" />
        </div>
      </div>
    </div>
    <Modal v-model="modalShow" class-name="modal-vertical-center" width="350" :footer-hide="true">
      <div class="modal-edit-header">
        <div>更改签名</div>
        <Icon type="md-close" size="18" @click="modalShow=false" class="modal-close" />
      </div>
      <div class="modal-title">个性签名</div>
      <div class="modal-input-wrap">
        <input
          ref="modalInput"
          type="text"
          class="modal-input"
          maxlength="30"
          v-model="signature"
          @keydown.enter="update"
        />
        <div class="modal-input-prefix">{{words}}</div>
      </div>

      <div class="modal-footer">
        <Button type="text" @click="modalShow=false">取消</Button>
        <Button type="primary" :loading="loading" @click="update">确定</Button>
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
  data() {
    return {
      // 对话框
      modalShow: false,
      // 设置按钮为加载中状态
      loading: false,
      // 昵称
      signature: "",
      // 字数
      words: "0/30",
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
  watch: {
    signature(value) {
      this.words = `${value.length}/60`;
    },
  },
  methods: {
    // 打开对话框
    openModal() {
      this.modalShow = true;
      this.signature = this.storeSignature;
      this.$nextTick(() => {
        this.$refs.modalInput.focus();
      });
    },
    // 发送修改
    async update() {
      if (this.loading) return;
      if (this.signature === this.storeSignature) {
        this.modalShow = false;
        return;
      }
      try {
        this.loading = true;
        const { data } = await this.$request.updataUserMsg({
          signature: this.signature.substr(0, 30),
        });
        this.$store.commit("user/setUser", data);
        this.modalShow = false;
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
.modal-input-wrap {
  position: relative;
}
.modal-input {
  padding: 0 40px 0 0;
}
.modal-input-prefix {
  position: absolute;
  right: 0;
  top: 4px;
}
</style>

