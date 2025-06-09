<script setup>
import { options, name, numberMask } from "@/constants/";

import { vMaska } from "maska/vue"

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();

const emits = defineEmits(['showCar']);

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const steps = ref(['Данные вашего авто', 'Данные нового авто', 'Оформление заявки'])
const activeStep = ref(0)

/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
    formChecked.value = value
}
/* Form Check */

const phoneValue = ref('')
const phoneError = ref(false)

const brandValue = ref();
const modelValue = ref();
const yearValue = ref();

const nameValue = ref('')
const nameError = ref(false)

watch(() => creditStore.category, (currentData) => {
    creditStore.carNew = null
})

const carStatus = computed(() => {
    return Boolean(creditStore.carNew)
})

const validateForm = () => {
    const clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

    const formValues = {
        phone: clearPhone,
        name: nameValue.value,
        brand: brandValue.value,
        model: modelValue.value,
        year: yearValue.value
    }

    const appType = 8
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

function validateYear() {
    if (yearValue.value.length == 4) {
        if (yearValue.value < 1990) {
            yearValue.value = 1990
        } else if (yearValue.value > new Date().getFullYear()) {
            yearValue.value = new Date().getFullYear()
        }
    } else if (yearValue.value == '') {
        yearValue.value = null
    } else {
        yearValue.value = 2020
    }
}
</script>

<template>
    <section class="page section">
        <div class="container">
            <div class="section__header trade__section-header">
                <BasePageTitle />
            </div>
            <div class="page__content">
                <div class="page__form">
                    
                    <div class="form__form">
                        <h1 class="form__steps-title">Данные вашего авто</h1>
                        <div class="form__steps">
                            <!-- <h1 class="form__steps-title">Данные вашего авто</h1> -->
                            <ul class="form__steps-list">
                                <li class="form__steps-item"
                                    :class="{ 'form__steps-item--active': activeStep === 0 || activeStep === 1 || activeStep === 2 }">
                                    <div class="form__steps-item__number">1 шаг</div>
                                    <!-- <div class="form__steps-item__text">Данные вашего авто</div> -->
                                </li>
                                <li class="form__steps-item"
                                    :class="{ 'form__steps-item--active': activeStep === 1 || activeStep === 2 }">
                                    <div class="form__steps-item__number">2 шаг</div>
                                    <!-- <div class="form__steps-item__text">Данные нового авто</div> -->
                                </li>
                                <li class="form__steps-item" :class="{ 'form__steps-item--active': activeStep === 2 }">
                                    <div class="form__steps-item__number">3 шаг</div>
                                    <!-- <div class="form__steps-item__text">Оформление заявки</div> -->
                                </li>

                            </ul>
                            <div class="form__steps-progress">
                                <div class="form__steps-progress--filled"
                                    :style="{ width: (activeStep === 0 ? '20%' : `${(activeStep / (steps.length - 1)) * 115}%`) }">
                                </div>
                            </div>
                        </div>
                        <div class="form__content">
                            <div class="form__content-item" v-show="activeStep === 0">
                                <div class="form__form-block">
                                    <div class="base-input">
                                        <input type="text" name="brand" placeholder="Марка" v-model="brandValue"
                                            autocomplete="on" class="form-input">
                                    </div>

                                    <div class="base-input">
                                        <input type="text" name="model" placeholder="Модель" v-model="modelValue"
                                            autocomplete="on" class="form-input">
                                    </div>

                                    <div class="base-input">
                                        <input type="text" name="year" placeholder="Год" v-model="yearValue"
                                            autocomplete="on" class="form-input" v-maska="numberMask"
                                            @change="validateYear">
                                    </div>
                                </div>

                                <div class="item__controls">
                                    <button class="btn" @click="activeStep = 1">
                                        Продолжить
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="form__content-item" v-show="activeStep === 1">
                                <div class="form__form-block">

                                    <div class="car__choice">
                                        <div class="car-show"
                                            v-if="creditStore.carNew && creditStore.category == 'new'">
                                            <div class="car-show__wrapper">
                                                <div class="car-show__image">
                                                    <NuxtImg lazy format="webp" quality="90" loading="lazy"
                                                        :src="`${creditStore.carNew.images[0]?.url ? creditStore.carNew.images[0].url : ''}`" />
                                                </div>
                                                <div class="car-show__content">
                                                    <div class="car-show__title">
                                                        {{ cleanUpTitle(creditStore.carNew.brand,
                                                            creditStore.carNew.model,
                                                            creditStore.carNew.modification.modification,
                                                            creditStore.carNew.complectation.complectation) }}
                                                    </div>
                                                    <div class="car-show__price">
                                                        <div class="block">
                                                            <span class="old">
                                                                от {{ makeSpaces(creditStore.carNew.price) }} ₽
                                                            </span>
                                                            <span class="current">
                                                                от
                                                                {{ makeSpaces(creditStore.carNew.price -
                                                                    creditStore.carNew?.sale)
                                                                }}
                                                                ₽
                                                            </span>
                                                        </div>
                                                        <span class="credit">
                                                            от
                                                            {{
                                                                makeSpaces(appStore.calcMonthPriceModel(creditStore.carNew?.sale,
                                                                    creditStore.carNew.price)) }}
                                                            ₽/мес.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="car-show__select" @click="creditStore.modalShow()">
                                                Выбрать другое авто
                                            </div>
                                        </div>

                                        <div class="car-select" v-else>
                                            <div class="car-select__wrapper" @click="creditStore.modalShow()">
                                                <div class="car-select__image">
                                                    <NuxtImg lazy format="webp" quality="90" loading="lazy"
                                                        src="/images/empty__car.webp" alt="no image" />
                                                </div>
                                                <div class="car-select__title">
                                                    {{ creditStore.category == 'new' ? 'Выберите новое авто' :
                                                        'Выберите авто с пробегом' }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="item__controls">
                                    <button class="btn" @click="activeStep = 2" :disabled="!carStatus">Продолжить <i
                                            class="fa-solid fa-arrow-right"></i></button>

                                    <button class="btn" @click="activeStep = 0">
                                        <i class="fa-solid fa-arrow-left"></i>
                                        Назад
                                    </button>
                                </div>
                            </div>
                            <div class="form__content-item" v-show="activeStep === 2">

                                <form class="form__form-block" @submit.prevent="validateForm" autocomplete="on">
                                    <div class="base-input">
                                        <input :class="{ 'is-invalid': nameError }" type="text" name="name"
                                            placeholder="Имя" v-model="nameValue" autocomplete="on" v-maska="name"
                                            class="form-input">
                                    </div>

                                    <div class="base-input">
                                        <input :class="{ 'is-invalid': phoneError }" type="tel" name="contactPhone"
                                            placeholder="+7 (___) ___-__-__" autocomplete="on" v-maska="options"
                                            v-model="phoneValue" class="form-input">

                                        <span class="alert" v-show="phoneError"><i
                                                class="fa-solid fa-triangle-exclamation"></i></span>
                                    </div>

                                    <FormPieceCheck @formChecked="returnEmit" :appType="2" />

                                    <BaseFormButton :title="'Оставить заявку'" :label="'Оставить заявку'"
                                        :disabled="!formChecked" :loading="!appStore.formLoading"
                                        class="form__form-submit" />
                                </form>

                                <div class="item__controls">
                                    <button class="btn" @click="activeStep = 1">
                                        <i class="fa-solid fa-arrow-left"></i>
                                        Назад
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page__text">
                    <!-- <div class="page__text-content" v-htmlSanitizer="appStore?.newSeo[$route.name]?.text_content ? removeTrash(appStore.newSeo[$route.name].text_content) : null"></div>   -->
                    <div class="page__text-content">
                        <h2>
                Обменяйте старое авто на новое — быстро и выгодно с "Тюмень-Лекс"!
            </h2>
            <p class="chapter">
               Трейд-ин в нашем автосалоне — это идеальный вариант для тех, кто ценит своё время и хочет без лишних хлопот пересесть на новый автомобиль. 

Забудьте о сложностях самостоятельной продажи — мы оценим ваш автомобиль по рыночной стоимости, оформим все документы и предложим лучшие условия на покупку нового авто. 
Вся процедура занимает минимум времени — вы можете уехать на новой машине уже в день обращения! 
            </p>
        </div>
        
        <div class="content__text content__section">
            <div class="chapter">
                <h2>Почему выбирают трейд-ин в “Тюмень-Лекс”: 

</h2>
                <ul>
                    <li>
                        Быстрая и прозрачная сделка 


                    </li>
                    <li>
                        Профессиональная оценка вашего авто 


                    </li>
                    <li>
                       Помощь на всех этапах оформления 

                    </li>
                    <li>
                        Широкий выбор новых моделей по доступным ценам 
                    </li>
                </ul>
<p class="chapter">
Доверьте обмен авто профессионалам — и откройте для себя комфорт нового уровня. 
Оставьте заявку на tumen-leks.ru и сделайте шаг к новому автомобилю уже сегодня! 
"Тюмень-Лекс" — меняем старое на лучшее! 
</p>
            </div>
                    </div>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <div v-show="creditStore.isOpen">
                <ModalCarChoiceNew :selectedCategory="creditStore.category" @closeModal="creditStore.modalShow()"
                    @choiceCar="choiceCar($event)" />
            </div>
        </Teleport>
    </section>

</template>

<style scoped lang="scss">
.page {
    .page__content {
        .page__form {
            .form__form {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                
                .form__steps {
                    width: 100%;
                    position: relative;
                    margin-bottom: 20px;
                    // padding: 0 20px;
                    
                    &-list {
                        position: relative;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 0;
                        padding: 0;
                        list-style: none;
                        gap: 15px;
                        z-index: 2;
                        
                    }

                    &-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        position: relative;
                        
                        &--active {
                            .form__steps-item__number {
                                background: var(--main-color);
                                transition: 0.3s;
                                border-radius: 4px;
                            }

                            .form__steps-item__text {
                                color: var(--main-black);
                                transition: 0.3s;
                                
                            }
                        }
                    }

                    &-item__number {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: auto;
                        height: auto;
                        padding: 12px;
                        border-radius: 4px;
                        background: #dbdbdb;
                        font-size: 20px;
                        font-weight: 700;
                        color: white;
                        transition: 0.3s;

                        @media screen and (max-width: 540px) {
                            font-size: 16px;
                        }
                    }

                    &-item__text {
                        font-size: 10px;
                        text-align: center;
                        position: absolute;
                        width: 90px;
                        top: 45px;
                        color: #dbdbdb;
                        margin-top: 5px;
                    }

                    &-progress {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background-color: #dbdbdb;
                        transform: translateY(-50%);
                        z-index: 0;
                        border-radius: 4px;
                        overflow: hidden;

                        &--filled {
                            background-image: linear-gradient(to right, var(--main-color), var(--main-color));
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                            width: 10%;
                            transition: width 0.3s ease-in-out;
                            height: 100%;
                        }
                    }
                }

                .form__content {
                    width: 100%;
                    height: 100%;

                    .form__content-item {
                        animation: fadeIn 0.3s ease-in-out;
                        min-height: 250px;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        gap: 15px;

                        .form__form-block {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            position: relative;

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
                        }


                        .item__controls {
                            width: 100%;
                            display: flex;
                            flex-direction: row-reverse;
                            justify-content: space-between;
                            gap: 10px;
                            .btn {
                                padding: 10px 10px;
                                background: var(--main-color);
                                color: white;
                                border-radius: 4px;
                                font-size: var(--small-size);
                                display: flex;
                                align-items: center;
                                gap: 10px;
                                width: 100%;
                                justify-content: space-between;
                            }
                        }
                    }
                }
            }
        }
    }
}


.car__choice {
    .car-select {
        .car-select__wrapper {
            display: flex;
            flex-direction: column;
            gap: 15px;
            justify-content: center;
            align-items: center;

            padding: 30px;
            border-radius: 4px;
            cursor: pointer;
            transition: 0.3s;

            &:hover {
                opacity: 0.7;
                transition: 0.3s;
            }

            .car-select__title {
                text-align: center;
                padding: 15px 20px;
                background: var(--secondary-color);
                color: white;
                border-radius: 4px;
            }

            .car-select__image {
                img {
                    width: 100%;
                    height: 100%;
                    filter: grayscale(100%);
                }
            }
        }
    }

    .car-show {
        .car-show__wrapper {
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 10px;
            overflow: hidden;
            border-radius: 4px;
            border: var(--border);
            cursor: pointer;

            @media screen and (max-width: 768px) {
                grid-template-columns: 1fr;
            }

            .car-show__content {
                padding: 20px 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;

                @media screen and (max-width: 768px) {
                    padding: 0 10px 10px 10px;
                }

                .car-show__title {
                    font-size: 18px;
                    font-weight: 600;
                }

                .car-show__price {
                    display: flex;
                    align-items: end;
                    gap: 15px;
                    flex-wrap: wrap;

                    @media screen and (max-width: 768px) {
                        gap: 5px;
                    }

                    .block {
                        display: flex;
                        flex-direction: column;
                    }

                    .old {
                        text-decoration: line-through;
                        color: var(--grey);
                    }

                    .current {
                        font-weight: bold;
                        font-size: 26px;
                        line-height: normal;
                        color: var(--main-color);
                    }

                    .credit {
                        color: var(--secondary-color);
                        font-size: var(--standart-size);
                        border: 1px solid var(--secondary-color);
                        padding: 5px;
                        border-radius: 20px;
                    }
                }
            }

            .car-show__image {
                padding: 30px;
                background: #f6f6f6;
                min-width: 250px;

                @media screen and (max-width: 768px) {
                    padding: 15px;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }

        .car-show__select {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 4px;
            border: var(--border);
            transition: 0.3s;
            width: fit-content;
            font-size: var(--standart-size);

            &:hover {
                opacity: 0.7;
                transition: 0.3s;
            }
        }
    }
}
.form__steps-title{
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>