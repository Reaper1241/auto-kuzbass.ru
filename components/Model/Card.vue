<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useRoute } from 'vue-router';
const $route = useRoute();

const colors = ref(newStore.model.colored_galleries)

const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))
const modList = computed(() => newStore.model.modifications?.filter((mod) => mod.car_complectations.length))

newStore.modification = modList.value?.[0]?.id

const selectedCar = ref({
    mod: modList.value?.[0],
    comp: modList.value?.[0]?.car_complectations?.[0]
});

const currentModel = computed(() => newStore.model)
onMounted(() => {
    yandexEcommerce('detail', currentModel.value);
})
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

const discountedPrice = computed(() => {
  return (newStore.model.min_price + newStore.model.sale) - totalSale.value;
});
const car = computed(() => {
    return ({
        price: selectedCar.value.comp.price,
        sale: newStore.model.sale,
        model: $route.params.model,
        brand: $route.params.brand,
        modification: selectedCar.value.mod.modification,
        complectation: selectedCar.value.comp.complectation,
        images: [{ url: '/images/modalModelDefault.webp' }],
    })
})

const loading = ref(true);
onMounted(() => {
    loading.value = false
})
const show = ref(0);
</script>

<template>
    <section class="model__card section">
        <div class="container">
            <div class="section__header">
                <BasePageTitle />
            </div>
            
            <div class="model__container">
                <div class="complectations-calculator">
                    <div class="model__top">
                        <div class="model__right-top">
                            <ul class="model__card-list-top">
                                <li v-if="newStore.model.warranty_year && newStore.model.warranty_km != 0" class="centered-item">
                                    <span class="model__card-span">Гарантия:</span>
                                    {{ newStore.model.warranty_year }} / <br>
                                    {{ newStore.model.warranty_km }} км
                                </li>
                                <li v-else class="centered-item">
                                    <p class="absolute"><span class="model__card-span">Гарантия:</span> 
                                    5 лет /<br> 100 000 км</p>
                                </li>
                                <li class="centered-item"><p class="absolute"><span class="model__card-span">От 4,9%</span>без 1-го взноса</p></li>
                                <li class="centered-item"><p class="absolute"><span class="model__card-span">Trade-In</span>выгода до 150 000 ₽</p></li>
                                <li class="centered-item"><p class="absolute"><span class="model__card-span">Срок</span>до 7 лет</p></li>
                                <li class="centered-item"><p class="absolute"><span class="model__card-span">Рассрочка</span>0%</p></li>
                            </ul>
                        </div>

                        <p class="model__price-text">Цена:</p>
                        <div class="model__row-price">
                            <del class="model__price" v-if="newStore.model.sale">
                                от
                                {{ makeSpaces(newStore.model.min_price + newStore.model.sale) }}
                                ₽
                            </del>
                            <p class="model__diff" v-if="newStore.model.sale">
                                
                                от {{ makeSpaces((newStore.model.min_price + newStore.model.sale) - newStore.totalSale) }} ₽
                                
                            </p>
                        </div>
                        <p class="model__credit">
                            Платеж в месяц от:
                            <span>
                                {{ makeSpaces(appStore.calcMonthPriceModel(0, (newStore.model.min_price + newStore.model.sale) - newStore.totalSale)) }} руб/мес.
                            </span>
                        </p>
                        <div class="complectations-calculator__item trade" :class="{ 'active': newStore.tradeSwitch }">
                            <div clas="complectations-calculator__switch">
                                <div class="switch">
                                    <input type="checkbox" id="switch" :checked="newStore.tradeSwitch"
                                        @change="newStore.tradeSwitch = !newStore.tradeSwitch" />  
                                    <label for="switch"></label>
                                </div>
                            </div>
                            <div class="complectations-calculator__text" :class="{ 'active': newStore.tradeSwitch }">
                                <span class="text">Trade-In</span>
                                <span class="money">{{ makeSpaces(tradeSale) }} ₽</span>
                            </div>
                        </div>
                        <div class="complectations-calculator__item credit" :class="{ 'active': newStore.creditSwitch }">
                            <div clas="complectations-calculator__switch">
                                <div class="switch">
                                    <input type="checkbox" id="credit" :checked="newStore.creditSwitch"
                                        @change="newStore.creditSwitch = !newStore.creditSwitch" />
                                    <label for="credit"></label>
                                </div>
                            </div>
                            <div class="complectations-calculator__text" :class="{ 'active': newStore.creditSwitch }">
                                <span class="text">Кредит</span>
                                <span class="money">{{ makeSpaces(creditSale) }} ₽</span>
                            </div>
                        </div>
                        <div class="complectations-calculator__item salon" :class="{ 'active': newStore.salonSwitch }">
                            <div clas="complectations-calculator__switch">
                                <div class="switch">
                                    <input type="checkbox" id="salon" :checked="newStore.salonSwitch"
                                        @change="newStore.salonSwitch = !newStore.salonSwitch" />
                                    <label for="salon"></label>
                                </div>
                            </div>
                            <div class="complectations-calculator__text" :class="{ 'active': newStore.salonSwitch }">
                                <span class="text">FINANCE</span>
                                <span class="money">{{ makeSpaces(salonSale) }} ₽</span>
                            </div>
                        </div>
                        <div class="complectations-calculator__total"
                            :class="{ 'activeTotal': newStore.tradeSwitch || newStore.creditSwitch || newStore.salonSwitch }">
                            <div class="complectations-calculator__text-max">
                                <span class="text">Максимальная выгода при покупке до {{ getNextMonday() }}</span>
                                <span class="complectations-calculator__money">
                                    {{ makeSpaces(newStore.totalSale) }} ₽
                                </span>
                            </div>
                        </div>
                    </div>
                </div>    
                <div class="model__left">
                    <!-- <div class="model__garantee">
                        <p v-if="
                            newStore.model.warranty_year &&
                            newStore.model.warranty_km != 0
                        ">
                            Гарантия:
                                {{ newStore.model.warranty_year }} /
                                {{ newStore.model.warranty_km }} км
                        </p>
                        <p v-else>
                            Гарантия:
                            5 лет / 100 000 км
                        </p>
                    </div> -->
                    <div class="model__img-block">
                        <div class="model__img" v-for="(item, index) in newStore.model.colored_galleries"
                            :key="item.color_id" v-show="show === index">
                            <NuxtImg :src="`${item.url}`"
                                :alt="`Баннер ${newStore.model.brand} ${newStore.model.model}`" height="240"
                                format="webp" quality="80" placeholder="/images/spinner.svg" />
                        </div>
                        <div class="model__main-icons">
                            <div class="view__col">
                                <div class="view__row" v-if="currentMod.max_speed">
                                    <img src="/svg/speedometer1.svg" alt="icon" />
                                    <p>
                                        {{ currentMod.max_speed }}
                                        км/ч<br />
                                        <span>скорость</span>
                                    </p>
                                </div>
                                <div class="view__row" v-if="currentMod.power">
                                    <img src="/svg/car-engine1.svg" alt="icon" />
                                    <p>
                                        {{ currentMod.power }}
                                        л.с.<br />
                                        <span>мощность</span>
                                    </p>
                                </div>
                                <div class="view__row" v-if="currentMod.from_0_to_100">
                                    <img src="/svg/speed1.svg" alt="icon" />
                                    <p>
                                        {{ currentMod.from_0_to_100 }}
                                        сек.<br />
                                        <span>разгон</span>
                                    </p>
                                </div>
                                <div class="view__row" v-if="currentMod.consumption_combine">
                                    <img src="/svg/gasoline-pump1.svg" alt="icon" />
                                    <p>
                                        {{ currentMod.consumption_combine }}
                                        л./100 км<br />
                                        <span>расход</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="model__main-color">
                        <div class="color__bar">
                            <div class="color__bar-item" v-for="(item, index) in newStore.model.colored_galleries"
                                :key="item.color_id" :style="item.color.hex_plus?.lenght > 1
                                    ? `background: linear-gradient(90deg, ${item.color.hex} 50%, ${item.color.hex_plus} 50%);`
                                    : `background: ${item.color.hex};`
                                    " @click="show = index, newStore.color = index"></div>
                        </div>
                        <p class="car__name-color" v-for="(item, index) in newStore.model.colored_galleries"
                            :key="item.color_id" v-show="show === index">
                            Цвет: {{ item.color.color }}
                        </p>
                    </div> -->
                </div>
                <div class="model__right">
                                        <div class="model__main-color">
                        <div class="color__bar">
                            <div class="color__bar-item" v-for="(item, index) in newStore.model.colored_galleries"
                                :key="item.color_id" :style="item.color.hex_plus?.lenght > 1
                                    ? `background: linear-gradient(90deg, ${item.color.hex} 50%, ${item.color.hex_plus} 50%);`
                                    : `background: ${item.color.hex};`
                                    " @click="show = index, newStore.color = index"></div>
                        </div>
                        <p class="car__name-color" v-for="(item, index) in newStore.model.colored_galleries"
                            :key="item.color_id" v-show="show === index">
                            Цвет: {{ item.color.color }}
                        </p>
                    </div>
                    <ul class="model__card-list">
                        <li v-if="
                            newStore.model.warranty_year &&
                            newStore.model.warranty_km != 0
                        ">
                            Гарантия:
                                {{ newStore.model.warranty_year }} /
                                {{ newStore.model.warranty_km }} км
                        </li>
                        <li v-else>
                            Гарантия:
                            5 лет / 100 000 км
                        </li>
                        <li>От 4,9% без 1-го взноса</li>
                        <li>Trade-In выгода до 150 000 ₽</li>
                        <!-- <li>Процентная ставка от 4,9%</li> -->
                        <li>Срок до 7 лет</li>
                        <li>Рассрочка 0%</li>
                    </ul>
                    
                </div>
                    <p class="model__price-text2">Цена:</p>
                        <div class="model__row-price2">
                                <p class="model__diff2">
                                от {{ makeSpaces((newStore.model.min_price + newStore.model.sale) - newStore.totalSale) }} ₽
                            </p>
                            <del class="model__price2" v-if="newStore.model.sale">
                                {{ makeSpaces(newStore.model.min_price + newStore.model.sale) }} ₽
                            </del>
                        </div>
                        <p class="model__credit2">
                            Платеж в месяц от:
                            <span>
                                {{ makeSpaces(appStore.calcMonthPriceModel(0, (newStore.model.min_price + newStore.model.sale) - newStore.totalSale)) }} руб/мес.
                            </span>
                        </p>
                <!-- <div class="model__buttons">
                    <BaseButtonModal :car="car" :btn-label="'Обменять в Trade-In'" :app-type="8"
                            :modal-title="`Обменять по Trade-In ${newStore.model.brand} ${newStore.model.model}`"
                            :btn-class="`trade model-card`" />
                    <BaseButtonModal :car="car" :btn-label="'Купить в кредит'" :app-type="2"
                            :modal-title="`Купить в кредит ${newStore.model.brand} ${newStore.model.model}`"
                            :btn-class="`credit model-card`" />
                </div> -->
            </div>
        </div>
    </section>
    <ModelTimer :car="currentModel"/>
