<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();
</script>

<template>
    <section class="taxi__section">
        <div class="container">
            <div class="taxi__section-content">
                <div class="taxi__text">
                    <!-- <p class="content__main-text">Лучшее предложение в СПб</p> -->
                    <h2 class="content__main-title">
                        Авто под такси в кредит без первого взноса
                        лучшие условия в автосалоне “TumenLeks”
                        <!-- Авто под такси<br>
                        в кредит от <span>{{ appStore.creditPercent }}%</span> -->
                    </h2>
                    <div class="content__gift">
                        <img src="/svg/gift1.svg" class="svg__logo" alt="" />
                        <p class="content__main-p">Оклейка авто в подарок
                           <br> при покупке авто в креди</p>
                    </div>

                    <!-- <NuxtLink to="/credit" class="content__main-link">
                        Подробнее
                    </NuxtLink> -->
                </div>
                <div class="taxi__form">
                    <FormBanner class="taxi__form-banner" />
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped lang="scss">
.taxi__section {
    .taxi__section-content {
        border-radius: var(--border-radius);
        padding: 30px;
        background: url(/images/taxi__bg.webp) no-repeat 100% 100%;
        background-size: cover;
        width: 100%;
        
        display: grid;
        grid-template-columns: 1fr 500px;
        // gap: 30px;
        align-items: center;

        @media screen and (max-width: 1023px) {
            padding: 60px;
            grid-template-columns: 1fr 250px;
        }

        @media screen and (max-width: 767px) {
            padding: 0;
            grid-template-columns: 1fr;
            margin: 0 auto;
        }

        @media screen and (max-width: 540px) {
            padding: 0;
        }

        .taxi__form {
            padding: 20px;
            background: white;
            border-radius: var(--border-small-radius);
            align-items: center;
            justify-content: center;
            display: flex;
            max-width: 500px;
            opacity: 0.9;
        }

        .taxi__text {
            display: flex;
            flex-direction: column;
            align-self: start; // Поднимаем блок в начало ячейки
            justify-self: start; // Выравниваем по левому краю (если нужно)
            gap: 15px;

            .content__main-text {
                font-weight: 600;
                font-size: 14px;
                color: white;
                text-transform: uppercase;
                padding: 10px 15px;
                background: var(--main-black);
                width: fit-content;
                border-radius: var(--border-small-radius);
            }

            .content__main-title {
                font-size: 28px;
                color: white;
                line-height: 42px;
                max-width: 700px;

                span {
                    background: white;
                    font-weight: 800;
                    padding: 5px 10px;
                    border-radius: var(--border-small-radius);
                }

                @media screen and (max-width: 767px) {
                    display: none;
                }

                @media screen and (max-width: 425px) {
                    font-size: 24px;
                    line-height: 30px;
                }
            }

            .content__main-link {
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 500;
                font-size: 18px;
                line-height: 20px;
                background: var(--main-black);
                border: 1px solid var(--main-black);
                border-radius: 7px;
                transition: all 0.3s ease;
                width: fit-content;
                padding: 20px 55px;
                color: white;
                margin-top: 40px;

                @media screen and (max-width: 767px) {
                    height: 56px;
                    margin-top: auto;
                    margin-bottom: 30px;
                }

                @media screen and (max-width: 425px) {
                    height: 50px;
                    margin-bottom: 20px;
                }

                &:hover {
                    color: black;
                    background: transparent;
                }
            }
        }
    }
}

.content__gift{
    display: flex;
    gap: 5px;
    position: absolute;
    top: 350px;
    @media screen and (max-width: 1100px) {
        top: 410px;
                }
                @media screen and (max-width: 780px) {
    display: none;
                }
}

.content__main-p{
    color: white;
}
</style>