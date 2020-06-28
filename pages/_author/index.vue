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
            <project-page
              v-else-if="tab==='projects'"
              :projects="projects"
              :user="user"
              @on-change="dataChange"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";
import validRemind from "@/components/validRemind/index.vue";
import pageLeft from "@/components/_author/pageLeft.vue";
import pageRight from "@/components/_author/pageRight.vue";
import indexPage from "@/components/_author/index.vue";
import projectPage from "@/components/_author/project.vue";

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
    const query = { name: params.author };
    const { data } = await app.$request.registerQuery(query);
    return data;
  },
  async asyncData({ params, app, redirect, query }) {
    const { author } = params;
    const title = query.q;
    const page = query.page;
    const result = await Promise.all([
      app.$request.queryUser({ username: author }),
      app.$request.getProject({ author, title, page }),
    ]);
    return { user: result[0].data, projects: result[1].data };
  },
  data() {
    return {
      alertShow: false,
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
        const page = newVal.page - 1;
        const params = { page, title, author: this.user.userName };
        const { data } = await this.$request.getProject(params);
        this.projects = data;
      }
    },
  },
  methods: {
    dataChange(row, index) {
      this.$set(this.projects.content, index, row);
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
