<script setup>
import { apiNew } from "@/constants/";
import { useRoute } from 'vue-router';
import { useAppStore } from '/stores/AppStore.js';
import { useNewStore } from '/stores/NewStore.js';
import { useNewCarStore } from '/stores/NewCarStore.js';
import { ref, computed, watch, onMounted } from 'vue';

const carStore = useNewCarStore();
const $route = useRoute();
const appStore = useAppStore();
const newStore = useNewStore();

const props = defineProps(['currentQuary']);
const quary = ref(appStore.recentQueryNew || '');
const isLoading = ref(false);
const isLoadMoreLoading = ref(false);
const allCars = ref([]);
const displayedCars = ref([]);
const carsCount = ref(0);
const totalPages = ref(1);
const currentPage = ref(1);
const carsPerLoad = 8;
const lastDisplayedIndex = ref(0);

// Получаем id текущей машины, если она есть в роуте
const currentCarId = computed(() => {
  return $route.params.car ? parseInt($route.params.car) : null;
});

// Перезагрузка данных
const resetAndLoad = async () => {
  isLoading.value = true;
  allCars.value = [];
  displayedCars.value = [];
  currentPage.value = 1;
  lastDisplayedIndex.value = 0;
  
  try {
    await loadInitialCars();
  } finally {
    isLoading.value = false;
  }
};

// Получение данных с сервера
const fetchCars = async (page = 1) => {
  const url = new URL(`${apiNew}filters/cars`);
  url.searchParams.set('sorting', appStore.newSort);
  url.searchParams.set('page', page);
  url.searchParams.set('per_page', carsPerLoad);

  // Всегда показываем машины с тегом 3 для китайских авто
  url.searchParams.set('car_tag_id', '14');

  // Если есть параметры из фильтра, добавляем их
  if (quary.value) {
    quary.value.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key && value) {
        // Не добавляем car_tag_id повторно если он уже есть в фильтре
        if (key !== 'car_tag_id') {
          url.searchParams.set(key, value);
        }
      }
    });
  }

  // Проверяем бренд из роута
  if ($route.params.brand) {
    const brand = appStore.newBrands.find(b => b.url_brand === $route.params.brand);
    if (brand) {
      url.searchParams.set('brand_id', brand.id);
    }
  }

  // Проверка модели
  if ($route.params.model || $route.params.car) {
    const model = newStore.models.find(m => m.url_model === ($route.params.model || $route.params.car));
    if (model) url.searchParams.set('car_model_id', model.id);
  }

  console.log('Fetching cars from:', url.toString());
  const response = await fetchClientWrapper(url.toString());
  const data = await response.json();
  console.log('Received cars data:', data);
  return data;
};

// Загрузка начальных машин
const loadInitialCars = async () => {
  try {
    const data = await fetchCars(currentPage.value);
    let cars = data.cars?.data || [];

    // Исключаем текущую машину
    if (currentCarId.value) {
      cars = cars.filter(car => car.id !== currentCarId.value);
    }

    allCars.value = cars;
    carsCount.value = data.count || 0;
    totalPages.value = data.total_pages || 1;
    displayedCars.value = allCars.value.slice(0, carsPerLoad);
    lastDisplayedIndex.value = displayedCars.value.length;

    if (displayedCars.value.length > 0) {
      yandexEcommerceArray('impressions', displayedCars.value);
    }
  } catch (error) {
    console.error('Error loading cars:', error);
    allCars.value = [];
    carsCount.value = 0;
  }
};

// Подгрузка машин
const loadMore = async () => {
  if (isLoadMoreLoading.value || isLoading.value) return;
  isLoadMoreLoading.value = true;
  
  try {
    currentPage.value++;
    const data = await fetchCars(currentPage.value);
    let newCars = data.cars?.data || [];

    // Исключаем текущую машину
    if (currentCarId.value) {
      newCars = newCars.filter(car => car.id !== currentCarId.value);
    }

    allCars.value = [...allCars.value, ...newCars];
    displayedCars.value = [...displayedCars.value, ...newCars];
    lastDisplayedIndex.value = displayedCars.value.length;

    if (newCars.length > 0) {
      yandexEcommerceArray('impressions', newCars);
    }
  } catch (error) {
    console.error('Error loading more cars:', error);
  } finally {
    isLoadMoreLoading.value = false;
  }
};

