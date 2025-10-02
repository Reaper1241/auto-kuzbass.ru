<script setup>
import Input from '@/components/Base/Input.vue';
import { options, name, errors } from "@/constants/";
import { useNewStore } from '/stores/NewStore.js';
import { useAppStore } from '/stores/AppStore.js';

const newStore = useNewStore();
const appStore = useAppStore();

const formFields = shallowRef([
    { 
        name: 'name', 
        component: Input, 
        bindings: { 
            label: 'ФИО', 
            placeholder: 'Ваше имя', 
            modelValue: '', 
            class: 'form-input', 
            type: 'text', 
            maska: name,
        } 
    },
    { 
        name: 'phone', 
        component: Input, 
        validation: (value) => validatePhone(value) ? null : errors.phone, 
        bindings: { 
            label: 'Номер телефона', 
            placeholder: '+7 (___) ___-__-__', 
            modelValue: '', 
            class: 'form-input', 
            type: 'tel', 
            maska: options,
        } 
    },
]);

// Создаем упрощенный объект car только с нужными полями
const car = computed(() => {
  // Сначала пробуем взять из текущей модели
  if (newStore.model) {
    return {
      brand: newStore.model.brand,
      model: newStore.model.name || newStore.model.model,
      price: newStore.model.min_price
    };
  }
  
  // Если нет текущей модели, берем из первой модели в списке
  if (newStore.models && newStore.models.length > 0) {
    return {
      brand: newStore.brand?.brand,
      model: newStore.models[0].name || newStore.models[0].model,
      price: newStore.models[0].min_price
    };
  }
  
  return null;
});

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>
    <BaseForm 
        :fields="formFields" 
        @submit="handleFormSubmit" 
        :submit-text="`Оставить заявку`" 
        :appType="9"
        :car="car" 
    />
</template>
<style scoped lang="scss">
.contact__form-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px 0;
    z-index:1000;
    
    @media screen and (max-width: 767px) {
        display: flex;
        flex-direction: column;
    }

    .contact__form-submit {
        background: var(--main-color);
        padding: 15px;
        border-radius: 4px;
        color: black;
        font-weight: bold;
    }
}

// Добавляем стили для черного текста в инпутах
:deep(.form-input) {
    color: black !important;
    border: 1px solid #ccc !important; // <-- серый бордер

    &::placeholder {
        color: black !important;
        opacity: 0.8 !important;
    }
}

.column {
    grid-template-columns: 1fr;
    gap: 15px;
}

.base-form.express__form {
    align-items: start;
    display: flex;
    gap: 10px;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
}

.base-form.brand__form {
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 10px;
    
}

.base-form.brand__form {
    width: 100%;
}



</style>

<style lang="scss">
.brand__form {
    .base-button.base-submit {
        @media screen and (max-width: 767px) {
            background: var(--main-color);
            border-color: var(--main-color);
            color: white;
        }
    }

    .base-input {
        color: black;
        border: 1px solid black !important;
        .form-input {
            color: black !important; // Добавляем черный цвет
            
            @media screen and (max-width: 767px) {
                background: transparent;
                color: black !important;

                &::placeholder {
                    color: black !important;
                }

                &::placeholder-shown {
                    color: black !important;
                }
            }
        }
    }
}

.taxi__form-banner {
    display: flex;
    flex-direction: column;
    
    .base-button.base-submit {
        background: #FFCC00;
        border-color: #FFCC00;
        color: black;
    }
}
</style>