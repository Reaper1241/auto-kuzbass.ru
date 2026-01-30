<script setup>
import { options, name } from "@/constants/";
import { vMaska } from "maska/vue"
import { useAppStore } from '/stores/AppStore.js';
import { useNewStore } from '/stores/NewStore.js';
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
const appStore = useAppStore();
const newStore = useNewStore();

const props = defineProps({
    model: {
        type: Object,
        default: {}
    },
    modification: {
        type: Object,
        default: {}
    },
    category: {
        type: String,
    }
});
const valueApp = ref('')
const formChecked = ref(true);
const nameValue = ref('');
const phoneValue = ref('');

const phonePasteAttempts = ref(0);
const namePasteAttempts = ref(0);
const phoneInputRef = ref(null);
const nameInputRef = ref(null);

// Генерация уникальных имен для полей
const phoneFieldName = ref(`phone-${Math.random().toString(36).substr(2, 9)}`);
const nameFieldName = ref(`name-${Math.random().toString(36).substr(2, 9)}`);

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
const validateForm = () => {
    const clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

    const formValues = {
        phone: clearPhone,
        name: nameValue.value,
        fee: `${(currentComplectation.value.price - modelSale.value) * fee.value / 100} руб перв. взнос`,
        timeListOutputData: `${timeListOutputData.value} срок кредитования (мес.)`,
        monthlyPayment: `${monthlyPayment.value} мес.платеж`,
        modification: `${props.modification.modification} ${currentComplectation.value.complectation}`,
        app: valueApp.value
    }

    const appType = 2
    const categoty = props.category
    const car = {
        brand: props.model.brand,
        model: props.model.model,
        min_price: currentComplectation.value.price - modelSale.value
    }

    if (clearPhone.length == 11) {
        postForm(formValues, appType, car, categoty);
    }
};

function returnEmit(value) {
    formChecked.value = value
}

watch(() => props.modification, () => {
    selectedComplectationId.value = props.modification.car_complectations[0].id;
}, { deep: true })

const modelSale = computed(() => props.model.sale);
const selectedComplectationId = ref(props.modification.car_complectations?.[0].id);

// Добавляем сортировку комплектаций по цене
const sortedComplectations = computed(() => {
    if (!props.modification?.car_complectations) return [];
    return [...props.modification.car_complectations].sort((a, b) => a.price - b.price);
});

// Используем отсортированный массив для поиска текущей комплектации
const currentComplectation = computed(() => sortedComplectations.value.find(item => item.id == selectedComplectationId.value));

const modList = computed(() => newStore.model.modifications?.filter((mod) => mod.car_complectations.length))

const fee = ref(0);
const timeListOutputData = ref(0);

let monthlyPayment = computed(() => {
    let i = (appStore.creditPercent / 12) / 100;
    let k = ((currentComplectation.value.price - modelSale.value) - (((currentComplectation.value.price - modelSale.value) * fee.value) / 100));
    let num = (i * (1 + i) ** timeListOutputData.value) / (((i + 1) ** timeListOutputData.value) - 1);
    let numb = (k * num);

    return Math.floor(numb)
})

