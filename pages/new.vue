/**
*
*  @author ZTiger
*
*/


<template>
  <div class="new-wrap">
    <public-header :shadow="true" />
    <div class="main">
      <div class="content">
        <div class="content-header">
          <div class="content-header-title">创建一个新的项目</div>
          <div class="content-header-content">山不在高，有仙则名。水不在深，有龙则灵。</div>
        </div>
        <Divider />
        <div class="row">
          <div class="row-title">文档格式</div>
          <div class="row-content">请选择文档格式</div>
          <Select v-model="select" class="select" placeholder="请选择">
            <Option value="富文本">富文本编辑器</Option>
            <Option value="Markdown">Markdown编辑器</Option>
          </Select>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  validate({ store }) {
    return store.state.user.data.authentication;
  },
  components: {
    publicHeader,
  },
  data() {
    return {
      // 选择器选择
      select: "",
    };
  },
  head() {
    return {
      title: "创建 ● TBS.feel",
    };
  },
};
</script>


<style scoped>
.new-wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main {
  flex: auto;
  padding: 30px 0 0;
  height: 0;
  overflow: auto;
}
.content {
  max-width: 750px;
  margin: 0 auto;
}
.content-header-title {
  font-size: 24px;
}
.row-content,
.content-header-content {
  color: #515a6e;
}
.row-title {
  font-size: 16px;
}
.select {
  margin: 10px 0 0 0;
  width: 150px;
}
</style>
