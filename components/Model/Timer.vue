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

onBeforeUnmount(() => {
    clearInterval(timer);
});
</script>

<template>
    <section class="timer__section">
        <div class="container">
            <div class="timer__container">
                <div class="timer__block">
                    <h2 class="timer__title">
                        Успейте получить дополнительную скидку за покупку в кредит +
                        <span>КАСКО в подарок</span> сроки акции ограничены
                    </h2>
                    <div class="timer" :data-time="targetDate">
                        <div class="time-count__item time-count__days">
                            <div class="time-count__val">{{ daysZero }}</div>
                            <span class="time-count__text">{{
                                declOfNum(days, ["день", "дня", "дней"])
                            }}</span>
                        </div>
                        <div class="time-count__item time-count__hours">
                            <div class="time-count__val">{{ hoursZero }}</div>
                            <span class="time-count__text">{{
                                declOfNum(hours, ["час", "часа", "часов"])
                            }}</span>
                        </div>
                        <div class="time-count__item time-count__minutes">
                            <div class="time-count__val">{{ minutesZero }}</div>
                            <span class="time-count__text">{{
                                declOfNum(minutes, ["минута", "минуты", "минут"])
                            }}</span>
                        </div>
                        <div class="time-count__item time-count__seconds">
                            <div class="time-count__val">{{ secondsZero }}</div>
                            <span class="time-count__text">{{
                                declOfNum(seconds, ["секунда", "секунды", "секунд"])
                            }}</span>
                        </div>
                        <FormTimer class="form__timer"/>
                    </div>
                    <!-- Добавленная кнопка -->
                    <button class="timer__button" @click="modalShow">
                        Оставить заявку
                    </button>
                    
                </div>
            </div>
        </div>

        <!-- Модалка для формы -->
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
    </section>
</template>

<style lang="scss" scoped>
.form__timer{
    max-width: 450px;
    margin-left: 50px;
    @media screen and (max-width: 1133px) {
        display: none;
    }
}
.timer__section {
    background: #fff;
    margin: 30px 0;
    @media screen and (max-width: 767px){
        margin: 10px 0;
    }
    @media screen and (max-width: 540px){
        margin: 0;
    }
    // border: 2px solid var(--main-color2);
    // border-left: none;
    // border-right: none;
    .timer__container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 60px;
        padding: 30px 10px;
        color: black;
        border: 2px solid var(--main-color2);
        border-radius: 4px;
        @media screen and (max-width: 1023px) {
            gap: 20px;
            padding: 20px 15px;
        }

        @media screen and (max-width: 767px) {
            flex-direction: column;
            gap: 35px;
            padding: 38px 10px;
            max-width: 540px;
            width: 100%;
            margin: 0 auto;
            margin-bottom: 10px;
        }

        .timer__block {
            display: flex;
            flex-direction: column;
            gap: 20px;

            .timer__title {
                font-weight: 700;
                font-size: 22px;
                text-align: center;
                margin: 0 auto;
                @media screen and (max-width: 1023px) {
                    font-size: 17px;
                }

                @media screen and (max-width: 767px) {
                    font-size: 22px;
                    text-align: center;
                }

                @media screen and (max-width: 540px) {
                    font-size: 18px;
                }

                & span {
                    color: #c91212;
                    font-weight: 700;
                }
            }

            .timer {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 13px;

                @media screen and (max-width: 767px) {
                    justify-content: space-between;
                    gap: 5px;
                    width: 100%;
                }

                .time-count__item {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 6px;
                    width: 126px;
                    height: 109px;
                    border: 2px solid #c91212;
                    border-radius: 4px;

                    @media screen and (max-width: 1023px) {
                        width: 95px;
                        height: 80px;
                        gap: 0;
                    }

                    @media screen and (max-width: 767px) {
                        max-width: 126px;
                        width: 100%;
                        height: 90px;
                    }

                    @media screen and (max-width: 425px) {
                        height: 73px;
                    }

                    .time-count__val {
                        font-weight: 600;
                        font-size: 18px;
                        line-height: 12px;
                        text-align: center;
                        color: #c91212;
                        font-weight: 700;
                        
                        @media screen and (max-width: 375px) {
                            font-size: 24px;
                            line-height: 28px;
                        }
                    }

                    .time-count__text {
                        color: #c91212;
                        display: block;
                        font-weight: 300;
                        font-size: 18px;
                        line-height: 22px;
                        text-align: center;
                        font-weight: 700;
                        @media screen and (max-width: 1023px) {
                            font-size: 14px;
                            line-height: 20px;
                        }
                    }
                }
            }
        }
    }
}

.timer__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
}
.timer__button {
    display: none;
        @media screen and (max-width: 767px){
        display: block;
        margin: 20px auto 0;
        padding: 12px 24px;
        width: 70%;
        background-color: #c91212; /* или ваш цвет акцента */
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
        }
}


.modal-overlay {
    display: none;
    @media screen and (max-width: 767px) {
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

}

.modal-content {
    background-color: white;
    padding: 30px;
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
    font-size: 20px;
    cursor: pointer;
}

.modal-title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
}
</style>