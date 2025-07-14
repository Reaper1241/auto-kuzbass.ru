<script setup>
import { options, name } from "@/constants/";
import { vMaska } from "maska/vue"
import { useAppStore } from '/stores/AppStore.js';
import { useNewStore } from '/stores/NewStore.js';

const appStore = useAppStore();
const newStore = useNewStore();

const props = defineProps({
    model: {
        type: Object,
        default: {}
    },
    modification: {
        type: Object,
        default: {}
    },
    category: {
        type: String,
    }
});

const formChecked = ref(true);
const nameValue = ref('');
const phoneValue = ref('');

const validateForm = () => {
    const clearPhone = phoneValue.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

    const formValues = {
        phone: clearPhone,
        name: nameValue.value,
        fee: `${(currentComplectation.value.price - modelSale.value) * fee.value / 100} руб перв. взнос`,
        timeListOutputData: `${timeListOutputData.value} срок кредитования (мес.)`,
        monthlyPayment: `${monthlyPayment.value} мес.платеж`,
        modification: `${props.modification.modification} ${currentComplectation.value.complectation}`,
    }

    const appType = 2
    const categoty = props.category
    const car = {
        brand: props.model.brand,
        model: props.model.url_model,
        price: currentComplectation.value.price - modelSale.value
    }

    if (clearPhone.length == 11) {
        postForm(formValues, appType, car, categoty);
    }
};

function returnEmit(value) {
    formChecked.value = value
}

watch(() => props.modification, () => {
    selectedComplectationId.value = props.modification.car_complectations[0].id;
}, { deep: true })

const modelSale = computed(() => props.model.sale);
const selectedComplectationId = ref(props.modification.car_complectations?.[0].id);

// Добавляем сортировку комплектаций по цене
const sortedComplectations = computed(() => {
    if (!props.modification?.car_complectations) return [];
    return [...props.modification.car_complectations].sort((a, b) => a.price - b.price);
});

// Используем отсортированный массив для поиска текущей комплектации
const currentComplectation = computed(() => sortedComplectations.value.find(item => item.id == selectedComplectationId.value));

const modList = computed(() => newStore.model.modifications?.filter((mod) => mod.car_complectations.length))

const fee = ref(0);
const timeListOutputData = ref(0);

let monthlyPayment = computed(() => {
    let i = (appStore.creditPercent / 12) / 100;
    let k = ((currentComplectation.value.price - modelSale.value) - (((currentComplectation.value.price - modelSale.value) * fee.value) / 100));
    let num = (i * (1 + i) ** timeListOutputData.value) / (((i + 1) ** timeListOutputData.value) - 1);
    let numb = (k * num);

    return Math.floor(numb)
})

function timeListOutput(value) {
    if (value == 0) {
        timeListOutputData.value = 0.5 * 12
    } else {
        timeListOutputData.value = value * 12
    }
}
</script>

