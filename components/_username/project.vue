/**
*
*  @author ZTiger
*
*/


<template>
  <div class="project">
    <div class="header">
      <div class="header-left">
        <Input v-model="search" placeholder="查找项目" />
      </div>
      <div class="header-right">
        <select-box
          v-model="select"
          class="header-right-select"
          header-title="类型"
          list-width="217px"
          default="全部"
          :list="typeList"
        />
        <nuxt-link
          v-if="userName!==storeUser.userName&&storeUser.authentication"
          type="success"
          class="main-success-button"
          to="/new"
        >
          <Icon type="ios-copy-outline" />创 建
        </nuxt-link>
      </div>
    </div>
    <div class="content">
      <div v-for="item in projects" :key="item.path" class="row">
        <div class="row-left">
          <div class="row-middle">
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
          <div class="row-praise row-middle">
            <Icon type="ios-star-outline" style="margin-right:2px;" size="14" />
            <span>点赞</span>
          </div>
        </div>
      </div>
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
      // 用户
      userName: this.$route.params.userName,
      // 搜索内容
      search: "",
      // 选择内容
      select: "全部",
      typeList: [
        { value: "全部", label: "全部" },
        { value: "typeScript", label: "typeScript" },
      ],
    };
  },
  computed: {
    ...mapGetters("user", ["storeUser"]),
  },
  methods: {
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
.header-right-select {
  margin: 0 16px;
  min-width: 120px;
}
.content {
  margin: 20px 0 0 0;
  border-top: 1px solid #e1e4e8;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: 24px 0;
  border-top: 1px solid #e1e4e8;
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
  display: inline-block;
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
.row-praise {
  padding: 4px 12px;
  color: #24292e;
  font-size: 12px;
  background: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.04),
    inset 0 1px 0 hsla(0, 0%, 100%, 0.25);
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  cursor: pointer;
}
.row-praise:hover {
  background-color: #f3f4f6;
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
}
</style>
