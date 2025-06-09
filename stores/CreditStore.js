import { defineStore } from 'pinia';
import { useAppStore } from '/stores/AppStore.js'

export const useCreditStore = defineStore("creditStore", () => {
    const appStore = useAppStore();

    const category = ref('new');
    const isOpen = ref(false);
    const carNew = ref();

    function modalShow() {
        isOpen.value = !isOpen.value
        appStore.modalShown = !appStore.modalShown

        if (isOpen.value) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }

    return { category, isOpen, modalShow, carNew }
});