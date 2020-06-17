/**
*
*  @author ZTiger
*
*/


<template>
  <Modal
    v-model="modalShow"
    class="set-head-portrait-wrap"
    :footer-hide="true"
    :width="width"
    :mask-closable="false"
    :styles="{top: '50px'}"
  >
    <div class="head-portrait-header">
      <div>设置个人资料照片</div>
      <Icon type="md-close" class="head-portrait-header-icon" @click="modalShow=false;" />
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
        <div class="drop-flex" style=" align-items: center; margin-bottom:10px">
          <div :style="{width:width-hidden+'px'}">
            <span style="padding:0 10px; cursor:pointer;" @click="viewSelect=0">上传照片</span>
            <Icon type="md-arrow-dropright" style="padding:0 10px 0 0;" size="18" />
            <span>{{fileName}}</span>
          </div>
          <div style="font-size:14px; margin-left:20px" v-show="hidden">图片预览：</div>
        </div>
        <div class="drop-flex">
          <div class="drop-content-left" :style="{height:height+'px',width:width-hidden+'px'}">
            <crop-image
              ref="cropImage"
              :imgSrc="imgSrc"
              :cropHeight="150"
              :cropWidth="150"
              @on-callback="getCanvasPos"
            />
          </div>
          <div class="drop-content-right" v-show="hidden">
            <div class="show-preview" :style="previewStyle">
              <div :style="previews.div">
                <img :src="previews.url" :style="previews.img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="head-portrait-footer">
      <Button type="primary" :disabled="disabled" :loading="loading" @click="uploadPhotos">设置为个人资料照片</Button>
      <Button type="text" @click="modalShow=false">取消</Button>
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
      width: 700,
      // 高度
      height: 300,
      // 视图选择
      viewSelect: 0,
      // 文件名称
      fileName: "",
      // 图谱连接
      imgSrc: "",
      // 预览链接
      previews: {},
      previewStyle: {},
      // 隐藏
      hidden: 280,
      // 设置按钮为禁用状态
      disabled: true,
      // 对话框
      modalShow: this.model,
      // 设置按钮为加载中状态
      loading: false,
    };
  },
  watch: {
    modalShow(value) {
      if (!value) {
        this.$emit("model-event", false);
      }
    },
    model(value) {
      if (value) {
        this.modalShow = true;
        this.imgSrc = "";
        this.fileName = "";
        this.viewSelect = 0;
        this.disabled = true;
        this.loading = false;
      }
    },
  },
  mounted() {
    if (window.innerWidth < 700) {
      this.hidden = 0;
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
      if (window.innerWidth < 700) {
        this.hidden = 0;
        this.width = window.innerWidth - 20;
        this.height = this.width * 0.618;
      } else {
        this.hidden = 280;
        this.width = 700;
        this.height = 300;
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
        this.disabled = false;
      };
      reader.readAsDataURL(file);
    },
    // 得到照片位置
    getCanvasPos(data) {
      this.previews = data;
      this.previewStyle = {
        width: data.w + "px",
        height: data.h + "px",
        overflow: "hidden",
        margin: "0",
      };
    },
    // 上传照片
    async uploadPhotos() {
      const base64String = await this.$refs.cropImage.onCubeImg();
      try {
        this.loading = true;
        const { data } = await this.$request.updataUserMsg({
          images: base64String,
        });
        this.$store.commit("user/setUser", data);
        this.modalShow = false;
      } catch (err) {}
    },
  },
};
</script>


<style scoped>
.set-head-portrait-wrap {
  color: #000;
}
.head-portrait-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-size: 18px;
}
.head-portrait-header-icon {
  cursor: pointer;
}
.head-portrait-header-icon:hover {
  color: #ed4014;
}
.head-portrait-select {
  margin: 16px 0 0 0;
}
.head-portrait-main {
  padding: 0 16px 0;
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
  padding: 30px 16px 16px;
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
.drop-flex {
  display: flex;
}
.drop-content-left {
  border-radius: 8px;
  background: #000;
  overflow: hidden;
}
.drop-content-right {
  margin: 0 0 0 20px;
}
.show-preview {
  border-radius: 50%;
  box-shadow: 0 0 2px silver;
  background: #f0f0f0;
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
