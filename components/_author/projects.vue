/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-page-wrap">
    <div class="index-page-header">
      <div class="index-page-header-left">
        <Input v-model="search" placeholder="查找项目" @on-enter="handleSearch" />
      </div>
      <div class="index-page-header-right">
        <button class="index-page-button" style="min-width:80px;" @click="handleSearch">搜索</button>
        <nuxt-link
          v-if="author===storeUser.userName&&storeUser.authentication"
          class="main-success-button index-page-margin-left-16"
          to="/new"
        >
          <Icon type="ios-copy-outline" />创 建
        </nuxt-link>
      </div>
    </div>
    <div class="index-page-content">
      <div
        class="index-page-row index-page-flex-between"
        v-for="(item,index) in projects.content"
        :key="item.path"
      >
        <div class="index-page-row-left">
          <div class="index-page-flex-middle index-page-row-start">
            <nuxt-link class="index-page-row-link" :to="'/'+author+'/'+item.path">{{item.title}}</nuxt-link>
            <div v-if="!item.share" class="index-page-row-share">{{item.share|shareFilter}}</div>
          </div>
          <div class="index-page-row-description">{{item.description}}</div>
          <div
            class="index-page-row-time"
            :title="$timeConversion(item.updateTime)"
          >{{item.updateTime|TimeFilter}}</div>
        </div>
        <div class="index-page-row-right">
          <div
            class="index-page-flex-middle index-page-row-star"
            :class="{like:item.islike}"
            @click="handleLike( JSON.stringify(item),index)"
          >
            <img src="@/assets/images/star.png" class="index-page-row-star-image" />
            <span>{{item.islike?'取消':'赞'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="index-page-footer index-page-flex-middle" v-if="projects.totalElements">
      <Page
        size="small"
        :total="projects.totalElements"
        :page-size="10"
        :current="current"
        @on-change="pageChange"
      />
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import selectBox from "@/components/selectBox/index.vue";

export default {
  components: { selectBox },
  props: ["projects"],
  filters: {
    shareFilter(share) {
      return share ? "" : "私有项目";
    },
  },
  data() {
    return {
      // 搜索内容
      search: this.$route.query.q,
      // 用户页面
      author: this.$route.params.author,
      // 当前页面
      current: this.$route.query.page
        ? parseInt(this.$route.query.page, 10)
        : 1,
    };
  },
  computed: {
    ...mapGetters("user", ["storeUser", "storeUserState"]),
  },
  methods: {
    // 处理搜索
    handleSearch() {
      this.$router.push({
        path: `/${this.author}`,
        query: {
          tab: "projects",
          q: this.search.replace(/(^\s*)|(\s*$)/g, ""),
          page: 1,
        },
      });
    },
    // 页码改变的回调，返回改变后的页码
    pageChange(page) {
      this.$router.push({
        path: `/${this.author}`,
        query: {
          tab: "projects",
          q: this.$route.query.q,
          page,
        },
      });
    },
    // 点赞
    async handleLike(parseRow, index) {
      if (!this.storeUserState) {
        return this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
      const row = JSON.parse(parseRow);
      const params = { author: this.author, path: row.path };
      if (row.islike) await this.$request.projectUnLike(params);
      else await this.$request.projectLike(params);
      row.islike = !row.islike;
      this.$set(this.projects.content, index, row);
    },
  },
};
</script>



