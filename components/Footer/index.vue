<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useError } from 'nuxt/app';
import { ref, computed, onMounted } from 'vue';

const appStore = useAppStore();
const error = useError();

const isError = computed(() => !!error.value);
const isWorkingHours = ref(true);

// Проверка рабочего времени
function checkWorkingHours() {
  const now = new Date();
  const moscowOffset = 3 * 60 * 60 * 1000; // MSK (UTC+3)
  const moscowTime = new Date(now.getTime() + moscowOffset);
  const currentHour = moscowTime.getUTCHours();
  isWorkingHours.value = currentHour >= 5 && currentHour < 16; // 9:00–21:00 как указано в футере
}

// Получаем правильный заголовок и тип в зависимости от времени
const getModalConfig = () => {
  checkWorkingHours();
  
  if (!isWorkingHours.value) {
    return {
      title: "Мы работаем с 9:00 до 20:00. Оставьте заявку и мы перезвоним вам в рабочее время! С уважением, команда Автосалона «CARPLAZA»",
      type: 1
    };
  } else {
    return {
      title: "Оставьте заявку и мы перезвоним вам в течение 30 минут!",
      type: 6
    };
  }
};

// Проверяем время при загрузке компонента
onMounted(() => {
  checkWorkingHours();
});
</script>

<template>
    <BannerEB1/>
    <footer class="footer">
      <div class="container">
        <section class="footer__top">
          <!-- СЛЕВА: Контакты -->
          <div class="footer__top-left">
            <BaseLogo class='footer-logo'/>
            <div class="footer__contacts"> 
              <p>
                <i class="fa-solid fa-location-dot"></i>
                <span class="footer__info-adress">{{ appStore.address }}</span>
              </p>
                <p class="time">{{ appStore.workingHours }}</p>
              <p>
                <i class="fa-solid fa-phone"></i>
                <span>{{ appStore.phone }}</span>
              </p>
              <p class="phone"><NuxtLink to="/contact">Заказать обратный звонок</NuxtLink></p>
            </div>
          </div>
  
          <!-- СПРАВА: Навигация + Инфо -->
          <div class="footer__top-right">
            <ul class="footer__nav">
                <li class="dropdown-item">
                    <NuxtLink to="/cars" class="dropdown-link">Каталог авто</NuxtLink>
                </li>
                <li class="dropdown-item">
                    <NuxtLink to="/cars/taxi" class="dropdown-link">Авто для такси</NuxtLink>
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
  
            <div class="footer__info">
              <p>
                Обращаем Ваше внимание на то, что данный сайт носит исключительно информационный
                характер и ни при каких условиях не является публичной офертой, определяемой
                положениями статьи 437 Гражданского кодекса Российской Федерации. Все цены указаны
                с учетом максимальной скидки на авто и при условии покупки в кредит и включают в
                себя обязательные страховые продукты, которые согласовываются и оплачиваются
                отдельно.
              </p>
              <p>
                ООО «ВИВАТ» ИНН 6320082324 КПП 632001001 ОГРН 1246300022088 Юридический адрес: 445037, САМАРСКАЯ ОБЛАСТЬ, Г. О. ТОЛЬЯТТИ, Г. ТОЛЬЯТТИ, ПРОЕЗДНОВЫЙ, Д.3, КОМ. 6Г-8
              </p>
              <p>Кредит предоставляется банками: АО «Т-Банк», Лицензия ЦБ РФ № 2673 от 09.07.2024; ПАО Сбербанк, Лицензия ЦБ РФ № 1481 от 11.08.2015; ПАО «Совкомбанк», Лицензия ЦБ РФ № 963 от 05.12.2014; Банк ГПБ (АО), Лицензия ЦБ РФ № 354 от 29.12.2014; АО «АЛЬФА-БАНК», Лицензия ЦБ РФ № 1326 от 16.01.2015; Банк ВТБ (ПАО), Лицензия ЦБ РФ № 1000 от 08.07.2015; ПАО Банк Зенит, Лицензия ЦБ РФ № 3255 от 16.12.2014; ООО "Драйв Клик Банк", Лицензия ЦБ РФ № 2168 от 09.12.2022.</p>
              <NuxtLink to="/politics/">Политика конфиденциальности</NuxtLink>
              <p>
                Для получения более подробной информации об указанных акциях, а также о стоимости
                автомобилей обращайтесь к менеджерам по продажам.
              </p>
            </div>
          </div>
        </section>
  
        <Teleport to="body">
          <div class="callback-button">
            <BaseButtonModal
              :btn-label="'Заказать обратный звонок'"
              :modal-title="getModalConfig().title"
              :btn-class="`callback-fixed`"
              :app-type="getModalConfig().type"
            />
          </div>
        </Teleport>
      </div>
    </footer>
</template>
  

