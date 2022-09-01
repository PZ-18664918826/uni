<template>
  <u-tabbar active-color="#0A6FEE" inactive-color="#BBBBBB" :value="tabBarIndex" :fixed="true" @change="ChangBar">
    <u-tabbar-item v-for="(item, index) in tabBarList" :key="index" :text="item.text" :name="index">
      <image slot="active-icon" class="w-48rpx h-48rpx" :src="item.selectedIconPath"></image>
      <image slot="inactive-icon" class="w-48rpx h-48rpx" :src="item.iconPath"></image>
    </u-tabbar-item>
  </u-tabbar>
</template>

<script>
import { mapGetters } from 'vuex';
import ImgMy from '@/static/tabbar/my.png';
import ImgSelectedMy from '@/static/tabbar/selected-my.png';
import ImgMarket from '@/static/tabbar/market.png';
import ImgSelectedMarket from '@/static/tabbar/selected-market.png';
import ImgHome from '@/static/tabbar/home.png';
import ImgSelectedHome from '@/static/tabbar/selected-home.png';

export default {
  data() {
    return {
      ImgMarket,
      ImgSelectedMarket,
      ImgMy,
      ImgSelectedMy,
      ImgHome,
      ImgSelectedHome,
      tabBarList: [
        {
          pagePath: '/pages/home/index',
          iconPath: ImgHome,
          selectedIconPath: ImgSelectedHome,
          text: '首页'
        },
        {
          pagePath: '/pages/market/index',
          iconPath: ImgMarket,
          selectedIconPath: ImgSelectedMarket,
          text: '市场'
        },
        {
          pagePath: '/pages/my/index',
          iconPath: ImgMy,
          selectedIconPath: ImgSelectedMy,
          text: '我的'
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['tabBarIndex'])
  },
  created() {
    // 隐藏原生tabbar
    uni.hideTabBar();
  },
  methods: {
    ChangBar(e) {
      this.$store.commit('SET_TAB_BARINDEX', e);
      const { pagePath } = this.tabBarList[e];
      this.$Router.pushTab({ path: pagePath });
    }
  }
};
</script>

<style scoped lang="scss"></style>
