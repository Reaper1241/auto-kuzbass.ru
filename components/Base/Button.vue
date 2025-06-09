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
})
</script>

<template>
    <button class="base-button" :type="type" :class="class" :disabled="disabled" :title="label">
        <i :class="icon" v-if="icon" />
        <i :class="mobileIcon" class="mobile" v-if="mobileIcon" />

        <span :class="{ 'hidden': mobileIcon }">{{ label }}</span>
    </button>
</template>


<style lang="scss" scoped>
.base-button {
    color: var(--bg-light);
    background: var(--secondary-color);
    border-radius: 4px;
    border: 2px solid var(--secondary-color);
    font-weight: normal;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 14px;
    width: 100%;
    height: auto;
    gap: 10px;

    i.mobile {
        display: none;

        @media screen and (max-width: 768px) {
            display: block;
        }
    }

    span {
        background: transparent;
        font-weight: normal;

        @media screen and (max-width: 540px) {
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
    background: var(--main-color);
}

.callback {
    display: flex;
    flex-direction: row-reverse;
    border-radius: 40px;
    padding: 10px 25px;
    background: var(--secondary-color);
    border: 2px solid var(--secondary-color);
    gap: 20px;
    transition: 0.3s;

    i {
        background: white;
        color: var(--secondary-color);
        padding: 15px;
        border-radius: 100%;
        transition: 0.3s;
    }

    &:hover {
        background: white;
        color: var(--secondary-color);
        border-color: white;
        transition: 0.3s;

        i {
            background: var(--secondary-color);
            color: white;
            transition: 0.3s;
        }
    }
}

.callback-fixed {
    border-radius: 10px;
    background: var(--main-color);
    border: 2px solid var(--main-color);
    &::before {
        content: "";
        position: absolute;
        top: 0;
        height: 100%;
        width: 45px;
        transform: skewX(-45deg);
        left: -150%;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4));
        animation: blick 3s infinite linear;
    }

    @keyframes blick {
        0% {
            left: -150%;
        }

        100% {
            left: 150%;
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
    border-radius: 16px;
    background: var(--main-color);
    border-color: var(--main-color);

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
    color: var(--main-color);
    background: white;
    border: 2px solid var(--main-color);
    &:hover{
        background: var(--main-color);
        color: white;
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 14px 20px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 4px;
    text-align: center;
    line-height: 1.4;
    height: 40px; // фиксированная высота для выравнивания
    transition: 0.3s ease;
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

.credit {
    background: var(--main-color);
    border-color: var(--main-color);
    padding: 8px;
}

.trade {
    background: #9F9F9F;
    border-color: #9F9F9F;
    color: white;
    padding: 8px;
}

.taxi {
    background: var(--yellow);
    border-color: var(--yellow);
    color: var(--main-black);
}

.model-card {
    @media screen and (max-width: 768px) {
        padding: 15px;

        span {
            font-weight: bold;
            text-transform: uppercase;
        }
    }
}
</style>
