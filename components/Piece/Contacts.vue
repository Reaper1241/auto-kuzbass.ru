<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
    <div class="contacts">
        <div class="contacts__item">
            <a :href="`tel:+${appStore.clearPhone}`">{{ appStore.phone }}</a>
        </div>

        <div class="contacts__item">
            {{ appStore.address }}
        </div>

        <div class="contacts__item">
            {{ appStore.workingHours }}
        </div>
    </div>
</template>



<style lang="scss" scoped>
.contacts {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.contacts.burger {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 15px;
    border-radius: 20px;
    background: var(--main-color);
    color: white;
    width: fit-content;
    text-align: center;

    .contacts__item {
        font-size: var(--standart-size);
    }
}
</style>