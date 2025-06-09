<script setup>
const props = defineProps(['title'])
</script>

<template>
  <h1 class="main__title">
    {{ props.title }}
  </h1>
</template>

<style scoped lang="scss">
.main__title {
  font-weight: 400;
  font-size: 28px;
  line-height: 36px;
  margin: 30px 0;

  @media screen and (max-width: 767px) {
    font-size: 20px;
    line-height: 26px;
  }
}
</style>