<style scoped lang="scss">
.footer {
    padding: 40px 0;
    color: var(--main-black);
    background: #DEDEDE;
    margin-top: 30px;
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 575px) {
        padding-top: 20px;
    }

    .container {
        position: relative;
        max-width: 1450px;
        margin: 0 auto;
        padding: 0 35px;
        
    }

    .logo {
        width: max-content;
        height: 59px;
        margin-bottom: 60px;

        @media screen and (max-width: 1023px) {
            margin-bottom: 30px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    .footer__top {
        display: flex;
        justify-content: space-between;
        gap: 0px;
        flex-wrap: wrap;
        
        @media screen and (max-width: 800px) {
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
        }

        .footer__top-left, .footer__top-right {
            flex: 1;
            // min-width: 280px;
        }

        .footer__contacts {
            color: #15744e; // красный цвет иконок и текста
            font-size: 16px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-top: 50px;
            @media screen and (max-width: 800px) {
                align-items: flex-start; // Изменено с center на flex-start
                padding-left: 0; // Убираем отступ слева
                margin-left: 0; // Убираем margin слева
                width: 100%; // Занимает всю доступную ширину
            }
            a, p {
                margin-bottom: 10px;
                display: flex;
                // align-items: center;
                gap: 8px;
            
            }
            p{
                
            }

            .footer__info-adress {
            font-weight: bold;
            }
        }


        .footer__nav {
            list-style: none;
            padding: 0;
            margin-bottom: 20px;
            display: flex;
            text-wrap: nowrap;
            gap: 15px;
            @media screen and (max-width: 800px) {
                flex-direction: column;
            }
            li {
                margin-bottom: 8px;

                a {
                color: #000;
                font-size: 18px;
                font-weight: 500;
                text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                        color: #15744e;
                    }
                }
            }
        }

        .footer__top-center {
            @media screen and (max-width: 1023px) {
                display: none;
            }
        }

        .footer__top-right {
            // min-width: 230px;
            // width: 230px;
            
            @media screen and (max-width: 1023px) {
                margin-top: 0;
            }

            @media screen and (max-width: 800px) {
                width: 100%;
            }

            .footer__info-tel {
                font-size: 18px;
                line-height: 20px;
                margin-bottom: 15px;
            }

            .footer__info-adress {
                font-size: 15px;
                line-height: 26px;

                @media screen and (max-width: 767px) {
                    max-width: 100%;
                }
            }

            .footer__info-time {
                font-size: 15px;
                line-height: 16px;
                margin-top: 20px;

                @media screen and (max-width: 375px) {
                    margin-top: 10px;
                }
            }
        }

        .footer__top-title {
            font-weight: 400;
            line-height: 33px;
            margin-bottom: 23px;
            background: var(--main-black);
            border-radius: var(--border-radius);
            color: white;
            text-align: center;
            width: fit-content;
            padding: 4px 12px;

            @media screen and (max-width: 1023px) {
                font-size: 20px;
                line-height: 26px;
                text-transform: initial;
                margin-bottom: 15px;
            }
        }
    }

    .footer__bottom {
        margin-top: 30px;
        padding-top: 30px;
        border-top: 1px solid #D0D0D04A;
        color: #BBBBBB;

        @media screen and (max-width: 575px) {
            margin-top: 0;
            padding-top: 0;
            border-top: none;
        }

        .footer__info {
            @media screen and (max-width: 570px) {
                padding-bottom: 50px;
            }

            p,
            a {
                font-weight: 300;
                margin-bottom: 10px;
            }

            a {
                text-decoration: underline;
            }
        }
    }
}
.footer__top-left{
    display: flex;
    // flex-direction: column;
    // gap:0 !important;
    // padding: 0 !important;
}
.footer-logo{
    position: absolute;
    top: 0;
}
.callback-button {
    display: none;
    position: fixed;
    bottom: 10px;
    padding: 0 10px;
    z-index: 99;
    gap: 10px;
    width: 100%;

    .callback-button__icon {
        padding: 20px;
        background: var(--main-color-2);
        border-radius: 100%;

        i {
            font-size: 20px;
            color: white;
        }
    }

    .callback-button__text {
        padding: 10px;
        background: var(--main-color);
        color: white;
        border-radius: var(--border-small-radius);
        position: relative;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            height: 100%;
            width: 45px;
            transform: skewX(-45deg);
            left: -150%;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.4));
            animation: blick 3s infinite linear;
        }
    }

    @media screen and (max-width: 540px) {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}

.time{
    color: black;

}

.phone{
    color: black;
    text-decoration:underline;
    font-size: 12px;
}

.footer__top-left {
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 800px) {
        justify-content: flex-start; // Прижимаем контейнер к левому краю
        width: 100%; // Занимает всю доступную ширину
        padding-left: 0; // Убираем отступ слева
    }
}
.footer__info{
    font-size: 12px;
}
</style>