/**
*
*  @author ZTiger
*
*/

<template>
  <div class="issues-new-wrap">
    <div class="issues-new-left">
      <div class="issues-new-image">
        <head-portrait-show
          :images="storeImages"
          :name="storeNickName"
          :width="30"
          :height="30"
        />
      </div>
      <div class="issues-new-content">
        <div class="issues-new-content-header">
          <Input v-model="title" placeholder="标题" />
        </div>
        <div class="issues-new-content-main">
          <modify-edit ref="modifyEdit" />
        </div>
        <div class="issues-new-footer">
          <Button
            type="success"
            style="width:80px;"
            :loading="loading"
            :disabled="!title.length"
            @click="createIssues"
          >创 建</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import modifyEdit from '@/components/EditorMarkdown/modify.vue';
import { newIssues } from '@/api/issues';
import headPortraitShow from '@/components/headPortrait/show.vue';

export default {
  validate({ store }) {
    return store.state.user.data.authentication;
  },
  components: { modifyEdit, headPortraitShow },
  data() {
    return {
      // 作者
      author: this.$route.params.author,
      // 路径
      path: this.$route.params.path,
      // 留言标题
      title: '',
      // 加载
      loading: false,
    };
  },
  head() {
    return {
      title: '新建 issues ● TBS.feel',
    };
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('author', ['storeArticle']),
    ...mapGetters('user', ['storeNickName', 'storeImages', 'storeUser']),
  },
  // eslint-disable-next-line vue/order-in-components
  methods: {
    // 创建留言
    createIssues() {
      const { author, path, title } = this;
      this.loading = true;
      this.$refs.modifyEdit.handlesave(async(content) => {
        const params = { author, path, title, content };
        const { data } = await newIssues(params);
        this.$router.push(`/${author}/${path}/issues/${data.id}`);
      });
    },
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
.issues-new-content {
  flex: 1;
  position: relative;
  border: 1px solid #dcdee2;
  border-radius: 8px;
  background-color: #fff;
}
.issues-new-content::before,
.issues-new-content::after {
  content: '';
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
  height: 300px;
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
  .issues-new-content-main {
    height: auto;
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
</style>
