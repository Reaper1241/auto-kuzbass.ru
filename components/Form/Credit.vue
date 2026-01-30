<script setup>
import { options, name } from "@/constants/";

import { vMaska } from "maska/vue"

import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
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
const phonePasteAttempts = ref(0)
const phoneInputRef = ref(null)
/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
    formChecked.value = value
}
/* Form Check */
const namePasteAttempts = ref(0)
const nameInputRef = ref(null)
/* Time List */
const timeListOutputData = ref(0);
const carInitialFee = ref(0);
const carPrice = ref(0);
const currCar = ref([]);
const showAuto = ref(false);
const valueApp = ref('')
const phoneFieldName = ref(`phone-${Math.random().toString(36).substr(2, 9)}`)
const nameFieldName = ref(`name-${Math.random().toString(36).substr(2, 9)}`)

// Вычисляемые свойства для показа предупреждений
const showPhonePasteWarning = computed(() => {
    return phonePasteAttempts.value > 0;
});

const showNamePasteWarning = computed(() => {
    return namePasteAttempts.value > 0;
});

// Обработчики вставки для телефона
function handlePhonePaste(e) {
  e.preventDefault();
  phonePasteAttempts.value++;
  
  console.log(`Phone paste blocked! Attempts: ${phonePasteAttempts.value}`);
  
  // Показываем визуальную обратную связь
  if (phoneInputRef.value) {
    phoneInputRef.value.classList.add('paste-blocked');
    setTimeout(() => {
      phoneInputRef.value?.classList.remove('paste-blocked');
    }, 500);
  }
  
  // После 3 попыток показываем уведомление
  if (phonePasteAttempts.value >= 3) {
    phoneError.value = true;
    setTimeout(() => {
      phoneError.value = false;
    }, 3000);
  }
  
  return false;
}

function handlePhoneCopy(e) {
  e.preventDefault();
  return false;
}

function handlePhoneCut(e) {
  e.preventDefault();
  return false;
}

// Обработчики вставки для имени
function handleNamePaste(e) {
  e.preventDefault();
  namePasteAttempts.value++;
  
  console.log(`Name paste blocked! Attempts: ${namePasteAttempts.value}`);
  
  // Показываем визуальную обратную связь
  if (nameInputRef.value) {
    nameInputRef.value.classList.add('paste-blocked');
    setTimeout(() => {
      nameInputRef.value?.classList.remove('paste-blocked');
    }, 500);
  }
  
  return false;
}

function handleNameCopy(e) {
  e.preventDefault();
  return false;
}

function handleNameCut(e) {
  e.preventDefault();
  return false;
}

// Обработчики клавиш
function handlePhoneKeyDown(e) {
  const isPasteCombo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v';
  const isCopyCombo = (e.ctrlKey || e.metaKey) && ['c', 'x'].includes(e.key.toLowerCase());
  
  if (isPasteCombo || isCopyCombo) {
    e.preventDefault();
    if (phoneInputRef.value) {
      phoneInputRef.value.classList.add('shortcut-blocked');
      setTimeout(() => {
        phoneInputRef.value?.classList.remove('shortcut-blocked');
      }, 300);
    }
  }
}

function handleNameKeyDown(e) {
  const isPasteCombo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v';
  const isCopyCombo = (e.ctrlKey || e.metaKey) && ['c', 'x'].includes(e.key.toLowerCase());
  
  if (isPasteCombo || isCopyCombo) {
    e.preventDefault();
    if (nameInputRef.value) {
      nameInputRef.value.classList.add('shortcut-blocked');
      setTimeout(() => {
        nameInputRef.value?.classList.remove('shortcut-blocked');
      }, 300);
    }
  }
}

// Глобальные обработчики
function setupGlobalProtection() {
  document.addEventListener('keydown', handleGlobalKeyDown);
  document.addEventListener('contextmenu', handleGlobalContextMenu);
}

function handleGlobalKeyDown(e) {
  const activeElement = document.activeElement;
  const isPasteCombo = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v';
  
  if (isPasteCombo && 
      (activeElement === phoneInputRef.value || activeElement === nameInputRef.value)) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
}

function handleGlobalContextMenu(e) {
  // Блокируем контекстное меню на наших полях
  if (e.target === phoneInputRef.value || e.target === nameInputRef.value) {
    e.preventDefault();
    return false;
  }
}

// Автоматическое скрытие предупреждений через 3 секунды
watch(phonePasteAttempts, (newVal) => {
  if (newVal > 0) {
    setTimeout(() => {
      phonePasteAttempts.value = 0;
    }, 3000);
  }
});

watch(namePasteAttempts, (newVal) => {
  if (newVal > 0) {
    setTimeout(() => {
      namePasteAttempts.value = 0;
    }, 3000);
  }
});

onMounted(() => {
  setupGlobalProtection();
  
  // Настройка полей для отключения автозаполнения
  if (phoneInputRef.value) {
    phoneInputRef.value.setAttribute('autocomplete', 'new-tel');
    phoneInputRef.value.setAttribute('autocorrect', 'off');
    phoneInputRef.value.setAttribute('autocapitalize', 'off');
    phoneInputRef.value.setAttribute('spellcheck', 'false');
    phoneInputRef.value.setAttribute('data-lpignore', 'true');
    phoneInputRef.value.setAttribute('data-form-type', 'other');
  }
  
  if (nameInputRef.value) {
    nameInputRef.value.setAttribute('autocomplete', 'new-name');
    nameInputRef.value.setAttribute('autocorrect', 'off');
    nameInputRef.value.setAttribute('autocapitalize', 'off');
    nameInputRef.value.setAttribute('spellcheck', 'false');
    nameInputRef.value.setAttribute('data-lpignore', 'true');
    nameInputRef.value.setAttribute('data-form-type', 'other');
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeyDown);
  document.removeEventListener('contextmenu', handleGlobalContextMenu);
});
function percentListOutput(value) {
    carInitialFee.value = value
}

