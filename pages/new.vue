/**
*
*  @author ZTiger
*
*/


<template>
  <div class="new-wrap">
    <public-header :shadow="true" />
    <div class="main scroll">
      <div class="content">
        <div class="content-header">
          <div class="content-header-title">创建一个新的知识库</div>
          <div class="content-header-content">山不在高，有仙则名。水不在深，有龙则灵。</div>
        </div>
        <Divider />
        <div class="row">
          <div class="row-title row-must">文档格式</div>
          <div class="row-content">请选择文档格式</div>
          <select-box
            class="select"
            v-model="select"
            header-title="格式"
            default="Markdown编辑器"
            :list="textList"
          />
        </div>
        <Divider />
        <div class="row row-flex">
          <div>
            <div class="row-title row-person row-person-title">所有者</div>
            <div class="row-flex">
              <div class="row-person row-middle row-border">
                <img :src="storeImages" class="row-person-img" />
                <span>{{storeUserName}}</span>
              </div>
              <span class="row-line">/</span>
            </div>
          </div>
          <div class="row-input-right"> 
            <div class="row-title row-must">知识库路径</div>
            <div class="row-input-tool">
              <Poptip word-wrap trigger="focus" placement="bottom-start" :content="content">
                <input v-model="path" ref="pathRef" type="text" class="row-input" />
              </Poptip>
            </div>
          </div>
        </div>
        <Divider />
        <div class="row">
          <div class="row-title row-must">知识库名称</div>
          <div class="row-main row-position">
            <input
              v-model="title"
              ref="titleRef"
              class="row-input row-input-position"
              type="text"
              maxlength="30"
            />
            <div class="row-size-position">{{titleSize}}</div>
          </div>
        </div>
        <Divider />
        <div class="row">
          <div class="row-title">描述</div>
          <div class="row-main row-position">
            <input
              v-model="description"
              class="row-input row-input-position"
              type="text"
              maxlength="60"
            />
            <div class="row-size-position">{{descriptionSize}}</div>
          </div>
        </div>
        <Divider />
        <div class="row">
          <RadioGroup v-model="share">
            <Radio label="1" class="row-middle">
              <div class="row-middle" style="margin-left:10px">
                <img src="@/assets/images/bookmark.png" class="row-image" />
                <div class="row-right">
                  <div class="row-title">互联网可见</div>
                  <div class="row-content">知识库对互联网所有人可见</div>
                </div>
              </div>
            </Radio>
            <Radio label="0" class="row-middle" style="margin-top:20px;">
              <div class="row-middle" style="margin-left:10px">
                <img src="@/assets/images/lock.png" class="row-image" />
                <div class="row-right">
                  <div class="row-title">仅自己可见</div>
                  <div class="row-content">知识库仅自己和知识库成员可见</div>
                </div>
              </div>
            </Radio>
          </RadioGroup>
        </div>
        <Divider />
        <button
          class="main-success-button"
          :style="{background: loading?'#2ea44f88':''}"
          @click="handleSubmit"
        >
          <Icon type="ios-loading" class="main-spin-icon-load" v-show="loading" />创建知识库
        </button>
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
      select: "markdown",
      textList: [
        { label: "Markdown编辑器", value: "markdown" },
        { label: "富文本编辑器", value: "richText" },
      ],
      // 路径
      path: "",
      content: "请输入知识库路径",
      // 分享
      share: "1",
      // 描述
      description: "",
      descriptionSize: "0/60",
      // 名称
      title: "",
      titleSize: "0/30",
      // 路径
      path: "",
      // 加载
      loading: false,
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
    path(value) {
      this.$refs.pathRef.classList.remove("row-error");
      const dom = document.querySelector(".ivu-poptip-popper");
      const reg = /[\s!@#$%^&*()+=|\\\/?\.<>\.,:;"'{}[\]\-]+/g;
      if (!value.replace(/[\s]+/g, "")) {
        this.content = "请输入知识库路径";
      } else {
        const newValue = value.replace(reg, "-");
        const regPath = /^[A-Za-z0-9\-]+$/;
        if (regPath.test(newValue)) {
          this.content = `知识库路径为 ${newValue}`;
          dom.classList.remove("poptip-error");
        } else {
          dom.classList.add("poptip-error");
          this.content = `知识库路径只能包含数字,字母,和连字符`;
        }
      }
    },
    description(value) {
      this.descriptionSize = `${value.length}/60`;
    },
    title(value) {
      this.$refs.titleRef.classList.remove("row-error");
      this.titleSize = `${value.length}/30`;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.loading) return;
      const result = this.verifyContent();
      const reg = /[\s!@#$%^&*()+=|\\\/?\.<>\.,:;"'{}[\]]+/g;
      if (!result) return;
      this.loading = true;
      const params = {
        path: this.path.replace(reg, "-"),
        share: this.share === "1",
        format: this.select,
        title: this.title,
        description: this.description,
      };
      try {
        await this.$request.createProject(params);
        this.$router.push(`/${this.storeUserName}/${params.path}`);
      } catch (err) {
        this.$refs.pathRef.classList.add("row-error");
      }
      this.loading = false;
    },
    // 检测
    verifyContent() {
      const reg = /[\s!@#$%^&*()+=|\\\/?\.<>\.,:;"'{}[\]]+/g;
      let verid = true;
      if (
        !this.path.replace(/[\s]+/g, "") ||
        !/^[A-Za-z0-9\-]+$/.test(this.path.replace(reg, "-"))
      ) {
        this.$refs.pathRef.classList.add("row-error");
        verid = false;
      }
      if (!this.title) {
        this.$refs.titleRef.classList.add("row-error");
        verid = false;
      }
      return verid;
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
.row-flex {
  display: flex;
}
.row-person {
  justify-content: center;
}
.row-person-img {
  margin: 0 10px 0 0;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}
.row-middle {
  display: flex;
  align-items: center;
}
.row-border {
  padding: 0 15px;
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
  position: relative;
  width: 300px;
}
.row-input {
  outline: 0;
  text-indent: 0.2em;
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
.row-position {
  position: relative;
}
.row-input-position {
  padding: 0 40px 0 0;
}
.row-size-position {
  position: absolute;
  top: 7px;
  right: 4px;
}
.row-middle-start {
  display: flex;
  justify-items: flex-start;
}
.row-input.row-error {
  border: 1px solid #ed4014;
  box-shadow: 0 0 0 2px rgba(237, 64, 20, 0.2);
}
@media screen and (max-width: 750px) {
  .content {
    margin: 0 20px;
  }
  .row-input-tool {
    width: 100%;
  }
  .row-input-right{
    flex: 1;
  }
}
</style>
<style>
.new-wrap .ivu-poptip-popper,
.new-wrap .ivu-poptip-rel,
.new-wrap .ivu-poptip {
  width: 100%;
}
.new-wrap .row-input-tool-tip {
  display: none;
}
.new-wrap .ivu-poptip-body-content-word-wrap {
  word-break: break-all;
}
.new-wrap .ivu-poptip-body-content-inner {
  color: #000;
}
.new-wrap .poptip-error .ivu-poptip-body-content-inner {
  color: #ed4014;
}
</style>
