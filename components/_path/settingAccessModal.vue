<template>
  <Modal v-model="modalShow" style="color:#000" width="430" footer-hide :closable="false">
    <div class="index-between-modal">
      <div style="fontSize:16px; fontWeight: 600; ">
        <span>文档协作</span>
        <span style="fontWeight:500; ">({{ storeArticle.title }})</span>
      </div>
      <Icon type="md-close" class="modal-close" size="16" @click="modalShow=false" />
    </div>
    <div class="modal-body">
      <div>
        <img src="@/assets/svg/invitation.svg" width="100%" />
      </div>
      <Select
        v-model="select"
        clearable
        filterable
        placeholder="邀请他人参与协作"
        not-found-text="没有找到匹配项"
        loading-text="加载中"
        :loading="loading"
        :remote-method="remoteMethod"
        @on-change="accessChange"
      >
        <Option
          v-for="item in userList"
          :key="item.userName"
          class="setting-access-li"
          :value="JSON.stringify(item)"
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
    <div style="margin-top:30px">
      <Button
        type="success"
        style="width:100%;height:32px;"
        :loading="buttonLoding"
        :disabled="!selectUser.userName"
        @click="addArticleUser"
      >邀请协作</Button>
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex';
import headPortraitShow from '@/components/headPortrait/show.vue';
import { _queryUser } from '@/api/query';
import { _articleInvite } from '@/api/invite';
import { debounce } from 'lodash';

export default {
  components: { headPortraitShow },
  model: {
    prop: 'modelParent',
  },
  props: {
    modelParent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
      // 用户
      userList: [],
      // 加载
      loading: false,
      // 选择用户
      selectUser: {},
      // 对话框展示
      modalShow: false,
      // 选择
      select: '',
      // 加载
      buttonLoding: false
    };
  },
  computed: {
    ...mapGetters('author', ['storeArticle']),
  },
  watch: {
    modelParent: {
      handler(value) {
        this.select = '';
        this.modalShow = value;
      },
      immediate: true,
    },
    modalShow(value) {
      this.$emit('input', value);
    },
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
      this.userList = data;
      this.loading = false;
    }, 400),
    // 选择项目时触发
    accessChange(row) {
      if (row) {
        this.selectUser = JSON.parse(row);
      } else {
        this.selectUser = {};
      }
    },
    // 添加文档成员
    async addArticleUser() {
      if (this.buttonLoding) return;
      try {
        this.buttonLoding = true;
        const params = {
          username: this.selectUser.userName,
          author: this.author,
          path: this.path,
        };
        await _articleInvite(params);
        this.modalShow = false;
        this.buttonLoding = false;
        this.$Message.success({ background: true, content: '发送成功', duration: 5, });
        this.$emit('on-success');
      } catch (err) {}
    },
  },
};
</script>
<style scoped>
.setting-access-li {
  display: flex;
  color: #000;
}
.setting-access-user {
  font-size: 16px;
  font-weight: 600;
}

.modal-body {
  margin: 20px 0 0 0;
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
.setting-access-select .ivu-select-input {
  color: #000;
}
</style>
