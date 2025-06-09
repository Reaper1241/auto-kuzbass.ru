<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

const loading = ref(true);
onMounted(() => {
    loading.value = false
})
</script>

<template>
    <section class="page-content section">
        <div class="container">
            <div class="page-content__wrapper" v-if="!loading">
                <div
                    v-htmlSanitizer="appStore?.newSeo[$route.name]?.text_content ? removeTrash(appStore.newSeo[$route.name].text_content) : null" />
            </div>
            <div class="page-content__wrapper" v-else>
                <div class="skeleton text" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped></style>