/* eslint-disable no-unused-vars */
import { RouterMount, createRouter } from 'uni-simple-router';
import { uniToHome } from '@/hooks/useRouterPush';
import { getToken } from '@/utils/common/user';
import store from '@/store/index';

const router = createRouter({
  platform: process.env.UNI_PLATFORM,
  detectBeforeLock: (router, to, navType) => {
    // 配置解锁[重要]。关闭跳转路由锁
    router.$lockStatus = false;
  },
  // eslint-disable-next-line no-undef
  routes: [...ROUTES]
});

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  const isLogin = Boolean(getToken());
  const needLogin = Boolean(to.meta.loginAuth);
  if (to.name === 'home') {
    // 已登录状态跳转首页，跳转至tabbar首页
    store.commit('SET_TAB_BARINDEX', 0);
    next();
  } else if (!needLogin) {
    // 没有登录 且需要登录 则跳转到首页
    next();
  } else if (isLogin && needLogin) {
    // 需要登录且已经登录
    next();
  } else if (!isLogin && needLogin) {
    // 需要登录且没登录
    uniToHome();
  }
});
// 全局路由后置守卫
router.afterEach((to, from) => {});

export { router, RouterMount };
