<script setup>
import { apiNew } from '@/constants';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const cars = ref([])

const loading = ref(true);

fetch(`${apiNew}filters/cars?page=1&per_page=8&sorting=price_asc&car_tag_id=2`)
    .then(res => res.json())
    .then(data => cars.value = data.cars.data)
    .then(() => loading.value = false)
</script>

<template>
    <section class="section cars-hot">
        <div class="container">
            <div class="cars-hot__wrapper">
                <div class="cars-hot__header">
                    <BaseTitle :title="`Горячее предложение`" />
                </div>

                <div class="cars-hot__body cars-template" v-if="!loading">
                    <div class="car" v-for="car in cars">
                        <CarSmallC1 :car="car" :key="car.id" />
                    </div>
                </div>

                <div class="cars-hot__body cars-template" v-else>
                    <div class="car" v-for="car in appStore.currentPerPage">
                        <div class="skeleton-car">
                            <div class="image skeleton" />
                            <div class="small-text skeleton" />
                            <div class="text skeleton" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped></style>