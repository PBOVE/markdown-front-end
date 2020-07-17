/**
*
*  @author ZTiger
*
*/


<template>
  <div class="weather-wrap main-center-middle">
    <span>{{storeWeather.city|cityFilter}}</span>
    <img :src="imgSrc" class="weather-svg" />
    <span>{{storeWeather.weather}}</span>
    <span>{{storeWeather.temperature}}℃</span>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  filters: {
    cityFilter(city) {
      return city.replace(/市|省|城区|区/, "");
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["storeWeather"]),
    imgSrc() {
      return `/weather/${this.storeWeather.weather}.svg`;
    },
  },
};
</script>


<style scoped>
.weather-wrap {
  margin: 0 10px 0 0;
  font-size: 13px;
}
.weather-wrap span {
  margin: 0 10px 0 0;
}
.weather-svg {
  height: 20px;
  width: 20px;
  margin: 0 10px 0 0;
}
@media screen and (max-width: 780px) {
  .weather-wrap {
    margin: 0 0px 0 0;
  }
  .weather-svg {
    display: none;
  }
}
@media screen and (max-width: 730px) {
  .weather-svg {
    display: inline-block;
  }
}
</style>
