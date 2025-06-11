<script setup></script>

<template>
    <section class="callback__section section">
        <div class="container">
            <!-- <div class="callback__mob-img"></div> -->
            <div class='banner'>
                <div class="banner__title">
                    <h2 class="title"><span class="title-span"> Летняя распродажа! </span> Сезонные скидки до 30%</h2>
                </div>
                <NuxtLink to="/trade-in" class="banner__gift">
                    <!-- <img src="/svg/gift1.svg" class="svg__logo" alt="" /> -->
                    <!-- <div class="gift__title"><p>Оценить свой автомобиль 
                    </p>
                    </div>    -->
                </NuxtLink>
            
                <div class="banner__title-mob">
                    <h2 class="title-mob"><span class="title-span-mob">Летняя распродажа! </span> Сезонные скидки до 30%</h2>
                </div>
                <NuxtLink to="/banks" class="banner__gift-mob">
                    <!-- <img src="/svg/gift1.svg" class="svg__logo" alt="" /> -->
                    <!-- <div class="gift__title-mob"><p>Узнать подробнее 
                    </p>
                    </div>    -->
                </NuxtLink>
                <!-- <div class="white-container">
                    <div class="callback__content">
                        <div class="callback__title">
                            <h2>Хочу автомобиль с выгодой</h2>
                            <h3>Оставьте заявку! Мы свяжемся с Вами в течение 15 минут
                                и ответим на все вопросы о покупке авто!</h3>
                        </div>
                        <FormBanner class="callback__form" />
                    </div>
                </div>     -->
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.banner::before {
    content: "";
    position: absolute;
    inset: 0;
    // background-color: rgba(0, 0, 0, 0.35); // Полупрозрачная черная вуаль
    border-radius: var(--border-radius);
    z-index: 0;

}

.callback__section {
    .container {
        padding: 0;
        background: transparent;
    }

    .banner {
        background: url(/images/main.png) no-repeat center;
        background-size: cover;

        padding: 50px; // Отступы от краев баннера
        position: relative;
        max-width: 1400px; // Добавлено ограничение ширины
        height: 400px;
        margin: 0 auto;
        background-position: center 75%;
        @media screen and (max-width: 540px) {
            padding: 40px;
            background: url(/images/main.png) no-repeat center;
            border-radius: 0px;
            background-position: center 75%;
            background-size: 170%;
            max-height: 250px;
            // background-image: none;
            border-bottom: 1px solid var(--main-color);
            border-top: 1px solid var(--main-color);
        }
        @media screen and (max-width: 380px)
            {
                padding: 30px;
            }
    }

    // .white-container {
    //     background: white;
    //     opacity: 0.9;
    //     border-radius: var(--border-radius);
    //     padding: 20px;
    //     max-width: 500px;
    //     z-index: 1;
    //     margin-left: auto; // Прижимаем к правому краю
    //     margin-right: 0; // Убираем отступ справа
        
    //     @media screen and (max-width: 1000px) {
    //         margin-left: 0; // На мобильных растягиваем на всю ширину
    //         max-width: 100%;
    //         padding: 30px;
    //     }
        
    //     @media screen and (max-width: 540px) {
    //         padding: 20px;
    //         border-radius: 0px;
    //         opacity: 0.8; // Чуть менее прозрачный на мобильных
    //     }

    // }

    // .callback__content {
    //     display: flex;
    //     flex-direction: column;
    //     position: relative;
    //     color: var(--main-black); // Темный текст на белом фоне
    //     background: none;
    //     z-index: 1;
    //     @media screen and (max-width: 540px) {
    //         color: var(--bg-light); // Светлый текст на темном фоне (мобилки)
    //     }

    //     .callback__title {
    //         display: flex;
    //         flex-direction: column;
    //         align-items: center;
    //         margin-bottom: 10px;
    //         position: relative;
    //         padding-left: 12px;

    //         &::before {
                // content: "";
                // position: absolute;
                // left: 0;
                // top: 4px;
                // bottom: 4px;
                // width: 4px;
                // background-color: #e2001a; // Красная линия
                // border-radius: 2px;
    //         }

    //         h2 {
    //             margin-bottom: 10px;
    //             font-size: 22px;
    //             font-weight: 700;
    //             color: var(--main-black);

    //             @media screen and (max-width: 540px) {
    //             color: var(--main-black);
    //             }
    //         }

    //         h3 {
    //             font-weight: 400;
    //             font-size: 14px;
    //             color: #555;

    //             @media screen and (max-width: 540px) {
    //             color: var(--main-black);;
    //             }
    //         }
    //     }
    // }

    // .callback__mob-img {
    //     display: none;

    //     @media screen and (max-width: 540px) {
    //         display: block;
    //         background: url(/images/callback__form-bg.webp) no-repeat 80% 50%;
    //         background-size: cover;
    //         height: 260px;
    //         margin-left: -20px;
    //         margin-right: -20px;
    //     }
    // }

    // // Стили формы (адаптированные под новый дизайн)
    // .callback__form {
    //     display: flex;
    //     flex-direction: column;
    //     gap: 12px;

    //     input[type="text"],
    //     input[type="tel"] {
    //         width: 100%;
    //         padding: 14px 16px;
    //         font-size: 14px;
    //         border-radius: 6px;
    //         border: 1px solid #ccc;
    //         background-color: #fff;
    //         color: #000;
    //         transition: border 0.3s;

    //         &::placeholder {
    //         color: #aaa;
    //         }

    //         &:focus {
    //         border-color: #e2001a;
    //         outline: none;
    //         }

    //         @media screen and (max-width: 540px) {
    //         background-color: rgba(255, 255, 255, 0.15);
    //         color: var(--bg-light);
    //         border-color: var(--bg-light);
    //         &::placeholder {
    //             color: var(--bg-light);
    //         }
    //         }
    //     }

    //     .callback__form-btn {
    //         padding: 14px;
    //         font-size: 14px;
    //         font-weight: 600;
    //         background-color: #e2001a;
    //         border: none;
    //         border-radius: 6px;
    //         color: #fff;
    //         cursor: pointer;
    //         transition: 0.3s;

    //         &:hover {
    //         background-color: #b80016;
    //         }

    //         @media screen and (max-width: 540px) {
    //         background-color: var(--secondary-color);
    //         }
    //     }

    //     .form-checkbox {
    //         display: flex;
    //         align-items: center;
    //         font-size: 12px;
    //         margin-top: 6px;

    //         input[type="checkbox"] {
    //         margin-right: 8px;
    //         accent-color: #e2001a;
    //         }

    //             a {
    //             color: #e2001a;
    //             text-decoration: underline;

    //             &:hover {
    //                 text-decoration: none;
    //             }
    //         }

    //         @media screen and (max-width: 540px) {
    //             color: var(--bg-light);
    //             a {
    //                 color: var(--bg-light);
    //             }
    //         }
    //     }
    // }
}


