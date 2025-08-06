<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const isOpen = ref(false)

const props = defineProps({
    car: {
        type: Object,
        default: null,
    },
    btnLabel: {
        type: String,
        default: '',
    },
    appType: {
        type: Number,
        default: 3,
    },
    modalTitle: {
        type: String,
        default: 'Купить в кредит',
    },
    btnIcon: {
        type: String,
        default: '',
    },
    btnClass: {
        type: String,
        default: '',
    },
    btnMobileIcon: {
        type: String,
        default: '',
    },
    modalType: {
        type: String,
        default: 'formModal',
    },
    comp: {
        type: Object,
        default: null,
    },
    category: {
        type: String,
    },
    modalDescription: {
        type: String,
    }
})

function modalShow() {
    isOpen.value = !isOpen.value
    appStore.modalShown = !appStore.modalShown

    if (isOpen.value) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }
}
</script>

<template>
    <BaseButton class="button-modal" :icon="btnIcon" :label="btnLabel" :class="btnClass" :mobileIcon="btnMobileIcon"
        @click="modalShow(), car ? yandexEcommerce('add', car) : null" />
    <Teleport to="body">
        <div v-if="isOpen">
            <BaseModalComp @closeModal="modalShow()" v-if="modalType == 'modalComp'" :comp="comp" :car="car"
                :category="category" />
            <BaseModalPB1 @closeModal="modalShow()" v-else-if="modalType == 'pb1'" />
            <BaseModal :modalTitle="modalTitle" :appType="appType" :car="car" @closeModal="modalShow()"
                :category="category" :description="modalDescription" v-else />
        </div>
    </Teleport>
</template>

<style lang="scss" scoped></style>