<script setup>
import { ref } from 'vue';
const menuList = ref([
    {
        name: 'Автомобили',
        link: '/cars',
    },

    // {
    //     name: 'Каталог авто',
    //     link: '/cars/',
    // },
    // {
    //     // name: 'Китайские авто',
    //     // link: '/cars/china',
    // },
    {
        name: 'Авто для такси',
        link: '/cars/taxi',
    },

    {
        name: 'Автокредит',
        link: '/credit',
    },
    {
        name: 'Trade-in',
        link: '/trade-in',
    },
    {
        name: 'Банки-партнеры',
        link: '/banks',
    },
    {
        name: 'Контакты',
        link: '/contact',
    },
])
</script>

<template>
    <ul class="navbar-list">
        <li class="navbar-item" v-for="item in menuList">
            <NuxtLink :to="item.link" class="navbar-link">{{ item.name }}</NuxtLink>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.navbar-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;

    .navbar-item {
        .navbar-link {
            transition: 0.3s;
            font-size: var(--standart-size);
            padding: 5px 10px;
            border-radius: 20px;
            color: var(--main-black);

            @media screen and (max-width: 1500px) {
                padding: 5px 8px;
            }
        }

        .router-link-active,
        .navbar-link:hover {
            transition: 0.3s;
            color: var(--secondary-color);
            position: relative;
        }
    }
}

.footer__menu {
    .navbar-list {
        flex-direction: column;
        align-items: start;
        justify-content: start;

        .navbar-item {
            &:hover .navbar-link {
                background: none;
                color: var(--secondary-color);
            }
        }

        .navbar-link {
            padding: 3px 0;

            &:hover {
                color: var(--secondary-color);
                background: none;

                &::after {
                    display: none;
                }
            }
        }

        a.router-link-active.router-link-exact-active.navbar-link {
            background: none;
            color: var(--secondary-color);

            &::after {
                display: none;
            }
        }
    }

    @media screen and (max-width: 400px) {
        .navbar-list {
            flex-direction: row;

            .navbar-link {
                padding: 8px;
                background: #F3F3F3;
                font-size: var(--standart-size);

                &:hover {
                    color: var(--secondary-color);
                    background: none;
                }
            }

            a.router-link-active.router-link-exact-active.navbar-link {
                color: var(--secondary-color);
                background: #F3F3F3;
            }
        }
    }
}

.navbar-list.burger {
    flex-direction: column;
    align-items: start;
    gap: 5px;

    .navbar-item {
        .navbar-link {
            color: var(--main-black);
            padding: 10px;
            font-weight: 400;
        }
    }
}
</style>