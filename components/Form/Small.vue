<script setup>
import Input from '@/components/Base/Input.vue';
import FormTitle from '@/components/Base/FormTitle.vue';
import { options, errors } from "@/constants/";

const formFields = shallowRef([
    { component: FormTitle, bindings: { title: 'Заказать обратный звонок' } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" :submit-text="`Оставить заявку`" :appType="9"
        class="small" />
</template>

<style scoped lang="scss">
.small {
    display: flex;
    flex-direction: column;
    align-items: normal;
    gap: 10px;
    background: white;
    border-radius: 20px;
    align-items: center;
    margin-top: 20px;
    
    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: normal;
    }
}
</style>