/**
*
*  @author ZTiger
*
*/


<template>
  <div class="nick-name-wrap">
    <public-header />
    <div class="nick-name-header">
      <div class="eh-content">
        <nuxt-link to="/user/personal">
          <Icon type="md-arrow-round-back" class="eh-content-icon curpoin" />
        </nuxt-link>
        <div>名称</div>
      </div>
    </div>
    <div class="nick-name-content">
      <div class="nick-name-content-title">对您的名称所做的更改将反映在您的 Freedom 帐号中。</div>
      <div class="nick-name-box">
        <div class="nick-name-content-title" style="padding:18px 0;">更改昵称</div>
        <div class="nick-name-title">
          <span class="nick-name-account">{{storeNickName}}</span>
          <Icon type="md-create" class="nick-name-title-icon curpoin" @click="openModal" />
        </div>
      </div>
    </div>
    <div class="Editmodal-warp editmodal" v-show="modalShow">
      <div class="Editmodal-box">
        <div class="Editmodal-box-header">
          <span class="Editmodal-title">更改昵称</span>
          <div @click="modalShow=false" class="curpoin">
            <Icon type="md-close" size="16" />
          </div>
        </div>
        <div class="Editmodal-box-title">昵称</div>
        <div class="Editmodal-box-main">
          <input
            type="text"
            v-model="nickName"
            class="Editmodal-input"
            ref="FullNameI"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown.enter="updateNickName"
          />
          <div class="Editmodal-hr" ref="FullName" />
        </div>
        <div class="editmodal-f">
          <Button type="text" @click="modalShow=false">取消</Button>
          <Button type="primary" :loading="loading" @click="updateNickName">完成</Button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import publicHeader from "@/components/publicHeader/index.vue";

export default {
  transition: "fade",
  components: { publicHeader },
  data() {
    return {
      // 对话框
      modalShow: false,
      // 设置按钮为加载中状态
      loading: false,
      // 昵称
      nickName: "",
    };
  },
  head() {
    return {
      title: "名称 ● Freedom",
    };
  },
  computed: {
    ...mapGetters("user", ["storeNickName"]),
  },
  methods: {
    // 打开对话框
    openModal() {
      this.modalShow = true;
      this.nickName = this.storeNickName;
      this.$nextTick(() => {
        this.$refs.FullNameI.focus();
      });
    },
    // 发送修改
    async updateNickName() {
      if (this.loading) return;
      if (this.nickName === this.storeNickName) {
        this.modalShow = false;
        return;
      }
      try {
        this.loading = true;
        const { data } = await this.$request.updataUserMsg({
          nickName: this.nickName,
        });
        this.$store.commit("user/setUser", data);
        this.modalShow = false;
      } catch (err) {}
      this.loading = false;
    },
    // 获取焦点
    handleFocus() {
      this.$refs.FullName.classList.add("Editmodal-color");
    },
    // 失去焦点
    handleBlur() {
      this.$refs.FullName.classList.remove("Editmodal-color");
    },
  },
};
</script>


<style scoped>
.nick-name-content {
  padding: 0 18px;
}
.nick-name-content,
.eh-content {
  margin: 0 auto;
  max-width: 660px;
}
.nick-name-header {
  padding: 0 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.eh-content {
  display: flex;
  align-items: center;
  padding: 0 0 5px 0;
  font-size: 23px;
  color: #202124;
}
.eh-content-icon {
  margin: 0 10px 0 0;
  height: 34px;
  width: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 24px;
  color: #000;
}
.eh-content-icon:active {
  border-radius: 50%;
  background: #dcdee2;
}
.nick-name-content-title {
  padding: 24px 0;
  color: rgba(0, 0, 0, 0.65);
}
.nick-name-box {
  padding: 24px;
  border: 1px solid #dadce0;
  border-radius: 8px;
}
.nick-name-account {
  margin: 0 10px 0 0;
  font-size: 17px;
  font-weight: 500;
  color: #3c4043;
}
.nick-name-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nick-name-title-icon {
  font-size: 19px;
  color: #515a6e;
}
.Editmodal-warp {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
.editmodal {
  background: rgba(0, 0, 0, 0.502);
}
.Editmodal-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 230px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24);
  animation: showModal 0.5s;
}
.Editmodal-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px 20px;
}
.Editmodal-box-title {
  padding: 10px 20px 0px;
}
.Editmodal-box-main {
  margin: 0px 20px 10px;
}
.Editmodal-hr {
  width: 100%;
  height: 2px;
  background: rgba(0, 0, 0, 0.12);
}
.Editmodal-color {
  transition: all 1s;
  background: #4285f4;
}
.Editmodal-error {
  transition: all 1s;
  background: #ed4014;
}
.Editmodal-title {
  font-size: 18px;
  color: #3c4043;
}
.Editmodal-input {
  outline: none;
  border: none;
  width: 100%;
  height: 30px;
}
.editmodal-f {
  padding: 30px 20px 0;
  height: 80px;
  text-align: right;
}
.editmodal-f button {
  margin-left: 20px;
}
.curpoin {
  cursor: pointer;
}
@keyframes showModal {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@media screen and (max-width: 400px) {
  .Editmodal-box {
    width: 80%;
  }
}
</style>

