import { getPhoneCode } from '@/service/api/auth';

/** 手机号码正则 */
export const REGEXP_PHONE =
  /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;

/** 邮箱正则 */
export const REGEXP_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

/** 密码正则(密码为8-18位数字/字符/符号的组合) */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

/** 验证码正则(6位数字) */
export const REGEXP_CODE = /^\d{6}$/;

/** 校检4-到20个字符 */
export const REGEXP_STORE = /^.{4,20}$/;

export const REGEXP_GROUP = /^.{1,10}$/;
/** 金额正则  */
export const REGEXP_MONEY = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/;
/** 表单规则 */
export const formRules = {
  phone: [
    { required: true, message: '请输入手机号码' },
    { pattern: REGEXP_PHONE, message: '手机号码格式错误', trigger: ['blur'] }
  ],
  pwd: [
    { required: true, message: '请输入密码' },
    { pattern: REGEXP_PWD, message: '密码为8-18位数字/字符/符号，至少2种组合', trigger: ['blur'] }
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: REGEXP_CODE, message: '验证码格式错误', trigger: ['blur'] }
  ],
  email: [{ pattern: REGEXP_EMAIL, message: '邮箱格式错误', trigger: ['blur'] }],
  store: [
    { required: true, message: '请输入商店名称' },
    { pattern: REGEXP_STORE, message: '商店名称格式错误', trigger: ['blur'] }
  ]
};

// 获取验证码
export async function getCode() {
  if (!this.form.phone) {
    uni.$u.toast('请输入手机号码');
    return;
  }
  if (!REGEXP_PHONE.test(this.form.phone)) {
    uni.$u.toast('手机号码格式错误');
    return;
  }
  if (this.$refs.uCode.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码'
    });
    const { error, data } = await getPhoneCode(this.form.phone);
    if (!error && data) {
      uni.hideLoading();
      // 这里此提示会被this.start()方法中的提示覆盖
      uni.$u.toast('验证码已发送');
      // 通知验证码组件内部开始倒计时
      this.$refs.uCode.start();
    }
  } else {
    uni.$u.toast('倒计时结束后再发送');
  }
}

export function codeChange(text) {
  this.tips = text;
}
