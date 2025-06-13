<script setup>
import { useNewCarStore } from '/stores/NewCarStore.js'
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const carStore = useNewCarStore()
const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))
const modList = computed(() => newStore.model.modifications.filter((mod) => mod.car_complectations.length))
const car = ref([]);
car.value = carStore.car

const activeTab = ref(0)

// Добавляем состояние для сворачивания/разворачивания блоков
const safetyOpen = ref(true)
const exteriorOpen = ref(true)
const interiorOpen = ref(true)
const comfortOpen = ref(true)
const overviewOpen = ref(true)
const multimediaOpen = ref(true)
const protectionOpen = ref(true)



</script>

<template>
    <section class="car-tabs section">
        <div class="container">
            <div class="car-tabs__wrapper">
                <div class="buttons__show-list">
                    <div class="title__show-list" :class="{ active: activeTab == 0 }" @click="activeTab = 0">
                        Опции автомобиля
                    </div>
                    <div class="title__show-list" :class="{ active: activeTab == 1 }" @click="activeTab = 1">
                        Технические характеристики
                    </div>
                </div>
            </div>

            <div class="accordion" :class="{ hide: activeTab != 0 }">
                <div class="accordion__content option__content">
                    <div class="accordion__item" v-if="car.complectation.safety">
                        <div class="accordion__item-head" @click="safetyOpen = !safetyOpen">
                            <span class="accordion__title">Безопасность</span>
                            <span class="icon">
                                <i class="fa-solid" :class="safetyOpen ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                            </span>
                        </div>
                        <ul class="accordion__list" v-if="safetyOpen" v-htmlSanitizer="car.complectation.safety"></ul>
                    </div>

                    <div class="accordion__item" v-if="car.complectation.exterior">
                        <div class="accordion__item-head" @click="exteriorOpen = !exteriorOpen">
                            <span class="accordion__title">Экстерьер</span>
                            <span class="icon">
                                <i class="fa-solid" :class="exteriorOpen ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                            </span>
                        </div>
                        <ul class="accordion__list" v-if="exteriorOpen" v-htmlSanitizer="car.complectation.exterior"></ul>
                    </div>

                    <div class="accordion__item" v-if="car.complectation.interior">
                        <div class="accordion__item-head" @click="interiorOpen = !interiorOpen">
                            <span class="accordion__title">Интерьер</span>
                            <span class="icon">
                                <i class="fa-solid" :class="interiorOpen ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                            </span>
                        </div>
                        <ul class="accordion__list" v-if="interiorOpen" v-htmlSanitizer="car.complectation.interior"></ul>
                    </div>

                    <div class="accordion__item" v-if="car.complectation.comfort">
                        <div class="accordion__item-head" @click="comfortOpen = !comfortOpen">
                            <span class="accordion__title">Комфорт</span>
                            <span class="icon">
                                <i class="fa-solid" :class="comfortOpen ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                            </span>
                        </div>
                        <ul class="accordion__list" v-if="comfortOpen" v-htmlSanitizer="car.complectation.comfort"></ul>
                    </div>

                    <div class="accordion__item" v-if="car.complectation.overview">
                        <div class="accordion__item-head" @click="overviewOpen = !overviewOpen">
                            <span class="accordion__title">Обзор</span>
                            <span class="icon">
                                <i class="fa-solid" :class="overviewOpen ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                            </span>
                        </div>
                        <ul class="accordion__list" v-if="overviewOpen" v-htmlSanitizer="car.complectation.overview"></ul>
                    </div>

                    <div class="accordion__item" v-if="car.complectation.multimedia">
                        <div class="accordion__item-head" @click="multimediaOpen = !multimediaOpen">
                            <span class="accordion__title">Мультимедиа</span>
                            <span class="icon">
                                <i class="fa-solid" :class="multimediaOpen ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                            </span>
                        </div>
                        <ul class="accordion__list" v-if="multimediaOpen" v-htmlSanitizer="car.complectation.multimedia"></ul>
                    </div>

                    <div class="accordion__item" v-if="car.complectation.сar_theft_protection">
                        <div class="accordion__item-head" @click="protectionOpen = !protectionOpen">
                            <span class="accordion__title">Защита от угона</span>
                            <span class="icon">
                                <i class="fa-solid" :class="protectionOpen ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                            </span>
                        </div>
                        <ul class="accordion__list" v-if="protectionOpen" v-htmlSanitizer="car.complectation.сar_theft_protection"></ul>
                    </div>
                </div>
            </div>

            <div class="accordion" :class="{ hide: activeTab != 1 }">
                <div class="accordion__content tech__content">
                    <div class="tech__content-img">
                        <img src="/images/spec__tech.webp" alt="car" />
                        <p>{{ car.modification.length }}</p>
                        <p>{{ car.modification.height }}</p>
                        <p>{{ car.modification.width }}</p>
                    </div>
                    <ul class="accordion__list accordion__list-tech" id="tech">
                        <li class="list-group-item" v-if="car.modification.length">
                            <span>Длина, мм.</span><span>{{ car.modification.length }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.height">
                            <span>Высота, мм.</span><span>{{ car.modification.height }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.width">
                            <span>Ширина, мм.</span><span>{{ car.modification.width }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.wheel_base">
                            <span>Колесная база, мм.</span>
                            <span>{{ car.modification.wheel_base }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.clearance">
                            <span>Клиренс, мм.</span>
                            <span>{{ car.modification.clearance }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.fuel">
                            <span>Тип двигателя</span>
                            <span>{{ car.modification.fuel }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.engine_size">
                            <span>Объем двигателя, л.</span>
                            <span>{{ car.modification.engine_size }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.displacement">
                            <span>Рабочий объем двигателя, см3.</span>
                            <span>{{ car.modification.displacement }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.power">
                            <span>Мощность, л.с.</span>
                            <span>{{ car.modification.power }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.number_of_gears">
                            <span>Количество передач</span>
                            <span>{{ car.modification.number_of_gears }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.from_0_to_100">
                            <span>Разгон от 0 до 100 км/ч, сек.</span>
                            <span> {{ car.modification.from_0_to_100 }} </span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.max_speed">
                            <span>Максимальная скорость, км/ч.</span>
                            <span> {{ car.modification.max_speed }} </span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.consumption_highway">
                            <span>Расход топлива на трассе, л/100 км.</span>
                            <span> {{ car.modification.consumption_highway }} </span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.consumption_city">
                            <span>Расход топлива в городе, л/100 км.</span>
                            <span> {{ car.modification.consumption_city }} </span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.consumption_combine">
                            <span>Смешанный расход топлива, л/100 км.</span>
                            <span> {{ car.modification.consumption_combine }} </span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.fuel_tank_capacity">
                            <span>Объем топливного бака, л.</span>
                            <span>{{ car.modification.fuel_tank_capacity }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.trunk_capacity">
                            <span>Объем багажного отделения, л.</span>
                            <span>{{ car.modification.trunk_capacity }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.curb_weight">
                            <span>Снаряженная масса, кг.</span>
                            <span>{{ car.modification.curb_weight }}</span>
                        </li>
                        <li class="list-group-item" v-if="car.modification.max_weight">
                            <span>Максимальная масса, кг.</span>
                            <span>{{ car.modification.max_weight }}</span>
                        </li>
                        <!-- остальные технические характеристики -->
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.buttons__show-list {
    display: flex;
    gap: 20px;
    margin-left: 0px;
    margin-bottom: 40px;
    justify-content: center;
    @media screen and (max-width: 767px) {
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
    }

    @media screen and (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
    }

    .title__show-list {
        font-weight: 500;
        font-size: 20px;
        line-height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #7f7f7f;
        cursor: pointer;
        border-radius: 4px;
        width: 49%;
        height: 40px;
        border: 2px solid #7f7f7f;
        @media screen and (max-width: 767px) {
            font-size: 16px;
            line-height: 18px;
            width: 48%;
            border: 1px solid #7f7f7f;
        }

        @media screen and (max-width: 480px) {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }

    .title__show-list.active {
        color: var(--main-color);
        border: 2px solid var(--main-color);
        @media screen and (max-width: 767px) {
            border: 1px solid var(--main-color);
        }
    }
}

.accordion {
    display: block;

    .accordion__content {
        .accordion__item {
            margin-bottom: 10px;
            border: 1px solid #E5E5E5;
            border-radius: 4px;
            overflow: hidden;

            .accordion__item-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background: #f5f5f5;
                cursor: pointer;
                
                .accordion__title {
                    font-weight: 500;
                    font-size: 18px;
                    margin: 0;
                }

                .icon {
                    transition: transform 0.3s;
                }
            }

            .accordion__list {
                padding: 15px 20px;
                -webkit-columns: 3;
                -moz-columns: 3;
                columns: 3;

                @media screen and (max-width: 768px) {
                    -webkit-columns: 2;
                    -moz-columns: 2;
                    columns: 2;
                }

                @media screen and (max-width: 580px) {
                    -webkit-columns: 1;
                    -moz-columns: 1;
                    columns: 1;
                }
            }
        }
    }

    .tech__content {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding-bottom: 10px;

        @media screen and (max-width: 1023px) {
            flex-direction: column;
            align-items: center;
        }

        @media screen and (max-width: 580px) {
            padding-bottom: 20px;
            border-bottom: 0;
        }

        .tech__content-img {
            position: relative;
            min-width: 274px;
            width: 274px;
            height: 256px;

            p {
                position: absolute;
                bottom: -12px;
                left: 125px;
                height: max-content;

                &:nth-child(3) {
                    bottom: 40px;
                    left: -15px;
                    writing-mode: vertical-lr;
                    transform: rotate(180deg);
                }

                &:nth-child(4) {
                    top: 40px;
                    left: -15px;
                    writing-mode: vertical-lr;
                    transform: rotate(180deg);
                }
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        .accordion__list-tech {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px 40px;

            @media screen and (max-width: 580px) {
                grid-template-columns: 1fr;
                width: 100%;
            }

            li {
                display: grid;
                grid-template-columns: auto 1fr auto;
                align-items: center;
                min-width: 350px;
                max-width: 450px;
                gap: 5px;
                list-style: circle;

                @media screen and (max-width: 1199px) {
                    min-width: auto;
                    margin-left: 0;
                }

                span {
                    &:last-child {
                        font-weight: 700;
                        text-align: right;
                    }
                }
            }
        }
    }
}

.accordion.hide {
    display: none;
}

.accordion__list {
    &:deep(li) {
        position: relative;
        line-height: 20px;

        &::before {
            content: "\f192";
            font-family: "Font Awesome 6 Free";
            font-size: 8px;
            font-weight: 900;
            color: var(--main-color2);
            margin-right: 10px;
        }
    }
}
</style>и 