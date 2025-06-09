<script setup>
import Input from '@/components/Base/Input.vue';
import { options, name, errors } from "@/constants/";
import CreditBlock from '@/components/Base/CreditBlock.vue';

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const props = defineProps({
    appType: {
        type: Number,
        default: 3,
    },
    car: {
        type: Object,
        default: null,
    },
    category: {
        type: String,
        default: '',
    }
});

const emits = defineEmits(['formSend']);

const formFields = shallowRef([
    {
        name: 'credit', component: CreditBlock, bindings: {
            car: props.car, id: 'modal-credit',
            modelValue: {
                RangeTime: null,
                RangePercent: null
            }
        }
    },
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше имя', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);


const handleFormSubmit = (formData) => {
};

watch(() => appStore.formLoading, (newValue, oldValue) => {
    if (!newValue) {
        emits('formSend', true);
    }
});
</script>

<template>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" :submit-text="`Отправить заявку`" :appType="appType"
        :category="category" :car="car" />
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