/* Api URL для фетчей */
// export const apiNew = "https://api.autosalon-arena.ru/api/site/";
// export const apiNew = "https://new-api.autosalon-arena.ru/index.php/";
// export const apiNew = "http://new-api.autogaga.ru/index.php/";
export const apiNew = "https://api-stat.ru/";

export const apiFormNew = "https://send-app.ru/new/plex";
/* Api URL для фетчей */

// [
//     { id: 1, type: "call" },
//     { id: 2, type: "loan" },
//     { id: 3, type: "fast_request" },
//     { id: 4, type: "gos_programm" },
//     { id: 5, type: "installment" },
//     { id: 6, type: "callback" },
//     { id: 7, type: "reservation" },
//     { id: 8, type: "trade_in" },
//     { id: 9, type: "feedback" },
//     { id: 10, type: "ransom" },
//     { id: 11, type: "application_form" },
//     { id: 12, type: "popup" },
//     { id: 13, type: "callback_corner" },
//     { id: 15, type: "special_offer" },
//     { id: 16, type: "car_selection" }
//   ]

/* Маска для телефона */
export const options = {
    mask: "+7 (9##) ###-##-##",
    ager: true,
    eager: true,
};
/* Маска для телефона */

/* Маска для номера */
const number = { pattern: /[0-9]/ };
export const numberMask = {
    mask: "0000", // Длина поля Номер 4 символа
    ager: true,
    eager: true,
    tokens: {
        0: number,
    },
};
/* Маска для номера */

/* Маска для имени */
const letter = { pattern: /[а-яА-Я\s]|[a-zA-Z\s]|[\-]|[\.]|[0-9]/ };
export const name = {
    mask: "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", // Длина поля Имя 50 символов
    ager: true,
    tokens: {
        L: letter,
    },
};
/* Маска для имени */

export const blackList = ['7963609']

export const errors = {
    phone: "Заполните номер телефона",
}