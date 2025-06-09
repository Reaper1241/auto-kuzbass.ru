<script setup>
const timeList = ref(7);
const max = ref(7);
const timeListOutputData = ref('7 лет');

const emits = defineEmits(['timeListOutput']);
const props = defineProps(['disabled'])

emits('timeListOutput', timeList.value)

watch(timeList, (newTimeList, oldTimeList) => {
    if (newTimeList === '0' || newTimeList === '0') {
        timeListOutputData.value = '6 мес.';
    } else if (newTimeList === '1') {
        timeListOutputData.value = '1 год';
    } else if (newTimeList === '2') {
        timeListOutputData.value = '2 года';
    } else if (newTimeList === '3') {
        timeListOutputData.value = '3 года';
    } else if (newTimeList === '4') {
        timeListOutputData.value = '4 года';
    } else if (newTimeList === '5') {
        timeListOutputData.value = '5 лет';
    } else if (newTimeList === '6') {
        timeListOutputData.value = '6 лет';
    } else if (newTimeList === '7') {
        timeListOutputData.value = '7 лет';
    }
})

watch(timeList, (newTimeList, oldTimeList) => {
    emits('timeListOutput', timeList.value)
})
</script>

<template>
    <div class="time-block">
        <label class="timeOut" for="credit-page--time">
            <span class="title">
                Срок кредитования
            </span>
            <span class="output-time">
                {{ timeListOutputData }}
            </span>
        </label>

        <div class="range-slider">
            <div class="range-slider__value">
                <div class="value__left">6 мес.</div>
                <div class="value__right">7 лет</div>
            </div>

            <input class="range-slider__input range-input" type="range" min="0" :max="max" id="range" list="timelist"
                step="1" v-model="timeList" @change="timeListOutput" :disabled="props.disabled"
                :style="{ background: `linear-gradient(to right, #0091B9 ${timeList / max * 100}%, #E0E0E0 ${timeList / max * 100}%)` }" />

            <ul class="datalist" id="timelist" :class="{ 'disabled': props.disabled }">
                <li value="0" label="6 мес.">6 мес.</li>
                <li value="1" label="1 год">1 год</li>
                <li value="2" label="2 года">2 года</li>
                <li value="3" label="3 года">3 года</li>
                <li value="4" label="4 года">4 года</li>
                <li value="5" label="5 лет">5 лет</li>
                <li value="6" label="6 лет">6 лет</li>
                <li value="7" label="7 лет">7 лет</li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.time-block {
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
        
        /* Стиль для ползунка в Chrome/Safari */
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #0091B9;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        /* Стиль для ползунка в Firefox */
        &::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #0091B9;
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

.timeOut {
    justify-content: space-between;
    display: flex;
    padding-bottom: 20px;
    
    .title {
        font-size: 16px;
        font-weight: 700;
    }

    .output-time {
        font-weight: bold;
    }
}
</style>