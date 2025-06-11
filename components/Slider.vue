<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const currentSlide = ref(0);
const isOpen = ref(false);
const modalTitle = ref("Оставьте заявку на LADA по госпрограмме");
const isWorkingHours = ref(true); // Добавляем проверку рабочего времени

const slides = ref([
    {
        text: "LADA по госпрограмме",
        title: "Выгода 20% на весь модельный ряд",
        image: "images/slider/image1.png",
        isSpecial: true // Этот слайд будет открывать модалку
    },
    {
        text: "Выгода 20% на весь модельный ряд",
        title: "Специальное предложение в «ТМН-Авто» Только до конца месяца!",
        url: "/credit",
        image: "images/slider/image2.png"
    },
    {
        text: "Летняя распродажа!",
        title: "Сезонные скидки до 30%",
        url: "/cars",
        image: "images/slider/image3.png"
    },
]);

// Проверка рабочего времени
function checkWorkingHours() {
  const now = new Date();
  const moscowOffset = 3 * 60 * 60 * 1000; // MSK (UTC+3)
  const moscowTime = new Date(now.getTime() + moscowOffset);
  const currentHour = moscowTime.getUTCHours();
  isWorkingHours.value = currentHour >= 7 && currentHour < 19;
}

const openModal = () => {
  checkWorkingHours(); // Проверяем время перед открытием модалки
  
  if (!isWorkingHours.value) {
    modalTitle.value = "Мы работаем с 9:00 до 21:00. Оставьте заявку и мы перезвоним Вам в рабочее время! С уважением, команда Автосалона TMN-auto";
  } else {
    modalTitle.value = "Оставьте заявку на LADA по госпрограмме";
  }
  
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isOpen.value = false;
  document.body.style.overflow = 'auto';
};

const handleSlideClick = (slide) => {
  if (slide.isSpecial) {
    openModal();
  } else if (slide.url) {
    navigateTo(slide.url);
  }
};

function prev(e) {
  e.stopPropagation(); // Останавливаем всплытие
  currentSlide.value--
  if (currentSlide.value < 0) {
    currentSlide.value = slides.value.length - 1
  }
}

function next(e) {
  e.stopPropagation(); // Останавливаем всплытие
  currentSlide.value++
  if (currentSlide.value > slides.value.length - 1) {
    currentSlide.value = 0
  }
}

onMounted(() => {
  // Проверяем время при загрузке
  checkWorkingHours();
  
  // Проверяем время каждую минуту
  setInterval(checkWorkingHours, 60000);
});
</script>

<template>
    <section class="main__slider section">
        <div class="container">
            <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide" :mouseDrag="true"
                class="home__slider" :gap="10" :autoplay="5000">
                <Slide v-for="(slide, index) in slides" :key="index">
                    <img class="slide__img" :src="slide.image" alt="car" />
                    <div class="slider__content">
                        <div class="carousel__item">
                            <p class="slide__text" @click.stop="handleSlideClick(slide)">
                                {{ slide.text }}
                            </p>
                            <h2 class="slide__title">{{ slide.title }}</h2>
                            <NuxtLink 
                              v-if="!slide.isSpecial" 
                              :to="slide.url" 
                              class="slide__link"
                            >
                                <p>Подробнее</p>
                            </NuxtLink>
                            <button  
                              v-else 
                              class="slide__link" 
                              @click.stop="openModal"
                            >
                                Подробнее
                            </button>
                        </div>
                    </div>
                </Slide>

                <template #addons>
                    <button class="carousel__prev" @click="prev($event)"></button>
                    <button class="carousel__next" @click="next($event)"></button>
                    <Pagination />
                </template>
            </Carousel>
        </div>
    </section>

    <Teleport to="body">
        <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
            <div class="modal-content">
                <button class="modal-close" @click="closeModal">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <h3 class="modal-title">{{ modalTitle }}</h3>
                <FormSmall />
            </div>
        </div>
    </Teleport>
</template>


<style scoped lang="scss">
.carousel__prev,
.carousel__next {
  pointer-events: auto !important;
  z-index: 10;
}
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-title {
    margin-bottom: 1.5rem;
    text-align: center;
}
.main__slider {
    .home__slider {
        border-radius: var(--border-radius);
        overflow: hidden;
        position: relative;
    }

    .carousel__slide {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 400px;
        @media screen and (max-width: 768px) {
            height: 400px;
        }    
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.55) 39%, rgba(0, 0, 0, 0) 63%);
            z-index: 0;
            pointer-events: none;
        }

        .slide__img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;

        }

        .slide__img1 {
            @media screen and (max-width: 768px) {
                object-position: 40% 50%;
            }
        }

        .slider__content {
            background: transparent;
            height: 100%;
            width: 100%;
            padding: 50px 100px;

            @media screen and (max-width: 768px) {
                padding: 50px 50px;
            }

            .carousel__item {
                color: var(--bg-light);
                position: relative;
                display: flex;
                flex-direction: column;
                padding: 100px 0;
                height: 100%;
                max-width: 600px;
                justify-content: center;
                gap: 15px;

                @media screen and (max-width: 1024px) {
                    padding: 50px 0;
                }

                @media screen and (max-width: 768px) {
                    padding: 20px 0;
                }

                .slide__title {
                    font-weight: 700;
                    font-size: 22px;
                    line-height: 40px;
                    text-align: left;
                    margin-top: 10px;
                    margin-bottom: 20px;
                    white-space: nowrap;
                    @media screen and (max-width: 980px) {
                        white-space: wrap;
                    }

                    @media screen and (max-width: 768px) {
                        font-size: 20px;
                        line-height: 36px;
                    }

                    @media screen and (max-width: 520px) {
                        font-size: 18px;
                        line-height: 30px;
                    }
                }

                .slide__text {
                    font-weight: 400;
                    font-size: 34px;
                    line-height: auto;
                    text-align: left;

                    @media screen and (max-width: 520px) {
                        font-weight: 500;
                        font-size: 17px;
                        line-height: 24px;
                    }
                }

                .slide__link {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 300px;
                    padding: 20px 25px;
                    background: var(--main-color);
                    border: 1px solid var(--main-color);
                    border-radius: 7px;
                    transition: all 0.3s ease;
                    margin-top: 0;
                    color: white;
                    @media screen and (max-width: 520px) {
                        padding: 10px 15px;
                    }

                    @media screen and (max-width: 375px) {
                        width: 100%;
                    }

                    &:hover {
                        background: transparent;

                        & p {
                            color: white;
                        }
                    }

                    & p {
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 18px;
                        background: transparent;
                    }
                }
            }
        }
    }

    .carousel__prev,
    .carousel__next {
        position: absolute;
        top: calc(50% - 10px);
        width: 50px;
        height: 50px;
        font-size: 0;
        padding: 0;
        z-index: 1;

        @media screen and (max-width: 768px) {
            display: none;
            width: 44px;
            height: 44px;
        }

        @media screen and (max-width: 520px) {
            opacity: .5;
        }
    }

    .carousel__prev {
        left: 10px;
        background: url(/svg/slider-left.svg) no-repeat center;
        background-size: contain;
    }

    .carousel__next {
        right: 10px;
        background: url(/svg/slider-right.svg) no-repeat center;
        background-size: contain;
    }
}
</style>