/**
*
*  @author ZTiger
*
*/


<template>
  <div class="path-wrap">
    <public-header />
    <div class="path-header middle">
      <Icon v-if="storeProject.share" type="md-paper" size="15" style="margin-right:8px;" />
      <Icon v-else type="ios-lock-outline" size="15" style="margin-right:8px;" />
      <Poptip trigger="hover" placement="bottom-start" :width="width" :transfer="true">
        <nuxt-link :to="'/' + storeProject.author" class="path-header-title">{{storeProject.author}}</nuxt-link>
        <div class="middle" slot="title">
          <img
            v-if="user.images"
            :src="'/api/storage/preview/' + user.images"
            class="path-poptip-image"
          />
          <div v-else class="path-poptip-portrait middle">{{user.nickName|nickName}}</div>
          <div style="margin:5px 0px 0 15px;">
            <div style="font-size:16px;font-weight:bold; letter-spacing: 0.05em;">{{user.nickName}}</div>
            <div style="font-size:16px;  letter-spacing: 0.05em;">{{user.userName}}</div>
            <div style="color:#515a6e;">
              <Icon type="ios-pin-outline" />
              {{user.location}}
            </div>
          </div>
        </div>
        <div class="api" slot="content">
          <Icon type="ios-stats-outline" />
          {{user.signature}}
        </div>
      </Poptip>
      <span class="path-header-line">/</span>
      {{storeProject.title}}
      <div v-if="!storeProject.share" class="path-header-share">{{storeProject.share|shareFilter}}</div>
    </div>
    <!-- <div>{{storeProject}}</div> -->
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";
import { mapGetters } from "vuex";

export default {
  components: { publicHeader },
  async validate({ params, app, store }) {
    const { data } = await app.$request.projectContent(params);
    if (data) {
      store.commit("author/setProject", data);
      return true;
    }
    return false;
  },
  async asyncData({ params, app }) {
    const { author: username } = params;
    const { data } = await app.$request.queryUser({ username });
    return { user: data.user };
  },
  filters: {
    nickName(name) {
      return name ? name[0].toUpperCase() : "";
    },
    shareFilter(share) {
      return share ? "" : "私有项目";
    },
  },
  data() {
    return {
      // 宽度
      width: 300,
    };
  },
  computed: {
    ...mapGetters("author", ["storeProject"]),
  },
  mounted() {
    if (window.innerWidth < 300) {
      this.width = window.innerWidth - 20;
    }
    window.addEventListener("resize", this.clientSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.clientSize);
  },
  methods: {
    clientSize() {
      if (window.innerWidth < 300) {
        this.width = window.innerWidth - 20;
      } else this.width - 300;
    },
  },
};
</script>


<style scoped>
.path-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.middle {
  display: flex;
  align-items: center;
}
.path-header {
  margin: 10px 0 0 0;
  padding: 0 4%;
  font-size: 20px;
}
.path-header-line {
  margin: 0 5px;
}
.path-poptip-portrait,
.path-poptip-image {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}
.path-poptip-portrait {
  justify-content: center;
  color: #fff;
  font-size: 30px;
  background: linear-gradient(130deg, #5c2a9d, #0779e4 80%);
}
.path-header-title {
  color: #0366d6;
  cursor: pointer;
  letter-spacing: 0.05em;
}
.path-header-title:hover {
  text-decoration: underline;
  color: #0366d6;
}
.path-header-share {
  margin: 0 10px;
  padding: 0 10px;
  border: 1px solid #e1e4e8;
  border-radius: 10px;
  font-size: 14px;
  color: #586069;
}
</style>
