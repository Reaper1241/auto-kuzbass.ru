<script setup>
const props = defineProps(['carPrice', 'disabled', 'minPercent'])

const emits = defineEmits(['percentListOutput']);

let percentList = ref(props?.minPercent ? props?.minPercent : 10);
let currentStep = ref(5);
const max = ref(80);
const min = ref(props.minPercent ? props.minPercent : 0);

let firstFee = computed(() => {
    return (props.carPrice * percentList.value) / 100
})

emits('percentListOutput', percentList.value)
watch(percentList, (newPercentList, oldPercentList) => {
    emits('percentListOutput', percentList.value)
})

const options = computed(() => {
    const arr = [];
    for (let value = min.value; value <= max.value; value += currentStep.value) {
        arr.push(value);
    }
    return arr;
});
</script>

<template>
    <div class="percent-block">
        <label class="credit__first" for=" credit-page--first">
            <p class="first__row">
                <span class="title">Первый взнос</span>
                <span class="output-first">
                    {{ makeSpaces(firstFee) }} руб.
                    ({{ percentList }}%)
                </span>
            </p>
        </label>
        <div class="range-slider">
            <div class="range-slider__value">
                <div class="value__left">0 %</div>
                <div class="value__right">80 %</div>
            </div>

            <input class="range-slider__input timelist range-input" type="range" :min="min" :max="max" id="range"
                list="timelist" :step="currentStep" v-model="percentList" @change="percentListOutput"
                :disabled="props.disabled" :style="{
                background: `linear-gradient(to right, #334C85 ${((percentList - min) / (max - min)) * 100}%, #334C85 ${((percentList - min) / (max - min)) * 100}%)`
                }" />

            <ul class="datalist" id="timelist" :class="{ 'disabled': props.disabled }">
                <li v-for="value in options" :value="value" :label="value" :key="value">
                    {{ value }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.percent-block {
    padding: 15px 20px;
    border: none;
    border-radius: 12px;
    background: white;

    @media screen and (max-width: 540px) {
        padding: 15px 10px;
    }
}
.range-slider {
    display: flex;
    flex-direction: column;

    .range-slider__input {
        z-index: 10;
        width: 100%;
        height: 3px;
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        border-radius: 3px;
        background: transparent;
        position: relative;
        margin-top: 10px; // добавляем небольшой отступ сверху
        margin-bottom: 10px; // чтобы линия не прилипала к другим элементам

        /* Стиль трека для Chrome/Safari */
        &::-webkit-slider-runnable-track {
            height: 3px;
            // background: #EDEDED; // цвет трека
            border-radius: 3px;
        }

        /* Стиль ползунка для Chrome/Safari */
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            margin-top: -8.5px; // выравниваем по центру (половина высоты ползунка минус половина трека)
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #334C85;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            position: relative;
        }

        /* Стиль трека для Firefox */
        &::-moz-range-track {
            height: 3px;
            // background: #EDEDED;
            border-radius: 3px;
        }

        /* Стиль ползунка для Firefox */
        &::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #334C85;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
    }

    .range-slider__value {
        display: none;
        justify-content: space-between;
        color: var(--main-black);
        margin-bottom: 15px;

        .value__left,
        .value__right {
            background-color: #EDEDED;
            padding: 5px 10px;
            border-radius: 20px;
        }
    }
}


.first__row,
.payment__row,
.range__time-block label {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-bottom: 20px;
    width: 100%;
    font-size: 16px;
    color: var(--main-black);

    .output-first {
        font-weight: bold;

        @media screen and (max-width: 400px) {
            font-size: var(--standart-size);
        }
    }

    .title {
        font-size: 16px;
        font-weight: 700;

        @media screen and (max-width: 400px) {
            font-size: 10px;
        }
    }
}

</style>