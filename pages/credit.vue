<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

// Получаем выбранный банк по его ID
const selectedBank = computed(() => {
  return appStore.banks.find(bank => bank.id === appStore.selectedBankId);
});

// Если банк не выбран (прямой переход на страницу), используем банк с минимальной ставкой
const defaultBank = computed(() => {
  return appStore.banks.reduce((prev, current) => 
    (prev.percent < current.percent) ? prev : current
  );
});

// Текущий банк для отображения
const currentBank = computed(() => {
  return selectedBank.value || defaultBank.value;
});
</script>

<template>
    <Bread />
    <h2 class="title">Заявка на автокредит от {{ currentBank.percent }}%</h2>
    <!-- <BannerB1/> -->
    <Credit />
    <!-- <BannerSB1 /> -->
    <BannerCB1/>
    <ModalAFK />
    <SEO />
</template>

<style lang="scss" scoped>
    .title{
        max-width: 1440px;
        margin: 0 auto;
        padding:0 20px ;
        @media screen and (max-width: 540px) {
            padding: 0 10px;
        }
    }
</style>