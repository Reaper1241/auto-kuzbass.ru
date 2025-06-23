<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()

let breadcrumbs = []
let pathArray = $route.path.split("/").splice(1).filter(element => element !== '');

for (let i = 0; i < pathArray.length; i++) {
    breadcrumbs.push({
        to: breadcrumbs[i - 1] ? breadcrumbs[i - 1].to + "/" + pathArray[i] : "/" + pathArray[i],
        label: pathArray[i].replaceAll('reviews', 'Отзывы')
            .replaceAll('credit', 'Автокредит')
            .replaceAll('contact', 'Контакты')
            .replaceAll('trade-in', 'Trade-in')
            .replaceAll('redemption', 'Выкуп')
            .replaceAll('politics', 'Политика конфиденциальности')
            .replaceAll('comparison', 'Сравнение')
            .replaceAll('favorites', 'Избранное')
            .replaceAll('success-tmn-auto.ru', 'Успешная заявка')
            .replaceAll('thank', 'Успешная заявка')
            .replaceAll('cars', 'Каталог авто')
            .replaceAll('banks', 'Банки-партнеры')
            .replaceAll('about', 'О компании')
            .replaceAll('installment', 'Рассрочка')
            .replaceAll('leasing', 'Лизинг')
            .replaceAll('china', 'Китайские авто')
            .replaceAll('taxi', 'Такси')
    })
}

function getCrumb() {
    const carId = null

    if ($route.path.includes('cars')) {
        if ('car' in $route.params) {
            return {
                to: '/cars/' + $route.params.brand + '/' + $route.params.model,
                label: `Смотреть все ${cleanUpTitle($route.params.brand, $route.params.model)}`
            }
        } else if ('model' in $route.params) {
            return {
                to: '/cars/' + $route.params.brand + '/',
                label: `Смотреть все ${cleanUpTitle($route.params.brand)}`
            }
        } else if ('brand' in $route.params) {
            return {
                to: '/cars/',
                label: `Смотреть все новые авто`
            }
        } else {
            return {
                to: '/',
                label: 'Главная'
            }
        }
    }
}
</script>

<template>
    <section class="breadcrumbs"
        :class="{ hide: ('car' in $route.params || 'brand' in $route.params || 'model' in $route.params) }">
        <div class="container">
            <ul class="breadcrumbs__list">
                <li class="breadcrumbs__item">
                    <NuxtLink to="/">Главная</NuxtLink>
                </li>

                <li class="breadcrumbs__item" v-for="(crumb, index) in breadcrumbs" :key="index" v-show="crumb">
                    <NuxtLink :to="crumb.to">{{ decodeURI(cleanUpTitle(crumb.label)).replaceAll('_', ' ') }}
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </section>

    <div class="container back__wrapper"
        :class="{ show: ('cars' in $route.params || 'brand' in $route.params || 'model' in $route.params) }"
        v-if="'cars' in $route.params || 'brand' in $route.params || 'model' in $route.params">
        <NuxtLink :to="getCrumb().to" class="back">
            <i class="fa-solid fa-chevron-left"></i>
            {{ getCrumb().label }}
        </NuxtLink>
    </div>
</template>

<style scoped lang="scss">
.breadcrumbs {
    padding: 20px 0;
    display: block;

    .breadcrumbs__list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;

        .breadcrumbs__item {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            &:not(:first-child):not(:nth-child(2)) {
                text-transform: uppercase;
            }

            &:not(:last-child):after {
                content: '>';
                padding: 0;
                font-size: 12px;
            }
        }

        .router-link-exact-active {
            color: var(--main-color);
        }
    }
}

.breadcrumbs.hide {
    @media screen and (max-width: 767px) {
        display: none;
    }
}

.back__wrapper {
    display: none;
    padding: 15px 15px 0 15px;

    .back {
        padding: 10px 15px;
        border-radius: 20px;
        background: var(--dark-grey);
        color: white;

        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 10px;
    }
}

.back__wrapper.show {
    @media screen and (max-width: 767px) {
        display: flex;
    }
}
</style>