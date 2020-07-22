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
        <Dropdown>
          <Icon type="md-add" size="16" class="header-right-icon" />
          <DropdownMenu slot="list">
            <DropdownItem class="index-page-flex-middle header-list">
              <img src="@/assets/images/folder.svg" class="header-list-svg" />
              <span>文件夹</span>
            </DropdownItem>
            <DropdownItem class="index-page-flex-middle header-list">
              <img src="@/assets/images/notebook.svg" class="header-list-svg" />
              <span>记事本</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Icon type="md-more" size="16" class="header-right-icon" />
      </div>
    </div>
    <div class="main scroll-hover">
      <Tree
        :data="treeData"
        @on-toggle-expand="toggleExpand"
        :load-data="loadData"
        :render="renderContent"
      />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 树
      treeData: [],
      author: this.$route.params.author,
      path: this.$route.params.path,
    };
  },
  created() {
    let { list } = this.$store.state.author.project;
    list = JSON.parse(JSON.stringify(list));
    list.unshift({ name: "ReadMe", type: "note", _id: 0 });
    this.treeData = this.handleDate(list);
    this.$set(this.treeData, 0, {
      title: "ReadMe",
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
              on: {
                click: () => {
                  this.append(data);
                },
              },
            }),
            h("Icon", {
              class: ["tree-row-icon"],
              props: { type: "md-more" },
            }),
          ]),
        );
      } else {
        domArray.push(
          h("div", { class: ["tree-row"] }, [
            h("Icon", {
              class: ["tree-row-icon"],
              props: { type: "md-more" },
            }),
          ]),
        );
      }
      return h(
        "div",
        {
          class: ["tree-row-wrap"],
          on: {
            dblclick: () => {
              this.onDblClick(data);
            },
          },
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
    // 添加节点
    append(node) {
      console.log(node);
    },
    // 处理双击事件
    onDblClick(node) {
      const data = JSON.parse(JSON.stringify(node));
      if (data.loading !== undefined && !data.children.length) {
        this.$set(node, "loading", true);
        this.loadData(node, child => {
          this.$set(node, "children", child);
          this.$set(node, "loading", false);
          this.$nextTick(() => {
            this.$set(node, "expand", true);
          });
        });
      } else {
        this.$set(node, "expand", !node.expand);
      }
      // this.$set(node, "loading", !node.loading);

      //
      console.log(1);
    },
    // 处理数据
    handleDate(data) {
      const childData = [];
      data.forEach(item => {
        const child = {
          title: item.name,
          id: item._id,
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
  padding: 6px 6px 6px 24px;
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
  width: 28px;
  height: 28px;
  line-height: 28px;
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

