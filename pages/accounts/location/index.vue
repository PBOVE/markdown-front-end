/**
*
*  @author ZTiger
*
*/


<template>
  <div class="nick-name-wrap">
    <public-header :search-hide="true" />
    <div class="nick-name-header">
      <div class="eh-content">
        <nuxt-link to="/user/personal">
          <Icon type="md-arrow-round-back" class="eh-content-icon curpoin" />
        </nuxt-link>
        <div>地区</div>
      </div>
    </div>
    <div class="nick-name-content">
      <div class="nick-name-content-title">对您的地区所做的更改将反映在您的 Freedom 帐号中。</div>
      <div class="nick-name-box">
        <div class="nick-name-content-title" style="padding:18px 0;">更改地区</div>
        <div class="nick-name-title">
          <span class="nick-name-account">{{storeLocation}}</span>
          <Icon type="md-create" class="nick-name-title-icon curpoin" @click="openModal" />
        </div>
      </div>
    </div>
    <Modal v-model="modalShow" class-name="modal-vertical-center" width="350" :footer-hide="true">
      <div class="modal-edit-header">
        <div>更改地区</div>
        <Icon type="md-close" size="18" @click="modalShow=false" class="modal-close" />
      </div>
      <div class="modal-title">地区</div>
      <input
        ref="modalInput"
        type="text"
        maxlength="60"
        class="modal-input"
        v-model="location"
        @keydown.enter="updateLocation"
      />
      <div class="modal-footer">
        <Button type="text" @click="modalShow=false">取消</Button>
        <Button type="primary" :loading="loading" @click="updateLocation">确定</Button>
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
      // 地区
      location: "",
    };
  },
  head() {
    return {
      title: "地区 ● Freedom",
    };
  },
  computed: {
    ...mapGetters("user", ["storeLocation"]),
  },
  methods: {
    // 打开对话框
    openModal() {
      this.modalShow = true;
      this.location = this.storeLocation;
      this.$nextTick(() => {
        this.$refs.modalInput.focus();
      });
    },
    // 发送修改
    async updateLocation() {
      if (this.loading) return;
      if (this.location === this.storeLocation) {
        this.modalShow = false;
        return;
      }
      try {
        this.loading = true;
        const { data } = await this.$request.updataUserMsg({
          location: this.location,
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
.nick-name-content {
  padding: 0 18px;
}
.nick-name-content,
.eh-content {
  margin: 0 auto;
  max-width: 660px;
}
.nick-name-header {
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
.nick-name-content-title {
  padding: 24px 0;
  color: rgba(0, 0, 0, 0.65);
}
.nick-name-box {
  padding: 24px;
  border: 1px solid #dadce0;
  border-radius: 8px;
}
.nick-name-account {
  margin: 0 10px 0 0;
  font-size: 17px;
  font-weight: 500;
  color: #3c4043;
}
.nick-name-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nick-name-title-icon {
  font-size: 19px;
  color: #515a6e;
}
.curpoin {
  cursor: pointer;
}
</style>

