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
          <div class="content-header-title">新建文档</div>
        </div>
        <Divider />
        <div class="row">
          <div class="row-title row-must">文档格式</div>
          <div class="row-content">请选择文档格式</div>
          <select-box
            v-model="select"
            class="select"
            header-title="格式"
            default="Markdown编辑器"
            :list="textList"
          />
        </div>
        <div class="new-tip">富文本编辑器, 是一种可内嵌于浏览器，所见即所得的文本编辑器。</div>
        <div class="new-tip">Markdown编辑器是一种可以使用普通文本编辑器编写的标记语言，它可以使普通文本内容具有一定的格式。</div>
        <Divider />
        <div class="row row-flex">
          <div>
            <div class="row-title row-person row-person-title">创建者</div>
            <div class="row-flex">
              <div class="row-person row-middle row-border">
                <head-portrait-show
                  :images="storeImages"
                  :name="storeNickName"
                  :width="20"
                  :height="20"
                />
                <span>{{ }}</span>
              </div>
              <span class="row-line">/</span>
            </div>
          </div>
          <div class="row-input-right">
            <div class="row-title row-must">文档路径</div>
            <div class="row-input-tool">
              <Poptip word-wrap trigger="focus" placement="bottom-start" :content="content">
                <input ref="pathRef" v-model="path" type="text" class="row-input" />
              </Poptip>
            </div>
          </div>
        </div>
        <div class="new-tip">通过您的 用户名 和 文档路 径可以查询到您新建的文档</div>
        <Divider />
        <div class="row">
          <div class="row-title row-must">文档名称</div>
          <div class="row-main row-position">
            <input
              ref="titleRef"
              v-model="title"
              class="row-input row-input-position"
              type="text"
              maxlength="30"
            />
            <div class="row-size-position">{{ titleSize }}</div>
          </div>
        </div>
        <Divider />
        <div class="row">
          <div class="row-title">文档描述</div>
          <div class="row-main row-position">
            <input
              v-model="description"
              class="row-input row-input-position"
              type="text"
              maxlength="100"
            />
            <div class="row-size-position">{{ descriptionSize }}</div>
          </div>
        </div>
        <Divider />
        <div class="row">
          <RadioGroup v-model="share">
            <Radio label="1" class="row-middle">
              <div class="row-middle" style="margin-left:10px">
                <img src="@/assets/svg/ic-unlock.svg" class="row-image" />
                <div class="row-right">
                  <div class="row-title">所有人可见</div>
                  <div class="row-content">对所有人可见</div>
                </div>
              </div>
            </Radio>
            <Radio label="0" class="row-middle" style="margin-top:20px;">
              <div class="row-middle" style="margin-left:10px">
                <img src="@/assets/svg/ic-lock.svg" class="row-image" />
                <div class="row-right">
                  <div class="row-title">仅文档成员可见</div>
                  <div class="row-content">仅自己和文档成员可见</div>
                </div>
              </div>
            </Radio>
          </RadioGroup>
        </div>
        <Divider />
        <Button type="success" style="margin:30px 0" :loading="loading" @click="handleSubmit">新 建</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { newArticle } from '@/api/article';
import publicHeader from '@/components/publicHeader/index.vue';
import selectBox from '@/components/selectBox/index.vue';
import headPortraitShow from '@/components/headPortrait/show.vue';

export default {
  validate({ store }) {
    return store.state.user.data.authentication;
  },
  components: { publicHeader, selectBox, headPortraitShow },
  data() {
    return {
      // 选择器选择
      select: 'markdown',
      textList: [
        { label: 'Markdown编辑器', value: 'markdown' },
        { label: '富文本编辑器', value: 'richText' },
      ],
      // 路径
      path: '',
      content: '请输入路径',
      // 分享
      share: '1',
      // 描述
      description: '',
      descriptionSize: '0/100',
      // 名称
      title: '',
      titleSize: '0/30',
      // 加载
      loading: false,
    };
  },
  head() {
    return {
      title: '新建 ● TBS.feel',
    };
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('user', ['storeNickName', 'storeUserName', 'storeImages']),
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {
    path(value) {
      this.$refs.pathRef.classList.remove('row-error');
      const dom = document.querySelector('.ivu-poptip-popper');
      const reg = /[\s!@#$%^&*()+=|\\/?.<>,:;"'{}[\]]+/g;
      if (!value.replace(/[\s]+/g, '')) {
        this.content = '请输入路径';
      } else {
        const newValue = value.replace(reg, '-');
        const regPath = /^[A-Za-z0-9-]+$/;
        if (regPath.test(newValue)) {
          this.content = `路径为 ${newValue}`;
          dom.classList.remove('poptip-error');
        } else {
          dom.classList.add('poptip-error');
          this.content = '路径只能包含数字,字母,和连字符';
        }
      }
    },
    description(value) {
      this.descriptionSize = `${value.length}/100`;
    },
    title(value) {
      this.$refs.titleRef.classList.remove('row-error');
      this.titleSize = `${value.length}/30`;
    },
  },
  // eslint-disable-next-line vue/order-in-components
  methods: {
    async handleSubmit() {
      if (this.loading) return;
      const result = this.verifyContent();
      const reg = /[\s!@#$%^&*()+=|\\/?.<>,:;"'{}[\]]+/g;
      if (!result) return;
      this.loading = true;
      const params = {
        path: this.path.replace(reg, '-'),
        share: this.share === '1',
        format: this.select,
        title: this.title,
        description: this.description,
      };
      try {
        await newArticle(params);
        this.$router.push(`/${this.storeUserName}/${params.path}/edit`);
      } catch (err) {
        this.loading = false;
        this.$refs.pathRef.classList.add('row-error');
      }
    },
    // 检测
    verifyContent() {
      const reg = /[\s!@#$%^&*()+=|\\/?.<>,:;"'{}[\]]+/g;
      let verid = true;
      if (
        !this.path.replace(/[\s]+/g, '') ||
        !/^[A-Za-z0-9-]+$/.test(this.path.replace(reg, '-'))
      ) {
        this.$refs.pathRef.classList.add('row-error');
        verid = false;
      }
      if (!this.title) {
        this.$refs.titleRef.classList.add('row-error');
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
  color: #0080ff;
  font-size: 24px;
}
.row-content,
.new-tip {
  color: #515a6e;
}
.new-tip {
  margin: 6px 0 0 0;
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
  content: '*';
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
  margin: 0 0 0 20px;
}
.row-position {
  position: relative;
}
.row-input-position {
  padding: 0 60px 0 0;
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
  .row-input-right {
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
