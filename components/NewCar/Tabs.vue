<script setup>
import { computed, ref } from 'vue';
import { useNewCarStore } from '/stores/NewCarStore.js';
import { useAppStore } from '/stores/AppStore.js';

const appStore = useAppStore();
const carStore = useNewCarStore();
const car = ref(carStore.car || {}); // Защита от undefined

// Активная вкладка (Опции / Характеристики)
const activeTab = ref(0);

/**
 * Фильтрует характеристики, удаляя пустые, нулевые и undefined значения.
 * @returns {Object} - Отфильтрованные данные из `car.modification`.
 */
const filteredSpecs = computed(() => {
  if (!car.value.modification) return {};

  const specs = { ...car.value.modification };
  const excludedValues = [undefined, null, 0, "", "0"]; // Добавил "0" на случай строкового нуля

  return Object.fromEntries(
    Object.entries(specs).filter(([_, value]) => {
      return !excludedValues.includes(value) && value !== false; // Оставляем boolean true
    })
  );
});

/**
 * Проверяет, есть ли данные в разделе опций (например, безопасность, интерьер и т. д.).
 * @param {string} section - Название секции (safety, exterior, ...).
 * @returns {boolean} - Есть ли данные для отображения.
 */
const hasComplectationData = (section) => {
  if (!car.value.complectation || !car.value.complectation[section]) return false;

  const value = car.value.complectation[section];

  // Отсеиваем "пустые" значения
  const excludedValues = [null, undefined, "", "0", "-", "—", "Нет данных"];

  return !excludedValues.includes(value?.trim?.() || value);
};

const complectationSections = computed(() => {
  const sections = [
    { key: 'safety', title: 'Безопасность' },
    { key: 'exterior', title: 'Экстерьер' },
    { key: 'interior', title: 'Интерьер' },
    { key: 'comfort', title: 'Комфорт' },
    { key: 'overview', title: 'Обзор' },
    { key: 'multimedia', title: 'Мультимедиа' },
    { key: 'сar_theft_protection', title: 'Защита от угона' }
  ];

  const validSections = sections.filter(section => hasComplectationData(section.key));

  const midIndex = Math.ceil(validSections.length / 2);
  return {
    firstColumn: validSections.slice(0, midIndex),
    secondColumn: validSections.slice(midIndex),
  };
});
</script>

