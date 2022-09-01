<template>
  <view>
    <view v-show="!stockGlobalList.length" class="flex-center mt-194rpx text-40rpx text-hex-333 font-bold">
      添加你想要添加的{{ groupTitle }}吧
    </view>
    <view class="flex-center bg-hex-F7FAFF mt-54rpx h-60rpx" @click="$emit('toSearchGroup')">
      <view class="flex-y-center">
        <u-icon name="plus" class="mr-20rpx" color="#3487EF" />
        <text class="text-26rpx text-hex-3487EF">添加{{ groupTitle }}</text>
      </view>
    </view>
    <view
      v-show="stockGlobalList.length"
      class="flex-y-center justify-end h-94rpx ml-8rpx text-24rpx text-primary"
      @click="changePerOrSum"
    >
      {{ perOrSumText }}
      <u-icon name="arrow-right" color="#3487EF"></u-icon>
    </view>
    <view
      v-show="isPerOrSum !== stockSumType.per"
      class="flex-y-center justify-between bg-hex-F7FAFF h-104rpx px-32rpx text-black font-bold"
    >
      <view>投资总金额</view>
      <view class="flex-y-center" @click="openAmountPopup">
        {{ totalAmount }}元
        <view class="flex flex-col ml-14rpx">
          <u-icon name="arrow-up-fill" color="#CDCDCD" size="10"></u-icon>
          <u-icon name="arrow-down-fill" color="#CDCDCD" size="10" class="mt-2rpx"></u-icon>
        </view>
      </view>
    </view>
    <view
      :class="[isPerOrSum === stockSumType.per && !stockGlobalList.length ? 'mt-64rpx' : '']"
      class="relative flex h-104rpx text-40rpx"
    >
      <view class="absolute-lt wh-full">
        <view class="h-full px-32rpx">
          <view class="flex-y-center justify-between h-full text-white">
            <text>剩余现金</text>
            <text>{{ investPercentage }}%</text>
          </view>
        </view>
      </view>
      <view v-show="investPercentage" :style="{ width: investPercentage + '%' }" class="h-full bg-primary"></view>
      <view v-show="moneyPercentage" :style="{ width: moneyPercentage + '%' }" class="h-full bg-hex-999"></view>
    </view>
    <view v-for="item in stockGlobalList" :key="item.code">
      <group-item
        :is-per-or-sum="isPerOrSum"
        :grouo-item="item"
        @openPopup="openPopup"
        @removeStockItem="removeStockItem"
      />
    </view>
    <input-popup
      :show-popup="showPopup"
      :stock-item="stockItem"
      :unit="unit"
      :default-input-value="defaultInputValue"
      @confirm="confirm"
      @cancel="showPopup = false"
    />

    <input-popup
      :show-popup="showAmoutPopup"
      :stock-item="totalAmountPopup"
      :default-input-value="totalAmount"
      :unit="unit"
      @confirm="confirmAmount"
      @cancel="showAmoutPopup = false"
    />
    <custom-popup
      :show-popup="showDeletePopup"
      title="提示"
      content="确定从持仓中移除该支股票吗？"
      confirm-text="确定"
      cancel-text="取消"
      :con-firm-class="['bg-hex-F80000', 'text-white']"
      @cancel="showDeletePopup = false"
      @confirm="confirmDelete"
    />

    <view class="mt-240rpx px-152rpx">
      <view class="w-446rpx h-90rpx">
        <u-button type="primary" text="创建" shape="circle" :custom-style="buttonStyle" @click="createGroup"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex';
import CustomPopup from '@/components/CustomPopup';
import { createGroup } from '@/service/api/group.js';
import { typeList, stockSumType, stockSumTypeList, groupTypeList, searchType } from '@/config/common/system';
import GroupItem from './GroupItem';
import InputPopup from './InputPopup';

