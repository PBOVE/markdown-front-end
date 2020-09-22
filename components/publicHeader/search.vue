/**
*
*  @author ZTiger
*
*/

<template>
  <div class="header-search">
    <div
      class="header-search-wrap"
      :style="{width:width}"
      @click.stop="handleClick"
    >
      <input
        ref="inputRef"
        v-model="inputData"
        type="text"
        class="search-input"
        placeholder="搜索"
        @blur="handleBlur"
        @keyup.up="handleUp"
        @keyup.down="handleDown"
        @keyup.enter="handleEnter"
        @input="changeInput"
      />
      <div class="button-icon-wrap main-center-middle">
        <Icon v-show="!loading" type="ios-search" />
        <Icon v-show="loading" class="serach-loading" type="ios-loading" color="#2d8cf0" />
      </div>
    </div>
    <transition name="searchList">
      <ul v-show="listShow&&searchData.length" class="header-search-list" :style="{width:width}">
        <li
          v-for="(item, index) in searchData"
          :key="index"
          class="header-search-li"
          :class="{'select-li':selectIndex===index}"
          @click.stop="handleListClick(item, index, $event)"
        >
          <span>{{ item.author }}</span>
          <span>/</span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { queryArticle } from '@/api/query';
import { debounce } from 'lodash';

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
      inputAsyncData: '',
      // 搜索数据
      searchData: [],
      // 数据加载中
      loading: false,
      asyncTitle: '',
      // 宽度
      width: 0,
      // 列表抽屉
      listShow: false,
      // 选中
      selectIndex: -1,
    };
  },
  computed: {
    ...mapGetters('user', [ 'storeUserState'])
  },
  mounted() {
    window.addEventListener('click', this.globalEvent);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.globalEvent);
  },
  methods: {
    // 异步搜索
    getRemote: debounce(async function() {
      if (!this.inputData) {
        this.listShow = false;
        this.loading = false;
        return;
      }
      const params = { title: this.inputData };
      const { data } = await queryArticle(params);
      this.selectIndex = -1;
      this.loading = false;
      this.listShow = true;
      this.searchData = data.content;
    }, 1000),

    // 注册全局事件
    globalEvent() {
      if (this.width) {
        this.width = '';
        this.listShow = false;
      }
    },
    // 处理获取焦点
    handleClick() {
      const innerWidth = window.innerWidth;
      if (innerWidth < 600) {
        // if (this.storeUserState) this.drawerShow = true;
        this.width = '100%';
      } else {
        this.width = '275px';
        this.$nextTick(() => {
          this.$refs.inputRef.focus();
        });
      }
    },

    // 失去焦点
    handleBlur() {},

    // 处理点击
    handleListClick(item) {
      const author = item.author;
      const path = item.path;
      this.$router.push(`/${author}/${path}`);
    },
    // 处理向上
    handleUp() {
      if (!this.searchData.length) return;
      if (this.selectIndex <= -1) {
        this.selectIndex = this.searchData.length - 1;
      } else {
        this.selectIndex -= 1;
      }
      if (this.selectIndex === -1) {
        this.inputData = this.inputAsyncData;
      } else {
        this.inputData = this.searchData[this.selectIndex].title;
      }
    },
    // 处理向下
    handleDown() {
      if (!this.searchData.length) return;
      if (this.selectIndex >= this.searchData.length - 1) {
        this.selectIndex = -1;
        this.inputData = this.inputAsyncData;
      } else {
        this.selectIndex += 1;
        this.inputData = this.searchData[this.selectIndex].title;
      }
    },
    // 处理按下
    handleEnter() {
      if (this.selectIndex !== -1) {
        const author = this.searchData[this.selectIndex].author;
        const path = this.searchData[this.selectIndex].path;
        this.$router.push(`/${author}/${path}`);
      } else {
        this.$router.push({
          path: '/search',
          query: { q: this.inputData }
        });
      }
    },
    // 输入框改变
    changeInput() {
      this.loading = true;
      this.inputAsyncData = this.inputData;
      this.getRemote();
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
  border-bottom: 1px solid #dcdee2;
}
.search-input::placeholder {
  color: #c5c8ce;
}
.button-icon-wrap {
  width: 32px;
  flex-shrink: 0;
}
.header-search {
  position: relative;
}
.header-search-list {
  position: absolute;
  top: 40px;
  padding: 7px 0;
  background: #fff;
  border-radius: 4px;
  list-style: none;
  box-shadow: 0 12px 32px 0 rgba(38, 38, 38, 0.16);
  z-index: 99;
}
.header-search-li {
  padding: 10px 20px;
  cursor: pointer;
  color: #626675;
}
.header-search-li:hover {
  color: #1890ff;
}
.serach-loading {
  animation: ani-demo-spin 1s linear infinite;
}
.select-li {
  color: #1890ff;
}
.searchList-enter-active,
.searchList-leave-active {
  transform-origin: top;
  transition: all 0.3s ease-in-out;
}
.searchList-enter,
.searchList-leave-to {
  transform-origin: top;
  transform: scale(1, 0);
  opacity: 0;
}
</style>
