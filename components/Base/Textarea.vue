<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
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
    class: {
        type: String,
        default: '',
    }
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="base-textarea">
        <textarea :required="required" :disabled="disabled" :placeholder="placeholder" :class="class" class="form-input"
            :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"></textarea>
        <span v-if="errorMessage" class="error-alert">{{ errorMessage }}</span>
    </div>
</template>

<style scoped>
.textarea {
    min-height: 120px;
    resize: none;
}
</style>