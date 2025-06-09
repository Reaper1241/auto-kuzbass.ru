<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

definePageMeta({
    name: 'thank',
})
</script>

<template>
    <Bread />
    <section class="thank">
        <div class="thank-content">
            <div class="thank-block">
                <div class="thank-block__text">
                    <div class="thank-block__icon">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <h1>Заявка успешно оформлена!</h1>
                    <p>
                        Ваша заявка успешно отправлена в автосалон!
                        Наш специалист свяжется с Вами в течение 30
                        минут.
                        <br><br>
                        С уважением, команда Автосалона {{ appStore.siteName }}
                    </p>
                </div>
                <div class="thank-block__link">
                    <NuxtLink to="/" class="thank-back">Вернуться на главную</NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
section.thank {
    min-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        align-items: start;
        min-height: auto;
        margin-bottom: 30px;
    }

    .thank-content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 20px;

        .thank-block {
            display: flex;
            flex-direction: column;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            max-width: 550px;
            box-shadow: var(--box-shadow);

            .thank-block__text {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 20px;
                padding: 30px 35px;
                text-align: center;

                p {
                    text-align: center;
                }

                .thank-block__icon {
                    display: inline-block;
                    background: var(--secondary-color);
                    width: 70px;
                    height: 70px;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30px;
                    color: white;
                }
            }

            .thank-block__link {
                display: flex;
                justify-content: center;
                align-items: center;
                background: var(--secondary-color);
                padding: 45px;

                @media screen and (max-width: 768px) {
                    padding: 25px;
                }

                .thank-back {
                    padding: 15px 25px;
                    text-align: center;
                    color: white;
                    border-radius: 16px;
                    border: 3px solid white;
                    font-weight: bold;
                    transition: 0.3s;

                    &:hover {
                        background: white;
                        color: var(--secondary-color);
                        transition: 0.3s;
                    }
                }
            }
        }
    }
}
</style>