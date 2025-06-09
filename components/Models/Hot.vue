<script setup>
import { apiNew } from '@/constants';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const models = ref([])

fetch(`${apiNew}filters/models?car_tag_id=1`)
    .then(res => res.json())
    .then(data => models.value = data.models)
</script>

<template>
    <section class="section cars-hot">
        <div class="container">
            <div class="cars-hot__wrapper">
                <div class="cars-hot__header">
                    <BaseTitle :title="`Горячее предложение`" />
                </div>

                <div class="cars-hot__body cars-template">
                    <div class="car" v-for="model in models.slice(0, 8)">
                        <CarSmallNM2 :model="model" :key="model.id" />
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped></style>