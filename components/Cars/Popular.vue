<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentIndex = ref(0);
const visibleSlides = ref(4);
const trackRef = ref(null);
const startX = ref(0);
const currentX = ref(0);
const isDragging = ref(false);

// Массив авто с ссылкой на страницу
const cars = ref([
  { brand: 'Haval',model:'New Jolion', image: '/images/jolion.png', link: '/cars/haval/jolion_new' },
  { brand: 'ВАЗ (Lada)',model:'XRay', image: '/images/xray.png', link: '/cars/lada/xray' },
  { brand: 'Москвич',model:'3', image: '/images/3.png', link: '/cars/Москвич/3' },
  { brand: 'Kia',model:'Rio', image: '/images/rio.png', link: '/cars/kia/rio' },
  { brand: 'Kia',model:'Seltos', image: '/images/seltos.png', link: '/cars/kia/seltos' },
]);

// Переключение слайдов с зацикливанием
const nextSlide = () => {
  if (currentIndex.value < cars.value.length - visibleSlides.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Возвращаемся к началу
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    // Переходим к последней возможной позиции
    currentIndex.value = Math.max(0, cars.value.length - visibleSlides.value);
  }
};

// Стиль трансформации карусели
const trackStyle = computed(() => ({
  transform: `translateX(calc(-${currentIndex.value * (100 / visibleSlides.value)}% + ${isDragging.value ? currentX.value - startX.value : 0}px))`,
  transition: isDragging.value ? 'none' : 'transform 0.4s ease'
}));

// Изменяем количество видимых слайдов
const setVisibleSlides = (count) => {
  visibleSlides.value = count;
  // Корректируем текущий индекс при изменении количества видимых слайдов
  if (currentIndex.value > cars.value.length - visibleSlides.value) {
    currentIndex.value = Math.max(0, cars.value.length - visibleSlides.value);
  }
};

// Функция для обновления видимых слайдов
const updateVisibleSlides = () => {
  const width = window.innerWidth;

  if (width < 768) setVisibleSlides(1);
  else if (width < 1024) setVisibleSlides(2);
  else if (width < 1280) setVisibleSlides(3);
  else setVisibleSlides(4);
};

// Обработчики для свайпа
const handleTouchStart = (e) => {
  if (window.innerWidth >= 768) return; // Только для мобильных
  
  isDragging.value = true;
  startX.value = e.touches[0].clientX;
  currentX.value = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  if (!isDragging.value || window.innerWidth >= 768) return;
  
  currentX.value = e.touches[0].clientX;
  e.preventDefault(); // Предотвращаем скролл страницы
};

const handleTouchEnd = () => {
  if (!isDragging.value || window.innerWidth >= 768) return;
  
  isDragging.value = false;
  const diff = currentX.value - startX.value;
  const threshold = 50; // Минимальное расстояние для свайпа

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // Свайп вправо - предыдущий слайд
      prevSlide();
    } else {
      // Свайп влево - следующий слайд
      nextSlide();
    }
  }
};

// Обработчики для мыши (для тестирования на десктопе)
const handleMouseDown = (e) => {
  if (window.innerWidth >= 768) return;
  
  isDragging.value = true;
  startX.value = e.clientX;
  currentX.value = e.clientX;
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
};

const handleMouseMove = (e) => {
  if (!isDragging.value) return;
  
  currentX.value = e.clientX;
};

const handleMouseUp = () => {
  if (!isDragging.value) return;
  
  isDragging.value = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  
  const diff = currentX.value - startX.value;
  const threshold = 50;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
};

onMounted(() => {
  updateVisibleSlides();
  window.addEventListener('resize', updateVisibleSlides);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleSlides);
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
});

const goToCarPage = (link) => {
  router.push(link)
    .then(() => {
      window.location.reload();
    })
    .catch(error => {
      if (error.name !== 'NavigationDuplicated') {
        window.location.href = link;
      }
    });
};
</script>

<template>
  <section class="section cars-hot">
    <div class="container">
      <div class="cars-hot__wrapper">
        <h2 class="cars-hot__title">Популярные авто</h2>

        <div class="carousel">
          <button class="arrow left" @click="prevSlide">‹</button>

          <div class="carousel-window">
            <div 
              class="carousel-track" 
              :style="trackStyle" 
              ref="trackRef"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
              @mousedown="handleMouseDown"
            >
              <div 
                class="car" 
                v-for="(car, index) in cars" 
                :key="index"
                :style="{ flex: `0 0 ${100 / visibleSlides}%` }"
              >
                <div class="car-card">
                  <h3 class="car-name">{{ car.brand }}</h3>
                  <h3 class="car-model">{{ car.model }}</h3>
                  <img class="car-image" :src="car.image" :alt="car.brand + ' ' + car.model">
                  <button class="car-btn" @click="goToCarPage(car.link)">Подробнее</button>
                </div>
              </div>
            </div>
          </div>

          <button class="arrow right" @click="nextSlide">›</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cars-hot {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 0;
  
  .cars-hot__title {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .carousel {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

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
      transition: all 0.3s ease;
      
      &:hover {
        background: #f5f5f5;
      }
      
      &.left { 
        margin-right: 10px; 
      }
      &.right { 
        margin-left: 10px; 
      }
      
      // Скрываем стрелки на мобильных
      @media (max-width: 767px) {
        display: none;
      }
    }

    .carousel-window {
      overflow: hidden;
      width: 100%;
      max-width: 1400px;
      
      // Для мобильных - убираем overflow чтобы видеть анимацию свайпа
      @media (max-width: 767px) {
        overflow: visible;
      }
    }

    .carousel-track {
      display: flex;
      width: 100%;
      cursor: grab;
      
      &:active {
        cursor: grabbing;
      }
    }

    .car {
      padding: 10px;
      box-sizing: border-box;
      
      .car-card {
        background: #fff;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .car-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
          color: #333;
          display: flex;
        }
        
        .car-model {
          font-size: 16px;
          font-weight: 400;
          display: flex;
          color: #666;
          margin-bottom: 15px;
        }
        
        .car-image {
          width: 100%;
          height: 120px;
          object-fit: contain;
          margin: 15px 0;
        }

        .car-btn {
          background: var(--main-color);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.3s ease;
          
          &:hover {
            background: var(--main-color);
          }
        }
      }
    }
  }

  // Адаптивность
  @media (max-width: 1279px) {
    .carousel .car .car-card {
      padding: 15px;
    }
  }

  @media (max-width: 1023px) {
    .cars-hot__title {
      font-size: 22px;
    }
    
    .carousel .arrow {
      width: 35px;
      height: 35px;
      font-size: 20px;
    }
  }

  @media (max-width: 767px) {
    .cars-hot__title {
      font-size: 20px;
    }
    
    .carousel {
      .arrow {
        display: none; // Скрываем стрелки на мобильных
      }
      
      .car .car-card {
        padding: 12px;
        
        .car-name {
          font-size: 16px;
        }
        
        .car-model {
          font-size: 14px;
        }
        
        .car-image {
          height: 100px;
          margin: 10px 0;
        }
        
        .car-btn {
          padding: 8px 16px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>