<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
    <section class="express__section section">
        <div class="container bottom__container">
            <h2>
                <!-- Экспресс-кредит на авто под <span>такси</span> -->
            </h2>
            <div class="cont">
                <div class="banner__card">
                    <img class="banner-img" src="/public/images/kasko.svg" alt="Vector">
                    <span>КАСКО в подарок</span>
                </div>
                <div class="banner__card">
                    <img class="banner-img" src="/public/images/kashback.svg" alt="Vector">
                    <span>3 платежа в подарок</span>
                </div>
                <div class="banner__card">
                    <img class="banner-img" src="/public/images/stavka.svg" alt="Vector">
                    <span>Льготная ставка от {{ appStore.creditPercent }}%</span>
                </div>
                <div class="banner__card">
                    <img class="banner-img" src="/public/images/banki.svg" alt="Vector">
                    <span>Более 15 банков-партнеров</span>
                </div>
            </div>
            <FormTimer class="express__form" />
        </div>
    </section>
</template>


<style scoped lang="scss">
:deep(.small){
    padding: 0px 0px 15px 0;
    @media screen and (max-width: 767px){
        padding: 0px 15px 15px 15px;
    }
}
.banner__card{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    @media screen and (max-width: 767px){
        flex-direction: row;
        gap: 30px;
    }
    span{
        display: flex;
        height: 50px;
        align-items: center;
        // width: 100%;
        // align-items: center;
        text-align: center;
                    @media screen and (max-width: 767px){
                        font-size: 20px;
                        // width: 100px;
                height: 30px;
            }
            @media screen and (max-width: 380px){
                        font-size: 14px;
                        // width: 100px;
                height: 30px;
            }
    }
}
.express__section {
    background: url(/public/images/banner_form.webp) no-repeat 50% 1%;
    background-size: cover;
    max-width: 1400px;
    width: 100%;
    margin:10px auto;
    color: var(--bg-light);
    border-radius: 4px;
    @media screen and (max-width: 767px){
        margin: 0 auto;
        border-radius: 0px;
        margin-bottom: 10px;
    }
    @media screen and (max-width: 540px) {
        background: url(/public/images/banner_form.webp) no-repeat 31% 100%;
        background-size: auto;
        
    }

    .bottom__container {
        display: flex;
        flex-direction: row;
        height: 100%;
        gap: 30px;
        @media screen and (max-width: 1050px){
            gap: 0px;
            flex-direction: column;
        }
        .express__form {
            display: flex;
            
            align-items: self-start;
            flex-direction: column;
            @media screen and (max-width: 1000px) {
                flex-direction: column;
            }
        }

        h2 {
            position: relative;
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
                // content: "";
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
                // position: relative;
                // display: inline-block;
                // color: var(--taxi);
                // padding-right: 42px;

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
                    // background: url(/public/images/kasko.png) no-repeat center;
                    background-size: contain;

                    @media screen and (max-width: 540px) {
                        top: 0;
                        right: -42px;
                    }
                }
            }
        }

        .cont {
            font-weight: 500;
            font-size: 20px;
            line-height: 40px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            margin-top: 0px;
            padding-bottom: 12px;
            @media screen and (max-width: 1200px) {
                font-size: 16px;
                line-height: 30px;
                gap: 15px;
                
            }

            @media screen and (max-width: 1023px) {
                // flex-wrap: wrap;
                // justify-content: flex-end;
            }

            @media screen and (max-width: 767px) {
                display: flex;
                // margin: 0 20px;
                flex-direction: row;
                margin: 0;
            }
            @media screen and (max-width: 766px) {
                display: grid;
                // margin: 0 20px;
                grid-template-columns: repeat(1,2fr);
                margin: 0 20px;
            }
            @media screen and (max-width: 400px) {
                display: grid;
                // margin: 0 20px;
                grid-template-columns: repeat(1,2fr);
                // margin: 0 10px;
            }
            @media screen and (max-width: 350px){
                margin: 0 20px;
            }
            & span {
                // position: relative;
                // padding-left: 50px;

                @media screen and (max-width: 1200px) {
                    // padding-left: 40px;
                }

                &::before {
                    // content: "";
                    // position: absolute;
                    // top: 0;
                    // left: 0;
                    // // background: url(/svg/star.svg) no-repeat center;
                    // background-size: contain;
                    // width: 40px;
                    // height: 40px;

                    // @media screen and (max-width: 1200px) {
                    //     width: 30px;
                    //     height: 30px;
                    // }
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
.banner-img{
    width: 40px;
    height: 40px;
    @media screen and (max-width: 767px){
        width: 30px;
        height: 30px;
    }
}
.red{
    background: white;
    position: absolute;
    opacity: 0.3;
    width: 665px;
    right: 270px;
    height: 250px;
    border-radius: 25px;
    z-index: 0;
}
:deep(.form__check){
    background: none;
    color: white;
}
:deep(.wrap){
    background: none;
    color: white !important;
    text-wrap: wrap;
    display: grid;
    @media screen and (max-width: 768px){
        display: flex;
    }
    @media screen and (max-width: 500px) {
        display: none;
        margin: 0 20px;
        flex-direction: row;
    }
}
:deep(.wrap-mob){
    color: white !important;
}
:deep(.check-link){
    color: white !important;
}
</style>