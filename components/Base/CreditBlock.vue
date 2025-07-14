<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const props = defineProps({
    car: {
        type: Object,
        default: {}
    },
    id: {
        type: String,
        default: ''
    },
    modelValue: {
        type: Object,
        default: () => ({
            RangeTime: null,
            RangePercent: null
        })
    }
})

let carPrice = ref();
carPrice.value = props.car.sale ? props.car.price - props.car.sale : props.car.price

/* Time List */
let timeListOutputData = ref(0);
let carInitialFee = ref(0);


function percentListOutput(value) {
    carInitialFee.value = value
    props.modelValue.RangePercent = value
}

function timeListOutput(value) {
    value == 0 ? timeListOutputData.value = 0.5 * 12 : timeListOutputData.value = value * 12
    props.modelValue.RangeTime = value
}

let monthlyPayment = computed(() => {
    let i = (appStore.creditPercent / 12) / 100;
    let k = ((carPrice.value) - ((carPrice.value * carInitialFee.value) / 100));
    let num = (i * (1 + i) ** timeListOutputData.value) / (((i + 1) ** timeListOutputData.value) - 1);
    let numb = (k * num);

    return Math.floor(numb)
})
/* Time List */

const loading = ref(true);
onMounted(() => {
    loading.value = false
})
</script>

<template>
    <div class="credit-data" :id="id">
        <ClientOnly v-if="!loading">
            <BaseRangeTime class="time" @timeListOutput="timeListOutput" v-model="props.modelValue.RangeTime" />
            <BaseRangePercent class="percent" :min="0" :max="80" :step="5" :carPrice="car.price - car.sale"
                @percentListOutput="percentListOutput" v-model="props.modelValue.RangePercent" />

            <div class="form__credit-block">
                <div class="credit-data__item">
                    <div class="credit-data__title">Ставка от</div>
                    <div class="credit-data__value">
                        <span>{{ appStore.creditPercent }}%</span>
                    </div>
                </div>
                <div class="credit-data__item">
                    <div class="credit-data__title">Платеж от:</div>
                    <div class="credit-data__value"><span>{{ makeSpaces(monthlyPayment) }}₽</span>/мес.</div>
                </div>
                <div class="credit-data__item car-price wide">
                    <div class="credit-data__title">Стоимость авто от</div>
                    <div class="credit-data__value"><span>{{ makeSpaces(car.price - car?.sale) }}₽</span></div>
                </div>
            </div>
        </ClientOnly>
        <div class="skeleton__wrapper" v-else>
            <div class="skeleton image" />
            <div class="skeleton text" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.time{
    margin: 0 !important;
    padding: 0 5px !important;
}

.percent{
    margin: 0 !important;
    padding: 0 5px !important;
}
// .form__credit-data {
//     display: grid;
//     grid-template-columns: auto auto;
//     justify-content: start;
//     gap: 30px;

//     width: 100%;
//     padding: 0;
//     border-radius: 20px;
//     background: white;

//     @media screen and (max-width: 768px) {
//         grid-template-columns: 1fr;
//         padding: 15px 0;
//     }

//     @media screen and (max-width: 540px) {
//         align-items: start;
//         gap: 15px;
//     }

//     @media screen and (max-width: 340px) {
//         flex-direction: column;
//     }

//     .credit-data__item {
//         text-align: start;
//         font-weight: bold;
//         border: 1px solid var(--main-color);
//         text-align: center;
//         padding: 15px 25px;
//         border-radius: 20px;
//         display: flex;
//         align-items: center;
//         gap: 50px;

//         @media screen and (max-width: 768px) {
//             justify-content: space-between;
//             gap: 0;
//         }

//         .credit-data__title {
//             padding-top: 7px;

//             @media screen and (max-width: 768px) {
//                 font-size: 14px;
//             }

//             @media screen and (max-width: 400px) {
//                 font-size: 12px;
//             }
//         }

//         span {
//             font-size: 25px;
//             font-weight: bold;
//             color: var(--main-color);
//         }
//     }

//     .credit-data__item.car-price {
//         display: none;
//     }
// }

.form__credit-block {
    display: flex;
    flex-direction: column;
    gap: 5px;
    // margin: 5px 0;
    
    .credit-data__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 5px;

        background: white;
        padding: 7px 5px;
        // border-radius: var(--border-small-radius);
        // border: var(--border);
        
        @media screen and (max-width: 768px) {
            flex-direction: row;
            gap: 5px;
        }

        @media screen and (max-width: 400px) {
            justify-content: space-between;
            align-items: start;
        }

        .credit-data__value {
            font-size: 16px;
            color: var(--main-color);
            span {
                font-weight: bold;
            }
            
        }

        &.wide {
            grid-column: 1 / 3;
        }
    }
}

.credit-data {
    display: flex;
    flex-direction: column;
    gap: 15px;

    margin: 0;

    @media screen and (max-width: 768px) {
        margin: 15px 0;
    }
}
</style>