<script setup>
import { useRoute } from 'vue-router';
const $route = useRoute();
</script>

<template>
    <Header />
    <main :class="$route.name !== undefined ? 'main' : ''">
        <slot />
    </main>
    <Footer />
</template>
