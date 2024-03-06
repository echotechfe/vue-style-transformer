<template>
  <view class="wrapper">
    <text class="wrapper-text">setup</text>
    <text class="wrapper-h5">h5</text>
  </view>
  <view :class="{ 'bind-class': a }">
    <view :class="['title', oTextClassName]"></view>
    <view :class="[a ? 'title' : 'subtitle']"></view>
    <view :class="[{ title: true }, 'subtitle']"></view>
    <view :class="classObject"></view>
  </view>
</template>
<script setup>
const a = 1
const oTextClassName = 'otext-1'
const classObject = {
  title: true,
}
</script>
<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 16rpx;
  background-image: url('https://img.yzcdn.cn/vant/cat.jpeg');
  background-position: 0%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .wrapper-text {
    font-size: 32px;
    color: #000;

    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  &-h5 {
    font-size: 28rpx;
    font-weight: 500;
    line-height: 44rpx;
  }
}
.bind-class {
  color: red;

  width: calc(100% - 32rpx);
  opacity: 0.5;
  gap: 10rpx;

  border: 2rpx solid rgba(0, 0, 0, 0.12);
  .title {
    margin: 10rpx 20rpx;
    padding-top: 20rpx;

    color: rgb(32, 36, 38);
  }
  .subtitle {
    color: #f5f5f5;
  }
}
</style>
