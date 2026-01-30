<script setup>
import { options, name, numberMask } from "@/constants/";

import { vMaska } from "maska/vue"

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
const emits = defineEmits(['showCar']);
const valueApp = ref('')
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
const phonePasteAttempts = ref(0)
const phoneInputRef = ref(null)
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
        year: yearValue.value,
        app: valueApp.value
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
const namePasteAttempts = ref(0)
const nameInputRef = ref(null)

// Генерация уникальных имен для полей
const phoneFieldName = ref(`phone-${Math.random().toString(36).substr(2, 9)}`)
const nameFieldName = ref(`name-${Math.random().toString(36).substr(2, 9)}`)

// Вычисляемые свойства для показа предупреждений
const showPhonePasteWarning = computed(() => {
    return phonePasteAttempts.value > 0;
});

const showNamePasteWarning = computed(() => {
    return namePasteAttempts.value > 0;
});

const showPhoneWarningText = computed(() => {
    return phonePasteAttempts.value >= 2;
});

const showNameWarningText = computed(() => {
    return namePasteAttempts.value >= 2;
});

// Таймеры для сброса счетчиков
let phoneResetTimer = null;
let nameResetTimer = null;

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
  
  // Сбрасываем таймер
  if (phoneResetTimer) {
    clearTimeout(phoneResetTimer);
  }
  
  // Устанавливаем новый таймер для сброса счетчика через 3 секунды
  phoneResetTimer = setTimeout(() => {
    phonePasteAttempts.value = 0;
  }, 3000);
  
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
  
  // Сбрасываем таймер
  if (nameResetTimer) {
    clearTimeout(nameResetTimer);
  }
  
  // Устанавливаем новый таймер для сброса счетчика через 3 секунды
  nameResetTimer = setTimeout(() => {
    namePasteAttempts.value = 0;
  }, 3000);
  
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
  
  if (phoneResetTimer) clearTimeout(phoneResetTimer);
  if (nameResetTimer) clearTimeout(nameResetTimer);
});
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
                        <h2 class="form__steps-title">Данные вашего авто</h2>
                        <div class="form__steps">
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
                                                    :class="{ 
                                                        'show': showNamePasteWarning,
                                                        'has-text': showNameWarningText,
                                                        'icon-only': !showNameWarningText && showNamePasteWarning
                                                    }"
                                                >
                                                    <i v-if="showNamePasteWarning" class="fa-solid fa-ban"></i>
                                                    <span v-if="showNameWarningText" class="warning-text">
                                                        Вставка отключена
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
                                                    :class="{ 
                                                        'show': showPhonePasteWarning,
                                                        'has-text': showPhoneWarningText,
                                                        'icon-only': !showPhoneWarningText && showPhonePasteWarning
                                                    }"
                                                >
                                                    <i v-if="showPhonePasteWarning" class="fa-solid fa-ban"></i>
                                                    <span v-if="showPhoneWarningText" class="warning-text">
                                                        Вставка отключена
                                                    </span>
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                    <input type="text" name="app" id="" class="app__input" v-model="valueApp">
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
                    <div class="page__text-content" v-htmlSanitizer="appStore?.newSeo[$route.name]?.text_content ? removeTrash(appStore.newSeo[$route.name].text_content) : null"></div>  
                    <!-- <div class="page__text-content">
                        <h2>
                Обменяйте старое авто на новое — быстро и выгодно с «CARPLAZA»!
            </h2>
            <p class="chapter">
               Трейд-ин в нашем автосалоне — это идеальный вариант для тех, кто ценит своё время и хочет без лишних хлопот пересесть на новый автомобиль. 

Забудьте о сложностях самостоятельной продажи — мы оценим ваш автомобиль по рыночной стоимости, оформим все документы и предложим лучшие условия на покупку нового авто. 
Вся процедура занимает минимум времени — вы можете уехать на новой машине уже в день обращения! 
            </p>
        </div>
        
        <div class="content__text content__section">
            <div class="chapter">
                <h2>Почему выбирают трейд-ин в «CARPLAZA»: 

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
Оставьте заявку на auto-kuzbass.ru и сделайте шаг к новому автомобилю уже сегодня! 
«CARPLAZA» — меняем старое на лучшее! 
</p>
            </div>
                    </div>  -->
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
                                    padding: 0 15px;
                                    border: 1px solid #ddd;
                                    border-radius: 12px;
                                    font-size: 16px;
                                    box-sizing: border-box;
                                    transition: all 0.3s ease;
                                    
                                    &.paste-blocked {
                                        animation: shake 0.5s ease;
                                        border-color: #ff6b6b !important;
                                        padding-right: 120px;
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
                                    transition: all 0.3s ease;
                                    
                                    &.show {
                                        opacity: 1;
                                        transform: translateY(-50%) translateX(0);
                                    }
                                    
                                    &.icon-only {
                                        padding: 4px;
                                        
                                        i {
                                            margin: 0;
                                        }
                                    }
                                    
                                    &.has-text {
                                        padding: 4px 8px;
                                        background: rgba(255, 107, 107, 0.15);
                                    }
                                    
                                    i {
                                        font-size: 14px;
                                        transition: transform 0.3s ease;
                                    }
                                    
                                    .warning-text {
                                        white-space: nowrap;
                                        font-weight: 500;
                                        font-size: 11px;
                                        letter-spacing: 0.2px;
                                    }
                                }
                                
                                &.phone-input .form-input.paste-blocked,
                                &.name-input .form-input.paste-blocked {
                                    padding-right: 120px;
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

// Анимация для иконки
@keyframes icon-bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

.base-input .paste-warning.show.icon-only i {
    animation: icon-bounce 0.3s ease;
}

/* Адаптивность */
@media (max-width: 768px) {
    .form__form-block .base-input {
        .paste-warning {
            .warning-text {
                display: none;
            }
            
            &.has-text {
                padding: 4px;
                
                .warning-text {
                    display: inline;
                    font-size: 10px;
                }
            }
            
            &.show {
                padding: 4px;
            }
        }
        
        .form-input.paste-blocked {
            padding-right: 40px !important;
        }
    }
}

// Анимация появления для transition
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-50%) translateX(10px);
}

// Анимация для иконки при первой попытке
.fade-enter-from.icon-only {
    transform: translateY(-50%) scale(0.8);
}
</style>