<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

appStore.getComparison();
</script>

<template>
    <section class="comparison">
        <div class="container">
            <div class="comparison__content" v-if="appStore.outputСomparison.length">
                <div class="comparison__list">
                    <CarComparison v-for="car in appStore.outputСomparison" :key="car" :car="car">
                    </CarComparison>
                </div>
            </div>
            <div class="comparison__empty" v-else>
                <h4>Ваш список сравнения пуст</h4>
                <NuxtLink to="/cars" class="back">Перейти в каталог</NuxtLink>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.comparison {
    margin: 40px 0;
    min-height: 80vh;

    .comparison__empty {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 60vh;
        width: 100%;

        .back {
            margin-top: 10px;
            padding: 10px 15px;
            border: 2px solid var(--border-color);
            border-radius: 20px;
            transition: 0.3s;

            &:hover {
                border: 2px solid var(--main-black);
                background: var(--main-black);
                color: white;
                transition: 0.3s;
            }
        }
    }


    .comparison__list {
        display: flex;
        gap: 40px;
        overflow-x: auto;
        padding-bottom: 20px;

        transform: rotateX(180deg);
        -ms-transform: rotateX(180deg);
        -webkit-transform: rotateX(180deg);

        .car {
            transform: rotateX(180deg);
            -ms-transform: rotateX(180deg);
            -webkit-transform: rotateX(180deg);
        }

    }
}
</style>