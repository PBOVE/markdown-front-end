// 对不同响应码设置信息
const showStatus = (status: number) => {
  let message = '';
  switch (status) {
    case 400:
      message = '请求参数不正确，无法得到服务器响应';
      break;
    case 401:
      message = '未授权，请登录(401)';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 406:
      message = '请求内容错误(406)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    case 4000:
      message = '原密码无法匹配,请重新输入原密码';
      break;
    case 4001:
      message = '用户名或密码错误,请重新输入';
      break;
    case 4004:
      message = '请不要重复发送验证邮件,请前往您的邮箱中查看';
      break;
    case 4005:
      message = '邮箱没有认证,无法使用此邮箱';
      break;
    case 4007:
      message = '密码输入错误,请重新输入密码';
      break;
    case 4008:
      message = '项目路径已经存在,请重新设置';
    case 6000:
      message = '系统未开放,无法创建项目';
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return message;
};

export default showStatus;
