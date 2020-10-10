/**
*
*  @author ZTiger
*
*/

<template>
  <div class="setting-index-wrap">
    <div class="setting-index-header">基本设置</div>
    <Divider />
    <div class="setting-title">文档名称</div>
    <div class="setting-input-wrap">
      <input v-model="title" type="text" class="setting-input" />
      <div class="setting-input-suffix">{{ titleSize }}</div>
    </div>
    <div class="setting-title">文档描述</div>
    <div class="setting-input-wrap">
      <input v-model="description" maxlength="100" type="text" class="setting-input" />
      <div class="setting-input-suffix">{{ descriptionSize }}</div>
    </div>
    <div class="setting-title">文档排序</div>
    <div class="setting-input-wrap">
      <select-box v-model="sort" class="setting-select" header-title="排序" :list="sortList" />
    </div>
    <button
      class="main-success-button setting-button"
      :style="{background: loading?'#2ea44f88':''}"
      @click="handleSubbmit"
    >更新</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { updateArticle } from '@/api/article';
import selectBox from '@/components/selectBox/index.vue';

export default {
  components: { selectBox },
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
      // 名称
      title: '',
      titleSize: '0/30',
      // 名称
      description: '',
      descriptionSize: '0/100',
      // 排序
      sort: 0,
      sortList: [
        { label: '修改日期 [ 升序 ]', value: 0 },
        { label: '修改日期 [ 降序 ]', value: 1 },
        { label: '创建日期 [ 升序 ]', value: 4 },
        { label: '创建日期 [ 降序 ]', value: 5 },
        { label: '文档名称 [ 升序 ]', value: 2 },
        { label: '文档名称 [ 降序 ]', value: 3 },
      ],
      // 加载
      loading: false,
    };
  },
  computed: {
    ...mapGetters('author', ['storeArticle']),
  },
  watch: {
    'storeArticle.title': {
      handler(value) {
        this.title = value;
      },
      immediate: true,
    },
    'storeArticle.description': {
      handler(value) {
        this.description = value;
      },
      immediate: true,
    },
    'storeArticle.sort': {
      handler(value) {
        this.sort = value;
      },
      immediate: true,
    },
    title: {
      handler(value) {
        this.titleSize = `${value.length || 0}/30`;
      },
      immediate: true,
    },
    description: {
      handler(value) {
        this.descriptionSize = `${value.length || 0}/100`;
      },
      immediate: true,
    },
  },
  methods: {
    // 更新
    async handleSubbmit() {
      const params = {};
      if (this.loading) return;
      if (this.title !== this.storeArticle.title) {
        params.title = this.title;
      }
      if (this.description !== this.storeArticle.description) {
        params.description = this.description;
      }
      if (this.sort !== this.storeArticle.sort) {
        params.sort = this.sort;
      }
      if (JSON.stringify(params) === '{}') return;
      this.loading = true;
      params.author = this.author;
      params.path = this.path;
      try {
        const { data } = await updateArticle(params);
        this.$Message.success({ background: true, content: '更新成功' });
        this.$store.commit('author/setArticle', data);
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
  content: ':';
  margin: 0 3px;
}
.setting-input-wrap {
  position: relative;
  display: inline-block;
  margin: 0 0 30px 0;
}
.setting-select {
  width: 400px;
}

.setting-input {
  margin: 2px 0 0 0;
  padding: 0 60px 0 0;
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
.setting-input:hover,
.setting-input:focus {
  background-color: #f3f4f6;
}
.setting-input-suffix {
  position: absolute;
  top: 8px;
  right: 5px;
}
@media screen and (max-width: 800px) {
  .setting-select,
  .setting-input {
    width: 400px;
  }
}
@media screen and (max-width: 650px) {
  .setting-select,
  .setting-input {
    width: 300px;
  }
}
@media screen and (max-width: 500px) {
  .setting-input-wrap {
    width: 100%;
  }
  .setting-select,
  .setting-input {
    width: 100%;
  }
}
</style>
