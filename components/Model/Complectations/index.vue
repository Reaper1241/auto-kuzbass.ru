<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))
const currentModel = computed(() => newStore.model)

const tradeSwitch = ref(true)
const creditSwitch = ref(true)
const salonSwitch = ref(true)

const tradeSale = computed(() => currentModel.value.sale * appStore.tradeCalcPercent)
const creditSale = computed(() => currentModel.value.sale * appStore.creditCalcPercent)
const salonSale = computed(() => currentModel.value.sale * appStore.salonCalcPercent)

const totalSale = computed(() => {
    let total = 0;
    if (tradeSwitch.value) total += tradeSale.value
    if (creditSwitch.value) total += creditSale.value
    if (salonSwitch.value) total += salonSale.value
    newStore.modelSale = total
    return total
})

const modList = computed(() => newStore.model.modifications.filter((mod) => mod.car_complectations.length))
</script>

<template>
    <section class="complectations" v-if="currentMod?.car_complectations.length">
        <div class="complectations__wrapper">
            <div class="complectations__body">
                <div class="complectations-calculator">
                    <div class="complectations-calculator__item trade" :class="{ 'active': tradeSwitch }">
                        <div class="complectations-calculator__text" :class="{ 'active': tradeSwitch }">
                            <span class="text">Скидка при покупке авто в Trade-In</span>
                            <span class="money">{{ makeSpaces(tradeSale) }} ₽</span>
                        </div>
                        <div clas="complectations-calculator__switch">
                            <div class="switch">
                                <input type="checkbox" id="switch" :checked="tradeSwitch"
                                    @change="tradeSwitch = !tradeSwitch" />
                                <label for="switch"></label>
                            </div>
                        </div>
                    </div>

                    <div class="complectations-calculator__item credit" :class="{ 'active': creditSwitch }">
                        <div class="complectations-calculator__text" :class="{ 'active': creditSwitch }">
                            <span class="text">Выгодный кредит со скидкой</span>
                            <span class="money">{{ makeSpaces(creditSale) }} ₽</span>
                        </div>
                        <div clas="complectations-calculator__switch">
                            <div class="switch">
                                <input type="checkbox" id="credit" :checked="creditSwitch"
                                    @change="creditSwitch = !creditSwitch" />
                                <label for="credit"></label>
                            </div>
                        </div>
                    </div>

                    <div class="complectations-calculator__item salon" :class="{ 'active': salonSwitch }">
                        <div class="complectations-calculator__text" :class="{ 'active': salonSwitch }">
                            <span class="text">Скидка от автосалона при покупке авто</span>
                            <span class="money">{{ makeSpaces(salonSale) }} ₽</span>
                        </div>
                        <div clas="complectations-calculator__switch">
                            <div class="switch">
                                <input type="checkbox" id="salon" :checked="salonSwitch"
                                    @change="salonSwitch = !salonSwitch" />
                                <label for="salon"></label>
                            </div>
                        </div>
                    </div>

                    <div class="complectations-calculator__item total"
                        :class="{ 'activeTotal': tradeSwitch || creditSwitch || salonSwitch }">
                        <div class="complectations-calculator__text">
                            <span class="text">Максимальная выгода при покупке до {{ getNextMonday() }}</span>
                            <span class="complectations-calculator__money">
                                до {{ makeSpaces(totalSale) }} ₽
                            </span>
                        </div>
                    </div>
                </div>

                <div class="complectations__header">
                    <BaseSectionTitle :title="`Доступные комплектации`" />
                </div>

                <div class="modifications__list">
                    <div class="modifications__item" v-for="mod in modList" :key="mod.id">
                        <div class="modifications__item-head" @click="mod.isOpen = !mod.isOpen">
                            <span class="mod-title">{{ mod.modification }}</span>
                            <!-- <span class="price-title">Цена со скидкой</span>
                            <span class="price-title">Ежемесячный платёж</span> -->
                            <span class="icon"><i class="fa-solid"
                                    :class="mod.isOpen ? 'fa-chevron-down' : 'fa-chevron-up'"></i></span>
                        </div>

                        <div class="complectations__list" v-if="!mod.isOpen">
                            <div class="complectations__item" v-for="item in mod.car_complectations" :key="item.id">
                                <div class="complectations__item-wrapper">
                                    <!-- <NuxtImg lazy format="webp" quality="90" loading="lazy"
                                        :src="currentModel.colored_galleries[newStore.color]?.url" alt="icon"
                                        class="complectations__item-img" v-if="currentModel.colored_galleries.length" /> -->
                                    <div class="complectations__item-name">
                                        <div class="complectations__item-title">
                                            {{ item.complectation }}
                                        </div>
                                        <div class="complectations__item-subtitle">
                                            {{ mod.modification }}
                                        </div>
                                    </div>
                                </div>

                                <div class="complectations__item-price">
                                    <div class="complectations__item-prices">
                                        <span class="old" v-if="currentModel.sale && totalSale">
                                            от {{ makeSpaces(item.price) }} ₽
                                        </span>
                                        <span class="current">от {{ makeSpaces(item.price - totalSale) }} ₽</span>
                                    </div>
                                    <div class="complectations__item-month-price">
                                        в кредит от: <span class="month__price">{{ makeSpaces(appStore.calcMonthPriceModel(totalSale, item.price)) }} ₽/мес.</span>
                                        
                                    </div>
                                </div>

                                <div class="complectations__item-buttons">
                                    <BaseButtonModal :btn-label="'Подробнее'" :app-type="2" :btn-class="`comp`"
                                        :modalType="`modalComp`" :comp="item"
                                        :car="{ price: item.price, sale: totalSale, images: [{ url: '/images/modalModelDefault.webp' }], model: $route.params.model, brand: $route.params.brand }" />
                                    <BaseButtonModal :btn-label="'Купить в кредит'" :app-type="2" :btn-class="`credit`"
                                        :car="{ price: item.price, sale: totalSale, images: [{ url: '/images/modalModelDefault.webp' }], model: $route.params.model, brand: $route.params.brand }" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.complectations__header {
    display: flex;
    gap: 15px;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px 0;

    @media screen and (max-width: 768px) {
        gap: 5px;
    }
}

