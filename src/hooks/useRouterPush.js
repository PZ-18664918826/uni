import store from '@/store/index';

/** 跳转首页 */
export function uniToHome() {
  store.commit('SET_TAB_BARINDEX', 0);

  uni.switchTab({
    url: `/pages/home/index`
  });
}

export function toRegister() {
  this.$Router.push({ path: '/pagesA/register/index' });
}

export function toTestUcharts() {
  this.$Router.push({ path: '/pagesA/testUcharts/index' });
}

/** 跳转创建组合界面 */
export function toCreateGroup() {
  this.$Router.push({ path: '/pagesB/createGroup/index' });
}

/** 跳转创建组合界面 */
export function toSearchGroup() {
  this.$Router.push({ path: '/pagesB/searchGroup/index' });
}
