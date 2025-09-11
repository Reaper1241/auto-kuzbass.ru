<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const emits = defineEmits(['closeModal']);

const props = defineProps({
    comp: Object,
    car: Object
})
</script>

<template>
    <div class="modal" @click.self="emits('closeModal')">
        <div class="modal__dialog">
            <div class="modal__content">
                <button class="modal__close" type="button" @click="emits('closeModal')">
                    <span class="close__text">Закрыть</span>
                </button>

                <div class="modal__wrapper">
                    <div class="modal__header">
                        <div class="modal__title">
                            Комплектации {{ cleanUpTitle(comp.complectation) }}
                        </div>
                    </div>

                    <!-- сетка с двумя колонками -->
                    <div class="modal__params-grid">
                        <!-- левая колонка -->
                        <div class="modal__params-list">
                            <div class="modal__params-item" v-if="comp.interior">
                                <div class="modal__params-title">Интерьер</div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.interior"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.exterior">
                                <div class="modal__params-title">Экстерьер</div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.exterior"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.safety">
                                <div class="modal__params-title">Безопасность</div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.safety"></div>
                            </div>
                        </div>

                        <!-- правая колонка -->
                        <div class="modal__params-list">
                            <div class="modal__params-item" v-if="comp.comfort">
                                <div class="modal__params-title">Комфорт</div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.comfort"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.сar_theft_protection">
                                <div class="modal__params-title">Защита от краж</div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.сar_theft_protection"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.overview">
                                <div class="modal__params-title">Обзор</div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.overview"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.multimedia">
                                <div class="modal__params-title">Мультимедиа</div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.multimedia"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.complectation_attributes">
                                <div class="modal__params-title">Остальное</div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.complectation_attributes"></div>
                            </div>

                            <!-- форма сразу под правой колонкой -->
                            <div class="modal__form">
                                <FormModalComp :appType="6" :car="car" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal {
    .modal__dialog {
        .modal__content {
            grid-template-columns: 1fr;
            max-width: 1000px;
            justify-items: start;
        }
    }
}
:deep(.modal__form){
    width: 100% !important;
    padding: 0px !important;
}
.modal__wrapper {
    padding: 40px;
    width: 100%;

    @media screen and (max-width: 768px) {
        padding: 30px 20px;
    }

    @media screen and (max-width: 440px) {
        padding: 20px 20px;
    }
}

.modal__params-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    width: 100%;

    @media screen and (max-width: 767px) {
        grid-template-columns: 1fr; // на мобилке в один столбец
    }
}

.modal__params-list {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .modal__params-item {
        padding: 10px;

        @media screen and (max-width: 768px) {
            font-size: var(--standart-size);
            padding: 0;
        }

        .modal__params-title {
            margin-bottom: 5px;
            font-weight: 500;
        }

        .modal__params-value {
            margin-left: 20px;

            li {
                list-style: disc;
            }
        }
    }
}

.modal__form {
    margin-top: 20px;
}
</style>
