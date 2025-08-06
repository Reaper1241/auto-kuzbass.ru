<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();

import { apiNew, name } from "@/constants/";

const emits = defineEmits(['closeModal', 'choiceCar']);

const props = defineProps({
    selectedCategory: String,
})

const selectedBrand = ref(appStore.newBrands[0]);
const selectedModel = ref();
const selectedMod = ref();
const selectedComp = ref();

const selectedStep = ref(0);

const modelsList = ref([]);
const modList = ref([]);



function createColorsArray(num) {
    if (!selectedModel.value?.colored_galleries.length) return [];
    const array = [];
    for (let i = 0; i < num; i++) {
        array.push(selectedModel.value?.colored_galleries[i % selectedModel.value?.colored_galleries.length]?.url || '');
    }
    return array;
}
function getModels(brandId) {
    fetchClientWrapper(`${apiNew}models/${brandId}`).then(res => res.json()).then(data => modelsList.value = data)
}

function getModel(modelId) {
    fetchClientWrapper(`${apiNew}models/model/${modelId}`)
        .then(res => res.json())
        .then(data => modList.value = data.modifications)
}

const choiceCar = computed(() => {
    return {
        brand: selectedBrand.value.brand,
        model: selectedModel.value.model,
        images: selectedModel.value.colored_galleries,
        sale: selectedModel.value.min_sale,
        modification: selectedMod.value,
        engine_size: selectedMod.value.engine_size,
        power: selectedMod.value.power,
        price: selectedComp.value.price,
        complectation: selectedComp.value,
    }
})
const carEcommerce = computed(() => {
  return {
    brand: props.car?.url_brand || null,
    name: props.car?.model || null,
    category: 'Новый авто',
    id: props.car?.id || null,
    price: props.car?.sale ? (props.car.price - props.car.sale) : props.car?.price || 0,
    discount: props.car?.sale || 0,
    quantity: 1,
    variant: props.car?.color || null
  };
});
getModels(selectedBrand.value.id)
</script>

