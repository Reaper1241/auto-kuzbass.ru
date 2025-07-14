<script setup>
const timeList = ref(8);
const timeListOutputData = ref('7 лет');

const emits = defineEmits(['timeListOutput', 'update:modelValue']);
const max = ref(8);

emits('timeListOutput', timeList.value)

const props = defineProps({
    modelValue: {
        type: Number,
        default: null
    },
    disabled: {
        type: Boolean,
    },
    class: {
        type: String,
    }
});

const handleTimeListOutput = (value) => {
    emits('update:modelValue', Number(timeList.value));
};

watch(timeList, (newTimeList, oldTimeList) => {
    if (newTimeList === '0' || newTimeList === '0') {
        timeListOutputData.value = '2 мес.';
    } else if (newTimeList === '1') {
        timeListOutputData.value = '6 мес.';
    } else if (newTimeList === '2') {
        timeListOutputData.value = '1 год';
    } else if (newTimeList === '3') {
        timeListOutputData.value = '2 года';
    } else if (newTimeList === '4') {
        timeListOutputData.value = '3 года';
    } else if (newTimeList === '5') {
        timeListOutputData.value = '4 года';
    } else if (newTimeList === '6') {
        timeListOutputData.value = '5 лет';
    } else if (newTimeList === '7') {
        timeListOutputData.value = '6 лет';
    } else if (newTimeList === '8') {
        timeListOutputData.value = '7 лет';
    }
})

watch(timeList, (newTimeList, oldTimeList) => {
    emits('timeListOutput', Number(timeList.value))
})

</script>

<template>
    <div class="time-block" :class="class">
        <label class="timeOut" for="credit-page--time">
            Срок кредитования <span class="output-time">
                {{ timeListOutputData }}
            </span>
        </label>

        <div class="range-slider">
            <!-- <div class="range-slider__value">
                <div class="value__left">6 мес.</div>
                <div class="value__right">7 лет</div>
            </div> -->

            <input class="range-slider__input range-input" type="range" min="0" max="8" id="range" list="timelist"
                step="1" v-model="timeList" @change="handleTimeListOutput" :disabled="props.disabled"
                :style="{ background: `linear-gradient(to right, #15744e ${timeList / max * 100}%, #15744e ${timeList / max * 100}%)` }" />
            <ul class="datalist" id="timelist" :class="{ 'disabled': props.disabled }">
                <li value="0" label="2 мес.">0.2</li>
                <li value="1" label="6 мес.">0.5</li>
                <li value="2" label="1 год">1</li>
                <li value="3" label="2 года">2</li>
                <li value="4" label="3 года">3</li>
                <li value="5" label="4 года">4</li>
                <li value="6" label="5 лет">5</li>
                <li value="7" label="6 лет">6</li>
                <li value="8" label="7 лет">7</li>
            </ul>
            <div class="range-slider__progress">
            </div>
        </div>
    </div>


</template>

<style scoped lang="scss">
.time-block{
    border: none;
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
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    padding: 4px 0;
    font-weight: 700;
    font-size: var(--standart-size);
    line-height: 16px;
    color: var(--main-color);
}
.range-slider__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #15744e;
    cursor: pointer;
    border: none;
    margin-top: -7px; // чтобы выровнять по центру трека
}

.range-slider__input::-moz-range-thumb {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #15744e;
    cursor: pointer;
    border: none;
}

.range-slider__input::-ms-thumb {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #15744e;
    cursor: pointer;
    border: none;
}
.small {
    datalist {
        display: none;
    }
}

.timeOut {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    padding: 4px 0;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    color: var(--main-black);
    flex-wrap: wrap;

    .output-time {
        font-weight: bold;
        background: var(--main-color2);
        padding: 8px 10px;
        border-radius: 50px;
    }

    @media screen and (max-width: 768px) {
        font-size: 14px;
        line-height: normal;
    }
}
</style>