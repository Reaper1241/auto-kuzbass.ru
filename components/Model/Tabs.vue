<script setup>
const activeTab = ref(1);
</script>

<template>
    <section class="section__tabs">
        <div class="container">
            <div class="tabs__header section__header">
                <div class="tabs__header-item" :class="{ active: activeTab === 1 }" @click="activeTab = 1">
                    Комплектации и цены
                </div>
                <div class="tabs__header-item" :class="{ active: activeTab === 2 }" @click="activeTab = 2">
                    Фото и характеристики
                </div>
                <div class="tabs__header-item" :class="{ active: activeTab === 3 }" @click="activeTab = 3">
                    {{ cleanUpTitle($route.params.brand).toUpperCase() }} FINANCE
                </div>
                <NuxtLink class="tabs__header-item tabs__header-link section__cars" :to="{ hash: '#catalog' }"
                    @click="activeTab = 4" :class="{ active: activeTab === 4 }">
                    Авто в наличии
                </NuxtLink>
                <!-- </div> -->
            </div>
            <div class="tabs__body">
                <ModelComplectations v-if="activeTab === 1" />
                <div class="tabs__body-item" v-else-if="activeTab === 2">
                    <ModelGallery />
                    <ModelСharacteristics />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.section__tabs {

    @media screen and (max-width: 570px) {
        border-bottom: 1px solid #C4C4C4;
        margin-top: 10px;
    }

    .tabs__header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        gap: 10px;

        @media screen and (max-width: 1024px) {
            gap: 10px;
        }

        @media screen and (max-width: 570px) {
            flex-direction: column;
        }

        .tabs__header-item,
        .tabs__header-link {
            position: relative;
            font-weight: 500;
            font-size: 16px;
            line-height: 18px;
            background: transparent;
            color: #9F9F9F;
            border: 1px solid #9F9F9F;
            border-radius: 4px;
            max-width: 300px;
            width: 100%;
            height: 50px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease;

            @media screen and (max-width: 1024px) {
                max-width: 48%;
            }

            @media screen and (max-width: 570px) {
                max-width: 100%;
                border-radius: 4px;
            }
        }

        .tabs__header-item.active,
        .tabs__header-link.active {
            color: var(--bg-light);
            background: var(--main-color);
            border: 1px solid var(--main-color);
        }
    }
}
</style>