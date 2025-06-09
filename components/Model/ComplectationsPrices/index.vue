<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))
</script>

<template>
    <section class="complectations section" v-if="currentMod?.car_complectations.length">
        <div class="container">
            <div class="complectations__header">
                <BaseTitle
                    :title="`Комплектации и цены на ${$route.params.brand.toUpperCase()} ${$route.params.model.toUpperCase()}`" />
            </div>

            <div class="complectations__body">
                <div class="complectations__list">
                    <ModelComplectationsPricesCard v-for="complectation in currentMod?.car_complectations"
                        :key="complectation.id" :complectation="complectation"
                        :image="newStore.model?.colored_galleries[0]?.url" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.complectations__header {
    margin-bottom: 30px;
}

.complectations__list {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 767px) {
        grid-template-columns: 1fr;
        gap: 20px
    }
}
</style>