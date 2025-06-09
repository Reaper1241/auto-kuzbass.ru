<script setup>
const emits = defineEmits(['closeModal']);
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
                    </div>
                    <div class="modal__body">
                        <img :src="`/pdf/${$route.params.brand}.webp`" alt="pdf" class="modal__pdf" />
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
            width: 100%;
            justify-items: start;
        }
    }
}

.modal__wrapper {
    padding: 40px;
    max-height: 90vh;
    width: 100%;

    @media screen and (max-width: 768px) {
        padding: 30px 20px;
    }

    @media screen and (max-width: 440px) {
        padding: 20px 20px;
    }

    .modal__body {
        width: 100%;
        height: 100%;

        .modal__pdf {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .modal__params-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;

        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: 440px) {
            grid-template-columns: 1fr;
        }

        .modal__params-item {
            padding: 10px;

            @media screen and (max-width: 768px) {
                font-size: var(--standart-size);
            }

            .modal__params-title {
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