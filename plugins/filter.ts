import Vue from 'vue';

Vue.filter('TimeFilter', (time: string) => {
  const dateStart: any = new Date(time);
  const dateEnd: any = new Date();
  const DateValue: number[] = [ 1000, 60, 60, 24, 30, 12, Infinity ];
  const zhongDate: string[] = [ '秒', '分钟', '小时', '天', '个月', '年' ];
  let dateValue: number | string = dateEnd - dateStart;
  for (let i = 0; i < DateValue.length - 1; i++) {
    dateValue /= DateValue[i];
    if (dateValue < DateValue[i + 1]) {
      return `${Math.floor(dateValue)} ${zhongDate[i]}`;
    }
  }
});
Vue.prototype.$timeConversion = (time: string) => {
  const date = new Date(time);
  const completion = (num: number) => {
    return num.toString().padStart(2, '0');
  };
  return `${date.getFullYear()} 年 ${completion(date.getMonth() + 1)} 月 ${completion(date.getDate())} 日 ${completion(
    date.getHours(),
  )} : ${completion(date.getMinutes())}`;
};

Vue.prototype.$elementOffset = (el: any) => {
  let actualTop = el.offsetTop;
  let actualLeft = el.offsetLeft;
  let current = el.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return { top: actualTop, left: actualLeft };
};
