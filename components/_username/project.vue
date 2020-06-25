/**
*
*  @author ZTiger
*
*/


<template>
  <div class="project">
    <div class="header">
      <div class="header-left">
        <Input v-model="search" placeholder="查找项目" />
      </div>
      <div class="header-right">
        <select-box
          class="header-right-select"
          header-title="类型"
          list-width="217px"
          v-model="select"
          :list="typeList"
        />
        <nuxt-link
          v-if="userName!==storeUser.userName&&storeUser.authentication"
          type="success"
          class="main-success-button"
          to="/new"
        >
          <Icon type="ios-copy-outline" />创 建
        </nuxt-link>
      </div>
    </div>
    <div class="content">
      <div v-for="item in projects" :key="item.path">
        <div>{{item.title}}</div>
        <div>{{item.description}}</div>
        <div>{{item.createTime}}</div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import selectBox from "@/components/selectBox/index.vue";

export default {
  components: { selectBox },
  props: ["projects"],
  data() {
    return {
      // 用户
      userName: this.$route.params.userName,
      // 搜索内容
      search: "",
      // 选择内容
      select: "全部",
      typeList: ["全部", "typeList"],
    };
  },
  computed: {
    ...mapGetters("user", ["storeUser"]),
  },
};
</script>


<style scoped>
.header,
.header-right {
  display: flex;
}
.header-left {
  flex: 1;
}
.header-right-select {
  margin: 0 16px;
  width: 120px;
}
.content {
  margin: 20px 0 0 0;
}
@media screen and (max-width: 550px) {
  .header {
    flex-direction: column;
  }
  .header-right-select {
    margin: 0 16px 0 0;
  }
  .header-right {
    margin: 15px 0 0;
  }
}
</style>