export default {
  components: {
    CustomPopup,
    GroupItem,
    InputPopup
  },
  options: {
    styleIsolation: 'shared' //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
  },
  props: {
    // 具体股票类型 1沪深  2港股
    stockDetailtype: {
      type: Number,
      required: true
    },
    groupName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      stockSumType,
      //  显示删除股票弹框
      showDeletePopup: false,
      // 显示输入持股比例弹框
      showPopup: false,
      // // 显示输入总现金弹框
      showAmoutPopup: false,
      defaultInputValue: 0,
      // 输入持股比例弹框显示的信息
      stockItem: {},
      // 删除的股票信息
      deleteStockItem: {},
      buttonStyle: {
        height: '100%'
      },
      // 1按比例输入 2还是按股数输入
      isPerOrSum: 1,
      // 输入文案
      perOrSumText: '切换股数输入',
      // 单位
      unit: '%',
      // 输入的总金额
      totalAmount: 0,
      // 总金额弹窗标题
      totalAmountPopup: {
        name: '投资总金额',
        code: ''
      },
      progressText: '剩余现金',
      groupTitle: ''
    };
  },
  computed: {
    ...mapGetters(['stockGlobalList', 'groupType']),
    investPercentage() {
      let percentage = 100;
      if (this.isPerOrSum === stockSumType.per) {
        this.stockGlobalList.forEach(v => {
          percentage -= v.percentage;
        });
      } else if (this.groupType === searchType.stock) {
        // this.stockGlobalList.forEach(v => {
        // 计算公式 ：输入的股数*股价/总金额
        //   percentage -= Number(v.stockNum);
        // });
      } else {
        this.stockGlobalList.forEach(v => {
          percentage -= this.toPercent(v.cash);
        });
      }
      return percentage;
    },

    moneyPercentage() {
      let percentage = 0;
      if (this.isPerOrSum === stockSumType.per) {
        this.stockGlobalList.forEach(v => {
          percentage += Number(v.percentage);
        });
      } else if (this.groupType === searchType.stock) {
        percentage = 0;
        // this.stockGlobalList.forEach(v => {
        //   // 计算公式 ：输入的股数*股价/总金额
        //   percentage += Number(v.stockNum);
        // });
      } else {
        this.stockGlobalList.forEach(v => {
          percentage += this.toPercent(v.cash);
        });
      }
      return percentage;
    }
  },
  watch: {
    showPopup() {
      const { percentage, stockNum } = this.stockItem;
      this.defaultInputValue = this.isPerOrSum === stockSumType.per ? percentage : stockNum;
    },
    showAmoutPopup(newVal) {
      if (!newVal) {
        this.handleChangePerOrSum();
      } else {
        this.unit = '元';
      }
    },
    isPerOrSum() {
      this.handleChangePerOrSum();
    }
  },
  created() {
    this.groupTitle = this.groupType === searchType.stock ? '股票' : '基金';
    this.handleChangePerOrSum();
  },

  methods: {
    // 两个数的百分比，保留小数点后两位百分比
    toPercent(num) {
      // 不是数字 或者为0 直接返回
      // eslint-disable-next-line no-restricted-globals
      if (isNaN(num) || !num || !this.totalAmount) {
        return 0;
      }
      return `${Math.round((num / this.totalAmount) * 10000) / 100.0}`; // 小数点后两位百分比
    },
    openAmountPopup() {
      this.showAmoutPopup = true;
    },
    // 确认总金额
    confirmAmount(money) {
      this.totalAmount = money;
      this.showAmoutPopup = false;
    },
    // 切换百分比 持股
    handleChangePerOrSum() {
      if (this.isPerOrSum === stockSumType.per) {
        const sumText = this.groupType === searchType.stock ? '股数' : '金额';
        this.perOrSumText = `切换${sumText}输入`;
        this.unit = '%';
      } else {
        this.perOrSumText = '切换持股输入';
        this.unit = this.groupType === searchType.stock ? '股' : '元';
      }
    },
    changePerOrSum() {
      this.isPerOrSum = this.isPerOrSum === stockSumType.per ? 2 : 1;
    },
    // 输入每股的持仓比例
    confirm(value) {
      const val = Number(value);
      if (this.isPerOrSum === stockSumType.per) {
        let percentage;
        if (this.stockGlobalList.length > 1) {
          percentage = this.moneyPercentage * 1 + val;
        } else {
          percentage = val;
        }
        if (percentage > 100) {
          uni.showToast({
            title: `输入该${this.groupTitle}持仓比例有误`,
            icon: 'none'
          });
          this.showPopup = false;
          return;
        }

        this.stockItem.percentage = val;
      } else if (this.groupType === searchType.stock) {
        // const { price } = this.stockItem;
        const moeny = val * 1;
        if (moeny > this.totalAmount) {
          uni.showToast({
            title: '输入该股数有误',
            icon: 'none'
          });
          this.showPopup = false;
          return;
        }
        this.stockItem.stockNum = val;
      } else {
        let percentage;
        if (this.stockGlobalList.length > 1) {
          percentage = this.moneyPercentage * 1 + this.toPercent(val);
        } else {
          percentage = this.toPercent(val);
        }
        if (percentage > 100) {
          uni.showToast({
            title: '输入该基金持仓金额有误',
            icon: 'none'
          });
          this.showPopup = false;
          return;
        }
        this.stockItem.cash = val;
      }
      this.showPopup = false;
      this.$store.commit('SET_STOCK_PRICE', this.stockItem);
    },
    // 打开输入每股的比例弹窗
    openPopup(item) {
      if (!this.totalAmount && this.isPerOrSum !== stockSumType.per) {
        uni.showToast({
          title: '输先输入总金额',
          icon: 'none'
        });
        return;
      }
      this.showPopup = true;
      this.stockItem = { ...item };
    },
    // 显示删除股票的弹窗
    removeStockItem(item) {
      this.showDeletePopup = true;
      this.deleteStockItem = { ...item };
    },
    // 确定删除股票
    confirmDelete() {
      this.showDeletePopup = false;
      this.$store.commit('REMOVE_STOCK_ITEM', this.deleteStockItem);
      uni.showToast({
        title: `移除${this.groupTitle}成功`,
        icon: 'success'
      });
    },
    // 创建组合
    async createGroup() {
      if (!this.stockGlobalList.length) {
        uni.showToast({
          title: `请确保你创建的组合包含至少1只${this.groupTitle}`,
          icon: 'none'
        });
        return;
      }
      let bool;
      if (this.isPerOrSum === stockSumType.per) {
        bool = this.stockGlobalList.every(v => v.percentage !== 0);
        uni.showToast({
          title: `请确保你所有${this.groupTitle}持仓比例大于0。`,
          icon: 'none'
        });
      } else if (this.groupType === searchType.stock) {
        bool = this.stockGlobalList.every(v => v.stockNum !== 0);
        uni.showToast({
          title: '请确保你所有股票股数大于0。',
          icon: 'none'
        });
      } else {
        bool = this.stockGlobalList.every(v => v.cash !== 0);
        uni.showToast({
          title: '请确保你所有基金持仓金额大于0。',
          icon: 'none'
        });
      }
      if (!bool) return;

      uni.showLoading({
        title: '加载中'
      });
      const typeItem = typeList.find(v => v.id === this.groupType);

      const { type: parterType } = typeItem;
      const stockSumTypeItem = stockSumTypeList.find(v => v.id === this.isPerOrSum);
      const { type: stockSumPerType } = stockSumTypeItem;
      const detailParamList = this.stockGlobalList.map(v => {
        const percentage = v.percentage || '';
        const stockNum = v.stockNum || v.cash || '';
        const obj = {
          stockCode: v.code,
          stockPer: percentage,
          stockSum: stockNum
        };
        return obj;
      });
      const groupTypeItem = groupTypeList.find(v => v.id === this.stockDetailtype);
      const { type: stockType } = groupTypeItem;
      const res = await createGroup(stockType, parterType, 99999, this.groupName, stockSumPerType, detailParamList);
      if (!res.error) {
        uni.hideLoading();
        this.$Router.back(1);
        setTimeout(() => {
          uni.showToast({
            title: '创建组合成功'
          });
        }, 300);
        this.$store.commit('CLEAN_STOCK_GLOBAL_LIST');
      }
    }
  }
};
</script>

<style scoped lang="scss">
/deep/ .parentInput .u-input {
  border-bottom: 1px solid #e3e3e3;
  font-weight: bold;
}
</style>
