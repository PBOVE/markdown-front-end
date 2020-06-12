/**
*
*  @author ZTiger
*
*/


<template>
  <div class="user-wrap">
    <public-header />
    <div class="user-content">
      <div class="user-sidebar-wrap">
        <nuxt-link to="/user" class="user-sidebar-row" :class="{'row-select':path==='/user'}">
          <div class="iconfont user-sidebar-row-icon">&#xe63c;</div>
          <div>首页</div>
        </nuxt-link>
        <nuxt-link
          to="/user/personal"
          class="user-sidebar-row"
          :class="{'row-select':path==='/user/personal'}"
        >
          <div class="iconfont user-sidebar-row-icon">&#xe674;</div>
          <div>个人信息</div>
        </nuxt-link>
        <nuxt-link
          to="/user/security"
          class="user-sidebar-row"
          :class="{'row-select':path==='/user/security'}"
        >
          <div class="iconfont user-sidebar-row-icon">&#xe653;</div>
          <div>安全性</div>
        </nuxt-link>
      </div>
      <div class="user-main">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  transition: "fade",
  components: { publicHeader },
  data() {
    return {};
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>


<style scoped>
.user-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.user-content {
  display: flex;
  height: 100%;
}
.user-sidebar-wrap {
  display: flex;
  flex-direction: column;
  padding: 18px 0 0;
  width: 280px;
  flex-shrink: 0;
}
.user-sidebar-row {
  display: flex;
  flex-shrink: 0;
  align-content: center;
  padding: 10px 16px 10px 24px;
  line-height: 24px;
  border-radius: 0 22px 22px 0;
  cursor: pointer;
  color: #3c4043;
  transition: background 0.2s;
}
.user-sidebar-row:hover {
  background: rgba(0, 0, 0, 0.039);
}
.user-sidebar-row-icon {
  margin: 0 10px 0 0;
  width: 30px;
  text-align: center;
  color: #5f6368;
}
.row-select {
  color: #1a73e8;
  background: #e8f0fe !important;
}
.row-select .user-sidebar-row-icon {
  color: #1a73e8;
}
.user-main {
  padding: 18px 48px 0;
  flex: 1;
}
@media screen and (max-width: 900px) {
  .user-content {
    flex-direction: column;
  }
  .user-sidebar-wrap {
    flex-direction: row;
    justify-content: center;
    padding: 0;
    width: 100%;
  }
  .user-sidebar-row {
    border-radius: 0;
    border: 2px solid transparent;
  }
  .user-sidebar-row:hover {
    background-color: transparent;
    color: #1a73e8;
  }
  .user-sidebar-row-icon {
    display: none;
  }
  .row-select {
    background-color: transparent !important;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
    border-bottom: 2px solid #1a73e8;
  }
}
</style>
