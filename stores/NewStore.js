import { defineStore } from 'pinia';

export const useNewStore = defineStore("newStore", () => {
    const brand = ref([])
    const models = ref([])
    const model = ref([])
    const modelSale = ref(0)
    const modification = ref(0)
    const modelCar = ref([])
    const color = ref(0)
    const AFKcar = ref()
    return { brand, models, model, modification, color, modelSale, modelCar, AFKcar }
});