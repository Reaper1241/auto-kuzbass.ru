<script setup>
import { useRoute } from 'vue-router';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const $route = useRoute();

const props = defineProps(['carsCount'])
const emits = defineEmits(['updateCars'])
</script>

<template>
    <div class="cars__head">
        <Title
            :title="`${$route.params.carId ? `Другие ${$route.params.brand.toUpperCase().replaceAll('_', ' ')} ${$route.params.model.toUpperCase().replaceAll('_', ' ')} в наличии ${props.carsCount - 1} авто` : `Найдено ${props.carsCount} авто`}`">
        </Title>
        <div class="cars_head-filters">
            <div class="cars__head-contols">
                <label class="main-label">
                    <select class="sort main-select" v-model="appStore.sort" @change="emits('updateCars')">
                        <option value="price_asc">Cначала дешевле</option>
                        <option value="price_desc">Сначала дороже</option>
                        <option value="year_asc">Сначала старые</option>
                        <option value="year_desc">Сначала новые</option>
                        <option value="mileage_asc">Минимальный пробег</option>
                        <option value="mileage_desc">Большой пробег</option>
                    </select>
                </label>
            </div>

            <!--
            <div class="cars__head-contols filters main-select">
                <i class="fa-solid fa-sliders"></i>Фильтр
            </div>
            -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cars__head {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .cars_head-filters {
        display: flex;
        gap: 10px;
    }

    .cars__head-contols {
        display: flex;
        gap: 10px;

        .main-label {
            position: relative;

            &:after {
                content: "\f107";
                position: absolute;
                right: 10px;
                top: 10px;
                font-family: "Font Awesome 6 Free";
                font-weight: 900;
                pointer-events: none;
                background: var(--light-grey);
                padding: 3px 4px;
                border-radius: 100%;
                text-align: center;
            }

            .main-select {
                width: 100%;
                font-size: 16px;
            }
        }
    }

    .cars__head-contols.filters {
        color: var(--main-color);
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: start;
        justify-content: start;
        gap: 15px;
    }
}
</style>