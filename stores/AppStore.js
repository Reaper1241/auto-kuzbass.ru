
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useAppStore = defineStore("appStore", () => {
  const time = ref(0)

  const perPage = ref(8);
  const sort = ref('created_at_desc');
  const newSort = ref('created_at_desc');
  const currentPerPage = ref(8);
  const formLoading = ref(false);
  const globalLoader = ref(false);

  const app = ref([])

  const brands = ref([])
  const chinaBrands = ref([])
  const newBrands = ref([])

  const newSeo = ref([])

  const catalog = ref('');
  const generations = ref('');

  const newCatalog = ref('');

  const appData = computed(() => app.value)

  let firstCar = ref({});

  const recentCars = reactive(
    {
      cars: {},
      count: 0,
      totalPages: 1,
      page: 1,
    }
  )

  const recentCarsNew = reactive(
    {
      cars: {},
      count: 0,
      totalPages: 1,
      page: 1,
    }
  )

  let recentQuery = ref('')
  const recentQueryNew = ref('')
  let recentCar = ref('')

  let modalShown = ref(false);
  const onceShown = ref(false);
  const isOpen = ref(false);

  let recentPage = ref('')

  const orderId = ref('');

  function getModelsByBrand(id) {
    return brands.value.find(e => e.id == id.value).car_models
  }

  function getGenerationsByModel(brandId, modelId) {
    return brands.value.find(e => e.id == brandId.value).car_models.find(e => e.id == modelId.value).generations
  }

  let cut = ref(19);
  let reffer = ref('');
  let ip = ref('');
  let entry = ref('');

  const showOnce = ref(false)

  /* Favorites */
  const favoriteCars = useCookie('fav')
  const outputFavorites = ref([])
  const appFavorite = computed(() => favoriteCars.value)
  const favotireCarsLength = computed(() => favoriteCars.value.length)

  favoriteCars.value?.length ? favoriteCars.value : favoriteCars.value = []


  function addFavorite(car) {
    favoriteCars.value = [car.id, ...favoriteCars.value]
  }

  function removeFavorite(car) {
    favoriteCars.value = favoriteCars.value.filter((item) => item !== car.id)
  }

  function checkFavorite(car) {
    return favoriteCars.value.some(c => c == car.id)
  }

  function getFavorites() {
    if (favoriteCars.value.length) {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      const carsIdsArray = ref([])
      for (let i = 0; i < favoriteCars.value.length; i++) {
        carsIdsArray.value.push({ id: favoriteCars.value[i] })
      }

      const carsIds = {
        "cars": carsIdsArray.value
      }

      axios.post(`${apiNew}cars`, carsIds, { headers }).then((response) => {
        outputFavorites.value = response.data
      })
    }
  }
  /* Favorites */

  /* Comparison */
  const comparisonCars = useCookie('comp')
  const appComparison = computed(() => comparisonCars.value)
  const outputСomparison = ref([])
  const comparisonCarsLength = computed(() => comparisonCars.value.length)

  comparisonCars.value?.length ? comparisonCars.value : comparisonCars.value = []

  function addComparison(car) {
    comparisonCars.value = [car.id, ...comparisonCars.value]
  }

  function removeComparison(car) {
    comparisonCars.value = comparisonCars.value.filter((item) => item !== car.id)
  }

  function checkComparison(car) {
    return appComparison.value.some(c => c == car.id)
  }

  function getComparison() {
    if (comparisonCars.value.length) {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      const carsIdsArray = ref([])
      for (let i = 0; i < comparisonCars.value.length; i++) {
        carsIdsArray.value.push({ id: comparisonCars.value[i] })
      }

      const carsIds = {
        "cars": carsIdsArray.value
      }

      axios.post(`${apiNew}cars`, carsIds, { headers }).then((response) => {
        outputСomparison.value = response.data
      })
    }
  }

  function comparisonRemove(car) {
    outputСomparison.value = outputСomparison.value.filter((item) => item.id !== car.id)
    comparisonCars.value = comparisonCars.value.filter((item) => item !== car.id)
  }
  /* Comparison */


  /* Views */
  const viewedCars = useCookie('view')
  const appViews = computed(() => viewedCars.value)
  const viewedCarsLength = computed(() => viewedCars.value.length)

  viewedCars.value?.length ? viewedCars.value : viewedCars.value = []

  function addViewed(car) {
    viewedCars.value = [car.id, ...viewedCars.value]
  }

  function removeViewed(car) {
    viewedCars.value = viewedCars.value.filter((item) => item !== car.id)
  }

  function checkViewed(car) {
    return appViews.value.some(c => c == car.id)
  }
  /* Views */


  /* Main App Data */
  const siteName = ref('Tmn-auto')
  const siteUrl = ref('https://tmn-auto.ru')
  const phone = ref('+7 (345) 258-30-00')
  const siteCity = ref('Тюмень')
  const address = ref('г. Тюмень , ул. Уездная, д. 2')
  // const yandexMap = ref('')

  const clearPhone = computed(() => {
    if (!phone.value) return '';
    return (phone.value.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', ''))
  });

  const politics = ref('Политика сайта')
  const workingHours = ref('Время работы сайта')
  const yandexMap = ref('')

  const creditPercent = ref(4.9)
  const creditTime = ref(84)

  const creditCalcPercent = ref(0.5)
  const tradeCalcPercent = ref(0.3)
  const salonCalcPercent = ref(0.2)

  function calcMonthPrice(car) {
    let persent = (creditPercent.value / 12) / 100;
    let priceCar = car.price - car.sale;
    let monthPrice = (persent * (1 + persent) ** creditTime.value) / (((1 + persent) ** creditTime.value) - 1);
    let total = (priceCar * monthPrice);
    return Math.floor(total);
  }

  function calcMonthPriceModel(sale, price) {
    let persent = (creditPercent.value / 12) / 100;
    let priceCar = price - sale;
    let monthPrice = (persent * (1 + persent) ** creditTime.value) / (((1 + persent) ** creditTime.value) - 1);
    let total = (priceCar * monthPrice);
    return Math.floor(total);
  }

  function setAttributes() {
    app.value.atr.phone ? phone.value = app.value.atr.phone : ''
    app.value.atr.address ? address.value = app.value.atr.address : ''
    app.value.atr.requisites ? politics.value = app.value.atr.requisites : ''
    app.value.atr.working_hours ? workingHours.value = app.value.atr.working_hours : ''
    app.value.atr.percent ? creditPercent.value = parseFloat(app.value.atr.percent) : ''
    app.value.atr.credit_months ? creditTime.value = parseFloat(app.value.atr.credit_months) : ''
    app.value.atr.yandex_map ? yandexMap.value = app.value.atr.yandex_map : ''
    app.value.atr.name ? siteName.value = app.value.atr.name : ''

    creditCalcPercent.value = app.value.atr.credit ? app.value.atr.credit / 100 : 0.5
    tradeCalcPercent.value = app.value.atr.trade ? app.value.atr.trade / 100 : 0.3
    salonCalcPercent.value = app.value.atr.gos ? app.value.atr.gos / 100 : 0.2

    perPage.value = app.value.atr.per_page
  }
  /* Main App Data */

  // Банки-партнеры
  const banks = ref([
    {
      id: 1,
      name: 'Альфа-банк',
      percent: 4.9,
      image: '/images/banks/alfa.png',
    },
    {
      id: 2,
      name: 'Сбербанк',
      percent: 6.5,
      image: '/images/banks/sber.png',
    },
    {
      id: 3,
      name: 'Т-Банк',
      percent: 4.9,
      image: '/images/banks/tinkoff.png',
    },
    {
      id: 4,
      name: 'Газпромбанк',
      percent: 7.5,
      image: '/images/banks/gazprom.png',
    },
    {
      id: 5,
      name: 'Локо Банк',
      percent: 4.9,
      image: '/images/banks/loko.png',
    },
    {
      id: 6,
      name: 'Кредит Европа банк',
      percent: 4.9,
      image: '/images/banks/europe.png',
    },
    {
      id: 7,
      name: 'Быстро банк',
      percent: 4.9,
      image: '/images/banks/byistro.png',
    },
    {
      id: 8,
      name: 'Совкомбанк',
      percent: 4.9,
      image: '/images/banks/sovcombank.png',
    },
    {
      id: 9,
      name: 'ВТБ',
      percent: 4.9,
      image: '/images/banks/vtb.png',
    },
    {
      id: 10,
      name: 'Уралсиб Банк',
      percent: 6.8,
      image: '/images/banks/uralsib.png',
    },
    {
      id: 11,
      name: 'Абсолют Банк',
      percent: 8,
      image: '/images/banks/absolyut.png',
    },
    {
      id: 12,
      name: 'ОТП Банк',
      percent: 4.9,
      image: '/images/banks/otp.png',
    },
    {
      id: 13,
      name: 'МБ рус',
      percent: 4.9,
      image: '/images/banks/mbrus.png',
    },
    {
      id: 14,
      name: 'АТБ',
      percent: 4.9,
      image: '/images/banks/atb.png',
    },
    {
      id: 15,
      name: 'ПримСоцБанк',
      percent: 7.3,
      image: '/images/banks/primsoc.png',
    },
    {
      id: 16,
      name: 'Банк Зенит',
      percent: 8,
      image: '/images/banks/zenit.png',
    },
  ]);
  const selectedBankId = ref(false);

  const selectedBank = computed(() => {
    return banks.value.find(bank => bank.id === selectedBankId.value) || null;
  });

  const lastCar = ref(0)
  const modelsList = ref('')

  return { siteCity, globalLoader, chinaBrands, banks, selectedBankId, selectedBank, modelsList, lastCar, formLoading, recentQueryNew, recentCarsNew, siteUrl,  newSort, time, creditCalcPercent, tradeCalcPercent, salonCalcPercent, calcMonthPriceModel, newBrands, isOpen, onceShown, creditTime, calcMonthPrice, siteName, setAttributes, workingHours, creditPercent, getComparison, comparisonRemove, outputСomparison, outputFavorites, getFavorites, newSeo, yandexMap, politics, clearPhone, phone, address, firstCar, modalShown, viewedCars, viewedCarsLength, addViewed, removeViewed, checkViewed, recentPage, recentCars, recentQuery, recentCar, orderId, getGenerationsByModel, getModelsByBrand, entry, ip, reffer, generations, newCatalog, catalog, comparisonCarsLength, comparisonCars, appComparison, addComparison, removeComparison, checkComparison, perPage, app, brands, appData, showOnce, cut, currentPerPage, sort, favoriteCars, appFavorite, addFavorite, removeFavorite, checkFavorite, favotireCarsLength }
}, {
  persist: {
    pick: ['clearPhone', 'phone', 'address', 'politics', 'workingHours', 'siteName'],
  },
});