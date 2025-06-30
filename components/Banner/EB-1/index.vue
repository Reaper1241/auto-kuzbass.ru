<script setup></script>

<template>
    <section class="express__section section">
        <div class="container">
            <div class="express__mob-img"></div>

            <div class="express__content">
                <div class="form__block">
                    <div class="express__title">
                        <h2>Экспресс-кредит по двум документам</h2>
                    </div>

                    <div class="express__benefits">
                        <span>Ставка от 4.9%</span>
                        <span>Первый взнос 0%</span>
                    </div>

                    <FormBanner class="express__form" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.express__section {
    position: relative;
    background: url(/images/bottom__form-bg.webp) no-repeat center;
    background-size: cover;
    width: 100%;
    margin: 30px auto;
    color: var(--bg-light);

    .express__benefits {
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 20px;

        span {
            position: relative;
            font-size: 16px;
            line-height: 30px;
            padding-left: 50px;

            &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                background: url(/svg/star.svg) no-repeat center;
                background-size: contain;
                width: 40px;
                height: 40px;
            }
        }
    }

    .express__content {
        display: flex;
        flex-direction: column;
        padding: 20px;
        align-items: center;

        .form__block {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
        }

        .express__title {
            display: flex;
            flex-direction: column;
            align-items: start;
            margin-bottom: 10px;

            h2 {
                margin-bottom: 10px;
            }

            h3 {
                font-weight: normal;
            }
        }
    }

    @media screen and (max-width: 540px) {
        background: #000;
    }

    & .container {
        height: 100%;

        @media screen and (max-width: 767px) {
            display: flex;
            flex-direction: column;
        }

        @media screen and (max-width: 540px) {
            padding: 0 10px;
        }

        .express__mob-img {
            display: none;

            @media screen and (max-width: 540px) {
                display: block;
                background: url(/images/bottom__form-bg.webp) no-repeat 80% 50%;
                background-size: cover;
                height: 260px;
                margin-left: -20px;
                margin-right: -20px;
            }

            @media screen and (max-width: 425px) {
                height: 200px;
            }

            @media screen and (max-width: 375px) {
                height: 180px;
                margin-left: -10px;
                margin-right: -10px;
            }
        }

        .express__form {
            display: flex;
            flex-direction: row;
            justify-content: center;
            max-width: max-content;
            align-items: self-start;
            width: 100%;
            height: 100%;

            @media screen and (max-width: 1000px) {
                flex-direction: column;
            }

            @media screen and (max-width: 767px) {
                max-width: 100%;
                padding: 20px 0;
            }

            @media screen and (max-width: 540px) {
                align-items: center;
            }

            & h2 {
                font-weight: 800;
                font-size: 32px;
                line-height: 42px;

                @media screen and (max-width: 767px) {
                    font-size: 20px;
                    line-height: 24px;
                }

                @media screen and (max-width: 425px) {
                    font-size: 18px;
                    line-height: 22px;
                    text-align: center;
                }

                @media screen and (max-width: 375px) {
                    font-size: 16px;
                    line-height: 20px;
                }
            }

            & p {
                line-height: 20px;
                background: transparent;
                margin: 8px 0 18px;

                @media screen and (max-width: 425px) {
                    margin: 5px 0 10px;
                    text-align: center;
                }

                @media screen and (max-width: 375px) {
                    font-size: 12px;
                }
            }

            .express__form-input {
                max-width: 420px;
                width: 100%;
                height: 56px;
                color: var(--bg-light);
                background: transparent;
                border: 1px solid var(--bg-light);
                border-radius: 12px;
                padding: 0 20px;
                margin-bottom: 20px;

                @media screen and (max-width: 540px) {
                    max-width: 100%;
                }

                @media screen and (max-width: 425px) {
                    height: 40px;
                    border-radius: 38px;
                    margin-bottom: 16px;
                }
            }

            .express__form-input::-webkit-input-placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .express__form-input::-moz-placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .express__form-input::-ms-input-placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .express__form-input::placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .express__form-input:-moz-placeholder-shown {
                color: var(--bg-light);
            }

            .express__form-input:placeholder-shown {
                color: var(--bg-light);
            }

            .express__form-input:focus {
                color: var(--bg-light);
            }

            .express__form-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: 420px;
                width: 100%;
                height: 66px;
                font-weight: 500;
                font-size: 15px;
                line-height: 18px;
                color: var(--bg-light);
                background: var(--secondary-color);
                border: 1px solid var(--secondary-color);
                border-radius: 12px;
                margin-top: 4px;
                transition: all 0.3s ease;

                @media screen and (max-width: 540px) {
                    max-width: 100%;
                }

                @media screen and (max-width: 425px) {
                    height: 48px;
                    border-radius: 46px;
                }

                &:hover {
                    color: var(--secondary-color);
                    background: transparent;
                }
            }
        }
    }
}
</style>