import Vue from 'vue';
import { setupAssets, setupUView } from '@/plugins';
import NavBar from '@/components/NavBar.vue';
import TabBar from '@/components/TabBar.vue';
import UchartsLoading from '@/components/ucharts/UchartsLoading.vue';
import App from './App';
import store from './store/index';
import { router, RouterMount } from './router/router';

Vue.component('TabBar', TabBar);
Vue.component('NavBar', NavBar);
Vue.component('UchartsLoading', UchartsLoading);
Vue.prototype.$getters = store.getters;
// 路径换成自己的
function disabledProductionTip() {
  Vue.config.productionTip = false;
}
Vue.use(router);
function setupApp() {
  disabledProductionTip();

  setupUView(Vue);

  App.mpType = 'app';
  const app = new Vue({
    ...App,
    store
  });
  // #ifdef H5
  RouterMount(app, router, '#app');
  // #endif

  // #ifndef H5
  app.$mount(); // 为了兼容小程序及app端必须这样写才有效果
  // #endif
}

setupAssets();
setupApp();
