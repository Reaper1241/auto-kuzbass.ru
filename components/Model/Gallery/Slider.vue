<script setup>
const currentSlide = ref(0)

const props = defineProps({
    images: Array,
});

const breakpoints = {
    0: {
        itemsToShow: 1.25,
    },
    1150: {
        itemsToShow: 2.5,
    },
}

function slideTo(index) {
    if (index === props.images.length) {
        currentSlide.value = 0;
    } else {
        currentSlide.value = index;
    }
}

watch(() => props.images, () => {
    if (props.images.length) {
        currentSlide.value = 1;
    }
});
</script>

<template>
    <div class="special__slider model__gallery">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide" :mouseDrag="false"
            :breakpoints="breakpoints">
            <Slide v-for="(slide, index) in images" :key="index">
                <div class="carousel__item">
                    <div class="slide">
                        <a data-fancybox="gallery" :href="`${slide.url}`">
                            <img :src="`${slide.url}`" alt="car" style="width: 100%;" />
                        </a>
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Navigation class="carousel__navigation" />
            </template>
        </Carousel>
    </div>
</template>

<style scoped lang="scss">
.carousel__item {
    width: 100%;
}
</style>