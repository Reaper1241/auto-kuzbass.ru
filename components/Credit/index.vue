<script setup>
/* Form Check */
const car = ref('');
function returnEmit(value) {
    car.value = value
}
/* Form Check */

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useCreditStore } from "/stores/CreditStore.js";
const creditStore = useCreditStore();

const props = defineProps({
    minPercent: Number,
    default: 0
})

creditStore.carNew = null

const loading = ref(true);
onMounted(() => {
    loading.value = false
})

const rangeValue = ref(50);
const banks = appStore.banks;
</script>

<template>
    <section class="page section credit__section">
        <div class="container">
            <div class="section__header credit__section-header">
                <BasePageTitle />
                <span v-if="appStore.selectedBankId" class="title-bank">
                  в {{ appStore.selectedBank.name }}
                    <!-- в <img :src="appStore.selectedBank.image" alt="logo bank"> -->
                </span>
            </div>

            <ClientOnly v-if="!loading">
                <div class="page__content">
                    <div class="page__form">
                        <div class="form__form">
                            <FormCredit @showCar="returnEmit" :minPercent="minPercent" />
                        </div>
                    </div>
                    <div class="page__text">
                        <div class="car__choice">
                            <div class="car-show" v-if="creditStore.carNew && creditStore.category == 'new'">
                                <div class="car-show__wrapper">
                                    <div class="car-show__image">
                                        <NuxtImg lazy format="webp" quality="90" loading="lazy"
                                            :src="`${creditStore.carNew.images[0]?.url ? creditStore.carNew.images[0].url : ''}`" />
                                    </div>
                                    <div class="car-show__content">
                                        <div class="car-show__title">
                                            {{ cleanUpTitle(creditStore.carNew.brand, creditStore.carNew.model,
                                                creditStore.carNew.modification.modification,
                                                creditStore.carNew.complectation.complectation) }}
                                        </div>
                                        <div class="car-show__price">
                                            <div class="block">
                                                <span class="old">
                                                    от {{ makeSpaces(creditStore.carNew.price) }} ₽
                                                </span>
                                                <span class="current">
                                                    от
                                                    {{ makeSpaces(creditStore.carNew.price - creditStore.carNew?.sale)
                                                    }}
                                                    ₽
                                                </span>
                                            </div>
                                        </div>
                                        <div class="car-show__params">
                                            <ul class="car-show__params-list">
                                                <li class="car-show__params-item"
                                                    v-if="creditStore.carNew.modification.power">
                                                    <span class="title">Мощность</span>
                                                    <span class="value">{{ creditStore.carNew.modification.power }}
                                                        л.с.</span>
                                                </li>
                                                <li class="car-show__params-item"
                                                    v-if="creditStore.carNew.modification.from_0_to_100">
                                                    <span class="title">Разгон 0-100</span>
                                                    <span class="value">{{ creditStore.carNew.modification.from_0_to_100
                                                    }} с</span>
                                                </li>
                                                <li class="car-show__params-item"
                                                    v-if="creditStore.carNew.modification.max_speed">
                                                    <span class="title">Макс.скорость</span>
                                                    <span class="value">{{ creditStore.carNew.modification.max_speed }}
                                                        км/ч
                                                    </span>
                                                </li>
                                                <li class="car-show__params-item"
                                                    v-if="creditStore.carNew.modification.drive">
                                                    <span class="title">Привод</span>
                                                    <span class="value">{{ creditStore.carNew.modification.drive }}
                                                        с</span>
                                                </li>
                                                <li class="car-show__params-item"
                                                    v-if="creditStore.carNew.modification.transmission">
                                                    <span class="title">Коробка</span>
                                                    <span class="value">{{ creditStore.carNew.modification.transmission
                                                    }}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="car-select" v-else>
                                <div class="car-select__wrapper" @click="creditStore.modalShow()">
                                    <div class="car-select__image">
                                        <NuxtImg lazy format="webp" quality="90" loading="lazy"
                                            src="/images/image8.png" alt="no image" />
                                    </div>
                                    <div class="car-select__title">
                                        {{ creditStore.category == 'new' ? 'Выберите марку и модель нового автомобиля' :
                                            'Выберите марку и модель автомобиля с пробегом' }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="page__text-content"
                            v-htmlSanitizer="appStore?.newSeo[$route.name]?.text_content ? removeTrash(appStore.newSeo[$route.name].text_content) : null">
                        </div>
                    </div>
                </div>
                <h2 class="banks__title">Банки-партнеры</h2>
                <ul class="banks">
              <li v-for="bank in banks">
                <img :src="bank.image"/>
              </li>
            </ul>
            </ClientOnly>

            <div class="skeleton__wrapper" v-else>
                <div class="page__content">
                    <div class="page__form">
                        <div class="form__form">
                            <div class="skeleton text" />
                            <div class="skeleton image" />
                            <div class="skeleton text" />
                            <div class="skeleton text" />
                            <div class="skeleton image" />
                        </div>
                    </div>
                    <div class="page__text">
                        <div class="skeleton image" />

                        <div class="page__text-content"
                            v-htmlSanitizer="appStore?.newSeo[$route.name]?.text_content ? removeTrash(appStore.newSeo[$route.name].text_content) : null">
                        </div>
                    </div>
                </div>
                <div class="skeleton__bottom">
                  <div class="skeleton image"></div>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <div v-show="creditStore.isOpen">
                <ModalCarChoiceNew :selectedCategory="creditStore.category" @closeModal="creditStore.modalShow()"
                    @choiceCar="choiceCar($event)" />
            </div>
        </Teleport>
    </section>

</template>

<style scoped lang="scss">
.page__text-content{
    margin-left: 30px;
}
.car {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 15px;
    background: var(--light-grey);
    border-radius: 20px;
    overflow: hidden;

    .car__info {
        padding: 10px 20px;

        h2 {
            color: var(--main-black);
            font-size: 18px;
            text-align: center;
        }

        .car__list {
            margin-top: 20px;
            list-style: none;
            padding-left: 0;

            li {
                align-items: center;
                display: flex;
                justify-content: space-between;
            }
        }

        .car__sale {
            display: flex;
            justify-content: center;
            align-items: center;

            .car__sale-block {
                padding: 15px 20px;
                font-size: 18px;
                background: #36B555;
                border-radius: 20px;
                font-weight: bold;
                color: white;
            }
        }

        .car__price {
            margin: 10px 0;
            display: flex;
            gap: 5px;
            align-items: center;
            justify-content: center;

            @media screen and (max-width: 400px) {
                flex-direction: column;
            }

            .car__price-old {
                text-decoration: line-through;
            }

            .car__price-current {
                font-size: var(--big-size);
                font-weight: bold;

                span {
                    font-weight: inherit;
                    font-size: 26px;
                    color: var(--main-color);
                }
            }
        }
    }

    .car__img {
        display: flex;
        justify-content: center;

        img {
            max-width: 100%;
        }
    }
}

.credit__section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;

    span {
        font-size: var(--large-size);
        font-weight: bold;
    }

    .page__title {
        margin: 0;
    }

    .title-bank {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 100px;
            height: 100%;
            object-fit: contain;
        }
    }
}


