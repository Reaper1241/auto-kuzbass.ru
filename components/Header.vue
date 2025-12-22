<script setup>
import { useRoute } from 'vue-router';
import { useAppStore } from '/stores/AppStore.js';
import { useNewStore } from '/stores/NewStore.js';
import { useNewCarStore } from '/stores/NewCarStore.js';

const appStore = useAppStore();
const newStore = useNewStore();
const carStore = useNewCarStore();
const $route = useRoute();

// currentCar теперь покрывает и модель, и отдельную машину (страница car)
const currentCar = computed(() => {
  // если страница модели
  if ($route.name === 'model' && newStore.model) {
    return {
      source: 'model',
      brand: newStore.model.brand,
      model: newStore.model.model,
      price: newStore.model.min_price,
      sale: newStore.model.sale,
      id: newStore.model.id ?? null
    };
  }

  // если страница отдельной машины (new car)
  if ($route.name === 'car' && carStore.car && Object.keys(carStore.car).length) {
    return {
      source: 'car',
      brand: carStore.car.brand,
      model: carStore.car.model,
      price: carStore.car.price ?? carStore.car.min_price ?? null,
      sale: carStore.car.sale ?? 0,
      id: carStore.car.id ?? carStore.car.car_id ?? null
    };
  }

  // иначе — нет информации о машине
  return null;
});
let showBurger = ref(false);
const isOpen = ref(false);
const currentModalTitle = ref("Оставьте заявку и мы перезвоним Вам!");
const currentAppType = ref(6); // Тип заявки для телефона
const isMobile = ref(false);
const isWorkingHours = ref(true); // Добавлено для проверки рабочего времени

function toggleBurger() {
    showBurger.value = !showBurger.value

    if (showBurger.value) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}

const isScrolled = ref(false)

// Проверка рабочего времени
function checkWorkingHours() {
  const now = new Date();
  const moscowOffset = 3 * 60 * 60 * 1000; // MSK (UTC+3)
  const moscowTime = new Date(now.getTime() + moscowOffset);
  const currentHour = moscowTime.getUTCHours();
  isWorkingHours.value = currentHour >= 5 && currentHour < 16;
}

function modalShow() {
  isOpen.value = true;
  checkWorkingHours(); // Проверяем время перед открытием
  
  if (!isWorkingHours.value) {
    currentModalTitle.value = "Мы работаем с 9:00 до 20:00. Оставьте заявку и мы перезвоним Вам в рабочее время! С уважением, команда Автосалона «CARPLAZA»";
    currentAppType.value = 1;
  } else {
    currentModalTitle.value = "Оставьте заявку и мы перезвоним вам в течение 30 минут!";
    currentAppType.value = 6;
  }
  document.body.style.overflow = 'hidden';
}

function handlePhoneClick() {
  if (isMobile.value) {
    checkWorkingHours();
    if (isWorkingHours.value) {
      // На мобилке и рабочее время - стандартное поведение звонка
      window.location.href = `tel:${appStore.phone.replace(/[^0-9+]/g, '')}`;
    } else {
      // На мобилке и нерабочее время - открываем модалку
      modalShow();
    }
  } else {
    // На десктопе - открываем модалку
    modalShow();
  }
}

function closeModal() {
  isOpen.value = false;
  document.body.style.overflow = 'auto';
}

onMounted(() => {
  // Определяем мобильное устройство
  isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Проверяем время при загрузке
  checkWorkingHours();
  
  // Проверяем время каждую минуту
  setInterval(checkWorkingHours, 60000);
  
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50;
  });
});

watch($route, () => showBurger.value = false)
</script>

