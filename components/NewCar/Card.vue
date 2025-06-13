<script setup>
import { useNewCarStore } from '/stores/NewCarStore.js'
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const carStore = useNewCarStore()

const car = ref([]);
car.value = carStore.car

const sale = ref(car.value.sale);

onMounted(() => {
    yandexEcommerce('detail', car.value);
})

/*
viewed(car.value)

function viewed(car) {
    if (!appStore.checkViewed(car)) appStore.addViewed(car)
}

function favorite(car) {
    appStore.checkFavorite(car) ? appStore.removeFavorite(car) : appStore.addFavorite(car)
}

function comparison(car) {
    appStore.checkComparison(car) ? appStore.removeComparison(car) : appStore.addComparison(car)
}
*/

watch(() => carStore.car, (currentData) => {
    car.value = currentData
})

function updateSale(value) {
    sale.value = value
}

const loading = ref(true);
onMounted(() => {
    loading.value = false
})
</script>

<template>
    <section class="car-card section">
        <div class="container">
            <div class="car-card__wrapper">
                <div class="car-card__header section__header">
                    <BasePageTitle />
                    <div class="car-card__stickers">
                                <div class="car-card__credit"><span>В кредит от {{
                                    makeSpaces(appStore.calcMonthPrice(car))
                                        }} ₽/мес.</span>
                                </div>
                                <span class="sticker discount" v-if="car.sale">Скидка до {{ makeSpaces(car.sale) }}
                                    ₽
                                </span>
                            </div>
                     </div>

                <ClientOnly v-if="!loading">
                    <div class="car-card__body">
                        <div class="car-card__body-info">
                            <div class="car-card__params">
                                <div class="car-card__params-title">
                                    Характеристики:
                                </div>
                                <div class="car-card__params-list">
                                    <div class="car-card__param" v-if="car.complectation.complectation">
                                        <div class="car-card__param-title">Комплектация</div>
                                        <div class="car-card__param-value">{{ car.complectation.complectation }}</div>
                                    </div>
                                    <div class="car-card__param" v-if="car.modification.modification">
                                        <div class="car-card__param-title">Модификация</div>
                                        <div class="car-card__param-value">{{ car.modification.modification }}</div>
                                    </div>
                                    <div class="car-card__param" v-if="car.color">
                                        <div class="car-card__param-title">Цвет</div>
                                        <div class="car-card__param-value">{{ car.color }}</div>
                                    </div>
                                    <div class="car-card__param" v-if="car.modification.fuel">
                                        <div class="car-card__param-title">
                                            Тип двигателя
                                        </div>
                                        <div class="car-card__param-value">{{ car.modification.fuel }}</div>
                                    </div>
                                    <div class="car-card__param" v-if="car.modification.max_speed">
                                        <div class="car-card__param-title">Макс.скорость</div>
                                        <div class="car-card__param-value">{{ car.modification.max_speed }} км/ч</div>
                                    </div>

                                    <div class="car-card__param" v-if="car.modification.from_0_to_100">
                                        <div class="car-card__param-title">Разгон 0-100</div>
                                        <div class="car-card__param-value">{{ car.modification.from_0_to_100 }} с</div>
                                    </div>

                                    <div class="car-card__param" v-if="car.modification.drive">
                                        <div class="car-card__param-title">Привод</div>
                                        <div class="car-card__param-value">{{ car.modification.drive }}</div>
                                    </div>

                                    <div class="car-card__param" v-if="car.modification.transmission">
                                        <div class="car-card__param-title">Тип коробки передач</div>
                                        <div class="car-card__param-value">{{ car.modification.transmission }}</div>
                                    </div>

                                    <div class="car-card__param">
                                        <div class="car-card__param-title">Статус</div>
                                        <div class="car-card__param-value">В наличии</div>
                                    </div>
                                </div>
                            </div>

                            <div class="car-card__prices">
                                <div class="card-card__prices-content">
                                    <h2 class="card-card__title">Цена автомобиля:</h2>
                                    <div class="car-card__price">
                                        <span class="old" v-if="car.sale && sale > 0">
                                            от {{ makeSpaces(car.price) }} руб.
                                        </span>
                                        <span class="current">
                                            от {{ makeSpaces(car.price - sale) }} руб.
                                        </span>
                                    </div>

                                </div>
                            </div>

                            <div class="car-card__buttons">
                                <BaseButtonModal :car="car" :btn-label="'Купить в кредит'" :app-type="2"
                                    :modal-title="`Купить в кредит ${car.brand} ${car.model}`" :btn-class="`credit`"
                                    category="new" />

                                <BaseButtonModal :car="car" :btn-label="'Trade-In'" :app-type="8"
                                    :modal-title="`Обменять в Trade-In ${car.brand} ${car.model}`" :btn-class="`trade`"
                                    category="new" />
                            </div>
                        </div>
                        <div class="car-card__body-slider">
                            <NewCarSlider :images="car.images.length ? car.images : carStore.galleries"
                                :class="car.images.length ? '' : 'second'"
                                :imagesType="car.images.length ? true : false" :preview="car.preview" />
                        </div>
                    </div>
                </ClientOnly>

                <div class="car-card__body" v-else>
                    <div>
                        <div class="skeleton image" />
                    </div>
                    <div>
                        <div class="skeleton text" />
                        <div class="skeleton text" />
                        <div class="skeleton text" />
                        <div class="skeleton text" />
                        <div class="skeleton text" />
                        <div class="skeleton text" />
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<style scoped lang="scss">

