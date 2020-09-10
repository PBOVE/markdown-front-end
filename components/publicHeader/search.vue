/**
*
*  @author ZTiger
*
*/

<template>
  <div>
    <div
      class="header-search-wrap"
      :style="{width:`${width}%`,'border-bottom':width?'1px solid #dcdee2':''}"
      @click="handleClick"
    >
      <input ref="inputRef" type="text" class="search-input" placeholder="搜索" @blur="handleBlur" />
      <div class="button-icon-wrap main-center-middle">
        <Icon type="ios-search" />
      </div>
    </div>
  </div>
</template>

<script>
import { _queryArticle } from '@/api/article';

export default {
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    'search-hide': {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 输入数据
      inputData: '',
      // 搜索数据
      searchData: [],
      // 数据加载中
      loading: false,
      asyncTitle: '',
      // 宽度
      width: 0,
    };
  },
  methods: {
    // 搜索内容发送变化
    contentChange() {},
    // 异步搜索
    async asyncSearch(title) {
      if (this.loading) {
        this.asyncTitle = title;
        return;
      }
      this.loading = true;
      const params = { title };
      const { data } = await _queryArticle(params);
      this.searchData = data.content;
      this.loading = false;
      if (this.asyncTitle) {
        const asyncTitle = this.asyncTitle;
        this.asyncTitle = '';
        this.asyncSearch(asyncTitle);
      }
    },
    // 处理选择
    handleSelect(value) {
      this.$router.push(`/${value}`);
    },
    // 处理获取焦点
    handleClick() {
      this.width = 100;
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      });
    },
    // 失去焦点
    handleBlur() {
      this.width = 0;
      // this.width = 32;
    },
  },
};
</script>

<style scoped>
.header-search-wrap {
  display: flex;
  height: 32px;
  width: 32px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-color: #dcdee2;
}
.search-input {
  flex: 1;
  width: 0;
  outline: none;
  border-width: 0;
}
.search-input::placeholder{
  color: #c5c8ce;
}
.button-icon-wrap {
  width: 32px;
  flex-shrink: 0;
}
</style>
