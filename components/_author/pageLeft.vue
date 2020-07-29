/**
*
*  @author ZTiger
*
*/


<template>
  <div class="page-left-wrap">
    <div class="header-wrap">
      <div class="header">
        <img v-if="userImageSrc" :src="'/api/storage/preview/'+userImageSrc" class="image" />
        <div v-else class="alt-wrap main-center-middle">{{storeAuthorUser.nickName|handleName}}</div>
      </div>
      <div class="middle">
        <div class="middle-title">{{storeAuthorUser.nickName}}</div>
        <div class="middle-content">{{storeAuthorUser.userName}}</div>
      </div>
    </div>
    <div class="icon-wrap">
      <Icon type="ios-pin-outline" />
      <span
        v-if="storeAuthorLocaltion"
      >{{storeAuthorLocaltion.province}} {{storeAuthorLocaltion.city}}</span>
      <span v-else>未填写</span>
    </div>
    <div class="icon-wrap">
      <Icon type="ios-paper-outline" />
      <span>{{storeAuthorUser.signature||'未填写'}}</span>
    </div>
    <Button
      style="width:100%"
      size="large"
      v-if="storeUser.userName===storeAuthorUser.userName"
      to="/user"
    >编辑</Button>
    <Button
      style="width:100%"
      size="large"
      v-else-if="storeAuthorNumber.isFans"
      @click="handleButton"
    >取消关注</Button>
    <Button style="width:100%" size="large" v-else @click="handleButton">关注</Button>
    <div class="middle-number">
      <div class="middle-number-row">
        <Icon type="ios-people-outline" />
        {{storeAuthorUser.fans}} 粉丝
      </div>
      <div class="middle-number-row">
        <Icon type="ios-paw-outline" />
        {{storeAuthorUser.followes}} 关注
      </div>
      <div class="middle-number-row">
        <Icon type="ios-star-outline" />
        {{storeAuthorNumber.like}} 获赞
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  filters: {
    handleName(name) {
      return name ? name[0].toUpperCase() : "";
    },
  },
  data() {
    return {};
  },
  computed: {
    userImageSrc() {
      return this.storeAuthorUser.images;
    },
    ...mapGetters("user", ["storeUser", "userState"]),
    ...mapGetters("author", [
      "storeAuthorUser",
      "storeAuthorNumber",
      "storeAuthorLocaltion",
    ]),
  },
  methods: {
    async handleButton() {
      if (!this.userState) return this.$router.push("/login");
      const username = this.storeAuthorUser.userName;
      const isFans = this.storeAuthorNumber.isFans;
      let data;
      if (isFans) data = await this.$request.unfollowUser({ username });
      else data = await this.$request.followUser({ username });
      this.$store.commit("author/setAuthor", data.data);
    },
  },
};
</script>


<style scoped>
.header {
  text-align: center;
  font-size: 0;
}

.image,
.alt-wrap {
  margin: 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid #c5c8ce;
}
.alt-wrap {
  font-size: 160px;
  font-family: Georgia;
  background: linear-gradient(130deg, #5c2a9d, #0779e4 80%);
  color: #fff;
  user-select: none;
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
  .image,
  .alt-wrap {
    width: 50px;
    height: 50px;
  }
  .alt-wrap {
    font-size: 30px;
  }
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