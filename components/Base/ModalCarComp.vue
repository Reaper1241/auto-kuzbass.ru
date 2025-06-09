<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const emits = defineEmits(['closeModal']);

const props = defineProps({
    comp: Object,
})

function closeModal() {
    showData.value = false
    emits('closeModal')
}

const showData = ref(false)
watch(() => props.comp, () => {
    setTimeout(() => {
        showData.value = true
    }, 1)
})
</script>

<template>
    <div class="modal" @click.self="closeModal()">
        <div class="modal__dialog">
            <div class="modal__content" :class="{ 'active': showData }">
                <button class="modal__close" type="button" @click="closeModal()">
                    <span class="close__text">Закрыть</span>
                </button>

                <div class="modal__wrapper">
                    <div class="modal__header">
                        <div class="modal__title">
                            {{ cleanUpTitle(comp.title) }}
                        </div>
                    </div>
                    <div class="modal__body">
                        <ul v-htmlSanitizer="comp.text" class="param-list"></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal {
    overflow-y: hidden;

    .modal__dialog {
        align-items: end;
        margin-bottom: 0;
        height: 100vh;
        padding: 0;

        .modal__content {
            grid-template-columns: 1fr;
            width: 100%;
            justify-items: start;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            transform: translateY(100%);
            transition: 0.3s;
        }

        .active.modal__content {
            transform: translateY(0);
            transition: 0.3s;
        }
    }
}

.modal__wrapper {
    padding: 40px 35px 50px 35px;
    width: 100%;
    max-height: 100vh;

    .modal__body {
        max-height: 100vh;
        overflow: scroll;
        padding-right: 10px;

        .param-list {
            list-style: disc;
            padding-left: 25px;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
    }
}
</style>