<template>
  <view class="wrapper flex flex-col items-center justify-center rd-8">
    <text
      class="wrapper-text text-32 c-black w-full h-full bg-hex-f5f5f5 overflow-hidden relative z-1"
    >
      setup
    </text>
    <text class="wrapper-h5 text-h5">h5</text>
  </view>
  <view :class="{ 'bind-class op-50 gap-5 b-1 b-solid b-neutral-3': a }">
    <view :class="['title mx-10 my-5 pt-10', oTextClassName]"></view>
    <view
      :class="[a ? 'title mx-10 my-5 pt-10' : 'subtitle c-hex-f5f5f5']"
    ></view>
    <view
      :class="[{ 'title mx-10 my-5 pt-10': true }, 'subtitle c-hex-f5f5f5']"
    ></view>
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
  background-image: url('https://img.yzcdn.cn/vant/cat.jpeg');
  background-position: 0%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.bind-class {
  color: red;
  width: calc(100% - 32rpx);
}
.bind-class .title {
  color: rgb(32, 36, 38);
}
</style>
