import { defineStore } from 'pinia';

export const useNewCarStore = defineStore("newCarStore", () => {
    const car = ref([])
    const carData = computed(() => car.value)
    const galleries = ref([])

    // Добавляем поле для выбранной машины (для формы)
    const selectedCar = ref(null)

    return { car, carData, galleries, selectedCar }
});