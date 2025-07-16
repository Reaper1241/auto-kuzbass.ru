<script setup>
import { vMaska } from "maska/vue"
import { useRoute } from 'vue-router';
import { apiNew } from "@/constants/";

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const $route = useRoute();

const emit = defineEmits(['showCars']);

const paramsLoading = ref(false);

const selectedPriceFrom = ref(null);
const selectedPriceTo = ref(null);

const unmaskedPriceFrom = ref(null);
const unmaskedPriceTo = ref(null);

const options = {
    number: { mask: '#-#', unsigned: true, fraction: true, tokensReplace: true },
}

const unPriceFrom = (event) => {
    unmaskedPriceFrom.value = event.detail.unmasked
}

const unPriceTo = (event) => {
    unmaskedPriceTo.value = event.detail.unmasked
}
/* vMaska */

const filterLoading = ref(false);

const quary = ref([]);

const brands = ref([]);
const models = ref([]);
const modifications = ref([]);
const complectations = ref([]);
const fuels = ref([]);
const transmissions = ref([]);
const drives = ref([]);

const priceFrom = ref(0);
const priceTo = ref(0);

const countCars = ref(0);

const brand = ref(0);
const model = ref(0);
const modification = ref(0);
const complectation = ref(0);
const fuel = ref(0);
const transmission = ref(0);
const drive = ref(0);

let fullQuary = ``
const showMoreFilter = ref(true);

/* Recent Quary */
const newQueryArr = ref([]);
function updateRecentFilter() {
    paramsLoading.value = true;
    const recentQueryArr = appStore.recentQueryNew.split('&');
    for (const i in recentQueryArr) {
        newQueryArr.value.push(recentQueryArr[i].split('='))
    }
    for (const i in newQueryArr.value) {
        switch (newQueryArr.value[i][0]) {
            case 'fuel_type_id':
                fuel.value = Number(newQueryArr.value[i][1]);
                break;
            case 'transmission_type_id':
                transmission.value = Number(newQueryArr.value[i][1]);
                break;
            case 'drive_type_id':
                drive.value = Number(newQueryArr.value[i][1]);
                break;
            case 'brand_id':
                brand.value = Number(newQueryArr.value[i][1]);
                break;
            case 'car_model_id':
                model.value = Number(newQueryArr.value[i][1]);
                break;
            case 'price_from':
                priceFrom.value = Number(newQueryArr.value[i][1]);
                break;
            case 'price_to':
                priceTo.value = Number(newQueryArr.value[i][1]);
                break;
        }
    }
    fetchClientWrapper(`${apiNew}filters/params?${appStore.recentQueryNew}`)
        .then(res => res.json())
        .then(data => quary.value = data)
        .then(() => brands.value = quary.value.brands)
        .then(() => models.value = quary.value.models)
        .then(() => modifications.value = quary.value.modifications)
        .then(() => complectations.value = quary.value.complectations)
        .then(() => fuels.value = quary.value.fuels)
        .then(() => transmissions.value = quary.value.transmissions)
        .then(() => drives.value = quary.value.drives)
        .then(() => priceFrom.value = quary.value.priceFrom)
        .then(() => priceTo.value = quary.value.priceTo)
        .then(() => countCars.value = quary.value.countCars)
        .then(() => appStore.recentQueryNew ? fullQuary = appStore.recentQueryNew : updateQuery())
        .then(() => appStore.recentQueryNew ? null : emit('showCars', fullQuary))
        .then(() => paramsLoading.value = false)
}
/* Recent Quary */

