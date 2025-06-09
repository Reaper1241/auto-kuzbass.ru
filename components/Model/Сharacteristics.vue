<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))
const selectedColor = ref(0)
const colors = ref(newStore.model.colored_galleries)
const selectedTab = ref(0)

const modList = computed(() => newStore.model.modifications?.filter((mod) => mod.car_complectations.length))
</script>

<template>
    <section class="model-сharacteristics section">
        <div class="container">
            <div class="model-сharacteristics__wrapper">
                <div class="model-сharacteristics__header section__header">
                    <h2 class="model-сharacteristics__tab-title" @click="selectedTab = 0"
                        :class="{ active: selectedTab == 0 }">
                        Тех. характеристики
                        <i class="fa-solid fa-sort-down"></i>
                    </h2>

                    <h2 class="model-сharacteristics__tab-title" @click="selectedTab = 1"
                        :class="{ active: selectedTab == 1 }">
                        Размеры и габариты
                        <i class="fa-solid fa-sort-down"></i>
                    </h2>

                    <div class="model-сharacteristics__tab-title select" v-if="modList.length > 1">
                        <label class="model-card__mod-select">
                            <select v-model="newStore.modification">
                                <option v-for="(option, index) in modList" :key="option.id" :value="option.id">
                                    {{ option.modification }}
                                </option>
                            </select>
                        </label>
                        <i class="fa-solid fa-sort-down"></i>
                    </div>
                </div>

                <div class="model-сharacteristics__body tab__content" v-show="selectedTab == 0">
                    <div class="model-сharacteristics__text">

                        <ul class="model-сharacteristics__params">
                            <li class="model-сharacteristics__param" v-if="currentMod.fuel">
                                <span class="title">Тип двигателя</span>
                                <span class="value">{{ currentMod.fuel }}</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.engine_size">
                                <span class="title">Объем двигателя</span>
                                <span class="value">{{ currentMod.engine_size }} л</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.displacement">
                                <span class="title">Рабочий объем двигателя</span>
                                <span class="value">{{ currentMod.displacement }} см3</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.power">
                                <span class="title">Мощность</span>
                                <span class="value">{{ currentMod.power }} л.с</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.max_weight">
                                <span class="title">Максимальная масса</span>
                                <span class="value">{{ currentMod.max_weight }} кг</span>
                            </li>
                            <!-- <li class="model-сharacteristics__param" v-if="currentMod.number_of_gears">
                                <span class="title">Количество передач</span>
                                <span class="value">{{ currentMod.number_of_gears }}</span>
                            </li> -->
                            <li class="model-сharacteristics__param" v-if="currentMod.drive">
                                <span class="title">Тип привода</span>
                                <span class="value">{{ currentMod.drive }}</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.from_0_to_100">
                                <span class="title">Разгон от 0 до 100 км/ч</span>
                                <span class="value">{{ currentMod.from_0_to_100 }} с</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.max_speed">
                                <span class="title">Максимальная скорость</span>
                                <span class="value">{{ currentMod.max_speed }} км/ч</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.consumption_combine">
                                <span class="title">Смешанный расход топлива</span>
                                <span class="value">{{ currentMod.consumption_combine }}</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.fuel_tank_capacity">
                                <span class="title">Объем топливного бака</span>
                                <span class="value">{{ currentMod.fuel_tank_capacity }} л</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.trunk_capacity">
                                <span class="title">Объем багажного отделения</span>
                                <span class="value">{{ currentMod.trunk_capacity }} л</span>
                            </li>
                            <li class="model-сharacteristics__param" v-if="currentMod.curb_weight">
                                <span class="title">Снаряженная масса</span>
                                <span class="value">{{ currentMod.curb_weight }} л</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="model-dimensions__body tab__content" v-show="selectedTab == 1">
                    <div class="model-dimensions__images">
                        <div class="model-dimensions__image-item">
                            <NuxtImg lazy format="webp" quality="90" loading="lazy" src="/images/dimensions1.png"
                                alt="model-dimensions" />
                            <span class="value">{{ currentMod.length }} мм</span>
                        </div>
                        <div class="model-dimensions__image-item">
                            <NuxtImg lazy format="webp" quality="90" loading="lazy" src="/images/dimensions2.png"
                                alt="model-dimensions" />
                            <span class="value">{{ currentMod.width }} мм</span>
                        </div>
                        <div class="model-dimensions__image-item">
                            <NuxtImg lazy format="webp" quality="90" loading="lazy" src="/images/dimensions3.png"
                                alt="model-dimensions" />
                            <span class="value">{{ currentMod.width }} мм</span>
                        </div>
                    </div>
                    <div class="model-dimensions__text">
                        <ul class="model-dimensions__params">
                            <li class="model-dimensions__param">
                                <span class="title">Длина кузова</span>
                                <span class="value">{{ currentMod.length }} мм</span>
                            </li>
                            <li class="model-dimensions__param">
                                <span class="title">Ширина кузова</span>
                                <span class="value">{{ currentMod.width }} мм</span>
                            </li>
                            <li class="model-dimensions__param">
                                <span class="title">Высота кузова</span>
                                <span class="value">{{ currentMod.height }} мм</span>
                            </li>
                            <li class="model-dimensions__param">
                                <span class="title">Колесная база</span>
                                <span class="value">{{ currentMod.wheel_base }} мм</span>
                            </li>
                            <li class="model-dimensions__param">
                                <span class="title">Дорожный просвет</span>
                                <span class="value">{{ currentMod.clearance }} мм</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.model-сharacteristics__header {
    display: flex;
    gap: 10px;
    padding-bottom: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    flex-wrap: nowrap;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    .model-сharacteristics__tab-title {
        font-size: var(--large-size);
        font-weight: 600;
        line-height: normal;
        background: #eeeeee;
        padding: 8px 14px;
        border-radius: 20px;
        cursor: pointer;
        opacity: 0.4;
        transition: 0.3s;
        position: relative;

        @media screen and (max-width: 768px) {
            font-size: var(--medium-size);
        }

        i {
            position: absolute;
            bottom: -10px;
            color: #eeeeee;
            left: 50%;
            transform: translateX(-50%);
            font-size: 25px;
        }

        &:hover {
            opacity: 1;
            transition: 0.3s;
        }
    }

    .select {
        position: relative;
        padding-right: 10px;
        width: fit-content;
        opacity: 1;
        padding-right: 20px;

        select {
            color: var(--main-black);
        }

        &::after {
            content: "\f107";
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            pointer-events: none;
            background: white;
            padding: 3px 4px;
            border-radius: 100%;
            text-align: center;
        }

    }

    .active {
        opacity: 1;
    }

    @media screen and (max-width: 768px) {
        margin-bottom: 20px;
    }
}

