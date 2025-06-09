<script setup>
import Input from '@/components/Base/Input.vue';
import { options, name, errors } from "@/constants/";
import FormTitle from '@/components/Base/FormTitle.vue';

import { useRoute } from 'vue-router';
const $route = useRoute();

const props = defineProps({
    appType: {
        type: Number,
        default: 3,
    },
    car: {
        type: Object,
        default: null,
    }
});

const emits = defineEmits(['formSend']);

const formFields = shallowRef([
    { component: FormTitle, bindings: { title: `Лучшее предложение на покупку нового ${cleanUpTitle($route.params.brand, $route.params.model)}` } },
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше имя', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);

const handleFormSubmit = (formData) => {
};
</script>

<template>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" :submit-text="`Отправить заявку`" :appType="appType"
        class="form-comp" category="new" :car="car" />
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .main__form-input {
        background: #fff;
        border-radius: 20px;
        padding: 15px;
        width: 100%;
    }

    .main__form-btn {
        text-align: center;
        border: 3px solid var(--main-color);
        background: var(--main-color);
        color: var(--bg-light);
        padding: 15px;
        font-size: 18px;
        transition: .3s;
        font-weight: 700;
        border-radius: 20px;
    }
}
</style>