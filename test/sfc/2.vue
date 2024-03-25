<template>
  <div class="title"></div>
  <div class="title">
    <div class="subtitle"></div>
  </div>
</template>

<style lang="scss">
.title {
  font-size: 14px;
}

.subtitle {
  font-size: 12px;
}

.title + .active {
  .subtitle {
    font-size: 16px;
  }
}
</style>
