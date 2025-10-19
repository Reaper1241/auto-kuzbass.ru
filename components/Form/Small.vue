<script setup>
import Input from '@/components/Base/Input.vue';
import FormTitle from '@/components/Base/FormTitle.vue';
import { options, errors } from "@/constants/";
import postForm from "@/utils/postForm.js";

import { useNewStore } from '/stores/NewStore.js';
import { useNewCarStore } from '/stores/NewCarStore.js';
import { useRoute } from 'vue-router';

const newStore = useNewStore();
const carStore = useNewCarStore();
const $route = useRoute();

const props = defineProps({
  car: { type: Object, default: null }
});

const formFields = shallowRef([
  { component: FormTitle, bindings: { title: 'Заказать обратный звонок' } },
  { name: 'name', component: Input, validation: (value) => value.length > 2 ? null : errors.name,
    bindings: { label: 'ФИО', placeholder: 'Ваше имя', modelValue: '', class: 'form-input', type: 'text' } },
  { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone,
    bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);

// безопасный метод получения машины
function resolveCar() {
  if (props.car) return props.car;
  if ($route.name === 'model' && newStore.model) {
    return {
      brand: newStore.model.brand,
      model: newStore.model.model,
      min_price: newStore.model.min_price,
      sale: newStore.model.sale,
      id: newStore.model.id ?? null
    };
  }
  if ($route.name === 'car' && carStore.car && Object.keys(carStore.car).length) {
    return {
      brand: carStore.car.brand,
      model: carStore.car.model,
      price: carStore.car.price ?? carStore.car.min_price ?? null,
      sale: carStore.car.sale ?? 0,
      id: carStore.car.id ?? carStore.car.car_id ?? null
    };
  }
  return null;
}

const handleFormSubmit = (formData) => {
  const carToSend = resolveCar();
  postForm(formData, 9, carToSend, "new");
};
</script>

<template>
    <BaseForm
    :fields="formFields"
    @submit="handleFormSubmit"
    :submit-text="`Оставить заявку`"
    :appType="9"
    :manualSubmit="true"
    class="small"
    />

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