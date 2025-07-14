<script setup>
import { options, name } from "@/constants/";

import { vMaska } from "maska/vue"

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();

import { useRoute } from 'vue-router';
const $route = useRoute();

const emits = defineEmits(['showCar']);
const props = defineProps({
    minPercent: Number,
});

/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
    formChecked.value = value
}
/* Form Check */

/* Time List */
const timeListOutputData = ref(0);
const carInitialFee = ref(0);
const carPrice = ref(0);
const currCar = ref([]);
const showAuto = ref(false);

function percentListOutput(value) {
    carInitialFee.value = value
}

function timeListOutput(value) {
    if (value == 0) {
        timeListOutputData.value = 0.166667 * 12;
    } else if (value == 1) {
        timeListOutputData.value = 0.5 * 12;
    } else if (value == 2) {
        timeListOutputData.value = 1 * 12;
    } else if (value == 3) {
        timeListOutputData.value = 2 * 12;
    } else if (value == 4) {
        timeListOutputData.value = 3 * 12;
    } else if (value == 5) {
        timeListOutputData.value = 4 * 12;
    } else if (value == 6) {
        timeListOutputData.value = 5 * 12;
    } else if (value == 7) {
        timeListOutputData.value = 6 * 12;
    }
    else {
        timeListOutputData.value = 7 * 12;
    }
}

let monthlyPayment = computed(() => {
    if (creditStore.carNew == 0) {
        return 0
    } else {
        let i = (($route.name == 'leasing' ? 7 : (appStore.selectedBank?.percent ? appStore.selectedBank.percent : appStore.creditPercent)) / 12) / 100;
        let k = ((carPrice.value) - ((carPrice.value * carInitialFee.value) / 100));
        let num = (i * (1 + i) ** timeListOutputData.value) / (((i + 1) ** timeListOutputData.value) - 1);
        let numb = (k * num);

        return Math.floor(numb)
    }
})
/* Time List */

const formSend = ref(false)

const phoneValue = ref('')
const phoneError = ref(false)

const nameValue = ref('')
const nameError = ref(false)

const validateForm = () => {
    const clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

    const formValues = {
        phone: clearPhone,
        name: nameValue.value,
        fee: `${(carPrice.value - carInitialFee.value) * (appStore.selectedBank?.percent ? appStore.selectedBank.percent : appStore.creditPercent) / 100} руб перв. взнос`,
        timeListOutputData: `${timeListOutputData.value} (мес.) срок кредитования`,
        monthlyPayment: `${monthlyPayment.value} руб/мес платеж`
    }

    const appType = 2
    const car = creditStore.carNew
    const categoty = 'new'

    if (clearPhone.length == 11) {
        postForm(formValues, appType, car, categoty);
    } else {
        if (clearPhone.length < 11) {
            phoneError.value = true
            setTimeout(() => {
                phoneError.value = false
            }, 3000)
        }
    }
};

watch(() => creditStore.carNew, (currentData) => {
    if (currentData?.price) {
        carPrice.value = currentData.price - currentData?.sale
    }
})

watch(() => creditStore.category, (currentData) => {
    carPrice.value = 0
    creditStore.carNew = null
})
</script>

