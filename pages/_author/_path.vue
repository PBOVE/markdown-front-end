/**
*
*  @author ZTiger
*
*/

<template>
  <div class="path-wrap scroll">
    <public-header />
    <Affix>
      <div class="path-header">
        <div class="middle">
          <Icon v-if="storeArticle.share" type="ios-podium-outline" class="path-header-icon" />
          <Icon v-else type="ios-lock-outline" class="path-header-icon" />
          <!-- <user-card
            :images="user.images"
            :nick-name="user.nickName"
            :user-name="user.userName"
            :signature="user.signature"
            :province="user.province"
            :city="user.city"
          > -->
          <nuxt-link
            :to="'/' + storeArticle.author"
            class="path-header-title"
          >{{ storeArticle.author }}</nuxt-link>
          <!-- </user-card> -->
          <span class="path-header-line">/</span>
          <span class="index-text-hidden">{{ storeArticle.title }}</span>
          <span v-if="storeSelectPost.title" class="path-header-line">/</span>
          <span class="index-text-hidden">{{ storeSelectPost.title }}</span>
          <div
            v-if="!storeArticle.share"
            class="path-header-share index-text-hidden"
          >{{ storeArticle.share|shareFilter }}</div>
        </div>
        <div class="middle">
          <!-- <div class="path-button middle">
            <div class="path-button-left middle">
              <Icon type="ios-copy-outline" class="path-button-icon" />
              <span>复制</span>
            </div>
            <div class="path-button-right">0</div>
          </div>-->
          <div class="path-button middle">
            <div class="path-button-left middle" @click="handleLike">
              <Icon v-show="loading" class="main-spin-icon-load path-button-icon" type="ios-loading" />
              <Icon v-show="!loading" :type="`md-star${islike?'':'-outline'}`" class="path-button-icon" />
              <span>{{ islike ?'取消':'赞' }}</span>
            </div>
            <div class="path-button-right">{{ likeCount }}</div>
          </div>
        </div>
      </div>
      <div class="middle path-main">
        <nuxt-link
          class="middle path-main-link"
          :class="{ border: resultPath === 0 }"
          :to="projectPath"
        >文档</nuxt-link>
        <nuxt-link
          v-if="storeEdit || author === storeUserName"
          class="middle path-main-link"
          :class="{ border: resultPath === 1 }"
          :to="projectPath+'/edit'"
        >编辑</nuxt-link>
        <nuxt-link
          class="middle path-main-link"
          :class=" { border:resultPath === 2 }"
          :to="projectPath+'/issues'"
        >留言</nuxt-link>
        <nuxt-link
          class="middle path-main-link"
          :class=" {border:resultPath === 3 }"
          :to="projectPath+'/log'"
        >日志</nuxt-link>
        <nuxt-link
          v-if="!setting && author === storeUserName"
          class="middle path-main-link"
          :class="{ border:resultPath === 4 }"
          :to="projectPath+'/setting'"
        >设置</nuxt-link>
        <Dropdown v-if="setting && author === storeUserName" trigger="click">
          <div class="middle path-main-link path-main-down" :class="{ border:resultPath === 4 }">
            设置
            <Icon type="ios-arrow-down" />
          </div>
          <DropdownMenu slot="list">
            <DropdownItem :selected="$route.path === projectPath + '/setting'">
              <nuxt-link :to="projectPath+'/setting'" class="path-main-setting-link">基本设置</nuxt-link>
            </DropdownItem>
            <DropdownItem :selected="$route.path === projectPath + '/setting/access'">
              <nuxt-link :to="projectPath+'/setting/access'" class="path-main-setting-link">访问设置</nuxt-link>
            </DropdownItem>
            <DropdownItem :selected="$route.path === projectPath + '/setting/danger'">
              <nuxt-link :to="projectPath+'/setting/danger'" class="path-main-setting-link">危险设置</nuxt-link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </Affix>
    <div class="path-content">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { queryAccount } from '@/api/user';
import { validArticle } from '@/api/valid';
import { articleLike, articleUnLike, articleDetails } from '@/api/article';
import publicHeader from '@/components/publicHeader/index.vue';
// import userCard from '@/components/userCard/index.vue';

