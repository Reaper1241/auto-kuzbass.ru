<script setup>
import { useAppStore } from '/stores/AppStore.js';
import Input from '@/components/Base/Input.vue';
import { ref } from 'vue';
import { options, name, errors } from "@/constants/";

const formFields = shallowRef([
    { name: 'name', component: Input, bindings: { label: 'ФИО', placeholder: 'Ваше имя', modelValue: '', class: 'form-input', type: 'text', maska: name } },
    { name: 'phone', component: Input, validation: (value) => validatePhone(value) ? null : errors.phone, bindings: { label: 'Номер телефона', placeholder: '+7 (___) ___-__-__', modelValue: '', class: 'form-input', type: 'tel', maska: options } },
]);

const handleFormSubmit = (formData) => {
    console.log('Форма отправлена!', formData);
    // Закрываем модалку после отправки
    showFormModal.value = false;
};

const props = defineProps({ 
    car: {
        type: Object,
        default: null,
    }
});
const appStore = useAppStore();

// Реактивные состояния для модальных окон
const showFormModal = ref(false);
const showInfoModal = ref(false);
const currentPromotion = ref(null);

// Данные об акциях
const promotions = ref([
    {
        id: 1,
        title: "Подарок на выбор",
        type: "Акция",
        image: "/images/slider/image1.png",
        description: "Покупая новый автомобиль в нашем автосалоне мы предлагаем КАСКО, зимнюю резину или дополнительный аксессуар."
    },
    {
        id: 2,
        title: "\"Первый автомобиль\"",
        type: "Госпрограмма",
        image: "/images/slider/image1.png",
        description: "Программа 'Первый автомобиль' была разработана для оказания поддержки начинающим водителям в приобретении их первого транспортного средства. Она предоставляет выгодные условия льготного автокредитования. Участники программы получают скидку в размере 20% на покупку автомобиля, однако данная выгода действует только при оформлении кредита на автомобиль. Это способствует стимулированию спроса на автомобили отечественного производства и машины, собранные на территории России. Данная инициатива была запущена в 2009 году и продолжает успешно работать по сей день."
    },
    {
        id: 3,
        title: "\"Семейный автомобиль\"",
        type: "Госпрограмма",
        image: "/images/slider/image1.png",
        description: "Наш автосалон предлагает семьям с детьми скидку 20-25% на покупку нового автомобиля. Доступны различные модели автомобилей, новые китайские модели и другие. Все банки, прикрепленные к программе, сотрудничают с нашим автосалоном."
    },
    {
        id: 4,
        title: "Внедорожник",
        type: "Акция",
        image: "/images/slider/image1.png",
        description: "СКИДКА НА АВТОКРЕДИТ - Купите новый автомобиль в кредит, и мы предоставим вам скидку до 300 000 руб. Поскольку мы сотрудничаем с крупнейшими банками России, то гарантируем 96% одобрения на автокредит."
    },
    {
        id: 5,
        title: "Седан",
        type: "Акция",
        image: "/images/slider/image1.png",
        description: "БЕЗ ПЕРВОГО ВЗНОСА - Автокредит в нашем салоне доступен без первого взноса, оставьте заявку на сайте и наши банки-партнеры одобрят вашу заявку в течение 30 минут."
    },
    {
        id: 6,
        title: "Трейд-Ин",
        type: "Акция",
        image: "/images/slider/image2.png",
        description: "При покупке нового авто по программе Trade-In клиенты могут получить выгоду до 250 000 ₽. Оценка, выкуп и полное сопровождение сделки предоставляются бесплатно."
    }
]);

// Функции для открытия модальных окон
const openFormModal = (promotion) => {
    currentPromotion.value = promotion;
    showFormModal.value = true;
    // Закрываем модалку с информацией, если она открыта
    showInfoModal.value = false;
};

const openInfoModal = (promotion) => {
    currentPromotion.value = promotion;
    showInfoModal.value = true;
};

// Функция для перехода из информационной модалки в форму
const openFormFromInfo = () => {
    showInfoModal.value = false;
    // Небольшая задержка для плавного перехода
    setTimeout(() => {
        showFormModal.value = true;
    }, 50);
};

// Функции для закрытия модальных окон
const closeFormModal = () => {
    showFormModal.value = false;
};

