<script setup>
import Input from '@/components/Base/Input.vue';
import FormTitle from '@/components/Base/FormTitle.vue';

import { options, name, errors } from "@/constants/";

const formFields = shallowRef([
    { component: FormTitle, bindings: { title: 'Данные вашего автомобиля' } },
    { name: 'brand', component: Input, bindings: { label: 'Марка', placeholder: 'Марка', modelValue: '', class: 'form-input', type: 'text' } },
    { name: 'model', component: Input, bindings: { label: 'Модель', placeholder: 'Модель', modelValue: '', class: 'form-input', type: 'text' } },
    { name: 'year', component: Input, bindings: { label: 'Год', placeholder: 'Год', modelValue: '', class: 'form-input', type: 'text' } },
    { component: FormTitle, bindings: { title: 'Ваши данные' } },
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше имя', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);


const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" :submit-text="`Оставить заявку`" :appType="8" />
</template>

<style scoped lang="scss"></style>