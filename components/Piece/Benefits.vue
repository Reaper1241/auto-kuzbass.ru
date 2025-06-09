<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useRoute } from 'vue-router';
const $route = useRoute();

const benefitsTitle = computed(() => {
    if ($route.name == 'credit') {
        return 'Преимущества по кредиту'
    } else if ($route.name == 'leasing') {
        return 'Преимущества по лизингу'
    } else if ($route.name == 'installment') {
        return 'Преимущества по рассрочке'
    } else if ($route.name == 'trade-in') {
        return 'Преимущества по Trade-in'
    }
})

const benefitsList = computed(() => {
    if ($route.name == 'credit') {
        return [
            {
                title: '5 лет / 150 000 км',
                subtitle: 'Надежная гарантия от салона',
                icon: '/images/benefit1.webp'
            },
            {
                title: '-10% ПО ГОС. ПРОГРАМ.',
                subtitle: 'Оформи прямо сейчас и получи скидку',
                icon: '/images/benefit2.webp'
            },
            {
                title: 'Ставка от ' + appStore.creditPercent + '%',
                subtitle: 'Самый низкий процент от банка',
                icon: '/images/benefit3.webp'
            },
            {
                title: 'Подарки клиентам',
                subtitle: 'Приятный бонус при покупке авто',
                icon: '/images/benefit4.webp'
            },
        ]
    } else if ($route.name == 'leasing') {
        return [
            {
                title: 'Экономия до 40%',
                subtitle: 'На налогах в том числе НДС',
                icon: '/images/benefit1.webp'
            },
            {
                title: 'Скидки от дилеров до 30%',
                subtitle: 'На новые легковые авто',
                icon: '/images/benefit2.webp'
            },
            {
                title: 'Лизинг для всех',
                subtitle: 'Предложение для физических и юр. лиц',
                icon: '/images/benefit3.webp'
            },
            {
                title: 'Удобный платеж',
                subtitle: 'Индивидуальный график платежей',
                icon: '/images/benefit4.webp'
            },
        ]
    } else if ($route.name == 'installment') {
        return [
            {
                title: 'Рассрочка до 7 лет',
                subtitle: 'Удобный график платежей',
                icon: '/images/benefit1.webp'
            },
            {
                title: 'Без переплат',
                subtitle: 'Плати только недостающую сумму',
                icon: '/images/benefit2.webp'
            },
            {
                title: 'Взнос 20%',
                subtitle: 'Минимальный первый взнос от 20%',
                icon: '/images/benefit3.webp'
            },
            {
                title: 'Выгоднее чем кредит',
                subtitle: 'Предложение от официального дилера',
                icon: '/images/benefit4.webp'
            },
        ]
    }
    else if ($route.name == 'trade-in') {
        return [
            {
                title: 'Выгода до 250 000 ₽',
                subtitle: 'Надежная гарантия от салона',
                icon: '/images/benefit1.webp'
            },
            {
                title: 'Trade-In как взнос',
                subtitle: 'Это поможет Вам купить авто дешевле',
                icon: '/images/benefit2.webp'
            },
            {
                title: 'Оцениваем по рынку',
                subtitle: 'В отличие от других мы не занижаем',
                icon: '/images/benefit3.webp'
            },
            {
                title: 'По 2 документам',
                subtitle: 'Быстрое оформление без долгого ожидания',
                icon: '/images/benefit4.webp'
            },
        ]
    }
})
</script>

<template>
    <div class="benefits">
        <div class="benefits__header">
            <BaseSectionTitle :title="benefitsTitle" />
        </div>

        <div class="benefits__body">
            <div class="benefits__list">
                <div class="benefit" v-for="(benefit, index) in benefitsList" :key="benefit.index">
                    <div class="benefit__text">
                        <div class="benefit-title">{{ benefit?.title }}</div>
                        <div class="benefit-subitle">{{ benefit?.subtitle }}</div>
                    </div>
                    <div class="benefit__img">
                        <img :src="benefit?.icon" :alt="benefit?.title">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.benefits {
    padding: 20px 0;

    .benefits__header {
        margin-bottom: 15px;
    }
}

.benefits__list {
    display: grid;
    grid-template-columns: auto auto;
    gap: 15px;
    align-items: center;
    justify-content: start;


    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
    }

    .benefit {
        gap: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        align-items: center;
        background: #E9F6EB;
        padding: 15px;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
        gap: 15px;


        .benefit__text {
            display: flex;
            flex-direction: column;
            gap: 5px;

            .benefit-title {
                font-size: var(--small-size);
                color: var(--main-black);
                font-weight: bold;
            }

            .benefit-subitle {
                font-size: 10px;
                color: var(--main-black);
            }
        }

        .benefit__img {
            height: 100%;
            display: flex;
            justify-content: end;
            align-items: center;

            img {
                z-index: 10;
                position: relative;
            }

            &::after {
                content: "";
                background: #D3ECD8;
                position: absolute;
                width: 90px;
                height: 100px;
                right: -20px;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 100%;
            }
        }
    }

    .benefit:nth-child(2) {
        background: #EDE7FF;

        .benefit__img {
            &::after {
                background: #D8D3EC;
            }
        }
    }

    .benefit:nth-child(3) {
        background: #F6E9E9;

        .benefit__img {
            &::after {
                background: #ECD3D3;
            }
        }
    }

    .benefit:nth-child(4) {
        background: #D3DAFF;

        .benefit__img {
            &::after {
                background: #B8C1EE;
            }
        }
    }
}
</style>