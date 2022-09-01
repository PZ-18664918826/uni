<template>
  <view>
    <u-popup :show="showPopup" mode="center" round="4">
      <view class="p-32rpx" style="width: calc(100vw - 64px)">
        <view class="px-56rpx">
          <view class="mb-70rpx flex-y-center">
            <text class="text-32rpx text-hex-333 font-bold">请选择创建组合类型（剩余{{ times }}次）</text>
          </view>
          <stock-type :type-list="groupList" @handleCheck="handleCheck" />
        </view>
        <view class="flex">
          <view
            class="flex-1 h-80rpx flex-center border-1px border-solid border-hex-707070 rounded-8rpx mr-24rpx"
            @click="cancel"
          >
            <text class="text-hex-666 text-28rpx">取消</text>
          </view>
          <view class="flex-1 h-80rpx flex-center mr-24rpx bg-primary rounded-8rpx" @click="confirm">
            <text class="text-white text-28rpx">确定</text>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import cloneDeep from 'clone-deep';
import StockType from '@/components/StockType';
import { searchType } from '@/config/common/system.js';

const initTypeList = [
  {
    id: searchType.stock,
    imgUrl: 'https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/stock.png',
    title: '股票组合',
    isCheck: true
  },
  {
    id: searchType.funk,
    imgUrl: 'https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/fund.png',
    title: '基金组合',
    isCheck: false
  }
];
export default {
  components: {
    StockType
  },
  props: {
    times: {
      type: Number,
      default: 3
    },
    showPopup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showFunk: false,
      initTypeList,
      groupList: []
    };
  },
  created() {
    this.groupList = cloneDeep(initTypeList);
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      const groupItem = this.groupList.find(v => v.isCheck);
      this.$store.commit('SET_GROUP_TYPE', groupItem.id);
      this.$emit('confirm');
    },
    handleCheck(id) {
      const index = this.groupList.findIndex(v => v.id === id);
      this.groupList = this.groupList.map(v => {
        v.isCheck = false;
        return v;
      });
      this.groupList[index].isCheck = true;
    }
  }
};
</script>

<style scoped lang="scss"></style>
