<template>
  <div class="title text-8"></div>
  <div class="title title-0 text-8 p-10" />
  <div :class="['title title-0 text-8 p-10', true]" />
  <div :class="[{ 'title title-0 text-8 p-10': true }, 'title-1 m-10']" />
  <div :class="[{ 'title-0 p-10': true, 'title text-8': true }]" />
</template>

<style></style>
