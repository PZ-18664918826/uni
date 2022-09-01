<script>
import { consoleLog } from '@/utils';

export default {
  methods: {},
  onLaunch() {
    // 隐藏原生tabbar
    uni.hideTabBar();
    consoleLog('App Launch');
  },

  onShow() {
    consoleLog('App Show');
  },
  onHide() {
    consoleLog('App Hide');
  }
};
</script>

<style lang="scss">/*每个页面公共css */
@import "~@/style/index.css";
page {
  height: 100%;
  background: #ffffff;
}
</style>
