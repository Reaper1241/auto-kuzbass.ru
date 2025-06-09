<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps({
    sale: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits(['updateTotal']);

const tradeSwitch = ref(true)
const creditSwitch = ref(true)
const salonSwitch = ref(true)

const tradeSale = computed(() => props.sale * appStore.tradeCalcPercent)
const creditSale = computed(() => props.sale * appStore.creditCalcPercent)
const salonSale = computed(() => props.sale * appStore.salonCalcPercent)

const totalSale = computed(() => {
    let total = 0
    if (tradeSwitch.value) total += tradeSale.value
    if (creditSwitch.value) total += creditSale.value
    if (salonSwitch.value) total += salonSale.value
    return total
})


watch(totalSale, (newTotalSale, oldTotalSale) => {
    emit('updateTotal', newTotalSale)
})
</script>

<template>
    <div class="sale-calculator">
        <div class="sale-calculator__item trade" :class="{ 'active': tradeSwitch }">
            <div clas="sale-calculator__switch">
                <div class="switch">
                    <input type="checkbox" id="switch" :checked="tradeSwitch" @change="tradeSwitch = !tradeSwitch" />
                    <label for="switch"></label>
                </div>
            </div>
            <div class="sale-calculator__text" :class="{ 'active': tradeSwitch }">
                <span class="text">Скидка при покупке авто в Trade-In</span>
                <span class="money">{{ makeSpaces(tradeSale) }} ₽</span>
            </div>
        </div>

        <div class="sale-calculator__item credit" :class="{ 'active': creditSwitch }">
            <div clas="sale-calculator__switch">
                <div class="switch">
                    <input type="checkbox" id="credit" :checked="creditSwitch" @change="creditSwitch = !creditSwitch" />
                    <label for="credit"></label>
                </div>
            </div>
            <div class="sale-calculator__text" :class="{ 'active': creditSwitch }">
                <span class="text">Скидка при покупке авто в кредит</span>
                <span class="money">{{ makeSpaces(creditSale) }} ₽</span>
            </div>
        </div>

        <div class="sale-calculator__item salon" :class="{ 'active': salonSwitch }">
            <div clas="sale-calculator__switch">
                <div class="switch">
                    <input type="checkbox" id="salon" :checked="salonSwitch" @change="salonSwitch = !salonSwitch" />
                    <label for="salon"></label>
                </div>
            </div>
            <div class="sale-calculator__text" :class="{ 'active': salonSwitch }">
                <span class="text">Скидка от автосалона при покупке авто</span>
                <span class="money">{{ makeSpaces(salonSale) }} ₽</span>
            </div>
        </div>

        <div class="sale-calculator__item total" :class="{ 'activeTotal': tradeSwitch || creditSwitch || salonSwitch }">
            <div class="sale-calculator__text">
                Итоговая скидка: <span class="sale-calculator__money">{{ makeSpaces(totalSale) }} ₽</span>
                <span class="date">
                    до {{ getNextMonday() }}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sale-calculator {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    @media screen and (max-width: 1400px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 1150px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
        gap: 5px;
    }
}

.switch {
    input:checked+label {
        background-color: var(--main-color);
    }

    input:focus+label {
        box-shadow: 0 0 1px var(--main-color);
    }
}

.sale-calculator__item {
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 10px 15px;
    border-radius: 16px;
    border: 1px solid #E5E5E5;

    .sale-calculator__text {
        display: flex;
        flex-direction: column;
        gap: 0;
        color: var(--dark-grey);

        .sale-calculator__money {
            font-size: var(--large-size);
            font-weight: 600;
            color: inherit;
        }

        .text {
            font-size: var(--standart-size);
            color: inherit;
        }

        .money {
            font-size: var(--large-size);
            font-weight: 500;
            color: inherit;
        }
    }

    .sale-calculator__text.active {
        .money {
            color: var(--main-color);
        }
    }

    @media screen and (max-width: 540px) {
        flex-direction: column;
        align-items: start;
        gap: 10px;
    }

}

.sale-calculator__item.active {
    border: 1px solid var(--main-color);
}

.sale-calculator__item.activeTotal {
    background-color: var(--main-color);
    color: white;
    border: 1px solid var(--main-color);

    .sale-calculator__text {
        color: inherit;
    }
}

.sale-calculator__item.total {
    align-items: center;
    justify-content: center;
}
</style>