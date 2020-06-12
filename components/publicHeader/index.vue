/**
*
*  @author ZTiger
*
*/


<template>
  <div class="public-header-wrap">
    <div class="public-header-left nav-middle">
      <div class="public-header-logo-warp nav-middle">
        <img src="@/assets/images/mountain.png" class="public-header-logo" />
        <div class="public-header-logo-title">Mountain</div>
      </div>
    </div>
    <div class="public-header-right nav-middle">
      <div class="public-header-user-portrait nav-middle">{{this.storeUserName|userName}}</div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  filters: {
    userName(name) {
      return name[0].toUpperCase();
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["storeUserName"]),
  },
};
</script>


<style scoped>
.public-header-wrap {
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px;
  height: 48px;
  padding: 0 5%;
  font-family: Georgia;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.public-header-logo-warp {
  font-size: 0;
}
.public-header-logo {
  height: 30px;
}
.public-header-logo-title {
  margin: 0 0 0 10px;
  font-size: 16px;
  font-weight: bold;
}
.public-header-right {
  font-size: 16px;
}
.public-header-user-portrait {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background: linear-gradient(130deg, #5c2a9d, #0779e4 80%);
  font-weight: bold;
  color: #e8eaec;
  justify-content: center;
  user-select: none;
}
.nav-middle {
  display: flex;
  align-items: center;
}
</style>
