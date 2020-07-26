/**
*
*  @author ZTiger
*
*/


<template>
  <div class="issues-new-wrap">
    <div class="issues-new-left">
      <div class="issues-new-image">
        <img v-if="storeImages" :src="storeImages" class="main-user-image" />
        <div v-else class="main-user-portrait">{{storeUserName|filterNume}}</div>
      </div>
      <div class="issues-new-content">
        <div class="issues-new-content-header">
          <Input v-model="title" placeholder="标题" />
        </div>
        <div class="issues-new-content-main">
          <div class="main-header">
            <div class="main-header-button button-select">编辑</div>
            <div class="main-header-button">视图</div>
          </div>
          <client-only>
            <v-md-editor
              v-model="handbook"
              mode="edit"
              placeholder="留言"
              :toolbar="toolbar"
              :left-toolbar="leftToolbar"
              :right-toolbar="rightToolbar"
              :codemirrorConfig="codemirrorConfig"
            />
          </client-only>
        </div>
        <div class="issues-new-footer">
          <div class="main-success-button index-page-margin-left-16">创 建</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  filters: {
    filterNume(name) {
      return name ? name[0].toUpperCase() : "";
    },
  },
  data() {
    return {
      // 作者
      author: this.$route.params.author,
      // 留言标题
      title: "",
      // 内容
      handbook: "",
      // 左侧侧工具栏
      leftToolbar: "",
      rightToolbar: "title bold | ul ol table hr | link code",
      // 初始化 Codemirror 的配置
      codemirrorConfig: {
        lineNumbers: false,
      },
      // 自定义工具栏
      toolbar: {
        title: {
          title: "标题",
          icon: "v-md-icon-title",
          action(editor) {
            editor.insert(selected => {
              const content = selected || "标题";
              return {
                text: `### ${content}`,
                selected: content,
              };
            });
          },
        },
      },
    };
  },
  head() {
    return {
      title: `新建 issues · ${this.author} · ${this.storeProject.path} ● TBS.feel`,
    };
  },
  computed: {
    ...mapGetters("author", ["storeProject"]),
    ...mapGetters("user", ["storeUserName", "storeImages", "storeUser"]),
  },
};
</script>


<style scoped>
.issues-new-wrap {
  padding: 0 32px;
}
.issues-new-wrap,
.issues-new-left {
  display: flex;
}
.issues-new-left {
  width: 70%;
}
.issues-new-image {
  margin: 0 20px 0 0;
}
.issues-new-image div,
.issues-new-image img {
  width: 40px;
  height: 40px;
}
.issues-new-image div {
  font-size: 20px;
}
.issues-new-content {
  flex: 1;
  position: relative;
  border: 1px solid #dcdee2;
  border-radius: 8px;
  background-color: #fff;
}
.issues-new-content::before,
.issues-new-content::after {
  content: "";
  display: block;
  position: absolute;
  top: 11px;
  left: -16px;
  border-color: transparent;
  border-style: solid;
}
.issues-new-content::before {
  border-width: 8px;
  border-right-color: #dcdee2;
}
.issues-new-content::after {
  margin-left: 1.7px;
  border-right-color: #fff;
  border-width: 8px;
}
.issues-new-content-header {
  padding: 10px;
}
.issues-new-content-main {
  margin: 10px 0 0 0;
  position: relative;
  height: 300px;
}
.main-header {
  position: absolute;
  top: 0px;
  left: 10px;
}
.main-header-button {
  display: inline-block;
  padding: 0 20px;
  height: 41px;
  line-height: 41px;
  cursor: pointer;
}
.button-select {
  border-radius: 8px 8px 0 0;
  background: #fff;
  border: 1px solid #dcdee2;
  border-bottom: 0;
}
.v-md-editor {
  box-shadow: none;
  height: calc(100% - 20px);
}
.issues-new-footer {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0 20px;
  padding: 0 10px;
  height: 32px;
}
.main-success-button {
  width: 100px;
}
@media screen and (max-width: 950px) {
  .issues-new-left {
    width: 100%;
  }
}
@media screen and (max-width: 750px) {
  .issues-new-image {
    display: none;
  }
  .issues-new-content {
    overflow: hidden;
  }
}
@media screen and (max-width: 550px) {
  .issues-new-wrap {
    padding: 0 10px;
  }
  .issues-new-image {
    display: none;
  }
  .main-header {
    position: static;
    display: flex;
    justify-content: center;
    margin: 0 0 10px;
    padding: 10px;
  }
  .issues-new-content-main {
    height: auto;
  }
  .v-md-editor {
    height: 200px;
  }
  .main-header-button {
    flex: 1;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #dcdee2;
    background: #f8f8f9;
    border-radius: 4px;
  }
  .main-header-button:last-of-type {
    margin: 0 0 0 10px;
  }
}
</style>
<style >
.issues-new-wrap .ivu-input {
  background-color: #fafbfc;
}
.issues-new-wrap .ivu-input:focus {
  background-color: #fff;
}
.issues-new-wrap .CodeMirror-focused {
  border: 1px solid #57a3f3 !important;
  box-shadow: 0 0 0 2px rgba(45, 140, 240, 0.2);
  background-color: #fff !important;
}
.issues-new-wrap .ivu-input::placeholder {
  color: #808695;
}
.issues-new-wrap .CodeMirror {
  height: calc(100% - 13px) !important;
  margin: 10px 10px 0;
  border: 1px solid #dcdee2;
  width: calc(100% - 20px);
  border-radius: 8px;
  background-color: #fafbfc;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
.issues-new-wrap .CodeMirror-placeholder {
  color: #808695 !important;
}
.issues-new-wrap .v-md-icon-title::before {
  content: "H";
}
.issues-new-wrap .v-md-editor__left-area{
  display: none;
}
.issues-new-wrap .v-md-editor__toolbar-left+.v-md-editor__toolbar-right{
  margin: 0;
}
</style>