<script setup>
import { useRoute } from 'vue-router';

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const $route = useRoute();

let showBurger = ref(false);
function toggleBurger() {
    showBurger.value = !showBurger.value

    if (showBurger.value) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}

const isScrolled = ref(false)

watch($route, () => showBurger.value = false)
</script>

<template>
    <header class="header" :class="{ 'scrolled': isScrolled }">
        <div class="header__top">
            <div class="container">
                <div class="header__top-content">
                    <div class="header__top-adress">
                        <img src="/svg/Vector4.svg" class="svg__logo" alt="" />
                        {{ appStore.address }}
                    </div>
                    <div class="header__top-phone">
                        <a :href="`tel:+${appStore?.clearPhone}`" class="header__top-phone-link">
                            <img src="/svg/Vector5.svg" class="svg__logo" alt="" />
                            {{ appStore.phone }}
                        </a>
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
                                    <!-- <li class="dropdown-item">
                                        <NuxtLink to="/cars/china" class="dropdown-link">Китайские авто</NuxtLink>
                                    </li> -->
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
                        <!-- <div class="header__button">
                            <BaseButtonModal :btnLabel="'Позвоните мне'" :btnMobileIcon="`fa-solid fa-phone`"
                                :btnIcon="`fa-solid fa-phone`"
                                :modalTitle="`Закажите обратный звонок и наш специалсит перезвонит Вам в течение 15 минут!`"
                                btnClass="header" :app-type="1" />
                        </div> -->
                        <div class="header__call">
                            <a :href="`tel:+${appStore?.clearPhone}`" class="header__call-link">
                                <!-- <i class="fa-solid fa-phone"></i> -->
                                <img src="/svg/Vector5.svg"  alt="" />
                            </a>
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
    </header>
</template>

<style scoped lang="scss">
.header {
    position: sticky;
    top: 0;
    height: auto;
    z-index: 999;
    transition: all 0.7s ease;
    background: #DEDEDE;
    color: #0091B9;
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
                    padding: 30px 28px;
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
        padding-right: 20px;
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