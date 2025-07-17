<script setup>
</script>

<template>
    <section class="banner-head">
        <div class="container">
            <div class="banner-head__content">
                <div class="banner-head__title">
                    <b>Скидка до 150 000 ₽</b>
                    <span>Оформи Trade-IN выгодно!</span>

                    <span>Быстрое оформление документов, без занижения цены и большая скидка на покупку нового
                        авто</span>
                    <BaseButtonModal :btn-label="'Зафиксировать условие'" :modal-title="`Зафиксировать условие`"
                        :btnClass="`bh-1`" />
                </div>
            </div>
        </div>
        <div class="banner-head__sticker">
            <span>Скидка до</span>
            <b>150 000 ₽</b>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.banner-head {
    position: relative;
    height: 400px;
    background: url('/images/banner/bh2/background.webp') no-repeat center;

    @media screen and (max-width: 768px) {
        display: none;
    }

    .banner-head__sticker {
        position: absolute;
        right: 0;
        bottom: 50px;
        background: var(--main-color);
        color: white;
        padding: 10px 20px;
        font-size: 18px;
        display: flex;
        flex-direction: column;

        @media screen and (max-width: 540px) {
            display: none;
        }

        b {
            font-size: 26px;
        }

        span {
            font-size: var(--small-size);
        }
    }

    .banner-head__content {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;


        .banner-head__title {
            font-size: var(--big-size);
            color: white;
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 500px;

            b {
                font-size: 26px;
            }
        }
    }

    div {
        background: transparent;
    }
}
</style>