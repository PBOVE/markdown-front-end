/**
*
*  @author ZTiger
*
*/


<template>
  <div class="page-right">
    <div class="header">
      <nuxt-link
        :to="'/'+user.userName"
        class="header-row"
        :class="{border:pathArray[0].test(path)}"
      >
        <Icon type="ios-book-outline" />概述
      </nuxt-link>
      <nuxt-link
        :to="'/'+user.userName + '/project'"
        class="header-row"
        :class="{border:pathArray[1].test(path)}"
      >
        <Icon type="ios-folder-open-outline" />项目
      </nuxt-link>
    </div>
  </div>
</template>


<script>
export default {
  props: ["user"],
  data() {
    return {
      pathArray: [/^\/[\w]+$/, /^\/[\w]+\/project$/],
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
};
</script>


<style scoped>
.page-right {
  margin: 0 0 20px 0;
}
.header {
  display: flex;
  justify-content: center;
}
.header-row {
  position: relative;
  padding: 4px 20px 4px 20px;
  font-size: 16px;
  letter-spacing: 0.1rem;
  cursor: pointer;
  color: #000;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}
.header-row i {
  margin: 0 8px 0 0;
  font-weight: bold;
}
.header-row::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 100%;
  transform: scaleX(0);
  background: #00000055;
  border-radius: 1px;
}
.header-row:hover::before {
  transform: scaleX(1);
  transition: all 0.4s;
}
.header-row:active::before {
  transform: scaleX(1);
  transition: all 0.4s;
}
.border::before {
  transform: scaleX(1);
  background: #2d8cf0;
}
</style>