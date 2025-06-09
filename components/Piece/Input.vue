<script setup>

const props = defineProps({
    name: String,
    class: String,
    type: String,
    placeholder: String,
})
</script>


<template>
    <input :type="props.type" :name="props.name" :placeholder="props.placeholder" v-maska="name" :class="props.class"
        v-model="nameValue" autocomplete="on">
</template>


<style lang="scss" scoped></style>