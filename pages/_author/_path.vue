/**
*
*  @author ZTiger
*
*/


<template>
  <div class="path-wrap">
    <public-header />
    <div class="path-header">
      <div class="middle">
        <Icon v-if="storeProject.share" type="ios-podium-outline" class="path-header-icon" />
        <Icon v-else type="ios-lock-outline" class="path-header-icon" />
        <Poptip trigger="hover" placement="bottom-start" :width="width" :transfer="true">
          <nuxt-link
            :to="'/' + storeProject.author"
            class="path-header-title"
          >{{storeProject.author}}</nuxt-link>
          <div class="middle" slot="title">
            <img
              v-if="user.images"
              :src="'/api/storage/preview/' + user.images"
              class="path-poptip-image"
            />
            <div v-else class="path-poptip-portrait middle">{{user.nickName|nickName}}</div>
            <div style="margin:5px 0px 0 15px;">
              <div
                style="font-size:16px;font-weight:bold; letter-spacing: 0.05em;"
              >{{user.nickName}}</div>
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
      <div class="middle">
        <div class="path-button middle">
          <div class="path-button-left middle">
            <Icon type="ios-copy-outline" class="path-button-icon" />
            <span>复制</span>
          </div>
          <div class="path-button-right">0</div>
        </div>
        <div class="path-button middle">
          <div class="path-button-left middle">
            <Icon type="ios-thumbs-up-outline" class="path-button-icon" />
            <span>点赞</span>
          </div>
          <div class="path-button-right">{{storeProject.likes}}</div>
        </div>
      </div>
    </div>
    <div class="middle path-main">
      <nuxt-link class="middle" :class="{border:$route.path === projectPath}" :to="projectPath">文章</nuxt-link>
      <nuxt-link
        v-if="storeEdit || author === storeUserName"
        class="middle"
        :class="{border:$route.path === projectPath+'/edit'}"
        :to="projectPath+'/edit'"
      >编辑</nuxt-link>
      <nuxt-link
        class="middle"
        :class="{border:$route.path === projectPath+'/issues'}"
        :to="projectPath+'/issues'"
      >留言</nuxt-link>
      <nuxt-link
        class="middle"
        :class="{border:$route.path === projectPath+'/log'}"
        :to="projectPath+'/log'"
      >日志</nuxt-link>
      <nuxt-link
        v-if="author === storeUserName"
        class="middle"
        :class="{border:$route.path === projectPath+'/setting'}"
        :to="projectPath+'/setting'"
      >设置</nuxt-link>
    </div>
    <div class="path-content scroll">
      <nuxt-child />
    </div>
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
      // 作者
      author: this.$route.params.author,
    };
  },
  computed: {
    ...mapGetters("author", ["storeProject", "storeEdit"]),
    ...mapGetters("user", ["storeUserName"]),
    // 路径
    projectPath() {
      return `/${this.storeProject.author}/${this.storeProject.path}`;
    },
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
      } else this.width = 300;
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
  display: flex;
  justify-content: space-between;
  margin: 10px 0 0 0;
  padding: 0 4%;
  font-size: 20px;
}
.path-header-icon {
  margin: 0 5px;
  font-weight: bold;
  font-size: 20px;
  color: #515a6e;
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
.path-button-icon {
  margin: 0 4px 0 0;
  font-weight: bold;
}
.path-button {
  font-size: 14px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  overflow: hidden;
}
.path-button:first-of-type {
  margin: 0 20px 0 0;
}
.path-button-left {
  padding: 2px 10px;
  cursor: pointer;
}
.path-button-left:hover {
  background: #00000011;
}
.path-button-right {
  padding: 2px 10px;
  border-left: 1px solid #e1e4e8;
}
.path-main {
  margin: 10px 0 0 0;
  padding: 0 2% 0 5%;
  border-bottom: 1px solid #e1e4e8;
}
.path-main > a {
  display: inline-block;
  padding: 0 20px 7px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: #000;
}
.path-main > a:hover {
  border-bottom: 2px solid #c5c8ce;
}
.border {
  border-bottom: 2px solid #19be6b !important;
}
.path-content {
  flex: auto;
  height: 0;
  overflow: auto;
}
@media screen and (max-width: 500px) {
  .path-header {
    flex-direction: column;
  }
  .path-header > div:first-of-type {
    margin: 0 0 20px 0;
  }
  .path-main {
    padding: 0 2%;
  }
  .path-main > a {
    flex: 1;
    padding: 0 0 7px;
    text-align: center;
  }
}
</style>
