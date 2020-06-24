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
        <Select v-model="select" class="header-right-select" placeholder="类型" not-found-text>
          <Option v-for="(item,index) in projectList" :value="item" :key="index">{{ item }}</Option>
        </Select>
        <Button
          v-if="userName!==storeUserName"
          type="success"
          class="header-right-button"
          icon="ios-copy-outline"
        >创 建</Button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  transition: "fade",
  data() {
    return {
      // 用户
      userName: this.$route.params.userName,
      // 搜索内容
      search: "",
      // 选择内容
      select: "",
      projectList: [],
    };
  },
  computed: {
    ...mapGetters("user", ["storeUserName"]),
  },
};
</script>


<style scoped>
.header {
  display: flex;
}
.header-left {
  flex: 1;
}
.header-right-select {
  margin: 0 16px;
  width: 120px;
}

@media screen and (max-width: 550px) {
  .header {
    flex-direction: column;
  }
  .header-right-select {
    margin: 0;
  }
  .header-right {
    margin: 15px 0 0;
  }
}
</style>