<template>
    <header class="header" :class="{ 'scrolled': isScrolled }">
        <div class="header__top">
            <div class="container">
                <div class="header__top-content">
                    <div class="header__top-adress">
                        <img src="/svg/Vector4.svg" class="svg__logo" alt="Vector" />
                        {{ appStore.address }}
                    </div>
                    <div class="header__top-phone">
                        <!-- Для мобильных - звонок (если рабочее время), для десктопа - модалка -->
                        <a v-if="isMobile && isWorkingHours" :href="`tel:${appStore.phone.replace(/[^0-9+]/g, '')}`" class="header__top-phone-link">
                            <img src="/svg/Vector5.svg" class="svg__logo" alt="Vector" />
                            {{ appStore.phone }}
                        </a>
                        <button v-else class="header__top-phone-link" @click="handlePhoneClick">
                            <img src="/svg/Vector5.svg" class="svg__logo" alt="Vector" />
                            {{ appStore.phone }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="header__wrap">
            <div class="container">
                <div class="header__content">
                    <div class="header__logo">
                        <BaseLogo />
                    </div>

                    <nav class="header__navbar">
                        <ul class="navbar-list">
                            <li class="navbar-item dropdown">
                                <NuxtLink class="navbar-link dropdown-head-link">Автомобили <i
                                        class="fa-solid fa-chevron-down"></i></NuxtLink>
                                <ul class="dropdown-list">
                                    <li class="dropdown-item">
                                        <NuxtLink to="/cars" class="dropdown-link">Все авто</NuxtLink>
                                    </li>
                                    <li class="dropdown-item">
                                        <NuxtLink to="/cars/taxi" class="dropdown-link">Авто для такси</NuxtLink>
                                    </li>
                                </ul>
                            </li>
                            <li class="navbar-item">
                                <NuxtLink to="/credit" class="navbar-link">Автокредит</NuxtLink>
                            </li>
                            <li class="navbar-item">
                                <NuxtLink to="/trade-in" class="navbar-link">Трейд-ин</NuxtLink>
                            </li>
                            <li class="navbar-item">
                                <NuxtLink to="/banks" class="navbar-link">Банки</NuxtLink>
                            </li>
                            <li class="navbar-item">
                                <NuxtLink to="/contact" class="navbar-link">Контакты</NuxtLink>
                            </li>
                        </ul>
                    </nav>

                    <div class="header__block">
                        <div class="header__call">
                            <!-- Иконка телефона - на мобилке звонок (если рабочее время), на десктопе модалка -->
                            <a v-if="isMobile && isWorkingHours" :href="`tel:${appStore.phone.replace(/[^0-9+]/g, '')}`" class="header__call-link">
                                <img src="/svg/Vector5.svg" alt="Vector" />
                            </a>
                            <button v-else class="header__call-link" @click="handlePhoneClick">
                                <img src="/svg/Vector5.svg" alt="Vector" />
                            </button>
                        </div>
                        <div class="header__menu mobile-menu" @click="toggleBurger()" :class="{ 'active': showBurger }">
                            <i class="fa-solid fa-bars"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Teleport to="body">
            <div class="mobile-menu__overlay" :class="{ 'active': showBurger }">
                <div class="mobile-menu__overlay-close" @click="toggleBurger()"><i class="fa-solid fa-xmark"></i></div>
                <div class="mobile-menu__overlay-content">
                    <PieceNavbar :class="`burger`" />
                    <PieceContacts class="burger" />
                    <FormSmall class="burger" />
                </div>
            </div>
        </Teleport>

        <!-- Модалка для телефона -->
        <Teleport to="body">
            <div v-if="isOpen" class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" @click="closeModal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <h3 class="modal-title">{{ currentModalTitle }}</h3>
                    <FormSmall /> <!-- Ваш компонент формы -->
                </div>
            </div>
        </Teleport>
        
    </header>
</template>

<style scoped lang="scss">

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
    background: white;
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

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-group textarea {
    min-height: 100px;
    resize: vertical;
}

.submit-btn {
    background-color: var(--main-color);
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
}

.submit-btn:hover {
    background-color: var(--main-color);
}
.header {
    position: sticky;
    top: 0;
    height: auto;
    z-index: 999;
    transition: all 0.7s ease;
    background: #DEDEDE;
    color: var(--main-color);
    width: 100%;

    @media screen and (max-width: 1000px) {
        padding: 0;
    }

    .header__wrap {
        display: flex;
        justify-content: center;
        width: 100%;
        background: white;
        box-shadow: var(--box-shadow);
    }

    .header__top {
        background: var(--main-color2);
        padding: 8px 0;
        
        @media screen and (max-width: 767px) {
            display: none;
        }

        .header__top-content {
            gap: 20px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            
            .header__top-adress,
            .header__top-phone {
                display: flex;
                align-items: center;
                gap: 5px;
                @media screen and (max-width: 768px) {
                    font-size: 12px;
                    
                }
                img{
                    height: 20px;
                    // filter:brightness(0) 
                    //     invert(20%) 
                    //     sepia(100%) 
                    //     saturate(5000%) 
                    //     hue-rotate(0deg);
                }
            }
        }
    }

    .header__content {
        display: grid;
        grid-template-columns: auto 1fr auto;
        justify-content: space-between;
        align-items: center;
        background: white;
        border-radius: 20px;
        column-gap: 15px;
        padding: 15px 0;
        max-width: 100vw;

        @media screen and (max-width: 1000px) {
            border-radius: 20px;
            padding: 5px 20px;
            grid-template-columns: auto 1fr;
        }

        .header__navbar {
            padding: 0 10px;
            display: flex;
            justify-content: flex-end;
            align-items: center;  
            @media screen and (max-width: 1000px) {
                display: none;
            }

            .dropdown {
                position: relative;
                
                &:hover {
                    .dropdown-list {
                        visibility: visible;
                        opacity: 1;
                        pointer-events: all;
                    }

                    .dropdown-head-link {
                        i {
                            transform: rotate(-180deg);
                            transition: 0.3s;
                        }
                    }
                }

                .dropdown-head-link {
                    transition: 0.3s;

                    i {
                        transition: 0.3s;
                    }
                }

                .dropdown-list {
                    position: absolute;
                    top: 25px;
                    left: -35px;
                    visibility: hidden;
                    opacity: 0;
                    background: var(--bg-light);
                    box-shadow: 15px -15px 30px 0px rgba(230, 230, 230, 0.2), -15px 15px 30px 0px rgba(230, 230, 230, 0.2);
                    border-radius: 30px;
                    width: max-content;
                    padding: 30px 28px 5px 28px;
                    pointer-events: none;
                    transition: all 0.3s ease;

                    .dropdown-item {
                        color: var(--main-black);
                        position: relative;
                        padding-right: 30px;
                        font-size: 16px;
                        line-height: 18px;
                        color: #2d2d2d;
                        border-bottom: 1px solid #f2f2f2;
                        margin-bottom: 20px;
                        transition: all 0.3s ease;
                        display: block;
                        padding: 10px 0;
                        cursor: pointer;
                        white-space: nowrap;

                        &:hover {
                            color: var(--secondary-color);
                            transition: all 0.3s ease;
                            border-color: var(--secondary-color);
                        }
                    }
                }
            }
        }

        .header__block {
            display: flex;
            align-items: center;
            justify-content: end;
            gap: 10px;
            width: 100%;
        }

        // .header__button {
        //     @media screen and (max-width: 768px) {
        //         display: none;
        //     }
        // }

        .header__call {
            .header__call-link {
                display: none;
                color: var(--bg-light);
                // background: var(--secondary-color);
                border-radius: 100%;
                // border: 2px solid var(--secondary-color);
                font-weight: bold;
                transition: 0.3s;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                width: 40px;
                height: 40px;

                @media screen and (max-width: 768px) {
                    display: flex;
                }
            }
        }
    }

    .header__menu.mobile-menu {
        display: none;

        @media screen and (max-width: 1000px) {
            display: block;
            font-size: 32px;
            padding: 5px;
            color: var(--main-color);
        }
    }
}


.header__top-phone-link {
    display: flex;
    align-items: center;
    gap: 5px;
}
.navbar-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;

    .navbar-item {
        .navbar-link {
            transition: 0.3s;
            font-size: var(--standart-size);
            padding: 5px 10px;
            border-radius: 20px;
            color: var(--main-black);
            cursor: pointer;

            @media screen and (max-width: 1500px) {
                padding: 5px 8px;
            }

            @media screen and (max-width: 400px) {
                font-size: var(--big-size);
            }
        }

        .router-link-active,
        .navbar-link:hover {
            transition: 0.3s;
            color: var(--secondary-color);
            position: relative;
        }
    }
}


