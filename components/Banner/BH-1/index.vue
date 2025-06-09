<script setup>
const props = defineProps({
    banner: {
        type: Object,
        default: {}
    }
})
</script>

<template>
    <section class="banner-head" :style="{ backgroundImage: `url(${banner?.img})` }">
        <div class="container">
            <div class="banner-head__content">
                <div class="banner-head__title">
                    <span>{{ banner?.subtitle1 }}</span>
                    <b>{{ banner?.title }}</b>
                    <span>{{ banner?.subtitle2 }}</span>
                    <BaseButtonModal :btn-label="'Зафиксировать условие'" :modal-title="`Зафиксировать условие`"
                        :btnClass="`bh-1`" />
                </div>
            </div>
        </div>
        <div class="banner-head__sticker">
            <span>Скидка</span>
            <b>-10%</b>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.banner-head {
    position: relative;
    height: 400px;
    background-repeat: no-repeat;
    background-position: center;

    @media screen and (max-width: 768px) {
        display: none;
    }

    .banner-head__sticker {
        position: absolute;
        right: 0;
        top: 50px;
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
            gap: 25px;
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