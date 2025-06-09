<script setup>
import Input from '@/components/Base/Input.vue';
import { options, name, errors } from "@/constants/";

const props = defineProps({
    car: {
        type: Object,
        default: null,
    }
})

const formFields = shallowRef([
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше имя', modelValue: '', class: 'form-input', type: 'text', maska: name } },
]);

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>
    <BaseForm :fields="formFields" class="contact__form-form" :submit-text="`Получить скидку`" :app-type="9"
        @submit="handleFormSubmit" :car="car" />
</template>

<style scoped lang="scss">
.form-sale {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .form-sale__button {
        padding: 12px 20px;
        border-radius: 20px;
        background: var(--main-color);
        color: white;
        font-weight: bold;
    }

    .form-sale__input {
        padding: 15px;
        background: white;
        border-radius: 20px;
    }
}
</style>