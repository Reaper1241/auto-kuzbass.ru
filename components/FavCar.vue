<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const $route = useRoute();

const props = defineProps(['car'])
let car = computed(() => props.car)


function favorite(car) {
    appStore.checkFavorite(car) ? appStore.removeFavorite(car) : appStore.addFavorite(car)
}

function comparison(car) {
    appStore.checkComparison(car) ? appStore.removeComparison(car) : appStore.addComparison(car)
}
</script>

<template>
    <div class="car">
        <div class="car__controls">
            <div class="controls__item" @click="favorite(car)" :class="{ 'active': appStore.checkFavorite(car) }">
                <i class="fa-regular fa-star"></i>
            </div>
            <div class="controls__item" @click="comparison(car.id)"
                :class="{ 'active': appStore.checkComparison(car.id) }">
                <i class="fa-solid fa-scale-balanced"></i>
            </div>
        </div>
        <NuxtLink class="car__img" :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`">
            <NuxtImg lazy format="webp" quality="90" loading="lazy"
                :src="`${car.images[0]?.url ? car.images[0].url : ''}`"
                :alt="car.brand + ' ' + car.model + ' ' + car.modification" />
        </NuxtLink>
        <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`">
            <div class="car__title">
                {{ car.brand }} {{ car.model }}<br>{{ car.modification }}
            </div>
            <div class="car__info">
                <div class="car__info-item">
                    {{ car.year }} г.в.
                </div>
                <div class="car__info-item">
                    {{ makeSpaces(car.mileage) }} км.
                </div>
                <div class="car__info-item">
                    {{ car.owner_count_id }} вл.
                </div>
            </div>
            <div class="car__promo">
                <div class="car__promo-item">
                    Низкий %
                </div>
                <div class="car__promo-item green">
                    Скидка {{ makeSpaces(car.sale) }} руб.
                </div>
                <div class="car__promo-item">
                    VIN проверен
                </div>
                <div class="car__promo-item">
                    Гарантия до 5 лет
                </div>
                <div class="car__promo-item green">
                    Зимняя резина в подарок
                </div>
            </div>
        </NuxtLink>
        <div class="car__price">
            <div class="car__price-current">
                от {{ makeSpaces(car.price - car.sale) }} руб.
            </div>
            <div class="car__price-old">
                {{ makeSpaces(car.price) }} руб.
            </div>
        </div>
        <div class="car__button">
            <div class="car__button-price">от {{ makeSpaces(appStore.calcMonthPrice(car)) }} руб/мес.</div>
            <button class="car__button-buy">В кредит</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.car {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 320px;
    align-items: center;
    border: 2px solid var(--border-color);
    border-radius: 20px;
    transition: 0.3s;
    position: relative;

    &:hover {
        border: 2px solid var(--main-black);
        transition: 0.3s;

        .car__controls {
            opacity: 1;
            transition: 0.3s;
            z-index: 100;
        }
    }

    .car__title {
        text-align: center;
        font-size: var(--big-size);
        padding: 10px 10px;
        font-weight: bold;
        line-height: 23px;
    }

    .car__info {
        display: flex;
        justify-content: center;
        width: 100%;
        color: var(--bg-light);
        background: var(--main-black);
        padding: 10px 0;
        gap: 20px;
    }

    .car__promo {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 5px;
        padding: 25px 0;

        .car__promo-item {
            border: 2px solid var(--border-color);
            border-radius: 20px;
            padding: 8px 12px;
            font-size: var(--standart-size);
        }

        .green {
            color: #36B555;
            border: 2px solid #36B555;
            font-weight: 600;
        }
    }

    .car__price {
        display: flex;
        justify-content: center;
        width: 100%;
        align-items: center;
        flex-direction: column;

        @media screen and (max-width: 768px) {
            flex-direction: column;
        }

        .car__price-current {
            font-size: var(--extra-big-size);
            font-weight: 600;
            line-height: normal;

            @media screen and (max-width: 768px) {
                font-size: 26px;
            }
        }

        .car__price-old {
            text-decoration: line-through;
            line-height: normal;
            color: var(--light-dark-color);

            @media screen and (max-width: 768px) {
                font-size: var(--big-size);
            }
        }
    }

    .car__button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 20px;
        padding-top: 25px;

        .car__button-price {
            padding: 15px 15px;
            border-bottom: 2px solid var(--border-color);
            border-top: 2px solid var(--border-color);
            border-left: 2px solid var(--border-color);
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            font-weight: bold;
        }

        .car__button-buy {
            color: var(--bg-light);
            padding: 0 10px;
            background: var(--main-color);
            height: 100%;
            border-bottom-right-radius: 15px;
            border-top-right-radius: 15px;
            font-weight: bold;
            border: 3px solid var(--main-color);
            transition: 0.3s;

            &:hover {
                color: var(--main-color);
                background-color: var(--bg-light);
                transition: 0.3s;
            }
        }
    }

    .car__controls {
        opacity: 0;
        position: absolute;
        right: 15px;
        top: 15px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 14px 12px;
        background: var(--bg-light);
        border-radius: 20px;
        transition: 0.3s;

        @media screen and (max-width: 768px) {
            opacity: 1;
            z-index: 100;
            -webkit-box-shadow: 0px 0px 10px -5px rgba(20, 20, 20, 1);
            -moz-box-shadow: 0px 0px 10px -5px rgba(20, 20, 20, 1);
            box-shadow: 0px 0px 10px -5px rgba(20, 20, 20, 1);
            padding: 18px 14px;
            gap: 12px;
        }

        .controls__item {
            cursor: pointer;
            transition: 0.3s;

            i {
                font-size: 18px;

                @media screen and (max-width: 768px) {
                    font-size: var(--big-size);
                }
            }

            &:hover {
                color: var(--main-color);
                transition: 0.3s;
            }
        }

        .controls__item.active {
            color: var(--main-color);

            i {
                font-weight: 900;
            }
        }
    }

    .car__img {
        position: relative;
        height: 100%;
        width: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    }
}
</style>