.complectations__body {
    display: grid;
    gap: 30px;

    @media screen and (max-width: 768px) {
        gap: 15px;
    }

    .complectations-calculator {
        
        display: none;
        gap: 30px;
        align-items: center;
        grid-template-columns: 1fr 1fr 1fr 1.5fr;

        @media screen and (max-width: 1400px) {
            gap: 15px;
        }

        @media screen and (max-width: 1000px) {
            grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: 768px) {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
        }

        .complectations-calculator__item {
            display: flex;
            gap: 15px;
            align-items: center;
            padding: 10px 20px;
            border-radius: 4px;
            border: 1px solid #E5E5E5;
            transition: 0.3s;
            height: 100%;

            @media screen and (max-width: 540px) {
                padding: 10px;
            }

            .complectations-calculator__text {
                display: flex;
                flex-direction: column;
                gap: 5px;

                .money {
                    font-size: var(--large-size);
                    font-weight: 500;
                    color: var(--dark-grey);
                }

                .text {
                    color: var(--dark-grey);

                    @media screen and (max-width: 768px) {
                        font-size: var(--standart-size);
                    }
                }

                .complectations-calculator__money {
                    font-weight: 700;
                    color: var(--main-color);
                    display: flex;
                    flex-direction: column;
                    font-size: 24px;

                    .date {
                        font-weight: 300;
                        
                    }


                    @media screen and (max-width: 768px) {
                        font-size: var(--large-size);
                    }

                    @media screen and (max-width: 540px) {
                        font-size: var(--medium-size);
                    }
                }
            }

            &:hover {
                box-shadow: var(--box-shadow);
                transition: 0.3s;
                
            }

            div {
                background: transparent;
            }

            @media screen and (max-width: 1400px) {
                display: flex;
                flex-direction: column;
                align-items: start;
            }
        }

        .complectations-calculator__item.active {
            border: 1px solid var(--main-color);

            .money {
                color: var(--main-color);
            }
        }

        .complectations-calculator__item.total {
            justify-content: center;
            font-size: var(--big-size);
            border: none;
            box-shadow: none;

            .complectations-calculator__text {
                display: flex;
                gap: 0;
                flex-wrap: wrap;
            }
        }

        .complectations-calculator__item.activeTotal {
            color: var(--main-black);
            border: none;

            &:hover {
                box-shadow: none;
            }

            .complectations-calculator__text {
                display: flex;
                flex-direction: column;
                gap: 5px;

                .text {
                    color: var(--main-black);
                }
            }

            .complectations-calculator__money {
                color: var(--main-color);
            }
        }
    }

    .modifications__list {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .modifications__item {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border-radius: 4px;

            @media screen and (max-width: 768px) {
                background: transparent;
            }

            .complectations__list {
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 20px;

                animation: fadeIn 0.3s ease-in-out;

                @media screen and (max-width: 768px) {
                    padding: 10px 0;
                }
            }

            .modifications__item-head {
                font-weight: 600;
                display: flex;
                justify-content: space-between;
                width: 100%;
                align-items: center;
                padding: 20px 20px;
                color: white;
                background: #9F9F9F;
                border-radius: 4px;
                cursor: pointer;

                .icon {
                    padding: 10px;
                    background: white;
                    border-radius: 100%;
                    width: 30px;
                    height: 30px;
                    color: black;
                    box-shadow: var(--box-shadow);
                    position: relative;

                    i {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }
            }
        }

        .complectations__item {
            display: flex;
            width: 100%;
            justify-content: space-between;
            padding: 15px 0;
            align-items: center;
            gap: 10px;

            & {
                border-bottom: 2px solid #E5E5E5;
            }

            @media screen and (max-width: 1100px) {
                flex-direction: column;
                border: 1px solid #E5E5E5;
                border-radius: 20px;
                padding: 15px;
            }

            .complectations__item-wrapper {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;

                @media screen and (max-width: 540px) {
                    display: grid;
                    grid-template-columns: auto auto;
                    gap: 15px;
                    align-items: center;
                }
            }

            .complectations__item-price {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 450px;

                @media screen and (max-width: 1200px) {
                    width: 300px;
                }

                @media screen and (max-width: 1100px) {
                    width: 100%;
                }

                .complectations__item-prices {
                    display: flex;
                    flex-direction: column;
                    text-align: end;
                    .current {
                        font-weight: 600;
                        font-size: var(--large-size);
                        color: var(--main-color);
                        @media screen and (max-width: 540px) {
                            font-size: var(--medium-size);
                        }
                    }

                    .old {
                        font-size: var(--standart-size);
                        color: #9C9C9C;
                        text-decoration: line-through;
                    }
                }

                .complectations__item-month-price {
                    @media screen and (max-width: 540px) {
                        font-size: var(--standart-size);
                    }
                }
            }

            .complectations__item-name {
                display: flex;
                flex-direction: column;
                gap: 5px;
                width: 150px;

                .complectations__item-title {
                    font-weight: 600;
                }

                .complectations__item-subtitle {
                    color: #9C9C9C;
                    font-size: var(--standart-size);
                }
            }

            .complectations__item-img {
                width: auto;
                height: 70px;
                object-fit: contain;

                @media screen and (max-width: 1100px) {
                    width: 100%;
                    height: auto;
                }
            }

            .complectations__item-buttons {
                display: grid;
                gap: 10px;
                grid-template-columns: auto auto;

                @media screen and (max-width: 1100px) {
                    width: 100%;
                }
            }
        }
    }

    .complectations__description {
        font-size: var(--standart-size);
        color: #9C9C9C;
    }
}

.month__price{
    color: var(--main-color);
}
</style>