.car__choice {
    .car-select {
        .car-select__wrapper {
            display: flex;
            flex-direction: column;
            gap: 15px;
            justify-content: center;
            align-items: center;

            padding: 50px 30px;
            border-radius: 20px;

            cursor: pointer;
            transition: 0.3s;

            &:hover {
                opacity: 0.7;
                transition: 0.3s;
            }

            .car-select__title {
                width: 100%;
                text-align: center;
                padding: 10px 20px;
                background: var(--main-color);
                color: white;
                border-radius: 4px;
            }

            .car-select__image {
                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
    }

    .car-show {
        .car-show__wrapper {
            display: grid;
            grid-template-columns: 2fr 3fr;
            gap: 10px;
            overflow: hidden;
            border-radius: 20px;
            box-shadow: var(--box-shadow);
            cursor: pointer;

            @media screen and (max-width: 768px) {
                grid-template-columns: 1fr;
            }

            .car-show__content {
                padding: 20px 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                gap: 10px;

                .car-show__title {
                    font-size: 18px;
                    font-weight: 600;
                }

                .car-show__params {
                    .car-show__params-list {
                        display: grid;
                        list-style: none;
                        padding: 0;
                        grid-template-columns: 1fr;
                        column-gap: 30px;
                        row-gap: 0;

                        @media screen and (max-width: 768px) {
                            grid-template-columns: 1fr;
                            gap: 0;
                        }

                        .car-show__params-item {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 5px 0;

                            .value {
                                order: 2;
                            }

                            .title {
                                font-weight: 500;
                            }

                            &::after {
                                content: "";
                                display: block;
                                flex-grow: 1;
                                height: 1px;
                                background-color: #e6e8ec;
                                margin: 0 8px;
                                position: relative;
                                top: 5px
                            }
                        }
                    }
                }

                .car-show__price {
                    display: flex;
                    align-items: end;
                    gap: 15px;
                    flex-wrap: wrap;

                    @media screen and (max-width: 768px) {
                        gap: 5px;
                    }

                    .block {
                        display: flex;
                        flex-direction: column;
                    }

                    .old {
                        text-decoration: line-through;
                        color: var(--grey);
                    }

                    .current {
                        font-weight: bold;
                        font-size: 26px;
                        line-height: normal;
                        color: var(--main-color);
                    }

                    .credit {
                        color: var(--secondary-color);
                        font-size: var(--standart-size);
                        border: 1px solid var(--secondary-color);
                        padding: 5px;
                        border-radius: 20px;
                    }
                }
            }

            .car-show__image {
                padding: 30px;
                background: #f6f6f6;
                min-width: 250px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }
    }
}

.banks__title {
  font-size: 26px;
  line-height: 30px;
  margin: 30px 0;

  @media screen and (max-width: 540px) {
    margin: 10px 0 20px;
    font-size: 22px;
  }
}

.banks{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 15px;
  padding: 0;

  @media screen and (max-width: 1199px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 540px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 359px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  & li{
    list-style-type: none;
    padding: 0;

    & img{
      max-width: 140px;
      width: 100%;
      height: 39px;
      object-fit: contain;

      @media screen and (max-width: 359px) {
        height: 30px;
      }
    }
  }
}
</style>