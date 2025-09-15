<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
    <section class="express-brand__section section">
        <div class="container bottom__container">
            <h2>
                <!-- Экспресс-кредит на авто под <span>такси</span> -->
            </h2>
            <div class="banners">
                <span>Оценка по рыночной стоимости</span>
                <span>Как первый взнос по автокредиту</span>
                <span>Скидка до 300 000₽</span>
                <span>Оформление сделки за 3 часа</span>
            </div>
            <!-- <FormBanner class="express-brand__form" /> -->
        </div>
    </section>
</template>


<style scoped lang="scss">
.express-brand__section {
    background: url(/public/images/banner41.png) no-repeat 50% 50%;
    background-size: cover;
    max-width: 1920px;
    width: 100%;
    
    margin: 30px auto;
    color: var(--bg-light);

    @media screen and (max-width: 540px) {
        background: url(/public/images/banner41.png) no-repeat 31% 50%;
        background-size: cover;
    }

    .bottom__container {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 30px;

        .express-brand__form {
            display: flex;
            align-items: self-start;

            @media screen and (max-width: 1000px) {
                flex-direction: column;
            }
        }

        h2 {
            // position: relative;
            font-weight: 800;
            font-size: 32px;
            line-height: 42px;
            margin-top: 74px;

            @media screen and (max-width: 1023px) {
                font-size: 28px;
                line-height: 30px;
                margin-top: 40px;
            }

            @media screen and (max-width: 767px) {
                font-size: 19px;
                line-height: 22px;
                margin-top: 30px;
            }

            @media screen and (max-width: 540px) {
                line-height: 30px;
                max-width: 320px;
            }

            @media screen and (max-width: 425px) {
                max-width: 250px;
            }

            &::before {
                content: "";
                position: absolute;
                top: calc(50% - 2px);
                left: -265px;
                width: 250px;
                height: 4px;
                background: var(--bg-light);

                @media screen and (max-width: 1600px) {
                    content: none;
                }
            }

            & span {
                position: relative;
                display: inline-block;
                // color: var(--taxi);
                padding-right: 42px;

                @media screen and (max-width: 540px) {
                    padding-right: 0;
                }

                &::before {
                    content: "";
                    position: absolute;
                    top: -5px;
                    right: 0;
                    width: 40px;
                    height: 16px;
                    // background: url(/svg/taxi.svg) no-repeat center;
                    background-size: contain;

                    @media screen and (max-width: 540px) {
                        top: 0;
                        right: -42px;
                    }
                }
            }
        }

        .banners {
            position: relative;
            top: 40px;
            font-weight: 500;
            font-size: 20px;
            line-height: 40px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            margin-top: 30px;
            
            @media screen and (max-width: 1200px) {
                font-size: 16px;
                line-height: 30px;
                gap: 15px;
            }

            // @media screen and (max-width: 1023px) {
            //     flex-wrap: wrap;
            //     justify-content: flex-end;
            // }

            @media screen and (max-width: 1023px) {
                display:grid;
                top: 30px;
                grid-template-columns: repeat(2,1fr);
                justify-content: center;
            }
            @media screen and (max-width: 616px) {
                display:grid;
                // top: 0px;
                align-items: center;
                top: -45px;
                grid-template-columns: repeat(1,1fr);
                justify-content: center;
            }

            & span {
                position: relative;
                padding-left: 50px;
                display: flex;
                background: var(--main-color);
                padding: 20px 20px 20px 20px;
                align-items: center;
                border-radius: 4px;
                @media screen and (max-width: 1200px) {
                    padding-left: 20px;
                }
                @media screen and (max-width: 767px){
                    width: 100%;
                    text-wrap: nowrap;
                }
                @media screen and (max-width: 616px){
                    width: 100%;
                    text-wrap: wrap;
                    opacity: 0.9;
                }

                &::before {
                    content: "";
                    position: absolute;
                    top: 10px;
                    
                    left: 5px;
                    display: flex;
                    align-items: center;
                    // background: url(/svg/star.svg) no-repeat center;
                    background-size: contain;
                    width: 40px;
                    height: 40px;

                    @media screen and (max-width: 1200px) {
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }

        .bottom__form {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 19px;
            width: 100%;
            margin-top: auto;
            margin-bottom: 78px;

            @media screen and (max-width: 1023px) {
                gap: 15px;
                margin-bottom: 40px;
            }

            @media screen and (max-width: 767px) {
                flex-direction: column;
                max-width: 300px;
                margin-left: auto;
                margin-bottom: 30px;
            }

            @media screen and (max-width: 540px) {
                max-width: 100%;
            }

            .bottom__form-input {
                width: 100%;
                height: 56px;
                color: var(--bg-light);
                background: transparent;
                border: 1px solid var(--bg-light);
                border-radius: 12px;
                padding: 0 20px;

                @media screen and (max-width: 767px) {
                    max-width: 100%;
                    height: 44px;
                }

                @media screen and (max-width: 540px) {
                    background: #000;
                }
            }

            .bottom__form-input::-webkit-input-placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input::-moz-placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input::-ms-input-placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input::placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-inputt:-moz-placeholder-shown {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input:placeholder-shown {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input:focus {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 56px;
                font-weight: 500;
                font-size: 15px;
                line-height: 18px;
                background: var(--taxi);
                border: 1px solid var(--taxi);
                border-radius: 12px;
                transition: all 0.3s ease;

                @media screen and (max-width: 767px) {
                    height: 44px;
                    border-radius: 12px;
                }

                &:hover {
                    color: var(--taxi);
                    background: transparent;
                }
            }
        }
    }
}
</style>