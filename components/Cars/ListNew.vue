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
const allCars = ref([]); // Все загруженные машины
const displayedCars = ref([]); // Отображаемые на экране
const carsCount = ref(0);
const totalPages = ref(1);
const currentPage = ref(1);
const carsPerLoad = 8;
const lastDisplayedIndex = ref(0);

// Полная перезагрузка данных
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

// Загрузка данных с сервера
const fetchCars = async (page = 1) => {
  const url = new URL(`${apiNew}filters/cars`);
  url.searchParams.set('sorting', appStore.newSort);
  url.searchParams.set('page', page);
  url.searchParams.set('per_page', carsPerLoad); // Теперь загружаем ровно столько, сколько нужно
  
  if ($route.params.brand) {
    const brand = appStore.newBrands.find(b => b.url_brand === $route.params.brand);
    if (brand) url.searchParams.set('brand_id', brand.id);
  }

  if ($route.params.model || $route.params.car) {
    const model = newStore.models.find(m => m.url_model === ($route.params.model || $route.params.car));
    if (model) url.searchParams.set('car_model_id', model.id);
  }

  if (quary.value) {
    quary.value.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key && value) url.searchParams.set(key, value);
    });
  }

  const response = await fetchClientWrapper(url.toString());
  return await response.json();
};

// Загрузка начальных данных
const loadInitialCars = async () => {
  const data = await fetchCars(currentPage.value);
  allCars.value = data.cars.data;
  carsCount.value = data.count;
  totalPages.value = data.total_pages;
  displayedCars.value = allCars.value.slice(0, carsPerLoad);
  lastDisplayedIndex.value = displayedCars.value.length;
  
  // yandexEcommerceArray('impressions', displayedCars.value);
};

// Загрузка следующих машин
const loadMore = async () => {
  if (isLoadMoreLoading.value || isLoading.value) return;
  isLoadMoreLoading.value = true;
  
  try {
    currentPage.value++;
    const data = await fetchCars(currentPage.value);
    const newCars = data.cars.data;
    
    allCars.value = [...allCars.value, ...newCars];
    displayedCars.value = [...displayedCars.value, ...newCars];
    lastDisplayedIndex.value = displayedCars.value.length;
    
    // yandexEcommerceArray('impressions', newCars);
  } finally {
    isLoadMoreLoading.value = false;
  }
};

// Обработчики изменений
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

// Вычисляемые свойства
const checkCars = computed(() => allCars.value.length > 1 || !$route.params.car);

const title = computed(() => {
  if ($route.params.car) {
    return `Другие ${cleanUpTitle($route.params.brand, $route.params.model).toUpperCase()} в наличии`;
  } else if ($route.params.model) {
    return `Новые автомобили ${cleanUpTitle($route.params.brand, $route.params.model).toUpperCase()} в наличии`;
  } else if ($route.params.brand) {
    return `Новые автомобили ${cleanUpTitle($route.params.brand).toUpperCase()} в наличии`;
  } else {
    return 'Новые автомобили в наличии';
  }
});

const canLoadMore = computed(() => {
  return currentPage.value < totalPages.value;
});
</script>

<template>
  <section 
    :ref="(el) => { appStore.newCatalog = el }" 
    class="cars section" 
    v-if="checkCars && carsCount > 0 && !isLoading"
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
                border-radius: 4px;
                border: 2px solid var(--main-color);
                width: 300px;
                color: var(--main-color);
                &:hover:not(.disabled) {
                    background-color: var(--main-color);
                    color: white;
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
</style>