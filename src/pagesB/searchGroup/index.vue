<template>
  <view class="px-32rpx">
    <nav-bar left-text="搜索" />
    <view class="mt-10rpx mb-40rpx">
      <u-search
        v-model="keyword"
        shape="square"
        :show-action="false"
        placeholder="请输入公司名称/股票代码"
        @change="handleChange"
      ></u-search>
    </view>
    <view v-for="(item, index) in groupList" :key="index">
      <view class="flex-y-center justify-between pb-40rpx">
        <view class="flex flex-col">
          <rich-text class="text-30rpx" :nodes="item.chiNameAbbrText"></rich-text>

          <view class="text-20rpx mt-10rpx">{{ item.code }}</view>
        </view>
        <view :class="[item.isChecked ? 'checked' : 'unChecked']" class="flex-center w-102rpx h-48rpx rounded-16rpx">
          <u-icon v-if="item.isChecked" name="checkmark" color="#C1C1C1" size="22" />
          <u-icon v-else name="plus" color="#3487ef" size="22" @click="addGroupItem(item)" />
        </view>
      </view>
    </view>
    <view v-show="isEmpty" class="mt-20rpx flex-center text-24rpx text-hex-999">暂无数据</view>
  </view>
</template>

<script>
import { searchStock } from '@/service/api/group.js';

export default {
  data() {
    return {
      keyword: '',
      search: '',
      groupList: [],
      groupType: 0,
      loading: false
    };
  },
  computed: {
    isEmpty() {
      return !this.groupList.length && !this.loading && this.keyword.length;
    }
  },
  created() {
    this.groupType = this.$getters.groupType;
  },
  methods: {
    brightenKeyword(val, keyword) {
      const Reg = new RegExp(keyword, 'i');
      let res = '';
      if (val) {
        res = val.replace(Reg, `<span style="color: #F94358;">${keyword}</span>`);
      }
      return res;
    },
    async handleChange(val) {
      if (!val) {
        this.groupList = [];
        return;
      }
      uni.showLoading({
        title: '加载中'
      });
      this.loading = true;
      const { error, data } = await searchStock(val, this.groupType);
      const { includesGroup } = this.$getters;
      if (!error) {
        this.groupList = data.map(v => {
          const obj = { ...v };
          obj.isChecked = includesGroup(v.code);
          obj.chiNameAbbrText = this.brightenKeyword(v.name, this.keyword);
          return obj;
        });
      }
      this.loading = false;
      uni.hideLoading();
    },
    addGroupItem(groupItem) {
      this.$store.commit('SET_STOCK_GLOBAL_LIST', groupItem);
      const { includesGroup } = this.$getters;
      this.groupList = this.groupList.map(v => {
        const obj = { ...v };
        obj.isChecked = includesGroup(v.code);
        return obj;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.checked {
  border: 1px solid #c1c1c1;
}

.unChecked {
  border: 1px solid #3487ef;
}
</style>
