
<template>
  <div class="setting-access-wrap">
    <div class="setting-access-header">访问设置</div>
    <Divider />
    <Select
      v-model="userSelect"
      clearable
      filterable
      class="setting-access-select"
      placeholder="添加文档成员"
      not-found-text="没有找到匹配项"
      loading-text="加载中"
      :loading="loading"
      :remote-method="remoteMethod"
    >
      <Option
        v-for="item in userList"
        :key="item.userName"
        class="setting-access-li"
        :value="item.userName"
        :label="item.userName"
      >
        <head-portrait-show :images="item.images" :name="item.nickName" :width="30" :height="30" />
        <div style="margin:0 0 0 10px;">
          <div class="setting-access-user">{{ item.userName }}</div>
          <div style="color:#515a6e;">{{ item.nickName }}</div>
        </div>
      </Option>
    </Select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { _queryUser } from '@/api/query';
import { debounce } from 'lodash';
import headPortraitShow from '@/components/headPortrait/show.vue';

export default {
  components: { headPortraitShow },
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
      // 用户选择
      userSelect: '',
      // 用户
      userList: [],
      // 加载
      loading: false,
    };
  },
  computed: {
    ...mapGetters('author', ['storeArticle']),
  },
  methods: {
    remoteMethod(query) {
      this.debounceSearch(query.replace(/(^\s*)|(\s*$)/g, ''));
    },
    // 防抖
    debounceSearch: debounce(async function(account) {
      if (!account) return;
      this.loading = true;
      const { data } = await _queryUser({ account });

      this.loading = false;
      this.userList = data;
    }, 400),
  },
};
</script>

<style scoped>
.setting-access-header {
  font-size: 24px;
  padding: 0 0 8px;
}
.setting-access-li {
  display: flex;
  color: #000;
}
.setting-access-user {
  font-size: 16px;
  font-weight: 600;
}
</style>
<style >
.setting-access-select {
  width: 400px;
  height: 33px;
}
.setting-access-select .ivu-select-selection {
  background: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04),
    inset 0 1px 0 hsla(0, 0%, 100%, 0.25);
  border-radius: 4px;
  outline: none;
}
.setting-access-select .ivu-select-input{
  color: #000;
}
</style>
