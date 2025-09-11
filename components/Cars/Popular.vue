<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { apiNew } from '@/constants';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const cars = ref([]);
const loading = ref(true);
const currentIndex = ref(0);
const visibleSlides = ref(4); // изначально 4
const trackRef = ref(null); // ссылка на .carousel-track

// Загружаем авто
fetchClientWrapper(`${apiNew}filters/cars?page=1&per_page=8&sorting=price_asc&car_tag_id=2`)
  .then(res => res.json())
  .then(data => (cars.value = data.cars.data))
  .then(() => (loading.value = false));

// Следующий слайд
const nextSlide = () => {
  if (currentIndex.value < cars.value.length - visibleSlides.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

// Предыдущий слайд
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = cars.value.length - visibleSlides.value;
  }
};

// Вычисляем transform
const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (100 / visibleSlides.value)}%)`,
  transition: 'transform 0.4s ease'
}));

// Изменяем количество отображаемых карточек
const setVisibleSlides = (count) => {
  visibleSlides.value = count;
  if (currentIndex.value > cars.value.length - visibleSlides.value) {
    currentIndex.value = Math.max(0, cars.value.length - visibleSlides.value);
  }
};

// Адаптивное изменение visibleSlides
let resizeObserver = null;

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    if (!trackRef.value) return;
    const width = trackRef.value.offsetWidth;

    // Примерная логика:
    if (width < 500) setVisibleSlides(1);
    else if (width < 900) setVisibleSlides(2);
    else if (width < 1200) setVisibleSlides(3);
    else setVisibleSlides(4);
  });

  if (trackRef.value) resizeObserver.observe(trackRef.value);
});

onBeforeUnmount(() => {
  if (resizeObserver && trackRef.value) resizeObserver.unobserve(trackRef.value);
});
</script>

<template>
  <section class="section cars-hot">
    <div class="container">
      <div class="cars-hot__wrapper">
        <div class="cars-hot__header">
          <BaseTitle :title="`Популярные`" />
        </div>

        <div class="cars-hot__body cars-template" v-if="!loading">
          <div class="carousel">
            <button class="arrow left" @click="prevSlide">‹</button>

            <div class="carousel-window">
              <div class="carousel-track" :style="trackStyle" ref="trackRef">
                <div class="car" v-for="car in cars" :key="car.id">
                  <CarSmallC2 :car="car" />
                </div>
              </div>
            </div>

            <button class="arrow right" @click="nextSlide">›</button>
          </div>
        </div>

        <div class="cars-hot__body cars-template" v-else>
          <div class="carousel">
            <div class="carousel-window">
              <div class="carousel-track" :style="trackStyle" ref="trackRef">
                <div class="car" v-for="n in appStore.currentPerPage" :key="n">
                  <div class="skeleton-car">
                    <div class="image skeleton" />
                    <div class="small-text skeleton" />
                    <div class="text skeleton" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.cars-hot{
    max-width: 1440px;
    margin: 0 auto;
}
.carousel {
  position: relative;
  display: flex;
  align-items: center;

  .arrow {
    background: white;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;

    &.left {
      margin-right: 10px;
    }
    &.right {
      margin-left: 10px;
    }
  }

  .carousel-window {
    overflow: hidden;
    flex: 1;
  }

  .carousel-track {
    display: flex;
    max-width: 1300px;
    margin: 0 auto;
    @media screen and (max-width: 1023px){
        max-width: 1000px;
    }
  }

  .car {
    flex: 0 0 calc(100% / 4); // 4 машины на экран
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>
