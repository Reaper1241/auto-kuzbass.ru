<script setup>
// Переменные для управления видимостью
const showInterior = ref(false);
const showExterior = ref(false);
const showSafety = ref(false);
const showComfort = ref(false);
const showTheftProtection = ref(false);
const showOverview = ref(false);
const showMultimedia = ref(false);
const showComplectationAttributes = ref(false);

const props = defineProps({
    comp: Object,
    selectedModel: Object,
})

const getItemCount = (item) => {
    return item ? item.split('</li>').filter(Boolean).length : 0;
}
</script>

<template>
    <li class="default__item">
        <div class="item__name">
            Комплектация {{ comp.complectation }}
        </div>

        <div class="item__dropdown">
            <ul class="dropdown__list">
                <li class="dropdown__item" v-if="comp.interior">
                    <span class="title" @click.stop="showInterior = !showInterior">
                        <span class="name">Интерьер</span>
                        <span class="arrow">
                            {{ getItemCount(comp.interior) }}
                            <i :class="`fa fa-solid ${showInterior ? 'fa-chevron-down' : 'fa-chevron-right'}`"></i>
                        </span>
                    </span>
                    <span class="value" v-htmlSanitizer="comp.interior" v-show="showInterior" />
                </li>

                <li class="dropdown__item" v-if="comp.exterior">
                    <span class="title" @click.stop="showExterior = !showExterior">
                        <span class="name">Экстерьер</span>
                        <span class="arrow">
                            {{ getItemCount(comp.exterior) }}
                            <i :class="`fa fa-solid ${showExterior ? 'fa-chevron-down' : 'fa-chevron-right'}`"></i>
                        </span>
                    </span>
                    <span class="value" v-htmlSanitizer="comp.exterior" v-show="showExterior" />
                </li>
                <li class="dropdown__item" v-if="comp.safety">
                    <span class="title" @click.stop="showSafety = !showSafety">
                        <span class="name">Безопасность</span>
                        <span class="arrow">
                            {{ getItemCount(comp.safety) }}
                            <i :class="`fa fa-solid ${showSafety ? 'fa-chevron-down' : 'fa-chevron-right'}`"></i>
                        </span>
                    </span>
                    <span class="value" v-htmlSanitizer="comp.safety" v-show="showSafety" />
                </li>
                <li class="dropdown__item" v-if="comp.comfort">
                    <span class="title" @click.stop="showComfort = !showComfort">
                        <span class="name">Комфорт</span>
                        <span class="arrow">
                            {{ getItemCount(comp.comfort) }}
                            <i :class="`fa fa-solid ${showComfort ? 'fa-chevron-down' : 'fa-chevron-right'}`"></i>
                        </span>
                    </span>
                    <span class="value" v-htmlSanitizer="comp.comfort" v-show="showComfort" />
                </li>
                <li class="dropdown__item" v-if="comp.car_theft_protection">
                    <span class="title" @click.stop="showTheftProtection = !showTheftProtection">
                        <span class="name">Защита от угона</span>
                        <span class="arrow">
                            {{ getItemCount(comp.car_theft_protection) }}
                            <i
                                :class="`fa fa-solid ${showTheftProtection ? 'fa-chevron-down' : 'fa-chevron-right'}`"></i>
                        </span>
                    </span>
                    <span class="value" v-htmlSanitizer="comp.car_theft_protection" v-show="showTheftProtection" />
                </li>
                <li class="dropdown__item" v-if="comp.overview">
                    <span class="title" @click.stop="showOverview = !showOverview">
                        <span class="name">Обзор</span>
                        <span class="arrow">
                            {{ getItemCount(comp.overview) }}
                            <i :class="`fa fa-solid ${showOverview ? 'fa-chevron-down' : 'fa-chevron-right'}`"></i>
                        </span>
                    </span>
                    <span class="value" v-htmlSanitizer="comp.overview" v-show="showOverview" />
                </li>
                <li class="dropdown__item" v-if="comp.multimedia">
                    <span class="title" @click.stop="showMultimedia = !showMultimedia">
                        <span class="name">Мультимедиа</span>
                        <span class="arrow">
                            {{ getItemCount(comp.multimedia) }}
                            <i :class="`fa fa-solid ${showMultimedia ? 'fa-chevron-down' : 'fa-chevron-right'}`"></i>
                        </span>
                    </span>
                    <span class="value" v-htmlSanitizer="comp.multimedia" v-show="showMultimedia" />
                </li>
                <li class="dropdown__item" v-if="comp.complectation_attributes">
                    <span class="title" @click.stop="showComplectationAttributes = !showComplectationAttributes">
                        <span class="name">Остальное</span>
                        <span class="arrow">
                            {{ getItemCount(comp.complectation_attributes) }}
                            <i
                                :class="`fa fa-solid ${showComplectationAttributes ? 'fa-chevron-down' : 'fa-chevron-right'}`"></i>
                        </span>
                    </span>
                    <span class="value" v-htmlSanitizer="comp.complectation_attributes"
                        v-show="showComplectationAttributes" />
                </li>
            </ul>
        </div>

        <div class="item__contorls">
            <div class="item__price">
                <span class="current">
                    от {{ makeSpaces(comp.price - selectedModel?.min_sale) }} ₽
                </span>
                <span class="old" v-if="selectedModel?.min_sale">
                    от {{ makeSpaces(comp.price) }} ₽
                </span>
            </div>
            <BaseButton :label="'Выбрать'" :class="'credit-mod'" />
        </div>
    </li>
