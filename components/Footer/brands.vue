<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const brandShow = ref(false);

function showAll() {
    brandShow.value = !brandShow.value
}
</script>


<template>
    <ul class="footer__brand-list">
        <li class="footer__brand-item" v-for="brand in appStore.newBrands" :key="brand.id"
            :class="{ 'footer__item-show': brandShow }">
            <NuxtLink class="footer__brand-link" :to="`/cars/${brand.url_brand}/`">
                {{ brand.brand }}
            </NuxtLink>
        </li>
    </ul>
    <button class="footer__brand-btn" @click="showAll()">
        {{ brandShow ? 'Скрыть' : 'Ещё' }}
    </button>
</template>

<style scoped lang="scss">
.footer__brand-list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px 28px;

    @media screen and (max-width: 1440px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }

    @media screen and (max-width: 1199px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 1023px) {
        grid-template-columns: repeat(2, 1fr);
    }

    .footer__brand-item {
        font-size: 16px;
        line-height: 20px;
        text-transform: capitalize;

        @media screen and (max-width: 1023px) {
            &:nth-child(n + 19) {
                display: none;
            }
        }

        @media screen and (max-width: 767px) {
            &:nth-child(n + 13) {
                display: none;
            }
        }
    }

    .footer__item-show {
        @media screen and (max-width: 1023px) {
            &:nth-child(n + 19) {
                display: block;
            }
        }

        @media screen and (max-width: 767px) {
            &:nth-child(n + 13) {
                display: block;
            }
        }
    }
}


.footer__brand-btn {
    display: none;

    @media screen and (max-width: 1023px) {
        display: block;
        width: 100%;
        height: 40px;
        color: var(--bg-light);
        background: var(--secondary-color);
        margin-top: 15px;
    }
}
</style>