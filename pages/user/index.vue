/**
*
*  @author ZTiger
*
*/

<template>
  <div class="user-index-wrap">
    <div class="ui-header">
      <div class="ui-portrait-wrap layout-center">
        <head-portrait-show
          :images="storeImages"
          :name="storeNickName"
          :width="96"
          :height="96"
        />
      </div>
      <div class="ui-title">欢迎使用，{{ storeNickName }}</div>
      <div class="ui-tip">管理自己的信息和安全，从而让 TBS.feel 更好地为您服务</div>
    </div>
    <div class="ui-main">
      <div class="ui-box">
        <div class="ui-box-header">
          <div class="ui-box-header-left">
            <h2>个人信息</h2>
            <div class="ui-box-header-title">您在 TBS.feel 中使用的基本信息，例如您的昵称和照片</div>
          </div>
          <div class="ui-box-header-right">
            <img src="@/assets/images/personal.png" />
          </div>
        </div>
        <nuxt-link to="/user/personal" class="ui-box-header-footer">管理您的个人信息</nuxt-link>
      </div>
      <div class="ui-box">
        <div class="ui-box-header">
          <div class="ui-box-header-left">
            <h2>账户安全</h2>
            <div class="ui-box-header-title">有助于确保您帐号安全的设置</div>
          </div>
          <div class="ui-box-header-right">
            <img src="@/assets/images/security.png" />
          </div>
        </div>
        <nuxt-link to="/user/security" class="ui-box-header-footer">确保您账户安全</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import headPortraitShow from '@/components/headPortrait/show.vue';

export default {
  transition: 'fade',
  components: { headPortraitShow },
  data() {
    return {};
  },
  head() {
    return {
      title: '账户 ● TBS.feel',
    };
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('user', ['storeNickName', 'storeImages']),
  },
};
</script>

<style scoped>
.user-index-wrap {
  width: 840px;
  margin: 0 0 0 8%;
}
.ui-header {
  flex-direction: column;
}
.ui-box-header-left {
  flex: 1;
}

.ui-title {
  margin: 0.8rem 0 0.8rem;
  color: #202124;
  font-size: 1.55rem;
  text-align: center;
}
.ui-tip {
  font-size: 1rem;
  text-align: center;
  color: #5f6368;
}
.ui-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.ui-box {
  margin: 10px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  width: calc(50% - 20px);
}
.ui-box-header {
  display: flex;
  padding: 24px 24px 16px;
}
.ui-box-header-title {
  margin: 10px 0 0 0;
  color: #5f6368;
  letter-spacing: 0.01rem;
}
.ui-box-header-footer {
  display: block;
  border-top: 1px solid #dadce0;
  padding: 17px 24px 18px;
  color: #1a73e8;
  letter-spacing: 0.05rem;
  cursor: pointer;
  transition: background 0.1s;
}
.ui-box-header-footer:hover {
  background: rgba(0, 0, 0, 0.039);
}
.layout-center {
  display: flex;
  justify-content: center;
}

@media screen and (max-width: 1240px) {
  .user-index-wrap {
    width: 100%;
    margin: 0;
  }
}
@media screen and (max-width: 1070px) {
  .ui-box {
    width: 100%;
  }
}
@media screen and (max-width: 370px) {
  .ui-box-header-right {
    display: none;
  }
}
</style>
