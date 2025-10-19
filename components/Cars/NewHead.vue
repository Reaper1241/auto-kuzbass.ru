<script setup>
import { useRoute } from 'vue-router';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const $route = useRoute();

const props = defineProps(['carsCount', 'title'])
const emits = defineEmits(['updateCars'])
</script>

<template>
    <div class="cars__head">
        <BaseSectionTitle :title="`${title}`" />
        <div class="cars_head-filters">
            <div class="cars__head-contols">
                <label class="main-label">
                    <select class="sort main-select" v-model="appStore.newSort" @change="emits('updateCars')">
                        <option value="created_at_desc">Последние добавленные</option>
                        <option value="price_asc">Cначала дешевле</option>
                        <option value="price_desc">Сначала дороже</option>
                    </select>
                </label>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cars__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

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
                background: #f6f6f6;
                border-radius: 20px;
                min-width: 200px;
                padding: 10px 35px 10px 20px;
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