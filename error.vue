<script setup>
const props = defineProps({
    error: {
        type: Object,
        required: true
    }
})
const customErrorMessage = computed(() => {
    if (props.error.statusCode === 404) {
        return 'Страница не найдена! Возможно она была перемещена или была удалена.'
    } else if (props.error.statusCode === 500) {
        return 'Ошибка сервера.'
    } else {
        return 'Неизвестная ошибка.'
    }
})
</script>

<template>
    <NuxtLayout>
        <section class="page error">

            <div class="container">
                <div class="error-content">
                    <div class="error-block">
                        <div class="error-block__text">
                            <div class="error-block__icon">
                                <h1>{{ props?.error?.statusCode }}</h1>
                            </div>
                            <p>
                                {{ customErrorMessage }}
                            </p>
                            <div class="error-block__hidden">
                                {{ props?.error?.message }}<br><br>

                                <!-- <pre v-htmlSanitizer="props?.error?.stack" /> -->
                            </div>
                        </div>
                        <div class="error-block__link">
                            <NuxtLink to="/" class="error-back">Вернуться на главную
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </NuxtLayout>
</template>


<style lang="scss" scoped>
.page.error {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    * {
        background-image: none;
    }

    .error-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        .error-block {
            display: flex;
            flex-direction: column;
            background: var(--light-grey);
            border-radius: var(--border-small-radius);
            overflow: hidden;
            max-width: 550px;
            box-shadow: var(--box-shadow);

            .error-block__text {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                gap: 20px;
                padding: 30px 35px;
                text-align: center;

                @media screen and (max-width: 768px) {
                    padding: 20px 15px;
                }

                .error-block__hidden {
                    display: block;
                }

                p {
                    text-align: center;
                    font-size: var(--big-size);
                }

                .error-block__icon {
                    display: inline-block;
                    background: var(--red);
                    width: 150px;
                    height: 150px;
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 30px;
                    color: white;
                }
            }

            .error-block__link {
                display: flex;
                justify-content: center;
                align-items: center;
                background: var(--red);
                padding: 45px;

                @media screen and (max-width: 768px) {
                    padding: 25px;
                }

                .error-back {
                    padding: 15px 25px;
                    text-align: center;
                    color: white;
                    border-radius: var(--border-small-radius);
                    border: 3px solid white;
                    font-weight: bold;
                    transition: 0.3s;

                    &:hover {
                        background: white;
                        color: var(--red);
                        transition: 0.3s;
                    }
                }
            }
        }
    }
}
</style>