<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

appStore.getFavorites();
</script>

<template>
    <section class="favorites">
        <div class="container">
            <div class="favorites__content" v-if="appStore.outputFavorites.length">
                <PieceH2 :title="`Избранные автомобили (${appStore.outputFavorites.length})`" class="padding big">
                </PieceH2>
                <div class="favorites__list">
                    <CarSmall_G v-for="car in appStore.outputFavorites" :key="car" :car="car" />
                </div>
            </div>
            <div class="favorites__empty" v-else>
                <h4>Ваш список избранного пуст</h4>
                <NuxtLink to="/cars" class="back">Перейти в каталог</NuxtLink>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.favorites {
    margin: 40px 0;
    min-height: 80vh;

    .favorites__empty {
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


    .favorites__list {
        display: flex;
        gap: 20px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;

        @media screen and (max-width: 1450px) {
            grid-template-columns: 1fr 1fr 1fr;
        }


        @media screen and (max-width: 1050px) {
            grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }
}
</style>