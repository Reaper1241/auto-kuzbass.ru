<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'submit',
    },
    class: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: String,
        default: '',
    },
    mobileIcon: {
        type: String,
        default: '',
    },
    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <button class="base-button" :type="type" :class="class" :disabled="disabled" :title="label">
        <i :class="icon" v-if="icon" />
        <i :class="mobileIcon" class="mobile" v-if="mobileIcon" />

        <span :class="{ 'hidden': mobileIcon }" v-if="loading">{{ label }}</span>
        <span v-else class="loader">
            <p class="bold">Отправка заявки...</p>
            <span class="button-loader"></span>
        </span>
    </button>
</template>


<style lang="scss" scoped>
.loader {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    .bold {
        font-weight: bold;
    }
}

.base-button {
    color: var(--bg-light);
    background: var(--main-color);
    border-radius: 4px;
    border: 2px solid var(--main-color);
    font-weight: bold;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 14px;
    width: 100%;
    height: 100%;

    i.mobile {
        display: none;

        @media screen and (max-width: 768px) {
            display: block;
        }
    }

    span {
        background: transparent;
        font-weight: bold;

        @media screen and (max-width: 540px) {
            font-weight: 600;
            font-size: var(--standart-size);
        }
    }

    span.hidden {
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
}

.trade {
    background: #3F5E73;
}

.callback {
    display: flex;
    flex-direction: row-reverse;
    border-radius: 40px;
    padding: 10px 25px;
    background: var(--main-color);
    border: 2px solid var(--main-color);
    gap: 20px;
    transition: 0.3s;

    i {
        background: white;
        color: var(--main-color);
        padding: 15px;
        border-radius: 100%;
        transition: 0.3s;
    }

    &:hover {
        background: white;
        color: var(--main-color);
        border-color: white;
        transition: 0.3s;

        i {
            background: var(--main-color);
            color: white;
            transition: 0.3s;
        }
    }
}

.slider__form {
    .base-submit {
        background: var(--main-color);
        border-radius: 50px;
    }
}

.test-drive {
    background: var(--main-color2);
    border: 2px solid var(--main-color2);
}

.trade {
    background: transparent;
    border: 2px solid var(--main-color);
    color: var(--main-color);
}

.call {
    background: var(--main-color);
    border: 2px solid var(--main-color);
}

.bh-1 {
    background: var(--main-color);
    border: 2px solid var(--main-color);
}

.base-button.load {
    width: auto;
}

.header {
    @media screen and (max-width: 768px) {
        border-radius: 100%;
        padding: 10px;

        i {
            font-size: var(--standard-size);
        }
    }
}

.comp {
    padding: 10px 25px;
    background: var(--main-color);
    border: 2px solid var(--main-color);

    @media screen and (max-width: 540px) {
        padding: 10px;
    }

    span {
        @media screen and (max-width: 540px) {
            font-size: var(--small-size);
            font-weight: 500;
        }
    }
}

.comp-credit {
    background: var(--secondary-color);
    border: 2px solid var(--secondary-color);
}

.bordered {
    border: 2px solid var(--main-color);
    background: transparent;
    color: var(--main-color);
    border-radius: 20px;
}

.classic {
    background: var(--main-color);
    border: 2px solid var(--main-color);
    color: white;
    border-radius: 20px;
}

.credit-mod {
    background: var(--main-color);
    border: 2px solid var(--main-color);
    width: 100%;
    padding: 10px;

    &:hover {
        background: white;
        color: var(--main-color);
    }
}

.certificate {
    padding: 0;
    background: transparent;
    color: var(--secondary-color);
    text-align: start;
    width: fit-content;
    border: none;
    gap: 5px;
    flex-direction: row-reverse;
    padding: 0;

    span {
        font-size: var(--standart-size);
        font-weight: 400;
    }


    i {
        font-size: 11px;
        color: white;
        background: var(--secondary-color);
        padding: 4px;
        border-radius: 100%;
        width: 18px;
        height: 18px;
    }

    &:hover {
        opacity: 0.85;
    }
}

.fit {
    width: fit-content;
}

.sp-1 {
    background: white;
    border: none;
    color: var(--main-black);

    padding: 10px;

    span {
        font-weight: 500;
    }
}

.button-loader {
    width: 20px;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 8px solid white;
    animation:
        l20-1 0.8s infinite linear alternate,
        l20-2 1.6s infinite linear;
}

@keyframes l20-1 {
    0% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%)
    }

    12.5% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%)
    }

    25% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%)
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)
    }

    62.5% {
        clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%)
    }

    75% {
        clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%)
    }

    100% {
        clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%)
    }
}

@keyframes l20-2 {
    0% {
        transform: scaleY(1) rotate(0deg)
    }

    49.99% {
        transform: scaleY(1) rotate(135deg)
    }

    50% {
        transform: scaleY(-1) rotate(0deg)
    }

    100% {
        transform: scaleY(-1) rotate(-135deg)
    }
}
</style>
