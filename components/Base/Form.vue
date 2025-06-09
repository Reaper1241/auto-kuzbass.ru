<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps({
    fields: {
        type: Array,
        required: true,
    },
    submitText: {
        type: String,
        default: 'Отправить',
    },
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
        default: 'new',
    }
});

const emit = defineEmits(['submit']);

const formValues = ref({});
const errors = ref({});

const filteredFields = computed(() => props.fields.filter(field => 'name' in field));

const initializeForm = () => {
    filteredFields.value.forEach(field => {
        formValues.value[field.name] = field.bindings?.modelValue || '';
        errors.value[field.name] = null;
    });
};

initializeForm();

const validate = () => {
    let isValid = true;
    errors.value = {};

    filteredFields.value.forEach(field => {
        if (field.validation) {
            const error = field.validation(formValues.value[field.name]);
            if (error) {
                errors.value[field.name] = error;
                isValid = false;
            }
        }
    });

    return isValid;
};

const handleSubmit = () => {
    if (validate()) {
        postForm(formValues.value, props.appType, props.car, props.category);
        emit('submit', formValues.value);
    }
};

watch(
    () => props.fields,
    initializeForm
);

const formChecked = ref(true);
</script>

<template>
    <form @submit.prevent="handleSubmit" class="base-form">
        <component v-for="(field, index) in fields" :key="index" :is="field.component" v-model="formValues[field.name]"
            v-bind="field.bindings" :error="errors[field.name]" />
        <FormPieceCheck @formChecked="formChecked = $event" :appType="appType" />
        <BaseFormButton type="submit" :label="submitText" class="base-submit" :disabled="!formChecked"
            :loading="!appStore.formLoading" />
    </form>
</template>


<style scoped>
.base-submit :deep(*) {

    position: relative;
    z-index: 10;        /* Поднимаем над возможными overlay */
    pointer-events: auto; /* Разрешаем клики */
    opacity: 1 !important;
}

.base-form__title{
    margin-left: 10px;
    font-size: 18px;
    margin-bottom: 10px;
}
.base-form{
    color: black !important;
}

.error {
    color: red;
    font-size: 0.8em;
}

.submit-block {
    display: grid;
    gap: 10px;
    flex-wrap: wrap;
    grid-template-columns: 1fr;
    grid-column-start: 1;
    grid-column-end: 3;
}

.error-block {
    grid-column-start: 1;
    grid-column-end: 3;
    display: flex;
}

.form-comp {
    max-width: 500px;
}
</style>