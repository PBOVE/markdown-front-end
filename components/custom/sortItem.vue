<template>
  <div class="sort-Item-wrap">
    <div
      v-for="(item, index) in sortData"
      :key="item.sortId"
      :style="{ transform: item.position, position: 'absolute' }"
      :class="{
        'sort-Item': index !== subscript,
        'sort-Item-topping': index === subscript,
      }"
      @mousedown.stop.prevent="startEvent(index, $event)"
    >
      <slot :item="item" :index="index" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { onlyId } from '@/utils/random';

export default {
  props: {
    // 模块高度
    itemHeight: {
      type: Number,
      default: 20,
    },
    // 模块宽度
    itemWidth: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      // 数据
      sortData: [],

      // 视口宽度
      clientWidth: 0,

      // 视口高度
      clientHeight: 0,

      // 一行可以显示
      rowShowNum: 0,

      // 边距
      margin: 10,

      // 点击下标
      subscript: -1,
    };
  },
  mounted() {
    // 设置视口宽度 和 高度
    this.clientWidth = this.$el.clientWidth;
    this.clientHeight = this.$el.clientHeight;
    // 计算一行可以显示
    this.rowShowNum = Math.floor(this.clientWidth / (this.itemWidth + this.margin)) || 1;
  },
  methods: {
    /**
     * @description 尾部添加数据
     *
     */
    pushData(data) {
      // 改变数据结构
      const cloneData = _.cloneDeep(data);
      cloneData.sortId = onlyId() + this.sortData.length;
      const changeData = this.computeDataStyle(cloneData, this.sortData.length);

      // 添加数据
      this.sortData.push(changeData);
      // 数据改变
      this.asyncDataChange();
    },

    /**
     * @description 头部添加数据
     *
     */
    unshiftData() {},

    /**
     * @description 删除数据
     *
     */
    deleteData(data) {
      const deleteIndex = this.sortData.findIndex(el => el.sortId === data.sortId);
      const deletePos = this.dataParsing(deleteIndex, 'position');
      const deletePlace = deletePos.h * this.rowShowNum + deletePos.w;
      this.sortData.splice(deleteIndex, 1);
      for (let i = 0; i < this.sortData.length; i++) {
        const { w, h } = this.dataParsing(i, 'position');
        let place = h * this.rowShowNum + w;
        if (place >= deletePlace) {
          place -= 1;
        }
        const changeData = this.computeDataStyle(_.cloneDeep(this.sortData[i]), place);
        this.$set(this.sortData, i, changeData);
      }
      // 数据改变
      this.asyncDataChange();
    },

    /**
     * @description 初始化数据
     *
     */
    initData(data) {
      data.forEach((el, index) => {
        const cloneData = _.cloneDeep(el);
        cloneData.sortId = onlyId() + index;
        const changeData = this.computeDataStyle(cloneData, index);
        this.sortData.push(changeData);
      });
    },

    /**
     * @description 设置设计样式
     *
     */
    computeDataStyle(data, index) {
      // 计算行
      const row = Math.floor(index / this.rowShowNum);
      // 计算列
      const column = index % this.rowShowNum;
      // 计算位置
      data.sourceX = column * this.itemWidth + column * this.margin;
      data.sourceY = row * this.itemHeight + row * this.margin;
      // 设置位置
      data.position = `translate(${data.sourceX}px,${data.sourceY}px)`;

      return data;
    },

    /**
     * @description 拖拽按下事件
     *
     */
    startEvent(Index, Event) {
      // 判断鼠标按键
      if (Event.button !== 0) return;
      // 设置开始位置
      this.sortData[Index].startX = Event.pageX;
      this.sortData[Index].startY = Event.pageY;
      // 设置移动元素的下标
      this.subscript = Index;
      // 设置移动事件 鼠标抬起事件
      document.addEventListener('mousemove', this.moveEvent, false);
      document.addEventListener('mouseup', this.endEvent, false);
    },

    /**
     * @description 拖拽移动事件
     *
     */
    moveEvent(Event) {
      // 获取移动 时 x, y 位置
      const currentX = Event.pageX;
      const currentY = Event.pageY;
      // 计算 开始移动 到 此刻的 距离
      const distanceX = Math.floor(currentX - this.sortData[this.subscript].startX);

      const distanceY = Math.floor(currentY - this.sortData[this.subscript].startY);

      // 计算位置
      let sourceX = this.sortData[this.subscript].sourceX + distanceX;
      let sourceY = this.sortData[this.subscript].sourceY + distanceY;

      // 防止 X轴 出界
      if (sourceX < 0) sourceX = 0;

      // 防止 Y轴 出界
      if (sourceY < 0) sourceY = 0;

      const { w, h } = this.surePlace(sourceX, sourceY);
      this.handlePosition(h * this.rowShowNum + w);
      this.sortData[this.subscript].position = `translate(${sourceX}px,${sourceY}px)`;
    },

    /**
     * @description 拖拽结束事件
     *
     */
    endEvent() {
      const { w, h } = this.dataParsing(this.subscript, 'position');
      let place = w + h * this.rowShowNum;
      place =
        place > this.sortData.length - 1 ? this.sortData.length - 1 : place;
      const data = this.sortData[this.subscript];
      const changeData = this.computeDataStyle(_.cloneDeep(data), place);
      this.$set(this.sortData, this.subscript, changeData);
      this.subscript = -1;
      // 数据改变
      this.asyncDataChange();
      document.removeEventListener('mousemove', this.moveEvent);
      document.removeEventListener('mouseup', this.endEvent);
    },

    /**
     * @description 确定 位置
     *
     */
    surePlace(W, H) {
      let w = Math.floor(W / this.itemWidth);
      let h = Math.floor(H / this.itemHeight);
      // 计算位置 在什么时候 偏移
      const midW = this.itemWidth * (w + 1 + 3 / 5);
      const midH = this.itemHeight * (h + 1 + 3 / 5);
      if (W + this.itemWidth > midW) w += 1;
      if (H + this.itemHeight > midH) h += 1;

      return { w, h };
    },
    /**
     * @description 获取数据
     *
     */
    getSortData() {
      const data = [];
      for (let i = 0; i < this.sortData.length; i += 1) {
        const { w, h } = this.dataParsing(i, 'position');
        const place = h * this.rowShowNum + w;
        data[place] = this.sortData[i];
      }
      return _.cloneDeep(data);
    },

    /**
     * @description 解析 translate 数据
     *
     */
    dataParsing(Index, field) {
      const data = this.sortData[Index];
      let temp = data[field].match(/-?\d+/g);
      temp = [parseInt(temp[0], 10), parseInt(temp[1], 10)];
      return this.surePlace(...temp);
    },

    /**
     * @description 处理位置
     *
     */
    handlePosition(Pos) {
      // 使用数据 位置进行 排序
      let sourceData = [];
      for (let i = 0; i < this.sortData.length; i += 1) {
        // 获取 位置
        const { w, h } = this.dataParsing(i, 'position');
        // 计算 位置
        const place = h * this.rowShowNum + w;
        sourceData.push({ index: i, place });
      }
      // 排序
      sourceData = sourceData.sort(this.sortPlace);
      // 从下标 0 开始
      let PosIndex = 0;
      // 保证每一个位置 只有 1 个
      const placeSet = {};
      placeSet[Pos] = true;
      // 设置位置
      for (let i = 0; i < this.sortData.length; i += 1) {
        if (sourceData[i].index === this.subscript) continue;
        while (placeSet[PosIndex]) PosIndex += 1;
        this.setDataStyle(sourceData[i].index, PosIndex);
        placeSet[PosIndex] = true;
      }
    },

    /**
     * @description 设置数据位置
     *
     */
    setDataStyle(Index, place) {
      const data = this.sortData[Index];
      const changeData = this.computeDataStyle(_.cloneDeep(data), place);
      this.$set(this.sortData, Index, changeData);
    },

    /**
     * @description 数据改变出发
     *
     */
    asyncDataChange: _.debounce(function() {
      this.$emit('on-change');
    }, 1000),

    /**
     * @description 位置 排序
     *
     */
    sortPlace(ObjA, ObjB) {
      const valA = ObjA.place;
      const valB = ObjB.place;
      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    },
  },
};
</script>

<style>
.sort-Item-wrap {
  position: relative;
  cursor: default;
}
.sort-Item {
  transition: all 0.3s;
}
.sort-Item-topping {
  z-index: 1998;
}
</style>
