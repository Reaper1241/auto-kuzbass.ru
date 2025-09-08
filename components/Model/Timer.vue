<script setup>
function getNextMonday() {
    const now = new Date();
    const nextMonday = new Date(now);
    nextMonday.setHours(0, 0, 0, 0);

    if (now.getDay() === 1) {
        nextMonday.setDate(now.getDate() + 7);
    } else {
        nextMonday.setDate(now.getDate() + ((8 - now.getDay()) % 7));
    }

    return nextMonday;
}

const targetDate = ref(getNextMonday());
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let timer = null;

const daysZero = computed(() =>
    days.value <= 9 ? "0" + days.value : days.value
);
const hoursZero = computed(() =>
    hours.value <= 9 ? "0" + hours.value : hours.value
);
const minutesZero = computed(() =>
    minutes.value <= 9 ? "0" + minutes.value : minutes.value
);
const secondsZero = computed(() =>
    seconds.value <= 9 ? "0" + seconds.value : seconds.value
);

function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
        number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
    ];
}

function updateTimer() {
    const now = new Date();
    if (now >= targetDate.value) {
        targetDate.value = getNextMonday();
    }
    const leftUntil = targetDate.value - now;

    if (leftUntil < 0) {
        targetDate.value = getNextMonday();
        return;
    }

    days.value = Math.floor(leftUntil / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((leftUntil / (1000 * 60 * 60)) % 24);
    minutes.value = Math.floor((leftUntil / (1000 * 60)) % 60);
    seconds.value = Math.floor((leftUntil / 1000) % 60);
}

function startTimer() {
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

// Добавлено для модального окна и проверки рабочего времени
const isOpen = ref(false);
const currentModalTitle = ref("Оставьте заявку и мы перезвоним вам в течение 30 минут!");
const currentAppType = ref(6); // Тип заявки
const isWorkingHours = ref(true);
const isMobile = ref(false);

// Проверка рабочего времени (9:00 - 21:00 по Москве)
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

function closeModal() {
  isOpen.value = false;
  document.body.style.overflow = 'auto';
}

onMounted(() => {
    startTimer();
    // Определяем мобильное устройство
    isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // Проверяем время при загрузке
    checkWorkingHours();
    // Проверяем время каждую минуту
    setInterval(checkWorkingHours, 60000);
});
const props = defineProps({
  car: {
    type: Object,
    required: true
  }
})
onBeforeUnmount(() => {
    clearInterval(timer);
});
</script>

<template>
    <section class="express__section section">
        <div class="container bottom__container">
            <h2>
                <!-- Экспресс-кредит на авто под <span>такси</span> -->
            </h2>
            <div class="cards">
                <div class="banner__card">
                    <img class="banner-img" src="/public/images/kasko.svg" alt="">
                    <span>Каско в подарок</span>
                </div>
                <div class="banner__card">
                    <img class="banner-img" src="/public/images/kashback.svg" alt="">
                    <span>Кэшбек 100% на 4 платежа</span>
                </div>
                <div class="banner__card">
                    <img class="banner-img" src="/public/images/stavka.svg" alt="">
                    <span>Льготная ставка от 4.9%</span>
                </div>
                <div class="banner__card">
                    <img class="banner-img" src="/public/images/banki.svg" alt="">
                    <span>Более 15 банков-партнеров</span>
                </div>
            </div>
            <div class="red">

            </div>
            <FormTimer class="express__form" :car="car"/>
        </div>
    </section>
</template>


<style scoped lang="scss">
.banner__card{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    span{
        display: flex;
        height: 50px;
        // width: 100%;
        // align-items: center;
        text-align: start;
        @media screen and (max-width: 767px){
                        font-size: 12px;
                height: 30px;
            }
        
    }
}
.express__section {
    background: url(/public/images/banner_form.jpg) no-repeat 50% 1%;
    background-size: cover;
    max-width: 1400px;
    width: 100%;
    margin: 10px auto;
    color: var(--bg-light);
    border-radius: 4px;
    @media screen and (max-width: 540px) {
        background: url(/public/images/banner_form.jpg) no-repeat 31% 100%;
        background-size: auto;
    }

    .bottom__container {
        display: flex;
        flex-direction: row;
        height: 100%;
        gap: 30px;
        @media screen and (max-width: 768px){
            gap: 0px;
            flex-direction: column;
        }
        .express__form {
            display: flex;
            align-items: self-start;
            flex-direction: column;
            @media screen and (max-width: 1000px) {
                flex-direction: column;
            }
        }

        h2 {
            position: relative;
            font-weight: 800;
            font-size: 32px;
            line-height: 42px;
            margin-top: 74px;

            @media screen and (max-width: 1023px) {
                font-size: 28px;
                line-height: 30px;
                margin-top: 40px;
            }

            @media screen and (max-width: 767px) {
                font-size: 19px;
                line-height: 22px;
                margin-top: 30px;
            }

            @media screen and (max-width: 540px) {
                line-height: 30px;
                max-width: 320px;
            }

            @media screen and (max-width: 425px) {
                max-width: 250px;
            }

            &::before {
                // content: "";
                position: absolute;
                top: calc(50% - 2px);
                left: -265px;
                width: 250px;
                height: 4px;
                background: var(--bg-light);

                @media screen and (max-width: 1600px) {
                    content: none;
                }
            }

            & span {
                // position: relative;
                // display: inline-block;
                // color: var(--taxi);
                // padding-right: 42px;

                @media screen and (max-width: 540px) {
                    padding-right: 0;
                }

                &::before {
                    content: "";
                    position: absolute;
                    top: -5px;
                    right: 0;
                    width: 40px;
                    height: 16px;
                    // background: url(/public/images/kasko.png) no-repeat center;
                    background-size: contain;

                    @media screen and (max-width: 540px) {
                        top: 0;
                        right: -42px;
                    }
                }
            }
        }

        .cards {
            font-weight: 500;
            font-size: 20px;
            line-height: 40px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0px;
            margin-top: 0px;

            @media screen and (max-width: 1200px) {
                font-size: 16px;
                line-height: 30px;
                gap: 15px;
                margin: 0;
            }

            @media screen and (max-width: 1023px) {
                // flex-wrap: wrap;
                // justify-content: flex-end;
            }

            @media screen and (max-width: 767px) {
                display: flex;
                margin: 0 0px;
                flex-direction: row;
            }
            @media screen and (max-width: 600px) {
                display: grid;
                // margin: 0 20px;
                grid-template-columns: repeat(2,2fr);
                margin: 0;
            }
            @media screen and (max-width: 400px) {
                display: grid;
                // margin: 0 20px;
                grid-template-columns: repeat(2,2fr);
                margin: 0 0px;
            }

            & span {
                // position: relative;
                // padding-left: 50px;

                @media screen and (max-width: 1200px) {
                    // padding-left: 40px;
                }

                &::before {
                    // content: "";
                    // position: absolute;
                    // top: 0;
                    // left: 0;
                    // // background: url(/svg/star.svg) no-repeat center;
                    // background-size: contain;
                    // width: 40px;
                    // height: 40px;

                    // @media screen and (max-width: 1200px) {
                    //     width: 30px;
                    //     height: 30px;
                    // }
                }
            }
        }

        .bottom__form {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 19px;
            width: 100%;
            margin-top: auto;
            margin-bottom: 78px;

            @media screen and (max-width: 1023px) {
                gap: 15px;
                margin-bottom: 40px;
            }

            @media screen and (max-width: 767px) {
                flex-direction: column;
                max-width: 300px;
                margin-left: auto;
                margin-bottom: 30px;
            }

            @media screen and (max-width: 540px) {
                max-width: 100%;
            }

            .bottom__form-input {
                width: 100%;
                height: 56px;
                color: var(--bg-light);
                background: transparent;
                border: 1px solid var(--bg-light);
                border-radius: 12px;
                padding: 0 20px;

                @media screen and (max-width: 767px) {
                    max-width: 100%;
                    height: 44px;
                }

                @media screen and (max-width: 540px) {
                    background: #000;
                }
            }

            .bottom__form-input::-webkit-input-placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input::-moz-placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input::-ms-input-placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input::placeholder {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-inputt:-moz-placeholder-shown {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input:placeholder-shown {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-input:focus {
                color: var(--bg-light);
                opacity: 1;
            }

            .bottom__form-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 56px;
                font-weight: 500;
                font-size: 15px;
                line-height: 18px;
                background: var(--taxi);
                border: 1px solid var(--taxi);
                border-radius: 12px;
                transition: all 0.3s ease;

                @media screen and (max-width: 767px) {
                    height: 44px;
                    border-radius: 12px;
                }

                &:hover {
                    color: var(--taxi);
                    background: transparent;
                }
            }
        }
    }
}
.banner-img{
    width: 60px;
    height: 60px;
    @media screen and (max-width: 767px){
        width: 30px;
        height: 30px;
    }
}
.red{
    // background: white;
    // position: absolute;
    // opacity: 0.3;
    // width: 650px;
    // right: 85px;
    // height: 130px;
    // border-radius: 25px;
    // z-index: 0;
}
:deep(.form__check){
    background: none;
    color: white;
}
:deep(.wrap){
    background: none;
    color: white !important;
    text-wrap: wrap;
    display: grid;
    @media screen and (max-width: 768px){
        display: flex;
    }
    @media screen and (max-width: 500px) {
        display: none;
        margin: 0 20px;
        flex-direction: row;
    }
}
:deep(.wrap-mob){
    color: white !important;
}
:deep(.check-link){
    color: white !important;
}
</style>