.model-сharacteristics__body {
    display: grid;
    margin-bottom: 30px;

    @media screen and (max-width: 1300px) {
        grid-template-columns: 1fr;
    }

    .model-сharacteristics__text {
        .model-сharacteristics__title {
            font-weight: 600;
            font-size: 16px;
            line-height: normal;
            margin-bottom: 30px;
        }

        .model-сharacteristics__params {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            column-gap: 30px;
            row-gap: 20px;

            @media screen and (max-width: 1100px) {
                grid-template-columns: 1fr 1fr;
            }

            @media screen and (max-width: 768px) {
                grid-template-columns: 1fr;
                row-gap: 10px;
            }

            .model-сharacteristics__param {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid var(--border-color);
                padding-bottom: 10px;

                span {
                    font-size: var(--standart-size);

                    @media screen and (max-width: 400px) {
                        font-size: var(--small-size);
                    }
                }
            }
        }
    }
}

.model-dimensions__body {
    display: grid;
    grid-template-columns: 3fr 1fr;
    align-items: center;
    gap: 50px;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 2fr 1fr;
    }

    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
    }

    @media screen and (max-width: 768px) {
        gap: 15px;
    }

    .model-dimensions__images {
        display: grid;
        grid-template-columns: auto auto auto;
        justify-content: center;
        align-items: center;
        gap: 50px;
        padding: 20px 0;

        @media screen and (max-width: 1200px) {
            grid-template-columns: auto auto;
        }

        @media screen and (max-width: 400px) {
            grid-template-columns: auto auto;
            gap: 20px;
        }

        .model-dimensions__image-item {
            position: relative;
            padding-bottom: 20px;
            height: 100%;
            display: flex;
            align-items: center;

            &:first-child {
                @media screen and (max-width: 1200px) {
                    grid-column: 1 / 3;
                }


                @media screen and (max-width: 400px) {
                    grid-column: 1 / 3;
                }
            }

            img {
                width: 100%;
                object-fit: contain;

                @media screen and (max-width: 540px) {
                    max-height: 100px;
                }
            }

            .value {
                position: absolute;
                bottom: -15px;
                left: 50%;
                transform: translate(-50%, 0);
                background: white;
                padding: 5px;
                width: max-content;
                border-radius: 20px;
            }

            &:before {
                position: absolute;
                content: "";
                background: var(--border-color);
                height: 1px;
                width: 100%;
                bottom: 0;
            }
        }
    }

    .model-dimensions__params {
        display: flex;
        flex-direction: column;
        gap: 15px;
        border: 1px solid var(--border-color);
        padding: 15px;
        border-radius: 20px;

        .value {
            order: 2;
        }

        .model-dimensions__param {
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                font-size: var(--standart-size);
            }

            &:after {
                content: "";
                display: block;
                flex-grow: 1;
                height: 1px;
                background-color: #e6e8ec;
                margin: 0 8px;
                position: relative;
                top: 5px;
            }
        }
    }
}

.tab__content {
    animation: fadeIn 0.3s ease-in-out;
}
</style>