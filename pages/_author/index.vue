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
        <page-left class="index-content-left" />
        <div class="index-content-right">
          <page-right />
          <transition name="fade" mode="out-in">
            <index-page v-if="!tab" />
            <project-page
              v-else-if="tab==='projects'"
              :projects="projects"
              @on-change="projectData"
            />
            <likes-page v-else-if="tab==='likes'" :likes="likes" />
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
import projectPage from "@/components/_author/projects.vue";
import likesPage from "@/components/_author/likes.vue";

export default {
  transition: "fade",
  components: {
    publicHeader,
    validRemind,
    pageLeft,
    pageRight,
    indexPage,
    projectPage,
    likesPage,
  },
  async validate({ params, app }) {
    const query = { name: params.author };
    const { data } = await app.$request.registerQuery(query);
    return data;
  },
  async asyncData({ params, app, query }) {
    const { author } = params;
    const { tab, page, q } = query;
    let projects, likes;
    if (tab === "projects") {
      const request = { author, page: page ? page - 1 : 0, title: q };
      const { data } = await app.$request.getProject(request);
      projects = data;
    } else if (tab === "likes") {
      const request = { author, page: page ? page - 1 : 0 };
      const { data } = await app.$request.queryUserLike(request);
      likes = data;
    }
    return { projects, likes };
  },
  async watchQuery() {},
  async fetch({ store, app, params }) {
    const { author: username } = params;
    const { data } = await app.$request.queryUser({ username });
    store.commit("author/setAuthor", data);
  },
  data() {
    return {
      alertShow: false,
    };
  },
  head() {
    return {
      title: `${this.$route.params.author} ● TBS.feel`,
    };
  },
  computed: {
    tab() {
      const paramsPath = ["projects", "likes"];
      const { tab } = this.$route.query;
      return paramsPath.includes(tab) ? tab : "";
    },
  },
  methods: {
    // 数据改变
    projectData(row, index) {
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
  .index-content-left {
    width: 100%;
  }
}
</style>
