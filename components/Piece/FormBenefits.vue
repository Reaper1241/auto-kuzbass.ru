<script setup>
const props = defineProps({
    benefits: Array
})
</script>


<template>
    <div class="form__benefits">
        <div class="form__benefit" v-for="(benefit, index) in props.benefits" :key="benefit.index">
            <div class="form__benefit-icon"><i :class="benefit.icon"></i></div>
            <div class="form__benefit-title">{{ benefit.title }}</div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.form__benefits {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding-bottom: 15px;

    @media screen and (max-width: 768px) {
        flex-wrap: wrap;
    }

    @media screen and (max-width: 540px) {
        flex-wrap: wrap;
        ;
    }

    .form__benefit {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        padding: 22px;
        text-align: center;
        border-radius: 20px;
        background: white;
        width: 140px;
        height: 140px;
        transition: 0.3s;

        -webkit-box-shadow: 0px 0px 7px -1px rgba(34, 60, 80, .3);
        -moz-box-shadow: 0px 0px 7px -1px rgba(34, 60, 80, .3);
        box-shadow: 0 0 7px -1px #223c504d;

        &:last-child {
            @media screen and (max-width: 768px) {
                width: 100%;
            }
        }

        @media screen and (max-width: 1200px) {
            width: 25%;
        }

        &:hover {
            background: var(--main-color);
            color: white;
            transition: 0.3s;
        }

        @media screen and (max-width: 768px) {
            width: 30%;
        }

        @media screen and (max-width: 540px) {
            width: 47%;

            &:last-child {
                width: 47%;
            }
        }

        .form__benefit-title {
            font-size: var(--standart-size);
        }

        i {
            font-size: 40px;
        }
    }
}

.wrap {
    flex-wrap: wrap;
}
</style>