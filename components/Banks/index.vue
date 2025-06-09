<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
    <section class="banks__section section">
        <div class="container">
            <div class="section__header">
                <BasePageTitle />
            </div>
            <div class="section__body">
                <ul class="banks__list">
                    <!-- <li class="banks__item-main-title">
                        <p class="banks__item-title">Название</p>
                        <p class="banks__item-title">Ставка (от)</p>
                        <p class="banks__item-title">Оставить заявку</p>
                    </li> -->
                    <li class="banks__item" v-for="bank in appStore.banks" :key="bank.id">
                        <div class="banks__main">
                            <img :src="bank.image" alt="photo" />
                            <p>{{ bank.percent }}%</p>
                        </div>
                        <img class="banks__img" :src="bank.image" alt="photo" />
                        <p class="banks__p">{{ bank.percent }}%</p>
                        <!-- <ul class="banks__list-mob">
                            <li>Ставка от {{ bank.percent }}%</li>
                            <li>Надежный банк</li>
                            <li>Быстрое оформление</li>
                        </ul> -->
                        <NuxtLink :to="`/credit/`" class="banks__item-link" @click="appStore.selectedBankId = bank.id">
                            Выбрать банк
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.banks__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    
    .banks__item {
        background: var(--bg-light);
        box-shadow: 0px 1px 17.3px 0px #0000000F;
        border-radius: 4px;
        padding: 5px 50px;
        height: 60px;

        @media screen and (max-width: 767px) {
            padding: 5px 20px;
        }

        @media screen and (max-width: 480px) {
            flex-direction: column;
            height: auto;
            padding: 20px;
        }

        @media screen and (max-width: 375px) {
            align-items: flex-start;
        }
    }
    .banks__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        border: 1px solid #9F9F9F;
        @media screen and (max-width: 767px) {
            padding: 5px 20px;
        }
        @media screen and (max-width: 480px) {
            padding: none;
        }

        .banks__item-title {
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            text-align: center;
            max-width: 109px;
            width: 100%;

            @media screen and (max-width: 480px) {
                display: none;
            }
        }

        .banks__item-title:nth-child(3) {
            max-width: 146px;
            width: 100%;
        }

        & img {
            max-width: 160px;
            width: 100%;
            height: 39px;
            -o-object-fit: contain;
            object-fit: contain;

            @media screen and (max-width: 480px) {
                display: none;
            }
        }

        & p {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;

            @media screen and (max-width: 480px) {
                display: none;
            }
        }

        .banks__item-link {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
            line-height: 20px;
            color: var(--bg-light);
            background: grey;
            border: 1px solid grey;
            border-radius: 4px;
            width: 146px;
            height: 40px;
            transition: all .3s ease;

            @media screen and (max-width: 480px) {
              width: 100%;
              
            }

            &:hover {
                border: 1px solid var(--main-color);
                color: white;
                background: var(--main-color);
            }
        }

        .banks__list-mob {
            display: none;

            @media screen and (max-width: 480px) {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 5px 10px;
                margin: 15px 0;
                list-style-type: none;
            }

            @media screen and (max-width: 375px) {
                justify-content: flex-start;
            }

            & li {
                position: relative;
                line-height: 20px;
                color: #454545;
                padding-left: 16px;

                &::before {
                    content: "";
                    position: absolute;
                    top: calc(50% - 6px);
                    left: 0;
                    width: 12px;
                    height: 12px;
                    background: url(/svg/star2.svg) no-repeat center;
                    background-size: contain;
                    border-radius: 50%;
                }
            }
        }
    }
}
.banks__main{
    display: none;
    @media screen and (max-width: 480px) {
        display: flex !important;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        padding: 5px;
        & p{
            display: flex !important;
        }
        & img{
            display: flex !important;
            justify-content: start !important;
            // height: 50px;
            align-items: start !important;
            
            // width: 180px !important;
        }
    }
    
}
</style>