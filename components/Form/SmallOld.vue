<script setup>
import { options } from "@/constants/";
import { vMaska } from "maska/vue"

let phoneValue = ref('')

/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
    formChecked.value = value
}
/* Form Check */

const validate = ref()
</script>

<template>
    <form class="small-form" @submit.prevent="validate = validateForm(phoneValue, 3)">
        <span class="error-message">{{ validate?.phone.message }}</span>
        <input class="small-form__phone" :class="{ 'is-invalid': validate?.phone.error }" type="tel" name="SmallPhone"
            placeholder="+7 (___) ___-__-__" autocomplete="off" v-maska="options" v-model="phoneValue">
        <button type="submit" class="small-form__submit" :disabled="!formChecked">Оставить заявку</button>
        <FormPieceCheck @formChecked="returnEmit" class="wide-grid" />
    </form>
</template>

<style scoped lang="scss">
.small-form {
    background: white;
    padding: 30px;
    border-top-left-radius: var(--border-radius);
    display: grid;
    grid-template-columns: 300px max-content;
    width: 100%;

    @media screen and (max-width: 540px) {
        grid-template-columns: 1fr 1fr;
        padding: 30px 0;
    }

    .small-form__phone {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
        border-bottom: 2px solid var(--border-color);
        border-left: 2px solid var(--border-color);
        border-top: 2px solid var(--border-color);
        padding: 15px 20px;
        font-size: var(--big-size);
        color: var(--main-black);
        text-align: start;
        display: flex;
        justify-content: center;

        @media screen and (max-width: 1150px) {
            font-size: 18px;
        }

        @media screen and (max-width: 540px) {
            font-size: 16px;
            padding: 15px 15px;
        }
    }

    .small-form__submit {
        text-align: center;
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
        border: 3px solid var(--main-color);
        background: var(--main-color);
        color: var(--bg-light);
        padding: 15px;
        font-size: 18px;
        transition: 0.3s;
        font-weight: bold;

        @media screen and (max-width: 540px) {
            font-size: var(--standart-size);
            min-width: 150px;
            padding: 15px 10px;
        }

        @media screen and (max-width: 340px) {
            min-width: auto;
        }

        &:hover {
            background: white;
            color: var(--main-color);
            transition: 0.3s;
        }
    }
}

.main.small-form {
    background: transparent;

    @media screen and (max-width: 1000px) {
        background: transparent;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .small-form__phone {
        background: white;

        @media screen and (max-width: 1000px) {
            border-radius: 20px;
            border: 2px solid var(--border-color);
            background: var(--bg-light);
        }
    }

    .small-form__submit {
        @media screen and (max-width: 1000px) {
            border-radius: 20px;
        }
    }

}

.small-form__phone {
    transition: 0.3s;
}


.small-form.footer {
    background: white;
    padding: 30px;
    text-align: center;
    color: black;
    border-radius: 20px;
    margin-bottom: 40px;
    justify-content: center;

    @media screen and (max-width: 1000px) {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .small-form__phone {
            border-radius: 20px;
            border: 2px solid var(--border-color);
        }

        .small-form__submit {
            border-radius: 20px;
        }
    }
}
</style>