.scrolled {
    @media screen and (min-width: 1000px) {
        padding: 0;
        max-width: 100%;

        .header__wrap {
            background: white;
            width: 100%;
            display: grid;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            box-shadow: var(--box-shadow);

            .header__content {
                max-width: 1560px;
                border-radius: 20px;
                box-shadow: none;
                width: 100%;
            }
        }
    }
}

.mobile-menu__overlay {
    padding: 20px;
    position: fixed;
    top: -1px;
    min-height: 100vh;
    background: white;
    z-index: 1000;
    overflow: scroll;
    display: flex;
    
    flex-direction: column;
    align-items: center;
    width: 100%;
    transform: translateX(100%);
    transition: 0.3s;

    .mobile-menu__overlay-close {
        position: absolute;
        right: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: var(--main-black);
        border-radius: 100%;
        font-size: 20px;
        cursor: pointer;
        color: white;
    }

    .mobile-menu__overlay-content {
        overflow-y: auto;
        max-height: 100vh;
        padding: 20px 0;
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 15px;
        padding: 0 0 100px 0;
        // padding-right: 20px;
    }
}

.mobile-menu__overlay.active {
    transform: translateX(0);
    transition: 0.3s;
}


.mobile-menu {
    display: none;
    transition: 0.3s;
    background: transparent;

    @media screen and (max-width: 900px) {
        display: block;
        font-size: 32px;
        padding: 10px;
    }
}

.mobile-menu.active {
    transform: rotate(90deg);
}

.header.active {
    -webkit-box-shadow: 0 6px 6px rgb(0 0 0 / 20%);
    box-shadow: 0 6px 6px rgb(0 0 0 / 20%);
}

.modal__title {
    color: black;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateX(0);
    }

    to {
        opacity: 0;
        transform: translateX(-100%);
    }
}
</style>