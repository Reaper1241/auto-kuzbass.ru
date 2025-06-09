<script setup>
const props = defineProps(['review'])
</script>

<template>
    <div class="review">
        <div class="review__stars">
            <i class="fa-solid fa-star" v-for="i in 5"></i>
        </div>
        <div class="review__text">
            {{ props.review.text }}
        </div>
        <div class="review__author">
            <div class="review__author-icon">
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="review__author-name">
                <span class="name">{{ props.review.name }}</span>
                <span class="position">{{ props.review.position }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.review {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 350px;
    padding: 30px;
    background: var(--light-grey);
    border-radius: 20px;

    .review__stars {
        display: flex;
        gap: 8px;

        i {
            color: #F49D34;
            font-size: var(--big-size);
        }
    }

    .review__text {
        height: 250px;
        overflow: auto;
        padding-right: 15px;
    }

    .review__author {
        display: flex;
        gap: 15px;
        align-items: center;

        .review__author-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            background: white;
            border-radius: 100%;
            font-size: var(--big-size);
        }

        .review__author-name {
            display: flex;
            flex-direction: column;
            gap: 5px;

            .name {
                font-weight: bold;
            }

            .position {
                font-size: var(--standart-size);
            }
        }
    }
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    background: white;
    border-radius: 20px;
}

::-webkit-scrollbar-thumb {
    background: rgba(95, 95, 95, 0.582);
    border-radius: 20px;
}
</style>