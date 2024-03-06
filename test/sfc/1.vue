<template>
  <div class="title"></div>
  <div class="title title-0" />
  <div :class="['title title-0', true]" />
  <div :class="[{ 'title title-0': true }, 'title-1']" />
  <div :class="[{ title: true, 'title-0': true }]" />
</template>

<style>
.title {
  font-size: 8px;
}
.title-0 {
  padding: 10px;
}
.title-1 {
  margin: 10px;
}
</style>
