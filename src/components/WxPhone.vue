<template>
  <view>
    <view v-if="!$getter.isLogin" class="parentButton absolute-lt opacity-0 wh-full">
      <view class="parentButton wh-full" @click.stop>
        <u-button
          open-type="getPhoneNumber"
          text="微信授权"
          class="wh-full"
          @getphonenumber="getphonenumber"
        ></u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    getphonenumber(e) {
      // eslint-disable-next-line no-console
      console.log(e.detail.code);
      // eslint-disable-next-line no-console
      console.log('e.detail: ', e.detail);
      this.$emit('success');
    }
  }
};
</script>

<style scoped lang="scss"></style>
