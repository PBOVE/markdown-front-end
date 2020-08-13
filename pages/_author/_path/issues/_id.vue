/**
*
*  @author ZTiger
*
*/

<template>
  <div class="issues-details-wrap">
    <div class="issues-details-header">
      <div class="header-title-wrap index-page-flex-middle">
        <div class="header-title index-text-hidden">{{ title }}</div>
        <div style="header-right">
          <div
            v-if="storeUserState&&(storeUserName === createUser.userName||storeUserName === author)"
            class="main-success-button index-page-margin-left-16"
          >
            <Icon type="ios-create-outline" />编辑
          </div>
        </div>
      </div>
      <div style="font-size:14px; color:#586069; margin-top:10px;">
        <span>{{ createTime|TimeFilter }}</span>
        <span>{{ createUser.userName }} 创建</span>
      </div>
    </div>
    <Divider />
    <div class="issues-details">
      <div class="issues-details-left">
        <issues-card
          class="issues-box"
          :images="createUser.images"
          :user-name="createUser.userName"
          :create-time="createTime"
          :content="content"
        />
        <issues-card
          v-for="item in answer"
          :key="item.id"
          class="issues-box"
          :images="item.user.images"
          :user-name="item.user.userName"
          :create-time="item.time"
          :content="item.content"
        />
        <Divider class="issues-details-divider" />
        <issues-border
          v-if="storeUserState&&storeUser.authentication"
          class="issues-box"
          :user-name="storeUser.nickName"
          :images="storeUser.images"
        >
          <div class="issues-details-edit-wrap">
            <div class="issues-details-edit">
              <modify-edit ref="modifyEdit" v-model="editContent" />
            </div>
            <div class="issues-details-edit-footer">
              <Button
                type="success"
                :disabled="disabled"
                :loading="loading"
                @click="handleComment"
              >评 论</Button>
            </div>
          </div>
        </issues-border>
      </div>
      <div class="issues-details-right">
        <div class="issues-right-title">发起者</div>
        <div class="index-page-flex-middle">
          <div style="font-size:16px;color:#515a6e;">{{ createUser.userName }}</div>
        </div>
        <Divider />
        <div class="issues-right-title">参与者</div>
        <div class="index-page-flex-middle">
          <nuxt-link
            v-for="(value,key) in participants"
            :key="key"
            class="participants"
            :to="'/'+key"
            :title="key"
          >
            <img v-if="value" class="main-user-image" :src="imageLink + value" />
            <div v-else class="main-user-portrait">{{ key|filterNume }}</div>
          </nuxt-link>
        </div>
        <Divider />
        <div
          v-if="storeUserState&&(storeUserName === createUser.userName||storeUserName === author)"
        >
          <Button type="error" style="width:100%;" @click="handleDelete">删除</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { _issuesDetails, _comment, _deleteIssues } from '@/api/issues';
import issuesCard from '@/components/_path/issuesCard.vue';
import issuesBorder from '@/components/_path/issuesBorder.vue';
import modifyEdit from '@/components/EditorMarkdown/modify.vue';

export default {
  components: { issuesCard, issuesBorder, modifyEdit },
  validate({ params }) {
    const { id } = params;
    const reg = new RegExp('^[0-9a-fA-F]{24}$');
    return reg.test(id);
  },
  filters: {
    filterNume(name) {
      return name ? name[0].toUpperCase() : '';
    },
  },
  async asyncData({ params }) {
    const { id } = params;
    const { data: details } = await _issuesDetails(id);
    const { answer, createUser, title, createTime, content } = details;
    const participants = {};
    participants[createUser.userName] = createUser.images;
    answer.forEach(el => (participants[el.user.userName] = el.user.images));

    return { answer, createUser, createTime, content, title, participants };
  },
  data() {
    return {
      loading: false,
      // 禁止输入
      disabled: true,
      // 输入的内容
      editContent: '',
      // 留言 id
      author: this.$route.params.author,
      path: this.$route.params.path,
      id: this.$route.params.id,
      // 连接
      imageLink: '/api/storage/preview/',
    };
  },
  computed: {
    ...mapGetters('user', ['storeUser', 'storeUserState', 'storeUserName']),
  },
  watch: {
    editContent(value) {
      this.disabled = value.length === 0;
    },
  },
  methods: {
    // 处理评论
    async handleComment() {
      this.loading = true;
      const { data } = await _comment(this.id, this.editContent);
      this.editContent = '';
      this.loading = false;
      this.answer.push(data);
      this.$set(this.participants, data.user.userName, data.user.images);
    },
    // 处理删除
    handleDelete() {
      this.$Modal.confirm({
        title: '提示',
        content: '您确定要删除此留言吗?',
        loading: true,
        okText: '确定',
        cancelText: '取消',
        onOk: async() => {
          await _deleteIssues(this.id);
          this.$Modal.remove();
          this.$router.push(`/${this.author}/${this.path}/issues`);
        },
      });
    },
  },
};
</script>

<style scoped>
.issues-details {
  display: flex;
}
.issues-details-left {
  flex: 1;
}
.issues-details-right {
  flex-shrink: 0;
  margin: 0 0 0 32px;
  width: 25%;
}
.header-title-wrap {
  justify-content: space-between;
}
.header-title {
  width: 75%;
  font-size: 32px;
}
.main-success-button {
  height: 32px;
}
.issues-box {
  margin: 40px 0 0;
  padding: 0 20px;
}
.issues-box:first-of-type {
  margin: 0;
}
.issues-details-divider {
  height: 2px;
}
.issues-details-edit {
  height: 300px;
}
.issues-details-edit-wrap {
  padding: 17px 0 20px;
}
.issues-details-edit-footer {
  padding: 0 20px;
  text-align: right;
}
.issues-right-title {
  margin: 10px 0;
  font-size: 15px;
  font-weight: 600;
}
.participants {
  margin: 0 10px 0 0;
  font-size: 0px;
  border: 3px solid transparent;
}
.participants:hover {
  border-color: #c5c8ce;
  border-radius: 50%;
}
@media screen and (max-width: 1240px) {
  .issues-details-wrap {
    padding: 0 20px;
  }
  .issues-details-right {
    width: 30%;
  }
}
@media screen and (max-width: 800px) {
  .issues-details-right {
    display: none;
  }
  .issues-details-left {
    width: 100%;
  }
  .issues-box {
    padding: 0;
  }
}
</style>
