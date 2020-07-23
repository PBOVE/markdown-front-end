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
        <Dropdown placement="bottom-start" @on-click="DropdownSelect">
          <Icon type="md-add" size="16" class="header-right-icon" />
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="(item,index) in addList"
              class="index-page-flex-middle header-list"
              :name="item.name"
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
    <div ref="mainRef" class="main scroll-hover" @scroll="mainScroll">
      <Tree :data="treeData" :load-data="loadData" :render="renderContent" />
    </div>
    <drop-down-list
      :dataList="addList"
      :left="ALeft"
      :top="ATop"
      :show="AShow"
      :scrollTop="scrollTop"
      @on-close="addClose"
      @on-open="addOpen"
    />
    <drop-down-list
      :dataList="moreList"
      :left="MLeft"
      :top="MTop"
      :show="MShow"
      :scrollTop="scrollTop"
      @on-close="MoreClose"
      @on-open="MoreOpen"
      @on-click="selectMoreList"
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
          src: require("@/assets/images/file.svg"),
          name: "新建分组",
        },
        {
          src: require("@/assets/images/note.svg"),
          name: "新建文档",
        },
      ],
      // 添加列表 偏移量
      ATop: 0,
      ALeft: 0,
      AShow: false,
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
      // 更新选中的节点
      selectRow: "",
      selectDom: "",
      // 滚动条 滚动
      scrollTop: 0,
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
      treeId: 0,
    });
  },
  methods: {
    // 滚动条滚动
    mainScroll() {
      this.scrollTop = this.$refs.mainRef.scrollTop;
    },
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
      if (data.treeId !== 0) {
        domArray.push(this.renderFileOrOther(h, data));
      }
      return h(
        "div",
        {
          class: ["tree-row-wrap"],
          attrs: { id: `tree-${data.treeId}-wrap` },
          on: { dblclick: () => this.onDblClick(data) },
        },
        domArray,
      );
    },
    // 当前节点渲染内容
    renderData(h, { root, node, data }) {
      let domArray = [
        h("div", { class: ["tree-row"] }, [
          h("i", {
            class: [`tree-row-icon-${data.type}`],
            style: { marginRight: "8px" },
          }),
          h("Input", {
            attrs: { id: `tree-${data.treeId}-input` },
            props: {
              value: data.title,
              size: "small",
            },
            on: {
              "on-blur": () => this.handleInputTitle(data),
              "on-enter": () => this.handleInputTitleEnter(data),
            },
          }),
        ]),
      ];
      domArray.push(this.renderFileOrOther(h, data));
      return h(
        "div",
        {
          class: ["tree-row-wrap"],
          attrs: { id: `tree-${data.treeId}-wrap` },
          on: { dblclick: () => this.onDblClick(data) },
        },
        domArray,
      );
    },
    // 渲染文件还是其他
    renderFileOrOther(h, data) {
      if (data.type === "file") {
        return h("div", { class: ["tree-row"] }, [
          h("Icon", {
            class: ["tree-row-icon"],
            props: { type: "md-add" },
            attrs: { id: `tree-${data.treeId}-add` },
            nativeOn: {
              mouseenter: () => this.handleClickEvent(data, "A"),
              mouseleave: () => this.addClose(),
            },
          }),
          h("Icon", {
            class: ["tree-row-icon"],
            props: { type: "md-more" },
            nativeOn: {
              mouseenter: () => this.handleClickEvent(data, "M"),
              mouseleave: () => this.MoreClose(),
            },
          }),
        ]);
      }
      return h("div", { class: ["tree-row"] }, [
        h("Icon", {
          class: ["tree-row-icon"],
          props: { type: "md-more" },
          nativeOn: {
            mouseenter: () => this.handleClickEvent(data, "M"),
            mouseleave: () => this.MoreClose(),
          },
        }),
      ]);
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
      const { target, pageY } = event;
      const pos = this.$elementOffset(target);
      this[`${type}Top`] = pos.top;
      this[`${type}Left`] = pos.left;
      this[`${type}Show`] = true;
      const nodeId = node.treeId;
      this.selectRow = node;
      this.selectDom = document.querySelector(
        `#tree-${this.selectRow.treeId}-wrap`,
      ).parentNode;
      this.selectDom.classList.add("tree-select");
    },
    // 添加 菜单 关闭
    addClose() {
      this.AShow = false;
      this.selectDom.classList.remove("tree-select");
    },
    // 添加 菜单 打开
    addOpen() {
      this.AShow = true;
      this.selectDom.classList.add("tree-select");
    },
    // 更多 菜单 关闭
    MoreClose() {
      this.MShow = false;
      this.selectDom.classList.remove("tree-select");
    },
    // 添加 菜单 打开
    MoreOpen() {
      this.MShow = true;
      this.selectDom.classList.add("tree-select");
    },
    // 处理双击事件
    onDblClick(node) {
      const data = JSON.parse(JSON.stringify(node));
      if (data.loading !== undefined && !data.children.length) {
        this.$set(node, "loading", true);
        this.loadData(node, (child) => {
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
      data.forEach((item) => {
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
    // 处理下拉列表选择
    async DropdownSelect(name) {
      const params = {
        author: this.author,
        path: this.path,
        name: "新建分组",
      };
      if (name === "新建分组") {
        params.name = "新建分组";
        params.type = "file";
      } else if (name === "新建文档") {
        params.name = "新建文档";
        params.type = "note";
      }
      const { data } = await this.$request.createPost(params);
      const [newNode] = this.handleDate([data]);
      newNode.render = this.renderData;
      this.treeData.push(newNode);
      this.$nextTick(() => {
        const inputDom = this.getInputDom(newNode.treeId);
        inputDom.focus();
      });
    },
    // 选中更多列表
    selectMoreList(name) {
      if (name === "重命名") this.modifyTitle(this.selectRow);
    },
    // 修改名称
    modifyTitle(node) {
      this.$set(node, "render", this.renderData);
      this.$nextTick(() => {
        const inputDom = this.getInputDom(node.treeId);
        inputDom.focus();
      });
    },
    // 输入框 enter
    handleInputTitleEnter(data) {
      this.$nextTick(() => {
        const inputDom = this.getInputDom(data.treeId);
        inputDom.blur();
      });
    },
    // 输入框失去焦点
    async handleInputTitle(data) {
      const inputDom = this.getInputDom(data.treeId);
      const { value } = inputDom;
      if (value !== data.title) {
        await this.updateNodeName(value, data.id);
        this.$set(data, "title", value);
      }
      this.$set(data, "render", this.renderContent);
      console.log(value, data);
    },
    // 获取inputdom
    getInputDom(id) {
      const treeId = `#tree-${id}-input`;
      return document.querySelector(treeId).querySelector("input");
    },
    // 更新节点名称
    async updateNodeName(name, id) {
      const params = { author: this.author, path: this.path, name, id };
      const data = await this.$request.updatePost(params);
      console.log(data);
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
</style>

