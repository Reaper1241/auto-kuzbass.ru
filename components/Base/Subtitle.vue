<script setup>
const props = defineProps(['title'])
</script>


<template>
    <h3 class="title">{{ title }}</h3>
</template>


<style lang="scss" scoped>
.title {
    font-size: var(--medium-size);
    font-weight: 500;
    margin-bottom: 15px;
}
</style>