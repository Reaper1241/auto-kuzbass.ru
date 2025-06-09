<script setup></script>

<template>
    <section class="form-banner section">
        <div class="container">
            <div class="form-banner__wrapper">
                <div class="form-banner__body">
                    <div class="form-banner__content">
                        <div class="form-banner__title">Уникальное предложение!</div>
                        <div class="form-banner__subtitle">Оформите заявку на кредит <b>прямо сейчас</b> и получите
                            комплект зимней резины <b>в подарок</b></div>
                        <div class="form-banner__form">
                            <FormBanner class="column" />
                        </div>
                    </div>
                    <div class="form-banner__column">
                        <NuxtImg lazy format="webp" quality="90" loading="lazy" src="/images/banner/fb1/fb1-1.webp"
                            alt="car" class="form-banner__image" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.form-banner {
    background: #F2F1EF;
    border-top: 1px solid #D4D4D4;
    border-bottom: 1px solid #D4D4D4;

    .form-banner__column {
        display: flex;
        justify-content: end;
        align-items: center;

        @media screen and (max-width: 768px) {
            justify-content: center;
        }
    }

    .form-banner__image {
        max-width: 700px;

        @media screen and (max-width: 1200px) {
            max-width: 600px;
        }

        @media screen and (max-width: 1000px) {
            max-width: 400px;
            width: 100%;
        }
    }

    .form-banner__body {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 30px;

        @media screen and (max-width: 1200px) {
            grid-template-columns: 1fr 1fr;
        }

        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr;
        }

        .form-banner__content {
            display: flex;
            flex-direction: column;
            gap: 10px;
            justify-content: center;
            align-items: start;

            @media screen and (max-width: 768px) {
                align-items: center;
                order: 1;
            }

            .form-banner__title {
                font-size: var(--extra-big-size);
                font-weight: 600;
            }

            .form-banner__subtitle {
                font-size: var(---size);
            }
        }


    }
}
</style>