export default {
  components: { publicHeader },
  async validate({ params }) {
    const { author, path } = params;
    const { data } = await validArticle({ author, path });
    return data;
  },
  filters: {
    shareFilter(share) {
      return share ? '' : '仅文档成员可见';
    },
  },
  async asyncData({ params, store }) {
    const { author: username, path } = params;
    const { data } = await articleDetails({ author: username, path });
    const { data: user } = await queryAccount({ username });
    if (user.location) {
      user.province = user.location.province;
      user.city = user.location.city;
    }
    store.commit('author/setArticle', data);
    const { islike, likeCount } = data;
    return { user, islike, likeCount };
  },
  data() {
    return {
      // 宽度
      width: 300,
      // 作者
      author: this.$route.params.author,
      path: this.$route.params.path,
      // 设置菜单展示
      setting: false,
      // 喜欢 - 加载
      loading: false,
    };
  },
  computed: {
    ...mapGetters('author', ['storeArticle', 'storeEdit', 'storeSelectPost']),
    ...mapGetters('user', ['storeUserName', 'storeUserState']),
    // 路径
    resultPath() {
      const { author, path } = this.storeArticle;
      const reg = new RegExp(`/${author}/${path}`);
      const router = this.$route.path.replace(reg, '');
      let result = 0;
      if (/^\/edit/.test(router)) result = 1;
      else if (/^\/issues/.test(router)) result = 2;
      else if (/^\/log/.test(router)) result = 3;
      else if (/^\/setting/.test(router)) result = 4;
      return result;
    },
    // 路径
    projectPath() {
      const { author, path } = this.storeArticle;
      return `/${author}/${path}`;
    },
  },
  mounted() {
    if (window.innerWidth < 300) {
      this.width = window.innerWidth - 20;
    }
    if (window.innerWidth < 500) {
      this.setting = true;
    }
    window.addEventListener('resize', this.clientSize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.clientSize);
  },
  methods: {
    clientSize() {
      if (window.innerWidth < 300) {
        this.width = window.innerWidth - 20;
      } else this.width = 300;
      if (window.innerWidth < 500) this.setting = true;
      else this.setting = false;
    },
    // 点赞
    async handleLike() {
      if (this.loading) return;
      if (!this.storeUserState) {
        this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        return;
      }
      this.loading = true;
      const params = { author: this.author, path: this.path };
      if (this.islike) {
        await articleUnLike(params);
        this.likeCount -= 1;
        this.islike = false;
      } else {
        await articleLike(params);
        this.likeCount += 1;
        this.islike = true;
      }
      this.loading = false;
    },
  },
  head() {
    return {
      title: `${this.author} · ${this.storeArticle.title} ● TBS.feel`,
      meta: [
        { hid: 'author', name: 'author', content: this.author },
        {
          hid: 'description',
          name: 'description',
          content: this.storeArticle.description,
        },
      ],
    };
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
  padding: 10px 4% 0;
  font-size: 20px;
  background: #fff;
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
  font-size: 16px;
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
  padding: 0px 10px;
  height: 27px;
  user-select: none;
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
  padding: 10px 2% 0 5%;
  border-bottom: 1px solid #e1e4e8;
  background: #fff;
}
.path-main-link {
  display: inline-block;
  padding: 0 20px 7px;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: #000;
}
.ivu-dropdown {
  flex: 1;
}
.path-main-down.path-main-link {
  width: 100%;
  padding: 0 0 7px 10px;
}
.path-main-link:hover {
  border-bottom: 2px solid #c5c8ce;
}
.border {
  border-bottom: 2px solid #19be6b !important;
}
.path-content {
  flex: auto;
  height: 0;
}
.path-main-setting-link {
  color: #000;
}
@media screen and (max-width: 500px) {
  .path-header {
    flex-direction: column;
  }
  .path-header > div:first-of-type {
    margin: 0;
  }
  .path-header > div:last-of-type {
    display: none;
  }
  .path-main {
    padding: 10px 2% 0;
  }
  .path-main-link {
    flex: 1;
    padding: 0 0 7px;
    text-align: center;
  }
  .path-main-down {
    content: '';
  }
}
</style>
<style >
.path-wrap .ivu-dropdown-menu {
  min-width: auto;
}
.path-wrap .ivu-dropdown-item {
  padding: 7px 10px;
}
</style>
