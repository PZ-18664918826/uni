import { contentType } from '@/config/common/service';
import store from '@/store/index';
import { request } from '../request';
/**
 * 获取用户信息
 * @param {string} userId - 用户id
 */
export function getUserInfo(userId) {
  return request.get('/userinfo', { params: { userId } });
}

// 密码登录
export function pwdLogin(username, password, avatar, realName) {
  return request.post(
    '/blade-auth/oauth/token',
    {
      username,
      password,
      tenantId: '000000',
      grant_type: 'password',
      avatar,
      realName,
      'User-Type': store.getters['User-Type']
    },
    {
      headers: {
        'Content-Type': contentType.formUrlencoded
      }
    }
  );
}

// 获取openId
export function getOpenId(code) {
  return request.get('/blade-user/getOpenId', { params: { code, userType: store.getters['User-Type'] } });
}

// 获取微信签名参数微信支付
export function wxPay(orderNo, openId) {
  return request.post('/blade-system/pay/jspay', { orderNo, openid: openId });
}
// 退出
export function loginOut() {
  return request.get('/blade-auth/oauth/logout');
}
// 刷新token
export function refreshToken(refreshToken) {
  return request.post(
    '/blade-auth/oauth/token',
    {
      tenantId: '000000',
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    },
    {
      headers: {
        'Content-Type': contentType.formUrlencoded
      }
    }
  );
}
// 手机号登陆
export function codeLogin(phone, code, openId, avatar, realName) {
  return request.post(
    '/blade-auth/oauth/token',
    {
      tenantId: '000000',
      sms_code: code,
      grant_type: 'sms',
      phone,
      openId,
      avatar,
      realName,
      'User-Type': store.getters['User-Type']
    },
    {
      headers: {
        'Content-Type': contentType.formUrlencoded
      }
    }
  );
}

// 解绑微信
export function unbindWeChat(openId) {
  return request.post(
    '/blade-user/unbind',
    { openId },
    {
      headers: {
        'Content-Type': contentType.formUrlencoded
      }
    }
  );
}

// 获取短信验证码
export function getPhoneCode(phone) {
  return request.post(
    `/blade-system/smssend/send`,
    { phone },
    {
      headers: {
        'Content-Type': contentType.formUrlencoded
      }
    }
  );
}
