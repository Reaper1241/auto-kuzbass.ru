<script setup>
function toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
    <div @click="toTop" class="go-to-top" title="Наверх страницы">
        <i class="fa-solid fa-arrow-up"></i>
    </div>
</template>

<style scoped lang="scss">
.go-to-top {
    position: absolute;
    top: -50px;
    right: 5px;
    width: 68px;
    height: 68px;
    background: var(--main-color2);
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
        font-size: 28px;
        color: white;
    }

    &:hover {
        transform: scale(1.01);
    }
}
</style>