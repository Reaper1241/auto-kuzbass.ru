import { defineStore } from 'pinia';

export const useCarStore = defineStore("carStore", () => {
  const car = ref([])
  const carData = computed(() => car.value)

  return { car, carData }
});