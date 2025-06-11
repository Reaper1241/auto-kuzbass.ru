<script setup>
// import  Gift  from '@/components/svg/Gift.vue';
// import  Auto  from '@/components/svg/Auto.vue';
// import  Clock  from '@/components/svg/Clock.vue';
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore();
</script>

<template>
    <section class="express__section">
        <div class="container">
            <div class="section__body">
                <div class="express__mob-img"></div>

                <div class="express__content">
                    <div class="express__text">
                        <div class="express__text-title">
                            Подайте заявку на <NuxtLink to="/banks" class="express__text-link">автокредит</NuxtLink>
                        </div>
                        <p>и узнайте лучшие условия от <span class="text__red">4,9%</span> от банков-партнёров!</p>
                        <div class="express__text-list">
                            <ul class="express__text-ul">
                                <img src="/svg/clockMob.svg"  alt="" />
                                <li class="express__text-item">
                                    Решение за <br>30 минут.
                                </li>
                            </ul>
                            <ul class="express__text-ul">
                                <img src="/svg/car-insuranceMob.svg" class="gar" alt="" />
                                <li class="express__text-item">
                                    Все авто с <br>гарантией.
                                </li>
                            </ul>
                            <ul class="express__text-ul">
                                <img src="/svg/giftMob.svg" class="kas" alt="" />
                                <li class="express__text-item">
                                    КАСКО и комплект зимней резины - в <br>подарок!
                                </li>
                            </ul>
                        </div>
                        <div class="form__block">
                        <div class="express__title">
                            <h3>Оставьте заявку сейчас!</h3>
                        </div>

                        <FormBanner class="banner" />
                    </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.banner {
    height: 220px;
    
}
.section__body {
    position: relative;
    background: url(/images/banner2.png) no-repeat 3% 67%;
    background-size: 130%;
    width: 100%;
    margin: 30px auto;
    color: var(--bg-light);
    border-radius: var(--border-radius);
    @media screen and (max-width: 768px) {
        background: url(/images/banner2.png) no-repeat 55% 50%;
        background-size: cover; /* или используйте конкретный размер, например: */
        /* background-size: 150%; */ /* чтобы отдалить изображение */
    }
    .express__content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 20;
        gap: 40px;
        opacity: 0.9;
        
        // background: url(/images/banner/eb3/banner.png) no-repeat center;
        @media screen and (max-width: 768px) {
            flex-direction: column;
            padding: 0;
            gap: 20px;
            opacity: 0.85;
            
            // border-bottom: 1px solid var(--main-color);
            // border-top: 1px solid var(--main-color);
        }

        &::before {
            
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            // background: #000000B2;
            border-radius: var(--border-radius);
            z-index: 1;
        }

        & > * {
            position: relative;
            z-index: 2;
        }

        .express__text {
            max-width: 720px;
            background: white;
            color: black;
           
            padding: 30px;
            display: flex;
            flex-direction: column;
            gap: 20px;

            @media screen and (max-width: 768px) {
                width: 100%;
            }

            .express__text-title {
                font-weight: bold;
                font-size: 22px;
                line-height: normal;

                .express__text-link {
                    display: inline;
                    text-decoration: underline;
                }

                @media screen and (max-width: 768px) {
                    font-size: 20px;
                }

                @media screen and (max-width: 540px) {
                    font-size: 16px;
                }
            }

            .express__text-list {
                display: flex;
                // grid-template-columns: 1fr 1fr;
                gap: 15px;
                
                list-style: none;
                @media screen and (max-width: 440px) {
                    flex-direction: column;
                }
                li {
                    position: relative;
                    padding-left: 20px;
                    // &::before {
                    //     content: '✔';
                    //     position: absolute;
                    //     left: 0;
                    //     color: #334C85;
                    // }
                }
            }
        }

        .form__block {
            max-width: 520px;
            width: 100%;
            background: white;
            
            border-radius: var(--border-small-radius);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;

            .express__title h3 {
                font-size: 20px;
                text-transform: uppercase;
                margin-bottom: 10px;
            }
        }
    }

    .container {
        height: 100%;

        @media screen and (max-width: 767px) {
            display: flex;
            flex-direction: column;
        }

        @media screen and (max-width: 540px) {
            padding-left: 0 !important;
            padding-right: 0 !important;
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
    }
}

.text__red{
    color: #334C85;
}
.express__text-ul{
    display: flex;
    align-items: center;
    gap: 05px;
}
.express__text-item{
    text-wrap: wrap;
    font-size: 12px;
    margin: 0 !important;
    padding: 0 !important;
}
.kas{
    margin: 0 3px; 
}
.gar{
    margin: 0 2px;    
}
</style>
