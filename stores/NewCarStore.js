import { defineStore } from 'pinia';

export const useNewCarStore = defineStore("newCarStore", () => {
    const car = ref([])
    const carData = computed(() => car.value)
    const galleries = ref([])

    return { car, carData, galleries }
});