<template>
    <div class="modal" @click.self="emits('closeModal'), car ? yandexEcommerce('remove', carEcommerce) : null">
        <div class="modal__dialog">
            <div class="modal__content">
                <div class="modal__title">
                    Выберите новый авто
                </div>

                <div class="modal__steps">
                    <div class="modal__step" :class="{ 'active': selectedStep, 'current': selectedStep == 0 }"
                        @click="selectedStep = 0">
                        {{ selectedBrand.id ? `1. ${selectedBrand.brand}` : '1. Марка' }}
                    </div>
                    <div class="modal__step" :class="{ 'active': selectedBrand, 'current': selectedStep == 1 }"
                        @click="selectedStep = 1">
                        {{ selectedModel ? `2. ${selectedModel.model}` : '2. Модель' }}
                    </div>
                    <div class="modal__step" :class="{ 'active': selectedModel, 'current': selectedStep == 2 }"
                        @click="selectedStep = 2">
                        {{ selectedMod ? `3. ${selectedMod.modification}` : '3. Модификация' }}
                    </div>
                    <div class="modal__step" :class="{ 'active': selectedMod, 'current': selectedStep == 3 }"
                        @click="selectedStep = 3">
                        {{ selectedComp ? `4. ${selectedComp.complectation}` : '4. Комплектация' }}
                    </div>
                </div>

                <div class="modal__steps-content">
                    <div class="modal__step-block" v-if="selectedStep == 0">
                        <ul class="brands__list">
                            <li class="brand__item" v-for="brand in appStore.newBrands"
                                :class="{ 'active': selectedBrand == brand }"
                                @click="selectedBrand = brand, selectedStep = 1, getModels(selectedBrand.id),
                                    selectedModel = null, modelsList = null, modList = null, selectedComp = null, selectedMod = null">
                                <div class="item__image">
                                    <NuxtImg :src="brand.logo" :alt="brand.brand" quality="60" format="webp"
                                        placeholder="/images/spinner.svg" />
                                </div>
                                <div class="item__name">
                                    <span class="title">
                                        {{ brand.brand }}
                                    </span>
                                    <span class="count">
                                        {{ brand.cars_count }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="modal__step-block" v-else-if="selectedStep == 1">
                        <ul class="default__list">
                            <li class="default__item" v-for="model in modelsList"
                                :class="{ 'active': selectedModel == model }"
                                @click="selectedModel = model, selectedStep = 2, getModel(selectedModel.id), modList = null, selectedMod = null, selectedComp = null">
                                <div class="item__name">
                                    {{ model.model }}
                                </div>
                                <div class="item__image">
                                    <NuxtImg :src="model?.colored_galleries[0]?.url" :alt="model.model" quality="60"
                                        format="webp" placeholder="/images/spinner.svg" />
                                </div>
                                <div class="item__price">
                                    <span class="current">
                                        от {{ makeSpaces(model.min_price) }} ₽
                                    </span>
                                    <span class="old" v-if="model.min_sale">
                                        от {{ makeSpaces(model.min_price + model?.min_sale) }} ₽
                                    </span>
                                </div>
                                <div class="item__button">
                                    <BaseButton :label="'Выбрать'" :class="'credit-mod'" />
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="modal__step-block" v-else-if="selectedStep == 2">
                        <ul class="modifications__list default__list">
                            <li class="default__item" v-for="(mod, index) in modList"
                                :class="{ 'active': selectedMod == mod }"
                                @click="selectedMod = mod, selectedStep = 3, selectedComp = null">
                                <div class="item__name">
                                    {{ mod.modification }}
                                </div>

                                <div class="item__params">
                                    <ul class="params__list">
                                        <li class="params__item" v-if="mod.max_speed">
                                            <span class="title">
                                                Макс. скорость
                                            </span>
                                            <span class="value">
                                                {{ mod.max_speed }} км/ч
                                            </span>
                                        </li>
                                        <li class="params__item" v-if="mod.power">
                                            <span class="title">
                                                Мощность
                                            </span>
                                            <span class="value">
                                                {{ mod.power }} л.с.
                                            </span>
                                        </li>
                                        <li class="params__item" v-if="mod.from_0_to_100">
                                            <span class="title">
                                                Разгон 0-100
                                            </span>
                                            <span class="value">
                                                {{ mod.from_0_to_100 }} с.
                                            </span>
                                        </li>
                                        <li class="params__item" v-if="mod.drive">
                                            <span class="title">
                                                Привод
                                            </span>
                                            <span class="value">
                                                {{ mod.drive }}
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                <div class="item__contorls">
                                    <div class="item__price">
                                        <span class="current">
                                            от {{ makeSpaces(mod.min_price) }} ₽
                                        </span>
                                        <span class="old" v-if="selectedModel.min_sale">
                                            от {{ makeSpaces(mod.min_price + selectedModel?.min_sale) }} ₽

                                        </span>
                                    </div>
                                    <BaseButton :label="'Выбрать'" :class="'credit-mod'" />
                                </div>
                            </li>
                        </ul>
                    </div>


                    <div class="modal__step-block" v-else-if="selectedStep == 3">
                        <ul class="completations__list default__list">
                            <ModalCarChoiceNewCompItem v-for="(comp, index) in selectedMod.car_complectations"
                                :class="{ 'active': selectedComp == comp }"
                                @click="selectedComp = comp, emits('closeModal'), creditStore.carNew = choiceCar"
                                :comp="comp" :selectedModel="selectedModel" />
                        </ul>
                    </div>
                </div>

                <button class="modal__close" type="button" @click="emits('closeModal')">
                    <span class="close__text">Закрыть</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal {
    animation: fadeIn 0.3s ease-in-out;

    .modal__dialog {
        .modal__content {
            display: flex;
            flex-direction: column;

            padding: 40px;
            height: 90vh;

            padding: 40px;
            min-height: 90vh;

            width: 60vw;

            @media screen and (max-width: 1600px) {
                width: 90vw;
            }

            @media screen and (max-width: 768px) {
                padding: 20px 10px;
                width: 95vw;
            }

            .modal__title {
                font-size: 24px;
                font-weight: 500;
                margin-bottom: 20px;
            }

            .modal__steps {
                display: flex;
                gap: 5px;
                flex-wrap: wrap;

                .modal__step {
                    padding: 4px 10px;
                    border: var(--border);
                    border-radius: var(--border-radius);
                    opacity: 0.4;
                    cursor: not-allowed;
                    pointer-events: none;
                    font-size: var(--small-size);
                }

                .current {
                    opacity: 1;
                    background: var(--secondary-color);
                    color: white;
                    cursor: pointer;
                    pointer-events: auto;
                }

                .active {
                    opacity: 1;
                    cursor: pointer;
                    pointer-events: auto;
                    transition: 0.3s;
                }
            }

            .modal__steps-content {
                margin-top: 20px;
                height: max-content;
                overflow: auto;
                padding-right: 10px;

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-track {
                    background: white;
                    border-radius: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    background: rgba(95, 95, 95, 0.582);
                    border-radius: 5px;
                }

                .modal__step-block {
                    .default__item {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                        text-align: center;
                        padding: 20px;
                        border-radius: 20px;
                        border: 2px solid #f5f5f5;
                        cursor: pointer;
                        transition: 0.3s;
                        justify-content: space-between;

                        @media screen and (max-width: 768px) {
                            padding: 10px;
                            gap: 5px;
                        }

                        .item__dropdown {
                            .dropdown__list {
                                display: flex;
                                flex-direction: column;
                                gap: 5px;

                                .dropdown__item {
                                    display: flex;
                                    flex-direction: column;

                                    .title {
                                        display: flex;
                                        justify-content: space-between;
                                        cursor: pointer;

                                        .name {
                                            background: red;
                                        }

                                        .arrow {
                                            display: flex;
                                            gap: 5px;
                                            align-items: center;
                                            color: var(--main-color);

                                            i {
                                                font-size: 12px;
                                            }
                                        }
                                    }

                                    .value {
                                        background: #f5f5f5;
                                        margin: 5px 0;
                                        padding: 10px 10px 10px 25px;
                                        border-radius: var(--border-small-radius);

                                        &:deep(li) {
                                            list-style: disc;
                                            text-align: start;
                                        }
                                    }

                                }
                            }
                        }

                        .item__params {
                            .params__list {
                                column-gap: 30px;
                                display: grid;
                                grid-template-columns: 1fr;
                                list-style: none;
                                padding: 0;
                                row-gap: 0;

                                @media screen and (max-width: 768px) {
                                    font-size: var(--small-size);
                                }

                                li {
                                    align-items: center;
                                    display: flex;
                                    justify-content: space-between;
                                    padding: 5px 0;

                                    .value {
                                        order: 2;
                                    }

                                    &::after {
                                        background-color: #e6e8ec;
                                        content: "";
                                        display: block;
                                        flex-grow: 1;
                                        height: 1px;
                                        margin: 0 8px;
                                        position: relative;
                                        top: 5px;
                                    }
                                }
                            }
                        }

                        .item__contorls {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 5px;
                        }

                        .item__name {
                            font-weight: 600;
                            text-align: center;

                            @media screen and (max-width: 768px) {
                                font-size: var(--small-size);
                            }
                        }

                        img {
                            height: 120px;
                            width: 100%;
                            object-fit: contain;

                            @media screen and (max-width: 768px) {
                                height: 80px;
                            }
                        }

                        .item__price {
                            display: flex;
                            flex-direction: column;

                            .current {
                                font-weight: bold;
                                color: var(--secondary-color);

                                @media screen and (max-width: 768px) {
                                    font-size: var(--standart-size);
                                }
                            }

                            .old {
                                text-decoration: line-through;
                                font-size: var(--standart-size);

                                @media screen and (max-width: 768px) {
                                    font-size: var(--small-size);
                                }
                            }
                        }
                    }

                    .default__list {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 20px;
                        align-items: baseline;

                        @media screen and (max-width: 1100px) {
                            grid-template-columns: repeat(2, 1fr);
                            gap: 10px;
                        }

                        @media screen and (max-width: 540px) {
                            grid-template-columns: 1fr;
                        }
                    }
                }

                .brands__list {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;

                    @media screen and (max-width: 1200px) {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    @media screen and (max-width: 768px) {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }

                    .brand__item {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        gap: 15px;
                        cursor: pointer;
                        background: #f5f5f5;
                        border: 2px solid #f5f5f5;
                        border-radius: var(--border-small-radius);
                        padding: 15px 20px;
                        transition: 0.3s;

                        &:hover {
                            border: 2px solid var(--secondary-color);
                            transition: 0.3s;
                        }

                        .item__image {
                            img {
                                width: 100%;
                                height: 50px;
                                object-fit: contain;
                            }
                        }

                        .item__name {
                            display: flex;
                            align-items: center;
                            text-align: center;
                            flex-direction: column;
                            gap: 5px;

                            .title {
                                font-weight: 600;
                            }

                            .count {
                                font-size: var(--small-size);
                            }
                        }
                    }

                    .active {
                        border: 2px solid var(--secondary-color);
                    }
                }

                .grid__template-list {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;

                    @media screen and (max-width: 540px) {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }

                    @media screen and (max-width: 360px) {
                        gap: 5px;
                    }
                }

                .modifications__list {
                    .modifications__item {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        gap: 10px;
                        cursor: pointer;
                        background: #f5f5f5;
                        border: 2px solid #f5f5f5;
                        border-radius: 15px;
                        padding: 10px;
                        transition: 0.3s;

                        .item__name {
                            font-weight: 600;
                            text-align: center;
                        }

                        .item__price {
                            display: flex;
                            flex-direction: column;
                            text-align: center;

                            .old {
                                text-decoration: line-through;
                                font-size: var(--standart-size);
                            }

                            .current {
                                font-weight: bold;
                                color: var(--secondary-color);

                                @media screen and (max-width: 540px) {
                                    font-size: var(--standart-size);
                                }
                            }
                        }

                        .item__image {
                            padding: 0 20px;

                            @media screen and (max-width: 768px) {
                                padding: 0;
                            }

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }
                    }
                }

                .completations__list {
                    .completations__item {
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        gap: 10px;
                        cursor: pointer;
                        background: #f5f5f5;
                        border: 2px solid #f5f5f5;
                        border-radius: 15px;
                        padding: 10px;
                        transition: 0.3s;

                        .item__name {
                            font-weight: 600;
                            text-align: center;
                        }

                        .item__price {
                            display: flex;
                            flex-direction: column;
                            text-align: center;

                            .old {
                                text-decoration: line-through;
                                font-size: var(--standart-size);
                            }

                            .current {
                                font-weight: bold;
                                color: var(--secondary-color);

                                @media screen and (max-width: 540px) {
                                    font-size: var(--standart-size);
                                }
                            }
                        }

                        .item__image {
                            padding: 0 20px;

                            @media screen and (max-width: 768px) {
                                padding: 0;
                            }

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }
                    }
                }

                .items__list {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;

                    .active {
                        background: var(--secondary-color);
                        color: white;
                    }
                }

                .models__list {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;

                    @media screen and (max-width: 1200px) {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    @media screen and (max-width: 768px) {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }

                    .model__item {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                        text-align: center;
                        padding: 20px;
                        border-radius: 20px;
                        border: 2px solid #f5f5f5;
                        cursor: pointer;
                        transition: 0.3s;

                        @media screen and (max-width: 768px) {
                            padding: 10px;
                            gap: 5px;
                        }

                        &:hover {
                            border: 2px solid var(--secondary-color);
                            transition: 0.3s;
                        }

                        .item__price {
                            display: flex;
                            flex-direction: column;

                            .old {
                                text-decoration: line-through;
                                font-size: var(--standart-size);
                            }

                            .current {
                                font-weight: bold;
                                color: var(--secondary-color);

                                @media screen and (max-width: 540px) {
                                    font-size: var(--standart-size);
                                }
                            }
                        }

                        .item__image {
                            img {
                                height: 120px;
                                width: 100%;
                                object-fit: contain;

                                @media screen and (max-width: 768px) {
                                    height: 80px;
                                }
                            }
                        }

                        .item__name {
                            font-weight: bold;
                        }
                    }
                }
            }

            .modal__close {
                top: 15px;
                right: 15px;

                .close__text {
                    display: none;
                }
            }
        }
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>