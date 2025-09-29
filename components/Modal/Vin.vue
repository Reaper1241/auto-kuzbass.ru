<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const isOpen = ref(false);
const loading = ref(true);

const props = defineProps({
    carInfo: Object,
    class: String
})

function modalShow() {
    isOpen.value = !isOpen.value
    appStore.modalShown = !appStore.modalShown
    if (isOpen.value) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }

    setTimeout(() => {
        loading.value = false
    }, 3500)
}
</script>

<template>
    <div class="car-card__vin" @click="modalShow()" :class="class">VIN {{ props.carInfo.vin }} <span>Проверен</span>
    </div>

    <div class="modal" v-if="isOpen" @click.self="modalShow()">
        <div class="modal__dialog">

            <div class="modal__content loading" v-if="loading">
                <div class="loader"></div>
                <div class="loader-text">Загрузка базы данных...</div>
                <div class="close__modal-wrapper">
                    <button class="close__modal" type="button" @click="modalShow()">Закрыть</button>
                </div>
            </div>

            <div class="modal__content vin__modal" v-else>
                <div class="modal__data">
                    <div class="close__modal-wrapper">
                        <button class="close__modal" type="button" @click="modalShow()">Закрыть</button>
                    </div>
                    <h2 class="modal__title">Отчет от {{ getCurrentData() }}</h2>
                    <div class="modal__head">
                        <div class="modal__head-image">
                            <NuxtImg lazy format="webp" quality="90" :src="`${props.carInfo.images[0].url}`" alt="Vector" />
                        </div>
                        <div class="modal__head-info">
                            <h3 class="modal__subtitle">
                                Технические характеристики:
                            </h3>
                            <ul class="modal__params-list">
                                <li class="modal__params-item">
                                    <span class="modal__param-name">VIN:</span>
                                    <span class="modal__param-value">{{ props.carInfo.vin }}</span>
                                </li>
                                <li class="modal__params-item">
                                    <span class="modal__param-name">№ кузова:</span>
                                    <span class="modal__param-value">{{ props.carInfo.vin }}</span>
                                </li>
                                <li class="modal__params-item">
                                    <span class="modal__param-name">Тип ТС:</span>
                                    <span class="modal__param-value">{{ props.carInfo.modification.body }}</span>
                                </li>
                                <li class="modal__params-item">
                                    <span class="modal__param-name">Объём двc:</span>
                                    <span class="modal__param-value">{{ props.carInfo.modification.engine_size }}
                                        л.</span>
                                </li>
                                <li class="modal__params-item">
                                    <span class="modal__param-name">Последний пробег:</span>
                                    <span class="modal__param-value">{{ makeSpaces(props.carInfo.mileage) }}
                                        км.</span>
                                </li>
                                <li class="modal__params-item">
                                    <span class="modal__param-name">Госномер:</span>
                                    <span class="modal__param-value">Не указан</span>
                                </li>
                                <li class="modal__params-item">
                                    <span class="modal__param-name">Год выпуска:</span>
                                    <span class="modal__param-value">{{ props.carInfo.year }}</span>
                                </li>
                                <li class="modal__params-item">
                                    <span class="modal__param-name">Цвет:</span>
                                    <span class="modal__param-value">{{ props.carInfo.color }}</span>
                                </li>
                                <li class="modal__params-item">
                                    <span class="modal__param-name">Мощность:</span>
                                    <span class="modal__param-value">{{ props.carInfo.modification.power }} л.с.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal__main">
                        <ul class="modal__vin-list">
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Не найдены ограничения на регистрацию
                                </div>
                                <div class="modal__vin-value">
                                    Запрет регистрационных действий на машину накладывается, если у автовладельца
                                    есть неоплаченные штрафы и налоги, либо если имущество стало предметом спора.
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Нет сведений о розыске
                                </div>
                                <div class="modal__vin-value">
                                    Покупка разыскиваемого автомобиля грозит тем, что его отберут в ГИБДД при
                                    регистрации, и пока будет идти следствие, а это может затянуться на долгий срок,
                                    автомобиль будет стоять на штрафплощадке.
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Залог не найден
                                </div>
                                <div class="modal__vin-value">
                                    Мы проверили базы данных Федеральной нотариальной палаты (ФНП) и Национального бюро
                                    кредитных историй (НБКИ).
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    {{ props.carInfo.owner_count_id == 1 ? '1 владелец'
                                        : props.carInfo.owner_count_id == 2 ?
                                            '2 владелеца' : props.carInfo.owner_count_id == 3 ? '3 и более владельцев' :
                                                'Нет владельцев' }} по ПТС
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    ДТП не найдены
                                </div>
                                <div class="modal__vin-value">
                                    В отчёт не попадут аварии, которые произошли раньше 2015 года или не оформлялись в
                                    ГИБДД.
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Не найдены расчёты стоимости ремонта
                                </div>
                                <div class="modal__vin-value">
                                    Мы проверяем, во сколько эксперты страховых компаний оценили восстановление
                                    автомобиля после ДТП. Расчёт не означает, что машину ремонтировали.
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Не найдено разрешение на работу в такси
                                </div>
                                <div class="modal__vin-value">
                                    Данные представлены из региональных баз по регистрации автомобиля в качестве такси.
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Не найдены сведения об использовании в каршеринге
                                </div>
                                <div class="modal__vin-value">
                                    На каршеринговых авто ездят практически круглосуточно. Они много времени проводят в
                                    пробках — от этого двигатель и сцепление быстро изнашиваются. Салон тоже страдает от
                                    большого количества водителей и пассажиров.
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Не найдены сведения о диагностике
                                </div>
                                <div class="modal__vin-value">
                                    В блоке представлены данные по оценке состояния автомобиля по результатам офлайн
                                    диагностики. В ходе диагностики специалисты проверяют состояние ЛКП, всех
                                    конструкций автомобиля, состояние салона, фактическую комплектацию и проводят
                                    небольшой тест-драйв.
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Не найдены сведения о техосмотрах
                                </div>
                                <div class="modal__vin-value">
                                    В данном блоке отображаются данные о прохождении техосмотра на основании данных
                                    диагностических карт ТС. Срок прохождения технического осмотра для автомобилей
                                    категории «B»: — первые четыре года — не требуется; — возраст от 4 до 10 лет —
                                    каждые 2 года; — старше 10 лет — ежегодно.
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Нет сведений о ввозе из-за границы
                                </div>
                                <div class="modal__vin-value">
                                    Данные из таможенной декларации, которую заполняет компания, осуществляющая ввоз
                                    транспортного средства на территорию РФ.
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Нет полиса ОСАГО
                                </div>
                            </li>
                            <li class="modal__vin-item">
                                <div class="modal__vin-name">
                                    <div class="modal__vin-icon">
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                    Не найдены сведения об отзывных кампаниях
                                </div>
                                <div class="modal__vin-value">
                                    Для данного автомобиля не проводилось или нет действующих отзывных кампаний. Отзыв
                                    автомобиля представляет собой устранение выявленного брака. Практически все
                                    автомобильные производители периодически отзывают свои продукты для устранения
                                    дефектов.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.close__modal {
    color: var(--main-black);
    position: absolute;
    left: 20px;
    top: 15px;
    padding: 10px 15px;
    background: var(--light-grey);
    border-radius: 20px;
    font-size: var(--standart-size);
    cursor: pointer;
}

