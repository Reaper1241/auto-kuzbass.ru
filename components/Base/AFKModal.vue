<script setup>
import { useIdle, useTimestamp } from '@vueuse/core'
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const props = defineProps({
    car: {
        type: Object,
        default: null,
    },
    btnLabel: {
        type: String,
        default: 'Купить в кредит',
    },
    appType: {
        type: Number,
        default: 3,
    },
    modalTitle: {
        type: String,
        default: 'Купить в кредит',
    },
    modalSubTitle: {
        type: String,
        default: '',
    }
})

const { idle, lastActive } = useIdle(55000) // Афк модалка появится через 55 секунд useIdle(55000) /
const now = useTimestamp({ interval: 1000 })
const idledFor = computed(() => Math.floor((now.value - lastActive.value) / 1000))

watch(idle, (idle) => {
    if (idle && appStore.firstCar && !appStore.modalShown && !appStore.onceShown) {
        appStore.onceShown = true
        modalShow()
    }
})

const isOpen = ref(false);
function modalShow() {
    isOpen.value = !isOpen.value
    appStore.modalShown = !appStore.modalShown
}
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen">
            <BaseModal :modalTitle="modalTitle" :modalSubTitle="modalSubTitle" :appType="appType"
                :car="appStore.firstCar" @closeModal="modalShow()" />
        </div>
    </Teleport>
</template>

<style lang="scss" scoped></style>