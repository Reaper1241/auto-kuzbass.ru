<script setup>
defineProps({
    options: Array,
    modelValue: [String, Number],
    label: String,
    disabled: Boolean,
    name: {
        type: String,
        default: 'name',
    },
    id: {
        type: String,
        default: 'id',
    },
    noZeroOption: {
        type: Boolean,
        default: true,
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

const handleChange = (event) => {
    emit('update:modelValue', event.target.value)
    emit('change', event.target.value)
}
</script>

<template>
    <label class="filter__body-select">
        <select :value="modelValue" @change="handleChange" :disabled="disabled">
            <option :value="0" v-if="noZeroOption">{{ label }}</option>
            <option v-for="(option, index) in options" :key="option.id" :value="id === 'id' ? option[id] : index">
                {{ option[name] }}
            </option>
        </select>
        <button class="filter__body-select-reset" :disabled="disabled" v-if="modelValue > 0"><i
                class="fa-regular fa-circle-xmark"
                @click="emit('update:modelValue', 0), emit('change', 0)"></i></button>
    </label>
</template>

<style lang="scss" scoped>
.filter__body-select {
    flex-grow: 1;
    position: relative;

    .filter__body-select-reset {
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        border-radius: 4px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-self: center;
        color: var(--main-black);
        font-size: 24px;

        i {
            height: 100%;
        }
    }

    .filter__body-select-reset[disabled] {
        display: none;
    }

    &:after {
        content: "\f107";
        position: absolute;
        right: 10px;
        top: 50%;
        color: red;
        transform: translateY(-50%);
        font-family: "Font Awesome 6 Free";
        font-weight: 900;
        pointer-events: none;
        background: white;
        padding: 3px 4px;
        border-radius: 100%;
        text-align: center;
    }

    @media screen and (max-width: 500px) {
        grid-column-start: 1;
    }

    select {
        background: transparent;
        min-width: 210px;
        width: 100%;
        padding: 15px 15px;
        color: var(--main-black);
        border: var(--border);
        border-radius: var(--border-input-radius);

        option {
            padding: 5px;
        }
    }

    select.active {
        font-weight: bold;
    }
}

.wide {
    grid-column-start: 1;
    grid-column-end: 3;
}
</style>