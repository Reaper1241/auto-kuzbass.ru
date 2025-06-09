<script setup>
const props = defineProps({
    title: String
})
</script>

<template>
    <div class="form-title">{{ title }}</div>
</template>


<style lang="scss" scoped>
.form-title {
    font-weight: bold;
    text-align: start;
    padding-bottom: 10px;
    font-size: var(--medium-size);

    &:not(:first-child) {
        padding-top: 15px;
    }
}
</style>