<script setup>
const appStore = useAppStore();

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
        <NuxtLink class="car__img" :to="`/cars/${car.url_brand}/${car.url_model}/${car.url_generation}/${car.id}`">
            <NuxtImg lazy format="webp" quality="90" loading="lazy"
                :src="`${car.images[0]?.url ? car.images[0].url : ''}`"
                :alt="car.brand + ' ' + car.model + ' ' + car.modification" />
        </NuxtLink>

        <div class="car__content">
            <div class="car__title">
                {{ car.brand }} {{ car.model }}<br>
                <span>{{ car.modification }}</span>
            </div>

            <div class="car__price">
                <div class="car__price-current">
                    от {{ makeSpaces(car.price - car.sale) }} руб.
                </div>
                <div class="car__price-old" v-if="car.sale">
                    от {{ makeSpaces(car.price) }} руб.
                </div>
            </div>

            <div class="car__button">
            </div>

            <div class="car__sale" :class="{ 'active': car.sale }">
                Скидка {{ makeSpaces(car.sale ? car.sale : 0) }} руб
            </div>

            <div class="car__info">
                <ul class="car__info-list">
                    <li class="car__info-item">
                        <span>Владельцы</span>
                        <span>{{ car.owner_count_id == 1 ? '1' : car.owner_count_id == 2 ? '2' : car.owner_count_id == 3
                            ? '3+' :
                            '0' }} вл.</span>
                    </li>
                    <li class="car__info-item">
                        <span>Гарантия</span>
                        <span>1 год</span>
                    </li>
                    <li class="car__info-item">
                        <span>Год выпуска</span>
                        <span>{{ car.year }} км</span>
                    </li>
                    <li class="car__info-item">
                        <span>Пробег</span>
                        <span>{{ makeSpaces(car.mileage) }} км</span>
                    </li>
                    <li class="car__info-item modification">
                        <span>Модификация</span>
                        <span>{{ car.modification }}</span>
                    </li>
                    <li class="car__info-item">
                        <span>Тип двигателя</span>
                        <span>{{ car.fuel }}</span>
                    </li>
                    <li class="car__info-item">
                        <span>Привод</span>
                        <span>{{ car.drive }}</span>
                    </li>
                    <li class="car__info-item">
                        <span>Цвет</span>
                        <span>{{ car.color }}</span>
                    </li>

                </ul>

            </div>

            <div class="car__controls">
                <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.url_generation}/${car.id}`"
                    class="car__more-link">Подробнее
                </NuxtLink>
                <div class="car__controls-item" @click="favorite(car)"
                    :class="{ 'active': appStore.checkFavorite(car) }">
                    <i class="fa-regular fa-star"></i>
                </div>
                <div class="car__controls-item" @click="appStore.comparisonRemove(car)">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        </div>



    </div>
</template>

<style scoped lang="scss">
.car {
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: center;
    transition: 0.3s;

    @media screen and (max-width: 768px) {
        min-width: 340px;
    }

    .car__content {
        width: 100%;

        .car__title {
            text-align: center;
            font-size: var(--big-size);
            padding: 10px 10px;
            font-weight: normal;
            line-height: 23px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            span {
                font-size: 18px;
            }
        }


        .car__price {
            display: flex;
            justify-content: center;
            width: 100%;
            align-items: center;
            flex-direction: column;
            min-height: 45px;

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

        .car__controls {
            display: flex;
            gap: 10px;
            margin-top: 20px;

            .car__controls-item {
                padding: 15px;
                background: var(--light-grey);
                border-radius: 20px;
                cursor: pointer;
            }

            .car__controls-item.active {
                color: var(--main-color);

                i {
                    font-weight: 900;
                }
            }

            .car__more-link {
                text-align: center;
                text-decoration: none;
                padding: 15px;
                background: var(--light-grey);
                border-radius: 20px;
                width: 100%;
            }
        }

        .car__sale {
            text-align: center;
            background: #36B555;
            padding: 10px;
            border-radius: 20px;
            color: white;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 20px;
            opacity: 0;
        }

        .car__sale.active {
            opacity: 1;
        }

        .car__info-list {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            gap: 15px;

            .car__info-item {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span:nth-child(2) {
                    text-align: end;
                }
            }

            .car__info-item.modification {
                min-height: 40px;
            }
        }

        .car__button {
            display: grid;
            padding-bottom: 20px;
            padding-top: 25px;
            width: 100%;
            grid-template-columns: 1fr max-content;

            .car__button-price {
                padding: 15px 15px;
                border-bottom: 2px solid var(--border-color);
                border-top: 2px solid var(--border-color);
                border-left: 2px solid var(--border-color);
                border-top-left-radius: 15px;
                border-bottom-left-radius: 15px;
                font-weight: bold;
                text-align: center;
            }

            .car__button-buy {
                color: var(--bg-light);
                padding: 0 10px;
                background: var(--main-color);
                height: 52px;
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
    }

    .car__img {
        position: relative;
        height: 100%;
        width: 100%;
        max-height: 200px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    }
}
</style>