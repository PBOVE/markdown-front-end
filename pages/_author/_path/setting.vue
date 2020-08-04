/**
*
*  @author ZTiger
*
*/

<template>
  <div class="setting-wrap">
    <div class="setting-content">
      <div class="setting-left">
        <div class="setting-left-main">
          <nuxt-link
            class="setting-left-nav"
            :to="projectPath"
            :class="{select:$route.path===projectPath}"
          >基本设置</nuxt-link>
          <nuxt-link
            class="setting-left-nav"
            :to="projectPath + '/access'"
            :class="{select:$route.path===projectPath + '/access'}"
          >访问设置</nuxt-link>
          <nuxt-link
            class="setting-left-nav"
            :to="projectPath + '/danger'"
            :class="{select:$route.path===projectPath + '/danger'}"
          >危险操作</nuxt-link>
        </div>
      </div>
      <div class="setting-right">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  transition: 'fade',
  validate({ store, params }) {
    const userState = store.state.user.userState;
    const userName = store.state.user.data.userName;
    return userState && params.author === userName;
  },
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
    };
  },
  head() {
    return {
      title: `设置 · ${this.author} · ${this.storeProject.title} ● TBS.feel`,
    };
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    projectPath() {
      return `/${this.author}/${this.path}/setting`;
    },
    ...mapGetters('author', ['storeProject']),
  },
};
</script>

<style scoped>
.setting-content {
  display: flex;
  max-width: 1200px;
  margin: 35px auto;
}
.setting-left {
  width: 25%;
}
.setting-left-main {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
}
.setting-left-nav {
  display: block;
  padding: 8px 16px;
  color: #000;
  border-left: 2px solid transparent;
  border-bottom: 1px solid #e1e4e8;
  transition: background 0.2s;
}
.setting-left-nav:hover {
  background: #f8f8f9;
}
.setting-left-nav:last-of-type {
  border-bottom: 0;
}
.select {
  border-left: 2px solid #ff9900;
}
.setting-right {
  flex: 1;
  margin: 0 0 0 32px;
}
@media screen and (max-width: 1240px) {
  .setting-content {
    margin: 35px 20px;
  }
}
@media screen and (max-width: 500px) {
  .setting-left {
    display: none;
  }
  .setting-right {
    margin: 20px 0 0;
  }
}
</style>
