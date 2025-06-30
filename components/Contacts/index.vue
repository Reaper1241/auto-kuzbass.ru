<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const appStore = useAppStore();

const isOpen = ref(false);
const currentModalTitle = ref("Оставьте заявку и мы перезвоним Вам!");
const currentAppType = ref(6);
const isMobile = ref(false);
const isWorkingHours = ref(true);

// Проверка рабочего времени (9:00-21:00 по Москве)
function checkWorkingHours() {
  const now = new Date();
  const moscowOffset = 3 * 60 * 60 * 1000; // MSK (UTC+3)
  const moscowTime = new Date(now.getTime() + moscowOffset);
  const currentHour = moscowTime.getUTCHours();
  isWorkingHours.value = currentHour >= 5 && currentHour < 16;
}

// Определение мобильного устройства (по ширине экрана ≤500px)
function checkMobile() {
  isMobile.value = window.innerWidth <= 500;
}

function modalShow() {
  isOpen.value = true;
  checkWorkingHours();
  
  if (!isWorkingHours.value) {
    currentModalTitle.value = "Мы работаем с 9:00 до 20:00. Оставьте заявку и мы перезвоним Вам в рабочее время!";
    currentAppType.value = 1;
  } else {
    currentModalTitle.value = "Оставьте заявку и мы перезвоним Вам в течение 30 минут!";
    currentAppType.value = 6;
  }
  document.body.style.overflow = 'hidden';
}

function handlePhoneClick() {
  // На десктопе (>500px) - всегда модалка
  if (!isMobile.value) {
    modalShow();
    return;
  }
  
  // На мобилке (≤500px) - проверяем время
  checkWorkingHours();
  if (isWorkingHours.value) {
    window.location.href = `tel:${appStore.clearPhone}`;
  } else {
    modalShow();
  }
}

function closeModal() {
  isOpen.value = false;
  document.body.style.overflow = 'auto';
}

onMounted(() => {
  checkMobile();
  checkWorkingHours();
  
  window.addEventListener('resize', checkMobile);
  const interval = setInterval(checkWorkingHours, 60000);
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile);
    clearInterval(interval);
  });
});
</script>

<template>
    <section class="section section__contact">
        <div class="container">
            <div class="section__header">
                <!-- <BasePageTitle /> -->
            </div>
            <div class="section__body">
                <div class="contacts__list">
                    <p class="contacts__item">
                        <!-- На мобилке (≤500px) в рабочее время - звонок, иначе модалка -->
                        <a v-if="isMobile && isWorkingHours" 
                          :href="`tel:${appStore.clearPhone}`" 
                          class="contacts__phone-link">
                            Номер телефона: <span>{{ appStore.phone }}</span>
                        </a>
                        <button v-else 
                               class="contacts__phone-link" 
                               @click="handlePhoneClick">
                            Номер телефона: <span>{{ appStore.phone }}</span>
                        </button>
                    </p>
                    <p class="contacts__item">
                        Часы работы: <span>{{ appStore.workingHours }}</span>
                    </p>
                    <p class="contacts__item">
                        Адрес: <span>{{ appStore.address }}</span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Модалка для телефона -->
        <Teleport to="body">
            <div v-if="isOpen" class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" @click="closeModal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <h3 class="modal-title">{{ currentModalTitle }}</h3>
                    <FormSmall />
                </div>
            </div>
        </Teleport>
    </section>
</template>

<style scoped lang="scss">
/* Стили остаются без изменений */
.contacts__phone-link {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-decoration: none;
    display: inline;
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
    background: white;
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
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
}

.contacts__list {
    display: flex;
    flex-direction: column;
    gap: 100px;
    margin-bottom: 30px;
    position: relative;
    @media screen and (max-width: 1000px) {
        margin: 30px 0;
        gap: 20px;
    }

    .contacts__item {
        position: relative;
        font-weight: 300;
        font-size: 16px;
        line-height: 18px;
        padding-left: 37px;
        color: black;
        
        @media screen and (max-width: 767px) {
            font-size: 14px;
        }

        @media screen and (max-width: 540px) {
            font-size: 16px;
        }

        @media screen and (max-width: 425px) {
            font-size: 14px;
        }

        &::before {
            content: "";
            position: absolute;
            top: calc(50% - 13px);
            left: 0;
            width: 26px;
            height: 26px;
        }

        & span {
            font-weight: 700;
            font-size: 19px;
            color:black;
            @media screen and (max-width: 767px) {
                font-weight: 600;
                font-size: 14px;
            }

            @media screen and (max-width: 540px) {
                font-size: 16px;
            }

            @media screen and (max-width: 425px) {
                font-size: 14px;
            }
        }
    }

    .contacts__item:nth-child(1) {
        &::before {
            background: url(/svg/Vector.svg) no-repeat center;
            background-size: contain;
        }
    }

    .contacts__item:nth-child(2) {
        &::before {
            background: url(/svg/Vector3.svg) no-repeat center;
            background-size: contain;
        }
    }

    .contacts__item:nth-child(3) {
        &::before {
            background: url(/svg/Vector2.svg) no-repeat center;
            background-size: contain;
        }
    }
}
</style>