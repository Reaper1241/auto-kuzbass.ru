<script setup>
import Input from '@/components/Base/Input.vue';
import Textarea from '@/components/Base/Textarea.vue';

import { options, name, errors } from "@/constants/";

const formFields = shallowRef([
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше имя', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { name: 'message', component: Textarea, bindings: { label: 'Bio', placeholder: 'Сообщение', modelValue: '' } },
]);

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" class="contact__form-form"
        :submit-text="`Оставить заявку`" :appType="9" />
</template>

<style scoped lang="scss">
.contact__form-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px 0;

    @media screen and (max-width: 560px) {
        display: flex;
        flex-direction: column;
    }

    .contact__form-submit {
        background: var(--main-color);
        padding: 15px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
    }
}
</style>