/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-wrap">
    <public-header :shadow="true" />
    <valid-remind />
    <div class="index-main scroll">
      <div class="index-content">
        <page-left class="index-content-left" :user="user" />
        <div class="index-content-right">
          <page-right :user="user" />
          <transition name="fade" mode="out-in">
            <index-page v-if="!tab" />
            <project-page v-else-if="tab==='projects'" :projects.sync="projects" :user="user" />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";
import validRemind from "@/components/validRemind/index.vue";
import pageLeft from "@/components/userPageLeft/index.vue";
import pageRight from "@/components/userPageRight/index.vue";
import indexPage from "@/components/_username/index.vue";
import projectPage from "@/components/_username/project.vue";

export default {
  transition: "fade",
  components: {
    publicHeader,
    validRemind,
    pageLeft,
    pageRight,
    indexPage,
    projectPage,
  },
  async validate({ params, app }) {
    const query = { name: params.username };
    const { data } = await app.$request.registerQuery(query);
    return data;
  },
  async asyncData({ params, app, redirect, query }) {
    const { username } = params;
    const title = query.q;
    const page = query.page;
    const result = await Promise.all([
      app.$request.queryUser({ username }),
      app.$request.getProject({ author: username, title, page }),
    ]);
    return { user: result[0].data, projects: result[1].data };
  },
  data() {
    return {
      alertShow: false,
      userPage: this.$route.params.username,
    };
  },
  computed: {
    tab() {
      const paramsPath = ["projects"];
      const { tab } = this.$route.query;
      return paramsPath.includes(tab) ? tab : "";
    },
  },
  watch: {
    async $route(to, from) {
      const { query: oldVal } = from;
      const { query: newVal } = to;
      if (oldVal.q !== newVal.q || oldVal.page !== newVal.page) {
        const title = newVal.q;
        const page = newVal.page;
        const params = { page, title, author: this.user.userName };
        const { data } = await this.$request.getProject(params);
        this.projects = data;
      }
    },
  },
};
</script>


<style scoped>
.index-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.index-main {
  height: 0;
  flex: auto;
  overflow: auto;
}
.index-content {
  display: flex;
  margin: 0 auto;
  padding: 18px 30px 0;
  max-width: 1200px;
}
.index-content-left {
  flex-shrink: 0;
  width: 280px;
  margin: 0 16px;
}
.index-content-right {
  width: 100%;
  margin: 0 0 0 20px;
}
@media screen and (max-width: 850px) {
  .index-content {
    flex-direction: column;
    align-items: center;
    padding: 5px 18px 0;
  }
  .index-content-left,
  .index-content-right {
    margin: 0;
  }
}
@media screen and (max-width: 550px) {
  .index-content-right {
    width: 280px;
  }
}
</style>
