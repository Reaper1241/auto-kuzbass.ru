<script setup>
import Slider from './Slider.vue';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();

const props = defineProps({
  car: { type: Object, required: true }
});
const car = computed(() => props.car);

const selectedImage = ref(0);
const isMobile = ref(false);
const targetElement = ref(null);
const isVisible = ref(false);

onMounted(() => {
  // ленивое появление
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    { root: null, rootMargin: '400px', threshold: 0.1 }
  );
  if (targetElement.value) observer.observe(targetElement.value);

  // следим за экраном
  const updateScreen = () => {
    isMobile.value = window.innerWidth < 768;
  };
  updateScreen();
  window.addEventListener('resize', updateScreen);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreen);
  });
});
</script>

<template>
  <div class="car" :class="{ 'current-car': car.id == $route.params.car }">
    <!-- Слайдер -->
    <div class="car__img" ref="targetElement">
      <div v-if="isVisible" class="car__slider">
        <!-- Десктоп -->
        <div v-if="car.images.length && !isMobile" class="slider-desktop">
          <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`">
            <div class="slider__main">
              <NuxtImg
                v-for="(slide, i) in car.images.slice(0, 5)"
                :key="i"
                v-show="selectedImage === i"
                :src="slide.url"
                alt="car"
                format="webp"
                quality="40"
                placeholder="/images/spinner.svg"
              />
            </div>
          </NuxtLink>
          <div class="slider__thumbs">
            <div
              v-for="(slide, i) in car.images.slice(0, 5)"
              :key="i"
              class="thumb"
              :class="{ active: selectedImage === i }"
              @mouseenter="selectedImage = i"
              @mouseleave="selectedImage = 0"
            ></div>
          </div>
        </div>

        <!-- Мобила -->
        <div v-else-if="car.images.length && isMobile" class="slider-mobile">
          <Slider :carInfo="car" />
        </div>

        <!-- Если нет фото -->
        <div v-else class="slider-fallback">
          <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`">Нет фото</NuxtLink>
        </div>
      </div>

      <!-- Стикеры -->
      <div class="car__stickers">
        <div class="sticker garantee" v-if="car.warranty_year">
          Гарантия {{ car.warranty_year }}
        </div>
      </div>
    </div>

    <!-- Инфо -->
    <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`" class="car__info">
      <div class="car__title">
        <span class="name">{{ cleanUpTitle(car.brand, car.model) }}</span>
        <div class="configuration" v-if="car.complectation || car.modification">
          <span v-if="car.complectation" class="complectation__span">{{ car.complectation }}</span>
          <span v-if="car.modification">{{ car.modification }}</span>
        </div>
      </div>

      <div class="car__price">
        <div class="car__price-current">
          от {{ makeSpaces(car.price - (car?.sale || 0)) }} ₽
        </div>
        <div class="car__price-old" v-if="car.sale">
          от {{ makeSpaces(car.price) }} ₽
        </div>
        <div class="car__price-month">
          в кредит от: <span>{{ makeSpaces(appStore.calcMonthPrice(car)) }} руб/мес</span>
        </div>
      </div>
    </NuxtLink>

    <!-- Кнопки -->
    <div class="car__controls">
      <BaseButtonModal
        :car="car"
        btn-label="Купить в кредит"
        :app-type="2"
        :modal-title="`Купить в кредит ${cleanUpTitle(car.url_brand, car.url_model)}`"
        btn-class="classic credit"
        category="new"
      />
      <BaseButtonModal
        :car="car"
        btn-label="Заказать обратный звонок"
        :app-type="8"
        modal-title="Закажите обратный звонок и наш специалист перезвонит Вам в течение 15 минут!"
        btn-class="classic trade"
        category="new"
        btnIcon="fa-solid fa-phone"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.car {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 299px;
  min-width: 280px;
  border: 1px solid #9f9f9f;
  border-radius: 4px;
  background: #f7f7f7;
  transition: 0.3s;

  &:hover {
    box-shadow: var(--box-shadow);
  }

  .car__img {
    position: relative;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;

    .slider-desktop {
      position: relative;

      .slider__main {
        height: 250px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .slider__thumbs {
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .thumb {
          flex: 1;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          &.active {
            background: var(--main-color);
          }
        }
      }
    }

    .slider-mobile {
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    .slider-fallback {
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #aaa;
    }

    .car__stickers {
      position: absolute;
      top: 10px;
      left: 10px;
      display: flex;
      gap: 10px;

      .sticker {
        border-radius: 20px;
        padding: 5px 10px;
        font-size: var(--small-size);
        color: #fff;
        background: var(--main-color);
      }
    }
  }

  .car__info {
    padding: 15px;

    .car__title {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      .name {
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .configuration {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        margin-top: 5px;
        .complectation__span {
          color: var(--main-color);
        }
      }
    }

    .car__price {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .car__price-current {
        font-size: 18px;
        font-weight: 700;
        color: var(--main-color);
      }
      .car__price-old {
        color: #b0b0b0;
        text-decoration: line-through;
      }
      .car__price-month span {
        color: var(--main-color);
      }
    }
  }

  .car__controls {
    padding: 0 15px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
