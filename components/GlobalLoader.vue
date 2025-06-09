<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()
</script>

<template>
    <div v-show="appStore.globalLoader" class="global-loader">
        <div class="loader-bar"></div>
        <div class="loader-spinner"></div>
    </div>
</template>

<style scoped>
.global-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background: rgba(255, 255, 255, 0.92);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
}

.loader-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--main-color2);
    animation: progress 2s ease-in-out infinite;
}

@keyframes progress {
    0% {
        width: 0%;
    }

    50% {
        width: 50%;
    }

    100% {
        width: 100%;
    }
}

.loader-spinner {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: var(--main-color2);
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>