.banner__title{
    position: absolute;
    display: flex;
    @media screen and (max-width: 540px) {
        display: none;
    }
}

.banner__title-mob{
    display: none;
    @media screen and (max-width: 540px) {
        position: absolute;
        display: flex;
        

    }
}


.title{
    color: white;
    font-size: 40px;
    font-weight: 300;
    line-height: 100px;
    @media screen and (max-width: 1250px) {
        font-size: 20px;
    }
    @media screen and (max-width: 1100px) {
        font-size: 20px;
    }
    @media screen and (max-width: 1000px) {
        // display: none;
    }
    @media screen and (max-width: 540px) {
        display: none;
    }

}

.title-mob{
    display: none;
    @media screen and (max-width: 540px) {
        display: flex;
        flex-direction: column;
        width: 300px;
        justify-content: center;
        color: white;
        font-weight: 300;
        line-height: 50px;
        font-size: 25px;
    }
}
.title-span-mob{
    display: none;
        @media screen and (max-width: 540px) {
        display: block;
        font-size: 30px;
        font-weight: 700;
        color: white;
        text-wrap: nowrap;
    }
}
.title-span {
    display: block;
    font-size: 64px;
    font-weight: 700;
    @media screen and (max-width: 1250px) {
        font-size: 24px;
    }
    @media screen and (max-width: 1100px) {
        font-size: 24px;
    }
    @media screen and (max-width: 1000px) {
        // display: none;
    }
    @media screen and (max-width: 540px) {
        display: none;
        
    }
}

.banner__gift{
    display: flex;
    align-items: center;
    position: absolute;
    top: 180px;
    gap: 10px;
    @media screen and (max-width: 1000px) {
        // display: none;
        
    }
    @media screen and (max-width: 540px) {
        display: none;
        
    }
}
.banner__gift-mob{
   display: none;
    @media screen and (max-width: 540px) {
        display: flex;
        align-items: center;
        position: absolute;
        top: 180px;
        gap: 10px;
        color: white;
        width: 100%;
    }
}
.gift__title-mob{
   display: none; 
    @media screen and (max-width: 540px) {
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--main-color);
        padding: 15px 15px;
        border-radius: 4px;
        width: 80%;
    }
}
.gift__title{
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-color);
    padding: 15px 15px;
    border-radius: 4px;
    width: 400px;
        @media screen and (max-width: 1000px) {
        // display: none;
        width: 300px;
    }
}
</style>