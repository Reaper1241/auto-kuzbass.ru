<script setup>
const items = ref([
    {
        id: 1,
        title: `Спецпрограмма ВТБ`,
        image: '/images/banner/sp1/sp1-1.png',
        description: `
            <p>Спецпрограмма ВТБ</p>
            <ul>
                <li>минимальная ставка от 6% годовых</li>
                <li>программа действует на новые авто</li>
                <li>максимальная сумму до 10 млн рублей</li>
                <li>скидка на авто до 25%</li>
                <li>срок до 7 лет</li>
            </ul>
        `
    },
    {
        id: 2,
        title: `Уникальные условия Альфа банк`,
        image: '/images/banner/sp1/sp1-2.png',
        description: `
            <p>Спецпрограмма Альфа Банк</p>
            <ul>
                <li>первоначальный взнос от 0%</li>
                <li>сумма до 13 млн рублей</li>
                <li>КАСКО не обязательно</li>
                <li>срок до 8 лет</li>
                <li>действует на все новые авто</li>
            </ul>
        `
    },
    {
        id: 3,
        title: `Льготный кредит от Кредит Европа Банк`,
        image: '/images/banner/sp1/sp1-4.png',
        description: `
            <p>Спецпрограмма Кредит Европа Банк</p>
            <ul>
                <li>ставки от 5,9% годовых</li>
                <li>срок до 8 лет</li>
                <li>первоначальный взнос от 0%</li>
                <li>до 7 000 000 без подтверждения дохода</li>
                <li>рассмотрение за 30 минут</li>
            </ul>
        `
    },
    {
        id: 4,
        title: `Выгодные условия от Росбанка`,
        image: '/images/banner/sp1/sp1-3.png',
        description: `
            <p>Спецпрограмма Росбанк</p>
            <ul>
                <li>сумма до 12 млн рублей</li>
                <li>срок кредитования до 8 лет</li>
                <li>возможен отложенный платеж</li>
                <li>снижение процентной ставки при оформлении КАСКО</li>
            </ul>
        `
    },
    {
        id: 5,
        title: `Заявка на автокредит во все банки`,
        image: '/images/banner/sp1/sp1-5.png',
        description: `
            <p>Заявка на автокредит во все банки</p>
            <ul>
                <li>16 банков-партнеров</li>
                <li>Ставки от 4.9%</li>
                <li>Сумма кредита до 13 млн</li>
                <li>Первый взнос от 0%</li>
                <li>Помощь подборе наименьшего платежа</li>
            </ul>
        `
    },
    {
        id: 6,
        title: `Приезжай в ближайший автосалон`,
        image: '/images/banner/sp1/sp1-6.png',
        link: '/contact'
    },
])
</script>

<template>
    <section class="banner-sp1 section">
        <div class="container">
            <div class="sp1__wrapper">
                <div class="sp1__header">
                    <BaseTitle :title="`Спец.программы автокредитования`" />
                </div>

                <div class="sp1__body">
                    <div class="sp1__items">
                        <BannerSP1Item v-for="item in items" :key="item.id" :item="item" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.sp1__items {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 10px;

    @media screen and (max-width: 1400px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 800px) {
        display: flex;
        overflow: scroll;
        flex-wrap: nowrap;
        padding-bottom: 10px;
    }
}
</style>