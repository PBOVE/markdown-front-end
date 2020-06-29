/**
*
*  @author ZTiger
*
*/


<template>
  <div class="index-page-wrap">
    <div class="index-page-header">{{storeAuthorUser.nickName}}</div>
    <div class="index-page-content">
      <div
        class="index-page-row index-page-flex-between"
        v-for="(item,index) in likes.content"
        :key="item.path"
      >
        <div class="index-page-row-left">
          <div class="index-page-flex-middle index-page-row-start">
            <nuxt-link :to="'/'+item.author+'/'+item.path" class="index-page-row-link">
              <span style="font-weight:400;">{{item.author}}</span>
              <span>/</span>
              <span>{{item.title}}</span>
            </nuxt-link>
            <div v-if="!item.share" class="index-page-row-share">{{item.share|shareFilter}}</div>
          </div>
          <div class="index-page-row-description">{{item.description}}</div>
          <div
            class="index-page-row-time"
            :title="timeConversion(item.updateTime)"
          >{{item.updateTime|TimeFilter}}</div>
        </div>
        <div class="index-page-row-right">
          <div
            class="index-page-flex-middle index-page-row-star"
            @click="handleLike( JSON.stringify(item),index)"
          >
            <img
              v-if="item.islike"
              src="@/assets/images/star.png"
              class="index-page-row-star-image"
            />
            <img v-else src="@/assets/images/unstar.png" class="index-page-row-star-image" />
          </div>
        </div>
      </div>
    </div>
    <div class="index-page-footer index-page-flex-middle" v-if="likes.totalElements">
      <Page
        size="small"
        :total="likes.totalElements"
        :page-size="10"
        :current="current"
        @on-change="pageChange"
      />
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  props: ["likes"],
  filters: {
    shareFilter(share) {
      return share ? "" : "私有项目";
    },
  },
  data() {
    return {
      // 搜索
      search: "",
      // 用户页面
      author: this.$route.params.author,
      // 当前页面
      current: this.$route.query.page
        ? parseInt(this.$route.query.page, 10)
        : 1,
    };
  },
  computed: {
    ...mapGetters("user", ["storeUserState"]),
    ...mapGetters("author", ["storeAuthorUser"]),
  },
  watch: {
    async $route(to) {
      const { query: toQuery } = to;
      const page = toQuery.page ? toQuery.page - 1 : 0;
      const params = { page, author: this.author };
      const { data } = await this.$request.queryUserLike(params);
      this.like = data;
    },
  },
  methods: {
    // 时间转换
    timeConversion(time) {
      const date = new Date(time);
      const completion = num => {
        return num.toString().padStart(2, "0");
      };
      return `${date.getFullYear()}年${completion(
        date.getMonth() + 1,
      )}月${completion(date.getDate())}日 ${completion(
        date.getHours(),
      )}:${completion(date.getMinutes())}`;
    },
    // 页面改变
    pageChange(page) {
      this.$router.push({
        path: `/${this.author}`,
        query: { tab: "likes", page },
      });
    },
    // 点赞
    async handleLike(parseRow, index) {
      if (!this.storeUserState) {
        return this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      }
      const row = JSON.parse(parseRow);
      const params = { author: row.author, path: row.path };
      if (row.islike) await this.$request.projectUnLike(params);
      else await this.$request.projectLike(params);
      row.islike = !row.islike;
      this.$set(this.likes.content, index, row);
    },
  },
};
</script>

