<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const props = defineProps(['complectation', 'image'])
</script>

<template>
    <div class="complectations__card section" v-if="complectation">
        <div class="complectations__card-img">
            <NuxtImg lazy format="webp" quality="90" loading="lazy" :src="`${image}`" alt="Vector" v-if="image" />
            <NuxtImg lazy format="webp" quality="90" loading="lazy" src="/images/no_image.webp" alt="Vector" v-else />
        </div>
        <div class="complectations__card-header">
            <div class="complectations__card-title">
                Комплектация: {{ complectation.complectation }}
            </div>
        </div>
        <div class="complectations__card-body">
            <div class="complectations__card-price">
                <span>от {{ makeSpaces(complectation.price) }} ₽</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.complectations__card {
    border: 1px solid #D7D7D7;
    padding: 15px 25px;
    border-radius: 20px;
    transition: 0.3s;

    div {
        background: transparent;
    }

    &:hover {
        border: 1px solid white;
        background: #F4F4F4;
        transition: 0.3s;
    }

    .complectations__card-header {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 20px;

        .complectations__card-title {
            font-weight: bold;
        }
    }



    .complectations__card-price {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 30px;

        @media screen and (max-width: 400px) {
            grid-template-columns: 1fr;
            gap: 10px;
        }

        span {
            font-weight: bold;
            margin-right: 10px;
        }
    }

    .complectations__card-img {
        width: 100%;
        height: 150px;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 10px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}
</style>