.car-card__wrapper{
margin-top: 30px;
margin-right: 5px;
    @media screen and (max-width: 600px) {
        margin-right: 15px;
    }
}

.car-card {
    padding-bottom: 20px;
    padding-top: 0;

    .car-card__body {
        display: grid;
        grid-template-columns: 7fr 5fr;
        grid-template-areas:
            "slider info";
        gap: 30px;

        @media screen and (max-width: 1150px) {
            display: flex;
            flex-direction: column;
        }

        @media screen and (max-width: 768px) {
            padding: 0;
            gap: 15px;
        }

        .skeleton.image {
            height: 350px;
            border-radius: 4px;
        }

        .car-card__body-slider {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;


            @media screen and (max-width: 1150px) {
                order: -1;
                overflow: hidden;
                padding-bottom: 10px;
            }

            .car-card__body-slider-img {
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                max-width: 90vw;
            }

            .car-card__body-slider-img {
                max-width: 100%;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                object-fit: contain;
            }

            .car-card__body-slider-images {
                display: flex;
                gap: 12px;
                padding-top: 10px;

                @media screen and (max-width: 768px) {
                    display: none;
                }

                img {
                    width: 150px;

                    &:first-child {
                        border-bottom-left-radius: 4px;
                    }

                    &:last-child {
                        border-bottom-right-radius: 4px;
                    }
                }
            }


        }

        .car-card__body-info {
            grid-area: info;
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-left: 20px;
            @media screen and (max-width: 540px) {
                gap: 20px;
            }

            .car-card__title {
                font-size: 25px;
                font-weight: bold;
                line-height: normal;
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                align-items: center;
                
                .car-card__subtitle {
                    font-size: var(--medium-size);
                    color: #5C5C5C;
                    border: 1px solid #D7D7D7;
                    padding: 3px 5px;
                    border-radius: 4px;
                    font-size: var(--standart-size);
                }

                @media screen and (max-width: 400px) {
                    font-size: var(--big-size);

                    h1 {
                        font-size: var(--big-size);
                    }
                }
            }

            .car-card__tags {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;

                .car-card__tag {
                    font-size: 15px;
                    padding: 15px 20px;
                    background: #E6F0D8;
                    border: 3px solid #E6F0D8;
                    border-radius: 4px;
                    transition: 0.3s;
                    cursor: pointer;

                    &:hover {
                        background: transparent;
                        transition: 0.3s;
                    }
                }
            }

            .car-card__params {
                
                .car-card__single-param {
                    padding-top: 30px;

                    .car-card__param-value {
                        font-size: var(--big-size);
                        font-weight: 700;
                    }
                }

                .car-card__params-list {
                    display: grid;
                    margin-top: 10px;
                    row-gap: 20px;
                    column-gap: 40px;

                    @media screen and (max-width: 768px) {
                        row-gap: 10px;
                        column-gap: 20px;
                    }

                    @media screen and (max-width: 500px) {
                        grid-template-columns: 1fr;
                        gap: 10px;
                    }

                    .car-card__param {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        
                        .car-card__param-value {
                            order: 2;
                            font-weight: 700;
                        }

                        .car-card__param-title {
                            font-weight: 300;
                        }
                    }
                }

                .car-card__params-title {
                    margin-bottom: 30px;
                    font-weight: 700;
                    font-size: var(--medium-size);
                }
            }
            .card-card__title{
                font-size: 16px;
                font-weight: 700;
            }
            .car-card__prices {
                display: grid;
                grid-template-columns: 1fr auto;

                @media screen and (max-width: 768px) {
                    background: white;
                    padding: 20px 30px;
                    margin-right: -20px;
                    margin-left: -20px;
                }


                @media screen and (max-width: 400px) {
                    align-items: center;
                }


                .card-card__prices-button {
                    height: max-content;
                    padding: 18px;
                    width: max-content;
                    background: white;
                    border-radius: 4px;
                    transition: 0.1s;
                    cursor: pointer;

                    i {
                        transition: 0.1s;
                    }
                }

                .card-card__prices-button.active {
                    background: var(--main-color);
                    color: white;
                    transition: 0.1s;

                    i {
                        transition: 0.1s;
                    }
                }

                .card-card__prices-content {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;

                    .car-card__price {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: start;
                        flex-direction: column;
                        // align-items: center;
                        // gap: 10px;

                        .current {
                            font-size: 18px;
                            line-height: normal;
                            font-weight: 800;
                            color: var(--main-color);
                            // margin-bottom: 10px;
                            @media screen and (max-width: 768px) {
                                color: var(--main-color);
                            }

                            @media screen and (max-width: 400px) {
                                font-size: 25px;
                            }
                        }

                        .old {
                            text-decoration: line-through;
                            color: #5C5C5C;
                            margin-top: 10px;
                            @media screen and (max-width: 768px) {
                                color: #5C5C5C;
                            }
                        }
                    }

                    // .car-card__credit {
                    //     span {
                    //         color: var(--secondary-color);
                    //         font-size: var(--standart-size);
                    //         border: 1px solid var(--secondary-color);
                    //         padding: 5px 8px;
                    //         border-radius: 16px;

                    //         @media screen and (max-width: 768px) {
                    //             background: var(--secondary-color);
                    //             color: white;
                    //             font-weight: 500;
                    //         }
                    //     }
                    // }
                }


            }

            .car-card__buttons {
                display: grid;
                gap: 10px;
                grid-template-columns: 1fr 1fr;

                @media screen and (max-width: 768px) {
                    grid-template-columns: 1fr;
                }
            }
        }


        .car-card__body-sidebar {
            grid-area: sidebar;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 30px;

            @media screen and (max-width: 1400px) {
                display: flex;
                flex-direction: row;
            }

            @media screen and (max-width: 768px) {
                justify-content: center;
            }

            .car-card__form {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }

            .small {
                .car-card__form-title {
                    padding: 15px;
                    width: 100%;
                    text-align: center;
                    border-top: 2px solid var(--border-color);
                    border-left: 2px solid var(--border-color);
                    border-right: 2px solid var(--border-color);
                    border-top-right-radius: 15px;
                    border-top-left-radius: 15px;
                }
            }

            .sale {
                color: white;
                background: linear-gradient(90deg, #162235 1.47%, #223953 99.47%, #233A54 99.47%);
                border-radius: 4px;
                overflow: hidden;

                img {
                    width: 100%;
                }

                .car-card__form-content {
                    padding: 20px;
                }

                .car-card__form-title {
                    text-align: center;
                    padding-bottom: 20px;
                }


            }
        }
    }
}

.car-card__stickers {
                // position: absolute;
                margin-top: 30px;
                
                align-items: center;
                z-index: 2;
                top: 20px;
                left: 20px;
                display: flex;
                gap: 10px;
                @media screen and (max-width: 1150px) {
                    position: relative;
                    top: 0;
                    left: 0;
                    display: flex;
                    flex-direction:row;
                    
                }
                @media screen and (max-width: 768px) {
                    top: 10px;
                    left: 10px;
                    flex-wrap: wrap;
                }
                .car-card__credit{
                    border: 2px solid var(--main-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 250px;
                    font-weight: 700;
                    color: var(--main-color);
                    height: 40px;
                    border-radius: 4px;
                    background: #fff;background: #fff;
                    @media screen and (max-width: 1170px) {
                        min-width: 49%;
                    }
                    @media screen and (max-width: 570px) {
                        min-width:  100%;
                    }
                }
                .sticker {
                    border: 1px solid var(--main-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 250px;
                    font-weight: 700;
                    color: var(--main-color);
                    height: 40px;
                    border-radius: 4px;
                    @media screen and (max-width: 1170px) {
                        min-width: 49%;
                    }
                    @media screen and (max-width: 768px) {
                        padding: 2px;
                        font-size: var(--small-size);
                        font-weight: 700;
                        opacity: 0.85;
                    }
                    @media screen and (max-width: 570px) {
                        min-width: 100%;
                    }
                }

                .discount {
                    background: #fff;
                    color: var(--main-color);
                    border: 2px solid var(--main-color);
                }
            }
</style>
