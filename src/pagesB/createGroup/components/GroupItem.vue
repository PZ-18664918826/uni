<template>
  <view>
    <view class="h-111rpx flex-y-center justify-between px-32rpx">
      <view class="flex flex-col">
        <text class="text-black text-30rpx">{{ grouoItem.name }}</text>
        <view class="flex-y-center mt-6rpx text-18rpx text-hex-999">
          {{ grouoItem.code }}
          <text class="ml-24rpx">30.14（-3.8%）</text>
        </view>
      </view>
      <view class="flex-y-center">
        <view class="flex-y-center" @click="openPopup(grouoItem)">
          <view v-if="isPerOrSum === stockSumType.per" class="text-black text-28rpx font-bold">
            {{ grouoItem.percentage }}%
          </view>
          <view
            v-if="groupType === searchType.stock && isPerOrSum === stockSumType.sum"
            class="text-black text-28rpx font-bold"
          >
            {{ grouoItem.stockNum }}股
          </view>
          <view
            v-if="groupType !== searchType.stock && isPerOrSum === stockSumType.sum"
            class="text-black text-28rpx font-bold"
          >
            {{ grouoItem.cash }}元
          </view>
          <view class="flex flex-col ml-14rpx">
            <u-icon name="arrow-up-fill" color="#CDCDCD" size="10"></u-icon>
            <u-icon name="arrow-down-fill" color="#CDCDCD" size="10" class="mt-2rpx"></u-icon>
          </view>
        </view>
        <u-icon name="trash" color="#CDCDCD" size="24" class="ml-45rpx" @click="removeStockItem(grouoItem)" />
      </view>
    </view>
    <view class="h-1px bg-hex-E3E3E3"></view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import { stockSumType, searchType } from '@/config/common/system';

export default {
  props: {
    grouoItem: {
      type: Object,
      required: true
    },
    isPerOrSum: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      stockSumType,
      searchType
    };
  },
  computed: {
    ...mapGetters(['groupType'])
  },
  methods: {
    openPopup(grouoItem) {
      this.$emit('openPopup', grouoItem);
    },
    removeStockItem(grouoItem) {
      this.$emit('removeStockItem', grouoItem);
    }
  }
};
</script>

<style scoped lang="scss"></style>