// Следим за изменениями фильтра и сортировки
watch(() => props.currentQuary, (newVal) => {
  quary.value = newVal;
  appStore.recentQueryNew = newVal;
  resetAndLoad();
});

watch(() => appStore.newSort, () => {
  resetAndLoad();
});

onMounted(() => {
  resetAndLoad();
});

// Вычисления
const checkCars = computed(() => {
  return allCars.value.length > 0 || !$route.params.car;
});

const title = computed(() => {
  if ($route.params.car) {
    return `Другие ${cleanUpTitle($route.params.brand, $route.params.model).toUpperCase()} в наличии`;
  } else if ($route.params.model) {
    return `Семейные автомобили ${cleanUpTitle($route.params.brand, $route.params.model).toUpperCase()} в наличии`;
  } else if ($route.params.brand) {
    return `Семейные автомобили ${cleanUpTitle($route.params.brand).toUpperCase()} в наличии`;
  } else {
    return 'Семейные автомобили в наличии';
  }
});

const canLoadMore = computed(() => {
  return currentPage.value < totalPages.value && carsCount.value > 0;
});

const showSection = computed(() => {
  return checkCars.value && carsCount.value > 0 && !isLoading.value;
});
</script>

<template>
  <section 
    :ref="(el) => { appStore.newCatalog = el }" 
    class="cars section" 
    v-if="showSection"
  >
    <div class="cars__content">
      <div class="container">
        <CarsNewHead 
          :cars-count="carsCount - ($route.params.car ? 1 : 0)" 
          @update-cars="resetAndLoad()"
          :title="title" 
        />
      </div>
      <div class="cars__container">
        <div class="container">
          <div class="cars__body cars-template">
            <CarSmallC1 
              v-for="car in displayedCars" 
              :car="car" 
              :key="car.id" 
            />
          </div>

          <div class="cars__skeleton cars-template" v-if="isLoadMoreLoading">
            <div v-for="i in 8" :key="i" class="skeleton-car">
              <div class="image skeleton" />
              <div class="small-text skeleton" />
              <div class="text skeleton" />
            </div>
          </div>

          <div 
            class="cars__more" 
            v-if="canLoadMore"
          >
            <button 
              class="cars__more-button standart-button" 
              @click="loadMore"
              :disabled="isLoadMoreLoading"
            >
              {{ isLoadMoreLoading ? 'Загрузка...' : 'Загрузить ещё' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Сообщение если нет машин -->
  <section class="section" v-else-if="!isLoading && carsCount === 0">
    <div class="container">
      <div class="no-cars-message">
        <h3>Семейные автомобили не найдены</h3>
        <p>Попробуйте изменить параметры фильтра</p>
      </div>
    </div>
  </section>

  <!-- Загрузка -->
  <section class="section" v-else-if="isLoading">
    <div class="container">
      <div class="loading-message">
        Загрузка семейных автомобилей...
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cars {
  scroll-margin-top: 15vh;

  .cars__content {
    display: flex;
    flex-direction: column;

    .cars__more {
      display: flex;
      justify-content: center;
      padding-top: 25px;

      .cars__more-button {
      border-radius: 20px;
      border: 2px solid var(--main-color);
      width: 300px;
      background:var(--main-color) !important;
      color: white !important;

      &:hover:not(.disabled) {
        background-color: white;
        color: var(--main-color);
        border-color: var(--main-color);
      }

        &.disabled {
          opacity: 0.5;
          pointer-events: none;
        }
      }
    }
  }
}

.loading-message,
.no-cars-message {
  text-align: center;
  padding: 40px;
  color: #666;
}

.no-cars-message h3 {
  margin-bottom: 10px;
  color: #333;
}
</style>