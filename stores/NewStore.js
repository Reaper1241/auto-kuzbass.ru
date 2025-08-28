import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAppStore } from './AppStore.js'

export const useNewStore = defineStore("newStore", () => {
    // уже существующие состояния
    const brand = ref([])
    const models = ref([])
    const model = ref([])
    const modelSale = ref(0)
    const modification = ref(0)
    const modelCar = ref([])
    const color = ref(0)
    const AFKcar = ref()

    // переключатели скидок
    const tradeSwitch = ref(true)
    const creditSwitch = ref(true)
    const salonSwitch = ref(true)

    // доступ к appStore для процентов
    const appStore = useAppStore()

    // вычисляемые скидки
    const tradeSale = computed(() => model.value.sale ? model.value.sale * appStore.tradeCalcPercent : 0)
    const creditSale = computed(() => model.value.sale ? model.value.sale * appStore.creditCalcPercent : 0)
    const salonSale = computed(() => model.value.sale ? model.value.sale * appStore.salonCalcPercent : 0)

    // общая сумма скидок
    const totalSale = computed(() => {
        let total = 0
        if (tradeSwitch.value) total += tradeSale.value
        if (creditSwitch.value) total += creditSale.value
        if (salonSwitch.value) total += salonSale.value
        modelSale.value = total
        return total
    })

    return { 
        // старые поля
        brand, models, model, modification, color, modelSale, modelCar, AFKcar,
        // новые
        tradeSwitch, creditSwitch, salonSwitch,
        tradeSale, creditSale, salonSale, totalSale
    }
})
