/**
*
*  @author ZTiger
*
*/


<template>
  <div class="location-wrap">
    <public-header :search-hide="true" />
    <div class="location-header">
      <div class="eh-content">
        <nuxt-link to="/user/personal">
          <Icon type="md-arrow-round-back" class="eh-content-icon curpoin" />
        </nuxt-link>
        <div>地区</div>
      </div>
    </div>
    <div class="location-content">
      <div class="location-content-title">对您的地区所做的更改将反映在您的 Freedom 帐号中。</div>
      <div class="location-box">
        <div class="location-content-title" style="padding:18px 0;">更改地区</div>
        <div class="location-title">
          <span class="location-account">{{storeLocation}}</span>
          <Icon type="md-create" class="location-title-icon curpoin" @click="openModal" />
        </div>
      </div>
    </div>
    <update-modal
      ref="updateModal"
      headerTitle="更改地区"
      title="地区"
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
      title: "地区 ● Freedom",
    };
  },
  computed: {
    ...mapGetters("user", ["storeLocation"]),
  },
  methods: {
    // 打开对话框
    openModal() {
      this.$refs.updateModal.openModal(this.storeLocation);
    },
    // 发送修改
    async update(value, callback) {
      if (this.loading) return;
      if (value === this.storeLocation) return callback();
      try {
        this.loading = true;
        const { data } = await this.$request.updataUserMsg({
          location: value,
        });
        this.$store.commit("user/setUser", data);
        callback();
      } catch (err) {}
      this.loading = false;
    },
  },
};
</script>


<style scoped>
.location-content {
  padding: 0 18px;
}
.location-content,
.eh-content {
  margin: 0 auto;
  max-width: 660px;
}
.location-header {
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
.location-content-title {
  padding: 24px 0;
  color: rgba(0, 0, 0, 0.65);
}
.location-box {
  padding: 24px;
  border: 1px solid #dadce0;
  border-radius: 8px;
}
.location-account {
  margin: 0 10px 0 0;
  font-size: 17px;
  font-weight: 500;
  color: #3c4043;
}
.location-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.location-title-icon {
  font-size: 19px;
  color: #515a6e;
}
.curpoin {
  cursor: pointer;
}
</style>

