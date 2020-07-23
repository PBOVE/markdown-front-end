import Vue from 'vue';

Vue.filter('TimeFilter', time => {
  const dateStart = new Date(time);
  const dateEnd = new Date();
  const DateValue = [ 1000, 60, 60, 24, 30, 12, Infinity ];
  let dateValue = dateEnd - dateStart;
  for (var i = 0; i < DateValue.length - 1; i++) {
    dateValue /= DateValue[i];
    if (dateValue < DateValue[i + 1]) {
      switch (i) {
        case 0:
          dateValue = parseInt(dateValue) + ' 秒';
          break;
        case 1:
          dateValue = parseInt(dateValue) + ' 分钟';
          break;
        case 2:
          dateValue = parseInt(dateValue) + ' 小时';
          break;
        case 3:
          dateValue = parseInt(dateValue) + ' 天';
          break;
        case 4:
          dateValue = parseInt(dateValue) + ' 个月';
          break;
        case 5:
          dateValue = parseInt(dateValue) + ' 年';
          break;
      }
      break;
    }
  }
  return dateValue + '前更新';
});
Vue.prototype.$timeConversion = time => {
  const date = new Date(time);
  const completion = num => {
    return num.toString().padStart(2, '0');
  };
  return `${date.getFullYear()}年${completion(date.getMonth() + 1)}月${completion(date.getDate())}日 ${completion(
    date.getHours(),
  )}:${completion(date.getMinutes())}`;
};
Vue.prototype.$elementOffset = el => {
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
