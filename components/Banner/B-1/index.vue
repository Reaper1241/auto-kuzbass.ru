<script setup>
import { ref, computed } from 'vue';
import { useNewStore } from '/stores/NewStore.js';
import { useAppStore } from '/stores/AppStore.js';

const newStore = useNewStore();
const appStore = useAppStore();

const currentModel = computed(() => newStore.model);

// Состояния переключателей
const tradeSwitch = ref(true);
const creditSwitch = ref(true);
const salonSwitch = ref(true);

// Вычисляемые скидки
const tradeSale = computed(() => currentModel.value.sale * appStore.tradeCalcPercent);
const creditSale = computed(() => currentModel.value.sale * appStore.creditCalcPercent);
const salonSale = computed(() => currentModel.value.sale * appStore.salonCalcPercent);

// Общая скидка с сохранением в хранилище
const totalSale = computed(() => {
    let total = 0;
    if (tradeSwitch.value) total += tradeSale.value;
    if (creditSwitch.value) total += creditSale.value;
    if (salonSwitch.value) total += salonSale.value;
    newStore.modelSale = total; // Сохраняем в хранилище
    return total;
});

// Функции для переключения скидок
const toggleTrade = () => {
    tradeSwitch.value = !tradeSwitch.value;
};

const toggleCredit = () => {
    creditSwitch.value = !creditSwitch.value;
};

const toggleSalon = () => {
    salonSwitch.value = !salonSwitch.value;
};

// Форматирование чисел
const makeSpaces = (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '0';
};

// Получение даты следующего понедельника
const getNextMonday = () => {
    const today = new Date();
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7));
    return nextMonday.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};
</script>

<template>
    <div class="sale-calculator">
        <!-- Trade-In скидка -->
        <div class="sale-calculator__item trade">
            <div class="sale-calculator__text" :class="{ 'active': tradeSwitch }">
                <span class="text">Скидка при покупке авто в Trade-In</span>
                <span class="money">{{ makeSpaces(tradeSale) }} ₽</span>
            </div>
            <div class="sale-calculator__switch" :class="{ 'active': tradeSwitch }" @click="toggleTrade">
                <div class="switch" :class="{ 'active': tradeSwitch }" @click="toggleTrade">
                    <input type="checkbox" id="switch" :checked="tradeSwitch" hidden />
                    <label for="switch" class="switch-label" :class="{ 'active': tradeSwitch }" @click="toggleTrade"></label>
                </div>
            </div>
        </div>

        <!-- Кредитная скидка -->
        <div class="sale-calculator__item credit">
            <div class="sale-calculator__text" :class="{ 'active': creditSwitch }">
                <span class="text">Скидка при покупке авто в кредит</span>
                <span class="money">{{ makeSpaces(creditSale) }} ₽</span>
            </div>
            <div class="sale-calculator__switch" :class="{ 'active': creditSwitch }" @click="toggleCredit">
                <div class="switch" :class="{ 'active': creditSwitch }" @click="toggleCredit">
                    <input type="checkbox" id="credit" :checked="creditSwitch" hidden />
                    <label for="credit" class="switch-label" :class="{ 'active': creditSwitch }" @click="toggleCredit"></label>
                </div>
            </div>
        </div>

        <!-- Скидка салона -->
        <div class="sale-calculator__item salon">
            <div class="sale-calculator__text" :class="{ 'active': salonSwitch }">
                <span class="text">Скидка от автосалона при покупке авто</span>
                <span class="money">{{ makeSpaces(salonSale) }} ₽</span>
            </div>
            <div class="sale-calculator__switch" :class="{ 'active': salonSwitch }" @click="toggleSalon">
                <div class="switch" :class="{ 'active': salonSwitch }" @click="toggleSalon">
                    <input type="checkbox" id="salon" :checked="salonSwitch" hidden />
                    <label for="salon" class="switch-label" :class="{ 'active': salonSwitch }" @click="toggleSalon"></label>
                </div>
            </div>
        </div>

        <!-- Итоговая скидка -->
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
    display: flex;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-top: 30px;
    width: 100%;
    @media screen and (max-width: 1400px) {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 30px;

    }

    @media screen and (max-width: 1150px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 0px;
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
    width: 100%;
    align-items: center;
    padding: 10px 15px;
    justify-content: space-between;
    border-radius: 2px;
    border: 1px solid var(--main-color);

    .sale-calculator__text {
        display: flex;
        flex-direction: column;
        white-space: nowrap;
        gap: 0;
        color: var(--dark-grey);
        
        @media screen and (max-width: 768px) {
            white-space: wrap;
        }
        .sale-calculator__money {
            font-size: var(--large-size);
            font-weight: 600;
            color: inherit;
        }

        .text {
            font-size: var(--standart-size);
        
            color: inherit;
            @media screen and (max-width: 420px){
                width: 200px;
            }
            @media screen and (max-width: 357px){
                width: 100%;
            }
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

        // flex-direction: column;
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
    justify-content: start;
    
    @media screen and (max-width: 540px) {
        justify-content: center;
    }
}
</style>