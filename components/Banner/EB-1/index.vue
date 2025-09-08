<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const reviews = ref([
  { 
    id: 1, 
    name: "Ca Do",
    avatar: "/images/avatar.png",
    rating: 5,
    text: "Работают до последнего клиента. Три дня мучений со мной и 4 часа до 23.00 и вуаля. Автомобиль в кредит мой. Менеджеру Ивана особая благодарность за терпение",
    date: "3 июля 2024"
  },
  { 
    id: 2, 
    name: "Татьяна Карпова",
    avatar: "/images/avatar.png",
    rating: 5,
    text: "Отличный автосалон, мне всё очень понравилось: интерьер, сервис. сотрудники помогли мне с выбором. Вежливые, доброжелательные, в такое место хочется вернуться ещё не один раз. Всем советую!!",
    date: "6 августа 2025"
  },
  { 
    id: 3, 
    name: "afrin",
    avatar: "/images/avatar.png",
    rating: 5,
    text: "В Карплазе менеджер был очень вежлив и внимателен. Помог выбрать подходящий автомобиль и подробно ответил на все вопросы. Предложил чай, пока оформляли документы.",
    date: "20 августа 2025"
  },
  { 
    id: 4, 
    name: "Василиса Бойко",
    avatar: "/images/avatar.png",
    rating: 5,
    text: "Это лучший уровень сервиса, который я встречала. В других сервисах было ужасное отношение, а в карплазе всё профессионально и качественно. Купила новое авто и безумно рада!",
    date: "23 августа 2025"
  },
  { 
    id: 5, 
    name: "Георгий",
    avatar: "/images/avatar.png",
    rating: 5,
    text: "Спасибо огромное за новое авто, всё отлично, езжу уже 4 месяца. Намёка на некачественный автомобиль даже нет, спасибо.",
    date: "1 сентября 2025"
  }
]);

const carouselRef = ref(null);
const currentSlide = ref(0);
const expandedReviews = ref([]);
const windowWidth = ref(0);

// Общая статистика
const totalRating = computed(() => {
  return (reviews.value.reduce((sum, review) => sum + review.rating, 0) / reviews.value.length).toFixed(1);
});

const totalReviews = computed(() => {
  return reviews.value.length;
});

// Отслеживаем изменение размера окна
const updateWindowWidth = () => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    window.addEventListener('resize', updateWindowWidth);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateWindowWidth);
  }
});

// Вычисляем количество видимых слайдов
const itemsToShow = computed(() => {
  if (windowWidth.value === 0) return 1;
  if (windowWidth.value < 768) return 1;
  if (windowWidth.value < 1150) return 2;
  return 3;
});

// Функция для переключения expanded состояния
const toggleExpand = (id) => {
  const index = expandedReviews.value.indexOf(id);
  if (index > -1) {
    expandedReviews.value.splice(index, 1);
  } else {
    expandedReviews.value.push(id);
  }
};

// Функции навигации
const next = () => {
  if (carouselRef.value) {
    carouselRef.value.next();
  }
};

const prev = () => {
  if (carouselRef.value) {
    carouselRef.value.prev();
  }
};
</script>

<template>
  <section class="reviews" v-if="reviews.length">
    <div class="reviews__container">
      <h2 class="title">Отзывы наших клиентов</h2>
      
      <!-- Блок с общей оценкой -->
      <div class="reviews__overview">
        <div class="overview__rating">
          <div class="rating__title">
            <span class="rating__value">4.9</span>
            <div class="rating__stars">
              <span v-for="star in 5" :key="star" class="star filled">★</span>
            </div>
          </div>  
          <span class="rating__count">207 отзывов</span>
        </div>
      </div>

      <div class="reviews__wrapper">
        <!-- Кастомные стрелки навигации -->
        <button class="custom-nav custom-nav--prev" @click="prev">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <Carousel
          ref="carouselRef"
          v-model="currentSlide"
          :items-to-show="itemsToShow"
          :wrap-around="true"
          :snap-align="start"
          :transition="500"
        >
          <Slide v-for="review in reviews" :key="review.id">
            <div class="reviews__item" :class="{ expanded: expandedReviews.includes(review.id) }">
              <div class="review__header">
                <div class="review__user">
                  <img :src="review.avatar" :alt="review.name" class="review__avatar" />
                  <span class="review__name">{{ review.name }}</span>
                </div>
                <div class="review__rating">
                  <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= review.rating }">★</span>
                </div>
              </div>
              <div class="review__content">
                <p class="review__text">{{ review.text }}</p>
                <div class="review__fade" v-if="!expandedReviews.includes(review.id)"></div>
              </div>
              <div class="review__footer">
                <span class="review__date">{{ review.date }}</span>
                <button 
                  class="review__expand-btn" 
                  @click="toggleExpand(review.id)"
                >
                  {{ expandedReviews.includes(review.id) ? 'Свернуть' : 'Читать далее' }}
                </button>
              </div>
            </div>
          </Slide>

          <template #addons>
            <Pagination class="reviews__pagination" />
          </template>
        </Carousel>
        
        <!-- Кастомные стрелки навигации -->
        <button class="custom-nav custom-nav--next" @click="next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.title{
    max-width: 1430px;
    margin: 0 auto;
    font-size: 22px;
    padding-bottom: 20px;
}

