<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useRoute } from 'vue-router';
const $route = useRoute();

const appStore = useAppStore();
let brands = computed(() => appStore.newBrands);
const newBrands = computed(() => appStore.newBrands);

let sortedBrands = brands.value

sortedBrands.sort((a, b) => {
    if (a.cars_count < b.cars_count) return 1
    if (a.cars_count > b.cars_count) return -1
    return 0
})

const chinaBrands = computed(() => {
    return newBrands.value.filter((brand) => brand.url_brand != 'lexus' && brand.url_brand != 'toyota');
})

const premiumBrands = computed(() => {
    return newBrands.value.filter((brand) => brand.url_brand == 'lexus' || brand.url_brand == 'toyota');
})
</script>

<template>
    <section class="brands section">
        <div class="container">
            <div class="brands__wrapper">
                <div class="brands__header section__header">
                    <BasePageTitle />
                </div>
                <div class="brands__body">
                    <div class="brands__item">
                        <div class="brands__row">
                            <ul class="brands__list new">
                                <li class="brand__item" v-for="brand in brands">
                                    <NuxtLink :to="`/cars/${brand.url_brand}`" class="brand__link"
                                        :class="{ 'active': $route.params.brandId === brand.url_brand }">
                                        <div class="brand__content">
                                            <p class="brand__name">{{ brand.brand }}</p>
                                            <span class="brand__count">{{ brand.cars_count }} авто</span>
                                        </div>
                                        <NuxtImg lazy format="webp" quality="90" loading="lazy" class="brand__logo"
                                            :src="brand.logo" :alt="brand.brand" v-if="brand.logo" />
                                        <i class="fa-solid fa-car-side brand__logo" v-else />
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.brands__item {
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>