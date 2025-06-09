<script setup>
import { vMaska } from "maska/vue"
import { errors } from "~/constants";

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    errorMessage: {
        type: String,
        default: '',
    },
    maska: {
        type: Object,
        default: {},
    },
    class: {
        type: String,
        default: '',
    },
    error: {
        type: String,
        default: '',
    },
});

const showError = ref(false);
const emit = defineEmits(['update:modelValue']);

function handleMaska(event) {
    emit('update:modelValue', event.target.value)
}

watch(() => props.error, (newError) => {
    if (newError) {
        showError.value = true;
    }
});
</script>

<template>
    <div class="base-input">
        <input :value="modelValue" :class="class" @input="$emit('update:modelValue', $event.target.value)" :type="type"
            :placeholder="placeholder" :required="required" :disabled="disabled" v-maska="maska" @maska="handleMaska"
            autocomplete="on" />
        <span v-if="showError" class="error-icon" aria-label="Ошибка">
            <i class="fa-solid fa-triangle-exclamation"></i>
        </span>
    </div>
</template>

<style scoped lang="scss">
.base-input {
    position: relative;

    &.has-error input {
        border-color: red; // Обводка инпута при ошибке
    }

    .error-icon {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        color: red;
        height: 100%;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        border-top-right-radius: var(--border-small-radius);
        border-bottom-right-radius: var(--border-small-radius);

        border-right: var(--border);
        border-bottom: var(--border);
        border-top: var(--border);
    }

    .error-alert {
        color: red;
        margin-top: 5px;
    }
}
</style>