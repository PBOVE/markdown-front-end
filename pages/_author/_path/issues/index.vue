/**
*
*  @author ZTiger
*
*/


<template>
  <div class="issues-index-wrap">
    <div class="issues-header index-page-flex-between">
      <div class="issues-header-left">
        <Input v-model="value" placeholder="搜索留言" class="issues-header-input" />
        <Button>搜索</Button>
      </div>
      <nuxt-link class="main-success-button index-page-margin-left-16" :to="$route.path + '/new'">
        <Icon type="md-add" />留 言
      </nuxt-link>
    </div>
    <div class="issues-main">
      <div v-if="!issues.length" class="issues-blankslate">
        <img src="@/assets/svg/issues.svg" class="issues-main-image" />
        <div class="issues-blankslate-title">问题</div>
        <div>您有什么不理解的吗?</div>
      </div>
      <nuxt-link
        v-for="item in issues"
        class="row-wrap index-page-flex-between"
        :to="link + item._id"
        :key="item._id"
      >
        <div class="row-left">
          <div class="row-left-left">
            <Icon type="ios-bookmark" color="#2b85e4" size="18" />
          </div>
          <div>
            <div style="font-size:18px; margin:0 0 3px;">{{item.title}}</div>
            <div style="font-size:12px; color:#586069;">
              <span>{{item.createUser}}</span>
              <span>{{item.createTime|timeConversion}}</span>
            </div>
          </div>
        </div>
        <div class="row-right index-page-flex-middle">
          <img src="@/assets/svg/chat.svg" class="row-image" />
          <span>{{item.answer}}</span>
        </div>
      </nuxt-link>
      <div class="main-center-middle issues-main-footer">
        <Page :total="40" size="small" />
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  async asyncData({ app, params }) {
    const { author, path } = params;
    const { data: issues } = await app.$request.queryIssues({ author, path });
    return { issues };
  },
  filters: {
    timeConversion(time) {
      const date = new Date(time);
      const completion = (num) => {
        return num.toString().padStart(2, "0");
      };
      return `${date.getFullYear()}年${completion(
        date.getMonth() + 1,
      )}月${completion(date.getDate())}日`;
    },
  },
  data() {
    return {
      value: "",
      // 作者
      author: this.$route.params.author,
      // 路径
      path: this.$route.params.path,
    };
  },
  head() {
    return {
      title: `留言 · ${this.author} · ${this.storeProject.path} ● TBS.feel`,
    };
  },
  computed: {
    ...mapGetters("author", ["storeProject"]),
    link() {
      return `/${this.author}/${this.path}/issues/`;
    },
  },
};
</script>


<style scoped>
.issues-index-wrap {
  padding: 0 32px;
}
.issues-header-input {
  margin: 0 20px 0 0;
  width: 500px;
}
.issues-main {
  margin: 20px 0 0 0;
  padding: 20px 0;
  border: 1px solid #dcdee2;
  border-radius: 8px;
}
.issues-blankslate {
  padding: 70px;
  text-align: center;
}
.issues-main-image {
  height: 100px;
  width: 100px;
}
.issues-blankslate-title {
  font-size: 20px;
  font-weight: bold;
}
.row-wrap:first-of-type {
  border-top: 1px solid #dcdee2;
}
.row-wrap {
  align-items: flex-start;
  padding: 10px 20px;
  border-bottom: 1px solid #dcdee2;
  color: #17233d;
}
.row-wrap:hover {
  background: #f8f8f9;
}
.row-left {
  display: flex;
}
.row-left-left {
  margin: 0 10px 0 0;
  padding: 4px 0 0 0;
}
.row-image {
  width: 16px;
  height: 16px;
  margin: 0 6px 0 0;
}
.issues-main-footer {
  margin: 20px 0 0;
}
@media screen and (max-width: 750px) {
  .issues-header-left {
    flex: 1;
  }
  .issues-header-input {
    width: calc(100% - 90px);
  }
}
@media screen and (max-width: 400px) {
  .issues-header {
    flex-direction: column;
  }
  .main-success-button {
    margin: 10px 0 0;
    width: 80px;
  }
  .issues-main {
    border: 0;
  }
}
</style>