</template>

<style lang="scss" scoped>
.default__item {
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-align: center;
    padding: 20px;
    border-radius: 20px;
    border: 2px solid #f5f5f5;
    cursor: pointer;
    transition: 0.3s;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
        padding: 10px;
        gap: 5px;
    }

    .item__dropdown {
        .dropdown__list {
            display: flex;
            flex-direction: column;
            gap: 5px;

            .dropdown__item {
                display: flex;
                flex-direction: column;
                border-radius: var(--border-small-radius);
                transition: 0.3s;
                border: 1px solid #f5f5f5;
                padding: 12px 8px;

                &:hover {
                    background: #f5f5f5;
                    transition: 0.3s;
                }

                .title {
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;

                    .arrow {
                        display: flex;
                        gap: 5px;
                        align-items: center;
                        color: var(--main-color);

                        @media screen and (max-width: 768px) {
                            font-size: var(--small-size);
                        }

                        i {
                            font-size: 12px;
                            width: 20px;
                        }
                    }

                    .name {
                        @media screen and (max-width: 768px) {
                            font-size: var(--small-size);
                        }
                    }
                }


                .value {
                    // background: #f5f5f5;
                    margin: 5px 0;
                    padding: 10px 10px 10px 25px;
                    border-radius: var(--border-small-radius);

                    @media screen and (max-width: 768px) {
                        padding: 5px 5px 5px 25px;
                        margin: 0;
                        font-size: var(--small-size);
                    }

                    &:deep(li) {
                        list-style: disc;
                        text-align: start;
                    }
                }

            }
        }
    }

    .item__params {
        .params__list {
            column-gap: 30px;
            display: grid;
            grid-template-columns: 1fr;
            list-style: none;
            padding: 0;
            row-gap: 0;

            li {
                align-items: center;
                display: flex;
                justify-content: space-between;
                padding: 5px 0;

                .value {
                    order: 2;
                }

                &::after {
                    background-color: #e6e8ec;
                    content: "";
                    display: block;
                    flex-grow: 1;
                    height: 1px;
                    margin: 0 8px;
                    position: relative;
                    top: 5px;
                }
            }
        }
    }

    .item__contorls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
    }

    .item__name {
        font-weight: 600;
        text-align: center;

        @media screen and (max-width: 768px) {
            font-size: var(--small-size);
        }
    }

    img {
        height: 120px;
        width: 100%;
        object-fit: contain;

        @media screen and (max-width: 768px) {
            height: 80px;
        }
    }

    .item__price {
        display: flex;
        flex-direction: column;

        .current {
            font-weight: bold;
            color: var(--secondary-color);

            @media screen and (max-width: 768px) {
                font-size: var(--standart-size);
            }
        }

        .old {
            text-decoration: line-through;
            font-size: var(--standart-size);

            @media screen and (max-width: 768px) {
                font-size: var(--small-size);
            }
        }
    }
}
</style>