<script setup>
const props = defineProps(['title'])
</script>


<template>
    <h2 class="title">{{ title }}</h2>
</template>


<style lang="scss" scoped>
.title {
    font-size: var(--big-size);
    font-weight: bold;
    line-height: normal;
    margin-bottom: 30px;
}

.margin-0 {
    margin: 0;
}
</style>