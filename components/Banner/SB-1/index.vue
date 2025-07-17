<script setup>
// Special banner
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
    <section class="special__section section">
        <div class="container">
            <div class="special__content">
                <ul class="special__list">
                    <li class="special__item">
                        <div class="special__item-icon">
                            <i class="fa-solid fa-bank"></i>
                        </div>
                        <div class="special__item-text">
                            <div class="special__item-title">Льготные ставки по автокредиту от банков-партнеров</div>
                            <NuxtLink to="/banks" class="special__item-link">
                                Узнать подробности <i class="fa-solid fa-chevron-right"></i>
                            </NuxtLink>
                        </div>
                    </li>
                    <li class="special__item">
                        <div class="special__item-icon">
                            <i class="fa-solid fa-car"></i>
                        </div>
                        <div class="special__item-text">
                            <div class="special__item-title">Trade-in - оптимальный выбор и экономия до 150 000 ₽</div>
                            <NuxtLink to="/trade-in" class="special__item-link">
                                Узнать подробности <i class="fa-solid fa-chevron-right"></i>
                            </NuxtLink>
                        </div>
                    </li>
                    <li class="special__item">
                        <div class="special__item-icon">
                            <i class="fa-solid fa-percent"></i>
                        </div>
                        <div class="special__item-text">
                            <div class="special__item-title">Ставки от {{ appStore?.creditPercent }}% в автосалоне {{
                                appStore?.siteName }}</div>
                            <NuxtLink to="/credit" class="special__item-link">
                                Узнать подробности <i class="fa-solid fa-chevron-right"></i>
                            </NuxtLink>
                        </div>
                    </li>
                    <li class="special__item">
                        <div class="special__item-icon">
                            <i class="fa-solid fa-gift"></i>
                        </div>
                        <div class="special__item-text">
                            <div class="special__item-title">Зимняя резина в подарок!</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>



<style lang="scss" scoped>
.special__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 4fr));
    gap: 20px;

    .special__item {
        background: white;
        box-shadow: var(--box-shadow);
        padding: 15px;
        border-radius: var(--border-small-radius);

        display: grid;
        grid-template-columns: auto 1fr;
        gap: 15px;
        align-items: center;

        .special__item-icon {
            width: 45px;
            height: 45px;
            border-radius: 100%;
            background: var(--main-color);

            display: flex;
            justify-content: center;
            align-items: center;

            i {
                font-size: 24px;
                color: var(--main-color2);
            }
        }

        .special__item-text {
            display: flex;
            flex-direction: column;
            gap: 5px;

            .special__item-title {
                color: var(--main-color2);
            }

            .special__item-link {
                color: var(--main-color);
                display: flex;
                align-items: center;
                gap: 5px;
                font-size: 12px;

                i {
                    font-size: 10px;
                }
            }
        }
    }
}

.brand__banner {
    padding: 40px 0 0 0;

    .container {
        padding: 0;

        .special__list {
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 10px;

            @media screen and (max-width: 1400px) {
                grid-template-columns: 1fr 1fr;
            }

            @media screen and (max-width: 768px) {
                display: none;
            }

            .special__item {
                background: transparent;
                box-shadow: none;
                padding: 5px;

                .special__item-title {
                    color: var(--main-color);
                    font-size: 12px;
                }

                .special__item-link {
                    color: white;
                }
            }
        }
    }
}
</style>