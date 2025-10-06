<script setup>
defineProps({
  car: {
    type: Object,
    required: false
  }
})

import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore();
</script>


<template>
    <section class="eb-4">
        <div class="banner">
            <p>Успейте купить авто до повышения утильсбора!</p>
        </div>
    </section>
</template>

<style scoped lang="scss">
    .eb-4{
        max-width: 1400px;
        margin: 0 auto;
        // padding: 20px
        // padding: 0px 20px;
        @media screen and (max-width: 767px){
            padding: 0px;
        }
    }
    .banner{
        margin:10px 0 0 0px;
        width: 100%;
        background-color: #880015;
        padding: 8px 0px;
        display: flex;
        font-weight: 700;
        justify-content: center;
        font-size: 20px;
        border-radius: 4px;
        color: white;
        @media screen and (max-width: 767px){
            border-radius: 0px;
            margin: 0px;
            
        }
        p{
            font-weight: 700;
            @media screen and (max-width: 767px){
                font-size: 14px;
            }
            @media screen and (max-width: 400px){
                font-size: 12px;
            }
        }
    }
</style>
