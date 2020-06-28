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
        <div v-else class="alt-wrap main-center-middle">{{user.nickName|handleName}}</div>
      </div>
      <div class="middle">
        <div class="middle-title">{{user.nickName}}</div>
        <div class="middle-content">{{user.userName}}</div>
      </div>
    </div>
    <div class="icon-wrap">
      <Icon type="ios-pin-outline" />
      {{user.location||'未填写'}}
    </div>
    <div class="icon-wrap">
      <Icon type="ios-paper-outline" />
      {{user.signature||'未填写'}}
    </div>
    <div class="button-follow">
      <div v-if="storeUser.userName===user.userName">编辑</div>
      <div v-else>关注</div>
    </div>
    <div class="middle-number">
      <div class="middle-number-row">
        <Icon type="ios-people-outline" />0 粉丝
      </div>
      <div class="middle-number-row">
        <Icon type="ios-paw-outline" />0 关注
      </div>
      <div class="middle-number-row">
        <Icon type="ios-star-outline" />
        {{number.like}} 获赞
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  props: ["user", "number"],
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
      return this.user.images;
    },
    ...mapGetters("user", ["storeUser", "storeNickName"]),
  },
};
</script>


<style scoped>
.header {
  font-size: 0;
}

.image,
.alt-wrap {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  border: 1px solid #c5c8ce;
}
.alt-wrap {
  font-size: 200px;
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
  padding: 6.5px 0;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  color: #24292e;
  letter-spacing: 0.1em;
  background: #fafbfc;
}
.button-follow:hover {
  background-color: #f3f4f6;
  transition-duration: 0.1s;
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