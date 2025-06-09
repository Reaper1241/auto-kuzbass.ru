<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const modList = computed(() => newStore.model.modifications?.filter((mod) => mod.car_complectations.length))
newStore.modification = modList.value?.[0]?.id

const currentMod = computed(() => findMod(newStore.modification, newStore.model.modifications))

const selectedCar = ref({
    mod: modList.value?.[0],
    comp: modList.value?.[0]?.car_complectations?.[0]
});

const loading = ref(true);
onMounted(() => {
    loading.value = false
})

const currentModel = computed(() => newStore.model)
const show = ref(0);
</script>

<template>
    <section class="model-finance">
        <div class="container">
            <ClientOnly v-if="!loading">
                <div class="model-finance__wrapper">
                    <div class="model-finance__body">
                        <div class="model-finance__title">
                            {{ cleanUpTitle($route.params.brand).toUpperCase() }} Finance
                        </div>
                        <FormModel :model="newStore.model" :modification="currentMod" category="new" />
                    </div>
                    <div class="model-finance__header section__header">
                        <div class="model-finance__info">
                            <p class="finance__content-text">
                                <span class="main__span">{{ cleanUpTitle($route.params.brand).toUpperCase() }}
                                    Finance</span> – это выгодная кредитная
                                программа, позволяющая нашим клиентам реализовать мечту об автомобиле. Предлагаемые
                                процентные ставки начинаются всего от <b>{{ appStore.creditPercent }}%</b>, а
                                ежемесячные
                                платежи установлены на минимальном уровне. Процесс оформления кредита сделан простым и
                                оперативным, с возможностью получения кредита в тот же день. Программа создана дилерским
                                центром <b>{{ appStore.sitename }}</b> при поддержке таких банков, как "ЛокоБанк",
                                "Альфа-Банк" и
                                "СовкомБанк".
                            </p>
                        </div>
                        <div class="model-finance__info">
                            <h3 class="finance__content-title">
                                Льготные условия
                            </h3>
                            <p class="finance__content-text">
                                Программа Finance стремится предоставить каждому клиенту минимально возможные процентные
                                ставки и низкие ежемесячные платежи. Благодаря её гибкости, автокредит доступен широкому
                                кругу клиентов на самых привлекательных условиях.
                            </p>
                            <h3 class="finance__content-title">
                                Без первоначального взноса
                            </h3>
                            <p class="finance__content-text">
                                Для получения кредита не требуется первоначальный взнос, что является уникальным
                                предложением по сравнению с большинством банков. Автоцентр <b>«{{ appStore.sitename
                                    }}»</b>
                                предлагает своим клиентам первый взнос в виде беспроцентной рассрочки.
                            </p>
                            <h3 class="finance__content-title">
                                Скидки и подарки
                            </h3>
                            <p class="finance__content-text">
                                При оформлении автокредита по программе Finance вы получите значительную <b>скидку в
                                    размере 10%</b> на выбранный автомобиль, а также возможность выбора одного из трёх
                                <b>подарков</b>: страхование КАСКО/ОСАГО, зимние шины или автомобильный коврик.
                            </p>
                            <div class="model-finance__car">
                                <div class="view__col">
                                    <div class="view__row" v-if="currentMod.max_speed">
                                        <img src="/svg/speedometer1.svg" alt="icon" />
                                        <p>
                                            {{ currentMod.max_speed }}
                                            км/ч<br />
                                            <span>скорость</span>
                                        </p>
                                    </div>
                                    <div class="view__row" v-if="currentMod.power">
                                        <img src="/svg/speed1.svg" alt="icon" />
                                        <p>
                                            {{ currentMod.power }}
                                            л.с.<br />
                                            <span>мощность</span>
                                        </p>
                                    </div>
                                    <div class="view__row" v-if="currentMod.from_0_to_100">
                                        <img src="/svg/car-engine1.svg" alt="icon" />
                                        <p>
                                            {{ currentMod.from_0_to_100 }}
                                            сек.<br />
                                            <span>разгон</span>
                                        </p>
                                    </div>
                                    <div class="view__row" v-if="currentMod.consumption_combine">
                                        <img src="/svg/gasoline-pump1.svg" alt="icon" />
                                        <p>
                                            {{ currentMod.consumption_combine }}
                                            л./100 км<br />
                                            <span>расход</span>
                                        </p>
                                    </div>
                                </div>
                                <NuxtImg lazy format="webp" quality="90" loading="lazy"
                                    :src="currentModel.colored_galleries[newStore.color]?.url" alt="icon"
                                    class="complectations__item-img" v-if="currentModel.colored_galleries.length" />
                            </div>
                        </div>
                    </div>
                </div>
            </ClientOnly>

            <div class="model-finance__wrapper" v-else>
                <div class="model-finance__header section__header">
                    <div class="skeleton text" />
                </div>

                <div class="model-finance__body">
                    <div class="skeleton image" />
                    <div class="skeleton text" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.model-finance {
    // background: var(--bg-color);
    scroll-margin-top: 80px;
    // margin: 20px 0;
    border: 1px solid var(--main-color);
    border-left: none;
    border-right: none;
    padding: 20px;
    margin-top: 20px;
    @media screen and (max-width: 540px) {
        padding: 15px 0px;
    }

    .model-finance__wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        .model-finance__body {
            padding: 30px;
            margin-right: 10px;
            border-radius: 4px;
            border: 1px solid var(--main-color);
            @media screen and (max-width: 768px) {
                margin-left: 0;
                padding: 30px;
            }

            @media screen and (max-width: 540px) {
                padding: 25px 15px;
                width: 100%;
                
            }

            .model-finance__title {
                font-weight: 600;
                font-size: 20px;
                line-height: normal;
                margin-bottom: 25px;
            }
        }

        .model-finance__header {
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 10px;

            .model-finance__car {
                display: flex;
                align-items: center;
                justify-content: center;
                // flex-direction: column;
                margin: 20px 0;
                // border: var(--border);
                // border-radius: var(--border-radius);
                // padding: 30px 15px;
                gap: 30px;

                @media screen and (max-width: 1420px) {
                    margin: 10px 0;
                    flex-direction: column;
                }
                @media screen and (max-width: 900px) {
                    margin: 10px 0;
                    flex-direction: row;
                }
                @media screen and (max-width: 676px) {
                    margin: 10px 0;
                    flex-direction: column;
                    display: none;
                }


                img {
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                    max-width: 500px;
                }

                .view__col {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    @media screen and (max-width: 1420px) {
                        margin: 10px 0;
                        flex-direction: row;
                    }
                    @media screen and (max-width: 1178px) {
                        margin: 10px 0;
                        flex-direction: row;
                    }
                    @media screen and (max-width: 900px) {
                        margin: 10px 0;
                        flex-direction: column;
                    }
                    @media screen and (max-width: 767px) {
                        margin: 10px 0;
                        flex-direction: column;
                    }
                    .view__row {
                        display: flex;
                        align-items: center;
                        gap: 12px;

                        @media screen and (max-width: 767px) {
                            
                            width: 172px;
                            margin: 0 auto;
                        }

                        @media screen and (max-width: 425px) {
                            width: 150px;
                            gap: 10px;
                        }

                        @media screen and (max-width: 375px) {
                            width: auto;
                        }

                        & img {
                            width: 40px;
                            height: 40px;
                            -o-object-fit: contain;
                            object-fit: contain;
                            fill: var(--main-color);
                        }

                        & p {
                            font-weight: 500;
                            font-size: 20px;
                            line-height: 22px;
                            min-width: max-content;

                            @media screen and (max-width: 767px) {
                                font-size: 18px;

                                @media screen and (max-width: 425px) {
                                    font-size: 15px;
                                }
                            }

                            & span {
                                font-weight: 500;
                                font-size: 12px;
                                text-transform: uppercase;
                            }
                        }
                    }
                }
            }
        }

        @media screen and (max-width: 1178px) {
            grid-template-columns: 1fr;
            gap: 15px;
        }
    }
}

.model-finance__info {
    // margin-top: 30px;
    p {
        padding: 10px 0;
    }

    .main__span {
        color: var(--main-color);
        font-weight: 600;
    }

    .bold {
        font-weight: 600;
    }
}

.finance__content-text{
    margin-bottom: 30px;
}
</style>