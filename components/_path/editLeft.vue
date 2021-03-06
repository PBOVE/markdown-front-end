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
              :key="index"
              class="index-page-flex-middle header-list"
              :name="item.name"
            >
              <img :src="item.src" class="header-list-svg" />
              <span>{{ item.name }}</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <div ref="mainRef" class="main scroll-hover" @scroll="mainScroll">
      <Tree
        :data="treeData"
        :load-data="loadData"
        :render="renderContent"
        @on-select-change="selectTreeNode"
      />
    </div>
    <drop-down-list
      :data-list="addList"
      :left="ALeft"
      :top="ATop"
      :show="AShow"
      :scroll-top="scrollTop"
      @on-close="addClose"
      @on-open="addOpen"
      @on-click="selectAddList"
    />
    <drop-down-list
      :data-list="moreList"
      :left="MLeft"
      :top="MTop"
      :show="MShow"
      :scroll-top="scrollTop"
      @on-close="MoreClose"
      @on-open="MoreOpen"
      @on-click="selectMoreList"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { queryPostList, newPost, updatePost, deletePost } from '@/api/post';
import dropDownList from '@/components/dropDownList/index.vue';

export default {
  components: { dropDownList },
  data() {
    return {
      // 树数据
      treeData: [],
      // 作者 和 路径
      author: this.$route.params.author,
      path: this.$route.params.path,
      id: this.$route.params.id,
      // 树节点
      treeId: 0,
      // 添加列表
      addList: [
        { src: require('@/assets/svg/file.svg'), name: '新建分组', },
        { src: require('@/assets/svg/note.svg'), name: '新建文档', },
      ],
      // 添加列表 偏移量
      ATop: 0,
      ALeft: 0,
      AShow: false,
      // 更多列表
      moreList: [
        { src: require('@/assets/svg/rename.svg'), name: '重命名' },
        { src: require('@/assets/svg/delete.svg'), name: '删除', },
      ],
      // 更多列表 偏移量
      MTop: 0,
      MLeft: 0,
      MShow: false,
      // 排序列表
      sortList: [
        { name: '创建时间' },
        { name: '更新时间' },
        { name: '文档名称' },
      ],
      // 更新选择的节点
      selectData: '',
      selectRoot: '',
      selectDom: '',
      selectNode: '',
      // 滚动条 滚动
      scrollTop: 0,
      // 加载标志位
      loading: false,
      // 选中的
      selected: 0,
      selectedData: '',
    };
  },
  computed: {
    ...mapGetters('author', ['storeSelectPost', 'storeArticleList']),
  },
  watch: {
    $route(to) {
      const { id } = to.params;
      if (!id) {
        this.$set(this.selectedData, 'selected', false);
        this.$set(this.treeData[0], 'selected', true);
        this.selected = 0;
      }
    },
  },
  created() {
    let list = this.storeArticleList;
    list = JSON.parse(JSON.stringify(list));
    this.treeData = this.handleDate(list);
  },
  methods: {
    ...mapMutations('author', ['setSelectPost']),
    // 滚动条滚动
    mainScroll() {
      this.scrollTop = this.$refs.mainRef.scrollTop;
    },
    // 自定义渲染内容
    renderContent(h, { root, node, data }) {
      const domArray = [
        h('div', { class: ['tree-row', 'index-text-hidden'] }, [
          h('i', {
            class: [`tree-row-icon-${data.type}`],
            style: { marginRight: '8px' },
          }),
          h(
            'div',
            { class: ['index-text-hidden', 'tree-row-title'] },
            data.title,
          ),
        ]),
      ];
      if (data.treeId !== 0) {
        domArray.push(this.renderFileOrOther(h, { root, node, data }));
      }
      return h(
        'div',
        {
          class: ['tree-row-wrap'],
          attrs: { id: `tree-${data.treeId}-wrap` },
          on: { dblclick: () => this.onDblClick(data) },
        },
        domArray,
      );
    },
    // 当前节点渲染内容
    renderData(h, { root, node, data }) {
      const domArray = [
        h('div', { class: ['tree-row'] }, [
          h('i', {
            class: [`tree-row-icon-${data.type}`],
            style: { marginRight: '8px' },
          }),
          h('Input', {
            attrs: { id: `tree-${data.treeId}-input` },
            props: {
              value: data.title,
              size: 'small',
            },
            on: {
              'on-blur': () => this.handleInputTitle(data),
              'on-enter': () => this.handleInputTitleEnter(data),
            },
          }),
        ]),
      ];
      domArray.push(this.renderFileOrOther(h, { root, node, data }));
      return h(
        'div',
        {
          class: ['tree-row-wrap'],
          attrs: { id: `tree-${data.treeId}-wrap` },
          on: { dblclick: () => this.onDblClick(data) },
        },
        domArray,
      );
    },
    // 渲染文件还是其他
    renderFileOrOther(h, { root, node, data }) {
      if (data.type === 'file') {
        return h('div', { class: ['tree-row'] }, [
          h('Icon', {
            class: ['tree-row-icon'],
            props: { type: 'md-add' },
            attrs: { id: `tree-${data.treeId}-add` },
            nativeOn: {
              mouseenter: () =>
                this.handleMouseEvent('A', { root, node, data }),
              mouseleave: () => this.addClose(),
            },
          }),
          h('Icon', {
            class: ['tree-row-icon'],
            props: { type: 'md-more' },
            nativeOn: {
              mouseenter: () =>
                this.handleMouseEvent('M', { root, node, data }),
              mouseleave: () => this.MoreClose(),
            },
          }),
        ]);
      }
      return h('div', { class: ['tree-row'] }, [
        h('Icon', {
          class: ['tree-row-icon'],
          props: { type: 'md-more' },
          nativeOn: {
            mouseenter: () => this.handleMouseEvent('M', { root, node, data }),
            mouseleave: () => this.MoreClose(),
          },
        }),
      ]);
    },
    // 异步加载子节点
    async loadData(node, callback) {
      const params = { author: this.author, path: this.path, id: node.id };
      const { data } = await queryPostList(params);
      const childData = this.handleDate(data);
      callback(childData);
    },
    // 处理 点击 事件
    handleMouseEvent(type, { root, node, data }) {
      if (this.loading) return;
      const event = window.event;
      const { target } = event;
      const pos = this.$elementOffset(target);
      this[`${type}Top`] = pos.top;
      this[`${type}Left`] = pos.left;
      this[`${type}Show`] = true;
      this.selectData = data;
      this.selectRoot = root;
      this.selectNode = node;
      this.selectDom = document.querySelector(
        `#tree-${this.selectData.treeId}-wrap`,
      ).parentNode;
      this.selectDom.classList.add('tree-select');
    },
    // 添加 菜单 关闭
    addClose() {
      this.AShow = false;
      this.selectDom.classList.remove('tree-select');
    },
    // 添加 菜单 打开
    addOpen() {
      this.AShow = true;
      this.selectDom.classList.add('tree-select');
    },
    // 更多 菜单 关闭
    MoreClose() {
      this.MShow = false;
      this.selectDom.classList.remove('tree-select');
    },
    // 添加 菜单 打开
    MoreOpen() {
      this.MShow = true;
      this.selectDom.classList.add('tree-select');
    },
    // 处理双击事件
    onDblClick(data) {
      if (data.loading !== undefined && !data.children.length) {
        this.$set(data, 'loading', true);
        this.loadData(data, (child) => {
          this.$set(data, 'children', child);
          this.$set(data, 'loading', false);
          this.$set(data, 'expand', true);
        });
      } else {
        this.$set(data, 'expand', !data.expand);
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
          disabled: item.type === 'file',
        };
        if (item.isParent) {
          if (item.children) {
            child.children = this.handleDate(item.children);
            child.expand = true;
          } else {
            child.loading = false;
            child.children = [];
          }
        }
        if (this.id === item._id || (!this.id && item._id === 0)) {
          child.selected = true;
          this.selectedData = child;
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
      };
      if (name === '新建分组') {
        params.name = '新建分组';
        params.type = 'file';
      } else if (name === '新建文档') {
        params.name = '新建文档';
        params.type = 'note';
      }
      const { data } = await newPost(params);
      const [newNode] = this.handleDate([data]);
      newNode.render = this.renderData;
      this.treeData.push(newNode);
      this.$nextTick(() => {
        const inputDom = this.getInputDom(newNode.treeId);
        inputDom.focus();
        inputDom.setSelectionRange(0, 4);
      });
    },
    // 选中更多列表
    async selectMoreList(name) {
      this.loading = true;
      if (name === '重命名') await this.modifyTitle(this.selectData);
      else if (name === '删除') {
        await this.deleteNode(
          this.selectRoot,
          this.selectNode,
          this.selectData,
        );
      }
      this.loading = false;
    },
    // 选中 添加 列表
    async selectAddList(name) {
      this.loading = true;
      const params = { author: this.author, path: this.path };
      if (
        this.selectData.loading !== undefined &&
        !this.selectData.children.length
      ) {
        this.$set(this.selectData, 'loading', true);
        const { data: child } = await queryPostList({
          ...params,
          id: this.selectData.id,
        });
        const childData = this.handleDate(child);
        this.$set(this.selectData, 'children', childData);
        this.$set(this.selectData, 'loading', false);
        this.$set(this.selectData, 'expand', true);
      }
      if (name === '新建分组') {
        params.name = '新建分组';
        params.type = 'file';
      } else if (name === '新建文档') {
        params.name = '新建文档';
        params.type = 'note';
      }
      params.parentId = this.selectData.id;
      const { data } = await newPost(params);
      const [newNode] = this.handleDate([data]);
      newNode.render = this.renderData;
      const children = this.selectData.children || [];
      children.push(newNode);
      this.$set(this.selectData, 'children', children);
      this.$set(this.selectData, 'expand', true);
      this.$nextTick(() => {
        const inputDom = this.getInputDom(newNode.treeId);
        inputDom.focus();
        inputDom.setSelectionRange(0, 4);
      });
      this.loading = false;
    },
    // 修改名称
    modifyTitle(node) {
      this.$set(node, 'render', this.renderData);
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
        await this.updateNodeName(value.replace(/(^\s*)|(\s*$)/g, ''), data.id);
        this.$set(data, 'title', value);
        if (data.id === this.selected) {
          this.setSelectPost({ id: data.id, title: value });
        }
      }
      this.$delete(data, 'render');
    },
    // 获取inputdom
    getInputDom(id) {
      const treeId = `#tree-${id}-input`;
      return document.querySelector(treeId).querySelector('input');
    },
    // 更新节点名称
    async updateNodeName(name, id) {
      const params = { author: this.author, path: this.path, name, id };
      await updatePost(params);
    },
    // 删除节点名称
    async  deleteNode(root, node, data) {
      const params = { author: this.author, path: this.path, id: data.id };
      await deletePost(params);
      if (node.parent) {
        const parentKey = node.parent;
        const parent = root[parentKey];
        const index = parent.children.indexOf(data.nodeKey);
        const parentNode = parent.node;
        parentNode.children.splice(index, 1);
        if (!parent.node.children.length) this.$delete(parentNode, 'loading');
      } else {
        const index = this.treeData.findIndex(el => el.id === data.id);
        this.treeData.splice(index, 1);
      }
      if (data.id === this.selectedData.id) {
        this.$router.push(`/${this.author}/${this.path}/edit`);
      }
    },
    // 点击树节点时触发
    selectTreeNode(_node, data) {
      this.$set(data, 'selected', true);
      this.selected = data.id;
      this.selectedData = data;
      if (this.storeSelectPost.id === data.id) return;
      this.setSelectPost({ id: data.id, title: data.title });
      if (data.id) {
        this.$router.push(`/${this.author}/${this.path}/edit/${data.id}`);
      } else this.$router.push(`/${this.author}/${this.path}/edit`);
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
.header-list-sort-type{
margin: 0 0 0 7px;
}
</style>
