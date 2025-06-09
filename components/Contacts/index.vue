<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
    <section class="section section__contact">
        <div class="container">
            <div class="section__header">
                <!-- <BasePageTitle /> -->
            </div>
            <div class="section__body">
                <div class="contacts__list">
                    <p class="contacts__item">
                        <a :href="`tel:+${appStore.clearPhone}`">
                            Номер телефона: <span> {{ appStore.phone }}</span>
                        </a>
                    </p>
                    <p class="contacts__item">
                        Часы работы: <span> {{ appStore.workingHours }}</span>
                    </p>
                    <p class="contacts__item">
                        Адрес: <span> {{ appStore.address }}</span>
                    </p>
                </div>
            </div>
        </div>
    </section>

</template>

<style scoped lang="scss">


.contacts__list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-bottom: 30px;
    position: relative;
    @media screen and (max-width: 767px) {
        margin: 30px 0;
        gap: 20px;
    }

    .contacts__item {
        position: relative;
        font-weight: 300;
        font-size: 16px;
        line-height: 18px;
        padding-left: 37px;
        color: black;
        
        @media screen and (max-width: 767px) {
            font-size: 14px;
        }

        @media screen and (max-width: 540px) {
            font-size: 16px;
        }

        @media screen and (max-width: 425px) {
            font-size: 14px;
        }

        &::before {
            content: "";
            position: absolute;
            top: calc(50% - 13px);
            left: 0;
            width: 26px;
            height: 26px;

        }

        & span {
            font-weight: 700;
            font-size: 19px;
            color:black;
            @media screen and (max-width: 767px) {
                font-weight: 600;
                font-size: 14px;
            }

            @media screen and (max-width: 540px) {
                font-size: 16px;
            }

            @media screen and (max-width: 425px) {
                font-size: 14px;
            }
        }
    }

    .contacts__item:nth-child(1) {
        &::before {
            background: url(/svg/Vector.svg) no-repeat center;
            background-size: contain;
        }
    }

    .contacts__item:nth-child(2) {
        &::before {
            background: url(/svg/Vector3.svg) no-repeat center;
            background-size: contain;
        }
    }

    .contacts__item:nth-child(3) {
        &::before {
            background: url(/svg/Vector2.svg) no-repeat center;
            background-size: contain;
        }
    }
}
</style>