const closeInfoModal = () => {
    showInfoModal.value = false;
};
</script>

<template>
    <section class="sale__section section">
        <h2 class="title">Акции</h2>
        <div class="sale__block">
            <div class="sale__card" v-for="promotion in promotions" :key="promotion.id">
                <div class="sale__img">
                    <img :src="promotion.image" :alt="promotion.title">
                    <div class="sale__text-container">
                        <p class="sale__img-title">{{ promotion.type }}</p>
                        <p class="sale__img-text">{{ promotion.title }}</p>
                    </div>
                </div>
                <div class="sale__form">
                    <button class="button-form" @click="openFormModal(promotion)">получить предложение</button>
                    <button class="button-info" @click="openInfoModal(promotion)">подробнее</button>
                </div>
            </div>
        </div>
        
        <!-- Модальное окно для формы -->
        <Teleport to="body">
            <div v-if="showFormModal" class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" @click="closeFormModal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <h3 class="modal-title">Получить предложение по акции: {{ currentPromotion?.title }}</h3>
                    <FormSmall :car="car" @submit="handleFormSubmit" />
                </div>
            </div>
        </Teleport>
        
        <!-- Модальное окно для информации -->
        <Teleport to="body">
            <div v-if="showInfoModal" class="modal-overlay">
                <div class="modal-content info-modal">
                    <button class="modal-close" @click="closeInfoModal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <h3 class="modal-title">{{ currentPromotion?.type }}: {{ currentPromotion?.title }}</h3>
                    <div class="modal-description">
                        <p>{{ currentPromotion?.description }}</p>
                    </div>
                    <button class="button-form modal-button" @click="openFormFromInfo">Получить предложение</button>
                </div>
            </div>
        </Teleport>
    </section>
</template>

<style lang="scss" scoped>
.title {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 20px;
    font-size: 22px;
    margin-bottom: 20px;
    
    @media screen and (max-width: 540px) {
        padding: 0 10px;
    }
}

.sale__section {
    padding: 20px 0;
    position: relative;
}

.sale__block {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 15px;
}

.sale__card {
    display: flex;
    flex-direction: column;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
    }
}

.sale__img {
    position: relative;
    
    img {
        width: 100%;
        height: 500px;
        object-fit: cover;
        
        @media (max-width: 767px) {
            height: 400px;
        }
    }
}

.sale__text-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.sale__img-title {
    color: white;
    position: absolute;
    left: 10px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid white;
    top: 10px;
    font-size: 18px;
    font-weight: 300;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    margin-bottom: 10px;
}

.sale__img-text {
    color: white;
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    bottom: 12px;
    left: 10px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
}

.sale__form {
    width: 100%;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .button-info {
        background: white;
        border: 1px solid black;
        border-radius: 0 0px 8px 0px;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35%;
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.3s;
        
        &:hover {
            background-color: #f5f5f5;
        }
    }
    
    .button-form {
        background: var(--main-color);
        color: white;
        display: flex;
        border: 1px solid black;
        border-radius: 0 0px 0px 8px;
        justify-content: center;
        align-items: center;
        width: 65%;
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.3s;
        
        &:hover {
            background-color: var(--main-color-dark);
        }
    }
}

// Стили для модальных окон
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 500px;
    width: 100%;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
    
    &.info-modal {
        max-width: 600px;
    }
}

.modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    
    &:hover {
        color: #000;
    }
}

.modal-title {
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--main-color);
    font-size: 1.5rem;
}

.modal-description {
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.modal-button {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    margin-top: 1rem;
    background: var(--main-color);
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: var(--main-color-dark);
    }
}

// :deep(.base-button) {
//     height: 40px;
//     border-radius: 4px;
// }

// :deep(.form-input) {
//     border-radius: 4px;
//     height: 40px;
// }

@media (max-width: 767px) {
    .sale__block {
        grid-template-columns: 1fr;
    }
    
    .sale__card {
        flex-direction: column;
        
        img, .sale__form {
            width: 100%;
        }
    }
    
    .sale__img-title {
        font-size: 20px;
    }
    
    .sale__img-text {
        font-size: 16px;
    }
    
    .modal-content {
        padding: 1.5rem;
    }
    
    .modal-title {
        font-size: 1.2rem;
    }
}
</style>