/**
*
*  @author ZTiger
*
*/

<template>
  <div class="location-wrap">
    <public-header :search-hide="true" />
    <div class="location-header">
      <div class="eh-content">
        <nuxt-link to="/user/personal">
          <Icon type="md-arrow-round-back" class="eh-content-icon curpoin" />
        </nuxt-link>
        <div>地区</div>
      </div>
    </div>
    <div class="location-content">
      <div class="location-content-title">对您的地区所做的更改将反映在您的 TBS.feel 帐号中。</div>
      <div class="location-box">
        <div class="location-content-title" style="padding:18px 0;">更改地区</div>
        <div class="location-title">
          <span
            v-if="storeLocation"
            class="location-account"
          >{{ storeLocation.province }} {{ storeLocation.city }}</span>
          <span v-else class="location-account"></span>
          <Icon type="md-create" class="location-title-icon curpoin" @click="openModal" />
        </div>
      </div>
    </div>
    <Modal v-model="modalShow" class-name="modal-vertical-center" width="350" :footer-hide="true">
      <div class="modal-edit-header">
        <div>地区</div>
        <Icon type="md-close" size="18" class="modal-close" @click="modalShow=false" />
      </div>
      <div class="modal-title">选择您所在的地区</div>
      <div class="modal-input-wrap">
        <Select
          v-model="province"
          style="width:110px; marginRight:16px"
          @on-change="provinceChange"
        >
          <Option v-for="(item,key) in cityList" :key="key" :value="key" :label="key" />
        </Select>
        <Select v-model="city" style="width:120px">
          <Option v-for="(item,key) in cityList[province]" :key="key" :value="key" :label="key" />
        </Select>
      </div>
      <div class="modal-footer">
        <Button type="text" @click="modalShow=false">取消</Button>
        <Button type="primary" :loading="loading" @click="update">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { updateAccount } from '@/api/user';
import cityList from '@/utils/cities';
import publicHeader from '@/components/publicHeader/index.vue';

export default {
  transition: 'fade',
  components: { publicHeader },
  data() {
    return {
      // modal 展示
      modalShow: false,
      // 设置按钮为加载中状态
      loading: false,
      // 城市列表
      cityList,
      // 省
      province: '',
      // 城市
      city: '',
    };
  },
  head() {
    return {
      title: '地区 ● TBS.feel',
    };
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('user', ['storeLocation']),
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {},
  // eslint-disable-next-line vue/order-in-components
  methods: {
    // 打开对话框
    openModal() {
      if (this.storeLocation) {
        this.province = this.storeLocation.province;
        this.city = this.storeLocation.city;
      } else {
        this.province = '北京';
        this.city = '北京';
      }
      this.modalShow = true;
    },
    // 省份城市修改
    provinceChange(value) {
      this.city = Object.keys(this.cityList[value])[0];
    },
    // 发送修改
    async update() {
      if (this.loading) return;
      if (this.storeLocation && this.storeLocation.city === this.city) {
        this.modalShow = false;
        return;
      }
      try {
        this.loading = true;
        const { data } = await updateAccount({
          location: {
            province: this.province,
            city: this.city,
            adcode: this.cityList[this.province][this.city],
          },
        });
        this.$store.commit('user/setUser', data.user);
        this.$store.commit('user/setWeather', data.weather);
        this.modalShow = false;
      } catch (err) {}
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.location-content {
  padding: 0 18px;
}
.location-content,
.eh-content {
  margin: 0 auto;
  max-width: 660px;
}
.location-header {
  padding: 0 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.eh-content {
  display: flex;
  align-items: center;
  padding: 0 0 5px 0;
  font-size: 23px;
  color: #202124;
}
.eh-content-icon {
  margin: 0 10px 0 0;
  height: 34px;
  width: 34px;
  text-align: center;
  line-height: 34px;
  font-size: 24px;
  color: #000;
}
.eh-content-icon:active {
  border-radius: 50%;
  background: #dcdee2;
}
.location-content-title {
  padding: 24px 0;
  color: rgba(0, 0, 0, 0.65);
}
.location-box {
  padding: 24px;
  border: 1px solid #dadce0;
  border-radius: 8px;
}
.location-account {
  margin: 0 10px 0 0;
  font-size: 17px;
  font-weight: 500;
  color: #3c4043;
}
.location-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.location-title-icon {
  font-size: 19px;
  color: #515a6e;
}
.curpoin {
  cursor: pointer;
}
.modal-input-wrap {
  display: flex;
  margin: 10px 0 0 0;
}
</style>