function timeListOutput(value) {
    if (value == 0) {
        timeListOutputData.value = 0.5 * 12
    } else {
        timeListOutputData.value = value * 12
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
        monthlyPayment: `${monthlyPayment.value} руб/мес платеж`,
    app: valueApp.value
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
            <input type="text" name="fake-username" autocomplete="username" style="display: none;" />
            <input type="password" name="fake-password" autocomplete="new-password" style="display: none;" />
            
            <div class="base-input name-input">
                <div class="input-wrapper">
                    <input 
                    ref="nameInputRef"
                    :id="nameFieldName"
                    :name="nameFieldName"
                    :class="{ 'is-invalid': nameError, 'paste-blocked': showNamePasteWarning }" 
                    type="text" 
                    placeholder="Имя" 
                    v-model="nameValue"
                    autocomplete="off"
                    v-maska="name" 
                    class="form-input"
                    @paste="handleNamePaste"
                    @copy="handleNameCopy"
                    @cut="handleNameCut"
                    @keydown="handleNameKeyDown"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    data-lpignore="true"
                    />
                    
                    <!-- Индикатор блокировки вставки для имени -->
                    <transition name="fade">
                        <div 
                            v-if="showNamePasteWarning" 
                            class="paste-warning" 
                            :class="{ 'show': showNamePasteWarning }"
                        >
                            <i class="fa-solid fa-ban"></i>
                            <span class="warning-text">
                                {{ namePasteAttempts > 1 ? 'Вставка отключена' : '' }}
                            </span>
                        </div>
                    </transition>
                </div>
            </div>

            <div class="base-input phone-input">
                <div class="input-wrapper">
                    <input 
                    ref="phoneInputRef"
                    :id="phoneFieldName"
                    :name="phoneFieldName"
                    :class="{ 'is-invalid': phoneError, 'paste-blocked': showPhonePasteWarning }" 
                    type="tel" 
                    placeholder="+7 (___) ___-__-__"
                    autocomplete="off" 
                    v-maska="options" 
                    v-model="phoneValue" 
                    class="form-input"
                    @paste="handlePhonePaste"
                    @copy="handlePhoneCopy"
                    @cut="handlePhoneCut"
                    @keydown="handlePhoneKeyDown"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    data-lpignore="true"
                    />
                    
                    <!-- Индикатор ошибки телефона -->
                    <span class="error-icon" v-show="phoneError">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </span>
                    
                    <!-- Индикатор блокировки вставки для телефона -->
                    <transition name="fade">
                        <div 
                            v-if="showPhonePasteWarning" 
                            class="paste-warning" 
                            :class="{ 'show': showPhonePasteWarning }"
                        >
                            <i class="fa-solid fa-ban"></i>
                            <span class="warning-text">
                                {{ phonePasteAttempts > 1 ? 'Вставка отключена' : '' }}
                            </span>
                        </div>
                    </transition>
                </div>
            </div>
            <input type="text" name="app" id="" class="app__input" v-model="valueApp">
            <FormPieceCheck @formChecked="returnEmit" :appType="2" />

            <BaseFormButton :title="'Оставить заявку'" :label="'Оставить заявку'"
                :disabled="!formChecked || Boolean(!(creditStore.carNew))" :loading="!appStore.formLoading"
                class="form__form-submit" />
        </div>
    </form>
</template>

<style scoped lang="scss">
.base-input {
    position: relative;
    height: 50px;
    width: 100%;
    
    .input-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .form-input {
        width: 100%;
        height: 100%;
        padding: 15px 15px;
        border: 1px solid #ddd;
        border-radius: 12px;
        font-size: 16px;
        box-sizing: border-box;
        
        &.paste-blocked {
            animation: shake 0.5s ease;
            border-color: #ff6b6b !important;
            padding-right: 130px; /* Место для иконки предупреждения */
        }
        
        &.shortcut-blocked {
            animation: pulse 0.3s ease;
            border-color: #ffa94d !important;
        }
        
        &.is-invalid {
            border-color: #ff4444 !important;
            background-color: rgba(255, 68, 68, 0.05) !important;
            
            &:focus {
                box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.2) !important;
            }
        }
        
        &:focus {
            outline: none;
            border-color: var(--main-color);
        }
    }
    
    .error-icon {
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
        color: #ff4444;
        z-index: 11;
    }
    
    .paste-warning {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
        padding: 4px 8px;
        border-radius: 4px;
        pointer-events: none;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        
        &.show {
            opacity: 1;
            transform: translateY(-50%) translateX(0);
        }
        
        i {
            font-size: 14px;
        }
        
        .warning-text {
            white-space: nowrap;
            font-weight: 500;
        }
    }
    
    &.phone-input .form-input.paste-blocked,
    &.name-input .form-input.paste-blocked {
        padding-right: 130px;
    }
}

/* Анимации */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
    20%, 40%, 60%, 80% { transform: translateX(3px); }
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.01); }
    100% { transform: scale(1); }
}

/* Анимация появления для transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Адаптивность */
@media (max-width: 768px) {
    .base-input {
        .paste-warning {
            .warning-text {
                display: none;
            }
            
            &.show {
                padding: 4px;
            }
        }
        
        .form-input.paste-blocked {
            padding-right: 40px;
        }
    }
}

@media (max-width: 540px) {
    .form__form-content .form__form-block {
        gap: 8px;
    }
}


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