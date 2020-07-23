/**
*
*  @author ZTiger
*
*/


<template>
  <div class="edit-left-wrap side-nov">
    <div class="header index-page-flex-middle">
      <div class="header-left">目录</div>
      <div class="header-right">
        <Dropdown placement="bottom-start">
          <Icon type="md-add" size="16" class="header-right-icon" />
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="(item,index) in addList"
              class="index-page-flex-middle header-list"
              :key="index"
            >
              <img :src="item.src" class="header-list-svg" />
              <span>{{item.name}}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Icon type="md-more" size="16" class="header-right-icon" />
      </div>
    </div>
    <div class="main scroll-hover">
      <Tree
        :data="treeData"
        :load-data="loadData"
        :render="renderContent"
        @on-toggle-expand="toggleExpand"
      />
    </div>
    <drop-down-list
      :dataList="addList"
      :left="ALeft"
      :top="ATop"
      :show="AShow"
      @on-close="addClose"
    />
    <drop-down-list
      :dataList="moreList"
      :left="MLeft"
      :top="MTop"
      :show="MShow"
      @on-close="MoreClose"
    />
  </div>
</template>


<script>
import dropDownList from "@/components/dropDownList/index.vue";

export default {
  components: { dropDownList },
  data() {
    return {
      // 树数据
      treeData: [],
      // 作者 和 路径
      author: this.$route.params.author,
      path: this.$route.params.path,
      // 树节点
      treeId: 0,
      // 添加列表
      addList: [
        {
          src: require("@/assets/images/folder.svg"),
          name: "新建分组",
        },
        {
          src: require("@/assets/images/notebook.svg"),
          name: "新建文档",
        },
      ],
      // 添加列表 偏移量
      ATop: 0,
      ALeft: 0,
      AShow: false,
      ADom: "",
      // 更多列表
      moreList: [
        {
          src: require("@/assets/images/rename.svg"),
          name: "重命名",
        },
        {
          src: require("@/assets/images/delete.svg"),
          name: "删除",
        },
      ],
      // 更多列表 偏移量
      MTop: 0,
      MLeft: 0,
      MShow: false,
      MDom: "",
    };
  },
  created() {
    let { list } = this.$store.state.author.project;
    list = JSON.parse(JSON.stringify(list));
    list.unshift({ name: "首页", type: "note", _id: 0 });
    this.treeData = this.handleDate(list);
    this.$set(this.treeData, 0, {
      title: "首页",
      type: "note",
      id: 0,
      selected: true,
    });
  },
  methods: {
    // 自定义渲染内容
    renderContent(h, { root, node, data }) {
      let domArray = [
        h("div", { class: ["tree-row"] }, [
          h("i", {
            class: [`tree-row-icon-${data.type}`],
            style: { marginRight: "8px" },
          }),
          h("span", data.title),
        ]),
      ];
      if (data.type === "file") {
        domArray.push(
          h("div", { class: ["tree-row"] }, [
            h("Icon", {
              class: ["tree-row-icon"],
              props: { type: "md-add" },
              attrs: { id: `tree-${data.treeId}-add` },
              on: { click: () => this.handleClickEvent(data, "A") },
            }),
            h("Icon", {
              class: ["tree-row-icon"],
              props: { type: "md-more" },
              on: { click: () => this.handleClickEvent(data, "M") },
            }),
          ]),
        );
      } else {
        domArray.push(
          h("div", { class: ["tree-row"] }, [
            h("Icon", {
              class: ["tree-row-icon"],
              props: { type: "md-more" },
              on: { click: () => this.handleClickEvent(data, "M") },
            }),
          ]),
        );
      }
      return h(
        "div",
        {
          class: ["tree-row-wrap"],
          attrs: {
            id: `tree-${data.treeId}-wrap`,
          },
          on: { dblclick: () => this.onDblClick(data) },
        },
        domArray,
      );
    },
    // 展开和收起子列表时触发
    toggleExpand(node) {
      console.log(node);
    },
    // 异步加载子节点
    async loadData(node, callback) {
      const params = { author: this.author, path: this.path };
      const { data } = await this.$request.queryPostList(node.id, params);
      const childData = this.handleDate(data);
      callback(childData);
    },
    // 处理 点击 事件
    handleClickEvent(node, type) {
      const event = window.event;
      const { target } = event;
      const pos = this.$elementOffset(target);
      this[`${type}Top`] = pos.top;
      this[`${type}Left`] = pos.left;
      this[`${type}Show`] = true;
      const nodeId = node.treeId;
      this[`${type}Dom`] = document.querySelector(
        `#tree-${nodeId}-wrap`,
      ).parentNode;
      this[`${type}Dom`].classList.add("tree-select");
    },
    // 添加菜单关闭
    addClose() {
      this.AShow = false;
      this.ADom.classList.remove("tree-select");
    },
    // 更多菜单关闭
    MoreClose() {
      this.MShow = false;
      this.MDom.classList.remove("tree-select");
    },
    // 处理双击事件
    onDblClick(node) {
      const data = JSON.parse(JSON.stringify(node));
      if (data.loading !== undefined && !data.children.length) {
        this.$set(node, "loading", true);
        this.loadData(node, child => {
          this.$set(node, "children", child);
          this.$set(node, "loading", false);
          this.$set(node, "expand", true);
        });
      } else {
        this.$set(node, "expand", !node.expand);
      }
    },
    // 处理数据
    handleDate(data) {
      const childData = [];
      data.forEach(item => {
        const child = {
          title: item.name,
          id: item._id,
          treeId: this.treeId++,
          type: item.type,
          disabled: item.type === "file" ? true : false,
        };
        if (item.isParent) {
          child.loading = false;
          child.children = [];
        }
        childData.push(child);
      });
      return childData;
    },
  },
};
</script>


<style scoped>
.side-nov {
  width: 20%;
  max-width: 300px;
}
.edit-left-wrap {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
}
.header {
  height: 41px;
  padding: 0px 6px 0px 24px;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
}
.main {
  flex: auto;
  height: 0;
  padding: 10px;
  overflow: auto;
  user-select: none;
}
.header-right-icon {
  width: 34px;
  height: 34px;
  line-height: 34px;
  border-radius: 4px;
  transition: all 0.2s linear 0s;
  margin: 0 0 0 4px;
  cursor: pointer;
}
.header-right-icon:hover {
  background: #dcdee2;
}
.header-list {
  color: #000;
}
.header-list-svg {
  margin: 0 7px 0 0;
  width: 18px;
  height: 18px;
}
.append-menu {
  position: fixed;
  left: 20px;
  top: 800px;
  padding: 5px 0;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
.append-menu-list {
  padding: 7px 10px;
  cursor: pointer;
}
.append-menu-list:hover {
  background: #f3f3f3;
}
</style>

