<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps(['model'])
</script>

<template>
    <div class="card">
        <p class="card__garantee">
            <img src="/svg/card-garantee.svg" alt="Гарантия" />
            <span>гарантия<br />
                5 лет</span>
        </p>
        <NuxtLink class="card__link" :to="`/cars/${model.url_brand}/${model.url_model}`">
            <p class="card__count">
                в наличии: <span>{{ model.cars_count }}</span>
            </p>
            <img class="card__img" :alt="`Превью ${model.url_brand.toUpperCase()} ${model.model}`" height="150"
                width="250" :src="`${model.taxi ? model.taxi : model.preview}`" />
            <h3 class="card__name">
                {{ model.url_brand.toUpperCase() }} {{ model.model }}<br />
            </h3>
            <p class="card__sale">
                Цена со скидкой *:
                <span>
                    до
                    <span class="sale-date">{{ getNextMonday() }}</span>
                </span>
            </p>
            <div class="card__price-block">
                <p class="card__price-new">
                    от
                    <span>{{ makeSpaces(model.min_price) }} р.</span>
                </p>
                <del class="card__price-old" v-if="model.min_sale">от {{ makeSpaces(model.min_price
                    + model.min_sale) }} р.
                </del>
            </div>
        </NuxtLink>
        <div class="card__buttons card__buttons-taxi">
            <BaseButtonModal
                :car="{ brand: model.url_brand, model: model.url_model, price: model.min_price + model.min_sale, sale: model.min_sale, preview: model.preview }"
                :btn-label="'Купить в кредит'" :app-type="2"
                :modal-title="`Купить в кредит ${model.brand} ${model.model}`" :btn-class="`taxi`" />
            <p class="card__payment">
                от
                <span>
                    {{ makeSpaces(appStore.calcMonthPriceModel(0, model.min_price)) }} руб/мес
                </span>
                в кредит
            </p>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.card {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: auto;
    background: var(--bg-light);
    border: 1px solid rgba(199, 199, 199, 0.2);
    border-radius: 20px;
    transition: all 0.3s ease;

    @media (max-width: 515px) {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    &:hover {
        background: #f8f8f8;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

        @media (max-width: 515px) {
            background: var(--bg-light);
        }

        .card__garantee {
            background: #f8f8f8;

            @media (max-width: 515px) {
                background: var(--bg-light);
            }
        }
    }

    .card__garantee {
        position: absolute;
        top: 15px;
        right: 10px;
        background: var(--bg-light);
        border-radius: 5px;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        pointer-events: none;
        transition: all 0.3s ease;

        & img {
            width: 30px;
            height: 30px;
            object-fit: contain;
        }

        & span {
            background: transparent;
            text-align: center;
        }
    }

    .card__link {
        width: 100%;
        height: 100%;
        padding: 36px 10px 18px;

        .card__count {
            font-size: 18px;
            line-height: 20px;
            margin-bottom: 10px;

            span {
                color: var(--main-color);
                text-decoration: underline;
            }
        }

        .card__img {
            display: block;
            max-width: 100%;
            width: 100%;
            height: 150px;
            object-fit: contain;
        }

        .card__name {
            font-weight: 500;
            font-size: 26px;
            line-height: 30px;
            text-transform: capitalize;
            margin-top: 10px;
            margin-bottom: 15px;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .card__sale {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            font-size: 12px;
            margin: 15px 0;
            padding-left: 30px;

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                background: url(/svg/card-discount.svg) no-repeat center;
                background-size: contain;
                width: 23px;
                height: 20px;
            }

            span {
                font-weight: normal;
                color: var(--secondary-color);
            }
        }

        .card__price-block {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            gap: 5px;

            .card__price-new {
                font-weight: normal;
                font-size: 16px;
                color: #b0b0b0;

                span {
                    font-size: 18px;
                    color: var(--main-black);
                }
            }

            .card__price-old {
                display: block;
                font-weight: normal;
                font-size: 16px;
                color: #b0b0b0;
            }
        }
    }

    .card__buttons {
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        padding: 0 10px;
        padding-bottom: 15px;

        .card__payment {
            text-align: center;

            span {
                font-weight: 500;
                color: var(--main-color);
            }
        }
    }
}
</style>