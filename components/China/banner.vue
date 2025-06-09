<script setup>
</script>

<template>
    <section class="china__banner">
        <div class="container">
            <div class="china__banner-content">
                <!-- <p class="content__main-text">Купите мощный и технологичный</p>
                <h2 class="content__main-title">
                    Chery Tiggo 7 pro max
                </h2>
                <p class="content__main-price">
                    от {{ makeSpaces(1525900) }} ₽
                </p>
                <NuxtLink to="/cars/chery/tiggo_7_pro_max" class="content__main-link">
                    Подробнее
                </NuxtLink> -->
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.china__banner {

    .container {
        height: 100%;
        @media screen and (max-width: 767px) {
            padding: 0; // Убираем отступы у контейнера
            width: 100%; // Занимаем всю ширину
            
        }
        .china__banner-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
            height: 300px;
            border-radius: var(--border-radius);
            padding: 100px;
            position: relative;
            overflow: hidden;

            background: url(/images/china__bg.webp) no-repeat 25% 50%;
            background-size: cover;
            color: var(--bg-light);

            @media screen and (max-width: 1023px) {
                background: url(/images/china__bg.webp) no-repeat 0% 50%;
                background-size: cover;
                padding: 80px;
                height: 250px;
            }

            @media screen and (max-width: 767px) {
                padding: 50px;
                height: 200px;
                border-radius: 0px;
            }

            @media screen and (max-width: 425px) {
                gap: 15px;
                padding: 30px;
                width: 100%;
                background: url(/images/china__bg.webp) no-repeat 40% 50%;
                background-size: cover;
                height: 200px;
                border-radius: 0px;
            }

            * {
                background: transparent;
            }

            .content__main-text,
            .content__main-price {
                font-weight: 600;
                font-size: 24px;
                line-height: 32px;

                @media screen and (max-width: 425px) {
                    font-size: 20px;
                    line-height: 24px;
                }
            }

            .content__main-title {
                font-size: 40px;
                line-height: 48px;
                text-transform: uppercase;

                @media screen and (max-width: 767px) {
                    font-size: 32px;
                    line-height: 36px;
                }

                @media screen and (max-width: 425px) {
                    font-size: 24px;
                    line-height: 30px;
                }

                & span {
                    text-transform: initial;
                }
            }

            .content__main-link {
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 500;
                font-size: 18px;
                line-height: 20px;
                background: var(--secondary-color);
                border: 1px solid var(--secondary-color);
                border-radius: 7px;
                transition: all 0.3s ease;
                width: fit-content;
                padding: 20px 55px;
                margin-top: 30px;

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
                    color: white;
                    background: transparent;
                }
            }

            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.55) 39%, rgba(0, 0, 0, 0) 63%);
                z-index: 0;
                pointer-events: none;
            }

            &>* {
                position: relative;
                z-index: 2;
            }
        }
    }
}
</style>