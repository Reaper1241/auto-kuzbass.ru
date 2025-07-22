<script setup>
import { ref, nextTick } from 'vue';

const activeTab = ref(1);

const cleanUpTitle = (str) => {
  return str || '';
};

const scrollToTabContent = (tabNumber) => {
  activeTab.value = tabNumber;
  nextTick(() => {
    const element = document.getElementById(`tab-${tabNumber}`);
    if (element) {
      const offset = 20;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
};
</script>

<template>
  <section class="section__tabs">
    <div class="container">
      <div class="tabs__header section__header">
        <button 
          class="tabs__header-item" 
          :class="{ active: activeTab === 1 }" 
          @click="scrollToTabContent(1)"
        >
          Комплектации и цены
        </button>
        
        <button 
          class="tabs__header-item" 
          :class="{ active: activeTab === 2 }" 
          @click="scrollToTabContent(2)"
        >
          Фото и характеристики
        </button>
        
        <button 
          class="tabs__header-item" 
          :class="{ active: activeTab === 3 }" 
          @click="scrollToTabContent(3)"
        >
          {{ cleanUpTitle($route.params.brand).toUpperCase() }} FINANCE
        </button>
        
        <NuxtLink 
          class="tabs__header-item tabs__header-link section__cars" 
          :to="{ hash: '#catalog' }"
          @click="activeTab = 4" 
          :class="{ active: activeTab === 4 }"
        >
          Авто в наличии
        </NuxtLink>
      </div>

      <div class="tabs__body">
        <div id="tab-1" v-show="activeTab === 1">
          <ModelComplectations />
        </div>
        <div id="tab-2" class="tabs__body-item" v-show="activeTab === 2">
          <ModelGallery />
          <ModelСharacteristics />
        </div>
        <div id="tab-3" v-show="activeTab === 3">

        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section__tabs {
  @media screen and (max-width: 570px) {
    border-bottom: 1px solid #C4C4C4;
  }

  .container {
    max-width: 1430px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .tabs__header {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
    position: relative;
    padding-top: 0px;

    @media screen and (max-width: 1024px) {
      gap: 10px;
      padding-top:10px;
    }

    @media screen and (max-width: 570px) {
      flex-direction: column;
      padding-top: 0px;
    }

    .tabs__header-item,
    .tabs__header-link {
      position: relative;
      font-weight: 500;
      font-size: 16px;
      line-height: 18px;
      background: transparent;
      color: #9F9F9F;
      border: 1px solid #9F9F9F;
      border-radius: 4px;
      max-width: 300px;
      width: 100%;
      height: 50px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease;
      text-decoration: none;
      outline: none;

      @media screen and (max-width: 1024px) {
        max-width: 48%;
      }

      @media screen and (max-width: 570px) {
        max-width: 100%;
        border-radius: 4px;
      }

      &:hover {
        border-color: var(--main-color);
        color: var(--main-color);
      }
    }

    .tabs__header-item.active,
    .tabs__header-link.active {
      color: var(--bg-light);
      background: var(--main-color);
      border: 1px solid var(--main-color);
    }
  }

  .tabs__body {
    > div {
      padding-top: 20px;
      margin-top: -20px;
      scroll-margin-top: 100px; /* Для якорных ссылок */
    }

    .tabs__body-item {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .finance-content {
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;

      h2 {
        color: var(--main-color);
        margin-bottom: 15px;
      }
    }
  }
}
</style>