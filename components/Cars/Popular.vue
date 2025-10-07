<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { apiNew } from '@/constants'
import { useAppStore } from '/stores/AppStore.js'
// import CarSmallC1 from '@/components/CarSmallC1.vue'

// store
const appStore = useAppStore()
const router = useRouter()

// данные
const cars = ref([])
const loading = ref(true)

fetchClientWrapper(`${apiNew}filters/cars?page=1&per_page=8&sorting=price_asc&car_tag_id=13`)
  .then(res => res.json())
  .then(data => {
    const allowedBrands = ['Haval', 'ВАЗ (LADA)', 'Chery','Kaiyi', 'BAIC']
    let filteredCars = data.cars.data.filter(car => {
      const brand = car.brand?.toLowerCase() || ''
      return allowedBrands.some(b => brand.includes(b.toLowerCase()))
    })
    filteredCars.sort((a, b) => {
      const indexA = allowedBrands.findIndex(bName => a.brand.toLowerCase().includes(bName.toLowerCase()))
      const indexB = allowedBrands.findIndex(bName => b.brand.toLowerCase().includes(bName.toLowerCase()))
      return indexA - indexB
    })

    cars.value = filteredCars
  })
  .then(() => loading.value = false)


// состояние слайдера
const currentIndex = ref(0)
const visibleSlides = ref(4)
const trackRef = ref(null)
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)

// переключение
const nextSlide = () => {
  if (currentIndex.value < cars.value.length - visibleSlides.value) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = Math.max(0, cars.value.length - visibleSlides.value)
  }
}

// стили
const trackStyle = computed(() => ({
  transform: `translateX(calc(-${currentIndex.value * (100 / visibleSlides.value)}% + ${isDragging.value ? currentX.value - startX.value : 0}px))`,
  transition: isDragging.value ? 'none' : 'transform 0.4s ease'
}))

// responsive
const setVisibleSlides = (count) => {
  visibleSlides.value = count
  if (currentIndex.value > cars.value.length - visibleSlides.value) {
    currentIndex.value = Math.max(0, cars.value.length - visibleSlides.value)
  }
}

const updateVisibleSlides = () => {
  const width = window.innerWidth
  if (width < 768) setVisibleSlides(1)
  else if (width < 1024) setVisibleSlides(2)
  else if (width < 1280) setVisibleSlides(3)
  else setVisibleSlides(3)
}

// свайпы
const handleTouchStart = (e) => {
  if (window.innerWidth >= 768) return
  isDragging.value = true
  startX.value = e.touches[0].clientX
  currentX.value = e.touches[0].clientX
}

const handleTouchMove = (e) => {
  if (!isDragging.value || window.innerWidth >= 768) return
  currentX.value = e.touches[0].clientX
  e.preventDefault()
}

const handleTouchEnd = () => {
  if (!isDragging.value || window.innerWidth >= 768) return
  isDragging.value = false
  const diff = currentX.value - startX.value
  const threshold = 50
  if (Math.abs(diff) > threshold) {
    diff > 0 ? prevSlide() : nextSlide()
  }
}

// мышь
const handleMouseDown = (e) => {
  if (window.innerWidth >= 768) return
  isDragging.value = true
  startX.value = e.clientX
  currentX.value = e.clientX
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e) => {
  if (!isDragging.value) return
  currentX.value = e.clientX
}

const handleMouseUp = () => {
  if (!isDragging.value) return
  isDragging.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  const diff = currentX.value - startX.value
  const threshold = 50
  if (Math.abs(diff) > threshold) {
    diff > 0 ? prevSlide() : nextSlide()
  }
}

onMounted(() => {
  updateVisibleSlides()
  window.addEventListener('resize', updateVisibleSlides)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateVisibleSlides)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<template>
  <section class="section cars-hot">
    <div class="container">
      <div class="cars-hot__wrapper">
        <h2 class="cars-hot__title">Акции недели!</h2>

        <div class="carousel" v-if="!loading">
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
                v-for="car in cars" 
                :key="car.id"
                :style="{ flex: `0 0 ${100 / visibleSlides}%` }"
              >
                <!-- твоя готовая карточка -->
                <CarSmallC2 :car="car" />
              </div>
            </div>
          </div>

          <button class="arrow right" @click="nextSlide">›</button>
        </div>

        <div v-else class="carousel-window">
          <div class="carousel-track">
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
    gap: 10px;
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
        display: flex;
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
      @media (max-width: 767px){
        padding: 15px;
      }
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
      display: flex !important; // 🔥 теперь точно не пропадут
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 32px;
      height: 32px;
      font-size: 20px;
      background: none;
      border: none;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      opacity: 1;
      &:hover {
        background: none;
      }
    }

    .arrow.left {
      left: -15px;
    }

    .arrow.right {
      right: -15px;
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