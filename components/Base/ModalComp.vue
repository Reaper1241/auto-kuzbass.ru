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
                    <div class="modal__body">
                        <div class="modal__params-list">
                            <div class="modal__params-item" v-if="comp.interior">
                                <div class="modal__params-title">
                                    Интерьер
                                </div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.interior"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.exterior">
                                <div class="modal__params-title">
                                    Экстерьер
                                </div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.exterior"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.safety">
                                <div class="modal__params-title">
                                    Безопасность
                                </div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.safety"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.comfort">
                                <div class="modal__params-title">
                                    Комфорт
                                </div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.comfort"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.сar_theft_protection">
                                <div class="modal__params-title">
                                    Защита от краж
                                </div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.сar_theft_protection"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.overview">
                                <div class="modal__params-title">
                                    Обзор
                                </div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.overview"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.multimedia">
                                <div class="modal__params-title">
                                    Мултимедиа
                                </div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.multimedia"></div>
                            </div>

                            <div class="modal__params-item" v-if="comp.complectation_attributes">
                                <div class="modal__params-title">
                                    Остальное
                                </div>
                                <div class="modal__params-value" v-htmlSanitizer="comp.complectation_attributes"></div>
                            </div>
                        </div>

                        <FormModalComp :appType="6" :car="car" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.button {
    display: grid;
    grid-template-columns: 1fr max-content;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        .button-buy {
            opacity: 0.7;
            transition: 0.3s;
        }
    }

    .button-price {
        padding: 15px 15px;
        border-bottom: 2px solid var(--border-color);
        border-top: 2px solid var(--border-color);
        border-left: 2px solid var(--border-color);
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: 400px) {
            padding: 15px 10px;
        }
    }
}

.card__btn {
    font-weight: 700;
    font-size: var(--standart-size);
    line-height: 16px;
    border-radius: 6px;
    width: 100%;
    height: 40px;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
}

.credit__button {
    background: var(--yellow);
    position: relative;
    overflow: hidden;
}

.row__credit-btn {
    padding: 9px 5px;
    max-width: 256px;
    width: 100%;
    background: var(--orange);
    border-radius: 4px;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #ffffff;

    @media screen and (max-width: 767px) {
        display: none;
        position: absolute;
        left: 0;
        opacity: 0;
        max-width: calc(100% - 40px);
        height: 100%;
    }
}

.modal__month-price {
    text-align: center;
    margin-top: 5px;
}

.modal {
    .modal__dialog {
        .modal__content {
            grid-template-columns: 1fr;
            max-width: 1000px;
            justify-items: start;
        }
    }
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

    .modal__params-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
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
                margin-bottom: 5px;
            }

            .modal__params-value {
                margin-left: 20px;

                li {
                    list-style: disc;
                }
            }
        }
    }
}
</style>