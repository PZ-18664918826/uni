import { wxPay } from '@/service/api';
import store from '@/store/index';

export async function payPal(orderNo) {
  const { openId } = store.state.user;
  const { data, error } = await wxPay(orderNo, openId);
  if (!error) {
    const { package: prepayId, timeStamp, nonceStr, signType, paySign } = data.body;
    return new Promise(resolve => {
      uni.requestPayment({
        // 服务提供商
        provider: 'weixin',
        // 时间戳
        timeStamp,
        // 随机字符串
        nonceStr,
        // 统一下单接口返回的 prepay_id 参数值
        package: prepayId,
        // 签名类型
        signType,
        // 签名
        paySign,
        success: () => {
          resolve(true);
        },
        fail: () => {
          resolve(false);
        }
      });
    });
  }
  return false;
}