function timeListOutput(value) {
    if (value == 0) {
        timeListOutputData.value = 0.5 * 12
    } else {
        timeListOutputData.value = value * 12
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
</script>

<template>
    <div class="model-credit__form" v-if="modification?.car_complectations?.length">
        <div class="form__block">
            <div class="model-card__mod-choice" v-if="modList.length > 1">
                <span class="title">Выбранная модификация:</span>
                <label class="model-card__mod-select">
                    <select v-model="newStore.modification">
                        <option v-for="(option, index) in modList" :key="option.id" :value="option.id">
                            {{ option.modification }}
                        </option>
                    </select>
                </label>
            </div>

            <div class="form__complection-select">
                Выбранная комплектация:
                <ul class="form__complection-list">
                    <li class="form__complection-item" 
                        v-for="item in sortedComplectations" 
                        :key="item.id"
                        @click="selectedComplectationId = item.id"
                        :class="{ 'active': selectedComplectationId == item.id }">
                        <span class="text">
                            {{ item.complectation }}
                        </span>
                        <span class="price">
                            {{ makeSpaces(item.price) }}₽
                        </span>
                    </li>
                </ul>
            </div>
            <div class="form__block row">
                <div class="form__form-item">
                    <span class="text">Стоимость авто (с учетом скидки):</span>
                    <span class="money">{{ makeSpaces(currentComplectation.price - modelSale) }} ₽</span>
                </div>
                <div class="form__form-item">
                    <span class="text">Ежемесячный платеж:</span>
                    <span class="money">
                        {{ makeSpaces(monthlyPayment) }} ₽/мес.
                    </span>
                </div>
            </div>
        </div>
        <div class="form__block range">
            <BaseRangeTime @timeListOutput="timeListOutput" />
            <BaseRangePercent :min="0" :max="80" :step="5" :carPrice="currentComplectation.price - modelSale"
                @percentListOutput="fee = $event" />
        </div>

        <div class="form__block">
            <form class="form__form-content" @submit.prevent="validateForm">
                <input type="text" name="fake-username" autocomplete="username" style="display: none;" />
                <input type="password" name="fake-password" autocomplete="new-password" style="display: none;" />
                
                <div class="base-input name-input">
                    <div class="input-wrapper">
                        <input 
                        ref="nameInputRef"
                        :id="nameFieldName"
                        :name="nameFieldName"
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
                <FormPieceCheck @formChecked="returnEmit" />
                <BaseFormButton :title="'Оставить заявку'" :label="'Оставить заявку'" :disabled="!formChecked"
                    :loading="!appStore.formLoading" />
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
        border: 2px solid var(--main-color);
        border-radius: 50px;
        font-size: 16px;
        box-sizing: border-box;
        transition: all 0.3s ease;
        background: white;
        color: var(--main-color);
        font-weight: 700;
        
        &.paste-blocked {
            animation: shake 0.5s ease;
            border-color: #ff6b6b !important;
            padding-right: 120px;
        }
        
        &.shortcut-blocked {
            animation: pulse 0.3s ease;
            border-color: #ffa94d !important;
        }
        
        &:focus {
            outline: none;
            border-color: var(--main-color);
        }
        
        @media screen and (max-width: 768px) {
            background: var(--main-color);
            border: 2px solid white;
            color: white;
            
            &::placeholder {
                color: white;
                opacity: 1;
            }
        }
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
        
        @media screen and (max-width: 768px) {
            padding-right: 40px !important;
        }
    }
}

.model-credit__form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    
    .form__block {
        display: flex;
        flex-direction: column;
        
        gap: 0px;
        @media screen and (max-width: 768px){
            // width: 100%;
            // padding-right: 20px;
        }
    }

    .form__block.range {
        gap: 15px;
    }

    .form__block.row {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .form__form-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .form__form-item {
        display: flex;
        gap: 10px;
        background: white;
        padding: 10px 15px;
        // border-radius: var(--border-small-radius);
        // border: var(--border);

        .money {
            font-weight: bold;
            color: var(--main-color);
            margin-left: auto; // добавлено
        }

        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 5px;

            .money {
                margin-left: 0; // убираем auto для мобильных, чтобы всё было по одной оси
            }
        }
    }

    .form__complection-item {
        padding: 10px;
        border: 1px solid var(--secondary-color);
        border-radius: 20px;
        width: fit-content;
    }

    .form__complection-select {
        padding: 15px 0;
        // border: var(--border);
        // border-radius: var(--border-small-radius);
        background: white;
        .form__complection-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* Исправлено - правильно задаем 2 колонки */
            gap: 5px;
            margin-top: 5px;
            width: 100%;
            align-items: center;
            
            .form__complection-item {
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                border: 1px solid #9F9F9F;
                display: flex;
                gap: 15px;
                width: 100%;
                color: #9F9F9F;
                align-items: center;
                
                &.active {
                    border: 1px solid var(--main-color);
                    color: var(--main-color);
                }
                
                @media screen and (max-width: 540px) {
                    padding: 5px 10px;
                    gap: 5px;

                    span {
                        font-size: 10px;
                    }
                }
            }
        }
    }
}

.form__complection-item.active {
    
    color: var(--main-color);
}

.model-card__mod-choice {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .model-card__mod-select {
        flex-grow: 1;
        position: relative;

        .filter__body-select-reset {
            position: absolute;
            right: 40px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            border-radius: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            align-self: center;
            color: var(--main-black);

            i {
                height: 100%;
            }
        }

        .filter__body-select-reset[disabled] {
            display: none;
        }

        &:after {
            content: "\f107";
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            pointer-events: none;
            background: var(--main-black);
            color: white;
            padding: 3px 4px;
            border-radius: 100%;
            text-align: center;
        }

        @media screen and (max-width: 500px) {
            grid-column-start: 1;
        }

        select {
            background: white;
            min-width: 210px;
            width: 100%;
            padding: 15px 15px;
            color: var(--main-color);
            border-radius: 50px;
            font-weight: 700;
            border: 2px solid var(--main-color);

            option {
                padding: 5px;
            }
        }

        select.active {
            font-weight: bold;
        }
    }

    .model-card__mod-subtitle {
        margin-bottom: 10px;
    }
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
    .base-input {
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