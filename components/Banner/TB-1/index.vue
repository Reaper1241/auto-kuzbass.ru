<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();
</script>

<template>
    <section class="section terms__section">
        <div class="container">
            <p class="terms__title">Наши преимущества</p>
            <div class="terms__row">
                <div class="terms__block">
                    <img class="terms__img" src="/svg/credit1.svg" alt="icon">
                    <p class="terms__text">
                        16 банков<br />
                        на выбор
                    </p>
                </div>
                <div class="terms__block">
                    <img class="terms__img" src="/svg/credit2.svg" alt="icon">
                    <p class="terms__text">
                        Автокредит<br />
                        от {{ appStore.creditPercent }}%
                    </p>
                </div>
                <div class="terms__block">
                    <img class="terms__img" src="/svg/credit3.svg" alt="icon">
                    <p class="terms__text">
                        Гарантия<br />
                        до 5 лет
                    </p>
                </div>
                <div class="terms__block">
                    <img class="terms__img" src="/svg/credit4.svg" alt="icon">
                    <p class="terms__text">
                        Зимняя резина<br />
                        в подарок
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.terms__section {
    color: var(--bg-light);
    background: var(--main-black);
    padding: 30px 0;
    margin-top: 20px;

    .terms__title {
        display: none;

        @media screen and (max-width: 767px) {
            display: block;
            font-weight: 600;
            font-size: 18px;
            line-height: 22px;
            text-align: center;
            margin-bottom: 30px;
        }
    }

    .terms__row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 20px 0;

        .terms__block {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 14px;
            width: 270px;

            @media screen and (max-width: 1200px) {
                justify-content: flex-start;
            }

            @media screen and (max-width: 1199px) {
                width: 240px;
            }

            @media screen and (max-width: 1023px) {
                width: 270px;
            }

            @media screen and (max-width: 590px) {
                margin: 0 auto;
            }

            @media screen and (max-width: 375px) {
                width: 240px;
            }

            .terms__img {
                min-width: 50px;
                width: 50px;
                height: 50px;
                object-fit: contain;
            }

            .terms__text {
                font-size: 18px;
                line-height: 22px;
                text-transform: uppercase;

                @media screen and (max-width: 1199px) {
                    font-size: 16px;
                    line-height: 20px;
                }

                @media screen and (max-width: 1023px) {
                    font-size: 18px;
                    line-height: 22px;
                }

                @media screen and (max-width: 375px) {
                    font-size: 16px;
                    line-height: 20px;
                }
            }
        }
    }
}
</style>