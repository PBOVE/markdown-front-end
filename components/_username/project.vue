/**
*
*  @author ZTiger
*
*/


<template>
  <div class="project">
    <div class="header">
      <div class="header-left">
        <Input v-model="search" placeholder="查找项目" @on-enter="handleSearch" />
      </div>
      <div class="header-right">
        <button class="row-praise" style="min-width:80px;" @click="handleSearch">搜索</button>
        <nuxt-link
          v-if="user.userName===storeUser.userName&&storeUser.authentication"
          type="success"
          class="main-success-button header-button"
          to="/new"
        >
          <Icon type="ios-copy-outline" />创 建
        </nuxt-link>
      </div>
    </div>
    <div class="content">
      <div v-for="item in projects.content" :key="item.path" class="row">
        <div class="row-left">
          <div class="row-middle row-start">
            <nuxt-link :to="'/'+user.userName+'/'+item.path" class="row-link">{{item.title}}</nuxt-link>
            <div v-if="!item.share" class="row-share">{{item.share|shareFilter}}</div>
          </div>
          <div class="row-description">{{item.description}}</div>
          <div
            class="row-time"
            :title="timeConversion(item.updateTime)"
          >{{item.updateTime|timeFilter}}</div>
        </div>
        <div class="row-right">
          <div class="row-praise row-middle row-star">
            <img v-if="item.islike" src="@/assets/images/star.png" class="row-praise-image" />
            <img v-else src="@/assets/images/unstar.png" class="row-praise-image" />
            <span v-if="item.islike">取消</span>
            <span v-else>点赞</span>
          </div>
        </div>
      </div>
    </div>
    <div class="project-footer row-middle" v-if="projects.totalElements">
      <Page :total="projects.totalElements" size="small" :page-size="10" @on-change="pageChange" />
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import selectBox from "@/components/selectBox/index.vue";

export default {
  components: { selectBox },
  props: ["projects", "user"],
  filters: {
    shareFilter(share) {
      return share ? "" : "私有项目";
    },
    timeFilter(time) {
      let dateStart = new Date(time);
      let dateEnd = new Date();
      let dateValue = dateEnd - dateStart;
      let DateValue = [1000, 60, 60, 24, 30, 12, Infinity];
      for (var i = 0; i < DateValue.length - 1; i++) {
        dateValue /= DateValue[i];
        if (dateValue < DateValue[i + 1]) {
          switch (i) {
            case 0:
              dateValue = parseInt(dateValue) + " 秒";
              break;
            case 1:
              dateValue = parseInt(dateValue) + " 分钟";
              break;
            case 2:
              dateValue = parseInt(dateValue) + " 小时";
              break;
            case 3:
              dateValue = parseInt(dateValue) + " 天";
              break;
            case 4:
              dateValue = parseInt(dateValue) + " 个月";
              break;
            case 5:
              dateValue = parseInt(dateValue) + " 年";
              break;
          }
          break;
        }
      }
      return dateValue + "前更新";
    },
  },
  data() {
    return {
      // 搜索内容
      search: this.$route.query.q,
    };
  },
  computed: {
    ...mapGetters("user", ["storeUser"]),
  },
  methods: {
    // 时间转换
    timeConversion(time) {
      const date = new Date(time);
      const completion = num => {
        return num.toString().padStart(2, "0");
      };
      return `${date.getFullYear()}年${completion(
        date.getMonth() + 1,
      )}月${completion(date.getDate())}日 ${completion(
        date.getHours(),
      )}:${completion(date.getMinutes())}`;
    },
    // 处理搜索
    handleSearch() {
      this.$router.push({
        path: `/${this.user.userName}`,
        query: {
          tab: "projects",
          q: this.search,
          page: 1,
        },
      });
    },
    // 页码改变的回调，返回改变后的页码
    pageChange(page) {
      this.$router.push({
        path: `/${this.user.userName}`,
        query: {
          tab: "projects",
          q: this.$route.query.q,
          page: page,
        },
      });
    },
  },
};
</script>


<style scoped>
.header,
.header-right {
  display: flex;
}
.header-left {
  flex: 1;
}
.header-right,
.header-button {
  margin: 0 0 0 16px;
}
.content {
  margin: 20px 0 0 0;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
  border-top: 1px solid #e1e4e8;
}
.row:last-of-type {
  border-bottom: 1px solid #e1e4e8;
}
.row-right {
  flex-shrink: 0;
  padding: 0 0 0 50px;
}
.row-link {
  font-size: 18px;
  font-weight: 600;
  color: #0366d6;
  border-bottom: 2px solid transparent;
}
.row-link:hover {
  border-bottom: 2px solid #0366d6;
}
.row-share {
  flex-shrink: 0;
  margin: 0 0 0 10px;
  padding: 0 5px;
  border: 1px solid #e1e4e8;
  border-radius: 10px;
  color: #586069;
}
.row-middle {
  display: flex;
  align-items: center;
}
.row-description {
  margin: 10px 0;
  color: #586069;
}
.row-time {
  color: #586069;
}
.row-star.row-praise {
  font-size: 0;
}
.row-star.row-praise span {
  font-size: 12px;
}
.row-praise {
  padding: 4px 12px;
  color: #24292e;
  font-size: 12px;
  background: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04),
    inset 0 1px 0 hsla(0, 0%, 100%, 0.25);
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  outline: none;
  cursor: pointer;
}
.row-praise:hover {
  background-color: #f3f4f6;
}
.row-praise-image {
  height: 16px;
  width: 16px;
  margin: 0 4px 0 0;
}
.project-footer {
  justify-content: center;
  margin: 20px 0;
}
.content-tip {
  margin: 20px auto;
  text-align: center;
  font-size: 16px;
  color: #808695;
}
@media screen and (max-width: 550px) {
  .header {
    flex-direction: column;
  }
  .header-right-select {
    margin: 0 16px 0 0;
  }
  .header-right {
    margin: 15px 0 0;
  }
  .row-right {
    padding: 0 0 0 20px;
  }
  .row-start {
    align-items: flex-start;
  }
}
</style>