.reviews__overview {
  display: flex;
  margin-bottom: 30px;
  
  .overview__rating {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .rating__title{
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .rating__value {
      font-size: 32px;
      font-weight: bold;
      color: var(--main-color);
    }
    
    .rating__stars {
      display: flex;
      
      .star {
        color: #ffc107;
        font-size: 20px;
      }
    }
    
    .rating__count {
      font-size: 14px;
      color: #666;
    }
  }
}

.reviews {
  padding: 40px 20px;

  &__container {
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__item {
    background: white;
    border-radius: 16px;
    padding: 20px;
    margin: 10px 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    height: 200px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    transition: height 0.3s ease;
    
    &.expanded {
      height: auto;
    }
  }

  .custom-nav {
    position: absolute;
    top: 45%;
    transform: translateY(-50%);
    border-radius: 50%;
    color: black;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    z-index: 10;
    border: none;
    cursor: pointer;
    // background: rgba(255, 255, 255, 0.8);
    // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    &:hover {
      // background: var(--main-color);
      color: black;
    }

    &--prev {
      left: -15px;
    }
    
    &--next {
      right: -15px;
    }
    
    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
      
      &--prev {
        left: -15px;
      }
      
      &--next {
        right: -15px;
      }
    }
  }

  .review {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 15px;
    }

    &__user {
      display: flex;
      align-items: center;
    }

    &__avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }

    &__name {
      font-weight: 600;
      font-size: 14px;
    }

    &__rating {
      display: flex;
    }

    &__content {
      flex: 1;
      position: relative;
      margin-bottom: 15px;
    }

    &__text {
      font-size: 14px;
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: start;
      
      .expanded & {
        display: block;
        -webkit-line-clamp: unset;
      }
    }

    &__fade {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%);
      
      .expanded & {
        display: none;
      }
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__date {
      font-size: 12px;
      color: #666;
    }

    &__expand-btn {
      background: none;
      border: none;
      color: var(--main-color);
      font-size: 12px;
      cursor: pointer;
      padding: 0;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .star {
    color: #ddd;
    font-size: 16px;
    
    &.filled {
      color: #ffc107;
    }
  }

  /* Пагинация */
  .reviews__pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 8px;

    :deep(.carousel__pagination-button) {
      width: 12px;
      height: 12px;
      padding: 0;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid var(--main-color);
      opacity: 0.4;
      transition: all 0.3s ease;
      
      &::after {
        display: none;
      }
      
      &.carousel__pagination-button--active {
        opacity: 1;
        background-color: var(--main-color);
      }
    }
  }
}

/* Стили для мобильных устройств */
@media (max-width: 768px) {
  .reviews {
    padding: 40px 15px;
    
    &__container {
      padding: 0 10px;
    }
    
    &__wrapper {
      margin: 0 -10px;
    }
    
    &__item {
      padding: 15px;
      margin: 0 8px;
      height: 180px;
    }
  }
  
  .reviews__overview {
    .overview__rating {
      .rating__value {
        font-size: 28px;
      }
      
      .rating__stars {
        .star {
          font-size: 18px;
        }
      }
    }
  }
  
  /* Убедимся, что карусель занимает всю ширину на мобильных */
  :deep(.carousel) {
    width: 100%;
  }
  
  :deep(.carousel__viewport) {
    overflow: visible;
  }
  
  :deep(.carousel__track) {
    margin: 0;
  }
  
  :deep(.carousel__slide) {
    width: calc(100% - 16px) !important;
    margin: 0 8px;
  }
}

/* Для очень маленьких экранов */
@media (max-width: 480px) {
  .reviews {
    padding: 30px 10px;
    
    &__item {
      margin: 0 5px;
      padding: 12px;
      height: 200px;
    }
  }
  
  :deep(.carousel__slide) {
    width: calc(100% - 10px) !important;
    margin: 0 5px;
  }
  
  .custom-nav {
    width: 28px !important;
    height: 28px !important;
    
    &--prev {
      left: -10px !important;
    }
    
    &--next {
      right: -10px !important;
    }
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style>