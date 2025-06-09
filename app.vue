<script setup>
import { apiNew } from '@/constants';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const showCookieConsent = ref(false);

if (process.client) {
  appStore.entry = document.referrer;
  appStore.reffer = window.location.search;
  
  // Проверяем cookies только на клиенте
  const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
  if (!hasAcceptedCookies) {
    showCookieConsent.value = true;
  }
}

const acceptCookies = () => {
  localStorage.setItem('cookiesAccepted', 'true');
  showCookieConsent.value = false;
};

const fetchWithTimeout = (url, timeoutDuration = 5000) => {
  return Promise.race([
    useFetch(url),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeoutDuration))
  ]);
}

const fetchData = async () => {
  const fetchPromises = [
    fetchWithTimeout(`${apiNew}attributes`),
    fetchWithTimeout(`${apiNew}brands`),
    fetchWithTimeout(`${apiNew}pages`),
  ];

  const startTime = performance.now();

  try {
    const results = await Promise.all(fetchPromises);

    appStore.app = results[0].data.value;
    appStore.newBrands = results[1].data.value;
    appStore.newSeo = results[2].data.value;
  } catch (error) {
    console.error('Failed to fetch data:', error);

    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка API',
    })

  } finally {
    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / 1000;

    if (process.server) {
      console.log(`SSR Total fetch time: ${durationInSeconds.toFixed(2)} seconds`);
    } else {
      console.log(`Client Total fetch time: ${durationInSeconds.toFixed(2)} seconds`);
    }
  }
};

await fetchData();

onMounted(async () => {
  try {
    const response = await fetch(`/api/ip`);
    const data = await response.json();
    appStore.ip = data.ip;
  } catch (error) {
    console.error('IP fetch error', error);
  }
});

appStore.setAttributes();
</script>

<template>
  <GlobalLoader />
  <NuxtLayout>
    <NuxtPage />
    <!-- Cookie уведомление -->
    <div v-if="showCookieConsent" class="cookie-consent">
      <div class="cookie-consent__text">
        Наш сайт использует файлы cookies для повышения удобства пользователей. 
        Продолжая пользоваться сайтом, вы соглашаетесь с использованием файлов cookies и принимаете
        <NuxtLink :to="`/politics`" class="inline-link">Политику конфиденциальности</NuxtLink>.
      </div>
      <button class="cookie-consent__button" @click="acceptCookies">Принять</button>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
.cookie-consent {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 12px 16px;
  background: #fff;
  display: flex;
  align-items: center;
  border-radius: 8px 8px 0 0;
  justify-content: space-between;
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  
  @media (min-width: 933px) {
    bottom: 20px;
    left: 50%;
    right: auto;
    width: auto;
    max-width: 90%;
    min-width: 900px;
    transform: translateX(-50%);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
}

.cookie-consent__text {
  font-size: 13px;
  line-height: 1.4;
  color: #333;
  margin-right: 15px;
  white-space: pre-wrap;
  
  @media (min-width: 933px) {
    font-size: 14px;
    line-height: 1.5;
  }
}

.inline-link {
  color: var(--main-color);
  text-decoration: underline;
  white-space: nowrap;
  display: inline;
}

.cookie-consent__button {
  background: var(--main-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 10px;
  
  &:hover {
    background:#007FA4;
  }
}

@media (max-width: 933px) {
  .cookie-consent {
    flex-direction: column;
    text-align: center;
    padding: 10px;
  }
  
  .cookie-consent__text {
    margin-right: 0;
    margin-bottom: 5px;
    text-align: start;
  }
  
  .cookie-consent__button {
    width: 30%;
    padding: 10px;
  }
}
</style>
