
<template>
  <div class="setting-access-wrap">
    <div class="setting-access-header">访问设置</div>
    <Divider />

    <div style="margin:20px 0;">
      <Button type="success" @click="modalShow=true">邀请协作</Button>
    </div>
    <setting-access-modal v-model="modalShow" @on-success="userAddSuccess" />
    <div class="access-border">
      <div v-for="(item,index) in cooperation" :key="item.userName" class="box-row">
        <head-portrait-show :images="item.images" :name="item.nickName" :width="30" :height="30" />
        <div class="index-between-modal" style="margin:0 0 0 10px; flex:1;">
          <div>
            <div class="setting-access-user">{{ item.userName }}</div>
            <div style="color:#515a6e;">{{ item.nickName }}</div>
          </div>
          <div class="access-delete" @click="deleteAccess(item,index)">
            <img src="@/assets/svg/trash.svg" width="20px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { _queryArticleUser, _deleteArticleUser } from '@/api/article';
import headPortraitShow from '@/components/headPortrait/show.vue';
import settingAccessModal from '@/components/_path/settingAccessModal.vue';

export default {
  components: { settingAccessModal, headPortraitShow },
  async asyncData({ params }) {
    const { author, path } = params;
    const { data: cooperation } = await _queryArticleUser({ author, path });
    return { cooperation };
  },
  data() {
    return {
      author: this.$route.params.author,
      path: this.$route.params.path,
      // 展示
      modalShow: false,
    };
  },
  computed: {
    ...mapGetters('author', ['storeArticle']),
  },
  methods: {
    // 删除
    deleteAccess(item, index) {
      this.$Modal.confirm({
        title: `删除 ${item.userName}`,
        content: '您 确 定 要 删 除 该 协 作 者 吗 ?',
        loading: true,
        okText: '确定',
        cancelText: '取消',
        onOk: async() => {
          const { author, path } = this;
          await _deleteArticleUser({ author, path, username: item.userName });
          this.$delete(this.cooperation, index);
          this.$Modal.remove();
        },
      });
    },
    // 添加用户成功
    async userAddSuccess() {
      const { author, path } = this;
      const { data } = await _queryArticleUser({ author, path });
      this.cooperation = data;
    },
  },
};
</script>

<style scoped>
.setting-access-header {
  font-size: 24px;
  padding: 0 0 8px;
}
.access-border {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
}
.box-row {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
.box-row:not(:last-of-type) {
  border-bottom: 1px solid #e1e4e8;
}
.setting-access-user {
  font-size: 16px;
  font-weight: 600;
}
.access-delete {
  height: 30px;
  width: 30px;
  padding: 5px;
  border-radius: 8px;
  transition: all 0.4s;
  cursor: pointer;
}
.access-delete:hover {
  background: #e8eaec;
}
</style>
