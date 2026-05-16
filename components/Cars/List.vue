<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "/stores/AppStore.js";

const router = useRouter();
const appStore = useAppStore();

const tags = [
  { id: 12, name: "Популярные авто", img: "/images/list1.webp", slug: "popular" },
  { id: 3, name: "Китайские авто", img: "/images/list2.webp", slug: "china" },
  { id: 16, name: "Семейные авто", img: "/images/list3.webp", slug: "family" },
  { id: 18, name: "Внедорожники", img: "/images/list6.webp", slug: "jeep" },
  { id: 14, name: "Авто для такси", img: "/images/list4.webp", slug: "taxi" },
  { id: 17, name: "Седаны", img: "/images/list5.webp", slug: "sedan" },
]; 

const selectedTag = ref(null);

const handleTagClick = (tag) => {
  selectedTag.value = tag.id;
  router.push(`/cars/${tag.slug}`);
};

onMounted(() => {
  selectedTag.value = tags[0].id;
});
</script>

<template>
  <section class="section cars-hot">
    <div class="container">
      <div class="cars-hot__wrapper">
        <BaseSectionTitle :title="'Подборки'" class="title"/>

        <div class="cars-hot__grid">
          
          <!-- Карточка 1: Популярные (Слева высокий, 2.5 колонки из 6 = ~41.7%) -->
          <div
            class="cars-hot__card card-top-left"
            :class="{ active: selectedTag === tags[0].id }"
            @click="handleTagClick(tags[0])"
          >
            <div class="cars-hot__content">
              <div class="cars-hot__name">{{ tags[0].name }}</div>
            </div>
            <img class="cars-hot__image" :src="tags[0].img" :alt="tags[0].name" />
          </div>

          <!-- Карточка 2: Семейный (Справа верхний, 3.5 колонки из 6 = ~58.3%) -->
          <div
            class="cars-hot__card card-top-right"
            :class="{ active: selectedTag === tags[1].id }"
            @click="handleTagClick(tags[1])"
          >
            <div class="cars-hot__content">
              <div class="cars-hot__name">{{ tags[1].name }}</div>
            </div>
            <img class="cars-hot__image" :src="tags[1].img" :alt="tags[1].name" />
          </div>

          <!-- Карточка 3: Такси (Справа под Семейным, 3.5 колонки) -->
          <div
            class="cars-hot__card card-bottom-left"
            :class="{ active: selectedTag === tags[2].id }"
            @click="handleTagClick(tags[2])"
          >
            <div class="cars-hot__content">
              <div class="cars-hot__name">{{ tags[2].name }}</div>
            </div>
            <img class="cars-hot__image" :src="tags[2].img" :alt="tags[2].name" />
          </div>

          <!-- Карточка 4: Китайские (Нижний ряд, 2 колонки) -->
          <div
            class="cars-hot__card card-bottom-right"
            :class="{ active: selectedTag === tags[3].id }"
            @click="handleTagClick(tags[3])"
          >
            <div class="cars-hot__content">
              <div class="cars-hot__name">{{ tags[3].name }}</div>
            </div>
            <img class="cars-hot__image" :src="tags[3].img" :alt="tags[3].name" />
          </div>

          <!-- Карточка 5: Седаны (Нижний ряд, 2 колонки) -->
          <div
            class="cars-hot__card card-row-3"
            :class="{ active: selectedTag === tags[4].id }"
            @click="handleTagClick(tags[4])"
          >
            <div class="cars-hot__content">
              <div class="cars-hot__name">{{ tags[4].name }}</div>
            </div>
            <img class="cars-hot__image" :src="tags[4].img" :alt="tags[4].name" />
          </div>

          <!-- Карточка 6: Внедорожники (Нижний ряд, 2 колонки) -->
          <div
            class="cars-hot__card card-row-3"
            :class="{ active: selectedTag === tags[5].id }"
            @click="handleTagClick(tags[5])"
          >
            <div class="cars-hot__content">
              <div class="cars-hot__name">{{ tags[5].name }}</div>
            </div>
            <img class="cars-hot__image" :src="tags[5].img" :alt="tags[5].name" />
          </div>

        </div>
        
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.title{
    margin-bottom: 10px;
}
.cars-hot {
  .cars-hot__grid {
    display: grid;
    // 6 колонок для точного контроля ширины
    grid-template-columns: repeat(9, 1fr);
    grid-template-rows: 180px 180px 220px;
    gap: 16px;
    margin-bottom: 40px;

    @media screen and (max-width: 767px){
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* --- ПОЗИЦИОНИРОВАНИЕ --- */
    /* Карточка 1: Популярные (Слева, 2.5 колонки из 6) */
    .card-top-left {
      grid-column: 1 / 5; // 3 колонки (1,2,3) = 50%
      grid-row: 1 / 3; 
    }

    /* Карточка 2: Семейный (Справа верхний, 3 колонки) */
    .card-top-right {
      grid-column: 5 / 10; // 3 колонки (4,5,6) = 50%
      grid-row: 1 / 2;
    }

    /* Карточка 3: Такси (Справа под Семейным, 3 колонки) */
    .card-bottom-left {
      grid-column: 5 / 10; // 3 колонки (4,5,6) = 50%
      grid-row: 2 / 3;
    }

    /* Карточка 4: Китайские (Нижний ряд, 2 колонки) */
    .card-bottom-right {
      grid-column: 7 / 10; // 2 колонки (5,6) = 33.33%
      grid-row: 3 / 4;
    }

    /* Карточка 5: Седаны (Нижний ряд, 2 колонки) */
    .card-row-3:nth-of-type(5) { 
      grid-column: 1 / 4; // 2 колонки (1,2) = 33.33%
    }

    /* Карточка 6: Внедорожники (Нижний ряд, 2 колонки) */
    .card-row-3:nth-of-type(6) { 
      grid-column: 4 / 7; // 2 колонки (3,4) = 33.33%
    }

    /* Нижний ряд */
    .card-row-3 {
      grid-row: 3 / 4;
    }
    /* -------------------------------- */

    .cars-hot__card {
      position: relative;
      background: var(--main-color);
      border-radius: 0px;
      padding: 10px;
      cursor: pointer;
      box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease, border 0.3s ease;

      &:hover {
        transform: translateY(-3px);
      }

      &.active {
        
        box-shadow: 0 0 15px rgba(255,255,255,0.3);
      }

      .cars-hot__content {
        position: relative;
        z-index: 1;
        pointer-events: none;
      }

      .cars-hot__name {
        font-size: 22px;
        font-weight: 700;
        text-transform: uppercase;
        color: white;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3); 
        margin-bottom: 5px;
      }

      .cars-hot__image {
        position: absolute;
        right: -10px;
        bottom: -10px;
        width: 80%;
        height: 90%;
        object-fit: contain;
        z-index: 1;
        opacity: 0.95;
        transition: transform 0.3s ease;
      }

      &:hover .cars-hot__image {
        transform: scale(1.05);
      }

      /* Стили для больших блоков */
      &.card-top-left, &.card-bottom-left {
        .cars-hot__image {
          width: 100%;
          right: 0px;
          bottom: 0;
        }
      }

      @media screen and (max-width: 767px){
        // На мобилке все карточки одинаковой ширины
        width: 100%;
        height: 150px;
        grid-column: auto !important;
        grid-row: auto !important;
        
        .cars-hot__image {
          width: 50% !important;
          height: 100% !important;
          right: 0 !important;
          bottom: 0 !important;
          
          top: 20px !important;
        }
      }
    }
  }
}
</style>