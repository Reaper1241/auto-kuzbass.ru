<script setup>
const currentSlide = ref(0)
const props = defineProps(['carInfo'])
</script>

<template>
    <div class="car-slider">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide" :mouseDrag="false"
            v-if="props.carInfo.images.length">
            <Slide v-for="(slide, index) in props.carInfo.images.slice(0, 10)" :key="index">
                <div class="carousel__item">
                    <div class="slide">
                        <img :src="`${slide.url}`" alt="car" style="width: 100%; height: 100%;" />
                    </div>
                </div>
            </Slide>

            <template #addons class="addons">
                <Pagination />
            </template>
        </Carousel>

        <div v-else class="empty-gallery">
            <img src="/images/no_image.webp" alt="car" />
        </div>

    </div>
</template>

<style scoped lang="scss">
.thumbnails li {
    margin: 10px;
}


.carousel__track {
    height: 100%;
}


.special__slider {
    max-width: 95vw;
}

.carousel__pagination {
    flex-wrap: wrap;
}

.carousel__pagination {
    position: absolute;
    bottom: 20px;
    padding: 0 20px;
    width: 100%;
}

.empty-gallery {
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>