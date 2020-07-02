/**
*
*  @author ZTiger
*
*/


<template>
  <div class="setting-index-wrap">
    <div class="setting-index-header">基本设置</div>
    <Divider />
    <div class="setting-title">项目名称</div>
    <div class="setting-input-wrap">
      <input type="text" class="setting-input" v-model="title" />
      <div class="setting-input-suffix">{{titleSize}}</div>
    </div>
    <div class="setting-title">项目描述</div>
    <div class="setting-input-wrap">
      <input type="text" class="setting-input" v-model="description" />
      <div class="setting-input-suffix">{{descriptionSize}}</div>
    </div>
    <button
      class="main-success-button setting-button"
      :style="{background: loading?'#2ea44f88':''}"
      @click="handleSubbmit"
    >更新项目</button>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
      //名称
      title: "",
      titleSize: "0/30",
      //名称
      description: "",
      descriptionSize: "0/60",
      // 加载
      loading: false,
    };
  },
  computed: {
    ...mapGetters("author", ["storeProject"]),
  },
  watch: {
    "storeProject.title": {
      handler(value) {
        this.title = value;
        this.titleSize = `${value.length || 0}/60`;
      },
      immediate: true,
    },
    "storeProject.description": {
      handler(value) {
        this.description = value;
        this.descriptionSize = `${value.length || 0}/60`;
      },
      immediate: true,
    },
  },
  methods: {
    async handleSubbmit() {
      const params = {};
      if (this.loading) return;
      if (this.title !== this.storeProject.title) {
        params.title = this.title;
      }
      if (this.description !== this.storeProject.description) {
        params.description = this.description;
      }
      if (JSON.stringify(params) === "{}") return;
      this.loading = true;
      params.author = this.author;
      params.path = this.path;
      try {
        const { data } = await this.$request.updateProject(params);
        this.$Message.success({
          background: true,
          content: "项目更新成功",
        });
        console.log(data);
        this.$store.commit("author/setProject", data);
      } catch (err) {}
      this.loading = false;
    },
  },
};
</script>


<style scoped>
.setting-index-header {
  font-size: 24px;
  padding: 0 0 8px;
}
.setting-title {
  font-weight: 600;
}
.setting-title::after {
  content: ":";
  margin: 0 3px;
}
.setting-input-wrap {
  position: relative;
  display: inline-block;
  margin: 0 0 30px 0;
}
.setting-input {
  margin: 2px 0 0 0;
  padding: 0 40px 0 0;
  width: 400px;
  height: 33px;
  text-indent: 0.2em;
  background: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04),
    inset 0 1px 0 hsla(0, 0%, 100%, 0.25);
  border-radius: 4px;
  outline: none;
}
.setting-input-suffix {
  position: absolute;
  top: 8px;
  right: 5px;
}
</style>
