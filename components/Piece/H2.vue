<script setup>
const props = defineProps(['title'])
</script>

<template>
    <h2 class='title'>{{ props.title }}</h2>
</template>

<style scoped lang="scss">
.title {
    font-size: var(--medium-size);
    font-weight: bold;
    display: inline-block;
}

.padding {
    padding-bottom: 25px;
}

.big {
    font-size: var(--big-size);

    @media screen and (max-width: 767px) {
        font-size: var(--medium-size);
        text-align: center;
        width: 100%;
    }
}
</style>