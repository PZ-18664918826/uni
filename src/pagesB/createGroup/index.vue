<template>
  <view>
    <nav-bar left-text="创建组合" />
    <view class="mt-70rpx">
      <uni-steps :options="stepList" :active="active" active-color="#3487EF"></uni-steps>
    </view>
    <view v-show="!active">
      <first-step @finishGroupName="finishGroupName" />
    </view>
    <view v-show="active === 1">
      <second-step
        :stock-detailtype="stockDetailtype"
        @update:stockDetailtype="stockDetailtype = $event"
        @nextStep="active = 2"
      />
    </view>
    <view v-show="active === 2">
      <third-step :stock-detailtype="stockDetailtype" :group-name="groupName" @toSearchGroup="toSearchGroup" />
    </view>
    <search-group :show-popup="showPopup" @closePopup="showPopup = false" />
  </view>
</template>

<script>
import { searchType } from '@/config/common/system';
import FirstStep from './components/FirstStep';
import SearchGroup from './components/SearchGroup';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';

const stepStockList = [
  {
    title: '第一步'
  },
  {
    title: '第二步'
  },
  {
    title: '第三步'
  }
];
const stepFunkList = [
  {
    title: '第一步'
  },
  {
    title: '第二步'
  }
];
export default {
  components: {
    SearchGroup,
    FirstStep,
    SecondStep,
    ThirdStep
  },
  data() {
    return {
      stepStockList,
      stepFunkList,
      stepList: [],
      groupName: '',
      active: 0,
      // 具体股票类型 沪深  港股 基金
      stockDetailtype: 1,
      // 组合类型 股票 基金
      groupType: 0,
      // 显示搜索
      showPopup: false
    };
  },
  created() {
    this.groupType = this.$getters.groupType;
    this.stepList = this.groupType === searchType.stock ? [...this.stepStockList] : [...this.stepFunkList];
    this.stockDetailtype = this.groupType === searchType.stock ? 1 : 3;
  },
  onUnload() {
    this.$store.commit('CLEAN_STOCK_GLOBAL_LIST');
  },
  methods: {
    finishGroupName(e) {
      this.groupName = e;
      this.active = this.groupType === searchType.stock ? 1 : 2;
    },
    toSearchGroup() {
      this.showPopup = true;
    }
  }
};
</script>

<style scoped lang="scss"></style>
