<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps(['model'])
</script>

<template>
    <div class="card">
        <NuxtLink class="card__link" :to="`/cars/${model.url_brand}/${model.url_model}`">
            <p class="card__count">
                в наличии: <span>{{ model.cars_count }}</span>
            </p>
            <img class="card__img" :alt="`Превью ${model.url_brand.toUpperCase()} ${model.model}`" height="150"
                width="250" :src="`${model.preview}`" />
            <h3 class="card__name">
                {{ cleanUpTitle(model.model, model.brand) }}
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
                :modal-title="`Купить в кредит ${model.brand} ${model.model}`" />
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
    background: #F7F7F7;
    border: 1px solid rgba(199, 199, 199, 0.2);
    border-radius: 20px;
    transition: all 0.3s ease;

    @media (max-width: 515px) {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    &:hover {
        background: white;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

        @media (max-width: 515px) {
            background: var(--bg-light);
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
            max-width: 300px;

            @media (max-width: 768px) {
                max-width: 100%;
                white-space: normal;
            }
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