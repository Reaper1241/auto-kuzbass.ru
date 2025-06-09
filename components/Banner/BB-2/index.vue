<script setup>
const benefits = [
    {
        id: 1,
        image: '/images/banner/bb2/bb2-1.png',
        link: '#',
        linkLabel: 'Подробнее',
        title: 'Скорость',
    },
    {
        id: 2,
        image: '/images/banner/bb2/bb2-2.png',
        link: '#',
        linkLabel: 'Подробнее',
        title: 'Первый взнос от 0%',
    },
    {
        id: 3,
        image: '/images/banner/bb2/bb2-3.png',
        link: '#',
        linkLabel: 'Подробнее',
        title: 'Первый автомобиль',
    },
    {
        id: 4,
        image: '/images/banner/bb2/bb2-4.png',
        link: '#',
        linkLabel: 'Подробнее',
        title: 'Выгода по Trade-In',
    },
    {
        id: 5,
        image: '/images/banner/bb2/bb2-5.png',
        link: '#',
        linkLabel: 'Подробнее',
        title: 'Подарок на выбор',
    },
]
</script>

<template>
    <section class="benefits section">
        <div class="container">
            <div class="benefits__wrapper">
                <div class="benefits__header">
                    <BaseTitle title="Акции от автосалона" />
                </div>
                <div class="benefits__body">
                    <div class="benefits__benefits">
                        <div class="benefits__benefit" v-for="benefit in benefits" :key="benefit.id">
                            <div class="benefits__benefit-image">
                                <NuxtImg lazy format="webp" quality="90" loading="lazy" :src="benefit.image"
                                    :alt="benefit.title" />
                            </div>

                            <NuxtLink :to="benefit.link" class="benefits__benefit-link">
                                {{ benefit.linkLabel }}
                            </NuxtLink>

                            <div class="benefits__benefit-title">
                                {{ benefit.title }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.benefits__benefits {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

    .benefits__benefit {
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        box-shadow: var(--box-shadow);

        .benefits__benefit-title {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-weight: bold;
            background: white;
            padding: 15px 20px;
            border-radius: 20px;
            width: max-content;
        }

        .benefits__benefit-link {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            background: var(--main-color);
            color: white;
            border-radius: 20px;
        }

        .benefits__benefit-image {
            height: 100%;

            img {
                height: 100%;
                width: 100%;
            }
        }
    }


}
</style>