<script setup>
import Input from '@/components/Base/Input.vue';
import FormTitle from '@/components/Base/FormTitle.vue';
import { options, errors } from "@/constants/";

const formFields = shallowRef([
    { component: FormTitle, bindings: { title: '' } },
    { 
        name: 'name', 
        component: Input, 
        validation: (value) => value.length > 2 ? null : errors.name, 
        bindings: { 
            label: 'ФИО', 
            placeholder: 'Ваше имя', 
            modelValue: '', 
            class: 'form-input', 
            type: 'text' 
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
            maska: options 
        } 
    },
]);

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
    // Здесь можно добавить отправку данных на сервер
    // с полями formData.name и formData.phone
};
</script>

<template>

    <BaseFormTimer 
        :fields="formFields" 
        @submit="handleFormSubmit" 
        :submit-text="`Получить максимальную выгоду`" 
        :appType="9"
        class="small" 
    />
</template>
<style scoped lang="scss">
.small {
    display: flex;
    flex-direction: column;
    // display: block;
    align-items: normal;
    gap: 10px;
    // background: white;
    
    border-radius: 20px;
    padding: 15px;
    align-items: center;
    // margin-top: 20px;
    
    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: normal;
    }
}
:deep(.base-input){
    height: 40px;
    // width: 48%;
}  
:deep(.form-input){
    height: 40px;
    background: white;
    border: 1px solid white;
    // width: 48%;
}   
:deep(input){
    color: black;
}
:deep(.base-button){
    margin-left: 5px;
    height: 40px;
    background: var(--main-color);
    border: none;
    z-index: 3;
    @media screen and (max-width: 768px){
        margin-left: 0px;
    }
    // width: 48%;
}
</style>