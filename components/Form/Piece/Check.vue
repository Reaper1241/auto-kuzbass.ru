<script setup>
const checkedP = ref(true);
const checkedN = ref(true);

const emit = defineEmits(['formChecked']);

const props = defineProps({
    appType: {
        type: Number,
    },
});

function handleFormCheck() {
    emit('formChecked', (checkedP.value && checkedN.value));
}
</script>

<template>
    <div class="form__check">
        <label class="form__check-label politics" :class="$attrs.class">
            <input class="radio__hidden" type="checkbox" v-model="checkedP"
                @click="checkedP = !checkedP, handleFormCheck()">
            <!-- <span class="radio__img" :class="checkedP ? 'checked' : ''"></span> -->
            <p class="wrap">Нажимая на кнопку «оставить заявку», вы даете согласие&nbsp; <span><NuxtLink to="/politics/" target="_blank" class="check-link">
                на обработку персональных данных</NuxtLink></span>
            </p>
            <p class="wrap-mob">Нажимая на кнопку «оставить заявку», вы даете согласие&nbsp; <span><NuxtLink to="/politics/" target="_blank" class="check-link">
                на обработку персональных данных</NuxtLink></span>
            </p>
        </label>

        <label class="form__check-label nation" :class="$attrs.class"
            v-if="appType == 7 || appType == 8 || appType == 2">
            <input class="radio__hidden" type="checkbox" v-model="checkedN"
                @click="checkedN = !checkedN, handleFormCheck()">
            <span class="radio__img" :class="checkedN ? 'checked' : ''"></span>
            <p>Подтверждаю наличие гражданства РФ</p>
        </label>
    </div>
</template>

<style scoped lang="scss">
.form__check {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: start;
    width: fit-content;
    justify-content: center;
    flex-direction: column;
    min-width: 200px;
    gap: 8px;

    flex-wrap: nowrap;
    padding: 8px 2px;
    background: white;
    border-radius: 12px;

    .form__check-label {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 10px;
        flex-wrap: nowrap;
        .check-link {
            text-decoration: underline;
        }

        .radio__img {
            position: relative;
            min-width: 20px;
            height: 20px;
            border: 1px solid var(--main-color) !important;
            border-radius: 20px;
            margin-right: 10px;
            cursor: pointer;
        }

        .checked {
            &::before {
                content: "\f00c";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-family: "Font Awesome 6 Free";
                font-weight: 900;
                font-size: 10px;
                color: var(--main-color)!important;
            }
        }
        p {
            color: black; // Явно задаем черный цвет текста

            a,
            .check-link {
                color: black;
                text-decoration: underline;

                &:hover {
                color: var(--main-color); // можно оставить hover эффект, если нужно
                }
            }
            }
    }
}

.online__trade-form {
    .check-black p {
        color: black;
    }
}

.radio__hidden:not(:checked)+.radio__img::before {
    background: none;
}

label.form__check-label.white p {
    color: white;
}

.wide {
    grid-column-start: 1;
    grid-column-end: 3;
}
.wrap{
    display: flex;
    align-items: center;
    // justify-content: center;   
    text-wrap: nowrap;
    @media screen and (max-width: 500px) {
        text-wrap: wrap;
        display: none;
    }
    @media screen and (max-width: 340px) {
        text-wrap: wrap;
        display: none;
        // white-space: nowrap;
    }
}
.wrap-mob{
    display: none;
    @media screen and (max-width: 500px) {
        display: grid;
        // white-space: nowrap;
    }
}
.small {
    p {
        font-size: 10px;

        a {
            font-size: 10px !important;
        }
    }
}

.wide-grid {
    grid-column-start: 1;
    grid-column-end: 3;
}
</style>
