<script setup>
import { useIdle, useTimestamp } from '@vueuse/core'
import { apiNew } from '@/constants';

import { useRoute } from 'vue-router'
const $route = useRoute()

import { useError } from 'nuxt/app';
const error = useError();
const hasError = computed(() => !!error.value);

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useNewCarStore } from '/stores/NewCarStore.js';
const NewCarStore = useNewCarStore();

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const isOpen = ref(false);
const shown = ref(false);

const car = ref(null);
const loadingCar = ref(false);
const errorCar = ref(null);

async function fetchCar() {
    loadingCar.value = true;
    errorCar.value = null;

    try {
        if ($route.name === 'car') {
            car.value = NewCarStore.car;
        } else if ($route.name === 'model') {
            const res = await fetchClientWrapper(`${apiNew}filters/cars?sorting=price_desc&page=1&per_page=1&car_model_id=${newStore.model.id}`);
            const data = await res.json();
            car.value = data.cars.data[0];
        } else if ($route.name === 'brand') {
            const res = await fetchClientWrapper(`${apiNew}filters/cars?sorting=price_desc&page=1&per_page=1&brand_id=${newStore.brand.id}`);
            const data = await res.json();
            car.value = data.cars.data[0];
        } else if ($route.name === 'china') {
            const res = await fetchClientWrapper(`${apiNew}filters/cars?sorting=created_at_desc&per_page=8&page=1&car_tag_id=2`);
            const data = await res.json();
            car.value = data.cars.data[0];
        } else if ($route.name === 'taxi') {
            const res = await fetchClientWrapper(`${apiNew}models/model/3475`);
            const data = await res.json();
            car.value = {
                id: data.id,
                brand: data.brand,
                model: data.model,
                preview: data.preview,
                sale: data.sale,
                price: data.min_price + data.sale,
            };
        } else {
            if (newStore.AFKcar) {
                car.value = newStore.AFKcar;
                return;
            }
            const res = await fetchClientWrapper(`${apiNew}filters/cars?sorting=created_at_desc&page=1&per_page=1`);
            const data = await res.json();
            newStore.AFKcar = data.cars.data[0];
            car.value = newStore.AFKcar;
        }
    } catch (err) {
        errorCar.value = err;
    } finally {
        loadingCar.value = false;
    }
}

const computedCar = computed(() => {
    if (loadingCar.value) return 'Loading...';
    if (errorCar.value) return 'Error loading car data';
    return car.value || 'No car data available';
});

// Загрузка данных при монтировании компонента
onMounted(() => {
    fetchCar();
});
const { idle, lastActive } = useIdle(30000) // Афк модалка появится через 30 секунд

function modalShow() {
    isOpen.value = !isOpen.value
    appStore.modalShown = !appStore.modalShown

    if (isOpen.value) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }
}


watch(idle, (idle) => {
    if (idle && !shown.value && !appStore.modalShown && $route.name != 'success' && !appStore.showOnce && !error.value) {
        shown.value = true
        appStore.showOnce = true
        modalShow()
    }
})
</script>

<template>
    <div v-if="isOpen">
        <BaseModal
            :modal-title="'Есть сомнения в выборе? Оставьте заявку! Ответим на все ваши вопросы и подберем идеальный автомобиль!'"
            :modalSubTitle="`Купить новый ${cleanUpTitle(computedCar.brand, computedCar.model)} в кредит от ${makeSpaces(appStore.calcMonthPrice(computedCar))} руб./мес.`"
            :appType="6" @closeModal="modalShow()" v-if="computedCar" :car="computedCar" />
        <BaseModal :modal-title="'Не можете определиться? Закажите обратный звонок!'" :appType="6"
            @closeModal="modalShow()" v-else />
    </div>
</template>

<style scoped lang="scss">
.card__btn {
    font-weight: 700;
    font-size: var(--standart-size);
    line-height: 16px;
    border-radius: 6px;
    width: 100%;
    height: 40px;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.credit__button {
    background: var(--yellow);
}

.row__credit-btn {
    padding: 9px 5px;
    max-width: 256px;
    width: 100%;
    background: var(--main-color);
    border-radius: 4px;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;

    @media screen and (max-width: 767px) {
        display: none;
        position: absolute;
        left: 0;
        opacity: 0;
        max-width: calc(100% - 40px);
        height: 100%;
    }
}

.modal__dialog {
    .modal__content {
        .modal__title {
            color: var(--main-black);
            font-weight: 700;
            font-size: var(--big-size);
            line-height: normal;
            margin: 10px 0;
            padding-top: 8px;
            width: auto;
            text-align: center;
        }

        .modal__text {
            font-weight: 500;
            font-size: var(--big-size);
            line-height: 26px;
            color: var(--main-black);

            span {
                font-weight: 700;
                color: var(--main-color);
            }
        }
    }
}
</style>