.car-card__vin {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    padding: 15px 20px;
    border-radius: 20px;
    color: var(--main-black);
    font-weight: bold;
    font-size: var(--standart-size);
    background: var(--light-grey);
    cursor: pointer;
    border: 4px solid var(--light-grey);
    transition: 0.3s;

    &:hover {
        background: transparent;
        border: 4px solid var(--light-grey);
        transition: 0.3s;
    }

    span {
        font-size: var(--standart-size);
        padding: 5px 10px;
        border: 2px solid var(--secondary-color);
        border-radius: 20px;
        color: var(--bg-light);
        background: var(--secondary-color);
        font-weight: 600;
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
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1055;
    display: block;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: grid;
    overflow-y: auto;
    outline: 0;
    grid-template-columns: 1fr 1fr 2fr;

    @media screen and (max-width: 767px) {
        grid-template-columns: 1fr;
    }

    .modal__dialog {
        grid-column: 3;
        height: 100%;
        position: relative;
        width: 100%;
        max-width: 100%;
        pointer-events: none;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 0 auto;
        -webkit-transition: -webkit-transform 0.3s ease-out;
        transition: -webkit-transform 0.3s ease-out;
        -o-transition: transform 0.3s ease-out;
        transition: transform 0.3s ease-out;
        transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
        background: transparent;

        padding: 0;

        @media screen and (max-width: 767px) {
            grid-column: 1;
        }

        .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 30px;
        }

        .modal__content {
            position: relative;
            width: 100%;
            pointer-events: auto;
            background: #fff;
            border-radius: 20px;
            padding: 80px 25px 0 25px;
            margin: 0;
            height: 100vh;
            overflow: scroll;

            .modal__data {
                height: 100%;
                overflow: auto;
                padding-right: 20px;

                .modal__title {
                    text-align: center;
                    width: auto;
                    margin-bottom: 30px;
                }

                .modal__head {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 30px;
                    margin-bottom: 30px;

                    @media screen and (max-width: 1700px) {
                        grid-template-columns: 1fr;
                    }

                    .modal__subtitle {
                        font-size: 18px;
                        font-weight: normal;
                        margin-bottom: 15px;
                    }

                    .modal__params-list {
                        display: grid;
                        row-gap: 10px;
                        column-gap: 20px;
                        grid-template-columns: 1fr 1fr;

                        @media screen and (max-width: 1200px) {
                            grid-template-columns: 1fr;
                        }


                        .modal__params-item {
                            display: inline-flex;
                            gap: 10px;
                            align-items: center;

                            @media screen and (max-width: 1200px) {
                                justify-content: space-between;
                            }

                            .modal__param-name {
                                opacity: 0.6;
                            }
                        }
                    }

                    .modal__head-image img {
                        width: 100%;
                        object-fit: contain;
                        overflow: hidden;
                        border-radius: 20px;
                    }
                }

                .modal__main {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;

                    .modal__vin-list {
                        display: flex;
                        flex-direction: column;
                        gap: 35px;
                        padding-bottom: 30px;

                        .modal__vin-item {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;

                            .modal__vin-name {
                                display: flex;
                                gap: 10px;
                                align-items: center;
                                font-size: 18px;

                                .modal__vin-icon {
                                    display: inline-block;
                                    background: #36B555;
                                    min-width: 30px;
                                    height: 30px;
                                    border-radius: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: 30px;
                                    color: white;

                                    i {
                                        font-size: 16px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .modal__close {
                left: 30px;
            }

            .loader-text {
                font-size: var(--big-size);
            }
        }

        .vin__modal {
            display: grid;
            grid-template-columns: 1fr;

            .modal__title {
                color: var(--main-black);
            }
        }
    }
}

.loader {
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background:
        linear-gradient(#CC333F 0 0),
        linear-gradient(#CC333F 0 0),
        linear-gradient(#CC333F 0 0),
        linear-gradient(#CC333F 0 0),
        linear-gradient(var(--main-color) 0 0),
        linear-gradient(var(--main-color) 0 0),
        linear-gradient(var(--main-color) 0 0),
        linear-gradient(var(--main-color) 0 0),
        #CC333F;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-repeat: no-repeat;
    animation: l16 2s infinite;
}

@keyframes l16 {
    0% {
        background-size: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0
    }

    12.5% {
        background-size: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 51% 51%
    }

    25% {
        background-size: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 51% 51%, 51% 51%
    }

    37.5% {
        background-size: 0 0, 0 0, 0 0, 0 0, 0 0, 51% 51%, 51% 51%, 51% 51%
    }

    50% {
        background-size: 0 0, 0 0, 0 0, 0 0, 51% 51%, 51% 51%, 51% 51%, 51% 51%
    }

    62.5% {
        background-size: 0 0, 0 0, 0 0, 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%
    }

    75% {
        background-size: 0 0, 0 0, 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%
    }

    87.5% {
        background-size: 0 0, 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%
    }

    100% {
        background-size: 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%, 51% 51%
    }
}
</style>