<template>
  <view>
    <custom-popup
      :show-popup="showPopup"
      :title="title"
      :content="phoneNumber"
      confirm-text="呼叫"
      cancel-text="取消"
      @cancel="cancel"
      @confirm="makePhoneCall"
    />
  </view>
</template>

<script>
import CustomPopup from './CustomPopup';

export default {
  components: {
    CustomPopup
  },
  props: {
    showPopup: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    cancel() {
      this.$emit('closePopup');
    },
    makePhoneCall() {
      uni.makePhoneCall({
        phoneNumber: this.phoneNumber
      });
      this.cancel();
    }
  }
};
</script>

<style scoped lang="scss"></style>