function getFilterData(recentStatus) {
    paramsLoading.value = true
    filterLoading.value = true
    if (appStore.recentCarsNew?.count > 0 && !$route.params.car && recentStatus) {
        updateRecentFilter()
        paramsLoading.value = false
        filterLoading.value = false
    } else {
        fetchClientWrapper(`${apiNew}filters/params${$route.params.brand ? `?brand_id=${getBrand($route.params.brand)}` : ''}${$route.params.model ? `&car_model_id=${getModel($route.params.brand, $route.params.model)}` : ''}${$route?.name == 'china' ? `?car_tag_id=2` : ''}`)
            .then(res => res.json())
            .then(data => quary.value = data)
            .then(() => brands.value = quary.value.brands)
            .then(() => models.value = quary.value.models)
            .then(() => modifications.value = quary.value.modifications)
            .then(() => complectations.value = quary.value.complectations)
            .then(() => fuels.value = quary.value.fuels)
            .then(() => transmissions.value = quary.value.transmissions)
            .then(() => drives.value = quary.value.drives)
            .then(() => priceFrom.value = quary.value.priceFrom)
            .then(() => priceTo.value = quary.value.priceTo)
            .then(() => countCars.value = quary.value.countCars)
            .then(() => appStore.recentQueryNew ? fullQuary = appStore.recentQueryNew : updateQuery())
            .then(() => appStore.recentQueryNew ? null : emit('showCars', fullQuary))
            .then(() => filterLoading.value = false)
            .then(() => paramsLoading.value = false)
    }
}

function updateQuery() {
    fullQuary = [`${$route?.name == 'china' ? `car_tag_id=2` : ''}`, `${brand.value > 0 ? `brand_id=${brand.value}` : ''}`, `${model.value > 0 ? `car_model_id=${model.value}` : ''}`, `${modification.value > 0 ? `modification_id=${modification.value}` : ''}`, `${complectation.value > 0 ? `complectation_id=${complectation.value}` : ''}`, `${fuel.value > 0 ? `fuel_type_id=${fuel.value}` : ''}`, `${transmission.value > 0 ? `transmission_type_id=${transmission.value}` : ''}`, `${drive.value > 0 ? `drive_type_id=${drive.value}` : ''}`, `${unmaskedPriceFrom.value > 0 ? `price_from=${unmaskedPriceFrom.value}` : ''}`, `${unmaskedPriceTo.value > 0 ? `price_to=${unmaskedPriceTo.value}` : ''}`].filter(elm => elm).join('&')
}

function getBrand(brandName) {
    return appStore.brands.find(brand => brand.url_brand === brandName)?.id
}

function getModel(brandName, modelName) {
    return appStore.brands.find(brand => brand.url_brand === brandName)?.car_models.find(model => model.url_model === modelName)?.id
}

/* Обновляем параметры фильтрации при переходе между страницами */
if ($route.name === 'model') {
    model.value = getModel($route.params.brand, $route.params.model) || 0;
}
if (['brand', 'model'].includes($route.name)) {
    brand.value = getBrand($route.params.brand) || 0;
}
/* Обновляем параметры фильтрации при переходе между страницами */

if ($route.name != 'car') {
    appStore.recentPage = $route.name
}

function reset() {
    model.value = $route.name === 'model' ? model.value : 0;

    modification.value = 0;
    complectation.value = 0;
    fuel.value = 0;
    transmission.value = 0;
    drive.value = 0;

    selectedPriceFrom.value = null;
    selectedPriceTo.value = null;

    unmaskedPriceFrom.value = null;
    unmaskedPriceTo.value = null;

    fullQuary = ``

    emit('showCars', fullQuary)
    getFilterData(false)
}

function updateFilter(from) {
    if (brand.value == 0) {
        model.value = 0
    }

    if (from == 'brand') {
        model.value = 0
        modification.value = 0
        complectation.value = 0
        fuel.value = 0
        transmission.value = 0
        drive.value = 0
        priceFrom.value = 0
        priceTo.value = 0
    }

    updateQuery()

    paramsLoading.value = true
    filterLoading.value = true

    fetchClientWrapper(`${apiNew}filters/params?${fullQuary}`)
        .then(res => res.json())
        .then(data => quary.value = data)
        .then(() => from == 'model' && model.value != 0 ? null : models.value = quary.value.models)
        .then(() => from == 'modification' && modification.value != 0 ? null : modifications.value = quary.value.modifications)
        .then(() => from == 'complectation' && complectation.value != 0 ? null : complectations.value = quary.value.complectations)
        .then(() => from == 'fuel' && fuel.value != 0 ? null : fuels.value = quary.value.fuels)
        .then(() => from == 'transmission' && transmission.value != 0 ? null : transmissions.value = quary.value.transmissions)
        .then(() => from == 'drive' && drive.value != 0 ? null : drives.value = quary.value.drives)
        .then(() => priceFrom.value = quary.value.priceFrom)
        .then(() => priceTo.value = quary.value.priceTo)
        .then(() => countCars.value = quary.value.countCars)
        .then(() => filterLoading.value = false)
        .then(() => paramsLoading.value = false)
}

