<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useRoute } from 'vue-router';
const $route = useRoute();

const benefits = computed(() => {
    if ($route.name == 'credit') {
        return [
            {
                id: 2,
                icon: 'fa fa-shield',
                title: 'Выгодные условия',
                text: '16 банков и 96% одобрения',
            },
            {
                id: 3,
                icon: 'fa fa-file',
                title: 'Простое оформление',
                text: 'Оформление по 2 документам',
            },
            {
                id: 4,
                icon: 'fa fa-ruble-sign',
                title: 'Финансовые возможности',
                text: 'Без первоначального взноса',
            },
            {
                id: 5,
                icon: 'fa fa-chart-pie',
                title: 'Доступность',
                text: `Мин. ставка от ${appStore.creditPercent}%`,
            },
            {
                id: 1,
                icon: 'fa fa-clock',
                title: 'Скорость',
                text: 'Решение за 30 мин',
            }
        ]
    } else if ($route.name == 'leasing') {
        return [
            {
                id: 2,
                icon: 'fa fa-shield',
                title: 'До 7 лет',
                text: 'Срок лизинга',
            },
            {
                id: 3,
                icon: 'fa fa-file',
                title: 'От 1 часа',
                text: 'Рассмотрение заявки',
            },
            {
                id: 4,
                icon: 'fa fa-ruble-sign',
                title: 'Без взсона',
                text: 'Выдача авто в тот же день',
            },
            {
                id: 5,
                icon: 'fa fa-chart-pie',
                title: 'Для всех',
                text: `Для физ. и юр. лиц`,
            },
        ]
    } else if ($route.name == 'installment') {
        return [
            {
                id: 2,
                icon: 'fa fa-shield',
                title: 'Взнос от 20%',
                text: 'Минимальный первый взнос',
            },
            {
                id: 3,
                icon: 'fa fa-file',
                title: 'До 7 лет',
                text: 'Срок рассрочки',
            },
            {
                id: 4,
                icon: 'fa fa-ruble-sign',
                title: 'Выгодное предложение',
                text: 'От официального дилера',
            },
            {
                id: 5,
                icon: 'fa fa-chart-pie',
                title: 'До 5 000 000',
                text: `Сумма рассрочки`,
            },
            {
                id: 1,
                icon: 'fa fa-chart-pie',
                title: '1 час',
                text: `На рассмотрение заявки`,
            },
        ]
    } else {
        return []
    }
})
</script>

<template>
    <section class="benefits section" v-if="benefits.length > 0">
        <div class="container">
            <div class="benefits__header">
            </div>
            <div class="benefits__body">
                <div class="benefits__benefits">
                    <div class="benefits__benefit" v-for="benefit in benefits" :key="benefit.id">
                        <div class="benefits__benefit-icon">
                            <i :class="benefit?.icon"></i>
                        </div>
                        <div>
                            <div class="benefits__benefit-title">
                                {{ benefit?.title }}
                            </div>
                            <div class="benefits__benefit-text">
                                {{ benefit?.text }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.benefits__benefits {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;

    @media screen and (max-width: 768px) {
        overflow: auto;
        flex-wrap: nowrap;
        padding-bottom: 10px;
    }

    .benefits__benefit {
        display: flex;
        gap: 15px;
        align-items: center;
        padding: 10px;
        border-radius: 20px;
        cursor: pointer;

        &:hover {
            box-shadow: var(--box-shadow);
            transition: 0.3s;
        }

        @media screen and (max-width: 768px) {
            min-width: max-content;
        }

        .benefits__benefit-title {
            font-weight: 600;
            margin-bottom: 5px;

            @media screen and (max-width: 768px) {
                font-size: var(--standart-size);
            }
        }

        .benefits__benefit-text {
            @media screen and (max-width: 768px) {
                font-size: var(--standart-size);
            }
        }

        .benefits__benefit-icon {
            i {
                font-size: 30px;
                color: var(--secondary-color);
            }
        }
    }
}
</style>