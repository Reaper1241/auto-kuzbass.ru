<script setup>
import { useAppStore } from '/stores/AppStore.js';
import { useNewStore } from '/stores/NewStore.js';
import { useNewCarStore } from '/stores/NewCarStore.js';
import { useRoute } from 'vue-router';

const appStore = useAppStore();
const NewCarStore = useNewCarStore();
const newStore = useNewStore();
const $route = useRoute();

const title = ref('')

function setSeo() {
    try {
        const car_id = ref('')
        const car_minprice = ref('')

        const brand_name_rus = ref('')
        const brand_name_eng = ref('')

        const model_name_rus = ref('')
        const model_name_eng = ref('')
        const model_minprice = ref('')

        const generation_name = ref('')
        const generation_minprice = ref('')

        const modification_name_eng = ref('')
        const modification_name_rus = ref('')

        const complectation_name_eng = ref('')
        const complectation_name_rus = ref('')

        function replaceSEO(string) {
            if (string == null) { return '' }
            return string
                .replaceAll('%brand_name_rus%', brand_name_rus.value ? brand_name_rus.value : brand_name_eng.value)
                .replaceAll('%model_name_eng%', model_name_eng.value ? model_name_eng.value : model_name_rus.value)
                .replaceAll('%generation_name_rus%', generation_name.value ? generation_name.value : '')
                .replaceAll('%generation_name_eng%', generation_name.value ? generation_name.value : '')
                .replaceAll('%brand_name_eng%', brand_name_eng.value ? brand_name_eng.value : brand_name_rus.value)
                .replaceAll('%model_name_rus%', model_name_rus.value ? model_name_rus.value : model_name_eng.value)
                .replaceAll('%car_id%', car_id.value)
                .replaceAll('%generation_minprice%', makeSpaces(generation_minprice.value))
                .replaceAll('%car_minprice%', makeSpaces(car_minprice.value))
                .replaceAll(`%site_name_eng%`, appStore.siteName)
                .replaceAll(`%site_name_rus%`, appStore.siteName)
                .replaceAll('%site_credit_percent%', appStore.creditPercent)
                .replaceAll('%modification_name_eng%', modification_name_eng.value)
                .replaceAll('%modification_name_rus%', modification_name_rus.value)
                .replaceAll('%complectation_name_eng%', complectation_name_eng.value)
                .replaceAll('%complectation_name_rus%', complectation_name_rus.value)
        }

        if ($route.path.includes('cars')) {
            brand_name_rus.value = $route.params.brand ? appStore.newBrands.find(brand => brand.url_brand === $route.params.brand)?.ru_brand?.toUpperCase() : ''
            brand_name_eng.value = $route.params.brand ? appStore.newBrands.find(brand => brand.url_brand === $route.params.brand)?.brand?.toUpperCase() : ''

            model_name_rus.value = $route.params.model ? $route.params.model?.toUpperCase() : ''
            model_name_eng.value = $route.params.model ? $route.params.model?.toUpperCase() : ''
            model_minprice.value = $route.params.model ? newStore.model?.min_price : ''

            car_id.value = $route.params.car ? NewCarStore.car.id : ''
            car_minprice.value = $route.params.car ? NewCarStore.car.price - NewCarStore.car.sale : ''

            modification_name_eng.value = $route.params.car ? NewCarStore.car?.modification?.modification : ''
            modification_name_rus.value = $route.params.car ? NewCarStore.car?.modification?.modification : ''

            complectation_name_eng.value = $route.params.car ? NewCarStore.car?.complectation?.complectation : ''
            complectation_name_rus.value = $route.params.car ? NewCarStore.car?.complectation?.complectation : ''

            title.value = replaceSEO(appStore.newSeo[$route.name]?.h1)
        } else {
            title.value = replaceSEO(appStore.newSeo[$route.name]?.h1)
        }
    } catch (error) {
        console.log(error)
    }
}
setSeo()
</script>

<template>
    <h1 class="page__title" v-htmlSanitizer="title ? cleanUpTitle(title) : ''" />
</template>


<style lang="scss" scoped>
.page__title {
    font-size: var(--large-size);
    font-weight: bold;
    line-height: normal;
}

.margin-0 {
    margin: 0;
}
</style>