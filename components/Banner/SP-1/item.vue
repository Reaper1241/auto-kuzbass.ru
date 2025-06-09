<script setup>
const props = defineProps(['item'])
</script>

<template>
    <div class="banner-sp1__item">
        <div class="banner-sp1__item-img">
            <NuxtImg format="webp" quality="90" :src="item.image" :alt="item.title" />
        </div>
        <div class="banner-sp1__item-title">
            <a v-if="item?.link" class="link-button" :href="item.link">{{ item.title }}</a>
            <BaseButtonModal :btn-label="item.title" :modal-title="item.title" :btnClass="`sp-1`" v-else
                :modal-description="item?.description" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.banner-sp1__item {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    height: 240px;
    min-width: max-content;
    width: auto;
    transition: 0.3s;

    &:hover {
        box-shadow: var(--box-shadow);
        transition: 0.3s;
    }

    .banner-sp1__item-title {
        position: absolute;
        bottom: 10px;
        background: white;
        border-radius: 20px;
        text-align: center;
        font-size: 14px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
    }

    .banner-sp1__item-img {
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
            object-fit: cover;
            height: 100%;
            width: 100%;
        }
    }
}

.link-button {
    background: white;
    border: none;
    color: var(--main-black);
    padding: 10px;
    border-radius: 20px;
    font-weight: bold;
    transition: 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-weight: 500;
    font-size: 16px;
}
</style>