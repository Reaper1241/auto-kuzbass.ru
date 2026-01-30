<script setup>
import { vMaska } from "maska/vue"
import { errors } from "~/constants";
import { ref, onMounted, onUnmounted, computed, watch } from "vue"
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String,
        default: '',
    },
    maska: {
        type: Object,
        default: {},
    },
    className: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
    allowPaste: {
        type: Boolean,
        default: false,
    },
    allowCopy: {
        type: Boolean,
        default: false,
    },
    allowAutocomplete: {
        type: Boolean,
        default: false,
    },
    customName: {
        type: String,
        default: '',
    }
});

const showError = ref(false);
const emit = defineEmits(['update:modelValue', 'paste-blocked', 'copy-blocked']);

// Генерируем уникальное имя для поля
const uniqueId = ref(Math.random().toString(36).substr(2, 9));
const inputRef = ref(null);
const lastPasteTime = ref(0);
const isUserTyping = ref(false);
const pasteAttempts = ref(0);

// Динамическое имя поля для обхода автозаполнения
const fieldName = computed(() => {
    return props.customName || `field-${uniqueId.value}`;
});

// Вычисляемое свойство для отображения предупреждения
const showPasteWarning = computed(() => {
    return !props.allowPaste && pasteAttempts.value > 0;
});

// Вычисляемое свойство для показа текста
const showWarningText = computed(() => {
    return pasteAttempts.value >= 2; // Показываем текст только со 2-й попытки
});

// Вычисляемое свойство для показа иконки
const showWarningIcon = computed(() => {
    return pasteAttempts.value >= 1; // Иконка показывается с 1-й попытки
});

// Таймер для сброса счетчика
let resetTimer = null;

function handleMaska(event) {
    emit('update:modelValue', event.target.value);
}

function handlePaste(event) {
    if (!props.allowPaste) {
        event.preventDefault();
        pasteAttempts.value++;
        
        console.log(`Paste blocked! Attempts: ${pasteAttempts.value}`);
        
        // Уведомляем родительский компонент
        emit('paste-blocked', {
            timestamp: Date.now(),
            attempts: pasteAttempts.value,
            clipboardData: event.clipboardData?.getData('text')
        });
        
        // Показываем визуальную обратную связь
        if (inputRef.value) {
            inputRef.value.classList.add('paste-blocked');
            setTimeout(() => {
                inputRef.value?.classList.remove('paste-blocked');
            }, 500);
        }
        
        // Сбрасываем таймер
        if (resetTimer) {
            clearTimeout(resetTimer);
        }
        
        // Устанавливаем новый таймер для сброса счетчика через 3 секунды
        resetTimer = setTimeout(() => {
            pasteAttempts.value = 0;
        }, 3000);
        
        return false;
    }
}

function handleCopy(event) {
    if (!props.allowCopy) {
        event.preventDefault();
        emit('copy-blocked');
        return false;
    }
}

function handleCut(event) {
    if (!props.allowCopy) {
        event.preventDefault();
        return false;
    }
}

// Обработчик ввода с защитой от автозаполнения
function handleInput(event) {
    // Защита от быстрого автоматического заполнения
    const now = Date.now();
    if (now - lastPasteTime.value < 100 && !isUserTyping.value) {
        // Возможно, это автозаполнение - сбрасываем значение
        emit('update:modelValue', '');
        return;
    }
    
    emit('update:modelValue', event.target.value);
}

// Обработчик клавиш для блокировки Ctrl+V, Ctrl+Shift+V и т.д.
function handleKeyDown(event) {
    if (props.allowPaste) return;
    
    // Проверяем сочетания клавиш
    const isPasteCombo = 
        (event.ctrlKey || event.metaKey) && 
        event.key.toLowerCase() === 'v';
    
    const isCopyCombo = 
        (event.ctrlKey || event.metaKey) && 
        ['c', 'x'].includes(event.key.toLowerCase());
    
    if (isPasteCombo || isCopyCombo) {
        event.preventDefault();
        
        // Визуальная обратная связь
        if (inputRef.value) {
            inputRef.value.classList.add('shortcut-blocked');
            setTimeout(() => {
                inputRef.value?.classList.remove('shortcut-blocked');
            }, 300);
        }
    }
}

// Отслеживаем пользовательский ввод
function onFocus() {
    isUserTyping.value = true;
    
    // Если значение похоже на автозаполненное, предлагаем очистить
    if (props.modelValue && !props.allowAutocomplete) {
        const isLikelyAutofilled = 
            props.modelValue.includes('@') && props.type === 'email' ||
            props.modelValue.length > 20 && props.type === 'text';
        
        if (isLikelyAutofilled) {
            // Можно добавить кнопку очистки или автоматически очищать
            console.log('Обнаружено возможное автозаполнение');
        }
    }
}

function onBlur() {
    isUserTyping.value = false;
}

