<script setup>
import { useNewCarStore } from '/stores/NewCarStore.js'
const carStore = useNewCarStore()

const complectation = computed(() => carStore.car.complectation)
const currentComp = ref({})
const allowModal = ref(false)

onMounted(() => {
    const deviceWidth = window.innerWidth;
    deviceWidth < 768 ? allowModal.value = true : allowModal.value = false
})

const showModal = ref(false)
function setModalData(text, title) {
    if (!allowModal.value) return
    currentComp.value = {
        title: title,
        text: text
    }
    openModal()
}

function openModal() {
    showModal.value = !showModal.value
    document.body.style.overflow = showModal.value ? 'hidden' : 'auto'
}

const show = ref(false)
</script>

<template>
    <section class="complectation section"
        v-if="complectation.overview || complectation.interior || complectation.exterior || complectation.multimedia || complectation.safety || complectation.comfort || complectation.сar_theft_protection">
        <div class="container">
            <div class="section__header">
                <BaseSectionTitle :title="`Комплектация ${complectation.complectation}`" />
            </div>

            <div class="complectation__content">
                <div class="complectation__wrapper" :class="{ 'active': show }">
                    <div class="complectation__column">
                        <div class="complectation__item" v-if="complectation.overview"
                            @click="setModalData(complectation.overview, 'Обзор')">
                            <div class="complectation__item-title">Обзор</div>
                            <div class="complectation__item-text" v-htmlSanitizer="complectation.overview" />
                            <div class="complectation__item-count">
                                {{ complectation.overview.split('</li>').filter(Boolean).length }}
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>

                        <div class="complectation__item" v-if="complectation.interior"
                            @click="setModalData(complectation.interior, 'Интерьер')">
                            <div class="complectation__item-title">Интерьер</div>
                            <div class="complectation__item-text" v-htmlSanitizer="complectation.interior" />
                            <div class="complectation__item-count">
                                {{ complectation.interior.split('</li>').filter(Boolean).length }}
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>

                        <div class="complectation__item" v-if="complectation.exterior"
                            @click="setModalData(complectation.exterior, 'Экстерьер')">
                            <div class="complectation__item-title">Экстерьер</div>
                            <div class="complectation__item-text" v-htmlSanitizer="complectation.exterior" />
                            <div class="complectation__item-count">
                                {{ complectation.exterior.split('</li>').filter(Boolean).length }}
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>

                        <div class="complectation__item" v-if="complectation.multimedia"
                            @click="setModalData(complectation.multimedia, 'Мультимедиа')">
                            <div class="complectation__item-title">Мультимедиа</div>
                            <div class="complectation__item-text" v-htmlSanitizer="complectation.multimedia" />
                            <div class="complectation__item-count">
                                {{ complectation.multimedia.split('</li>').filter(Boolean).length }}
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>

                    <div class="complectation__column">
                        <div class="complectation__item" v-if="complectation.safety"
                            @click="setModalData(complectation.safety, 'Безопасность')">
                            <div class="complectation__item-title">Безопасность</div>
                            <div class="complectation__item-text" v-htmlSanitizer="complectation.safety" />
                            <div class="complectation__item-count">
                                {{ complectation.safety.split('</li>').filter(Boolean).length }}
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>

                        <div class="complectation__item" v-if="complectation.comfort"
                            @click="setModalData(complectation.comfort, 'Комфорт')">
                            <div class="complectation__item-title">Комфорт</div>
                            <div class="complectation__item-text" v-htmlSanitizer="complectation.comfort" />
                            <div class="complectation__item-count">
                                {{ complectation.comfort.split('</li>').filter(Boolean).length }}
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>

                        <div class="complectation__item" v-if="complectation.сar_theft_protection"
                            @click="setModalData(complectation.сar_theft_protection, 'Защита от угона')">
                            <div class="complectation__item-title">Защита от угона</div>
                            <div class="complectation__item-text"
                                v-htmlSanitizer="complectation.сar_theft_protection" />
                            <div class="complectation__item-count">
                                {{ complectation.сar_theft_protection.split('</li>').filter(Boolean).length }}
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="show-more" @click="show = !show">
                    {{ show ? 'Скрыть опции' : 'Показать все опции' }}
                </div>
            </div>
        </div>

        <Teleport to="body">
            <BaseModalCarComp :comp="currentComp" @closeModal="openModal" v-show="showModal" />
        </Teleport>
    </section>
</template>


<style lang="scss" scoped>
.complectation_header {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;

    .complectation__header-item {
        font-size: var(--large-size);
        font-weight: 600;
        line-height: normal;
        background: #eeeeee;
        padding: 8px 14px;
        border-radius: 20px;
        cursor: pointer;
        opacity: 0.4;
        transition: 0.3s;
        position: relative;

        i {
            position: absolute;
            bottom: -10px;
            color: #eeeeee;
            left: 50%;
            transform: translateX(-50%);
            font-size: 25px;
        }
    }

    .active {
        opacity: 1;
        transition: 0.3s;
    }
}

.complectation__content {
    .show-more {
        cursor: pointer;
        padding: 15px 0;
        border-radius: 20px;
        background: #eeeeee;
        width: fit-content;
        font-size: 18px;
        font-weight: 500;
        width: 280px;
        text-align: center;
        transition: 0.3s;
        margin-top: 15px;

        &:hover {
            opacity: 0.7;
            transition: 0.3s;
        }

        @media screen and (max-width: 768px) {
            display: none;
        }
    }

    .complectation__wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: auto;
        gap: 20px;

        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr;
            gap: 0;
        }

        @media screen and (min-width: 768px) {
            height: 175px;
            overflow: hidden;
            transition: 0.3s;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 30px;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
            }
        }
    }

    .complectation__wrapper.active {
        @media screen and (min-width: 768px) {
            height: auto;
            transition: 0.3s;

            &::after {
                display: none;
            }
        }
    }

    .complectation__column {
        display: flex;
        flex-direction: column;
        gap: 15px;

        @media screen and (max-width: 768px) {
            gap: 0;
        }
    }

    .complectation__item {
        padding: 10px;

        .complectation__item-title {
            font-weight: bold;
            margin-bottom: 10px;

            @media screen and (max-width: 768px) {
                margin: 0;
                font-weight: 500;
            }
        }

        .complectation__item-count {
            display: none;

            @media screen and (max-width: 768px) {
                display: block;
            }
        }

        @media screen and (max-width: 768px) {
            flex-basis: 100%;
            padding: 10px 0;
            gap: 10px;
            justify-content: space-between;
            display: flex;

            .complectation__item-text {
                display: none;
            }

            .fa-chevron-right {
                font-size: 14px;
                color: var(--main-color);
                margin-left: 5px;
            }
        }
    }
}
</style>