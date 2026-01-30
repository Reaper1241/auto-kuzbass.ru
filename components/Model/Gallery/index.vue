<script setup>
import { apiNew } from '@/constants'
import { useNewStore } from '/stores/NewStore.js'
import { ref, computed, onMounted, nextTick } from 'vue'

const newStore = useNewStore()

const interior = ref([])
const exterior = ref([])
const choice = ref(0)
const loading = ref(true)

const currentSlide = ref(0)
const trackRef = ref(null)

const isDragging = ref(false)
const startX = ref(0)
const currentTranslate = ref(0)
const prevTranslate = ref(0)

const fetchOptions = {
    headers: {
        'domain': 'https://auto-kuzbass.ru'
    }
};

const images = computed(() =>
  choice.value === 0 ? interior.value : exterior.value
)

const itemsToShow = computed(() => {
  if (process.client && window.innerWidth >= 1150) return 2.17
  else if (process.client && window.innerWidth >= 650) return 1.75
  else if (process.client && window.innerWidth >= 450) return 1.30
    else
  return 1
})

function slideWidth() {
  return trackRef.value?.clientWidth / itemsToShow.value || 0
}

function setPosition() {
  trackRef.value.style.transform = `translateX(${currentTranslate.value}px)`
}
function maxTranslate() {
  const totalWidth = images.value.length * slideWidth()
  const visibleWidth = trackRef.value.clientWidth
  return visibleWidth - totalWidth
}

function goToSlide(index) {
  if (index < 0) index = 0

  const translate = -index * slideWidth()
  const maxT = maxTranslate()

  currentTranslate.value =
    translate < maxT ? maxT : translate

  currentSlide.value = index
  prevTranslate.value = currentTranslate.value
  setPosition()
}


function nextSlide() {
  goToSlide(currentSlide.value + 1)
}

function prevSlide() {
  goToSlide(currentSlide.value - 1)
}


function touchStart(e) {
  isDragging.value = true
  startX.value = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
}

function touchMove(e) {
  if (!isDragging.value) return
  const x = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
  currentTranslate.value = prevTranslate.value + x - startX.value
  setPosition()
}

function touchEnd() {
  isDragging.value = false
  const moved = currentTranslate.value - prevTranslate.value
  if (moved < -50) nextSlide()
  else if (moved > 50) prevSlide()
  else goToSlide(currentSlide.value)
}

async function loadGalleries() {
  try {
    const [interiorData, exteriorData] = await Promise.all([
      fetch(`${apiNew}galleries/${newStore.model.id}?gallery_type_id=1`, fetchOptions).then(r => r.json()),
      fetch(`${apiNew}galleries/${newStore.model.id}?gallery_type_id=2`, fetchOptions).then(r => r.json()),
    ])

    interior.value = interiorData || []
    exterior.value = exteriorData || []

    await nextTick()
    goToSlide(0)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadGalleries()
  window.addEventListener('resize', () => goToSlide(currentSlide.value))
})
</script>

<template>
  <section class="gallery" v-if="images.length">
    <div class="gallery__wrapper">
      <div class="gallery__body">
        <div class="gallery__choice">
          <div
            class="choice__item"
            :class="{ active: choice === 0 }"
            v-if="interior.length"
            @click="choice = 0; goToSlide(0)"
          >
            Интерьер
            <i class="fa-solid fa-sort-down"></i>
          </div>

          <div
            class="choice__item"
            :class="{ active: choice === 1 }"
            v-if="exterior.length"
            @click="choice = 1; goToSlide(0)"
          >
            Экстерьер
            <i class="fa-solid fa-sort-down"></i>
          </div>
        </div>
        <div class="gallery__output">
          <div class="special__slider model__gallery slider">

            <div
              class="slider__track"
              ref="trackRef"
              @mousedown="touchStart"
              @mousemove="touchMove"
              @mouseup="touchEnd"
              @mouseleave="touchEnd"
              @touchstart="touchStart"
              @touchmove="touchMove"
              @touchend="touchEnd"
            >
              <div
                class="slider__item"
                v-for="(slide, index) in images"
                :key="index"
                :style="{ width: `calc(100% / ${itemsToShow})` }"
              >
                <div class="slide">
                  <a data-fancybox="gallery" :href="slide.url">
                    <img :src="slide.url" alt="car" />
                  </a>
                </div>
              </div>
            </div>
            <button class="slider__nav left" @click="prevSlide">
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <button class="slider__nav right" @click="nextSlide">
              <i class="fa-solid fa-chevron-right"></i>
            </button>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

.gallery__body {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px 0px 0px 0px;
}

.gallery__choice {
  display: flex;
  gap: 15px;

  .choice__item {
    font-size: var(--large-size);
    font-weight: 600;
    line-height: normal;
    background: #eeeeee;
    padding: 8px 14px;
    border-radius: 20px;
    cursor: pointer;
    opacity: 0.4;
    transition: 0.3s;
    position: relative;

    @media screen and (max-width: 768px) {
      font-size: var(--medium-size);
    }

    i {
      position: absolute;
      bottom: -10px;
      color: #eeeeee;
      left: 50%;
      transform: translateX(-50%);
      font-size: 25px;
    }

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }
}


.special__slider,
.model__gallery,
.slider {
  width: 100%;
  overflow: hidden;
  position: relative;
}


.slider__track {
  display: flex;
  transition: transform 0.35s ease;
  will-change: transform;
}

.slider__item {
  flex: 0 0 auto;
  padding-right: 5px; 
}

.slider__item img {
//   width: 100%;
//   height: 480px; 
height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 4px;
  @media screen and (max-width: 1024px){
    height: 300px;
  }
  @media screen and (max-width: 767px){
    height: 250px;
  }
}



.slider__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  opacity: 0.8;
  height: 40px;
  border-radius: 4px;
  border: 4px solid  var(--main-color);
  background: rgba(0, 0, 0, 0.75);
//   border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.25s;
  z-index: 10;

  i {
    color: var(--main-color);
    font-size: 16px;
  }

  &:hover {
    background:white;
    
  }
}

.slider__nav.left {
  left: 10px;
}

.slider__nav.right {
  right: 10px;
}
</style>