<template>
    <form class="form__form-content" @submit.prevent="validateForm">
        
        <div class="form__form-block">
            <div class="car__choice" type="button" @click="creditStore.modalShow()">

                <div class="car__choice-wrapper" :class="{ 'car': creditStore.carNew?.price }"
                    v-if="creditStore.category == 'new'">
                    <span class="title" :class="{ 'car': creditStore.carNew?.price }">
                        Выберите новый авто
                        <i class="fa-solid fa-arrow-right"></i>
                    </span>
                    <div class="value" v-if="creditStore.carNew">
                        <div class="value-name">
                            {{
                                creditStore.carNew?.price ? cleanUpTitle(creditStore.carNew.brand, creditStore.carNew.model,
                                    creditStore.carNew.modification.modification,
                                    creditStore.carNew.complectation.complectation) : ''
                            }}
                        </div>
                        <div class="value-block">
                            <div class="image">
                                <NuxtImg lazy format="webp" quality="90" loading="lazy"
                                    :src="`${creditStore.carNew.images[0]?.url ? creditStore.carNew.images[0].url : ''}`" />
                            </div>
                            <div class="price">
                                <div class="old">
                                    от {{ makeSpaces(creditStore.carNew.price) }} ₽
                                </div>
                                <div class="current">
                                    от
                                    {{ makeSpaces(creditStore.carNew.price - creditStore.carNew?.sale) }}
                                    ₽
                                </div>
                            </div>
                        </div>
                        <div class="value-controls">
                            <div class="select">Выбрать другое авто</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="form__form-block" :class="{ 'disabled': !creditStore.carNew }">
            <FormPieceRangeSliderTime @timeListOutput="timeListOutput" />
        </div>

        <div class="form__form-block" :class="{ 'disabled': !creditStore.carNew }">
            <FormPieceRangeSliderPercent :carPrice="carPrice" @percentListOutput="percentListOutput"
                :minPercent="minPercent" />
        </div>

        <div class="form__form-block" :class="{ 'disabled': !creditStore.carNew }">
            <div class="form__credit-data">
                <div class="credit-data__item">
                    <div>Платеж от</div>
                    <div class="value"><span class="bold">{{ makeSpaces(monthlyPayment) }}₽</span>/мес.</div>
                </div>
                <div class="credit-data__item">
                    <div>Ставка от</div>
                    <div class="value bold">
                        {{ appStore.selectedBank?.percent ? appStore.selectedBank.percent : appStore.creditPercent }}%
                    </div>
                </div>
            </div>
        </div>

        <div class="form__form-block">
            <div class="base-input">
                <input :class="{ 'is-invalid': nameError }" type="text" name="name" placeholder="Ваше имя"
                    v-model="nameValue" autocomplete="on" v-maska="name" class="form-input">
            </div>

            <div class="base-input">
                <input :class="{ 'is-invalid': phoneError }" type="tel" name="contactPhone"
                    placeholder="+7 (___) ___-__-__" autocomplete="on" v-maska="options" v-model="phoneValue"
                    class="form-input">

                <span class="alert" v-show="phoneError"><i class="fa-solid fa-triangle-exclamation"></i></span>
            </div>

            <FormPieceCheck @formChecked="returnEmit" :appType="2" />

            <BaseFormButton :title="'Оставить заявку'" :label="'Оставить заявку'"
                :disabled="!formChecked || Boolean(!(creditStore.carNew))" :loading="!appStore.formLoading"
                class="form__form-submit" />
        </div>
    </form>
</template>

<style scoped lang="scss">



