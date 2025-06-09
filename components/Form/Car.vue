<script setup>
import Input from '@/components/Base/Input.vue';
import CreditBlock from '@/components/Base/CreditBlock.vue';
import FormTitle from '@/components/Base/FormTitle.vue';

import { options, name, errors } from "@/constants/";

const props = defineProps({
    car: {
        type: Object,
        default: {}
    }
});

const formFields = shallowRef([
    { component: FormTitle, bindings: { title: 'Купить авто с пробегом в кредит' } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше имя', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { component: CreditBlock, bindings: { car: props.car } },
]);

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
};
</script>

<template>
    <BaseForm :fields="formFields" @submit="handleFormSubmit" :submit-text="`Оставить заявку`" :appType="2"
        :class="`car`" :car="car" />
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

.form__form-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    width: 100%;
    position: relative;

    @media screen and (max-width: 768px) {
        gap: 30px;
        grid-template-columns: 1fr;
    }

    .form__form-block {
        display: flex;
        flex-direction: column;
        gap: 10px;
        position: relative;

        @media screen and (max-width: 768px) {
            margin-left: 0;
        }

        .form__form-submit {
            padding: 15px;
            background: var(--main-color);
            color: var(--bg-light);
            font-weight: bold;
            transition: 0.3s;
            border: 3px solid var(--main-color);

            &:hover {
                background: var(--bg-light);
                transition: 0.3s;
                color: var(--main-color);
            }
        }

        .form__form-select {
            position: relative;

            select {
                border: 2px solid var(--border-color);
                min-width: 210px;
                width: 100%;
                padding: 10px 15px;
                color: #767676;
                border-radius: 20px;
                background: white;
            }

            &:after {
                content: "\f107";
                position: absolute;
                right: 10px;
                top: 10px;
                font-family: "Font Awesome 6 Free";
                font-weight: 900;
                pointer-events: none;
                background: var(--light-grey);
                padding: 3px 4px;
                border-radius: 100%;
                text-align: center;
            }

        }

        .form__form-title {
            font-weight: bold;
            text-align: start;
            padding-bottom: 10px;
        }

        input {
            border: 2px solid var(--border-color);
            width: 100%;
            padding: 10px 15px;
            color: #767676;
            border-radius: 20px;
            background: white;
        }
    }

    .credit-data {
        gap: 15px;
    }
}

.form__form-notice {
    text-align: start;
    display: flex;
    align-items: center;
    gap: 5px;

    span {
        font-size: 30px;
        line-height: normal;
        color: var(--main-color);
        font-weight: bold;
    }
}

.form__form-alert {
    padding: 15px;
    background: transparent;
    border-radius: 20px;
    color: var(--main-color);
    font-weight: bold;
    border: 3px solid var(--main-color);
}

.base-form.car {
    gap: 10px;
}
</style>