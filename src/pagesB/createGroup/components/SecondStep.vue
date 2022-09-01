<template>
  <view>
    <view class="flex-center mt-194rpx text-40rpx text-hex-333 font-bold">你要创建哪种组合</view>
    <view class="mt-100rpx px-80rpx">
      <stock-type :type-list="stockTypeList" @handleCheck="handleCheck" />
    </view>
    <view class="mt-567rpx flex-x-center">
      <view class="w-446rpx h-90rpx">
        <u-button type="primary" text="下一步" shape="circle" @click="$emit('nextStep')"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
import cloneDeep from 'clone-deep';
import StockType from '@/components/StockType';

const initTypeList = [
  {
    id: 1,
    imgUrl: 'https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/china.png',
    title: '沪深',
    isCheck: true
  },
  {
    id: 2,
    imgUrl: 'https://fileimageimg.oss-cn-shenzhen.aliyuncs.com/child/hongkong-stock.png',
    title: '港股',
    isCheck: false
  }
];
export default {
  components: {
    StockType
  },

  props: {
    // 此处必须定义和model的prop相同的props，因为v-model会传值给子组件
    stockDetailtype: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      initTypeList,
      stockTypeList: []
    };
  },
  created() {
    this.stockTypeList = cloneDeep(this.initTypeList);
  },
  methods: {
    handleCheck(id) {
      const index = this.stockTypeList.findIndex(v => v.id === id);
      this.stockTypeList = this.stockTypeList.map(v => {
        v.isCheck = false;
        return v;
      });
      this.stockTypeList[index].isCheck = true;
      this.$emit('update:stockDetailtype', this.stockTypeList[index].id);
    }
  }
};
</script>

<style scoped lang="scss"></style>