<template>
    <div class="model-credit__form" v-if="modification?.car_complectations?.length">
        <div class="form__block">
            <div class="model-card__mod-choice" v-if="modList.length > 1">
                <span class="title">Выбранная модификация:</span>
                <label class="model-card__mod-select">
                    <select v-model="newStore.modification">
                        <option v-for="(option, index) in modList" :key="option.id" :value="option.id">
                            {{ option.modification }}
                        </option>
                    </select>
                </label>
            </div>

            <div class="form__complection-select">
                Выбранная комплектация:
                <ul class="form__complection-list">
                    <li class="form__complection-item" 
                        v-for="item in sortedComplectations" 
                        :key="item.id"
                        @click="selectedComplectationId = item.id"
                        :class="{ 'active': selectedComplectationId == item.id }">
                        <span class="text">
                            {{ item.complectation }}
                        </span>
                        <span class="price">
                            {{ makeSpaces(item.price) }}₽
                        </span>
                    </li>
                </ul>
            </div>
            <div class="form__block row">
                <div class="form__form-item">
                    <span class="text">Стоимость авто (с учетом скидки):</span>
                    <span class="money">{{ makeSpaces(currentComplectation.price - modelSale) }} ₽</span>
                </div>
                <div class="form__form-item">
                    <span class="text">Ежемесячный платеж:</span>
                    <span class="money">
                        {{ makeSpaces(monthlyPayment) }} ₽/мес.
                    </span>
                </div>
            </div>
        </div>
        <div class="form__block range">
            <BaseRangeTime @timeListOutput="timeListOutput" />
            <BaseRangePercent :min="0" :max="80" :step="5" :carPrice="currentComplectation.price - modelSale"
                @percentListOutput="fee = $event" />
        </div>

        <div class="form__block">
            <form class="form__form-content" @submit.prevent="validateForm">
                <div class="base-input">
                    <input type="text" name="name" placeholder="Имя" v-model="nameValue" autocomplete="on"
                        v-maska="name" class="form-input">
                </div>

                <div class="base-input">
                    <input type="tel" name="contactPhone" placeholder="+7 (___) ___-__-__" autocomplete="on"
                        v-maska="options" v-model="phoneValue" class="form-input">
                </div>
                <FormPieceCheck @formChecked="returnEmit" />
                <BaseFormButton :title="'Оставить заявку'" :label="'Оставить заявку'" :disabled="!formChecked"
                    :loading="!appStore.formLoading" />
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.model-credit__form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    
    .form__block {
        display: flex;
        flex-direction: column;
        
        gap: 0px;
        @media screen and (max-width: 768px){
            // width: 100%;
            // padding-right: 20px;
        }
    }

    .form__block.range {
        gap: 15px;
    }

    .form__block.row {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .form__form-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .form__form-item {
        display: flex;
        gap: 10px;
        background: white;
        padding: 10px 15px;
        // border-radius: var(--border-small-radius);
        // border: var(--border);

        .money {
            font-weight: bold;
            color: var(--main-color);
            margin-left: auto; // добавлено
        }

        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 5px;

            .money {
                margin-left: 0; // убираем auto для мобильных, чтобы всё было по одной оси
            }
        }
    }

    .form__complection-item {
        padding: 10px;
        border: 1px solid var(--secondary-color);
        border-radius: 20px;
        width: fit-content;
    }

    .form__complection-select {
        padding: 15px 0;
        // border: var(--border);
        // border-radius: var(--border-small-radius);
        background: white;
        .form__complection-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* Исправлено - правильно задаем 2 колонки */
            gap: 5px;
            margin-top: 5px;
            width: 100%;
            align-items: center;
            
            .form__complection-item {
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                border: 1px solid #9F9F9F;
                display: flex;
                gap: 15px;
                width: 100%;
                color: #9F9F9F;
                align-items: center;
                
                &.active {
                    border: 1px solid var(--main-color);
                    color: var(--main-color);
                }
                
                @media screen and (max-width: 540px) {
                    padding: 5px 10px;
                    gap: 5px;

                    span {
                        font-size: 10px;
                    }
                }
            }
        }
    }
}

.form__complection-item.active {
    
    color: var(--main-color);
}

.model-card__mod-choice {
    display: flex;
    flex-direction: column;
    gap: 5px;

    .model-card__mod-select {
        flex-grow: 1;
        position: relative;

        .filter__body-select-reset {
            position: absolute;
            right: 40px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            border-radius: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            align-self: center;
            color: var(--main-black);

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
            transform: translateY(-50%);
            font-family: "Font Awesome 6 Free";
            font-weight: 900;
            pointer-events: none;
            background: var(--main-black);
            color: white;
            padding: 3px 4px;
            border-radius: 100%;
            text-align: center;
        }

        @media screen and (max-width: 500px) {
            grid-column-start: 1;
        }

        select {
            background: white;
            min-width: 210px;
            width: 100%;
            padding: 15px 15px;
            color: var(--main-color);
            border-radius: 50px;
            font-weight: 700;
            border: 2px solid var(--main-color);

            option {
                padding: 5px;
            }
        }

        select.active {
            font-weight: bold;
        }
    }

    .model-card__mod-subtitle {
        margin-bottom: 10px;
    }
}
</style>