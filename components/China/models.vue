<script setup>
import { apiNew } from '@/constants';

const models = ref([]);

function getModels() {
    fetchClientWrapper(`${apiNew}filters/models?model_tag_id=2`)
        .then(res => res.json())
        .then(data => models.value = data.models)
}
getModels()
</script>

<template>
    <section class="china__section section">
        <div class="container">
            <div class="section__header">
                <BaseSectionTitle :title="'Популярные модели китайских брендов'" />
            </div>
            <div class="section__body">
                <div class="china__wrapper">
                    <div class="china__list">
                        <CarSmallNM2 v-for="model in models" :key="model.id" :model="model" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.china__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.china__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 20px 23px;

    @media (max-width: 1199px) {
        gap: 15px;
    }

    @media (max-width: 1220px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 905px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 610px) {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>