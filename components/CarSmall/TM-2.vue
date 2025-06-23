<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps(['model'])
const model = computed(() => props.model)
</script>

<template>
    <div class="model tm-2">
        <NuxtLink :to="`/cars/${model.url_brand}/${model.url_model}`" class="model__img-block">

            <NuxtImg format="webp" quality="90" loading="lazy" :src="model.taxi ? model.taxi : model.preview"
                :alt="model.model" class="model__img" :class="{ 'no-taxi': !model.taxi }" />

            <div class="model__stickers">
                <div class="sticker available">В наличии</div>
                <!-- <div class="sticker count">В наличии: <span>{{ model.cars_count }} авто</span></div> -->
            </div>
        </NuxtLink>

        <NuxtLink :to="`/cars/${model.url_brand}/${model.url_model}`" class="model__info">
            <div class="model__title">
                <span class="name">
                    {{ cleanUpTitle(model.brand, model.model) }}
                </span>

                <div class="configuration" v-if="model.complectation || model.modification">
                    <span>{{ model.complectation }}</span>
                    <span>{{ model.modification }}</span>
                </div>
            </div>

            <!-- <div class="model__percent">
                Скидка до {{ getNextMonday() }}
            </div> -->

            <div class="model__price">
                <div class="model__price-current">
                    от {{ makeSpaces(model.min_price) }} ₽
                </div>
                <div class="model__price-old" v-if="model.min_sale">
                    от {{ makeSpaces(model.min_price + model.min_sale) }} ₽
                </div>
                <div class="model__price-month">
                    в кредит от: <span>{{ makeSpaces(appStore.calcMonthPriceModel(0, model.min_price)) }} ₽/мес.</span>
                </div>
            </div>
        </NuxtLink>
        <div class="taxi__buttons">
            <div class="tag">Осталось <span>{{ model.cars_count }} авто</span></div>
            <div class="tag disabled">Выгодный кредит от 3,9%</div>
            <div class="tag disabled">Trade-In</div>
        </div>
            
        <div class="model__controls">
            <BaseButtonModal
                :car="{ brand: model.url_brand, model: model.url_model, price: model.min_price + model.min_sale, sale: model.min_sale, preview: model.preview }"
                :btn-label="'Купить в кредит'" :app-type="2"
                :modal-title="`Купить в кредит ${cleanUpTitle(model.url_brand, model.url_model)}`"
                :btn-class="`classic taxi`" category="new" />
            <BaseButtonModal :car="car" :btn-label="'Заказать обратный звонок'" :app-type="8"
                :modal-title="`Закажите обратный звонок и наш специалсит перезвонит Вам в течение 15 минут!`"
                :btn-class="`classic taxi-trade`" category="new" :btnIcon="`fa-solid fa-phone`"/>
        </div>
    </div>
</template>

<!-- :btnMobileIcon="`fa-solid fa-phone`" -->

<style scoped lang="scss">

.taxi__buttons{
    display: flex;
    gap: 10px;
    padding: 0 15px;
    flex-wrap: nowrap;
    overflow-x: auto;
    max-width: 100%; // ограничение по ширине родителя
    width: 100%; // или конкретное значение: 500px, 600px и т.д.
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none; // Chrome, Safari
    }
    .tag {
        padding: 6px 10px;
        font-size: 10px;
        font-weight: 500;
        border: 1px solid #C4C4C4;
        border-radius: 6px;
        white-space: nowrap;
        background: #fff;
        color: #000;
    }

    .tag.disabled {
        color: #aaa;
        border-color: #ddd;
    }
}


.model {
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 280px;
    border-radius: 4px;
    transition: 0.3s;
    position: relative;
    background: #FFF;
    gap: 10px;
    border: 1px solid #9F9F9F;
    @media screen and (max-width: 400px) {
        padding: 10px;
        gap: 10px;
    }

    &:hover {
        box-shadow: var(--box-shadow);
        background: white;
        transition: 0.3s;
    }


    .modeld__garantee {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 80px;
        height: 80px;
        background: var(--bg-light);
        border-radius: 50%;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        pointer-events: none;
        z-index: 10;

        span {
            font-size: var(--small-size);
            font-weight: 300;
            background: transparent;
            text-align: center;
        }

        img {
            width: 30px;
            height: 30px;
            object-fit: contain;
        }
    }

    .model__info {
        padding: 15px;

        .model__title {
            line-height: normal;
            display: flex;
            flex-direction: column;

            .name {
                font-weight: bold;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 5px;
            }

            .configuration {
                display: flex;
                gap: 5px;
                flex-wrap: wrap;
            }
        }

        .model__params {
            margin: 10px 0;

            .model__params-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                color: #A7A7A7;

                .model__param {
                    position: relative;

                    &:before {
                        content: '🞄';
                        margin-right: 2px;
                        font-size: 14px;
                    }
                }
            }
        }

        .model__percent {
            margin-bottom: 20px;
            border-radius: 15px;
            background: #494949;
            padding: 5px 10px;
            width: fit-content;
            color: var(--yellow);
        }

        .model__more-link {
            padding: 15px;
            background: var(--main-color);
            border: 1px solid var(--main-color);
            color: white;
            text-align: center;
            border-radius: 20px;
            width: auto;
            transition: 0.3s;

            &:hover {
                background: transparent;
                transition: 0.3s;
                color: var(--main-color);
            }
        }

        .model__price {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            .model__price-month {
                font-size: var(--standart-size);

                @media screen and (max-width: 400px) {
                    font-size: 12px;
                }

                span {
                    // color: var(--yellow);
                    font-weight: 700;
                }
            }

            .model__price-current {
                font-size: var(--medium-size);
                line-height: normal;
                font-weight: 700;
                font-size: 18px;
            }

            .model__price-old {
                margin-left: 10px;
                color: #b0b0b0;
                text-decoration: line-through;
            }
        }
    }

    .model__controls {
        padding: 0 15px 15px 15px;
        width: 100%;
        display: grid;
        flex-direction: column;
        gap: 10px;
    }

    .model__img-block {
        position: relative;
        width: 100%;
        overflow: hidden;
        height: auto;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;

        .model__img {
            display: block;
            max-width: 100%;
            width: 100%;
            height: 150px;
            object-fit: contain;
            padding: 20px;
            
        }

        .model__img.no-taxi {
            transform: scaleX(-1);
        }

        .model__stickers {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            position: absolute;
            z-index: 10;
            top: 10px;
            left: 0;
            padding: 0 10px;
            background: transparent;

            .sticker {
                border-radius: 20px;
                background: white;
                text-align: center;
                z-index: 1;
                padding: 6px 8px;
                font-size: var(--small-size);
                line-height: normal;
            }

            .available {
                background: white;
                border: 2px solid #28a745; // зелёная рамка
                color: #28a745; // зелёный текст
                display: inline-block; // показываем
                font-weight: 600;
                border-radius: 4px;
            }

            .garantee {
                background: var(--main-color2);
                color: white;
            }

            .count {
                font-size: 10px;
                background: var(--yellow);
                color: var(--main-black);

                span {
                    font-size: inherit;
                    color: var(--main-black);
                    font-weight: 600;
                }
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    }
}

.current-model {
    display: none;
}

.recent {
    display: none;
    position: absolute;
    left: 15px;
    top: 15px;
    background: white;
    text-align: center;
    z-index: 100;
    padding: 8px 12px;
    border-radius: 20px;
}

.model__text {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>