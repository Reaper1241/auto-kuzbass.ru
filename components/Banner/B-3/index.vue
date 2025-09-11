<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// Цель — 3 дня от текущего момента
function getTargetDate() {
  const now = new Date();
  const target = new Date(now);
  target.setDate(now.getDate() + 2);
  target.setHours(23, 59, 59, 999);
  return target;
}

const targetDate = ref(getTargetDate());
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
    targetDate.value = getTargetDate();
  }
  const leftUntil = targetDate.value - now;

  if (leftUntil < 0) {
    targetDate.value = getTargetDate();
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

// Управление модалкой
const showModal = ref(false);
function openModal() {
  showModal.value = true;
  document.body.style.overflow = "hidden"; // блокируем прокрутку
}
function closeModal() {
  showModal.value = false;
  document.body.style.overflow = "auto";
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
        <!-- Левый блок -->
        <div class="timer__block">
          <h2 class="timer__title">
            Дополнительная скидка при покупке авто в кредит +
            <span>КАСКО в подарок.</span> Акция ограничена!
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

        <!-- Правый блок -->
        <div class="timer__action">
          <button class="timer__button" @click="openModal">
            Получить предложение
          </button>
        </div>
      </div>
    </div>

    <!-- Модалка -->
    <Teleport to="body">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <button class="modal-close" @click="closeModal">
            ✖
          </button>
          <FormSmall class="form__timer" />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
.timer__section {
  background: #fff;
  margin: 30px 0;

  @media screen and (max-width: 767px) {
    margin: 10px 0;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 540px) {
    margin: 0;
    margin-bottom: 10px;
  }

  .timer__container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    padding: 30px 10px;
    color: black;
    border: 2px solid var(--main-color);
    border-radius: 4px;
    margin: 0 auto;
    background: white;
    @media screen and (max-width: 1023px) {
      flex-direction: column;
      gap: 20px;
      padding: 20px 15px;
    }

    .timer__block {
        width: 39.5%;
      display: flex;
      justify-content: end;
      align-items: end;
      flex-direction: column;
    //   width: 50%;
      gap: 20px;
        @media screen and (max-width: 1023px) {
          font-size: 17px;
          width: 100%; 
          justify-content: center;
            align-items: center;
        }
      .timer__title {
        font-weight: 700;

        font-size: 22px;
        text-align: center;
        margin: 0 auto;

        @media screen and (max-width: 1023px) {
          font-size: 17px;
          width: 45%; 
          justify-content: center;
            align-items: center;
        }

        @media screen and (max-width: 767px) {
          font-size: 22px;
          text-align: center;
          width: 100%;
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
        //   border: 2px solid var(--main-color);
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
            font-size: 30px;
            line-height: 12px;
            text-align: center;
            color: white;
            background:#198a5d;
            padding: 30px 45px;
            font-weight: 700;

            @media screen and (max-width: 675px) {
              font-size: 24px;
              line-height: 28px;
              padding: 20px 25px;
            }
            @media screen and (max-width: 385px) {
              font-size: 24px;
              line-height: 28px;
              padding: 10px 15px;
            }
          }

          .time-count__text {
            color: black;
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

    .timer__action {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: start;
      gap: 15px;
    //   width: 50%;

      .timer__button {
        padding: 12px 24px;
        background-color: #198a5d;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #198a5d;
        }
      }
    }
  }
}

/* Стили модалки */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.form__timer {
  width: 100%;
}
</style>
