<script setup>
const props = defineProps({
    carPrice: {
        type: Number,
        default: 0,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 80,
    },
    step: {
        type: Number,
        default: 0,
    },
    class: {
        type: String,
        default: '',
    }
})

const emits = defineEmits(['percentListOutput', 'feeOutput']);

const range = computed(() => {
    const list = [];
    for (let i = props.min; i <= props.max; i += props.step) {
        list.push(i);
    }
    return list;
})

const percentList = ref(10);

const firstFee = computed(() => {
    return (props.carPrice * percentList.value) / 100
})


watch(percentList, (newPercentList, oldPercentList) => {
    emits('percentListOutput', percentList.value)
})
emits('percentListOutput', percentList.value)

watch(firstFee, (newFirstFee, oldFirstFee) => {
    emits('feeOutput', newFirstFee)
})

onMounted(() => {
    emits('feeOutput', firstFee.value);
});
</script>



<template>
    <div class="percent-block" :class="class">
        <label class="credit__first" for=" credit-page--first">
            <p class="first__row">
                <span class="title">
                    Первый взнос
                </span>
                <span class="output-first">
                    {{ makeSpaces(firstFee) }} руб. ({{ percentList
                    }}%)
                </span>
            </p>
        </label>
        <div class="range-slider">
            <!-- <div class="range-slider__value">
                <div class="value__left">{{ min }} %</div>
                <div class="value__right">{{ max }} %</div>
            </div> -->

            <input class="range-slider__input timelist range-slider__progress range-input" type="range" :min="min"
                :max="max" list="timelist" :step="step" v-model="percentList" @change="percentListOutput"
                :disabled="disabled"
                :style="{ background: `linear-gradient(to right, #0091B9 ${percentList / max * 100}%, #0091B9 ${percentList / max * 100}%)` }" />

            <ul id="timelist" class="datalist" :class="{ 'disabled': disabled }">
                <li v-for="i in range" :key="i" :value="i" label="">
                    {{ i }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">

.percent-block{
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
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    padding: 4px 0;
    font-size: 16px;
    line-height: 16px;
    color: var(--main-black);
    flex-wrap: wrap;
    
    @media screen and (max-width: 768px) {
        font-size: 14px;
        line-height: normal;
    }

    .output-first {
        font-weight: bold;
        background: var(--main-color2);
        padding: 8px 10px;
        border-radius: 50px;
    }
}
.range-slider__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #0091B9;
    cursor: pointer;
    border: none;
    margin-top: -7px; // чтобы выровнять по центру трека
}

.range-slider__input::-moz-range-thumb {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #0091B9;
    cursor: pointer;
    border: none;
}

.range-slider__input::-ms-thumb {
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: #0091B9;
    cursor: pointer;
    border: none;
}
.small {
    .datalist {
        display: none;
    }
}
.title{
    font-weight: 700;
}
.hiddenOutput {
    .first__row {
        display: none;
    }
}
</style>