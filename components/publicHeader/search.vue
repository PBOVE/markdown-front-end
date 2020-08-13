/**
*
*  @author ZTiger
*
*/

<template>
  <AutoComplete
    v-model="inputData"
    placeholder="搜索"
    icon="ios-search"
    :clearable="true"
    :style="{display:searchHide?'none':''}"
    @on-change="contentChange"
    @on-select="handelSelect"
  >
    <Option
      v-for="(item,index) in searchData"
      :key="index"
      class="search-ul"
      :value="item.author + '/' + item.path"
    >
      <nuxt-link :to="'/' + item.author + '/' + item.path" class="search-li user-middle">
        <Icon type="md-list-box" />
        {{ item.author }} / {{ item.title }}
        <span v-if="!item.share" class="search-private">仅自己可见</span>
      </nuxt-link>
    </Option>
  </AutoComplete>
</template>

<script>
import { _queryProject } from '@/api/article';

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
    };
  },
  methods: {
    // 搜索内容发送变化
    contentChange(value) {
      const search = value.replace(/(^\s*)|(\s*$)/g, '');
      if (search) this.asyncSearch(search);
    },
    // 异步搜索
    async asyncSearch(title) {
      if (this.loading) {
        this.asyncTitle = title;
        return;
      }
      this.loading = true;
      const params = { title };
      const { data } = await _queryProject(params);
      this.searchData = data.content;
      this.loading = false;
      if (this.asyncTitle) {
        const asyncTitle = this.asyncTitle;
        this.asyncTitle = '';
        this.asyncSearch(asyncTitle);
      }
    },
    // 处理选择
    handelSelect(value) {
      this.$router.push(`/${value}`);
    },
  },
};
</script>

<style scoped>
.search-li {
  padding: 5px 10px 5px 0;
  font-size: 14px;
  color: #1b1f23;
}
.search-li i {
  font-size: 14px;
  color: #5c6b77;
  margin: 0 10px 0 0;
}
.search-private {
  font-size: 12px;
  margin: 0 0 0 10px;
  color: #586069;
}
</style>
<style>
.public-header-search .ivu-icon-ios-close {
  cursor: pointer;
}
</style>
