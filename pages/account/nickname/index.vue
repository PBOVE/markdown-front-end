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
        <div>昵称</div>
      </div>
    </div>
    <div class="nick-name-content">
      <div class="nick-name-content-title">对您的昵称所做的更改将反映在您的 TBS.feel 帐号中。</div>
      <div class="nick-name-box">
        <div class="nick-name-content-title" style="padding:18px 0;">更改昵称</div>
        <div class="nick-name-title">
          <span class="nick-name-account">{{ storeNickName }}</span>
          <Icon type="md-create" class="nick-name-title-icon curpoin" @click="openModal" />
        </div>
      </div>
    </div>
    <update-modal
      ref="updateModal"
      title="昵称"
      header-title="更改昵称"
      :loading="loading"
      @on-button="update"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { _updateAccount } from '@/api/user';
import publicHeader from '@/components/publicHeader/index.vue';
import updateModal from '@/components/updateModal/index.vue';

export default {
  transition: 'fade',
  components: { publicHeader, updateModal },
  data() {
    return {
      // 设置按钮为加载中状态
      loading: false,
    };
  },
  computed: {
    ...mapGetters('user', ['storeNickName']),
  },

  methods: {
    // 打开对话框
    openModal() {
      this.$refs.updateModal.openModal(this.storeNickName);
    },
    // 发送修改
    async update(value, callback) {
      if (this.loading) return;
      if (value === this.storeNickName) return callback();
      try {
        this.loading = true;
        const { data } = await _updateAccount({ nickName: value, });
        this.$store.commit('user/setUser', data.user);
        callback();
      } catch (err) {}
      this.loading = false;
    },
  },
  head() {
    return {
      title: '昵称 ● TBS.feel',
    };
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