<template>
  <section class="car-tabs section">
    <div class="container">
      <div class="car-tabs__wrapper">
        <div class="buttons__show-list">
          <div class="title__show-list" :class="{ active: activeTab == 0 }" @click="activeTab = 0">
            Опции автомобиля
          </div>
          <div class="title__show-list" :class="{ active: activeTab == 1 }" @click="activeTab = 1">
            Технические характеристики
          </div>
        </div>
      </div>

      <!-- Блок с опциями (две колонки) -->
      <div class="options-container" :class="{ hide: activeTab != 0 }">
        <div class="options-columns">
          <!-- Первая колонка -->
          <div class="options-column">
            <div v-for="section in complectationSections.firstColumn" :key="section.key" class="option-block">
              <h3 class="option-title">{{ section.title }}</h3>
              <ul class="option-list" v-htmlSanitizer="car.complectation[section.key]"></ul>
            </div>
          </div>
          
          <!-- Вторая колонка -->
          <div class="options-column">
            <div v-for="section in complectationSections.firstColumn" :key="section.key" class="option-block">
              <h3 class="option-title">{{ section.title }}</h3>
              <ul class="option-list" v-htmlSanitizer="car.complectation[section.key]"></ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Блок с техническими характеристиками -->
      <div class="accordion" :class="{ hide: activeTab != 1 }">
        <div class="accordion__content tech__content">
          <div class="tech__content-img">
            <img src="/images/spec__tech.webp" alt="car" />
          </div>
          <ul class="accordion__list accordion__list-tech" id="tech">
            <li class="list-group-item" v-if="filteredSpecs.length">
              <span>Длина, мм.</span><span>{{ filteredSpecs.length }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.height">
              <span>Высота, мм.</span><span>{{ filteredSpecs.height }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.width">
              <span>Ширина, мм.</span><span>{{ filteredSpecs.width }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.wheel_base">
              <span>Колесная база, мм.</span><span>{{ filteredSpecs.wheel_base }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.clearance">
              <span>Клиренс, мм.</span><span>{{ filteredSpecs.clearance }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.fuel">
              <span>Тип двигателя</span><span>{{ filteredSpecs.fuel }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.engine_size">
              <span>Объем двигателя, л.</span><span>{{ filteredSpecs.engine_size }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.displacement">
              <span>Рабочий объем двигателя, см3.</span><span>{{ filteredSpecs.displacement }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.power">
              <span>Мощность, л.с.</span><span>{{ filteredSpecs.power }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.number_of_gears">
              <span>Количество передач</span><span>{{ filteredSpecs.number_of_gears }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.from_0_to_100">
              <span>Разгон от 0 до 100 км/ч, сек.</span><span>{{ filteredSpecs.from_0_to_100 }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.max_speed">
              <span>Максимальная скорость, км/ч.</span><span>{{ filteredSpecs.max_speed }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.consumption_highway">
              <span>Расход топлива на трассе, л/100 км.</span><span>{{ filteredSpecs.consumption_highway }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.consumption_city">
              <span>Расход топлива в городе, л/100 км.</span><span>{{ filteredSpecs.consumption_city }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.consumption_combine">
              <span>Смешанный расход топлива, л/100 км.</span><span>{{ filteredSpecs.consumption_combine }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.fuel_tank_capacity">
              <span>Объем топливного бака, л.</span><span>{{ filteredSpecs.fuel_tank_capacity }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.trunk_capacity">
              <span>Объем багажного отделения, л.</span><span>{{ filteredSpecs.trunk_capacity }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.curb_weight">
              <span>Снаряженная масса, кг.</span><span>{{ filteredSpecs.curb_weight }}</span>
            </li>
            <li class="list-group-item" v-if="filteredSpecs.max_weight">
              <span>Максимальная масса, кг.</span><span>{{ filteredSpecs.max_weight }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

.buttons__show-list {
    display: flex;
    gap: 20px;
    margin-left: 0px;
    margin-bottom: 40px;
    justify-content: center;
    
    @media screen and (max-width: 767px) {
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
    }

    @media screen and (max-width: 480px) {
        flex-direction: column;
        gap: 10px;
    }

    .title__show-list {
        font-weight: 500;
        font-size: 20px;
        line-height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #7f7f7f;
        cursor: pointer;
        border-radius: 4px;
        width: 49%;
        height: 40px;
        border: 2px solid #7f7f7f;
        
        @media screen and (max-width: 767px) {
            font-size: 16px;
            line-height: 18px;
            width: 48%;
            border: 1px solid #7f7f7f;
        }

        @media screen and (max-width: 480px) {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }

    .title__show-list.active {
        color: var(--main-color);
        border: 2px solid var(--main-color);
        
        @media screen and (max-width: 767px) {
            border: 1px solid var(--main-color);
        }
    }
}

.options-container {
    display: block;
    
    .options-columns {
        display: flex;
        gap: 30px;
        align-items: flex-start;
        
        @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 20px;
        }
    }
    
    .options-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }
    
    .option-block {
        border: 1px solid #E5E5E5;
        border-radius: 4px;
        overflow: hidden;
        padding: 20px;
        background: #fff;
        width: 100%;
    }
    
    .option-title {
        font-weight: 500;
        font-size: 18px;
        margin: 0 0 15px 0;
        color: var(--main-color);
        padding-bottom: 10px;
        border-bottom: 1px solid #E5E5E5;
    }
    
    .option-list {
        columns: 1;
        padding: 0;
        margin: 0;
        
        &:deep(li) {
            position: relative;
            line-height: 20px;
            margin-bottom: 8px;
            break-inside: avoid;
            page-break-inside: avoid;

            &::before {
                content: "\f192";
                font-family: "Font Awesome 6 Free";
                font-size: 8px;
                font-weight: 900;
                color: var(--main-color2);
                margin-right: 10px;
            }
        }
    }
}

.accordion {
    display: block;

    .tech__content {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        padding-bottom: 10px;

        @media screen and (max-width: 1023px) {
            flex-direction: column;
            align-items: center;
        }

        @media screen and (max-width: 580px) {
            padding-bottom: 20px;
            border-bottom: 0;
        }

        .tech__content-img {
            position: relative;
            min-width: 274px;
            width: 274px;
            height: 256px;

            p {
                position: absolute;
                bottom: -12px;
                left: 125px;
                height: max-content;

                &:nth-child(3) {
                    bottom: 40px;
                    left: -15px;
                    writing-mode: vertical-lr;
                    transform: rotate(180deg);
                }

                &:nth-child(4) {
                    top: 40px;
                    left: -15px;
                    writing-mode: vertical-lr;
                    transform: rotate(180deg);
                }
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        .accordion__list-tech {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px 40px;

            @media screen and (max-width: 580px) {
                grid-template-columns: 1fr;
                width: 100%;
            }

            li {
                display: grid;
                grid-template-columns: auto 1fr auto;
                align-items: center;
                min-width: 350px;
                max-width: 450px;
                gap: 5px;
                list-style: circle;

                @media screen and (max-width: 1199px) {
                    min-width: auto;
                    margin-left: 0;
                }

                span {
                    &:last-child {
                        font-weight: 700;
                        text-align: right;
                    }
                }
            }
        }
    }
}

.hide {
    display: none;
}
</style>