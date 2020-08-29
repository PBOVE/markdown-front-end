/**
*
*  @author ZTiger
*
*/

<template>
  <div class="page-left-wrap">
    <div class="header-wrap">
      <div class="header">
        <head-portrait-show
          class="header-protrait"
          :images="userImageSrc"
          :name="storeAuthorUser.nickName"
          :width="portraitWidth"
          :height="portraitHeight"
        />
      </div>
      <div class="middle">
        <div class="middle-title">{{ storeAuthorUser.nickName }}</div>
        <div class="middle-content">{{ storeAuthorUser.userName }}</div>
      </div>
    </div>
    <div class="icon-wrap">
      <Icon type="ios-pin-outline" />
      <span
        v-if="storeAuthorLocaltion"
      >{{ storeAuthorLocaltion.province }} {{ storeAuthorLocaltion.city }}</span>
      <span v-else>未填写</span>
    </div>
    <div class="icon-wrap">
      <Icon type="ios-paper-outline" />
      <span>{{ storeAuthorUser.signature||'未填写' }}</span>
    </div>
    <Button
      v-if="storeUser.userName===storeAuthorUser.userName"
      style="width:100%"
      size="large"
      to="/user"
    >编辑</Button>
    <Button
      v-else-if="storeAuthorNumber.isFans"
      style="width:100%"
      size="large"
      @click="handleButton"
    >取消关注</Button>
    <Button v-else style="width:100%" size="large" @click="handleButton">关注</Button>
    <div class="middle-number">
      <div class="middle-number-row">
        <Icon type="ios-people-outline" />
        {{ storeAuthorUser.fans }} 粉丝
      </div>
      <div class="middle-number-row">
        <Icon type="ios-paw-outline" />
        {{ storeAuthorUser.followes }} 关注
      </div>
      <div class="middle-number-row">
        <Icon type="ios-star-outline" />
        {{ storeAuthorNumber.like }} 获赞
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { _followAccount, _unfollowAccount } from '@/api/user';
import headPortraitShow from '@/components/headPortrait/show.vue';

export default {
  components: { headPortraitShow },
  data() {
    return {
      // 头像宽度 高度
      portraitWidth: 200,
      portraitHeight: 200
    };
  },
  computed: {
    userImageSrc() {
      return this.storeAuthorUser.images;
    },
    ...mapGetters('user', ['storeUser', 'storeUserState']),
    ...mapGetters('author', [
      'storeAuthorUser',
      'storeAuthorNumber',
      'storeAuthorLocaltion',
    ]),
  },
  mounted() {
    this.clientResize();
    window.addEventListener('resize', this.clientResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.clientResize);
  },
  methods: {
    // 界面大小变化
    clientResize() {
      const innerWidth = window.innerWidth;
      if (innerWidth < 600) {
        this.portraitWidth = 80;
        this.portraitHeight = 80;
      } else if (innerWidth < 850) {
        this.portraitWidth = 100;
        this.portraitHeight = 100;
      } else {
        this.portraitWidth = 200;
        this.portraitHeight = 200;
      }
    },
    // 点击分享
    async handleButton() {
      if (!this.storeUserState) return this.$router.push('/login');
      const username = this.storeAuthorUser.userName;
      const isFans = this.storeAuthorNumber.isFans;
      let data;
      if (isFans) data = await _unfollowAccount({ username });
      else data = await _followAccount({ username });
      this.$store.commit('author/setAuthor', data.data);
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  font-size: 0;
}
.header-protrait {
  margin: 0 auto;
}

.middle {
  padding: 16px 0;
  letter-spacing: 0.1em;
}
.middle-title {
  font-size: 26px;
  color: #24292e;
}
.middle-content {
  font-family: Georgia;
  font-size: 18px;
  color: #666;
}
.button-follow {
  height: 37px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 0.1em;
  background: #fafbfc;
  transition: all 0.1s;
}
.button-text {
  width: 100%;
  height: 100%;
  padding: 9px 0;
  color: #000;
  text-align: center;
}
.button-follow:hover {
  background-color: #f4f6ff;
}
.middle-number {
  display: flex;
  margin: 20px 0 30px;
}
.middle-number-row {
  flex-grow: 1;
}
.icon-wrap {
  margin: 10px 0;
}
.middle-number-row i,
.icon-wrap i {
  margin: 0 10px 0 0;
  font-size: 16px;
  color: #000;
}
@media screen and (max-width: 850px) {
  .header-wrap {
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
  }
  .middle {
    padding: 0 0 0 15px;
  }
  .middle-title {
    font-size: 20px;
  }
  .middle-content {
    font-size: 16px;
  }
}
</style>
