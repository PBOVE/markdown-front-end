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
          <div class="row-title row-must">文档格式</div>
          <div class="row-content">请选择文档格式</div>
          <select-box class="select" header-title="格式" v-model="select" :list="textList" />
        </div>
        <Divider />
        <div class="row">
          <div class="row-header">
            <div class="row-title row-person row-person-title">所有者</div>
            <div class="row-title row-must">项目名称</div>
          </div>
          <div class="row-main row-middle">
            <div class="row-person row-middle row-border">
              <img :src="storeImages" class="row-person-img" />
              <span>{{storeUserName}}</span>
            </div>
            <span class="row-line">/</span>
            <Tooltip
              :content="content"
              theme="light"
              :disabled="disabled"
              class="row-input-tool-wrap"
            >
              <div class="row-input-tool">
                <input v-model="projectName" type="text" class="row-input" />
              </div>
            </Tooltip>
          </div>
        </div>
        <Divider />
        <div class="row">
          <div class="row-title">描述</div>
          <div class="row-main">
            <input v-model="projectName" type="text" class="row-input" />
          </div>
        </div>
        <Divider />
        <div class="row">
          <RadioGroup v-model="single">
            <Radio label="public" class="row-middle">
              <div class="row-middle" style="margin-left:10px">
                <img src="@/assets/images/bookmark.png" class="row-image" />
                <div class="row-right">
                  <div class="row-title">公开项目</div>
                  <div class="row-content">所有成员可见，仅项目成员可编辑</div>
                </div>
              </div>
            </Radio>
            <Radio label="private" class="row-middle" style="margin-top:20px;">
              <div class="row-middle" style="margin-left:10px">
                <img src="@/assets/images/lock.png" class="row-image" />
                <div class="row-right">
                  <div class="row-title">私有项目</div>
                  <div class="row-content">仅项目成员可查看和编辑</div>
                </div>
              </div>
            </Radio>
          </RadioGroup>
        </div>
        <Divider />
        <button class="main-success-button">创建项目</button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import publicHeader from "@/components/publicHeader/index.vue";
import selectBox from "@/components/selectBox/index.vue";

export default {
  validate({ store }) {
    return store.state.user.data.authentication;
  },
  components: { publicHeader, selectBox },
  data() {
    return {
      // 选择器选择
      select: "Markdown编辑器",
      textList: ["Markdown编辑器", "富文本编辑器"],
      // 显示的内容
      content: "",
      // 是否禁用提示框
      disabled: true,
      // 项目名称
      projectName: "",
    };
  },
  head() {
    return {
      title: "创建 ● TBS.feel",
    };
  },
  computed: {
    ...mapGetters("user", ["storeUserName", "storeImages"]),
  },
  watch: {
    projectName(value) {
      const reg = /[\s!@#$%^&*()+=|\\\/?\.<>\.,:;"'{}[\]]+/g;
      console.log(value.replace(reg, "-"));
    },
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
  padding: 30px 0;
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
  font-size: 14px;
}
.row-content {
  font-size: 12px;
}
.select {
  margin: 10px 0 0 0;
  width: 200px;
}
.row-must::before {
  content: "*";
  color: #ed4014;
  margin: 0 3px 0 0;
}
.row-main {
  margin: 5px 0 0 0;
}
.row-main,
.row-header {
  display: flex;
}
.row-person {
  width: 80px;
}
.row-person-img {
  margin: 0 10px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
.row-person-title {
  width: 110px;
}
.row-middle {
  display: flex;
  align-items: center;
}
.row-input,
.row-border {
  height: 33px;
  background: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04),
    inset 0 1px 0 hsla(0, 0%, 100%, 0.25);
  border-radius: 4px;
}
.row-line {
  margin: 0 10px;
  font-size: 23px;
}
.row-input-tool {
  width: 300px;
}
.row-input {
  outline: 0;
  text-indent: 1em;
  width: 100%;
}
.row-input:focus {
  background: #fff;
  border-color: #57a3f3;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
}
.row-image {
  width: 28px;
  height: 28px;
}
.row-right {
  margin: 0 0 0 10px;
}
@media screen and (max-width: 750px) {
  .content {
    margin: 0 20px;
  }
  .row-input-tool-wrap {
    flex: 1;
  }
  .row-input-tool {
    width: 100%;
  }
}
</style>
<style>
.new-wrap .ivu-tooltip-rel {
  width: 100%;
}
</style>
