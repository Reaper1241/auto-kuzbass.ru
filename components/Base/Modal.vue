<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const emits = defineEmits(['closeModal'])

const props = defineProps({
    modalType: String,
    car: Object,
    class: String,
    modalTitle: String,
    modalSubTitle: String,
    showModal: Boolean,
    callback: Function,
    appType: Number,
    category: String,
    description: String,
    isAfk: { type: Boolean, default: false } // флаг AFK
})

document.body.style.overflow = 'hidden'

function closeModal() {
    document.body.style.overflow = 'auto'
    emits('closeModal')
}

function handleClose() {
    closeModal()
    if (props.car && !props.isAfk) {
        yandexEcommerce('remove', props.car)
    }
}
</script>

<template>
    <div class="modal" @click.self="handleClose">
        <div class="modal__dialog" :class="car && appType == 2 ? '__car' : ''">
            <div class="modal__content" :class="car && appType == 2 ? '__car' : ''">
                <button class="modal__close" type="button" @click="handleClose">
                    <span class="close__text">Закрыть</span>
                </button>

                <div class="modal__car">
                    <div class="modal__photo-wrapper"
                        :class="!car && !car?.images?.length && !car?.preview ? 'default' : ''">

                        <img class="modal__photo" :class="'new'" :src="`${car.images[0]?.url ? car.images[0].url : ''}`"
                            :alt="'Заявка на кредит ' + cleanUpTitle(car?.model, car?.brand)"
                            v-if="car && car?.images?.length" />

                        <img class="modal__photo preview" :src="car?.preview" alt="Модальное окно"
                            v-else-if="car && car.preview" />

                        <img class="modal__photo default" src="/images/modalDefault.webp" alt="Модальное окно" v-else />

                        <div class="modal__description" v-if="description" v-htmlSanitizer="description" />

                        <div class="stickers" v-if="car">
                            <div class="sticker sale">
                                <i class="fa-solid fa-calendar-days"></i>
                                До {{ getSaleDate() }}: от {{ car.min_price ?
                                    makeSpaces(car.min_price - car.sale) :
                                    makeSpaces(car.price - car.sale) }} руб.
                            </div>
                            <div class="sticker">
                                <i class="fa-solid fa-car"></i>
                                от {{ makeSpaces(appStore.calcMonthPrice(car)) }} руб/мес.
                            </div>
                            <div class="sticker credit">
                                <i class="fa-solid fa-rotate"></i>
                                Доступно в трейд-ин
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal__form">
                    <h2 class="modal__title" v-if="modalTitle">{{ modalTitle }}</h2>
                    <h3 class="modal__subtitle" v-if="modalSubTitle" v-html="modalSubTitle"></h3>
                    <FormModalCredit :car="car" :appType="appType" @formSend="emits('closeModal')"
                        v-if="car && appType == 2" :category="category" />
                    <FormModal :car="car" :appType="appType" @formSend="emits('closeModal')" v-else :category="category" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal__photo-wrapper{
    @media screen and (max-width: 500px) {
        display: none;;
    }
}
.button-buy {
    color: var(--bg-light);
    background: var(--secondary-color);
    height: 100%;
    border-radius: 20px;
    font-weight: bold;
    border: 3px solid var(-green);
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 14px;

    .button__icon {
        margin-right: 10px;
    }
}

.button-buy.callback {
    background: linear-gradient(90deg, #8D171C 0%, #EC2830 100%);
}

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


</style>