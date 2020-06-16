/**
*
*  @author ZTiger
*
*/


<template>
  <Modal
    v-model="model"
    class="set-head-portrait-wrap"
    :footer-hide="true"
    :width="width"
    :mask-closable="false"
  >
    <div class="head-portrait-header">
      <div>设置个人资料照片</div>
    </div>
    <div class="head-portrait-main">
      <div v-show="viewSelect===0">
        <div class="head-portrait-main-select">上传照片</div>
        <div class="select-content" :style="{height:height+'px'}">
          <Icon type="md-images" />
          <div class="select-content-submit">
            <span>选择您的计算机的照片</span>
            <input ref="file" type="file" class="select-content-file" title @change="changeEvent" />
          </div>
        </div>
      </div>
      <div v-show="viewSelect===1">
        <div class="display:flex; align-items: center;">
          <span style="padding:0 10px; cursor:pointer;" @click="viewSelect=0">上传照片</span>
          <Icon type="md-arrow-dropright" style="padding:0 10px 0 0;" size="18" />
          <span>{{fileName}}</span>
        </div>
        <div :style="{height:height+'px'}">
          <div class="drop-content" :style="{height:height-50+'px'}">
            <crop-image
              :imgSrc="imgSrc"
              :cropHeight="150"
              :cropWidth="150"
              @on-callback="getCanvasPos"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="head-portrait-footer">
      <Button type="primary">设置为个人资料照片</Button>
      <Button type="text">取消</Button>
    </div>
  </Modal>
</template>


<script>
import cropImage from "@/components/cropImage/index.vue";

export default {
  components: { cropImage },
  model: {
    prop: "model",
    event: "model-event",
  },
  props: {
    model: Boolean,
  },
  data() {
    return {
      // 宽度
      width: 800,
      // 高度
      height: 400,
      // 视图选择
      viewSelect: 0,
      // 文件名称
      fileName: "",
      // 图谱连接
      imgSrc: "",
    };
  },
  mounted() {
    if (window.innerWidth < 800) {
      this.width = window.innerWidth - 20;
      this.height = this.width * 0.618;
    }
    window.addEventListener("resize", this.clientSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.clientSize);
  },
  methods: {
    // 窗口变化
    clientSize() {
      if (window.innerWidth < 800) {
        this.width = window.innerWidth - 20;
        this.height = this.width * 0.618;
      }
    },
    // 点击input
    changeEvent() {
      const file = this.$refs.file.files[0];
      const reg = /^image/;
      if (!file || !reg.test(file.type)) {
        return;
      }
      if (file.size > 1024 * 1024 * 5) {
        this.$Message.warning("文件太大,请不要上传文件大于 3M 的图片");
        return;
      }
      this.fileName = file.name;
      const reader = new FileReader();
      reader.onload = e => {
        this.imgSrc = e.target.result;
        this.viewSelect = 1;
      };
      reader.readAsDataURL(file);
    },
    // 得到照片位置
    getCanvasPos(imgSrc, sx, sy, sw, sh) {
      console.log(imgSrc, sx, sy, sw, sh);
      // const ctxFirst = this.$refs.canvasFirst.getContext('2d');
      // const ctxSecond = this.$refs.canvasSecond.getContext('2d');
      // ctxFirst.drawImage(imgSrc, sx, sy, sw, sh, 0, 0, 300, 150);
      // ctxSecond.drawImage(imgSrc, sx, sy, sw, sh, 0, 0, 50, 50);
    },
  },
};
</script>


<style scoped>
.set-head-portrait-wrap {
  color: #000;
}
.head-portrait-header {
  padding: 16px;
  font-size: 18px;
}
.head-portrait-select {
  margin: 16px 0 0 0;
}
.head-portrait-main {
  padding: 0 16px 16px;
}
.head-portrait-main-select {
  display: inline-block;
  padding: 5px;
  border-bottom: 2px solid #2d8cf0;
}
.select-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 80px;
  text-align: center;
  color: #dcdee2;
}
.select-content-submit {
  position: relative;
  margin: 10px 0 0 0;
  padding: 4px 10px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #444;
  cursor: pointer;
}
.select-content-submit:hover {
  background: rgba(0, 0, 0, 0.3);
  color: #f5f5f5;
}
.head-portrait-footer {
  padding: 16px;
}
.head-portrait-footer button:last-of-type {
  margin: 0 0 0 20px;
}
.select-content-file {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}
.drop-content {
  background: #000;
}
</style>
<style>
.set-head-portrait-wrap .ivu-modal-body {
  padding: 0;
  margin: 10px;
}
.set-head-portrait-wrap .ivu-modal-close {
  display: none;
}
</style>