</template>
<style lang="scss" scoped>
.centered-item {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.absolute{
    flex-wrap: wrap;
    position: absolute;
    width: 70px;
    display: flex;
      flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 16px;
  line-height: 20px;
  gap: 1px;
}
.model__card-span{
    font-weight: 700 !important;
    flex-wrap: wrap;
    font-size: 14px;
}
.model__card-list-top{
                display: none;
                    @media screen and (max-width: 767px){

                        display: flex !important;
                        overflow-x: auto;
                        overflow-y: hidden;
                        white-space: wrap;
                        border: none;
                        -webkit-overflow-scrolling: touch;
                        padding-bottom: 5px;
                        margin-bottom: 15px;
                        width: 100%;
                        gap: 10px;
                        scrollbar-width: none; /* Для Firefox */
                        
                        &::-webkit-scrollbar {
                            display: none; /* Для Chrome/Safari */
                        }
                        
                        & li {
                            flex: 0 0 auto;
                            // padding: 0 15px 0 28px !important;
                            
                            &::before {
                                left: 5px;
                            }
                        }
                    }
                    @media screen and (max-width: 375px) {
                        display: flex !important; /* Переопределяем display:none */
                    }
                    &::before {
                        content: "";
                        position: absolute;
                        bottom: 5px;
                        left: 0;
                        z-index: -1;
                        pointer-events: none;
                        @media screen and (max-width: 1024px) {
                            content: none;
                        }
                    }
                    & li {
                        position: relative;
                        padding:10px  12px;
                        font-weight: 300;
                        display: flex !important;
                        justify-content: center !important;
                        // align-items: center;
                        margin: 0 auto !important;
                        line-height: 22px;
                        border: 1px solid var(--main-color);
                        border-radius: 4px;
                        flex-wrap: wrap;
                        width: 100px;
                        height: 90px;
                        &::before {
                            content: "";
                            position: absolute;
                            top: 50%;
                            left: 0;
                            // width: 18px;
                            // height: 1px;
                            // background: var(--main-color);
                        }
                    }
                }
                
.model__top{
    @media screen and (max-width: 1075px) {
        position: absolute;
        width: 92%;
        top: 540px;
        left: 30px;   
    }
    @media screen and (max-width: 767px) {
        position: relative;
        width: auto;
        top: 0;
        left: 0;
    }
}
.complectations-calculator{
    @media screen and (max-width: 1075px) {
        flex-direction: column;
        gap: 0;
    }
}
.complectations-calculator__item{
    align-items: center;
    display: flex;
    border: 1px solid var(--main-color);
    padding: 10px 15px;
    border-radius: 20px;
    gap: 10px;
    margin-top: 10px;
    @media screen and (max-width: 767px) {
        display: none;
    }
}

.complectations-calculator__total{
    @media screen and (max-width: 767px) {
        display: none;
    }
}
.complectations-calculator__switch{
    display: flex;
}
.complectations-calculator__text{
    display: flex;
    justify-content: space-between !important;
    width: 100%;
    align-items: center;
    .money{
        color: var(--main-color);
        font-size: 16px;
        display: flex;
        align-items: center;
    }
}
.complectations-calculator__text-max{
    display: flex;
    margin: 10px 0;
    flex-direction: column;
    font-weight: 700;
}
.complectations-calculator__money{
    color: var(--main-color);
    font-weight: 700;
}
.model__card {
    position: relative;
    margin-top: 0;
    padding: 0;
    .model__container {
        position: relative;
        display: flex;
        // align-items: center;
        -webkit-box-pack: justify;
        justify-content: space-evenly;
        gap: 30px;
        @media screen and (max-width: 1075px){
            margin-bottom: 400px;
            // align-items: start;
        }
        @media screen and (max-width: 767px) {
            flex-direction: column;
            margin-bottom: 0px;
            gap: 0;
        }
        .model__left {
            .model__garantee {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                padding-left: 44px;
                font-weight: 300;
                max-width: 180px;
                font-size: 12px;
                margin-bottom: 10px;
                background-color: #15744e;
                border-radius: 15px;
                padding: 10px;
                color: #fff;
                white-space: nowrap;
                & span {
                    color: #fff;
                }
            }
            .model__img-block {
                position: relative;
                display: flex;
                align-items: flex-end;
                gap: 20px 36px;
                margin-bottom: 5px;
                margin-top: 27px;
                @media screen and (max-width: 1199px) {
                    flex-direction: column;
                    align-items: flex-start;
                    margin-top: 0px;
                    margin-bottom: 20px;
                }
                @media screen and (max-width: 767px) {
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                }
                @media screen and (max-width: 425px) {
                    flex-direction: column;
                }
                .model__img {
                    max-width: 575px;
                    width: auto;
                    height: 240px;
                    @media screen and (max-width: 767px) {
                        max-width: 100%;
                        height: auto;
                        max-height: 240px;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
                .model__main-icons {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    @media screen and (max-width: 1199px) {
                        flex-direction: row;
                    }
                    @media screen and (max-width: 767px) {
                        flex-direction: column;
                    }
                    @media screen and (max-width: 425px) {
                        flex-direction: row;
                        justify-content: space-evenly;
                        width: calc(100% + 40px);
                        padding: 10px;
                        background: #fff;
                        color: var(--bg-light);
                        margin-left: -20px;
                        margin-right: -0px;
                    }
                    @media screen and (max-width: 375px) {
                        width: calc(100% + 20px);
                        margin-left: -10px;
                        margin-right: -10px;
                    }
                    .model__main-icon {
                        text-align: center;
                        min-width: max-content;
                        .model__icon-img {
                            width: 32px;
                            height: 32px;
                            object-fit: contain;
                            filter: brightness(0) saturate(100%) invert(12%) sepia(98%) saturate(7497%) hue-rotate(357deg) brightness(101%) contrast(112%);
                            @media screen and (max-width: 425px) {
                                display: none;
                            }
                        }
                        .model__img-mob {
                            display: none;

                            @media screen and (max-width: 425px) {
                                display: inline-block;
                            }
                        }
                        p {
                            font-weight: 600;
                        }
                    }
                }
            }
            .model__main-color {
                margin-bottom: 22px;
                @media screen and (max-width: 767px) {
                    margin-bottom: 10px;;
                }
    .car__name-color {
        margin-top: 15px;
    }
    .color__bar {
        position: relative;
        display: flex;
        gap: 10px;
        overflow-x: auto;
        padding-bottom: 10px;
        scrollbar-width: thin; /* Для Firefox */
        scrollbar-color: var(--main-color) #f1f1f1; /* Для Firefox */
        
        /* Скрываем стандартный скроллбар для WebKit */
        &::-webkit-scrollbar {
            height: 4px;
        }
        
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 2px;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: var(--main-color);
            border-radius: 2px;
        }
        
        .color__bar-item {
            flex: 0 0 30px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            border-radius: 33px;
            border: 1px solid #000;
            transition: transform 0.2s;
            
            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
        }

        .model__right {
            // margin-top: 50px;
                display: flex;
                flex-direction: column;
                gap: 30px;
            @media screen and (max-width: 767px) {
                display: flex;
                flex-direction: column-reverse;
                gap: 15px;
                margin-top:0px
            }
            @media screen and (max-width: 570px) {
                gap: 10px;
            }
            @media screen and (max-width: 375px) {
                flex-direction: column;
            }
            .model__card-list {
                position: relative;
                z-index: 1;
                border: 1px solid var(--main-color);
                border-radius: 4px;
                padding: 15px 15px;
                padding-right: 0;
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                gap: 15px 32px;
                margin-bottom: 30px;
                width: max-content;

                @media screen and (max-width: 1199px) {
                    padding: 15px;
                    padding-right: 0;
                    gap: 15px;
                }
                @media screen and (max-width: 1023px) {
                    grid-template-columns: repeat(1, 1fr);
                    border-radius: 10px;
                    padding: 15px;
                    gap: 10px;
                    width: 100%;
                    margin-bottom: 20px;
                }
                @media screen and (max-width: 767px) {
                    display: none;
                }
                // .model__card-list-top{
                //     display: flex !important;
                //     overflow-x: auto;
                //     overflow-y: hidden;
                //     white-space: nowrap;
                //     border: none;
                //     -webkit-overflow-scrolling: touch;
                //     padding-bottom: 15px;
                //     margin-bottom: 15px;
                //     width: 100%;
                //     gap: 20px;
                //     scrollbar-width: none; /* Для Firefox */
                    
                //     &::-webkit-scrollbar {
                //         display: none; /* Для Chrome/Safari */
                //     }
                    
                //     & li {
                //         flex: 0 0 auto;
                //         padding: 0 15px 0 28px !important;
                        
                //         &::before {
                //             left: 5px;
                //         }
                //     }
                // }
                
                @media screen and (max-width: 375px) {
                    display: none; /* Переопределяем display:none */
                }
                &::before {
                    content: "";
                    position: absolute;
                    bottom: 5px;
                    left: 0;
                    z-index: -1;
                    pointer-events: none;
                    @media screen and (max-width: 1024px) {
                        content: none;
                    }
                }
                & li {
                    position: relative;
                    padding:0 28px;
                    font-weight: 300;
                    line-height: 22px;

                    &::before {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 18px;
                        height: 1px;
                        background: var(--main-color);
                    }
                }
            }
        }
    }
}
.model__price-text {
    position: relative;
    z-index: 2;
    font-weight: 500;
    margin-bottom: 10px;
    @media screen and (max-width: 767px) {
        display: none;
    }
}
.model__row-price {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px 19px;
    @media screen and (max-width: 767px) {
        display: none;
    }
    .model__diff {
        color: var(--main-color);
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        @media screen and (max-width: 767px) {
            display: none;
        }
        @media screen and (max-width: 425px) {
            font-size: 22px;
            line-height: 26px;
        }
    }
    .model__price {
        display: block;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #b9b9b9;
        @media screen and (max-width: 767px) {
            display: none;
        }
        @media screen and (max-width: 425px) {
            font-size: 16px;
        }
    }
}
.model__credit {
    font-weight: 300;
    font-size: 16px;
    line-height: 18px;
    margin-top: 13px;
    @media screen and (max-width: 767px) {
        margin-bottom: 15px;
        display: none;
    }
    @media screen and (max-width: 425px) {
        font-size: 14px;
    }
    @media screen and (max-width: 375px) {
        margin-top: 0;
        margin-bottom: 12px;
    }
    & span {
        font-weight: 400;
        color: var(--main-color);
    }
}
.model__price-text2 {
    position: relative;
    z-index: 2;
    font-weight: 500;
    margin-bottom: 10px;
    display: none;
    @media screen and (max-width: 767px) {
        display: none;
    }
    @media screen and (max-width: 375px) {

    }
}
.model__main-color {
                margin-bottom: 22px;
                @media screen and (max-width: 767px) {
                    margin-bottom: 10px;;
                }
    .car__name-color {
        margin-top: 15px;
    }
    .color__bar {
        position: relative;
        display: flex;
        gap: 10px;
        overflow-x: auto;
        padding-bottom: 10px;
        scrollbar-width: thin; /* Для Firefox */
        scrollbar-color: var(--main-color) #f1f1f1; /* Для Firefox */
        
        /* Скрываем стандартный скроллбар для WebKit */
        &::-webkit-scrollbar {
            height: 4px;
        }
        
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 2px;
        }
        
        &::-webkit-scrollbar-thumb {
            background-color: var(--main-color);
            border-radius: 2px;
        }
        
        .color__bar-item {
            flex: 0 0 30px;
            width: 30px;
            height: 30px;
            cursor: pointer;
            border-radius: 33px;
            border: 1px solid #000;
            transition: transform 0.2s;
            
            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
.model__row-price2 {
    position: relative;
    z-index: 2;
    // display: flex;
    // flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px 19px;
    
    display: none;
    @media screen and (max-width: 767px) {
        display: flex;
        gap: 8px 12px;
    }
    .model__diff2 {
        color: var(--main-color);
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        @media screen and (max-width: 767px) {
            display: block;
        }
        @media screen and (max-width: 425px) {
            font-size: 22px;
            line-height: 26px;
        }
    }
    .model__price2 {
        display: block;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        display: none;
        color: #b9b9b9;
        @media screen and (max-width: 767px) {
            display: block;
        }
        @media screen and (max-width: 425px) {
            font-size: 16px;
        }
    }
}
.model__credit2 {
    font-weight: 300;
    display: none;
    font-size: 16px;
    line-height: 18px;
    margin-top: 13px;
    @media screen and (max-width: 767px) {
        margin-bottom: 15px;
        display: block;
    }
    @media screen and (max-width: 425px) {
        font-size: 14px;
    }
    @media screen and (max-width: 375px) {
        margin-top: 0;
        margin-bottom: 12px;
    }
    & span {
        font-weight: 400;
        color: var(--main-color);
    }
}
.model__buttons {
    display: flex;
    gap: 25px;
    width: 100%;
    margin-top: 20px;
    @media screen and (max-width: 1023px) {
        gap: 15px;
    }
    @media screen and (max-width: 767px) {
        margin-top: 0;
        flex-direction: column;
    }
}
.model__buttons {
    .credit__button {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        height: 60px;
        border-radius: 10px;
        min-width: 155px;
    }
    .trade__button {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        height: 60px;
        border-radius: 10px;
        min-width: 215px;
    }
}
.view__col {
    display: flex;
    flex-direction: column;
    gap: 30px;         
    margin-top: 100px;     
    @media screen and (max-width: 1200px){
        margin: 10px 0px;
        display: grid;
        margin-top: 0px;
        gap:120px;
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 1025px){
        margin: 10px 0px;
        display: grid;
        gap: 80px;
        grid-template-columns: repeat(3, 1fr) !important;
    }
    @media screen and (max-width: 1000px) {
        margin: 10px 0px;
        display: grid;
        grid-template-columns: 1fr 2fr;    
    }
    @media screen and (max-width: 767px) {
        gap: 10px;
        display: flex;
        margin: 10px 0;
        flex-direction: column;
    }
    @media screen and (max-width: 425px){
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
        .view__row {
            display: flex;
            align-items: center;
            gap: 12px;
            @media screen and (max-width: 1200px){
                display: grid;
                grid-template-columns: 3fr;
            }
            @media screen and (max-width: 767px) {
                flex-direction: column;
                color: black;
                width: auto;
                gap: 10px;
            }

            @media screen and (max-width: 425px) {
                flex-direction: column;
                color: black;
                width: auto;
                gap: 10px;
            }
            @media screen and (max-width: 375px) {
                width: auto;
            }
            & img {
                width: 40px;
                height: 40px;
                -o-object-fit: contain;
                object-fit: contain;
                fill: var(--main-color);
            }
            & p {
                font-weight: 500;
                font-size: 20px;
                line-height: 22px;
                min-width: max-content;
                @media screen and (max-width: 767px) {
                    font-size: 18px;
                    @media screen and (max-width: 425px) {
                        font-size: 15px;
                    }
                }

            & span {
                font-weight: 500;
                font-size: 12px;
                text-transform: uppercase;
            }
        }
    }
}
</style>