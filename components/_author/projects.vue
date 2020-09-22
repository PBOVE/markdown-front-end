/**
*
*  @author ZTiger
*
*/

<template>
  <div class="index-page-wrap">
    <div class="index-page-header">
      <div class="index-page-header-left">
        <Input v-model="search" placeholder="搜索当前用户文档" @on-enter="handleSearch" />
      </div>
      <div class="index-page-header-right">
        <Button type="primary" style="min-width:80px;" icon="ios-search" @click="handleSearch">搜索</Button>
        <Button
          v-if="author===storeUser.userName&&storeUser.authentication"
          style="margin-left:20px"
          type="success"
          icon="md-add"
          to="/new"
        >添加</Button>
      </div>
    </div>
    <div class="index-page-content">
      <div v-for="(item,index) in articles.content" :key="item.path" class="index-page-row">
        <div class="index-page-flex-between">
          <div class="index-page-row-left">
            <div class="index-page-flex-middle index-page-row-start">
              <nuxt-link class="index-page-row-link" :to="'/'+author+'/'+item.path">{{ item.title }}</nuxt-link>
              <div v-if="!item.share" class="index-page-row-share">
                <span class="index-page-row-share-title">{{ item.share|shareFilter }}</span>
                <Icon class="index-page-row-share-icon" type="md-lock" />
              </div>
            </div>
            <div class="index-page-row-description">{{ item.description }}</div>
          </div>

          <div class="index-page-row-right">
            <div
              class="index-page-flex-middle index-page-row-star"
              @click="handleLike( JSON.stringify(item),index)"
            >
              <img v-if="item.islike" src="@/assets/svg/star.svg" class="index-page-row-star-image" />
              <img v-else src="@/assets/svg/unstar.svg" class="index-page-row-star-image" />
              <span>{{ item.islike?'取消':'赞' }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="index-page-row-left-floor">
            <div>
              <span
                class="index-page-row-time"
                :title="$timeConversion(item.time)"
              >{{ item.time|TimeFilter }}前更新</span>
              <!-- <span>{{ item.likeCount }}</span> -->
            </div>
            <!-- <div v-if="storeUserName === author" class="index-page-row-topping">置顶</div> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="articles.totalElements" class="index-page-footer index-page-flex-middle">
      <Page
        size="small"
        :total="articles.totalElements"
        :page-size="10"
        :current="current"
        @on-change="pageChange"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { articleLike, articleUnLike } from '@/api/article';

export default {
  filters: {
    shareFilter(share) {
      return share ? '' : '仅文档成员可见';
    },
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['articles'],
  data() {
    return {
      // 搜索内容
      search: this.$route.query.q || '',
      // 用户页面
      author: this.$route.params.author,
      // 当前页面
      current: this.$route.query.page
        ? parseInt(this.$route.query.page, 10)
        : 1,
    };
  },
  computed: {
    ...mapGetters('user', ['storeUser', 'storeUserState', 'storeUserName']),
  },
  methods: {
    // 处理搜索
    handleSearch() {
      const q = this.search.replace(/(^\s*)|(\s*$)/g, '');
      this.$router.push({
        path: `/${this.author}`,
        query: {
          tab: 'articles',
          q,
          page: 1,
        },
      });
    },
    // 页码改变的回调，返回改变后的页码
    pageChange(page) {
      this.$router.push({
        path: `/${this.author}`,
        query: {
          tab: 'articles',
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
      if (row.islike) await articleUnLike(params);
      else await articleLike(params);
      row.islike = !row.islike;
      this.$set(this.articles.content, index, row);
    },
  },
};
</script>

<style scoped>
.index-page-row-left-floor {
  display: flex;
  justify-content: space-between;
}
.index-page-row-left-floor {
  padding: 0 10px 0 0;
  color: #586069;
}
.index-page-row-topping {
  opacity: 0;
  transition: all 0.1s;
}
.index-page-row:hover .index-page-row-topping {
  cursor: pointer;
  opacity: 1;
}
@media screen and (min-width: 550px) {
  .index-page-row-share-icon {
    display: none;
  }
}
@media screen and (max-width: 550px) {
  .index-page-row-share-title {
    display: none;
  }
}
</style>