// Глобальный обработчик для блокировки вставки через контекстное меню
function handleGlobalKeyDown(event) {
    if (!inputRef.value || !inputRef.value.contains(document.activeElement)) return;
    
    // Блокируем Shift+Insert (альтернативная вставка)
    if (event.shiftKey && event.key === 'Insert') {
        event.preventDefault();
    }
}

// Контекстное меню (правый клик)
function handleContextMenu(event) {
    if (!props.allowPaste || !props.allowCopy) {
        event.preventDefault();
        return false;
    }
}

onMounted(() => {
    if (inputRef.value && !props.allowAutocomplete) {
        // Устанавливаем специальные атрибуты для обхода автозаполнения браузеров
        inputRef.value.setAttribute('autocomplete', 'new-password');
        inputRef.value.setAttribute('autocorrect', 'off');
        inputRef.value.setAttribute('autocapitalize', 'off');
        inputRef.value.setAttribute('spellcheck', 'false');
        inputRef.value.setAttribute('inputmode', props.type === 'tel' ? 'tel' : 'text');
        
        // Для дополнительной защиты от менеджеров паролей
        inputRef.value.setAttribute('data-lpignore', 'true');
        inputRef.value.setAttribute('data-form-type', 'other');
        
        // Изменяем type через setTimeout для обхода оптимизаций браузеров
        if (props.type === 'password') {
            setTimeout(() => {
                if (inputRef.value) {
                    // Временное изменение типа может помочь
                    inputRef.value.type = 'text';
                    setTimeout(() => {
                        if (inputRef.value) {
                            inputRef.value.type = 'password';
                        }
                    }, 100);
                }
            }, 100);
        }
    }
    
    // Добавляем глобальный обработчик для дополнительной защиты
    document.addEventListener('keydown', handleGlobalKeyDown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleGlobalKeyDown);
    if (resetTimer) {
        clearTimeout(resetTimer);
    }
});

watch(() => props.error, (newError) => {
    if (newError) {
        showError.value = true;
    }
});
console.log(pasteAttempts);
</script>

<template>
    <div class="base-input" :class="{ 'has-error': showError, 'paste-disabled': !allowPaste }">
        <!-- Скрытое поле-обманка для менеджеров паролей -->
        <input 
            v-if="!allowAutocomplete && (type === 'password' || type === 'email')"
            type="password" 
            name="fake-password" 
            autocomplete="new-password"
            style="display: none; opacity: 0; position: absolute; left: -9999px;"
            tabindex="-1"
        />
        
        <div class="input-wrapper">
            <input 
                ref="inputRef"
                :id="fieldName"
                :name="fieldName"
                :value="modelValue" 
                :class="[className, { 'paste-blocked': !allowPaste && pasteAttempts > 0 }]" 
                @input="handleInput"
                @keydown="handleKeyDown"
                @focus="onFocus"
                @blur="onBlur"
                @contextmenu="handleContextMenu"
                :type="type"
                :placeholder="placeholder" 
                :required="required" 
                :disabled="disabled" 
                v-maska="maska" 
                @maska="handleMaska"
                :autocomplete="allowAutocomplete ? 'on' : 'off'"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                @paste="handlePaste"
                @copy="handleCopy"
                @cut="handleCut"
                :data-allow-paste="allowPaste"
                :data-allow-copy="allowCopy"
            />
            
            <!-- Индикатор блокировки вставки -->
            <transition name="fade">
                <div 
                    v-if="showPasteWarning" 
                    class="paste-warning" 
                    :class="{ 
                        'show': showPasteWarning,
                        'has-text': showWarningText,
                        'icon-only': !showWarningText && showWarningIcon
                    }"
                >
                    <i v-if="showWarningIcon" class="fa-solid fa-ban"></i>
                    <span v-if="showWarningText" class="warning-text">
                        Вставка отключена
                    </span>
                </div>
            </transition>
            
            <span v-if="showError" class="error-icon" aria-label="Ошибка">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.base-input {
    position: relative;

    width: 100%;
    
    &.paste-disabled {
        position: relative;
    }
    .input-wrapper {
        position: relative;
        width: 100%;
    }
    
    input {
        width: 100%;
        box-sizing: border-box;
        transition: all 0.3s ease;
        
        &.paste-blocked {
            animation: shake 0.5s ease;
            border-color: #ff6b6b !important;
            padding-right: 120px; /* Добавляем место для иконки */
        }
        
        &.shortcut-blocked {
            animation: pulse 0.3s ease;
            border-color: #ffa94d !important;
        }
    }

    .paste-warning  {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: red;
        height: 100%;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-top-right-radius: var(--border-small-radius);
        border-bottom-right-radius: var(--border-small-radius);

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

    .error-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: red;
        z-index: 11; /* Выше чем paste-warning */
    }
    
    // Анимация появления
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
        
        input.paste-blocked {
            padding-right: 40px;
        }
    }
}
.base-input input {
    transition: padding-right 0.3s ease;
    
    &.paste-blocked {
        &:not(.no-text) {
            padding-right: 120px;
        }
        
        &.no-text {
            padding-right: 40px;
        }
    }
}
</style>