<script setup>
import { vMaska } from "maska/vue"

import { name } from "@/constants/";

/* Form Check */
const formChecked = ref(true);
function returnEmit(value) {
    formChecked.value = value
}
/* Form Check */

let nameValue = ref('')
let nameError = ref(false)

let textValue = ref('')
let textError = ref(false)

let formSend = ref(false)

let star = ref();
let revirewSend = ref(false)


function validateForm() {
    if (textValue.value && nameValue.value) {
        revirewSend.value = true
    } else {
        if (!textValue.value) {
            textError.value = true
            setTimeout(() => {
                textError.value = false
            }, 2000)
        }

        if (!nameValue.value) {
            nameError.value = true
            setTimeout(() => {
                nameError.value = false
            }, 2000)
        }
    }
}

</script>

<template>
    <div class="review__form-success" v-if="revirewSend">
        <div class="review-icon">
            <i class="fa-solid fa-check"></i>
        </div>
        Ваш отзыв будет опубликован после модерации!
    </div>
    <form class="review__form-form" method="post" @submit.prevent="validateForm()" v-else>
        <div class="review__form-title">Оставить отзыв</div>

        <div class="review__form-stars">
            <i class="fa-regular fa-star" v-for="i in 5" :key="i" :class="{ 'active': i == star }"
                @click="star = i"></i>
        </div>

        <input type="text" name="name" placeholder="Имя" v-maska="name" class="review__form-input" v-model="nameValue"
            autocomplete="on" :class="{ 'is-invalid': nameError }">

        <textarea name="text" placeholder="Cообщение" class="review__form-textarea" v-model="textValue"
            :class="{ 'is-invalid': textError }"></textarea>
        <FormPieceCheck class="wide" @formChecked="returnEmit" />


        <button type="submit" class="review__form-submit" :disabled="!formChecked" :class="{ 'send': formSend }">{{
            formSend ? 'Заявка отправлена!' : 'Оставить заявку' }}</button>
    </form>

</template>

<style scoped lang="scss">
.review__form-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 30px;
    background: var(--light-grey);
    border-radius: 20px;
    max-width: 350px;

    .review__form-title {
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 5px;
    }

    .review__form-stars {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
        flex-direction: row-reverse;

        .fa-star {
            cursor: pointer;
            color: #F49D34;
            font-size: var(--big-size);
            padding: 5px;


            &:hover~.fa-star {
                font-weight: bold;
            }

            &:hover {
                font-weight: bold;
            }

        }

        .fa-star.active {
            font-weight: bold;

            ~.fa-star {
                font-weight: bold;
            }
        }

    }


    @media screen and (max-width: 560px) {
        display: flex;
        flex-direction: column;
    }

    input,
    textarea {
        background: white;
        border-radius: 20px;
        padding: 15px;
        border: 2px solid var(--border-color);
        transition: 0.3s;
    }

    .review__form-textarea {
        min-height: 90px;
    }

    .review__form-submit {
        background: var(--main-color);
        padding: 15px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
    }
}

.review__form-success {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 350px;
    padding: 30px;
    background: var(--light-grey);
    border-radius: 20px;
    text-align: center;
    justify-content: center;
    align-items: center;

    .review-icon {
        display: inline-block;
        background: #36B555;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: white;

        i {
            font-size: 25px;
        }
    }
}
</style>