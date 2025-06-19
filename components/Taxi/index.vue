<script setup>
import { apiNew } from '@/constants';

const selectedTag = ref(3);
const models = ref([]);

function getModels() {
    fetchClientWrapper(`${apiNew}filters/models?model_tag_id=${selectedTag.value}`)
        .then(res => res.json())
        .then(data => models.value = data.models)
}

watch(selectedTag, (newValue, oldValue) => {
    getModels()
})

getModels()
</script>

<template>
    <section class="taxi__section section">
        <div class="container">
            <div class="section__header">
                <BasePageTitle />
            </div>
            <div class="section__body">
                <div class="taxi__wrapper">
                    <div class="taxi__filter">
                        <div class="taxi__menu">
                            <label data-type="eco" class="taxi__menu-item" :class="{ active: selectedTag === 6 }"
                                @click="selectedTag = 6">
                                <input type="checkbox" value="eco" class="taxi__check" />
                                <span class="checkbox__switch"></span>
                                <p>Эконом</p>
                            </label>
                            <label data-type="com" class="taxi__menu-item" @click="selectedTag = 5"
                                :class="{ active: selectedTag === 5 }">
                                <input type="checkbox" value="com" class="taxi__check" />
                                <span class="checkbox__switch"></span>
                                <p>Комфорт</p>
                            </label>
                            <label data-type="plus" class="taxi__menu-item" @click="selectedTag = 7"
                                :class="{ active: selectedTag === 7 }">
                                <input type="checkbox" value="plus" class="taxi__check" />
                                <span class="checkbox__switch"></span>
                                <p>Комфорт +</p>
                            </label>
                            <label data-type="kid" class="taxi__menu-item" @click="selectedTag = 8"
                                :class="{ active: selectedTag === 8 }">
                                <input type="checkbox" value="kid" class="taxi__check" />
                                <span class="checkbox__switch"></span>
                                <p>Детский</p>
                            </label>
                        </div>
                    </div>
                    <div class="taxi__list">
                        <CarSmallTM2 v-for="model in models" :key="model.id" :model="model" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.taxi__filter {
    .taxi__menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;

        @media screen and (max-width: 767px) {
            gap: 10px;
        }

        @media screen and (max-width: 575px) {
            flex-direction: column;
        }

        .taxi__menu-item {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 25px;
            max-width: 360px;
            width: 100%;
            height: 48px;
            background: var(--bg-light);
            border: 2px solid var(--taxi);
            border-radius: 55px;
            cursor: pointer;
            -webkit-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            transition: all 0.3s ease;

            @media screen and (max-width: 1023px) {
                height: 50px;
                padding: 0 15px;
            }

            @media screen and (max-width: 767px) {
                height: 44px;
                padding: 0 10px;
            }

            @media screen and (max-width: 575px) {
                background: transparent;
                border: none;
                border-bottom: 1px solid var(--main-black);
                border-radius: 20px;
            }

            input[type="checkbox"] {
                display: none;
            }

            .checkbox__switch {
                display: block;
                position: absolute;
                top: calc(50% - 16.5px);
                right: 25px;
                width: 33px;
                height: 33px;
                background: var(--main-black);
                border-radius: 50%;

                @media screen and (max-width: 1023px) {
                    top: calc(50% - 12px);
                    right: 15px;
                    width: 24px;
                    height: 24px;
                }

                @media screen and (max-width: 767px) {
                    right: 10px;
                }
            }

            & p {
                font-weight: 700;
                font-size: 14px;
                line-height: 18px;

                @media screen and (max-width: 767px) {
                    font-size: 14px;
                }
            }
        }

        .taxi__menu-item.active {
            background: var(--yellow);

            .checkbox__switch {
                background: var(--bg-light);
                border: 10px solid var(--main-black);

                @media screen and (max-width: 1023px) {
                    border: 7px solid var(--main-black);
                }
            }
        }
    }

    @media screen and (max-width: 767px) {
        margin-top: 20px;
    }
}


.taxi__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.taxi__list {
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

    @media (max-width: 906px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 610px) {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>