.form__form-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    gap: 15px;
    
    @media screen and (max-width: 540px) {
        gap: 10px;
    }

    .form__form-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;

        .car__choice {
            // border: var(--border);
            height: 100%;
            width: 100%;
            border: 1px solid grey;
            border-radius: 12px;
            transition: 0.3s;
            background: white;
            color: var(--main-black);
            cursor: pointer;
            display: flex;

            position: relative;
            overflow: hidden;

            .car__choice-wrapper {
                height: 100%;
                padding: 10px 15px;
                transition: 0.3s;
                width: 100%;

                .value {
                    display: flex;
                    gap: 10px;
                    flex-direction: column;

                    .value-name {
                        @media screen and (max-width: 540px) {
                            font-size: var(--standart-size);
                        }
                    }

                    .value-controls {
                        .select {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 5px 10px;
                            cursor: pointer;
                            border-radius: 16px;
                            border: var(--border);
                            transition: 0.3s;
                            width: -moz-fit-content;
                            width: fit-content;
                            font-size: var(--small-size);
                        }
                    }

                    .value-block {
                        display: none;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;

                        @media screen and (max-width: 768px) {
                            display: grid;
                        }

                        .image {
                            max-height: 100px;

                            img {
                                max-width: 100%;
                                max-height: 100%;
                                object-fit: contain
                            }
                        }

                        .price {
                            display: flex;
                            align-items: end;
                            flex-direction: column;
                            justify-content: center;

                            .old {
                                text-decoration: line-through;
                                color: var(--grey);
                                text-align: end;

                                @media screen and (max-width: 400px) {
                                    font-size: var(--small-size);
                                }
                            }

                            .current {
                                font-weight: bold;
                                font-size: 26px;
                                line-height: normal;
                                color: var(--main-color);
                                text-align: end;

                                @media screen and (max-width: 540px) {
                                    font-size: var(--large-size);
                                }

                                @media screen and (max-width: 400px) {
                                    font-size: var(--medium-size);
                                }

                                @media screen and (max-width: 340px) {
                                    font-size: var(--standart-size);
                                }
                            }
                        }
                    }
                }

                .title {
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                    transition: 0.3s;
                }
            }

            &:hover {
                opacity: 0.6;
                transition: 0.3s;
                border-color: var(--main-color);

                .title {
                    color: var(--main-color);
                    transition: 0.3s;
                }
            }

            .car__choice-wrapper.car {
                padding: 25px 15px 15px 15px;
                width: 100%;
            }

            .title.car {
                position: absolute;
                top: 7px;
                background: transparent;
                font-size: var(--small-size);
                font-weight: bold;
            }
        }

        .form__brands-choice {
            display: inline-flex;
            gap: 5px;
            border: 2px solid var(--main-color);
            border-radius: 20px;
        }

        .form__credit-data {
            display: flex;
            width: 100%;
            margin: 10px 0;
            flex-wrap: wrap;
            flex-direction: column;
            gap: 10px;
            
            @media screen and (max-width: 540px) {
                align-items: center;
                gap: 5px;
            }

            @media screen and (max-width: 360px) {
                flex-direction: column;
            }

            .credit-data__item {
                padding: 15px 20px;
                // border: var(--border);
                border-radius: 12px;
                background: white;
                text-align: start;
                font-weight: bold;
                // width: fit-content;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;

                .bold {
                    font-weight: bold;
                }

                @media screen and (max-width: 360px) {
                    width: 100%;
                    justify-content: space-between;
                }

            }
        }

        .form__form-submit {
            padding: 15px;
            background: var(--main-color);
            color: var(--bg-light);
            font-weight: bold;
            transition: 0.3s;
            border: 3px solid var(--main-color);

            &:hover {
                opacity: 0.7;
                transition: 0.3s;
            }
        }

        .form__form-notice {
            text-align: start;
            display: flex;
            align-items: center;
            gap: 5px;

            span {
                font-size: 30px;
                line-height: normal;
                color: var(--main-color);
                font-weight: bold;
            }
        }

        .form__form-select {
            position: relative;
            cursor: pointer;

            select {
                border: var(--border);
                min-width: 210px;
                width: 100%;
                padding: 10px 15px;
                color: #f7f7f7;
                border-radius: 20px;
                background: white;
            }

            &:after {
                content: "\f107";
                position: absolute;
                right: 10px;
                top: 25px;
                font-family: "Font Awesome 6 Free";
                font-weight: 900;
                pointer-events: none;
                background: var(--light-grey);
                padding: 3px 4px;
                border-radius: 100%;
                text-align: center;
                color: var(--main-black);
                transition: 0.3s;
            }

        }

        .form__form-select.auto {
            background: white;
            min-width: 210px;
            width: 100%;
            color: #767676;
            border-radius: 20px;
            text-align: start;
            overflow: hidden;
            padding: 15px;
            border: var(--border);

            .auto__title {
                padding: 10px 15px;
            }

            .auto__select {
                display: flex;
                flex-direction: column;
                gap: 10px;
                max-height: 400px;
                overflow: auto;

                @media screen and (max-width: 540px) {
                    gap: 20px;
                }

                .auto__select-item {
                    display: grid;
                    grid-template-columns: 2fr 4fr;
                    height: auto;
                    align-items: center;
                    cursor: pointer;

                    .auto__select-item-text {
                        padding: 0 10px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        color: var(--main-black);
                        font-size: var(--standart-size);

                        @media screen and (max-width: 540px) {
                            gap: 5px;
                        }

                        .auto__select-item-title {
                            font-weight: bold;
                        }

                        .auto__select-item-info {
                            display: flex;
                            justify-content: space-between;
                            background: var(--main-color);
                            padding: 5px 10px;
                            color: white;
                            border-radius: 20px;

                            @media screen and (max-width: 540px) {
                                font-size: 12px;
                            }
                        }

                        .auto__select-item-price {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            @media screen and (max-width: 540px) {
                                flex-direction: column;
                            }

                            .price__current {
                                font-size: 16px;
                                font-weight: bold;
                            }

                            .price__old {
                                text-decoration: line-through;
                            }
                        }
                    }

                    .auto__select-item-image {
                        width: 100%;
                        height: 100%;

                        img {
                            object-fit: contain;
                            width: 100%;
                            height: 100%;
                        }

                    }
                }
            }

        }

        .form__form-select.active {
            &:after {
                transform: rotate(180deg);
                transition: 0.3s;
            }
        }

        .form__form-select.auto.disabled,
        .form__form-select.disabled {
            pointer-events: none;
            opacity: 0.4;
        }

        .form__form-title {
            font-weight: bold;
            text-align: start;
            padding-bottom: 10px;
        }
    }

}

.form__form-alert {
    padding: 15px;
    background: transparent;
    border-radius: 20px;
    color: var(--main-color);
    font-weight: bold;
    border: 3px solid var(--main-color);
}

.form__form-block.disabled div {
    pointer-events: none;
    opacity: 0.4;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: white;
    border-radius: 20px;
}

::-webkit-scrollbar-thumb {
    background: rgba(95, 95, 95, 0.582);
    border-radius: 20px;
}
</style>