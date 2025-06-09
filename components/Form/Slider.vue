<script setup>
import Input from '@/components/Base/Input.vue';

import { options, errors } from "@/constants/";

const formFields = shallowRef([
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>
    <BaseForm :fields="formFields" class="slider__form" :submit-text="`Оставить заявку`" :app-type="9"
        @submit="handleFormSubmit" />
</template>

<style scoped lang="scss"></style>