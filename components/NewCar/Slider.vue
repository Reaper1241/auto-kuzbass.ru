<script setup>
const currentSlide = ref(0);
const props = defineProps({
    images: Array,
    imagesType: Boolean,
    preview: String
});

const breakpoints = {
    0: { itemsToShow: 1.25 },
    1150: { itemsToShow: 1 },
};

// Создаём вычисляемый список изображений с сортировкой по полю sort
const imagesList = computed(() => {
    let sorted = [...props.images].sort((a, b) => a.sort - b.sort);
    if (!props.imagesType) {
        // Добавляем превью только если оно ещё не в списке
        const hasPreview = sorted.some(img => img.url === props.preview);
        if (!hasPreview) {
            sorted.unshift({ url: props.preview });
        }
    }
    return sorted;
});

function slideTo(index) {
    if (index === imagesList.value.length) {
        currentSlide.value = 0;
    } else {
        currentSlide.value = index;
    }
}

watch(imagesList, () => {
    if (imagesList.value.length) {
        currentSlide.value = 0;
    }
});

function slideNext() {
    slideTo((currentSlide.value + 1) % imagesList.value.length);
}

function slidePrev() {
    slideTo((currentSlide.value - 1 + imagesList.value.length) % imagesList.value.length);
}
</script>

<template>
  <div class="special__slider">
    <!-- Основной слайдер -->
    <Carousel
      id="gallery"
      :items-to-show="1"
      :wrap-around="false"
      v-model="currentSlide"
      :mouseDrag="false"
      :breakpoints="breakpoints"
    >
      <Slide v-for="(slide, index) in imagesList" :key="index">
        <div class="carousel__item">
          <div class="slide">
            <a data-fancybox="gallery" :href="slide.url">
              <NuxtImg
                class="main-image"
                lazy
                format="webp"
                quality="80"
                loading="lazy"
                :src="slide.url"
                alt="car"
              />
            </a>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>

    <!-- Миниатюры снизу + кнопки -->
    <div class="carousel__custom-thumbnails">
      <button class="thumb-btn prev" @click="slidePrev">‹</button>

      <ul class="carousel__custom-thumbnails-list">
        <li
          v-for="(slide, index) in imagesList"
          :key="'thumb-'+index"
          class="carousel__item"
          :class="{ 'active': currentSlide === index }"
          @click="slideTo(index)"
        >
          <NuxtImg
            lazy
            format="webp"
            quality="90"
            loading="lazy"
            :src="slide.url"
            alt="car"
          />
        </li>
      </ul>

      <button class="thumb-btn next" @click="slideNext">›</button>
    </div>
  </div>
</template>



<style scoped lang="scss">
.carousel__custom-thumbnails {
  width: 100%;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media screen and (max-width: 1150px) {
    display: none; // скрываем миниатюры и кнопки на мобилке
  }

  .thumb-btn {
    // background: rgba(0,0,0,0.5);
    color: black;
    border: none;
    font-size: 34px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
    //   background: rgba(0,0,0,0.7);
    }
  }

  .carousel__custom-thumbnails-list {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    flex-grow: 1;

    .carousel__item {
      cursor: pointer;
      list-style: none;
      border-radius: 6px;
      overflow: hidden;
      opacity: 0.5;
      width: 80px;
      height: 80px;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
      }
    }

    .carousel__item.active {
      opacity: 1;
    }
  }
}
:deep(.slide){
    height: 400px;
}
.slider-wrapper {
  position: relative;
  display: flex;
  align-items: center;

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(0,0,0,0.5);
    color: #fff;
    border: none;
    font-size: 32px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: rgba(0,0,0,0.7);
    }

    &.prev {
      left: 10px;
    }
    &.next {
      right: 10px;
    }
  }
}

:deep(.carousel__pagination){
    position: relative;
    display: none;
    top: 95px;

}

.special__slider {
    max-width: 95vw;
    display: flex;
    flex-direction: column; // миниатюры идут под слайдером
    gap: 10px;

    @media screen and (max-width: 1150px) {
        display: block;
    }

    .carousel__custom-thumbnails {
  width: 100%;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media screen and (max-width: 1150px) {
    display: none; // скрываем миниатюры и кнопки на мобилке
  }

  .thumb-btn {
    color: black;
    border: none;
    font-size: 34px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carousel__custom-thumbnails-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); 
    gap: 10px;
    width: 100%;

    .carousel__item {
      cursor: pointer;
      list-style: none;
      border-radius: 6px;
      overflow: hidden;
      opacity: 0.5;
      aspect-ratio: 1 / 1; // квадратные
      width: 100%;         // занимает всю доступную ячейку

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
      }
    }

    .carousel__item.active {
      opacity: 1;
    }
  }
}

}

.main-image {
    border-radius: 4px;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
}
</style>
