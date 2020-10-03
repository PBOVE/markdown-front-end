/**
*
*  @author ZTiger
*
*/

<template>
  <div class="header-search">
    <div class="header-search-wrap">
      <input
        ref="inputRef"
        v-model="inputData"
        type="text"
        class="search-input"
        placeholder="搜索"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.up="handleUp"
        @keyup.down="handleDown"
        @keyup.enter="handleEnter"
      />
      <div class="button-icon-wrap main-center-middle">
        <Icon v-show="!loading" type="ios-search" />
        <Icon
          v-show="loading"
          class="serach-loading"
          type="ios-loading"
          color="#2d8cf0"
        />
      </div>
    </div>
    <transition name="searchList">
      <ul v-show="listShow && searchData.length && !mandatory" class="header-search-list">
        <li
          v-for="(item, index) in searchData"
          :key="index"
          class="header-search-li"
          :class="{ 'select-li': selectIndex === index }"
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
  data() {
    return {
      // 输入数据
      inputData: '',
      inputAsyncData: '',
      // 搜索数据
      searchData: [],
      // 数据加载中
      loading: false,
      // 列表抽屉
      listShow: false,
      // 选中
      selectIndex: -1,
      // 强制不显示
      mandatory: false
    };
  },
  computed: {
    ...mapGetters('user', ['storeUserState']),
  },
  watch: {
    inputData(value) {
      this.loading = true;
      this.mandatory = false;
      this.inputAsyncData = value;
      this.getRemote();
    }
  },
  methods: {
    // 异步搜索
    getRemote: debounce(async function() {
      if (!this.inputData) {
        this.listShow = false;
        this.loading = false;
        return;
      }
      const params = { title: this.inputData, size: 6 };
      const { data } = await queryArticle(params);
      this.selectIndex = -1;
      this.loading = false;
      this.listShow = true;
      this.searchData = data.content;
    }, 500),

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
      } else if (this.inputData) {
        this.mandatory = true;
        this.$router.push({
          path: '/search',
          query: { q: this.inputData },
        });
      }
    },
    // 处理失去焦点
    handleBlur() {
      this.mandatory = true;
      // this.
    },
    // 处理获取焦点
    handleFocus() {
      this.mandatory = false;
    }
  },
};
</script>

<style scoped>
.header-search-wrap {
  display: flex;
  height: 32px;
  width: 300px;
  transition: all 0.5s ease-in-out;
  cursor: pointer;
  border-color: #dcdee2;
  border-bottom: 1px solid #dcdee2;
}
.search-input {
  flex: 1;
  width: 0;
  outline: none;
  border-width: 0;
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
   width: 300px;
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
  animation: ani-main-spin 1s linear infinite;
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
@media screen and (max-width: 660px) {
  .header-search-list,
  .header-search-wrap {
    width: 90%;
  }
}
</style>
