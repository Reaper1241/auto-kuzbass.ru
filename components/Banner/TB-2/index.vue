<script setup></script>

<template>
    <section class="callback__section section">
        <div class="container">
            <div class="callback__mob-img"></div>
            <div class='banner'>
                <div class="white-container">
                    <div class="callback__content">
                        <div class="callback__title">
                            <h2>Есть вопросы по покупке автомобиля в автосалоне «CARPLAZA»? </h2>
                            <h3>Оставьте заявку - перезвоним в течение 15 минут и расскажем всё, что нужно знать! 
Узнайте выгодные условия прямо сейчас!</h3>
                        </div>
                        <div class="taxi__form">
                            <FormBanner class="taxi__form-banner" />
                        </div>
                    </div>
                </div>    
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
        background: url(/images/image14.png) no-repeat center;
        background-size: cover;
        border-radius: var(--border-radius);
        padding: 20px; // Отступы от краев баннера
        position: relative;
        max-width: 1400px; // Добавлено ограничение ширины
        margin: 0 auto;

        @media screen and (max-width: 540px) {
            padding: 0;
            border-radius: 0px;
            // background-image: none;
            border-bottom: 1px solid #FFCC00;
            border-top: 1px solid #FFCC00;
        }
        
    }

    .white-container {
        background: white;
        opacity: 0.9;
        border-radius: var(--border-radius);
        padding: 20px;
        max-width: 500px;
        z-index: 1;
        margin-left: auto; // Прижимаем к правому краю
        margin-right: 0; // Убираем отступ справа
        
        @media screen and (max-width: 1000px) {
            margin-left: 0; // На мобильных растягиваем на всю ширину
            max-width: 100%;
            padding: 30px;
        }
        
        @media screen and (max-width: 540px) {
            padding: 20px;
            border-radius: 0px;
            opacity: 0.8; // Чуть менее прозрачный на мобильных
        }

    }

    .callback__content {
        display: flex;
        flex-direction: column;
        position: relative;
        color: var(--main-black); // Темный текст на белом фоне
        background: none;
        z-index: 1;
        @media screen and (max-width: 540px) {
            color: var(--bg-light); // Светлый текст на темном фоне (мобилки)
        }

        .callback__title {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10px;
            position: relative;
            padding-left: 0px;

            &::before {
                // content: "";
                // position: absolute;
                // left: 0;
                // top: 4px;
                // bottom: 4px;
                // width: 4px;
                // background-color: #e2001a; // Красная линия
                // border-radius: 2px;
            }

            h2 {
                display: flex;
                justify-content: flex-start; 
                align-items: flex-start; 
                text-align: left; 
                margin-bottom: 10px;
                font-size: 22px;
                font-weight: 700;
                color: var(--main-black);
                border-left: 2px solid #FFCC00;
                padding: 0 10px;
                @media screen and (max-width: 540px) {
                color: var(--main-black);
                }
            }

            h3 {
                display: flex;
                justify-content: flex-start; 
                align-items: flex-start; 
                margin: 0;
                padding: 0 10px;
                width: 100%;
                font-weight: 400;
                font-size: 14px;
                color: #555;
                text-align: left; 
                @media screen and (max-width: 540px) {
                    color: var(--main-black);;
                }
            }
        }
    }

    .callback__mob-img {
        display: none;
        @media screen and (max-width: 540px) {
            background: url(/images/callback__form-bg.webp) no-repeat 80% 50%;
            background-size: cover;
            height: 260px;
            margin-left: -20px;
            margin-right: -20px;
        }
    }

    // Стили формы (адаптированные под новый дизайн)
    .callback__form {
        display: flex;
        flex-direction: column;
        gap: 12px;

        input[type="text"],
        input[type="tel"] {
            width: 100%;
            padding: 14px 16px;
            font-size: 14px;
            border-radius: 6px;
            border: 1px solid #ccc;
            background-color: #fff;
            color: #000;
            transition: border 0.3s;

            &::placeholder {
            color: #aaa;
            }

            &:focus {
            border-color: #FFCC00;
            outline: none;
            }

            @media screen and (max-width: 540px) {
            background-color: rgba(255, 255, 255, 0.15);
            color: var(--bg-light);
            border-color: var(--bg-light);
            &::placeholder {
                color: var(--bg-light);
            }
            }
        }

        .callback__form-btn {
            padding: 14px;
            font-size: 14px;
            font-weight: 600;
            background-color: #FFCC00;
            border: none;
            border-radius: 6px;
            color: #fff;
            cursor: pointer;
            transition: 0.3s;

            &:hover {
            background-color: #d1a700;
            }

            @media screen and (max-width: 540px) {
            background-color: var(--secondary-color);
            }
        }

        .form-checkbox {
            display: flex;
            align-items: center;
            font-size: 12px;
            margin-top: 6px;

            input[type="checkbox"] {
            margin-right: 8px;
            accent-color: #FFCC00;
            }

                a {
                color: #FFCC00;
                text-decoration: underline;

                &:hover {
                    text-decoration: none;
                }
            }

            @media screen and (max-width: 540px) {
                color: var(--bg-light);
                a {
                    color: var(--bg-light);
                }
            }
        }
    }
}


.banner__title{
    position: absolute;
    display: flex;
}


.title{
    color: white;
    font-size: 26px;
    font-weight: 300;
    line-height: 50px;
    @media screen and (max-width: 1250px) {
        font-size: 20px;
    }
    @media screen and (max-width: 1100px) {
        font-size: 16px;
    }
    @media screen and (max-width: 1000px) {
        display: none;
    }
}
.title-span {
    display: block;
    font-size: 30px;
    font-weight: 700;
    @media screen and (max-width: 1250px) {
        font-size: 24px;
    }
    @media screen and (max-width: 1100px) {
        font-size: 20px;
    }
    @media screen and (max-width: 1000px) {
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
        display: none;
    }
}

.gift__title{
    color: white;
}
</style>