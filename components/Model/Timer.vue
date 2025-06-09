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

onMounted(() => {
    startTimer();
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
                        Успей получить дополнительую скидку за покупку в кредит +
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
                    </div>
                </div>
                <!-- <div class="timer__form">
                    <h3>Оставьте заявку</h3>
                    <FormBanner class="timer__form" />
                </div> -->
                <!-- <ModalCallback></ModalCallback> -->
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.timer__section {
    background: #fff;
    margin: 30px 0;
    border: 2px solid var(--main-color2);
    border-left: none;
    border-right: none;
    .timer__container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 60px;
        padding: 30px 0;
        color: black;

        @media screen and (max-width: 1023px) {
            gap: 20px;
            padding: 20px 0;
        }

        @media screen and (max-width: 767px) {
            flex-direction: column;
            gap: 35px;
            padding: 38px 0;
            max-width: 540px;
            width: 100%;
            margin: 0 auto;
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
                    color: var(--main-color);
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
                    border: 2px solid var(--main-color);
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
                        height: 63px;
                    }

                    .time-count__val {
                        font-weight: 600;
                        font-size: 20px;
                        line-height: 12px;
                        text-align: center;
                        color: var(--main-color);
                        font-weight: 700;
                        @media screen and (max-width: 375px) {
                            font-size: 24px;
                            line-height: 28px;
                        }
                    }

                    .time-count__text {
                        color: var(--main-color);
                        display: block;
                        font-weight: 300;
                        font-size: 20px;
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
</style>