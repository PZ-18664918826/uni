<template>
  <view class="relative wh-full">
    <slot></slot>
    <view
      v-show="showPlaceholder"
      class="absolute-lt wh-full bg-white dark:bg-dark transition-background-color duration-300 ease-in-out"
    >
      <view v-show="loading" class="absolute-center mt-20px">
        <view class="container loading2">
          <view class="shape shape1"></view>
          <view class="shape shape2"></view>
          <view class="shape shape3"></view>
          <view class="shape shape4"></view>
        </view>
      </view>

      <view v-show="isEmpty" class="absolute-center">
        <view class="relative w-full">
          <p class="absolute-lb w-full text-center text-28rpx text-hex-999 font-bold">{{ emptyDesc }}</p>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    empty: {
      type: Boolean,
      default: false
    },
    emptyDesc: {
      type: String,
      default: '暂无数据'
    }
  },
  data() {
    return {};
  },
  computed: {
    isEmpty() {
      return this.empty && !this.loading;
    },
    showPlaceholder() {
      return this.loading || this.isEmpty;
    },
    showUcharts() {
      return !this.isEmpty && !this.loading;
    }
  }
};
</script>

<style scoped="true">
.container {
  width: 30px;
  height: 30px;
  position: relative;
}

.container.loading2 {
  -webkit-transform: rotate(10deg);
  transform: rotate(10deg);
}
.container.loading2 .shape {
  border-radius: 5px;
}
.container.loading2 {
  -webkit-animation: rotation 1s infinite;
  animation: rotation 1s infinite;
}

.container .shape {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 1px;
}
.container .shape.shape1 {
  left: 0;
  background-color: #1890ff;
}
.container .shape.shape2 {
  right: 0;
  background-color: #91cb74;
}
.container .shape.shape3 {
  bottom: 0;
  background-color: #fac858;
}
.container .shape.shape4 {
  bottom: 0;
  right: 0;
  background-color: #ee6666;
}

.loading2 .shape1 {
  -webkit-animation: animation2shape1 0.5s ease 0s infinite alternate;
  animation: animation2shape1 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation2shape1 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, 20px);
    transform: translate(20px, 20px);
  }
}

@keyframes animation2shape1 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, 20px);
    transform: translate(20px, 20px);
  }
}
.loading2 .shape2 {
  -webkit-animation: animation2shape2 0.5s ease 0s infinite alternate;
  animation: animation2shape2 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation2shape2 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, 20px);
    transform: translate(-20px, 20px);
  }
}

@keyframes animation2shape2 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, 20px);
    transform: translate(-20px, 20px);
  }
}
.loading2 .shape3 {
  -webkit-animation: animation2shape3 0.5s ease 0s infinite alternate;
  animation: animation2shape3 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation2shape3 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, -20px);
    transform: translate(20px, -20px);
  }
}

@keyframes animation2shape3 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(20px, -20px);
    transform: translate(20px, -20px);
  }
}
.loading2 .shape4 {
  -webkit-animation: animation2shape4 0.5s ease 0s infinite alternate;
  animation: animation2shape4 0.5s ease 0s infinite alternate;
}

@-webkit-keyframes animation2shape4 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, -20px);
    transform: translate(-20px, -20px);
  }
}

@keyframes animation2shape4 {
  from {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  to {
    -webkit-transform: translate(-20px, -20px);
    transform: translate(-20px, -20px);
  }
}
</style>
