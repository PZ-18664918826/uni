import { getOpenId } from '@/service/api/auth';

export async function getWXUserInfo() {
  // 防止拉起多个登录授权
  return new Promise(reslove => {
    const userInfo = {};
    uni.getProvider({
      service: 'oauth',
      success: res => {
        if (res.provider.indexOf('weixin') >= 0) {
          uni.getUserProfile({
            desc: '获取您个人信息用于登录！',
            success: infoRes => {
              const { nickName, avatarUrl } = infoRes.userInfo;
              Object.assign(userInfo, { nickName }, { avatarUrl });
              uni.login({
                provider: 'weixin',
                success: async loginRes => {
                  const { code } = loginRes;
                  const { data, error } = await getOpenId(code);
                  if (!error) {
                    Object.assign(userInfo, data);
                    reslove(userInfo);
                  }
                }
              });
            },
            fail: () => {
              reslove(false);
              setTimeout(() => {
                uni.showToast({
                  title: '授权失败',
                  icon: 'error'
                });
              }, 100);
            }
          });
        }
      }
    });
  });
}
