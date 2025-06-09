<script setup>
import { ref, watch } from 'vue';
defineProps(['modelValue']);

const { modelValue } = defineProps(['modelValue']);
const computedValue = ref(modelValue);

const updateValue = (event) => {
    computedValue.value = event.target.value;
    $emit('update:modelValue', computedValue.value);
};

const startDragging = (event) => {
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDragging);

    const onDrag = (e) => {
        const rect = event.target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = Math.min(Math.max(offsetX / rect.width, 0), 1);
        computedValue.value = Math.round(percentage * 100);
        updateValue({ target: { value: computedValue.value } });
    }

    const stopDragging = () => {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDragging);
    }
}

watch(() => modelValue, (newValue) => {
    computedValue.value = newValue;
});
</script>

<template>
    <div class="custom-range">
        <div class="progress-bar" :style="{ width: computedValue + '%', transition: 'width 0.2s ease' }"></div>
        <input type="hidden" :value="modelValue" @input="updateValue" />
        <div class="slider-thumb" :style="{ left: computedValue + '%', transition: 'left 0.2s ease' }"
            @mousedown="startDragging"></div>
        <input type="range" class="visually-hidden" :value="modelValue" @input="updateValue" @mousedown.prevent />
    </div>
</template>

<style scoped>
.custom-range {
    position: relative;
    width: 100%;
    height: 30px;
}

.progress-bar {
    background: #4caf50;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.2s ease;
}

.slider-thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    background: #fff;
    border: 2px solid #4caf50;
    border-radius: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
    top: 15px;
}

input[type="range"].visually-hidden {
    display: none;
}
</style>