const showFilter = ref(false)
function toggleFilter() {
    showFilter.value = !showFilter.value
}

getFilterData(true)
</script>

<template>
    <section class="section filter">
        <div class="container">
            <div class="filter__header">
                <BaseSectionTitle :title="'Подобрать новые авто по параметрам'" />
            </div>  
            <div class="filter__mobile">
                <div class="filter__button-mobile" @click="toggleFilter()">
                    <span>{{ showFilter ? `Скрыть фильтры` : `Показать фильтры` }}</span>
                    <span v-if="!showFilter"><i class="fa-solid fa-filter" /></span>
                    <span v-else><i class="fa-solid fa-xmark" /></span>
                </div>
                <button class="filter__mobile-reset" @click="reset">
                    Сбросить все
                    <span class="filter__header-reset-icon">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </button>
            </div>    
            <div class="filter__content" :class="{ 'active': showFilter }">
                <div class="filter__body">
                    <div class="filter__body-selects">
                        <div class="filter__body-column fields">
                            <BaseSelect v-model="brand" :label="'Марка'" :options="brands"
                                :disabled="$route.name == 'brand' || $route.name == 'model' || paramsLoading"
                                class='semi-wide' @change="updateFilter('brand')" />

                            <BaseSelect v-model="model" :label="'Модель'" :options="models"
                                :disabled="brand == 0 || $route.name == 'model' || paramsLoading"
                                @change="updateFilter('model')" />

                            <BaseSelect v-model="fuel" :label="'Тип двигателя'" :options="fuels"
                                :disabled="brand == 0 || model == 0 || paramsLoading" 
                                @change="updateFilter(`fuel`)" />

                            <BaseSelect v-model="transmission" :label="'Коробка'" :options="transmissions"
                                :disabled="brand == 0 || model == 0 || paramsLoading" 
                                @change="updateFilter(`transmission`)" />

                            <BaseSelect v-model="drive" :label="'Привод'" 
                                :disabled="brand == 0 || model == 0 || paramsLoading" 
                                :options="drives"
                                @change="updateFilter(`drive`)" />
                        </div>

                        <div class="filter__body-column">
                            <label class="filter__body-input wide">
                                <input v-model="selectedPriceFrom" v-maska="options" type="text" name="selectPriceFrom"
                                    :placeholder="`Цена, от ${makeSpaces(priceFrom)} руб`" autocomplete="off"
                                    :disabled="brand == 0 || model == 0 || paramsLoading" 
                                    @maska="unPriceFrom" @change="updateFilter()"
                                    maxlength="10">
                                <span class="separator">|</span>
                                <input v-model="selectedPriceTo" v-maska="options" type="text" name="selectPriceTp"
                                    :placeholder="`до ${makeSpaces(priceTo)} руб`" autocomplete="off"
                                    inputmode="numeric" 
                                    :disabled="brand == 0 || model == 0 || paramsLoading" 
                                    @maska="unPriceTo"
                                    @change="updateFilter()" maxlength="10">
                            </label>

                            <BaseButton :disabled="!countCars || filterLoading"
                                class="filter__body-button black-button semi-wide"
                                :label="countCars > 0 ? `Показать ${countCars} объявлений` : 'Авто не найдено'"
                                @click="emit('showCars', fullQuary), appStore.newCatalog.scrollIntoView({ behavior: 'smooth' })">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </BaseButton>

                            <button class="filter__header-reset" @click="reset">
                                Сбросить все
                                <span class="filter__header-reset-icon">
                                    <i class="fa-solid fa-xmark"></i>
                                </span>
                            </button>
                        </div>
                    </div>

                    {{ appStore.catalog }}

                    <div class="filter__body-selects mobile">
                        <div class="filter__body-column">
                            <BaseSelect v-model="brand" :label="'Марка'" :options="brands"
                                :disabled="$route.name == 'brand' || $route.name == 'model' || paramsLoading"
                                class="wide" @change="updateFilter('brand')" />
                        </div>

                        <div class="filter__body-column">
                            <BaseSelect v-model="model" :label="'Модель'" :options="models"
                                :disabled="brand == 0 || $route.name == 'model' || paramsLoading" class="wide"
                                @change="updateFilter('model')" />
                        </div>

                        <div v-show="showMoreFilter" class="filter__body-column more">
                            <Title :title="'Дополнительные параметры'" class="wide" />
                            <BaseSelect v-model="fuel" :label="'Тип двигателя'" :options="fuels" class="wide"
                                :disabled="brand == 0 || model == 0 || paramsLoading" 
                                @change="updateFilter(`fuel`)" />

                            <BaseSelect v-model="transmission" :label="'Коробка'" :options="transmissions" class="wide"
                                :disabled="brand == 0 || model == 0 || paramsLoading" 
                                @change="updateFilter(`transmission`)" />

                            <BaseSelect v-model="drive" :label="'Привод'" :options="drives" class="wide"
                                :disabled="brand == 0 || model == 0 || paramsLoading" 
                                @change="updateFilter(`drive`)" />

                            <label class="filter__body-input wide">
                                <input v-model="selectedPriceFrom" v-maska="options" type="text" name="selectPriceFrom"
                                    :placeholder="`Цена, от ${makeSpaces(priceFrom)} руб`" autocomplete="off"
                                    inputmode="numeric" 
                                    :disabled="brand == 0 || model == 0 || paramsLoading" 
                                    @maska="unPriceFrom"
                                    @change="updateFilter()" maxlength="10">
                                <span class="separator">|</span>
                                <input v-model="selectedPriceTo" v-maska="options" type="text" name="selectPriceTp"
                                    :placeholder="`до ${makeSpaces(priceTo)} руб`" autocomplete="off"
                                    inputmode="numeric" 
                                    :disabled="brand == 0 || model == 0 || paramsLoading" 
                                    @maska="unPriceTo"
                                    @change="updateFilter()" maxlength="10">
                            </label>
                        </div>

                        <div class="filter__body-column">
                            <BaseButton :disabled="!countCars || filterLoading"
                                class="wide filter__body-button wide black-button"
                                :label="countCars > 0 ? `Показать ${countCars} объявлений` : 'Авто не найдено'"
                                @click="emit('showCars', fullQuary), appStore.newCatalog.scrollIntoView({ behavior: 'smooth' })" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.filter {
    .filter__button-mobile {
        display: none;
        cursor: pointer;
        padding: 13px 15px;
        white-space: nowrap;
        background: #f6f6f6;
        border-radius: 20px;
        gap: 10px;
        width: 48%;
        margin-top: 15px;
        @media screen and (max-width: 768px) {
            display: inline-flex;
        }
    }

    .filter__content {
        border-radius: 20px;
        flex-direction: column;
        gap: 20px;
        display: none;
        margin-top: 15px;
        @media screen and (min-width: 768px) {
            display: flex;
        }

        .filter__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            @media screen and (max-width: 540px) {
                flex-wrap: wrap;
            }
        }

        .filter__header-reset {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            color: white;
            background: #9F9F9F;
            padding: 10px 15px;
            border-radius: var(--border-input-radius);

            .filter__header-reset-icon {
                background: #9F9F9F;
                border: 2px solid white;
                width: 25px;
                height: 25px;
                border-radius: 100%;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            @media screen and (max-width: 540px) {
                margin-top: 15px;
            }
        }

        .filter__body-selects {
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr 1fr;

            @media screen and (max-width: 1300px) {
                grid-template-columns: 1fr 1fr;
            }

            @media screen and (max-width: 1000px) {
                grid-template-columns: 1fr;
                gap: 35px;
            }

            @media screen and (max-width: 768px) {
                display: none;
                padding-top: 0;
            }

            .filter__body-column {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;

                @media screen and (max-width: 500px) {
                    grid-template-columns: 1fr;
                    column-gap: 0;
                    row-gap: 10px;
                }
            }

            .filter__body-column.more {
                margin-top: 0px;
            }

            .filter__body-select {
                position: relative;

                &:after {
                    content: "\f107";
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-family: "Font Awesome 6 Free";
                    font-weight: 900;
                    pointer-events: none;
                    width: 26px;
                    height: 26px;
                    border-radius: 100%;
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #9F9F9F; /* Серый цвет по умолчанию */
                    transition: color 0.3s;
                }

                &:not(:disabled):after {
                    color: var(--main-color);
                }

                select:disabled + &:after {
                    opacity: 0.5;
                }

                @media screen and (max-width: 500px) {
                    grid-column-start: 1;
                }

                select {
                    background: white;
                    min-width: 210px;
                    width: 100%;
                    padding: 15px 15px;
                    color: #767676;
                    border-radius: 20px;

                    option {
                        padding: 5px;
                    }
                }

                select.active {
                    font-weight: bold;
                }
            }

            .filter__body-show {
                display: inline-block;
                width: max-content;
                padding: 10px 15px;
                background: #f6f6f6;
                border-radius: 20px;
                font-size: 16px;
            }

            .semi-wide {
                grid-column-start: 1;
                grid-column-end: 3;
            }

            .wide {
                grid-column-start: 1;
                grid-column-end: 4;
            }

            .filter__body-input {
                background: white;
                min-width: 210px;
                width: 100%;
                padding: 15px 15px;
                color: #767676;
                border-radius: 20px;
                display: flex;
                border: var(--border);
                border-radius: var(--border-input-radius);

                .separator {
                    padding: 0 5px;
                }

                input {
                    width: 49%;
                }

                input {
                    &:last-child {
                        text-align: end;
                    }
                }
            }

            .filter__body-button {
                border: none;
                font-weight: bold;
                color: white;
                background: var(--main-color);
                border-radius: var(--border-input-radius);
            }
        }

        .filter__body-selects.mobile {
            display: none;
            gap: 10px;

            @media screen and (max-width: 768px) {
                display: grid;
            }
        }


        .filter__body-bodies {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(8, 1fr);
            border: none;

            @media screen and (max-width: 1200px) {
                display: none;
            }

            .filter__body-body {
                display: inline-flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 10px;
                padding: 20px 25px;
                border: none;
                border-radius: 20px;
                transition: 0.3s;
                cursor: pointer;

                p {
                    transition: 0.3s;
                    font-size: 12px;
                }

                &:hover {
                    border: 2px solid var(--main-black);
                    transition: 0.3s;

                    p {
                        font-weight: bold;
                        transition: 0.3s;
                    }
                }

                img {
                    object-fit: contain;
                    height: 100%;
                    width: 100%;
                }
            }


        }

        .filter__body-controls {
            padding-top: 20px;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;

            @media screen and (max-width: 540px) {
                gap: 5px;
            }

            .controls__item {
                padding: 8px 14px;
                background: white;
                border-radius: 20px;
                cursor: pointer;
                transition: 0.3s;

                &:hover {
                    background: var(--main-black);
                    color: var(--bg-light);
                    transition: 0.3s;
                }

                @media screen and (max-width: 540px) {
                    font-size: 12px;
                    padding: 8px 8px;
                }
            }
        }
    }

    .filter__content.active {
        display: flex;
        margin: 10px 0;
    }
}

select:disabled {
    opacity: 0.5;
}

.filter__mobile{
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;
}
.filter__mobile-reset{
    display: none;
    cursor: pointer;
    padding: 13px 15px;
    white-space: nowrap;
    background: #f6f6f6;
    border-radius: 20px;
    gap: 10px;
    margin-top: 15px;
    font-size: 14px;
    color: black;
    width: 48%;
    @media screen and (max-width: 768px) {
        display: inline-flex;
    }
}
</style>