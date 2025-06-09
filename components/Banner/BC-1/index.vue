<script setup></script>

<template>
    <section class="banner-callback section">
        <div class="container">
            <div class="banner-callback__content">
                <div class="banner-callback__title">
                    <span>Не можете выбрать автомобиль, тогда мы поможем!</span>
                    <div class="banner-callback__benefits">
                        <div class="banner-callback__benefit">
                            <div class="banner-callback__benefit-icon">
                                <i class="fa-regular fa-circle-check"></i>
                            </div>
                            <div class="banner-callback__benefit-title">
                                Ответим на все ваши вопросы
                            </div>
                        </div>

                        <div class="banner-callback__benefit">
                            <div class="banner-callback__benefit-icon">
                                <i class="fa-regular fa-circle-check"></i>
                            </div>
                            <div class="banner-callback__benefit-title">
                                100% Гарантия безопасности покупки
                            </div>
                        </div>
                    </div>

                    <div class="banner-callback__button">
                        <BaseButtonModal :btn-label="`Заказать звонок сейчас`" :app-type="1"
                            :modal-title="`Заказать звонок`" :btnIcon="'fa-solid fa-phone'" :btnClass="'callback'" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.banner-callback {
    height: 650px;
    background: url('/images/banner/bc1/background.webp') no-repeat center;

    @media screen and (max-width: 1400px) {
        display: none;
    }

    .banner-callback__content {
        height: 100%;
        width: 100%;
        color: white;
        display: grid;
        grid-template-columns: 650px 1fr;
        align-items: center;
        justify-content: center;

        .banner-callback__title {
            display: flex;
            flex-direction: column;
            gap: 50px;

            span {
                font-size: 50px;
                font-weight: 800;
            }

            .banner-callback__benefits {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;

                .banner-callback__benefit {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: var(--big-size);
                }
            }
        }
    }

    div {
        background: transparent;
    }
}
</style>